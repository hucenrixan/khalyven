import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getNav } from "@/lib/data";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { header } = await getNav();
  return (
    <>
      <Header nav={header} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
