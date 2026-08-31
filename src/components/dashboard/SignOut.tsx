"use client";

import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/dashboard-auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      }}
      className="font-mono text-xs uppercase tracking-[0.16em] text-fg-2 transition-colors hover:text-sindoor"
    >
      Sign out
    </button>
  );
}
