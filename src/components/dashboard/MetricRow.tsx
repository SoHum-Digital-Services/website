import type { ProviderResult } from "@/lib/dashboard/types";

export default function MetricRow<T>({
  label,
  result,
  render,
}: {
  label: string;
  result: ProviderResult<T> | undefined;
  render: (data: T) => React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
      <span className="text-fg-2">{label}</span>
      <span className="font-mono text-right">
        {!result ? (
          <span className="text-fg-2/50">—</span>
        ) : result.status === "ok" ? (
          render(result.data)
        ) : (
          <span className="text-fg-2/60" title={result.reason}>
            unavailable
          </span>
        )}
      </span>
    </div>
  );
}
