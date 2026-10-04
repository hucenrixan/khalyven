import { getSettings } from "@/lib/data";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const s = await getSettings();
  return (
    <>
      <h1 className="font-display text-4xl text-charcoal">Photos &amp; Contact</h1>
      <p className="mt-2 text-sm text-muted">
        Contact details appear in the footer and on the Contact page.
      </p>
      <SettingsForm settings={s} />
    </>
  );
}
