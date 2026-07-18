// AdSense publisher id. Hardcoded default so Google's site verification
// crawler always finds the loader script in the raw HTML; the env var
// can still override it per-environment.
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-5102258910849982";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wowtbcarenacalc.vercel.app";

export const SITE_NAME = "TBC Arena Points Calculator";

export const SITE_DESCRIPTION =
  "Free WoW TBC Classic (Anniversary) arena points calculator. Enter your 2v2, 3v3, or 5v5 team rating to see your weekly arena points, find the rating you need for a points target, and plan your gear purchases.";
