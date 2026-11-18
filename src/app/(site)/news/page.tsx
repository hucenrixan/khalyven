import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { getPage, getPosts, pageMeta } from "@/lib/data";

export const generateMetadata = () => pageMeta("news");
export const dynamic = "force-dynamic";

export default async function News() {
  const [posts, { t }] = await Promise.all([getPosts(), getPage("news")]);
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} text={t.heroText} />
      <Section>
        {posts.length === 0 ? (
          <p className="text-center text-muted">{t.empty}</p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/news/${p.slug}`} className="group block">
                {p.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                  </div>
                )}
                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted">
                  {p.publishedAt && new Date(p.publishedAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
                </p>
                <h2 className="font-display mt-2 text-2xl text-charcoal group-hover:underline">{p.title}</h2>
                {p.excerpt && <p className="mt-2 text-muted">{p.excerpt}</p>}
              </Link>
            ))}
          </div>
        )}
      </Section>
      <CtaBand />
    </>
  );
}
