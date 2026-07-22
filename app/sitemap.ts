import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CLASSES, allSpecs } from "@/lib/classes";
import { filledBisRoutes } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { COMPS, compSlug } from "@/data/comps";
import { BRACKETS as SEO_BRACKETS, bracketsForClass } from "@/lib/comps-seo";
import { getBestRace } from "@/data/bestRace";
import { PROFESSIONS } from "@/data/professions";
import { RAIDS, BOSSES, populatedPhases } from "@/data/raids";
import { SPEC_GUIDES } from "@/data/specGuides";

// Enumerates every indexable route from lib/classes.ts + the data
// registries. BiS/talent pages whose dataset isn't curated yet render
// noindex "coming soon" bodies and are deliberately EXCLUDED here —
// they join the sitemap automatically the moment their data file lands
// in the registry (full matrix ≈ 150+ URLs when all specs are filled).

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/arena-points-calculator`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pvp`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/pve`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/classes`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/talent-calculator`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/arena`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/arena/comps`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/guides/professions`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guides/addons`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/raids`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    // Only canonical bare paths belong in the sitemap — the ?tier=/?bracket=
    // filtered views canonicalize back to these, so listing the params would
    // submit URLs that declare themselves non-canonical.
    { url: `${SITE_URL}/class-rankings`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/leaderboard`, lastModified, changeFrequency: "hourly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified, changeFrequency: "monthly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "monthly", priority: 0.2 },
  ];

  // Class hubs — always live (data-independent). The talent calculator is
  // now a single page (/talent-calculator) with a class dropdown, listed
  // once above; the old per-class URLs redirect to it.
  for (const cls of CLASSES) {
    entries.push({
      url: `${SITE_URL}/${cls.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    // Neutral per-spec hubs (BiS + guides + talents for one spec).
    for (const spec of cls.specs) {
      entries.push({
        url: `${SITE_URL}/${cls.slug}/${spec.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  // Curated BiS pages — live PvP snapshot, per-season PvP pages, PvE phases.
  for (const route of filledBisRoutes()) {
    let path: string;
    if (route.content === "pve") {
      path = `/${route.classSlug}/${route.specSlug}/pve/phase-${route.phase}`;
    } else if (route.seasonPage) {
      path = `/${route.classSlug}/${route.specSlug}/pvp/season-${route.season}`;
    } else {
      path = `/${route.classSlug}/${route.specSlug}/pvp`;
    }
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(route.updatedAt),
      changeFrequency: "weekly",
      priority: route.seasonPage ? 0.6 : 0.7,
    });
  }

  // Arena comp guide pages — one per comp.
  for (const comp of COMPS) {
    entries.push({
      url: `${SITE_URL}/arena/comps/${comp.bracket}/${compSlug(comp)}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  // Arena comp SEO landing pages: per bracket, per class, and per
  // bracket×class (only non-empty combos). These target "best {class}
  // {bracket} comps"-style queries and each ranks on its own.
  for (const b of SEO_BRACKETS) {
    entries.push({
      url: `${SITE_URL}/arena/comps/${b}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  for (const cls of CLASSES) {
    const classBrackets = bracketsForClass(cls.slug);
    if (classBrackets.length === 0) continue; // no comps for this class → no facet page
    entries.push({
      url: `${SITE_URL}/arena/comps/class/${cls.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    });
    for (const b of classBrackets) {
      entries.push({
        url: `${SITE_URL}/arena/comps/${b}/class/${cls.slug}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Class guide hubs — one per class.
  for (const cls of CLASSES) {
    entries.push({
      url: `${SITE_URL}/guides/${cls.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // Authored per-spec PvP/PvE guides.
  for (const g of SPEC_GUIDES) {
    entries.push({
      url: `${SITE_URL}/guides/${g.class}/${g.spec}/${g.content}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Best-race + per-class addon guide pages — one per class.
  for (const cls of CLASSES) {
    if (getBestRace(cls.slug)) {
      entries.push({
        url: `${SITE_URL}/guides/best-race/${cls.slug}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    entries.push({
      url: `${SITE_URL}/guides/addons/${cls.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Per-profession guide pages.
  for (const p of PROFESSIONS) {
    entries.push({
      url: `${SITE_URL}/guides/professions/${p.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Raid phase / raid / boss pages.
  for (const phase of populatedPhases()) {
    entries.push({
      url: `${SITE_URL}/raids/phase-${phase}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const raid of RAIDS) {
    entries.push({
      url: `${SITE_URL}/raids/phase-${raid.phase}/${raid.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const boss of BOSSES) {
    entries.push({
      url: `${SITE_URL}/raids/phase-${boss.phase}/${boss.raidId}/${boss.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Talent build pages (curated + generated) — one per spec with a build.
  for (const { cls, spec } of allSpecs()) {
    const build = getBuild(cls.slug, spec.slug);
    if (!build) continue;
    entries.push({
      url: `${SITE_URL}/${cls.slug}/${spec.slug}/talents`,
      lastModified: new Date(build.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
