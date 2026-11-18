import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNav, getPage } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [{ header }, { t }] = await Promise.all([getNav(), getPage("site")]);
  return (
    <>
      <Header
        nav={header}
        cta={{ label: t.headerCtaLabel, href: t.headerCtaHref }}
        logo={{ top: t.logoTop, bottom: t.logoBottom }}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
