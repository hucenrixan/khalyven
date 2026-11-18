import Link from "next/link";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/data";
import { isPageKey, pageDef } from "@/lib/pages";
import { resetPage } from "../../../actions";
import PageForm from "./PageForm";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  if (!isPageKey(page)) notFound();
  const def = pageDef(page);
  const { t, lists } = await getPage(page);
  return (
    <>
      <Link href="/admin/pages" className="text-sm text-muted underline underline-offset-4">
        ← All pages
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-4xl text-charcoal">{def.label}</h1>
        {def.path && (
          <Link href={def.path} target="_blank" className="text-sm text-muted underline underline-offset-4">
            View page ↗
          </Link>
        )}
      </div>
      <p className="mt-2 text-sm text-muted">{def.about}</p>
      {/* Keyed on the saved wording so the form refreshes after a reset. */}
      <PageForm key={JSON.stringify([t, lists])} page={page} def={def} values={t} lists={lists} />
      <form action={resetPage} className="mt-8">
        <input type="hidden" name="page" value={page} />
        <button className="text-xs text-muted underline underline-offset-4">
          Reset this page to its original wording
        </button>
      </form>
    </>
  );
}
