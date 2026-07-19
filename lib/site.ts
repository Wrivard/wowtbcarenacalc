// AdSense publisher id. Hardcoded default so Google's site verification
// crawler always finds the loader script in the raw HTML; the env var
// can still override it per-environment.
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-5102258910849982";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wowtbcarenacalc.vercel.app";

export const SITE_NAME = "WoW TBC Classic Hub";

export const SITE_DESCRIPTION =
  "TBC Classic tools in one place: live-snapshot PvP & PvE BiS lists for every spec, talent builds, an interactive talent calculator, and an arena points calculator.";
