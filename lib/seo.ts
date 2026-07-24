// Central metadata builder. Next.js does NOT deep-merge `openGraph` /
// `twitter` from the root layout into a page's generateMetadata — setting
// either in a child fully replaces the parent object. So every page that
// wants unique OG tags must emit the COMPLETE openGraph/twitter here,
// otherwise it silently inherits the homepage's og:title/og:description
// (the bug this helper exists to prevent).

import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

/**
 * Fallback OG card (app/opengraph-image.tsx, 1200×630).
 *
 * Setting `openGraph` here replaces whatever the file-based convention would
 * have contributed, images included — so a page that passes no `ogImage` ended
 * up with no og:image at all. That was 134 pages, every arena comp guide among
 * them: shared into Discord or Reddit they rendered as a bare link.
 */
const SITE_OG_IMAGE = "/opengraph-image";

export interface PageMetaInput {
  /** Page <title> and og:title. Keep it keyword-rich, unique, ≤ ~60 chars.
   * Emitted as an absolute title so the root "%s — WoW TBC" brand template
   * never stacks a second brand onto titles that already carry "TBC". */
  title: string;
  /** Meta description and og:description. Unique per page; auto-clamped to a
   * word boundary ≤160 chars. */
  description: string;
  /** Site-root-relative canonical path, e.g. "/rogue/combat/pvp". */
  path: string;
  /** Optional per-page/per-class OG image path (root-relative or absolute).
   * Every dynamic OG route in this repo is 1200×630. Omit it and the branded
   * site card is used — see SITE_OG_IMAGE. */
  ogImage?: string;
  /** Set true to keep the page out of the index (unfilled data, etc.). */
  noindex?: boolean;
  /** Optional og:type override (defaults to "website"). */
  ogType?: "website" | "article";
  /** For og:type=article — ISO timestamps and author name (E-E-A-T/freshness). */
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/** Trim to the last word boundary before `max` and append an ellipsis so
 * descriptions never exceed the SERP budget or cut mid-word. */
export function clampDescription(text: string, max = 160): string {
  const s = text.trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,;:—-]+$/, "") + "…";
}

/**
 * Build a complete Metadata object with a unique canonical, OpenGraph and
 * Twitter card. Use this in every generateMetadata so no two pages share
 * OG tags.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noindex,
  ogType = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetaInput): Metadata {
  const canonical = path.startsWith("http") ? path : path || "/";
  const desc = clampDescription(description);
  const imageUrl = ogImage ?? SITE_OG_IMAGE;
  const image = { url: imageUrl, width: 1200, height: 630, alt: title };
  return {
    // Absolute so the layout brand template never double-appends.
    title: { absolute: title },
    description: desc,
    alternates: { canonical },
    openGraph: {
      type: ogType,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      title,
      description: desc,
      images: [image],
      ...(ogType === "article"
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(authors ? { authors } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [imageUrl],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
