"use client";

import { useActionState } from "react";
import { saveNavItem } from "../../actions";
import { SaveBar, inputCls, labelCls } from "@/components/admin/ui";

export default function NavForm(p: {
  area: "header" | "footer";
  id?: string;
  label?: string;
  href?: string;
  group?: string;
  parent?: string;
  order?: number;
  parents?: { id: string; label: string }[];
}) {
  const [state, action, pending] = useActionState(saveNavItem, undefined);
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="area" value={p.area} />
      {p.id && <input type="hidden" name="id" value={p.id} />}
      <div className="grid gap-4 md:grid-cols-2">
        <label>
          <span className={labelCls}>Label</span>
          <input name="label" defaultValue={p.label} required className={inputCls} />
        </label>
        <label>
          <span className={labelCls}>Link (e.g. /about or https://…)</span>
          <input name="href" defaultValue={p.href} required className={inputCls} />
        </label>
        {p.area === "header" ? (
          <label>
            <span className={labelCls}>Show under (makes it a sub-menu)</span>
            <select name="parent" defaultValue={p.parent ?? ""} className={inputCls}>
              <option value="">Top level</option>
              {p.parents?.filter((x) => x.id !== p.id).map((x) => (
                <option key={x.id} value={x.id}>
                  {x.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label>
            <span className={labelCls}>Column heading</span>
            <input name="group" defaultValue={p.group ?? "Navigate"} className={inputCls} />
          </label>
        )}
        <label>
          <span className={labelCls}>Order (low first)</span>
          <input name="order" type="number" defaultValue={p.order ?? 0} className={inputCls} />
        </label>
      </div>
      <SaveBar pending={pending} state={state} />
    </form>
  );
}
