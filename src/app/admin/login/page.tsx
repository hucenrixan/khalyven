"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { LogoMark } from "@/components/Logo";
import { inputCls, labelCls } from "@/components/admin/ui";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <div className="dark-surface flex min-h-screen items-center justify-center px-6">
      <form action={action} className="w-full max-w-sm bg-background p-10">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="bg-charcoal p-3">
            <LogoMark className="h-12 w-12" />
          </div>
          <p className="font-display text-2xl text-charcoal">Admin Sign In</p>
        </div>
        <div className="space-y-5">
          <label className="block">
            <span className={labelCls}>Email</span>
            <input name="email" type="email" required autoComplete="username" className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Password</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={inputCls}
            />
          </label>
          {state?.error && <p className="text-sm text-red-700">{state.error}</p>}
          <button
            disabled={pending}
            className="w-full bg-charcoal py-3.5 text-xs uppercase tracking-[0.22em] text-white transition-colors hover:bg-charcoal-soft disabled:opacity-60"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
