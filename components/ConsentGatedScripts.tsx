"use client";

// Mounts analytics only when consent is granted (and, for GA4, when the
// env var is set). The AdSense loader script lives unconditionally in
// the root layout — Google site verification requires it in the raw
// HTML — but ad units themselves stay consent-gated (see AdUnit.tsx).
// Note: Vercel Analytics is in the root layout (not consent-gated) as
// it's privacy-friendly by default and doesn't use cookies.

import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/components/CookieConsent";
import { LinkTracking } from "@/components/LinkTracking";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function ConsentGatedScripts() {
  const { status } = useConsent();
  if (status !== "granted") return null;

  return (
    <>
      <SpeedInsights />
      {GA_ID && (
        <>
          <GoogleAnalytics gaId={GA_ID} />
          <LinkTracking />
        </>
      )}
    </>
  );
}
