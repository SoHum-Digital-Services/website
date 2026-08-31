import type { ProviderResult, VercelInfo } from "@/lib/dashboard/types";
import { VERCEL_TEAM_ID } from "@/lib/dashboard/projects";

export async function getVercelProject(projectId: string): Promise<ProviderResult<VercelInfo>> {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) return { status: "unavailable", reason: "VERCEL_API_TOKEN not set" };

  try {
    const res = await fetch(
      `https://api.vercel.com/v6/deployments?projectId=${projectId}&teamId=${VERCEL_TEAM_ID}&limit=1&target=production`,
      { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(8000) }
    );

    if (!res.ok) {
      return { status: "unavailable", reason: `Vercel API returned ${res.status}` };
    }

    const body = await res.json();
    const deployment = body.deployments?.[0];
    if (!deployment) {
      return { status: "unavailable", reason: "No deployments found" };
    }

    return {
      status: "ok",
      data: {
        deployState: deployment.state,
        deployUrl: deployment.url,
        createdAt: deployment.created ?? deployment.createdAt,
        commitSha: deployment.meta?.githubCommitSha,
        commitMessage: deployment.meta?.githubCommitMessage,
        gitLinked: Boolean(deployment.meta?.githubCommitSha),
      },
    };
  } catch (err) {
    return { status: "unavailable", reason: err instanceof Error ? err.message : "Unknown error" };
  }
}
