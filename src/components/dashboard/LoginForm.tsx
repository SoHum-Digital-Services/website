"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Status = "idle" | "sending" | "error";

const inputClass =
  "bg-transparent border-b border-line focus:border-copper outline-none py-2 text-paper placeholder:text-paper-dim/50 transition-colors disabled:opacity-50";

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
    <form onSubmit={handleSubmit} className="grid gap-6 max-w-sm">
      <label className="flex flex-col gap-2 text-sm">
        <span className="text-paper-dim tracking-wide uppercase text-xs">Password</span>
        <input
          required
          type="password"
          autoFocus
          disabled={sending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="••••••••"
        />
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-copper-bright">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="justify-self-start inline-flex items-center gap-3 bg-copper text-ink font-medium px-6 py-3 hover:bg-copper-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Signing in…" : "Sign in"}
        {!sending && <span aria-hidden>&rarr;</span>}
      </button>
    </form>
  );
}
