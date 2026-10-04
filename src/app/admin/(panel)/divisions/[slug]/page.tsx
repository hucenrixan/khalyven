import Link from "next/link";
import { notFound } from "next/navigation";
import { getDivisions } from "@/lib/data";
import DivisionForm from "./DivisionForm";

export const dynamic = "force-dynamic";

export default async function EditDivision({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const division = (await getDivisions()).find((d) => d.slug === slug);
  if (!division) notFound();
  return (
    <>
      <Link href="/admin/divisions" className="text-sm text-muted underline underline-offset-4">
        ← All divisions
      </Link>
      <h1 className="font-display mt-4 text-4xl text-charcoal">{division.title}</h1>
      <DivisionForm
        slug={division.slug}
        title={division.title}
        summary={division.summary}
        detail={division.detail}
        items={division.items}
        image={division.image}
      />
    </>
  );
}
