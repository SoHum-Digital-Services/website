import type { ProjectConfig } from "@/lib/dashboard/projects";
import type { ProjectMetrics, MongoInfo, SupabaseInfo } from "@/lib/dashboard/types";
import StatusDot from "@/components/dashboard/StatusDot";

function isMongoInfo(data: SupabaseInfo | MongoInfo): data is MongoInfo {
  return "collections" in data;
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

  const items = [
    { label: "Deploys", ready: deploysReady, total: deploysTotal },
    { label: "Backends", ready: backendsUp, total: backendsTotal },
    { label: "Databases", ready: dbsHealthy, total: dbsTotal },
  ];

  return (
    <div className="flex flex-wrap gap-x-8 gap-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-sm">
          <StatusDot
            status={item.ready === item.total ? "good" : item.ready === 0 ? "critical" : "warning"}
            label={`${item.ready}/${item.total} ${item.label.toLowerCase()} healthy`}
          />
        </div>
      ))}
    </div>
  );
}
