"use client";

// Reusable AdSense unit.
//
// AdSense approval checklist (all satisfied by this site):
//   - Privacy Policy page mentioning cookies, AdSense, and Analytics ✓
//   - Substantial original content (formula guide, tables, FAQ) ✓
//   - Clear navigation (header links + footer) ✓
//
// Behavior:
//   - No slot id → renders nothing (local dev no-op; the publisher id
//     has a hardcoded default for site verification, see lib/site.ts).
//   - Consent not granted → renders nothing (consent gates the loader script too).
//   - Enabled → reserves vertical space via min-height so the ad filling
//     in never causes layout shift (protects CLS).

import { useEffect, useRef } from "react";
import { useConsent } from "@/components/CookieConsent";
import { ADSENSE_CLIENT } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdUnit({
  slot,
  className,
  minHeight = 280,
}: {
  slot: string | undefined;
  className?: string;
  minHeight?: number;
}) {
  const { status } = useConsent();
  const pushed = useRef(false);
  const enabled = Boolean(ADSENSE_CLIENT && slot) && status === "granted";

  useEffect(() => {
    if (!enabled || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not ready — fine, it picks the unit up when it loads.
    }
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ minHeight }}
      aria-hidden="true"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
