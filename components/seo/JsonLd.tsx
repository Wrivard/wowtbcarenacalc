// Reusable JSON-LD injectors for the programmatic pages.

import { SITE_URL } from "@/lib/site";

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export interface Crumb {
  name: string;
  href: string; // site-relative, e.g. "/shaman/restoration/pvp"
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href}`,
    })),
  };
}

export function faqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function howToJsonLd(
  name: string,
  description: string,
  steps: { name: string; text: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// Stable @ids so nodes can reference each other across the graph.
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
export const GAME_ID = `${SITE_URL}/#game`;

export function organizationJsonLd(name: string, url: string, logo: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name,
    url,
    logo: {
      "@type": "ImageObject",
      url: `${url}${logo}`,
      width: 920,
      height: 736,
    },
    description:
      "TBC Classic best-in-slot lists, talent calculator, arena comps and raid guides.",
  };
}

export function webSiteJsonLd(name: string, url: string, description?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name,
    url,
    ...(description ? { description } : {}),
    publisher: { "@id": ORG_ID },
    about: { "@id": GAME_ID },
    inLanguage: "en-US",
  };
}

/** The single game entity the whole site is about — the strongest topical
 * signal for a game-focused hub. Referenced by @id from WebSite. */
export function videoGameJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "@id": GAME_ID,
    name: "World of Warcraft: The Burning Crusade Classic",
    alternateName: ["TBC Classic", "WoW TBC", "Burning Crusade Classic"],
    gamePlatform: "PC",
    applicationCategory: "Game",
    genre: ["MMORPG"],
    publisher: { "@type": "Organization", name: "Blizzard Entertainment" },
  };
}

/** Editorial article node for long-form guides (spec guides, boss strategies,
 * comp guides, talent builds). Gives Google a headline, author, publisher and
 * datePublished/dateModified so freshness + E-E-A-T signals resolve. */
export function articleJsonLd(
  headline: string,
  description: string,
  path: string,
  opts: {
    datePublished?: string;
    dateModified?: string;
    image?: string;
    section?: string;
    techArticle?: boolean;
  } = {},
) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": opts.techArticle ? "TechArticle" : "Article",
    headline,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(opts.image ? { image: opts.image.startsWith("http") ? opts.image : `${SITE_URL}${opts.image}` } : {}),
    ...(opts.section ? { articleSection: opts.section } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
  };
}

export function webApplicationJsonLd(name: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    description,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
