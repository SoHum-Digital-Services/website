import Link from "next/link";
import { PROJECTS } from "@/lib/dashboard/projects";
import { getAllProjectMetrics } from "@/lib/dashboard/aggregate";
import ProjectCard from "@/components/dashboard/ProjectCard";
import SummaryStrip from "@/components/dashboard/SummaryStrip";
import AutoRefresh from "@/components/dashboard/AutoRefresh";
import SignOut from "@/components/dashboard/SignOut";
import Yantra from "@/components/Yantra";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const metrics = await getAllProjectMetrics();
  const checkedAt = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="theme-dark grain relative flex-1 overflow-hidden bg-bg text-fg">
      <Yantra className="spin-slow pointer-events-none absolute -right-40 -top-40 w-[46rem] text-haldi/[0.07]" />

      <div className="relative">
        {/* ── Bar ──────────────────────────────────────────── */}
        <header className="border-b border-rule">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-display text-2xl leading-none">SoHum</span>
              <span className="h-1.5 w-1.5 rounded-full bg-sindoor" />
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-fg-2">
                Ops
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <AutoRefresh />
              <SignOut />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
          {/* ── Title ──────────────────────────────────────── */}
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-4">
                <span className="h-px w-10 bg-haldi" />
                <span className="font-mono text-xs uppercase tracking-[0.32em] text-haldi">
                  Live status
                </span>
              </p>
              <h1 className="font-display mt-5 text-5xl leading-none sm:text-6xl">
                Every project,
                <br />
                <span className="text-haldi">at a glance.</span>
              </h1>
            </div>
            <p className="font-mono text-xs text-fg-2">Checked {checkedAt} IST</p>
          </div>

          {/* ── Tiles ──────────────────────────────────────── */}
          <SummaryStrip projects={PROJECTS} metrics={metrics} />

          {/* ── Cards ──────────────────────────────────────── */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.key} project={project} metrics={metrics[project.key]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
