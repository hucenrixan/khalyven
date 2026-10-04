export const inputCls =
  "w-full border border-silver bg-white px-4 py-3 text-[15px] text-charcoal outline-none transition-colors focus:border-charcoal";
export const labelCls = "mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

export function SaveBar({
  pending,
  state,
}: {
  pending: boolean;
  state: { ok?: boolean; error?: string } | undefined;
}) {
  return (
    <div className="flex items-center gap-5">
      <button
        type="submit"
        disabled={pending}
        className="bg-charcoal px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-white transition-colors hover:bg-charcoal-soft disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
      {state?.ok && !pending && <span className="text-sm text-green-700">Saved. The site is updated.</span>}
      {state?.error && !pending && <span className="text-sm text-red-700">{state.error}</span>}
    </div>
  );
}
