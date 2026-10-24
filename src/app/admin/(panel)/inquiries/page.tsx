import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { deleteInquiry, saveInquiryNotes, setInquiryStatus } from "../../actions";

export const dynamic = "force-dynamic";

const BADGE: Record<string, string> = {
  new: "bg-sky-100 text-sky-800",
  contacted: "bg-amber-100 text-amber-800",
  closed: "bg-slate-200 text-slate-700",
};

const esc = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default async function Inquiries({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "" } = await searchParams;
  await connectDB();
  const filter: Record<string, unknown> = {};
  if (["new", "contacted", "closed"].includes(status)) filter.status = status;
  if (q.trim()) {
    const re = new RegExp(esc(q.trim().slice(0, 80)), "i");
    filter.$or = ["name", "company", "email", "phone", "message", "division"].map((f) => ({ [f]: re }));
  }
  const rows = await Inquiry.find(filter).sort({ createdAt: -1 }).limit(200).lean();

  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Inquiries</h1>
      <p className="mt-2 text-sm text-muted">Messages sent through the website contact form.</p>

      <form className="mt-6 flex flex-wrap items-center gap-3">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name, company, email, message…"
          className="min-w-64 flex-1 border border-silver bg-white px-4 py-2.5 text-sm outline-none focus:border-charcoal"
        />
        <select
          name="status"
          defaultValue={status}
          className="border border-silver bg-white px-3 py-2.5 text-sm outline-none focus:border-charcoal"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
        <button className="bg-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white">
          Filter
        </button>
        <a
          href="/api/admin/inquiries/export"
          className="border border-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-charcoal hover:bg-charcoal hover:text-white"
        >
          Export CSV
        </a>
      </form>

      {rows.length === 0 && (
        <p className="mt-10 border border-silver bg-white p-8 text-center text-muted">
          No inquiries yet.
        </p>
      )}

      <div className="mt-8 space-y-5">
        {rows.map((r) => {
          const id = String(r._id);
          return (
            <article key={id} className="border border-silver bg-white p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl text-charcoal">{r.name}</h2>
                  <p className="text-sm text-muted">
                    {[r.company, r.type].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs uppercase tracking-[0.15em] ${BADGE[r.status ?? "new"]}`}>
                  {r.status}
                </span>
              </div>
              <p className="mt-4 whitespace-pre-wrap leading-relaxed text-charcoal">{r.message}</p>
              <dl className="mt-4 grid gap-1 text-sm text-muted sm:grid-cols-2">
                <div>
                  <a className="underline underline-offset-4" href={`mailto:${r.email}`}>{r.email}</a>
                </div>
                {r.phone && <div>{r.phone}</div>}
                {r.division && <div>Interested in: {r.division}</div>}
                <div>{new Date(r.createdAt as Date).toLocaleString("en-GB")}</div>
              </dl>
              <form action={saveInquiryNotes} className="mt-5 flex gap-3">
                <input type="hidden" name="id" value={id} />
                <textarea
                  name="notes"
                  defaultValue={r.notes ?? ""}
                  rows={2}
                  placeholder="Private notes (only visible here)…"
                  className="flex-1 border border-silver px-3 py-2 text-sm outline-none focus:border-charcoal"
                />
                <button className="self-start border border-silver px-3 py-2 text-xs uppercase tracking-[0.15em] hover:border-charcoal">
                  Save note
                </button>
              </form>
              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-silver-soft pt-4">
                {(["new", "contacted", "closed"] as const).map((s) => (
                  <form key={s} action={setInquiryStatus}>
                    <input type="hidden" name="id" value={id} />
                    <input type="hidden" name="status" value={s} />
                    <button
                      disabled={r.status === s}
                      className="border border-silver px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-charcoal transition-colors hover:border-charcoal disabled:border-charcoal disabled:bg-charcoal disabled:text-white"
                    >
                      {s}
                    </button>
                  </form>
                ))}
                <form action={deleteInquiry} className="ml-auto">
                  <input type="hidden" name="id" value={id} />
                  <button className="text-xs uppercase tracking-[0.15em] text-red-700 underline underline-offset-4">
                    Delete
                  </button>
                </form>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
