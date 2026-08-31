import type { NextRequest } from "next/server";
import { constantTimeEqual, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/session";

// Per-IP rate limit. In-memory, so it resets on cold start and is per-instance —
// enough to blunt brute-force bursts, not a hard guarantee.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const expected = process.env.DASHBOARD_PASSWORD;
  if (!expected) {
    console.error("DASHBOARD_PASSWORD is not set");
    return Response.json({ error: "Dashboard is not configured." }, { status: 500 });
  }

  const password = body.password ?? "";
  if (!constantTimeEqual(password, expected)) {
    return Response.json({ error: "Incorrect password." }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE_NAME}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`
  );
  return response;
}
