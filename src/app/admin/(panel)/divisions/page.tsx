import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { getDivisions } from "@/lib/data";
import { SiteIcon } from "@/lib/icons";
import { DivisionContent } from "@/models/SiteContent";
import { restoreDivisions } from "../../actions";

export const dynamic = "force-dynamic";

export default async function DivisionsAdmin() {
  const divisions = await getDivisions();
  let removed = 0;
  try {
    await connectDB();
    removed = await DivisionContent.countDocuments({ deleted: true });
  } catch {
    // count is optional
  }
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl text-charcoal">Divisions</h1>
        <Link
          href="/admin/divisions/new"
          className="bg-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white"
        >
          + Add division
        </Link>
      </div>
      <p className="mt-2 text-sm text-muted">
        Add, rename, reorder or remove divisions, and edit each one&apos;s wording, icon, supply list and
        photo. The page banner is under Pages → Divisions page.
      </p>
      <div className="mt-8 space-y-4">
        {divisions.map((d) => (
          <Link
            key={d.slug}
            href={`/admin/divisions/${d.slug}`}
            className="flex items-center gap-5 border border-silver bg-white p-4 transition-colors hover:border-charcoal"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.image} alt="" className="h-20 w-28 object-cover" />
            <SiteIcon name={d.icon} size={28} className="shrink-0 text-steel" />
            <div>
              <h2 className="font-display text-2xl text-charcoal">{d.title}</h2>
              <p className="line-clamp-1 text-sm text-muted">{d.summary}</p>
            </div>
          </Link>
        ))}
        {divisions.length === 0 && (
          <p className="border border-silver bg-white p-8 text-center text-muted">No divisions yet.</p>
        )}
      </div>
      {removed > 0 && (
        <form action={restoreDivisions} className="mt-6">
          <button className="text-xs text-muted underline underline-offset-4">
            Restore {removed} removed original division{removed === 1 ? "" : "s"}
          </button>
        </form>
      )}
    </>
  );
}
