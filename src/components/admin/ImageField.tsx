"use client";

import { useRef, useState } from "react";

// Uploads straight to Cloudinary using a server-signed request, then stores
// the resulting URL in a hidden input so the surrounding form can save it.
export default function ImageField({
  name,
  label,
  current,
  fallback,
  hint,
}: {
  name: string;
  label: string;
  current?: string;
  fallback: string;
  hint?: string;
}) {
  const [url, setUrl] = useState(current ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);

  async function onFile(file: File) {
    setError("");
    if (!file.type.startsWith("image/")) return setError("Please choose an image file.");
    if (file.size > 10 * 1024 * 1024) return setError("Image is larger than 10 MB.");
    setBusy(true);
    try {
      const sign = await fetch("/api/admin/sign-upload", { method: "POST" });
      const s = await sign.json();
      if (!sign.ok) throw new Error(s.error || "Could not start upload.");

      const body = new FormData();
      body.append("file", file);
      body.append("api_key", s.apiKey);
      body.append("timestamp", String(s.timestamp));
      body.append("signature", s.signature);
      body.append("folder", s.folder);
      const up = await fetch(`https://api.cloudinary.com/v1_1/${s.cloudName}/image/upload`, {
        method: "POST",
        body,
      });
      const r = await up.json();
      if (!up.ok) throw new Error(r.error?.message || "Upload failed.");
      setUrl(r.secure_url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  return (
    <div>
      <p className="mb-2 text-[11px] uppercase tracking-[0.22em] text-muted">{label}</p>
      <div className="flex flex-wrap items-start gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url || fallback}
          alt=""
          className="h-32 w-48 border border-silver object-cover"
        />
        <div className="space-y-2">
          <input type="hidden" name={name} value={url} />
          <input
            ref={input}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
          />
          <button
            type="button"
            disabled={busy}
            onClick={() => input.current?.click()}
            className="border border-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-charcoal hover:text-white disabled:opacity-50"
          >
            {busy ? "Uploading…" : url ? "Replace photo" : "Upload photo"}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="block text-xs text-muted underline underline-offset-4"
            >
              Use the default photo
            </button>
          )}
          {hint && <p className="max-w-xs text-xs text-muted">{hint}</p>}
          {error && <p className="max-w-xs text-xs text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}
