import type { Metadata } from "next";
import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { PrDisclosure } from "@/components/PrDisclosure";
import { CookieNotice } from "@/components/CookieNotice";
import { ScrollToTop } from "@/components/ScrollToTop";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-zen-kaku",
  display: "swap",
});

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "イケダンラボ";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikedanlab.com";
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "スキンケア・メンズ美容・医療脱毛・AGA治療の体験レビューと比較情報";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${zenKaku.variable}`}>
      <body>
        <GoogleAnalytics />
        <Header />
        <PrDisclosure />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <CookieNotice />
      </body>
    </html>
  );
}
