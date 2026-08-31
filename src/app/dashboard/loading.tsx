export default function DashboardLoading() {
  return (
    <div className="flex-1">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-copper mb-6">
          Ops Dashboard
        </p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mb-12">
          Live status
        </h1>
        <p className="font-mono text-paper-dim">Loading…</p>
      </div>
    </div>
  );
}
