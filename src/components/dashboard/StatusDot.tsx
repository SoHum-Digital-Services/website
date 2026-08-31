type Status = "good" | "warning" | "critical" | "muted";

const COLORS: Record<Status, string> = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  critical: "var(--status-critical)",
  muted: "var(--fg-2)",
};

/** State is always a dot *and* a label — never colour alone. */
export default function StatusDot({ status, label }: { status: Status; label: string }) {
  const color = COLORS[status];
  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm" style={{ color }}>
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden className="shrink-0">
        <circle cx="4" cy="4" r="4" fill={color} opacity={status === "muted" ? 0.5 : 1} />
      </svg>
      {label}
    </span>
  );
}
