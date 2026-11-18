import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import QuoteForm from "@/components/QuoteForm";
import { PageHero, Section } from "@/components/ui";
import { getDivisions, getPage, getSettings, pageMeta } from "@/lib/data";
import { lines } from "@/lib/pages";

export const generateMetadata = () => pageMeta("contact");

export default async function Contact() {
  const [{ contact: CONTACT }, { t }, divisions] = await Promise.all([
    getSettings(),
    getPage("contact"),
    getDivisions(),
  ]);
  return (
    <>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} text={t.heroText} />
      <Section>
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QuoteForm t={t} types={lines(t.inquiryTypes)} divisions={divisions.map((d) => d.title)} />
          </div>
          <aside className="space-y-10">
            <div>
              <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-charcoal">{t.directHeading}</h3>
              <ul className="space-y-4 text-muted">
                <li className="flex gap-3"><IconMail size={20} className="text-steel" />{CONTACT.email}</li>
                <li className="flex gap-3"><IconPhone size={20} className="text-steel" />{CONTACT.phone}</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-charcoal">{t.office1Heading}</h3>
              <p className="flex gap-3 text-muted"><IconMapPin size={20} className="shrink-0 text-steel" />{CONTACT.maldives}</p>
              <p className="mt-2 pl-8 text-sm text-muted">{t.office1Note}</p>
            </div>
            <div>
              <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-charcoal">{t.office2Heading}</h3>
              <p className="flex gap-3 text-muted"><IconMapPin size={20} className="shrink-0 text-steel" />{CONTACT.malaysia}</p>
              <p className="mt-2 pl-8 text-sm text-muted">{t.office2Note}</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
