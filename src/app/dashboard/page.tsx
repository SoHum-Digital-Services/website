import { PROJECTS } from "@/lib/dashboard/projects";
import { getAllProjectMetrics } from "@/lib/dashboard/aggregate";
import ProjectCard from "@/components/dashboard/ProjectCard";
import SummaryStrip from "@/components/dashboard/SummaryStrip";
import AutoRefresh from "@/components/dashboard/AutoRefresh";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const metrics = await getAllProjectMetrics();

  return (
    <div className="flex-1">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-copper">
            Ops Dashboard
          </p>
          <AutoRefresh />
        </div>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-6">
          Live status
        </h1>
        <div className="mb-12">
          <SummaryStrip projects={PROJECTS} metrics={metrics} />
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.key} project={project} metrics={metrics[project.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}
