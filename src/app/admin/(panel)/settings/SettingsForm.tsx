"use client";

import { useActionState } from "react";
import { saveSettings } from "../../actions";
import ImageField from "@/components/admin/ImageField";
import { Field, SaveBar, inputCls } from "@/components/admin/ui";
import { DEFAULT_PHOTOS } from "@/lib/defaults";
import type { SiteSettings } from "@/lib/data";

const custom = (url: string, fallback: string) => (url === fallback ? "" : url);

export default function SettingsForm({ settings: s }: { settings: SiteSettings }) {
  const [state, action, pending] = useActionState(saveSettings, undefined);
  return (
    <form action={action} className="mt-8 space-y-10">
      <section className="space-y-6 border border-silver bg-white p-8">
        <h2 className="font-display text-2xl text-charcoal">Contact details</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Email">
            <input name="email" type="email" defaultValue={s.contact.email} className={inputCls} />
          </Field>
          <Field label="Phone / WhatsApp">
            <input name="phone" defaultValue={s.contact.phone} className={inputCls} />
          </Field>
          <Field label="Maldives office">
            <input name="maldives" defaultValue={s.contact.maldives} className={inputCls} />
          </Field>
          <Field label="Malaysia office">
            <input name="malaysia" defaultValue={s.contact.malaysia} className={inputCls} />
          </Field>
        </div>
      </section>

      <section className="space-y-8 border border-silver bg-white p-8">
        <h2 className="font-display text-2xl text-charcoal">Site photos</h2>
        <ImageField
          name="hero"
          label="Home page hero (large background)"
          current={custom(s.photos.hero, DEFAULT_PHOTOS.hero)}
          fallback={DEFAULT_PHOTOS.hero}
          hint="Wide landscape photo, at least 2000 px wide."
        />
        <ImageField
          name="source"
          label="Home page: Transnational Footprint"
          current={custom(s.photos.source, DEFAULT_PHOTOS.source)}
          fallback={DEFAULT_PHOTOS.source}
        />
        <ImageField
          name="malaysia"
          label="About page: Malaysia banner"
          current={custom(s.photos.malaysia, DEFAULT_PHOTOS.malaysia)}
          fallback={DEFAULT_PHOTOS.malaysia}
          hint="Wide banner, shown about 21:9."
        />
      </section>

      <SaveBar pending={pending} state={state} />
    </form>
  );
}
