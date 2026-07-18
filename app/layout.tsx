import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ConsentProvider } from "@/components/CookieConsent";
import { ConsentGatedScripts } from "@/components/ConsentGatedScripts";
import { Footer } from "@/components/Footer";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — WoW TBC Classic & Anniversary`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "wow tbc arena points calculator",
    "tbc arena calculator",
    "tbc classic arena points",
    "tbc anniversary arena calculator",
    "burning crusade arena points",
    "arena points per week tbc",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — WoW TBC Classic & Anniversary`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — WoW TBC Classic & Anniversary`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
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
        <ConsentProvider>
          <div className="flex-1">{children}</div>
          <Footer />
          <ConsentGatedScripts />
        </ConsentProvider>
        <Analytics />
      </body>
    </html>
  );
}
