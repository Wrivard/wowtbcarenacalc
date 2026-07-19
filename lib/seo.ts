// Central metadata builder. Next.js does NOT deep-merge `openGraph` /
// `twitter` from the root layout into a page's generateMetadata — setting
// either in a child fully replaces the parent object. So every page that
// wants unique OG tags must emit the COMPLETE openGraph/twitter here,
// otherwise it silently inherits the homepage's og:title/og:description
// (the bug this helper exists to prevent).

import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export interface PageMetaInput {
  /** Page <title> and og:title. Keep it keyword-rich and unique. */
  title: string;
  /** Meta description and og:description. Unique per page. */
  description: string;
  /** Site-root-relative canonical path, e.g. "/rogue/combat/pvp". */
  path: string;
  /** Optional per-page/per-class OG image path (root-relative or absolute). */
  ogImage?: string;
  /** Set true to keep the page out of the index (unfilled data, etc.). */
  noindex?: boolean;
  /** Optional og:type override (defaults to "website"). */
  ogType?: "website" | "article";
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
}: PageMetaInput): Metadata {
  const canonical = path.startsWith("http") ? path : path || "/";
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: ogType,
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
