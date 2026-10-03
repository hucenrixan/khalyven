"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Logo from "./Logo";
import { NAV } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-charcoal/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" aria-label="Khalyven International home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`text-[13px] uppercase tracking-[0.18em] transition-colors hover:text-white ${
                  active ? "text-white" : "text-silver"
                }`}
              >
                {n.label}
              </Link>
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
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-4 text-sm uppercase tracking-[0.18em] text-silver"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
