import type { Metadata } from "next";
import Image from "next/image";
import { IconCheck } from "@tabler/icons-react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { DIVISIONS } from "@/lib/content";

export const metadata: Metadata = { title: "Our Divisions" };

export default function Divisions() {
  return (
    <>
      <PageHero
        eyebrow="Areas of Expertise"
        title="Our Divisions"
        text="Five specialist divisions covering the full spectrum of luxury hospitality, development and commercial supply, sourced direct from ASEAN manufacturers."
      />
      {DIVISIONS.map((d, i) => (
        <Section
          key={d.slug}
          id={d.slug}
          className={`scroll-mt-20 ${i % 2 === 0 ? "" : "bg-mist"}`}
        >
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <d.icon size={44} stroke={1} className="text-steel" />
              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted">
                Division 0{i + 1}
              </p>
              <h2 className="font-display mt-3 text-4xl font-medium md:text-5xl">{d.title}</h2>
              <span className="rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed text-muted">{d.detail}</p>
            </div>
            <div className="space-y-6">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={`/photos/${d.slug}.jpg`}
                  alt={d.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="border border-silver bg-white p-10">
                <h3 className="mb-6 text-xs uppercase tracking-[0.25em] text-charcoal">
                  What we supply
                </h3>
                <ul className="space-y-4">
                  {d.items.map((it) => (
                    <li key={it} className="flex gap-3 text-muted">
                      <IconCheck size={20} className="mt-0.5 shrink-0 text-charcoal" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}
      <CtaBand />
    </>
  );
}
