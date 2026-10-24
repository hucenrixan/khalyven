import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, Section } from "@/components/ui";
import { getPost } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt || undefined } : {};
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  return (
    <>
      <Section>
        <article className="mx-auto max-w-3xl">
          <Link href="/news" className="text-sm text-muted underline underline-offset-4">
            ← All news
          </Link>
          <p className="mt-8 text-xs uppercase tracking-[0.25em] text-muted">
            {post.publishedAt && new Date(post.publishedAt).toLocaleDateString("en-GB", { dateStyle: "long" })}
          </p>
          <h1 className="font-display mt-3 text-4xl font-medium text-charcoal md:text-5xl">{post.title}</h1>
          {post.image && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden">
              <Image src={post.image} alt="" fill priority sizes="768px" className="object-cover" />
            </div>
          )}
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            {(post.body ?? "")
              .split(/\n{2,}/)
              .filter(Boolean)
              .map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
          </div>
        </article>
      </Section>
      <CtaBand />
    </>
  );
}
