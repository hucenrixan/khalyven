import Image from "next/image";
import { IconCheck } from "@tabler/icons-react";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { getDivisions, getPage, pageMeta } from "@/lib/data";
import { SiteIcon } from "@/lib/icons";

export const generateMetadata = () => pageMeta("divisions");

export default async function Divisions() {
  const [divisions, { t }] = await Promise.all([getDivisions(), getPage("divisions")]);
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} text={t.heroText} />
      {divisions.map((d, i) => (
        <Section
          key={d.slug}
          id={d.slug}
          className={`scroll-mt-20 ${i % 2 === 0 ? "" : "bg-mist"}`}
        >
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <SiteIcon name={d.icon} size={44} stroke={1} className="text-steel" />
              <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted">
                {t.numberLabel} {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display mt-3 text-4xl font-medium md:text-5xl">{d.title}</h2>
              <span className="rule mt-6" />
              <p className="mt-6 text-lg leading-relaxed text-muted">{d.detail}</p>
            </div>
            <div className="space-y-6">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="border border-silver bg-white p-10">
                <h3 className="mb-6 text-xs uppercase tracking-[0.25em] text-charcoal">
                  {t.itemsHeading}
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
