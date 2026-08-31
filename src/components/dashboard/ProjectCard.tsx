import type { ProjectConfig } from "@/lib/dashboard/projects";
import type { MongoInfo, ProjectMetrics, SupabaseInfo } from "@/lib/dashboard/types";
import MetricRow from "@/components/dashboard/MetricRow";
import { formatBytes, formatRelativeTime } from "@/lib/dashboard/format";

function isMongoInfo(data: SupabaseInfo | MongoInfo): data is MongoInfo {
  return "collections" in data;
}

export default function ProjectCard({
  project,
  metrics,
}: {
  project: ProjectConfig;
  metrics: ProjectMetrics;
}) {
  return (
    <div className="border border-line p-6 flex flex-col gap-4">
      <h2 className="font-display text-2xl">{project.name}</h2>

      {project.vercelProjectId && (
        <div>
          <p className="text-paper-dim tracking-wide uppercase text-xs mb-1">Deploy</p>
          <MetricRow
            label="Status"
            result={metrics.vercel}
            render={(data) => (
              <span className={data.deployState === "READY" ? "text-copper" : "text-copper-bright"}>
                {data.deployState}
              </span>
            )}
          />
          <MetricRow
            label="Last deploy"
            result={metrics.vercel}
            render={(data) => formatRelativeTime(data.createdAt)}
          />
          <MetricRow
            label="Commit"
            result={metrics.vercel}
            render={(data) => (data.gitLinked ? data.commitSha?.slice(0, 7) : "manual deploy")}
          />
        </div>
      )}

      {project.render && (
        <div>
          <p className="text-paper-dim tracking-wide uppercase text-xs mb-1">Backend</p>
          <MetricRow
            label="Status"
            result={metrics.render}
            render={(data) => (
              <span className={data.up ? "text-copper" : "text-copper-bright"}>
                {data.up ? "up" : "down / waking up"}
              </span>
            )}
          />
        </div>
      )}

      <div>
        <p className="text-paper-dim tracking-wide uppercase text-xs mb-1">Database</p>
        {!project.db ? (
          <MetricRow label="Status" result={undefined} render={() => null} />
        ) : (
          <>
            <MetricRow
              label="Status"
              result={metrics.db}
              render={(data) =>
                isMongoInfo(data) ? (
                  <span className="text-copper">ok</span>
                ) : (
                  <span className={data.status === "ACTIVE_HEALTHY" ? "text-copper" : "text-copper-bright"}>
                    {data.status}
                  </span>
                )
              }
            />
            {project.db.kind === "mongo" && (
              <MetricRow
                label="Storage"
                result={metrics.db}
                render={(data) => (isMongoInfo(data) ? formatBytes(data.storageBytes) : null)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
