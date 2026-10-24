import { connectDB } from "@/lib/mongodb";
import { NavItem } from "@/models/Content";
import { deleteNavItem, resetNav, seedNav } from "../../actions";
import NavForm from "./NavForm";

export const dynamic = "force-dynamic";

type Row = { _id: unknown; label: string; href: string; group?: string | null; parent?: unknown; order: number };

export default async function NavigationAdmin() {
  await connectDB();
  const all = (await NavItem.find().sort({ order: 1, createdAt: 1 }).lean()) as (Row & { area: string })[];
  const header = all.filter((r) => r.area === "header");
  const footer = all.filter((r) => r.area === "footer");
  const tops = header.filter((r) => !r.parent).map((r) => ({ id: String(r._id), label: r.label }));

  const item = (r: Row, area: "header" | "footer") => {
    const id = String(r._id);
    return (
      <details key={id} className="border border-silver bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm">
          {r.parent ? "↳ " : ""}
          {r.label} <span className="text-muted">→ {r.href}</span>
          {area === "footer" && <span className="text-muted"> · {r.group}</span>}
        </summary>
        <div className="border-t border-silver-soft p-5">
          <NavForm
            area={area}
            id={id}
            label={r.label}
            href={r.href}
            group={r.group ?? ""}
            parent={r.parent ? String(r.parent) : ""}
            order={r.order}
            parents={tops}
          />
          <form action={deleteNavItem} className="mt-3">
            <input type="hidden" name="id" value={id} />
            <button className="text-xs uppercase tracking-[0.15em] text-red-700 underline underline-offset-4">
              Delete{area === "header" && !r.parent ? " (and its sub-menu)" : ""}
            </button>
          </form>
        </div>
      </details>
    );
  };

  const block = (area: "header" | "footer", rows: Row[], title: string) => (
    <section key={area} className="mt-10">
      <h2 className="font-display text-2xl text-charcoal">{title}</h2>
      {rows.length === 0 ? (
        <div className="mt-3 border border-silver bg-white p-5 text-sm text-muted">
          Using the built-in menu. To edit it, copy it here first.
          <form action={seedNav} className="mt-3">
            <input type="hidden" name="area" value={area} />
            <button className="bg-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white">
              Customize this menu
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-3 space-y-2">
          {rows.map((r) => item(r, area))}
        </div>
      )}
      {rows.length > 0 && (
        <>
          <details className="mt-3 border border-silver bg-white">
            <summary className="cursor-pointer p-4 text-sm uppercase tracking-[0.2em]">+ Add link</summary>
            <div className="border-t border-silver-soft p-5">
              <NavForm area={area} parents={tops} />
            </div>
          </details>
          <form action={resetNav} className="mt-3">
            <input type="hidden" name="area" value={area} />
            <button className="text-xs text-muted underline underline-offset-4">
              Reset to the built-in menu
            </button>
          </form>
        </>
      )}
    </section>
  );

  // Header items are listed parent-first so sub-menu entries sit under their parent.
  const ordered = tops.flatMap((t) => {
    const parent = header.find((r) => String(r._id) === t.id)!;
    return [parent, ...header.filter((r) => r.parent && String(r.parent) === t.id)];
  });

  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Navigation</h1>
      <p className="mt-2 text-sm text-muted">
        Manage the header menu (with drop-down sub-menus) and the footer link columns.
      </p>
      {block("header", ordered, "Header menu")}
      {block("footer", footer, "Footer links")}
    </>
  );
}
