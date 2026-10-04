import Link from "next/link";
import { getDivisions } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function DivisionsAdmin() {
  const divisions = await getDivisions();
  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Divisions</h1>
      <p className="mt-2 text-sm text-muted">
        Edit the wording, supply list and photo for each division.
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
            <div>
              <h2 className="font-display text-2xl text-charcoal">{d.title}</h2>
              <p className="line-clamp-1 text-sm text-muted">{d.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
