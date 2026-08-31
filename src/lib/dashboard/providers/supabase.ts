import type { ProviderResult, SupabaseInfo } from "@/lib/dashboard/types";

/**
 * Ask the project's own data plane whether it is actually serving.
 *
 * The Management API reports *provisioning* state, so a project can sit at
 * ACTIVE_HEALTHY while Storage and Edge Functions return 402 and every client
 * request fails — which is exactly how gativani went fully down while this
 * dashboard showed it green.
 *
 * Storage is the probe because a quota restriction blocks Storage and
 * Functions but NOT PostgREST — `/rest/v1/` still answers 401 on a restricted
 * project, so it can't see the outage. No credentials are sent: an unrestricted
 * project answers 400/401 (which is a healthy "you're serving, just unauthed"),
 * a restricted one answers 402 with the violation.
 */
async function probeRestriction(ref: string): Promise<string | null> {
  try {
    const res = await fetch(`https://${ref}.supabase.co/storage/v1/bucket`, {
      signal: AbortSignal.timeout(6000),
    });
    if (res.status !== 402) return null;

    const body = (await res.json().catch(() => ({}))) as { message?: string };
    const violations = body.message?.match(/violations:\s*([^.]+)/i)?.[1]?.trim();
    return violations || "service restricted";
  } catch {
    // A probe that can't complete isn't evidence of a restriction — leave the
    // Management API's answer to stand rather than inventing an outage.
    return null;
  }
}

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

    const body = (await res.json()) as { status?: string };
    const provisioning = body.status ?? "UNKNOWN";

    // Only worth probing when the control plane claims everything is fine —
    // that's the case where it can be wrong.
    if (provisioning === "ACTIVE_HEALTHY") {
      const restriction = await probeRestriction(ref);
      if (restriction) {
        return { status: "ok", data: { status: "RESTRICTED", restriction } };
      }
    }

    return { status: "ok", data: { status: provisioning } };
  } catch (err) {
    return { status: "unavailable", reason: err instanceof Error ? err.message : "Unknown error" };
  }
}
