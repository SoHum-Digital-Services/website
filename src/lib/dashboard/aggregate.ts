import { PROJECTS } from "@/lib/dashboard/projects";
import type { ProjectMetrics } from "@/lib/dashboard/types";
import { getVercelProject } from "@/lib/dashboard/providers/vercel";
import { getRenderHealth } from "@/lib/dashboard/providers/render";
import { getSupabaseStatus } from "@/lib/dashboard/providers/supabase";
import { getMongoStats } from "@/lib/dashboard/providers/mongo";

async function getProjectMetrics(project: (typeof PROJECTS)[number]): Promise<ProjectMetrics> {
  const [vercel, render, db] = await Promise.all([
    project.vercelProjectId
      ? getVercelProject(project.vercelProjectId).catch(
          (err): ProjectMetrics["vercel"] => ({
            status: "unavailable",
            reason: err instanceof Error ? err.message : "Unknown error",
          })
        )
      : undefined,
    project.render
      ? getRenderHealth(project.render.url, project.render.healthPath).catch(
          (err): ProjectMetrics["render"] => ({
            status: "unavailable",
            reason: err instanceof Error ? err.message : "Unknown error",
          })
        )
      : undefined,
    project.db?.kind === "supabase"
      ? getSupabaseStatus(project.db.ref).catch(
          (err): ProjectMetrics["db"] => ({
            status: "unavailable",
            reason: err instanceof Error ? err.message : "Unknown error",
          })
        )
      : project.db?.kind === "mongo"
        ? getMongoStats(project.db.dbName).catch(
            (err): ProjectMetrics["db"] => ({
              status: "unavailable",
              reason: err instanceof Error ? err.message : "Unknown error",
            })
          )
        : undefined,
  ]);

  return { vercel, render, db };
}

export async function getAllProjectMetrics(): Promise<Record<string, ProjectMetrics>> {
  const results = await Promise.all(PROJECTS.map((project) => getProjectMetrics(project)));
  return Object.fromEntries(PROJECTS.map((project, i) => [project.key, results[i]]));
}
