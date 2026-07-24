// Google Consent Mode v2.
//
// The tag now loads for everyone, but starts in a cookieless state: with
// analytics_storage/ad_storage denied, gtag sets no cookies and sends only
// anonymous pings. Google uses those to model the traffic it can't identify,
// which is the whole reason for this — the previous setup loaded nothing at
// all until someone clicked Accept, so GA4 saw a small and heavily biased
// slice of the audience.
//
// Accepting upgrades the signals in place (no reload, no second tag).
// Declining leaves them denied, which is the state they were already in.

export const CONSENT_STORAGE_KEY = "wowtbc-cookie-consent";

/** Signals that follow the user's choice. The other two are always granted. */
const GATED = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
] as const;

/**
 * Runs in <head> before any tag. Must be plain ES5 in a single string: it is
 * inlined into the raw HTML, so it executes before the bundle exists.
 *
 * It reads the stored choice directly into the *default* rather than emitting
 * a default-then-update pair, so a returning visitor who already accepted is
 * never briefly downgraded to cookieless on their first pageview.
 */
export const CONSENT_BOOTSTRAP = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
var c='denied';try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted')c='granted'}catch(e){}
gtag('consent','default',{${GATED.map((s) => `${s}:c`).join(",")},functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
`.trim();

/** Push the user's choice to an already-loaded tag. */
export function applyConsentMode(granted: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const value = granted ? "granted" : "denied";
  window.gtag(
    "consent",
    "update",
    Object.fromEntries(GATED.map((signal) => [signal, value])),
  );
}
