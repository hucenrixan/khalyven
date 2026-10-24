"use client";

import { useActionState } from "react";
import { saveTestimonial } from "../../actions";
import { Field, SaveBar, inputCls } from "@/components/admin/ui";

export default function TestimonialForm(p: {
  id?: string;
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
  order?: number;
  published?: boolean;
}) {
  const [state, action, pending] = useActionState(saveTestimonial, undefined);
  return (
    <form action={action} className="space-y-5">
      {p.id && <input type="hidden" name="id" value={p.id} />}
      <Field label="Quote">
        <textarea name="quote" defaultValue={p.quote} rows={4} required className={inputCls} />
      </Field>
      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Name">
          <input name="author" defaultValue={p.author} required className={inputCls} />
        </Field>
        <Field label="Role">
          <input name="role" defaultValue={p.role} className={inputCls} />
        </Field>
        <Field label="Company">
          <input name="company" defaultValue={p.company} className={inputCls} />
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
