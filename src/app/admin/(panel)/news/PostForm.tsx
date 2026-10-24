"use client";

import { useActionState } from "react";
import { savePost } from "../../actions";
import ImageField from "@/components/admin/ImageField";
import { Field, SaveBar, inputCls } from "@/components/admin/ui";

export default function PostForm(p: {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  body?: string;
  image?: string;
  published?: boolean;
}) {
  const [state, action, pending] = useActionState(savePost, undefined);
  return (
    <form action={action} className="space-y-5">
      {p.id && <input type="hidden" name="id" value={p.id} />}
      <Field label="Title">
        <input name="title" defaultValue={p.title} required className={inputCls} />
      </Field>
      <Field label="URL (leave blank to generate from the title)">
        <input name="slug" defaultValue={p.slug} className={inputCls} />
      </Field>
      <Field label="Short excerpt">
        <textarea name="excerpt" defaultValue={p.excerpt} rows={2} className={inputCls} />
      </Field>
      <Field label="Article (blank line between paragraphs)">
        <textarea name="body" defaultValue={p.body} rows={12} className={inputCls} />
      </Field>
      <ImageField name="image" label="Cover photo" current={p.image} fallback="/brand/mark-white.png" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" defaultChecked={p.published ?? false} /> Published
      </label>
      <SaveBar pending={pending} state={state} />
    </form>
  );
}
