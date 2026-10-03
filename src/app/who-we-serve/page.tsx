import type { Metadata } from "next";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { CLIENTS } from "@/lib/content";

export const metadata: Metadata = { title: "Who We Serve" };

export default function WhoWeServe() {
  return (
    <>
      <PageHero
        eyebrow="Our Partners"
        title="Strategic Partnerships Across the Maldivian Economy."
        text="Khalyven International does not just supply products; we engineer supply-chain solutions for the most demanding sectors in the Maldives, with uncompromising quality, reliable volume and exclusive access to ASEAN markets."
      />
      <Section>
        <div className="space-y-px bg-silver">
          {CLIENTS.map((c, i) => (
            <div key={c.title} className="grid gap-8 bg-background py-12 md:grid-cols-3 md:px-6">
              <div>
                <c.icon size={36} stroke={1} className="text-steel" />
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-steel">0{i + 1}</p>
                <h2 className="font-display mt-2 text-3xl font-semibold">{c.title}</h2>
              </div>
              <div className="md:col-span-2">
                <p className="font-display text-2xl italic text-charcoal">{c.tagline}</p>
                <p className="mt-4 text-lg leading-relaxed text-muted">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
