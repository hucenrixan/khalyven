import Image from "next/image";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { getGallery, getPage, pageMeta } from "@/lib/data";

export const generateMetadata = () => pageMeta("gallery");
export const dynamic = "force-dynamic";

export default async function Gallery() {
  const [items, { t }] = await Promise.all([getGallery(), getPage("gallery")]);
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} text={t.heroText} />
      <Section>
        {items.length === 0 ? (
          <p className="text-center text-muted">{t.empty}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((g) => (
              <figure key={String(g._id)}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.caption || t.heroTitle}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {(g.caption || g.category) && (
                  <figcaption className="mt-3 text-sm text-muted">
                    {g.category && (
                      <span className="mr-2 text-xs uppercase tracking-[0.2em]">{g.category}</span>
                    )}
                    {g.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
