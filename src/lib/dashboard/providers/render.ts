import type { ProviderResult, RenderInfo } from "@/lib/dashboard/types";

export async function getRenderHealth(url: string, healthPath: string): Promise<ProviderResult<RenderInfo>> {
  try {
    const res = await fetch(`${url}${healthPath}`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) {
      return { status: "ok", data: { up: false } };
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = await res.json();
      return { status: "ok", data: { up: true, detail: body } };
    }

    return { status: "ok", data: { up: true } };
  } catch {
    // Render's free tier can take 20-30s to wake from a cold start — a timeout
    // here means "waking up or down", not a broken integration.
    return { status: "ok", data: { up: false } };
  }
}
