"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const INTERVAL_S = 60;

export default function AutoRefresh() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(INTERVAL_S);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          router.refresh();
          return INTERVAL_S;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [router]);

  const progress = ((INTERVAL_S - secondsLeft) / INTERVAL_S) * 100;

  return (
    <div className="flex items-center gap-3">
      {/* Countdown ring — the refresh cycle, made visible */}
      <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden className="-rotate-90">
        <circle cx="10" cy="10" r="8" fill="none" stroke="var(--rule)" strokeWidth="2.5" />
        <circle
          cx="10"
          cy="10"
          r="8"
          fill="none"
          stroke="var(--haldi)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 8}
          strokeDashoffset={(2 * Math.PI * 8 * (100 - progress)) / 100}
        />
      </svg>
      <span className="font-mono text-xs text-fg-2">{secondsLeft}s</span>
      <button
        type="button"
        onClick={() => {
          router.refresh();
          setSecondsLeft(INTERVAL_S);
        }}
        className="font-mono text-xs uppercase tracking-[0.16em] text-haldi underline decoration-haldi/40 underline-offset-4 transition-colors hover:decoration-haldi"
      >
        Refresh
      </button>
    </div>
  );
}
