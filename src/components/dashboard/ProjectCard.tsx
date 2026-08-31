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

const linkClass =
  "font-mono text-right text-sm underline decoration-fg-2/30 underline-offset-4 transition-colors hover:decoration-current";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-fg-2/70 mb-1.5">
      {children}
    </p>
  );
}

export default function ProjectCard({
  project,
  metrics,
}: {
  project: ProjectConfig;
  metrics: ProjectMetrics;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden border border-rule bg-bg-2 transition-colors hover:border-fg-2/40">
      <span className="h-1.5 w-full" style={{ backgroundColor: project.pigment }} />

      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-7">
        <h2 className="font-display text-3xl leading-none" style={{ color: project.pigment }}>
          {project.name}
        </h2>

        <div>
          <SectionLabel>Stack</SectionLabel>
          {project.vercelProjectName && (
            <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
              <span className="text-fg-2">Frontend</span>
              <a
                href={vercelDashboardUrl(project.vercelProjectName)}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
                style={{ color: project.pigment }}
              >
                {project.vercelProjectName}
              </a>
            </div>
          )}
          {project.render && (
            <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
              <span className="text-fg-2">Backend</span>
              <a
                href={project.render.url}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
                style={{ color: project.pigment }}
              >
                {project.render.serviceName}
              </a>
            </div>
          )}
          {project.db && (
            <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
              <span className="text-fg-2">Database</span>
              {project.db.kind === "mongo" ? (
                <span className="font-mono text-right text-sm">
                  {project.db.dbName} ({project.db.clusterName})
                </span>
              ) : (
                <a
                  href={supabaseDashboardUrl(project.db.ref)}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                  style={{ color: project.pigment }}
                >
                  {project.db.projectName} (Supabase)
                </a>
              )}
            </div>
          )}
        </div>

        {project.vercelProjectId && (
          <div>
            <SectionLabel>Deploy</SectionLabel>
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
            <SectionLabel>Backend</SectionLabel>
            <MetricRow
              label="Status"
              result={metrics.render}
              render={(data) => (
                <StatusDot
                  status={data.up ? "good" : "warning"}
                  label={data.up ? "up" : "down / waking up"}
                />
              )}
            />
          </div>
        )}

        <div className="mt-auto">
          <SectionLabel>Database</SectionLabel>
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
              {project.db.kind === "mongo" &&
                metrics.db?.status === "ok" &&
                isMongoInfo(metrics.db.data) && (
                  <div className="flex flex-col gap-2 pt-1.5">
                    <div className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-fg-2">Storage</span>
                      <span className="font-mono text-right text-sm">
                        {formatBytes(metrics.db.data.storageBytes)}
                        <span className="text-fg-2"> / {formatBytes(MONGO_M0_CAP_BYTES)}</span>
                      </span>
                    </div>
                    <UsageBar
                      usedBytes={metrics.db.data.storageBytes}
                      capBytes={MONGO_M0_CAP_BYTES}
                      accent={project.pigment}
                    />
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
