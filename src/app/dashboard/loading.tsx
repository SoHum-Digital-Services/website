export default function DashboardLoading() {
  return (
    <div className="theme-dark relative flex-1 bg-bg text-fg">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
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

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 animate-pulse border border-rule bg-bg-2" />
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 animate-pulse border border-rule bg-bg-2" />
          ))}
        </div>
      </div>
    </div>
  );
}
