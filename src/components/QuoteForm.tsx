"use client";

import { useState } from "react";
import { DIVISIONS, INQUIRY_TYPES } from "@/lib/content";

const field =
  "w-full border border-silver bg-white px-4 py-3.5 text-[15px] text-charcoal outline-none transition-colors placeholder:text-steel focus:border-charcoal";
const label = "mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted";

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-silver bg-white p-10 text-center">
        <h3 className="font-display text-3xl text-charcoal">Thank you.</h3>
        <p className="mt-4 text-muted">
          Your inquiry has reached our procurement team. We will respond shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs uppercase tracking-[0.22em] text-charcoal underline underline-offset-4"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Full name *</label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="company">Company / Property</label>
          <input id="company" name="company" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="type">I am a</label>
          <select id="type" name="type" className={field} defaultValue="">
            <option value="" disabled>Select</option>
            {INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="division">Division of interest</label>
          <select id="division" name="division" className={field} defaultValue="">
            <option value="" disabled>Select</option>
            {DIVISIONS.map((d) => <option key={d.slug}>{d.title}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="message">Tell us what you need *</label>
        <textarea id="message" name="message" required rows={6} className={field} />
      </div>
      {/* honeypot */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {status === "error" && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-charcoal px-10 py-4 text-[12px] uppercase tracking-[0.22em] text-white transition-colors hover:bg-charcoal-soft disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}
