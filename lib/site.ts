// AdSense publisher id. Hardcoded default so Google's site verification
// crawler always finds the loader script in the raw HTML; the env var
// can still override it per-environment.
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-5102258910849982";

// Canonical production origin. MUST be the www host — Vercel serves www as
// the primary domain (the apex 308-redirects to www), and Google has indexed
// the www URLs. metadataBase + every relative canonical, the sitemap, robots
// and JSON-LD all derive from this, so it has to match the host that actually
// answers 200 or canonicals point at a URL that immediately redirects.
// If NEXT_PUBLIC_SITE_URL is set in the Vercel project env it MUST also be
// this www origin (never the apex, and never the vercel.app preview host), or
// the whole site re-declares a non-serving canonical.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wowtbcarena.com";

export const SITE_NAME = "WoW TBC Classic Hub";

export const SITE_DESCRIPTION =
  "TBC Classic tools in one place: live-snapshot PvP & PvE BiS lists for every spec, talent builds, an interactive talent calculator, and an arena points calculator.";
