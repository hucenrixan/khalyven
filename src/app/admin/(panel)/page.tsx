import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  let fresh = 0;
  let total = 0;
  let dbError = false;
  try {
    await connectDB();
    [fresh, total] = await Promise.all([
      Inquiry.countDocuments({ status: "new" }),
      Inquiry.countDocuments(),
    ]);
  } catch {
    dbError = true;
  }

  const cards = [
    { href: "/admin/inquiries", title: "Inquiries", text: `${fresh} new · ${total} total` },
    { href: "/admin/divisions", title: "Divisions", text: "Edit text, supply lists and photos" },
    { href: "/admin/settings", title: "Photos & Contact", text: "Site photos and contact details" },
  ];

  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Dashboard</h1>
      {dbError && (
        <p className="mt-4 border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          Can&apos;t reach the database. Check MONGODB_URI and Atlas network access.
        </p>
      )}
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border border-silver bg-white p-6 transition-colors hover:border-charcoal"
          >
            <h2 className="font-display text-2xl text-charcoal">{c.title}</h2>
            <p className="mt-2 text-sm text-muted">{c.text}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
