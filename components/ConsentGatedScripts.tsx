"use client";

// Mounts analytics only when consent is granted (and, for GA4, when the
// env var is set). The AdSense loader script lives unconditionally in
// the root layout — Google site verification requires it in the raw
// HTML — but ad units themselves stay consent-gated (see AdUnit.tsx).

import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/components/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function ConsentGatedScripts() {
  const { status } = useConsent();
  if (status !== "granted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </>
  );
}
