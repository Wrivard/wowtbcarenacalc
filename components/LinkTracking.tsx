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
 * The nearest labelled ancestor names the module a link belongs to —
 * "Related guides", "Prince Malchezaar best-in-slot drops", "Site footer".
 * That label is the whole point: it tells us which interlinking block earns
 * clicks, which is what the internal-linking work is judged on.
 */
function sectionOf(el: HTMLElement): string | undefined {
  const section = el.closest<HTMLElement>("section, nav, footer, header");
  if (!section) return undefined;

  const labelledBy = section.getAttribute("aria-labelledby");
  if (labelledBy) {
    const heading = document.getElementById(labelledBy);
    const text = clip(heading?.textContent);
    if (text) return text;
  }
  return clip(section.getAttribute("aria-label")) ?? clip(section.querySelector("h2, h3")?.textContent);
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
        // Icon-only links (spec icons, ability chips) have no text — their
        // aria-label is the only thing that identifies them.
        link_text: clip(link.textContent) ?? clip(link.getAttribute("aria-label")),
      });
    }

    // Capture phase: the client router can swap the DOM out from under a
    // bubbling listener before it ever reaches the document.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
