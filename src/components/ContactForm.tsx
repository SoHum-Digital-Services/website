"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "bg-transparent border-b border-line focus:border-copper outline-none py-2 text-paper placeholder:text-paper-dim/50 transition-colors disabled:opacity-50";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="border border-copper/40 p-8">
        <p className="font-display text-2xl text-copper mb-2">Message sent.</p>
        <p className="text-paper-dim">
          Thanks for reaching out — we&rsquo;ll get back to you shortly.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-sm">
        <span className="text-paper-dim tracking-wide uppercase text-xs">Name</span>
        <input
          required
          disabled={sending}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className="text-paper-dim tracking-wide uppercase text-xs">Email</span>
        <input
          required
          type="email"
          disabled={sending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
      </label>

      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        <span className="text-paper-dim tracking-wide uppercase text-xs">
          What are you building?
        </span>
        <textarea
          required
          rows={4}
          disabled={sending}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Tell us about the project"
        />
      </label>

      {/* Honeypot — hidden from users, bots fill it in. */}
      <div aria-hidden className="hidden">
        <label>
          Company
          <input
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 text-sm text-copper-bright">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="sm:col-span-2 justify-self-start mt-2 inline-flex items-center gap-3 bg-copper text-ink font-medium px-6 py-3 hover:bg-copper-bright transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? "Sending…" : "Send inquiry"}
        {!sending && <span aria-hidden>&rarr;</span>}
      </button>
    </form>
  );
}
