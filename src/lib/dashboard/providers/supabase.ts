import type { ProviderResult, SupabaseInfo } from "@/lib/dashboard/types";

export async function getSupabaseStatus(ref: string): Promise<ProviderResult<SupabaseInfo>> {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  if (!token) return { status: "unavailable", reason: "SUPABASE_ACCESS_TOKEN not set" };

  try {
    const res = await fetch(`https://api.supabase.com/v1/projects/${ref}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return { status: "unavailable", reason: `Supabase API returned ${res.status}` };
    }

    const body = await res.json();
    return { status: "ok", data: { status: body.status } };
  } catch (err) {
    return { status: "unavailable", reason: err instanceof Error ? err.message : "Unknown error" };
  }
}
