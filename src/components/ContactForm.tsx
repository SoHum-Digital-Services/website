"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full bg-transparent border-b border-[#f7eeda]/25 focus:border-haldi outline-none py-3 text-[#f7eeda] placeholder:text-[#f7eeda]/30 transition-colors disabled:opacity-50";

const labelClass =
  "font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#f7eeda]/50";

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
      <div className="border border-haldi/40 bg-haldi/5 p-10">
        <p className="font-display text-3xl text-haldi">Message sent.</p>
        <p className="mt-3 leading-relaxed text-[#f7eeda]/65">
          Thanks for reaching out — we&rsquo;ll get back to you shortly.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Name</span>
        <input
          required
          disabled={sending}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Email</span>
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

      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className={labelClass}>What are you building?</span>
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
        <p role="alert" className="sm:col-span-2 text-sm text-status-critical">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group mt-2 inline-flex items-center justify-center gap-3 justify-self-start bg-haldi px-7 py-4 font-medium text-[#1c1410] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        style={{ boxShadow: "5px 5px 0 0 var(--sindoor)" }}
      >
        {sending ? "Sending…" : "Send inquiry"}
        {!sending && (
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        )}
      </button>
    </form>
  );
}
