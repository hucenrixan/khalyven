import Link from "next/link";
import { notFound } from "next/navigation";
import { DIVISION_PLACEHOLDER, getDivisions } from "@/lib/data";
import { deleteDivision } from "../../../actions";
import DivisionForm from "./DivisionForm";

export const dynamic = "force-dynamic";

export default async function EditDivision({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const divisions = await getDivisions();
  const creating = slug === "new";
  const division = divisions.find((d) => d.slug === slug);
  if (!division && !creating) notFound();
  const lastOrder = divisions.length ? divisions[divisions.length - 1].order : 0;
  return (
    <>
      <Link href="/admin/divisions" className="text-sm text-muted underline underline-offset-4">
        ← All divisions
      </Link>
      <h1 className="font-display mt-4 text-4xl text-charcoal">{division?.title ?? "New division"}</h1>
      <DivisionForm
        slug={division?.slug ?? ""}
        title={division?.title ?? ""}
        summary={division?.summary ?? ""}
        detail={division?.detail ?? ""}
        items={division?.items ?? []}
        image={division?.image ?? DIVISION_PLACEHOLDER}
        icon={division?.icon ?? "package"}
        order={division?.order ?? lastOrder + 10}
      />
      {division && (
        <form action={deleteDivision} className="mt-6">
          <input type="hidden" name="slug" value={division.slug} />
          <button className="text-xs uppercase tracking-[0.15em] text-red-700 underline underline-offset-4">
            Remove this division from the website
          </button>
        </form>
      )}
    </>
  );
}
