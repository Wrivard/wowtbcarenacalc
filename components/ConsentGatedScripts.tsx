"use client";

// Mounts GA4 + the AdSense loader only when (a) the matching env var is
// set and (b) cookie consent is granted. With no env vars this renders
// nothing — clean local dev, zero console errors.

import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/components/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export function ConsentGatedScripts() {
  const { status } = useConsent();
  if (status !== "granted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {ADSENSE_CLIENT && (
        <Script
          id="adsense-loader"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      )}
    </>
  );
}
