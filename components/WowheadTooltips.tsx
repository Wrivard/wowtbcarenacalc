"use client";

// Loads the Wowhead tooltip script once (root layout) so every
// wowhead.com/tbc/item=<id> / spell=<id> link gets an inline icon and a
// game-styled hover tooltip. Attribution: Wowhead requires the footer
// credit ("Item & spell data from Wowhead") — see Footer.tsx.
//
// `refreshWowheadLinks()` re-scans the DOM after client-side updates
// (e.g. expanding BiS alternatives, talent rank changes).

import Script from "next/script";

declare global {
  interface Window {
    whTooltips?: {
      colorLinks: boolean;
      iconizeLinks: boolean;
      renameLinks: boolean;
      iconSize?: string;
    };
    WH?: {
      Tooltips?: { refreshLinks?: () => void };
    };
  }
}

export function refreshWowheadLinks() {
  if (typeof window !== "undefined") {
    window.WH?.Tooltips?.refreshLinks?.();
  }
}

export function WowheadTooltips() {
  return (
    <>
      {/* We render icons + colored names ourselves (ItemLink) — the
          script only adds hover tooltips, so link rewriting is off. */}
      <Script id="wowhead-tooltip-config" strategy="lazyOnload">
        {`window.whTooltips = { colorLinks: false, iconizeLinks: false, renameLinks: false };`}
      </Script>
      <Script
        id="wowhead-tooltip-script"
        strategy="lazyOnload"
        src="https://wow.zamimg.com/js/tooltips.js"
      />
    </>
  );
}
