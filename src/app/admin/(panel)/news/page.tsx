import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/Content";
import { deletePost } from "../../actions";
import PostForm from "./PostForm";

export const dynamic = "force-dynamic";

export default async function NewsAdmin() {
  await connectDB();
  const rows = await Post.find().sort({ createdAt: -1 }).lean();
  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">News</h1>
      <p className="mt-2 text-sm text-muted">
        Articles appear at <span className="font-mono">/news</span> once published.
      </p>

      <details className="mt-8 border border-silver bg-white">
        <summary className="cursor-pointer p-5 text-sm uppercase tracking-[0.2em]">+ New article</summary>
        <div className="border-t border-silver-soft p-6">
          <PostForm />
        </div>
      </details>

      <div className="mt-6 space-y-4">
        {rows.map((r) => {
          const id = String(r._id);
          return (
            <details key={id} className="border border-silver bg-white">
              <summary className="cursor-pointer p-5">
                <span className="font-display text-xl text-charcoal">{r.title}</span>
                <span className="ml-3 text-sm text-muted">{r.published ? "Published" : "Draft"}</span>
              </summary>
              <div className="border-t border-silver-soft p-6">
                <PostForm
                  id={id}
                  title={r.title}
                  slug={r.slug}
                  excerpt={r.excerpt ?? ""}
                  body={r.body ?? ""}
                  image={r.image ?? ""}
                  published={r.published}
                />
                <form action={deletePost} className="mt-4">
                  <input type="hidden" name="id" value={id} />
                  <button className="text-xs uppercase tracking-[0.15em] text-red-700 underline underline-offset-4">
                    Delete
                  </button>
                </form>
              </div>
            </details>
          );
        })}
        {rows.length === 0 && <p className="text-sm text-muted">No articles yet.</p>}
      </div>
    </>
  );
}
