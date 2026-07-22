import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ConsentProvider } from "@/components/CookieConsent";
import { ConsentGatedScripts } from "@/components/ConsentGatedScripts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WowheadTooltips } from "@/components/WowheadTooltips";
import { JsonLd, organizationJsonLd, webSiteJsonLd } from "@/components/seo/JsonLd";
import { ADSENSE_CLIENT, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const HOME_TITLE = "WoW TBC Classic — BiS, Talents & Arena Tools";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s — WoW TBC",
  },
  description: SITE_DESCRIPTION,
  // No site-wide <meta name="keywords">: Google ignores it and a single
  // repeated keyword set across every page is noise. Ranking signal lives
  // in unique per-page titles/descriptions/H1s instead.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Warm up the cross-origin hosts every content page hits (icon CDN +
            Wowhead tooltips, AdSense) so the first request skips DNS/TCP/TLS. */}
        <link rel="preconnect" href="https://wow.zamimg.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://wow.zamimg.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        {/* AdSense loader — must be in the raw HTML (not consent-gated)
            for Google site verification. Ad units themselves still only
            render with cookie consent + slot ids. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <JsonLd
          data={[
            organizationJsonLd(SITE_NAME, SITE_URL, "/images/logo.png"),
            webSiteJsonLd(SITE_NAME, SITE_URL),
          ]}
        />
        <ConsentProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <ConsentGatedScripts />
        </ConsentProvider>
        <WowheadTooltips />
        <Analytics />
      </body>
    </html>
  );
}
