import { CtaBand, PageHero, Section } from "@/components/ui";
import { getPage, pageMeta } from "@/lib/data";
import { SiteIcon } from "@/lib/icons";

export const generateMetadata = () => pageMeta("serve");

export default async function WhoWeServe() {
  const { t, lists } = await getPage("serve");
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} text={t.heroText} />
      <Section>
        <div className="space-y-px bg-silver">
          {lists.clients.map((c, i) => (
            <div key={i} className="grid gap-8 bg-background py-12 md:grid-cols-3 md:px-6">
              <div>
                <SiteIcon name={c.icon} size={36} stroke={1} className="text-steel" />
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
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
