import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, Heading, PageHero, Section } from "@/components/ui";
import { HUB_POINTS } from "@/lib/content";

export const metadata: Metadata = { title: "About Us" };

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Bridging ASEAN Excellence and Maldivian Luxury."
        text="Born in the Maldives, strategically anchored in Malaysia. Khalyven International is the premier transnational procurement firm dedicated to elevating the supply chain for the Indian Ocean's most exclusive destinations and developments."
      />

      <Section>
        <div className="grid gap-14 md:grid-cols-5">
          <div className="md:col-span-2">
            <Heading eyebrow="Our Story" title="A Vision of Frictionless Procurement" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted md:col-span-3">
            <p>
              Khalyven International was established in the Maldives with a singular, uncompromising
              vision: to redefine how the nation&apos;s top-tier industries source their essential
              infrastructure and luxury goods. We recognised that while the Maldives sets the global
              standard for luxury hospitality and high-end development, the traditional supply chains
              feeding it were often fragmented, indirect and inefficient.
            </p>
            <p>
              We knew that to serve the apex of the Maldivian market (elite resorts, visionary real
              estate developers and high-volume commercial enterprises) we had to eliminate the
              middlemen. We needed to be at the source.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-mist">
        <Heading
          eyebrow="The Transnational Advantage"
          title="Two Nations. One Seamless Supply Chain."
          text="To give our partners unparalleled access to the world's fastest-growing manufacturing hub, we are actively expanding our corporate footprint with a dedicated procurement and operations headquarters in Malaysia. By bridging the Maldives and the ASEAN region, we operate as a direct conduit between Southeast Asia's most capable manufacturers and the Maldives' most demanding buyers."
        />
        <div className="relative mb-14 aspect-[16/9] overflow-hidden md:aspect-[21/9]">
          <Image
            src="/photos/malaysia.jpg"
            alt="Kuala Lumpur skyline at dusk"
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.3em] text-white">
            Kuala Lumpur · Procurement Hub
          </p>
        </div>
        <h3 className="mb-8 text-sm uppercase tracking-[0.25em] text-charcoal">
          What Our Malaysian Hub Means for You
        </h3>
        <div className="grid gap-px bg-silver md:grid-cols-2">
          {HUB_POINTS.map((p) => (
            <div key={p.title} className="bg-background p-10">
              <p.icon size={30} stroke={1.2} className="text-steel" />
              <h4 className="font-display mt-6 text-2xl font-semibold">{p.title}</h4>
              <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Our Commitment</p>
          <h2 className="font-display text-4xl font-medium md:text-5xl">Engineered for the Exceptional</h2>
          <span className="rule mx-auto mt-6" />
          <p className="mt-8 text-lg leading-relaxed text-muted">
            At Khalyven International, we do not merely fulfil orders; we architect supply solutions.
            We understand the stakes of opening a new luxury resort on time, the precision required in
            a commercial kitchen fit-out, and the volume demands of national wholesalers.
          </p>
          <p className="font-display mt-8 text-2xl italic text-charcoal">
            Our commitment is to be the silent, flawless engine behind your operations, delivering the
            quality you demand with the reliability you deserve.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
