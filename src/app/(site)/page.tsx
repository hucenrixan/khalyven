import Image from "next/image";
import Link from "next/link";
import { Button, CtaBand, Heading, Section } from "@/components/ui";
import { getDivisions, getPage, getSettings, getTestimonials } from "@/lib/data";
import { SiteIcon } from "@/lib/icons";
import { paras } from "@/lib/pages";

export default async function Home() {
  const [divisions, { photos }, testimonials, { t, lists }, serve] = await Promise.all([
    getDivisions(),
    getSettings(),
    getTestimonials(),
    getPage("home"),
    getPage("serve"),
  ]);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal px-6 py-32 md:py-48">
        <Image
          src={photos.hero}
          alt={t.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/65 to-charcoal/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-silver">{t.heroEyebrow}</p>
          <h1 className="font-display max-w-4xl text-6xl font-medium leading-[1.02] md:text-8xl">
            <span className="silver-text">{t.heroTitle}</span>
          </h1>
          <span className="rule mt-10" />
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-silver md:text-xl">{t.heroText}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={t.heroBtn1Href} variant="outline-light">{t.heroBtn1}</Button>
            <Button href={t.heroBtn2Href} variant="outline-light">{t.heroBtn2}</Button>
          </div>
        </div>
      </section>

      {/* Intro */}
      <Section>
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <Heading eyebrow={t.introEyebrow} title={t.introTitle} />
          <div className="space-y-6 text-lg leading-relaxed text-muted">
            {paras(t.introBody).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Divisions */}
      <Section className="bg-mist">
        <Heading eyebrow={t.divEyebrow} title={t.divTitle} text={t.divText} />
        <div className="grid gap-px bg-silver md:grid-cols-2 lg:grid-cols-3">
          {divisions.map((d) => (
            <Link
              key={d.slug}
              href={`/divisions#${d.slug}`}
              className="group bg-background p-10 transition-colors hover:bg-charcoal"
            >
              <SiteIcon name={d.icon} size={34} className="text-steel group-hover:text-silver" />
              <h3 className="font-display mt-8 text-2xl font-semibold text-charcoal group-hover:text-white">
                {d.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted group-hover:text-silver">{d.summary}</p>
            </Link>
          ))}
          <div className="flex flex-col justify-center bg-charcoal p-10">
            <p className="font-display text-2xl text-white">{t.divCardTitle}</p>
            <p className="mt-3 text-silver">{t.divCardText}</p>
            <Link
              href={t.divCardHref}
              className="mt-6 text-xs uppercase tracking-[0.22em] text-white underline underline-offset-8"
            >
              {t.divCardLink}
            </Link>
          </div>
        </div>
      </Section>

      {/* Why us */}
      <Section>
        <div className="mb-14 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="[&>div]:mb-0">
            <Heading eyebrow={t.advEyebrow} title={t.advTitle} text={t.advText} />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={photos.source}
              alt={t.advAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-charcoal/25" />
          </div>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {lists.advantages.map((a, i) => (
            <div key={i} className="border-t border-charcoal pt-8">
              <SiteIcon name={a.icon} className="text-steel" />
              <h3 className="font-display mt-6 text-2xl font-semibold">{a.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="dark-surface">
        <Heading dark eyebrow={t.procEyebrow} title={t.procTitle} />
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {lists.process.map((p, i) => (
            <div key={i}>
              <span className="font-display text-6xl silver-text">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-sm uppercase tracking-[0.25em] text-white">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-silver">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Clients */}
      <Section>
        <Heading eyebrow={t.cliEyebrow} title={t.cliTitle} text={t.cliText} />
        <div className="grid gap-8 md:grid-cols-2">
          {serve.lists.clients.map((c, i) => (
            <div key={i} className="border border-silver bg-white p-8">
              <SiteIcon name={c.icon} size={28} className="text-steel" />
              <h3 className="font-display mt-5 text-2xl font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">{c.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {testimonials.length > 0 && (
        <Section className="bg-mist">
          <Heading eyebrow={t.testEyebrow} title={t.testTitle} center />
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <blockquote key={String(t._id)} className="border border-silver bg-white p-8">
                <p className="font-display text-xl leading-relaxed text-charcoal">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 text-sm text-muted">
                  <span className="text-charcoal">{t.author}</span>
                  {(t.role || t.company) && <> · {[t.role, t.company].filter(Boolean).join(", ")}</>}
                </footer>
              </blockquote>
            ))}
          </div>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
