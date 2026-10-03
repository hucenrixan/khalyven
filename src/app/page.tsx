import Image from "next/image";
import Link from "next/link";
import { Button, CtaBand, Heading, Section } from "@/components/ui";
import { ADVANTAGES, CLIENTS, DIVISIONS, PROCESS } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal px-6 py-32 md:py-48">
        <Image
          src="/photos/hero.jpg"
          alt="Aerial view of overwater villas in the Maldives"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-silver">
            Strategic Procurement · Maldives × ASEAN
          </p>
          <h1 className="font-display max-w-4xl text-6xl font-medium leading-[1.02] md:text-8xl">
            <span className="silver-text">Elevating the Maldivian Standard.</span>
          </h1>
          <span className="rule mt-10" />
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-silver md:text-xl">
            The premier strategic procurement and supply partner bridging Malaysia and other ASEAN
            manufacturing excellence with the Maldives&apos; most discerning resorts, developers and
            commercial enterprises.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href="/contact" variant="outline-light">Partner With Us</Button>
            <Button href="/divisions" variant="outline-light">Explore Our Divisions</Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <Section>
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <Heading eyebrow="Who We Are" title="Redefining Seamless Procurement" />
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            <p>
              Operating at the intersection of quality, scale and exclusivity, Khalyven International
              is a distinguished supply enterprise registered in the Maldives, with a strategic
              procurement hub in Malaysia. We bypass traditional supply-chain friction to deliver
              world-class products directly from the heart of Southeast Asia to the shores of the
              Indian Ocean.
            </p>
            <p>
              Whether outfitting a newly developed private island, sourcing premium gastronomy or
              upgrading commercial infrastructure, we provide a frictionless, end-to-end procurement
              experience tailored for the luxury and commercial sectors.
            </p>
          </div>
        </div>
      </Section>

      {/* Divisions */}
      <Section className="bg-mist">
        <Heading
          eyebrow="Areas of Expertise"
          title="Our Divisions"
          text="Five specialist divisions, one accountable partner."
        />
        <div className="grid gap-px bg-silver md:grid-cols-2 lg:grid-cols-3">
          {DIVISIONS.map((d) => (
            <Link
              key={d.slug}
              href={`/divisions#${d.slug}`}
              className="group bg-background p-10 transition-colors hover:bg-charcoal"
            >
              <d.icon size={34} stroke={1.2} className="text-steel group-hover:text-silver" />
              <h3 className="font-display mt-8 text-2xl font-semibold text-charcoal group-hover:text-white">
                {d.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted group-hover:text-silver">{d.summary}</p>
            </Link>
          ))}
          <div className="flex flex-col justify-center bg-charcoal p-10">
            <p className="font-display text-2xl text-white">Need something specific?</p>
            <p className="mt-3 text-silver">If it can be manufactured in ASEAN, we can source it.</p>
            <Link
              href="/contact"
              className="mt-6 text-xs uppercase tracking-[0.22em] text-white underline underline-offset-8"
            >
              Send a brief
            </Link>
          </div>
        </div>
      </Section>

      {/* Why us */}
      <Section>
        <div className="mb-14 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="[&>div]:mb-0">
            <Heading
              eyebrow="The Khalyven Advantage"
              title="A Transnational Footprint"
              text="With foundational roots in the Maldives and a dynamic operational expansion into Malaysia, we hold a rare dual-market advantage: we audit manufacturers, enforce strict quality control and negotiate exclusive pricing at the source, passing that value, speed and reliability on to our Maldivian clientele."
            />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/photos/source.jpg"
              alt="Container terminal with cranes and stacked shipping containers"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-charcoal/25" />
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {ADVANTAGES.map((a) => (
            <div key={a.title} className="border-t border-charcoal pt-8">
              <a.icon size={30} stroke={1.2} className="text-steel" />
              <h3 className="font-display mt-6 text-2xl font-semibold">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="dark-surface">
        <Heading dark eyebrow="How We Work" title="From Factory Floor to Island Shore" />
        <div className="grid gap-10 md:grid-cols-4">
          {PROCESS.map((p, i) => (
            <div key={p.title}>
              <span className="font-display text-6xl silver-text">0{i + 1}</span>
              <h3 className="mt-4 text-sm uppercase tracking-[0.25em] text-white">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-silver">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Clients */}
      <Section>
        <Heading
          eyebrow="Who We Serve"
          title="Strategic Partnerships Across the Maldivian Economy"
          text="We don't just supply products; we engineer supply-chain solutions for the most demanding sectors in the Maldives."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {CLIENTS.map((c) => (
            <div key={c.title} className="border border-silver bg-white p-8">
              <c.icon size={28} stroke={1.2} className="text-steel" />
              <h3 className="font-display mt-5 text-2xl font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">{c.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
