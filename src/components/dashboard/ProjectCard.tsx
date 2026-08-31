import type { ProjectConfig } from "@/lib/dashboard/projects";
import { supabaseDashboardUrl, vercelDashboardUrl } from "@/lib/dashboard/projects";
import type { MongoInfo, ProjectMetrics, SupabaseInfo } from "@/lib/dashboard/types";
import MetricRow from "@/components/dashboard/MetricRow";
import StatusDot from "@/components/dashboard/StatusDot";
import UsageBar from "@/components/dashboard/UsageBar";
import { formatBytes, formatRelativeTime } from "@/lib/dashboard/format";

// MongoDB Atlas M0 (free tier) storage cap.
const MONGO_M0_CAP_BYTES = 512 * 1024 * 1024;

function isMongoInfo(data: SupabaseInfo | MongoInfo): data is MongoInfo {
  return "collections" in data;
}

const linkClass = "hover:text-copper-bright transition-colors underline underline-offset-2";

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

      <div>
        <p className="text-paper-dim tracking-wide uppercase text-xs mb-1">Stack</p>
        {project.vercelProjectName && (
          <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
            <span className="text-paper-dim">Frontend</span>
            <a
              href={vercelDashboardUrl(project.vercelProjectName)}
              target="_blank"
              rel="noreferrer"
              className={`font-mono text-right ${linkClass}`}
            >
              {project.vercelProjectName}
            </a>
          </div>
        )}
        {project.render && (
          <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
            <span className="text-paper-dim">Backend</span>
            <a
              href={project.render.url}
              target="_blank"
              rel="noreferrer"
              className={`font-mono text-right ${linkClass}`}
            >
              {project.render.serviceName}
            </a>
          </div>
        )}
        {project.db && (
          <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
            <span className="text-paper-dim">Database</span>
            {project.db.kind === "mongo" ? (
              <span className="font-mono text-right">
                {project.db.dbName} ({project.db.clusterName})
              </span>
            ) : (
              <a
                href={supabaseDashboardUrl(project.db.ref)}
                target="_blank"
                rel="noreferrer"
                className={`font-mono text-right ${linkClass}`}
              >
                {project.db.projectName} (Supabase)
              </a>
            )}
          </div>
        )}
      </div>

      {project.vercelProjectId && (
        <div>
          <p className="text-paper-dim tracking-wide uppercase text-xs mb-1">Deploy</p>
          <MetricRow
            label="Status"
            result={metrics.vercel}
            render={(data) => (
              <StatusDot
                status={
                  data.deployState === "READY"
                    ? "good"
                    : data.deployState === "ERROR"
                      ? "critical"
                      : "warning"
                }
                label={data.deployState}
              />
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
              <StatusDot status={data.up ? "good" : "warning"} label={data.up ? "up" : "down / waking up"} />
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
                  <StatusDot status="good" label="ok" />
                ) : (
                  <StatusDot
                    status={data.status === "ACTIVE_HEALTHY" ? "good" : "warning"}
                    label={data.status}
                  />
                )
              }
            />
            {project.db.kind === "mongo" && metrics.db?.status === "ok" && isMongoInfo(metrics.db.data) && (
              <div className="pt-1 pb-1.5 flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="text-paper-dim">Storage</span>
                  <span className="font-mono text-right">
                    {formatBytes(metrics.db.data.storageBytes)} / {formatBytes(MONGO_M0_CAP_BYTES)}
                  </span>
                </div>
                <UsageBar usedBytes={metrics.db.data.storageBytes} capBytes={MONGO_M0_CAP_BYTES} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
