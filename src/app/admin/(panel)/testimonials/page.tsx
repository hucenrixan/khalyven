import { connectDB } from "@/lib/mongodb";
import { Testimonial } from "@/models/Content";
import { deleteTestimonial } from "../../actions";
import TestimonialForm from "./TestimonialForm";

export const dynamic = "force-dynamic";

export default async function TestimonialsAdmin() {
  await connectDB();
  const rows = await Testimonial.find().sort({ order: 1, createdAt: -1 }).lean();
  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Testimonials</h1>
      <p className="mt-2 text-sm text-muted">Client quotes shown on the home page.</p>

      <details className="mt-8 border border-silver bg-white">
        <summary className="cursor-pointer p-5 text-sm uppercase tracking-[0.2em]">+ Add testimonial</summary>
        <div className="border-t border-silver-soft p-6">
          <TestimonialForm />
        </div>
      </details>

      <div className="mt-6 space-y-4">
        {rows.map((r) => {
          const id = String(r._id);
          return (
            <details key={id} className="border border-silver bg-white">
              <summary className="cursor-pointer p-5">
                <span className="font-display text-xl text-charcoal">{r.author}</span>
                <span className="ml-3 text-sm text-muted">
                  {[r.role, r.company].filter(Boolean).join(", ")}
                  {!r.published && " · hidden"}
                </span>
              </summary>
              <div className="border-t border-silver-soft p-6">
                <TestimonialForm
                  id={id}
                  quote={r.quote}
                  author={r.author}
                  role={r.role ?? ""}
                  company={r.company ?? ""}
                  order={r.order}
                  published={r.published}
                />
                <form action={deleteTestimonial} className="mt-4">
                  <input type="hidden" name="id" value={id} />
                  <button className="text-xs uppercase tracking-[0.15em] text-red-700 underline underline-offset-4">
                    Delete
                  </button>
                </form>
              </div>
            </details>
          );
        })}
        {rows.length === 0 && <p className="text-sm text-muted">No testimonials yet.</p>}
      </div>
    </>
  );
}
