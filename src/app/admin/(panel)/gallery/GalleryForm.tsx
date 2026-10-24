"use client";

import { useActionState } from "react";
import { saveGalleryItem } from "../../actions";
import ImageField from "@/components/admin/ImageField";
import { Field, SaveBar, inputCls } from "@/components/admin/ui";

export default function GalleryForm(p: {
  id?: string;
  image?: string;
  caption?: string;
  category?: string;
  order?: number;
  published?: boolean;
}) {
  const [state, action, pending] = useActionState(saveGalleryItem, undefined);
  return (
    <form action={action} className="space-y-5">
      {p.id && <input type="hidden" name="id" value={p.id} />}
      <ImageField name="image" label="Photo" current={p.image} fallback="/brand/mark-white.png" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Caption">
          <input name="caption" defaultValue={p.caption} className={inputCls} />
        </Field>
        <Field label="Category (optional)">
          <input name="category" defaultValue={p.category} className={inputCls} />
        </Field>
      </div>
      <div className="flex flex-wrap items-end gap-6">
        <Field label="Order (low first)">
          <input name="order" type="number" defaultValue={p.order ?? 0} className={`${inputCls} w-28`} />
        </Field>
        <label className="flex items-center gap-2 pb-3 text-sm">
          <input type="checkbox" name="published" defaultChecked={p.published ?? true} /> Show on website
        </label>
      </div>
      <SaveBar pending={pending} state={state} />
    </form>
  );
}
