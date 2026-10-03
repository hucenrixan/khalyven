import type { Metadata } from "next";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import QuoteForm from "@/components/QuoteForm";
import { PageHero, Section } from "@/components/ui";
import { CONTACT } from "@/lib/content";

export const metadata: Metadata = { title: "Contact Our Procurement Team" };

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Secure Your Supply Chain."
        text="Tell us about your property, project or enterprise. Our procurement team will respond with a considered approach."
      />
      <Section>
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QuoteForm />
          </div>
          <aside className="space-y-10">
            <div>
              <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-charcoal">Direct</h3>
              <ul className="space-y-4 text-muted">
                <li className="flex gap-3"><IconMail size={20} className="text-steel" />{CONTACT.email}</li>
                <li className="flex gap-3"><IconPhone size={20} className="text-steel" />{CONTACT.phone}</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-charcoal">Maldives</h3>
              <p className="flex gap-3 text-muted"><IconMapPin size={20} className="shrink-0 text-steel" />{CONTACT.maldives}</p>
              <p className="mt-2 pl-8 text-sm text-steel">Registered office</p>
            </div>
            <div>
              <h3 className="mb-5 text-xs uppercase tracking-[0.25em] text-charcoal">Malaysia</h3>
              <p className="flex gap-3 text-muted"><IconMapPin size={20} className="shrink-0 text-steel" />{CONTACT.malaysia}</p>
              <p className="mt-2 pl-8 text-sm text-steel">Procurement hub</p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
