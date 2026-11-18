import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { getPage } from "@/lib/data";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getPage("site");
  return {
    title: { default: t.seoTitle, template: `%s | ${t.seoBrand}` },
    description: t.seoDescription,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}
