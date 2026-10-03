import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function Heading({
  eyebrow,
  title,
  text,
  dark = false,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mb-14 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p
          className={`mb-4 text-xs uppercase tracking-[0.3em] ${dark ? "text-silver" : "text-muted"}`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-4xl font-medium leading-tight md:text-5xl ${
          dark ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <span className={`rule mt-6 ${center ? "mx-auto" : ""}`} />
      {text && (
        <p className={`mt-6 text-lg leading-relaxed ${dark ? "text-silver" : "text-muted"}`}>
          {text}
        </p>
      )}
    </div>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "outline-light";
}) {
  const styles = {
    solid: "bg-charcoal text-white hover:bg-charcoal-soft",
    outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white",
    "outline-light": "border border-silver text-white hover:bg-white hover:text-charcoal",
  }[variant];
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 px-8 py-4 text-[12px] uppercase tracking-[0.22em] transition-colors ${styles}`}
    >
      {children}
      <IconArrowRight size={16} />
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="dark-surface pattern-grid px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs uppercase tracking-[0.3em] text-silver">{eyebrow}</p>
        <h1 className="font-display max-w-4xl text-5xl font-medium leading-[1.05] text-white md:text-7xl">
          {title}
        </h1>
        <span className="rule mt-8" />
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-silver">{text}</p>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="dark-surface pattern-grid px-6 py-24 text-center">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl font-medium text-white md:text-6xl">
          Secure Your Supply Chain
        </h2>
        <span className="rule mx-auto mt-8" />
        <p className="mt-8 text-lg leading-relaxed text-silver">
          Discover how Khalyven can elevate your property, project or enterprise with world-class
          ASEAN procurement.
        </p>
        <div className="mt-10">
          <Button href="/contact" variant="outline-light">
            Contact Our Procurement Team
          </Button>
        </div>
      </div>
    </section>
  );
}
