"use client";

import { useActionState, useState } from "react";
import { saveDivision } from "../../../actions";
import IconSelect from "@/components/admin/IconSelect";
import ImageField from "@/components/admin/ImageField";
import { Field, SaveBar, inputCls, labelCls } from "@/components/admin/ui";

export default function DivisionForm(p: {
  /** Empty when adding a new division. */
  slug: string;
  title: string;
  summary: string;
  detail: string;
  items: string[];
  image: string;
  icon: string;
  order: number;
}) {
  const [state, action, pending] = useActionState(saveDivision, undefined);
  const [icon, setIcon] = useState(p.icon);
  return (
    <form action={action} className="mt-8 space-y-6 border border-silver bg-white p-8">
      <input type="hidden" name="slug" value={p.slug} />
      <Field label="Title">
        <input name="title" defaultValue={p.title} required className={inputCls} />
      </Field>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Icon</span>
          <IconSelect name="icon" value={icon} onChange={setIcon} />
        </label>
        <Field label="Order (low first)">
          <input name="order" type="number" defaultValue={p.order} className={inputCls} />
        </Field>
      </div>
      <Field label="Short summary (shown on the home page card)">
        <textarea name="summary" defaultValue={p.summary} rows={3} className={inputCls} />
      </Field>
      <Field label="Full description (shown on the Divisions page)">
        <textarea name="detail" defaultValue={p.detail} rows={4} className={inputCls} />
      </Field>
      <Field label="What we supply (one item per line)">
        <textarea name="items" defaultValue={p.items.join("\n")} rows={7} className={inputCls} />
      </Field>
      <ImageField
        name="image"
        label="Photo"
        current={p.image.startsWith("https://") ? p.image : ""}
        fallback={p.image}
        hint="Landscape photos work best (about 16:10)."
      />
      <SaveBar pending={pending} state={state} />
    </form>
  );
}
