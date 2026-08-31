"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const INTERVAL_MS = 60_000;

export default function AutoRefresh() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(INTERVAL_MS / 1000);

  useEffect(() => {
    const tick = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          router.refresh();
          return INTERVAL_MS / 1000;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [router]);

  return (
    <div className="flex items-center gap-3 text-xs text-paper-dim">
      <span>Refreshing in {secondsLeft}s</span>
      <button
        type="button"
        onClick={() => {
          router.refresh();
          setSecondsLeft(INTERVAL_MS / 1000);
        }}
        className="text-copper hover:text-copper-bright transition-colors underline underline-offset-2"
      >
        Refresh now
      </button>
    </div>
  );
}
