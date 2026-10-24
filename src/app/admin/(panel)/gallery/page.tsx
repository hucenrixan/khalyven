import { connectDB } from "@/lib/mongodb";
import { GalleryItem } from "@/models/Content";
import { deleteGalleryItem } from "../../actions";
import GalleryForm from "./GalleryForm";

export const dynamic = "force-dynamic";

export default async function GalleryAdmin() {
  await connectDB();
  const rows = await GalleryItem.find().sort({ order: 1, createdAt: -1 }).lean();
  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Gallery</h1>
      <p className="mt-2 text-sm text-muted">
        Photos shown on the public <span className="font-mono">/gallery</span> page.
      </p>

      <details className="mt-8 border border-silver bg-white">
        <summary className="cursor-pointer p-5 text-sm uppercase tracking-[0.2em]">+ Add photo</summary>
        <div className="border-t border-silver-soft p-6">
          <GalleryForm />
        </div>
      </details>

      <div className="mt-6 space-y-4">
        {rows.map((r) => {
          const id = String(r._id);
          return (
            <details key={id} className="border border-silver bg-white">
              <summary className="flex cursor-pointer items-center gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt="" className="h-16 w-24 object-cover" />
                <span className="text-sm text-charcoal">
                  {r.caption || "Untitled"}
                  {!r.published && <span className="text-muted"> · hidden</span>}
                </span>
              </summary>
              <div className="border-t border-silver-soft p-6">
                <GalleryForm
                  id={id}
                  image={r.image}
                  caption={r.caption ?? ""}
                  category={r.category ?? ""}
                  order={r.order}
                  published={r.published}
                />
                <form action={deleteGalleryItem} className="mt-4">
                  <input type="hidden" name="id" value={id} />
                  <button className="text-xs uppercase tracking-[0.15em] text-red-700 underline underline-offset-4">
                    Delete
                  </button>
                </form>
              </div>
            </details>
          );
        })}
        {rows.length === 0 && <p className="text-sm text-muted">No photos yet.</p>}
      </div>
    </>
  );
}
