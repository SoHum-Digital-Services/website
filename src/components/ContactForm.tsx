"use client";

import { useState } from "react";

const CONTACT_EMAIL = "siddhartha@sohum.cc";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name || "website visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-sm">
        <span className="text-paper-dim tracking-wide uppercase text-xs">Name</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent border-b border-line focus:border-copper outline-none py-2 text-paper placeholder:text-paper-dim/50 transition-colors"
          placeholder="Your name"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        <span className="text-paper-dim tracking-wide uppercase text-xs">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border-b border-line focus:border-copper outline-none py-2 text-paper placeholder:text-paper-dim/50 transition-colors"
          placeholder="you@example.com"
        />
      </label>
      <label className="flex flex-col gap-2 text-sm sm:col-span-2">
        <span className="text-paper-dim tracking-wide uppercase text-xs">What are you building?</span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent border-b border-line focus:border-copper outline-none py-2 text-paper placeholder:text-paper-dim/50 transition-colors resize-none"
          placeholder="Tell us about the project"
        />
      </label>
      <button
        type="submit"
        className="sm:col-span-2 justify-self-start mt-2 inline-flex items-center gap-3 bg-copper text-ink font-medium px-6 py-3 hover:bg-copper-bright transition-colors"
      >
        Send inquiry
        <span aria-hidden>&rarr;</span>
      </button>
    </form>
  );
}
