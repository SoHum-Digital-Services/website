export default function UsageBar({
  usedBytes,
  capBytes,
  accent,
}: {
  usedBytes: number;
  capBytes: number;
  accent: string;
}) {
  const pct = (usedBytes / capBytes) * 100;
  // Near the cap, state overrides identity — the bar turns to a status colour.
  const color =
    pct >= 90 ? "var(--status-critical)" : pct >= 70 ? "var(--status-warning)" : accent;

  return (
    <div
      className="h-1.5 w-full overflow-hidden rounded-full bg-rule"
      role="img"
      aria-label={`${pct.toFixed(1)}% of storage used`}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        // Hairline floor so a near-empty database still reads as a mark.
        style={{ width: `${Math.max(Math.min(100, pct), 1.5)}%`, backgroundColor: color }}
      />
    </div>
  );
}
