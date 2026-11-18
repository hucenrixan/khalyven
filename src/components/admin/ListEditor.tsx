"use client";

import { useState } from "react";
import type { ListColumn, ListItem } from "@/lib/pages";
import IconSelect from "./IconSelect";
import { inputCls, labelCls } from "./ui";

const btn =
  "border border-silver px-2.5 py-1.5 text-xs uppercase tracking-[0.15em] text-charcoal transition-colors hover:border-charcoal disabled:opacity-30";

/**
 * Add / remove / reorder editor for a repeating block. The rows are sent with
 * the surrounding form as JSON in a hidden input named `list:<name>`.
 */
export default function ListEditor({
  name,
  label,
  hint,
  columns,
  initial,
}: {
  name: string;
  label: string;
  hint?: string;
  columns: ListColumn[];
  initial: ListItem[];
}) {
  // Each row keeps a stable id so inputs don't lose focus when rows move.
  const [rows, setRows] = useState(() => initial.map((r, i) => ({ id: i, ...r })));
  const [nextId, setNextId] = useState(initial.length);
  const has = (c: ListColumn) => columns.includes(c);

  const set = (id: number, patch: Partial<ListItem>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const move = (i: number, by: number) =>
    setRows((rs) => {
      const j = i + by;
      if (j < 0 || j >= rs.length) return rs;
      const copy = [...rs];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  const add = () => {
    setRows((rs) => [...rs, { id: nextId, title: "", icon: "package", tagline: "", text: "" }]);
    setNextId((n) => n + 1);
  };

  return (
    <section className="space-y-4 border border-silver bg-white p-8">
      <div>
        <h2 className="font-display text-2xl text-charcoal">{label}</h2>
        {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      </div>
      <input
        type="hidden"
        name={`list:${name}`}
        value={JSON.stringify(rows.map(({ icon, title, tagline, text }) => ({ icon, title, tagline, text })))}
      />
      {rows.map((r, i) => (
        <div key={r.id} className="space-y-4 border border-silver-soft bg-background p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Item {i + 1}</span>
            <span className="flex gap-2">
              <button type="button" className={btn} disabled={i === 0} onClick={() => move(i, -1)}>
                ↑ Up
              </button>
              <button type="button" className={btn} disabled={i === rows.length - 1} onClick={() => move(i, 1)}>
                ↓ Down
              </button>
              <button
                type="button"
                className={`${btn} text-red-700`}
                onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}
              >
                Remove
              </button>
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Title</span>
              <input value={r.title} onChange={(e) => set(r.id, { title: e.target.value })} className={inputCls} />
            </label>
            {has("icon") && (
              <label className="block">
                <span className={labelCls}>Icon</span>
                <IconSelect value={r.icon ?? "package"} onChange={(v) => set(r.id, { icon: v })} />
              </label>
            )}
          </div>
          {has("tagline") && (
            <label className="block">
              <span className={labelCls}>Tagline</span>
              <input
                value={r.tagline ?? ""}
                onChange={(e) => set(r.id, { tagline: e.target.value })}
                className={inputCls}
              />
            </label>
          )}
          {has("text") && (
            <label className="block">
              <span className={labelCls}>Text</span>
              <textarea
                value={r.text ?? ""}
                onChange={(e) => set(r.id, { text: e.target.value })}
                rows={3}
                className={inputCls}
              />
            </label>
          )}
        </div>
      ))}
      <button type="button" onClick={add} className={`${btn} px-5 py-2.5`}>
        + Add item
      </button>
      <p className="text-xs text-muted">Items without a title are not saved.</p>
    </section>
  );
}
