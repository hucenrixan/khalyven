import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand, PageHero, Section } from "@/components/ui";
import { getPosts } from "@/lib/data";

export const metadata: Metadata = { title: "News" };
export const dynamic = "force-dynamic";

export default async function News() {
  const posts = await getPosts();
  return (
    <>
      <PageHero eyebrow="Updates" title="News" text="Announcements and insights from Khalyven International." />
      <Section>
        {posts.length === 0 ? (
          <p className="text-center text-muted">No articles yet.</p>
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
