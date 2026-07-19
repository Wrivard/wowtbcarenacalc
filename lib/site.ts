// AdSense publisher id. Hardcoded default so Google's site verification
// crawler always finds the loader script in the raw HTML; the env var
// can still override it per-environment.
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-5102258910849982";

// Canonical production origin. Must be the real domain (not the
// vercel.app preview host) so metadataBase + every relative canonical
// resolves to wowtbcarena.com. If NEXT_PUBLIC_SITE_URL is set in the
// Vercel project env it MUST also be the apex domain, or canonicals
// will point at the preview deployment again.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wowtbcarena.com";

export const SITE_NAME = "WoW TBC Classic Hub";

export const SITE_DESCRIPTION =
  "TBC Classic tools in one place: live-snapshot PvP & PvE BiS lists for every spec, talent builds, an interactive talent calculator, and an arena points calculator.";
