export default function UsageBar({ usedBytes, capBytes }: { usedBytes: number; capBytes: number }) {
  const pct = Math.min(100, (usedBytes / capBytes) * 100);
  const color =
    pct >= 90 ? "var(--status-critical)" : pct >= 70 ? "var(--status-warning)" : "var(--copper)";

  return (
    <div className="w-full">
      <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width]"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
