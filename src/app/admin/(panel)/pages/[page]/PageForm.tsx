"use client";

import { useActionState } from "react";
import { savePage } from "../../../actions";
import ListEditor from "@/components/admin/ListEditor";
import { Field, SaveBar, inputCls } from "@/components/admin/ui";
import type { ListItem, PageDef } from "@/lib/pages";

export default function PageForm({
  page,
  def,
  values,
  lists,
}: {
  page: string;
  def: PageDef;
  values: Record<string, string>;
  lists: Record<string, ListItem[]>;
}) {
  const [state, action, pending] = useActionState(savePage, undefined);
  return (
    <form action={action} className="mt-8 space-y-10">
      <input type="hidden" name="page" value={page} />
      {def.groups.map((g) => (
        <section key={g.title} className="space-y-6 border border-silver bg-white p-8">
          <h2 className="font-display text-2xl text-charcoal">{g.title}</h2>
          {g.fields.map((f) => (
            <div key={f.key}>
              <Field label={f.label}>
                {f.long ? (
                  <textarea
                    name={f.key}
                    defaultValue={values[f.key]}
                    rows={Math.min(10, Math.max(3, Math.ceil(values[f.key].length / 90) + 1))}
                    className={inputCls}
                  />
                ) : (
                  <input name={f.key} defaultValue={values[f.key]} className={inputCls} />
                )}
              </Field>
              {f.hint && <p className="mt-1.5 text-xs text-muted">{f.hint}</p>}
            </div>
          ))}
        </section>
      ))}
      {(def.lists ?? []).map((l) => (
        <ListEditor
          key={l.key}
          name={l.key}
          label={l.label}
          hint={l.hint}
          columns={l.columns}
          initial={lists[l.key]}
        />
      ))}
      <div className="sticky bottom-0 -mx-2 border-t border-silver bg-background/95 px-2 py-4 backdrop-blur">
        <SaveBar pending={pending} state={state} />
        <p className="mt-2 text-xs text-muted">Clearing a field and saving brings back its original text.</p>
      </div>
    </form>
  );
}
