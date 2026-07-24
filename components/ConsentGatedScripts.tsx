"use client";

// Scripts that stay fully gated on consent.
//
// Google Analytics is NOT here — under Consent Mode v2 it loads for everyone
// from the root layout and governs itself through the consent signals
// (lib/consent.ts). AdSense's loader also lives in the root layout because
// Google site verification needs it in the raw HTML; the ad units themselves
// stay gated in AdUnit.tsx. Vercel Analytics is ungated in the root layout —
// it's cookieless by design.
//
// That leaves Speed Insights, which is gated purely to keep the "accept =
// more measurement" bargain honest.

import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/components/CookieConsent";

export function ConsentGatedScripts() {
  const { status } = useConsent();
  if (status !== "granted") return null;

  return <SpeedInsights />;
}
