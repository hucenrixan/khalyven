import Image from "next/image";
import { CtaBand, Heading, PageHero, Section } from "@/components/ui";
import { getPage, getSettings, pageMeta } from "@/lib/data";
import { SiteIcon } from "@/lib/icons";
import { paras } from "@/lib/pages";

export const generateMetadata = () => pageMeta("about");

export default async function About() {
  const [{ photos }, { t, lists }] = await Promise.all([getSettings(), getPage("about")]);
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} text={t.heroText} />

      <Section>
        <div className="grid gap-14 md:grid-cols-5">
          <div className="md:col-span-2">
            <Heading eyebrow={t.storyEyebrow} title={t.storyTitle} />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted md:col-span-3">
            {paras(t.storyBody).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-mist">
        <Heading eyebrow={t.hubEyebrow} title={t.hubTitle} text={t.hubText} />
        <div className="relative mb-14 aspect-[16/9] overflow-hidden md:aspect-[21/9]">
          <Image
            src={photos.malaysia}
            alt={t.hubAlt}
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.3em] text-white">
            {t.hubCaption}
          </p>
        </div>
        <h3 className="mb-8 text-sm uppercase tracking-[0.25em] text-charcoal">{t.hubListHeading}</h3>
        <div className="grid gap-px bg-silver md:grid-cols-2">
          {lists.hubPoints.map((p, i) => (
            <div key={i} className="bg-background p-10">
              <SiteIcon name={p.icon} className="text-steel" />
              <h4 className="font-display mt-6 text-2xl font-semibold">{p.title}</h4>
              <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">{t.comEyebrow}</p>
          <h2 className="font-display text-4xl font-medium md:text-5xl">{t.comTitle}</h2>
          <span className="rule mx-auto mt-6" />
          <p className="mt-8 text-lg leading-relaxed text-muted">{t.comText}</p>
          <p className="font-display mt-8 text-2xl italic text-charcoal">{t.comQuote}</p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
