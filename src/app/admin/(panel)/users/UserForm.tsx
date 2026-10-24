"use client";

import { useActionState } from "react";
import { saveUser } from "../../actions";
import { Field, SaveBar, inputCls } from "@/components/admin/ui";

export default function UserForm(p: {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  active?: boolean;
}) {
  const [state, action, pending] = useActionState(saveUser, undefined);
  return (
    <form action={action} className="space-y-5">
      {p.id && <input type="hidden" name="id" value={p.id} />}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Email">
          <input name="email" type="email" defaultValue={p.email} required className={inputCls} />
        </Field>
        <Field label="Name">
          <input name="name" defaultValue={p.name} className={inputCls} />
        </Field>
        <Field label={p.id ? "New password (leave blank to keep)" : "Password"}>
          <input name="password" type="password" autoComplete="new-password" className={inputCls} />
        </Field>
        <Field label="Role">
          <select name="role" defaultValue={p.role ?? "editor"} className={inputCls}>
            <option value="editor">Editor (content and inquiries)</option>
            <option value="admin">Admin (also manages users)</option>
          </select>
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="active" defaultChecked={p.active ?? true} /> Can sign in
      </label>
      <SaveBar pending={pending} state={state} />
    </form>
  );
}
