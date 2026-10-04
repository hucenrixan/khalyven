import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logout } from "../actions";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/divisions", label: "Divisions" },
  { href: "/admin/settings", label: "Photos & Contact" },
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await auth())) redirect("/admin/login");
  return (
    <div className="min-h-screen md:flex">
      <aside className="bg-charcoal px-6 py-6 text-silver md:min-h-screen md:w-64 md:shrink-0">
        <Link href="/admin" className="block">
          <Logo />
        </Link>
        <nav className="mt-8 flex gap-1 overflow-x-auto md:flex-col">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="whitespace-nowrap px-3 py-2.5 text-sm transition-colors hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/"
            target="_blank"
            className="whitespace-nowrap px-3 py-2.5 text-sm transition-colors hover:bg-white/10 hover:text-white"
          >
            View website ↗
          </Link>
        </nav>
        <form action={logout} className="mt-6 md:mt-10">
          <button className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-steel hover:text-white">
            Sign out
          </button>
        </form>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
