type Status = "good" | "warning" | "critical" | "muted";

const COLORS: Record<Status, string> = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  critical: "var(--status-critical)",
  muted: "var(--paper-dim)",
};

export default function StatusDot({ status, label }: { status: Status; label: string }) {
  const color = COLORS[status];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono" style={{ color }}>
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden className="shrink-0">
        <circle cx="4" cy="4" r="4" fill={color} opacity={status === "muted" ? 0.5 : 1} />
      </svg>
      {label}
    </span>
  );
}
