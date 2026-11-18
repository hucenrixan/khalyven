"use client";

import { useState } from "react";

const field =
  "w-full border border-silver bg-white px-4 py-3.5 text-[15px] text-charcoal outline-none transition-colors placeholder:text-steel focus:border-charcoal";
const label = "mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted";

export default function QuoteForm({
  t,
  types,
  divisions,
}: {
  /** Wording from Admin → Pages → Contact. */
  t: Record<string, string>;
  types: string[];
  divisions: string[];
}) {
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
        <h3 className="font-display text-3xl text-charcoal">{t.thanksTitle}</h3>
        <p className="mt-4 text-muted">{t.thanksText}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs uppercase tracking-[0.22em] text-charcoal underline underline-offset-4"
        >
          {t.thanksAgain}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">{t.fName} *</label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="company">{t.fCompany}</label>
          <input id="company" name="company" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">{t.fEmail} *</label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="phone">{t.fPhone}</label>
          <input id="phone" name="phone" className={field} />
        </div>
        <div>
          <label className={label} htmlFor="type">{t.fType}</label>
          <select id="type" name="type" className={field} defaultValue="">
            <option value="" disabled>{t.fSelect}</option>
            {types.map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="division">{t.fDivision}</label>
          <select id="division" name="division" className={field} defaultValue="">
            <option value="" disabled>{t.fSelect}</option>
            {divisions.map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className={label} htmlFor="message">{t.fMessage} *</label>
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
        {status === "sending" ? "Sending…" : t.fSubmit}
      </button>
    </form>
  );
}
