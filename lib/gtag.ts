// GA4 event helper. Safe to call anywhere: no-ops when gtag is absent
// (no consent, no NEXT_PUBLIC_GA_ID, or script still loading).

export type GtagEventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: {
      (command: "event", eventName: string, params?: GtagEventParams): void;
      // Consent Mode v2 — see lib/consent.ts.
      (
        command: "consent",
        action: "default" | "update",
        signals: Record<string, string | number>,
      ): void;
    };
  }
}

export function trackEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

// Bucket a rating to the nearest 100 so analytics stay readable
// (we care about traffic quality bands, not raw noise).
export function bucketRating(rating: number): number {
  return Math.round(rating / 100) * 100;
}
