"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconChevronDown, IconMenu2, IconX } from "@tabler/icons-react";
import Logo from "./Logo";
import type { NavNode } from "@/lib/data";

export default function Header({ nav }: { nav: NavNode[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" aria-label="Khalyven International home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href.split("#")[0]);
            const cls = `text-[13px] uppercase tracking-[0.18em] transition-colors hover:text-white ${
              active ? "text-white" : "text-silver"
            }`;
            if (!n.children.length) {
              return (
                <Link key={n.href + n.label} href={n.href} className={cls}>
                  {n.label}
                </Link>
              );
            }
            return (
              <div key={n.href + n.label} className="group relative">
                <Link href={n.href} className={`${cls} inline-flex items-center gap-1`}>
                  {n.label}
                  <IconChevronDown size={14} />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 pt-6 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="border border-white/10 bg-charcoal py-2 shadow-xl">
                    {n.children.map((c) => (
                      <Link
                        key={c.href + c.label}
                        href={c.href}
                        className="block px-5 py-3 text-[12px] uppercase tracking-[0.15em] text-silver transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <Link
            href="/contact"
            className="border border-silver px-5 py-2.5 text-[12px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-charcoal"
          >
            Partner With Us
          </Link>
        </nav>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <IconX size={26} /> : <IconMenu2 size={26} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-charcoal px-6 pb-6 md:hidden">
          {nav.map((n) => (
            <div key={n.href + n.label}>
              <Link
                href={n.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/5 py-4 text-sm uppercase tracking-[0.18em] text-silver"
              >
                {n.label}
              </Link>
              {n.children.map((c) => (
                <Link
                  key={c.href + c.label}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/5 py-3 pl-6 text-xs uppercase tracking-[0.15em] text-steel"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
