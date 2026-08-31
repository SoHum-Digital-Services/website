"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Status = "idle" | "sending" | "error";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/dashboard-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      router.push(searchParams.get("next") || "/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-fg-2">
          Password
        </span>
        <input
          required
          type="password"
          autoFocus
          disabled={sending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-b border-rule bg-transparent py-3 text-fg outline-none transition-colors placeholder:text-fg-2/40 focus:border-haldi disabled:opacity-50"
          placeholder="••••••••"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-status-critical">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group inline-flex items-center justify-center gap-3 justify-self-start bg-haldi px-7 py-4 font-medium text-[#100d1a] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        style={{ boxShadow: "5px 5px 0 0 var(--sindoor)" }}
      >
        {sending ? "Signing in…" : "Sign in"}
        {!sending && (
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        )}
      </button>
    </form>
  );
}
