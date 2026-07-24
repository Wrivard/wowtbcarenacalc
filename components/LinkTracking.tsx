"use client";

// Delegated click tracking for every link on the site. One listener on the
// document beats wrapping each <Link>: almost all of them live in server
// components, and the interlinking modules (related guides, boss BiS drops,
// sibling comps) are exactly what we want to measure without turning those
// pages into client components.
//
// Mounted from ConsentGatedScripts, so it only runs once consent is granted.

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

const MAX_LEN = 100; // GA4 truncates param values at 100 chars anyway.

const clip = (s: string | null | undefined) => {
  const t = s?.trim();
  return t ? t.slice(0, MAX_LEN) : undefined;
};

/**
 * The module a link belongs to — "Related guides", "Prince Malchezaar
 * best-in-slot drops", "Site footer". That label is the whole point: it tells
 * us which interlinking block earns clicks.
 *
 * Falls back to the nearest heading ABOVE the link in document order, because
 * plenty of card grids (the comp bracket pages, for one) are plain <div>s with
 * no landmark to hang a label on. Without that fallback those clicks report an
 * empty section, which is exactly what the first day of data showed.
 */
function sectionOf(el: HTMLElement): string | undefined {
  const section = el.closest<HTMLElement>("section, nav, footer, header");
  if (section) {
    const labelledBy = section.getAttribute("aria-labelledby");
    const viaId = labelledBy ? clip(document.getElementById(labelledBy)?.textContent) : undefined;
    const label =
      viaId ??
      clip(section.getAttribute("aria-label")) ??
      clip(section.querySelector("h2, h3")?.textContent);
    if (label) return label;
  }

  // querySelectorAll is in document order, so the last heading that precedes
  // the link is the one it sits under.
  let heading: Element | undefined;
  for (const candidate of document.querySelectorAll("h1, h2, h3")) {
    const elFollowsCandidate =
      candidate.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING;
    if (!elFollowsCandidate) break;
    heading = candidate;
  }
  return clip(heading?.textContent);
}

/**
 * A readable label for the link.
 *
 * textContent alone is useless on card links: a comp card concatenates its
 * tier badge, name and blurb into "SRogue / Disc PriestThe premier 2v2 comp
 * of TBC..." with no separators. An explicit label or an inner heading is
 * what the card actually means.
 */
function labelOf(link: HTMLAnchorElement): string | undefined {
  return (
    clip(link.getAttribute("aria-label")) ??
    clip(link.querySelector("h2, h3, h4")?.textContent) ??
    clip(link.textContent?.replace(/\s+/g, " "))
  );
}

export function LinkTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      if (!link?.href) return;

      let url: URL;
      try {
        url = new URL(link.href);
      } catch {
        return; // mailto:, javascript:, malformed — nothing to report
      }
      if (url.protocol !== "http:" && url.protocol !== "https:") return;

      const internal = url.host === window.location.host;
      trackEvent("link_click", {
        link_type: internal ? "internal" : "outbound",
        from_path: window.location.pathname,
        to: clip(internal ? url.pathname : url.host + url.pathname),
        link_section: sectionOf(link),
        link_text: labelOf(link),
      });
    }

    // Capture phase: the client router can swap the DOM out from under a
    // bubbling listener before it ever reaches the document.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
