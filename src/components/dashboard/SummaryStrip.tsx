import type { ProjectConfig } from "@/lib/dashboard/projects";
import type { ProjectMetrics, MongoInfo, SupabaseInfo } from "@/lib/dashboard/types";

function isMongoInfo(data: SupabaseInfo | MongoInfo): data is MongoInfo {
  return "collections" in data;
}

type Tile = { label: string; ready: number; total: number };

function tone(ready: number, total: number) {
  if (total === 0) return "var(--fg-2)";
  if (ready === total) return "var(--status-good)";
  if (ready === 0) return "var(--status-critical)";
  return "var(--status-warning)";
}

function toneLabel(ready: number, total: number) {
  if (total === 0) return "none configured";
  if (ready === total) return "all healthy";
  if (ready === 0) return "all down";
  return `${total - ready} needs attention`;
}

export default function SummaryStrip({
  projects,
  metrics,
}: {
  projects: ProjectConfig[];
  metrics: Record<string, ProjectMetrics>;
}) {
  let deploysReady = 0;
  let deploysTotal = 0;
  let backendsUp = 0;
  let backendsTotal = 0;
  let dbsHealthy = 0;
  let dbsTotal = 0;

  for (const project of projects) {
    const m = metrics[project.key];
    if (project.vercelProjectId) {
      deploysTotal++;
      if (m.vercel?.status === "ok" && m.vercel.data.deployState === "READY") deploysReady++;
    }
    if (project.render) {
      backendsTotal++;
      if (m.render?.status === "ok" && m.render.data.up) backendsUp++;
    }
    if (project.db) {
      dbsTotal++;
      if (m.db?.status === "ok") {
        const healthy = isMongoInfo(m.db.data) || m.db.data.status === "ACTIVE_HEALTHY";
        if (healthy) dbsHealthy++;
      }
    }
  }

  const tiles: Tile[] = [
    { label: "Deploys", ready: deploysReady, total: deploysTotal },
    { label: "Backends", ready: backendsUp, total: backendsTotal },
    { label: "Databases", ready: dbsHealthy, total: dbsTotal },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {tiles.map((tile) => {
        const color = tone(tile.ready, tile.total);
        return (
          <div
            key={tile.label}
            className="relative overflow-hidden border border-rule bg-bg-2 p-6"
          >
            <span
              className="absolute inset-y-0 left-0 w-1"
              style={{ backgroundColor: color }}
            />
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-fg-2">
              {tile.label}
            </p>
            <p className="font-display mt-3 text-5xl leading-none" style={{ color }}>
              {tile.ready}
              <span className="text-fg-2/50">/{tile.total}</span>
            </p>
            <p className="mt-3 flex items-center gap-2 text-sm text-fg-2">
              <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden className="shrink-0">
                <circle cx="4" cy="4" r="4" fill={color} />
              </svg>
              {toneLabel(tile.ready, tile.total)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
