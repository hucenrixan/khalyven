import Link from "next/link";
import { IconMail, IconPhone, IconMapPin } from "@tabler/icons-react";
import Logo from "./Logo";
import { CONTACT, NAV, DIVISIONS } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-silver">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-6 text-sm leading-relaxed text-steel">
            Born in the Maldives, strategically anchored in Malaysia. Premium procurement for the
            Indian Ocean&apos;s most exclusive destinations.
          </p>
        </div>

        <div>
          <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-white">Navigate</h4>
          <ul className="space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-white">Divisions</h4>
          <ul className="space-y-3 text-sm">
            {DIVISIONS.map((d) => (
              <li key={d.slug}>
                <Link href={`/divisions#${d.slug}`} className="transition-colors hover:text-white">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs uppercase tracking-[0.25em] text-white">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <IconMail size={18} className="mt-0.5 shrink-0 text-steel" />
              {CONTACT.email}
            </li>
            <li className="flex gap-3">
              <IconPhone size={18} className="mt-0.5 shrink-0 text-steel" />
              {CONTACT.phone}
            </li>
            <li className="flex gap-3">
              <IconMapPin size={18} className="mt-0.5 shrink-0 text-steel" />
              <span>
                {CONTACT.maldives}
                <br />
                {CONTACT.malaysia}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs tracking-wide text-steel">
        © {new Date().getFullYear()} Khalyven International. All rights reserved.
      </div>
    </footer>
  );
}
