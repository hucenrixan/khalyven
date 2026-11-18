import Link from "next/link";
import { PAGES, PAGE_KEYS, pageDef } from "@/lib/pages";

export default function PagesAdmin() {
  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Pages</h1>
      <p className="mt-2 text-sm text-muted">
        Rename any heading, paragraph, button or label on the website.
      </p>
      <div className="mt-8 space-y-4">
        {PAGE_KEYS.map((k) => (
          <Link
            key={k}
            href={`/admin/pages/${k}`}
            className="block border border-silver bg-white p-5 transition-colors hover:border-charcoal"
          >
            <h2 className="font-display text-2xl text-charcoal">{PAGES[k].label}</h2>
            <p className="mt-1 text-sm text-muted">{pageDef(k).about}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
