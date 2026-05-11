import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://socialmaty.cz"),
  title: {
    default: "Socialmaty — Growmat Systém®",
    template: "%s · Socialmaty",
  },
  description:
    "Získej +10 000 sledujících a první prodeje z Instagramu pomocí 5–8 sekundových videí. Bez agentury, reklamy a štěstí.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://socialmaty.cz",
    title: "Socialmaty — Growmat Systém®",
    description:
      "Získej +10 000 sledujících a první prodeje z Instagramu pomocí 5–8 sek. videí.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="bg-bg text-ink font-sans">
        <ScrollReveal />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
