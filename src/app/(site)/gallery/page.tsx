import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { getGallery } from "@/lib/data";

export const metadata: Metadata = { title: "Gallery" };
export const dynamic = "force-dynamic";

export default async function Gallery() {
  const items = await getGallery();
  return (
    <>
      <PageHero eyebrow="Our Work" title="Gallery" text="A look at the products and projects we deliver." />
      <Section>
        {items.length === 0 ? (
          <p className="text-center text-muted">Photos coming soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((g) => (
              <figure key={String(g._id)}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={g.image}
                    alt={g.caption || "Khalyven gallery photo"}
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
