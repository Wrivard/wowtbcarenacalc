import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CLASSES, allSpecs } from "@/lib/classes";
import { filledBisRoutes } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { COMPS, compSlug } from "@/data/comps";
import { BRACKETS as SEO_BRACKETS, bracketsForClass, classCombos, comboSlug } from "@/lib/comps-seo";
import { getBestRace } from "@/data/bestRace";
import { PROFESSIONS } from "@/data/professions";
import { RAIDS, BOSSES, populatedPhases } from "@/data/raids";
import { SPEC_GUIDES } from "@/data/specGuides";
import { NON_DEFAULT_TIERS } from "@/data/rankings";
import CONTENT_DATES from "@/data/contentDates.json";

// Enumerates every indexable route from lib/classes.ts + the data
// registries. BiS/talent pages whose dataset isn't curated yet render
// noindex "coming soon" bodies and are deliberately EXCLUDED here —
// they join the sitemap automatically the moment their data file lands
// in the registry (full matrix ≈ 150+ URLs when all specs are filled).

/**
 * When a route's content last changed, from data/contentDates.json — the git
 * date of the data and components it is built from, refreshed by
 * scripts/build-content-dates.mjs.
 *
 * Two earlier attempts were both wrong in different directions. `new Date()`
 * stamped 488 of 804 URLs with the build time, so every deploy claimed the
 * whole site had changed. Replacing it with each dataset's own `updatedAt`
 * stopped the lie but measured the wrong thing: that field is the date the
 * upstream SNAPSHOT was taken, so on 2026-07-29 the 140 PvE pages advertised
 * 2026-05-22 while their files had been rewritten that morning, and 436 URLs
 * carried no lastmod at all.
 */
const routeDate = (p: string): Date | undefined => {
  const d = (CONTENT_DATES.routes as Record<string, string>)[p];
  return d ? new Date(d) : undefined;
};
const familyDate = (f: keyof typeof CONTENT_DATES.families): Date =>
  new Date(CONTENT_DATES.families[f]);

/**
 * Authored content keeps its own `updatedAt` — for a hand-written guide that
 * really is the day the text changed, not a snapshot date. But it goes stale
 * the moment the template around it changes, so take whichever is later.
 */
const later = (a: Date, b: Date): Date => (a > b ? a : b);

export default function sitemap(): MetadataRoute.Sitemap {
  const comps = familyDate("comps");
  const raids = familyDate("raids");
  const classes = familyDate("classes");
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: routeDate("/"),
      changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/arena-points-calculator`, lastModified: routeDate("/arena-points-calculator"),
      changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/pvp`, lastModified: routeDate("/pvp"),
      changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/pve`, lastModified: routeDate("/pve"),
      changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/classes`, lastModified: routeDate("/classes"),
      changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/talent-calculator`, lastModified: routeDate("/talent-calculator"),
      changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/arena`, lastModified: routeDate("/arena"),
      changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/arena/comps`, lastModified: routeDate("/arena/comps"),
      changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: routeDate("/guides"),
      changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/guides/professions`, lastModified: routeDate("/guides/professions"),
      changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guides/addons`, lastModified: routeDate("/guides/addons"),
      changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/raids`, lastModified: routeDate("/raids"),
      changeFrequency: "weekly", priority: 0.8 },
    // Only canonical bare paths belong in the sitemap — the ?tier=/?bracket=
    // filtered views canonicalize back to these, so listing the params would
    // submit URLs that declare themselves non-canonical.
    { url: `${SITE_URL}/class-rankings`, lastModified: classes,
      changeFrequency: "weekly", priority: 0.8 },
    // Per-tier static DPS-ranking pages (every tier except the default one,
    // whose content is the hub above). Same source as the [tier] route's
    // generateStaticParams, so sitemap and routes can't drift.
    ...NON_DEFAULT_TIERS.map((t) => ({
      url: `${SITE_URL}/class-rankings/${t.slug}`,
      lastModified: classes,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // /leaderboard is deliberately absent: it renders noindex until the live
    // Blizzard feed lands. Submitting a noindex URL is a self-contradiction
    // Search Console reports as an error.
    { url: `${SITE_URL}/about`, lastModified: routeDate("/about"),
      changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, lastModified: routeDate("/contact"),
      changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: routeDate("/privacy-policy"),
      changeFrequency: "monthly", priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: routeDate("/terms"),
      changeFrequency: "monthly", priority: 0.2 },
  ];

  // Class hubs — always live (data-independent). Each class also has its own
  // talent calculator page: the class lives in the path, so all nine are
  // indexable (a ?class= variant canonicalises to these and cannot rank).
  for (const cls of CLASSES) {
    entries.push({
      url: `${SITE_URL}/${cls.slug}`,
      lastModified: classes,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    entries.push({
      url: `${SITE_URL}/talent-calculator/${cls.slug}`,
      lastModified: familyDate("talentCalc"),
      changeFrequency: "monthly",
      priority: 0.8,
    });
    // Neutral per-spec hubs (BiS + guides + talents for one spec).
    for (const spec of cls.specs) {
      entries.push({
        url: `${SITE_URL}/${cls.slug}/${spec.slug}`,
        lastModified: routeDate(`/${cls.slug}/${spec.slug}`),
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
      lastModified: routeDate(path),
      changeFrequency: "weekly",
      priority: route.seasonPage ? 0.6 : 0.7,
    });
  }

  // Arena comp guide pages — one per comp.
  for (const comp of COMPS) {
    entries.push({
      url: `${SITE_URL}/arena/comps/${comp.bracket}/${compSlug(comp)}`,
      lastModified: comps,
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
      lastModified: comps,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  for (const cls of CLASSES) {
    const classBrackets = bracketsForClass(cls.slug);
    if (classBrackets.length === 0) continue; // no comps for this class → no facet page
    entries.push({
      url: `${SITE_URL}/arena/comps/class/${cls.slug}`,
      lastModified: comps,
      changeFrequency: "weekly",
      priority: 0.6,
    });
    for (const b of classBrackets) {
      entries.push({
        url: `${SITE_URL}/arena/comps/${b}/class/${cls.slug}`,
        lastModified: comps,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // Arena comp class-combo pages: 2–3 co-occurring classes, all-brackets and
  // per-bracket ("best rogue mage comps", "best rogue shaman 5v5 comps"). Same
  // source (classCombos) as the pages' generateStaticParams, so the sitemap and
  // the routes can never drift.
  for (const combo of classCombos()) {
    entries.push({
      url: `${SITE_URL}/arena/comps/class/${comboSlug(combo)}`,
      lastModified: comps,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  }
  for (const b of SEO_BRACKETS) {
    for (const combo of classCombos(b)) {
      entries.push({
        url: `${SITE_URL}/arena/comps/${b}/class/${comboSlug(combo)}`,
        lastModified: comps,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }
  }

  // Class guide hubs — one per class.
  for (const cls of CLASSES) {
    entries.push({
      url: `${SITE_URL}/guides/${cls.slug}`,
      lastModified: classes,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  // Authored per-spec PvP/PvE guides.
  for (const g of SPEC_GUIDES) {
    entries.push({
      url: `${SITE_URL}/guides/${g.class}/${g.spec}/${g.content}`,
      lastModified: later(new Date(g.updatedAt), familyDate("guides")),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Best-race + per-class addon guide pages — one per class.
  for (const cls of CLASSES) {
    if (getBestRace(cls.slug)) {
      entries.push({
        url: `${SITE_URL}/guides/best-race/${cls.slug}`,
        lastModified: classes,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    entries.push({
      url: `${SITE_URL}/guides/addons/${cls.slug}`,
      lastModified: familyDate("addons"),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Per-profession guide pages.
  for (const p of PROFESSIONS) {
    entries.push({
      url: `${SITE_URL}/guides/professions/${p.slug}`,
      lastModified: familyDate("professions"),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Raid phase / raid / boss pages.
  for (const phase of populatedPhases()) {
    entries.push({
      url: `${SITE_URL}/raids/phase-${phase}`,
      lastModified: raids,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const raid of RAIDS) {
    entries.push({
      url: `${SITE_URL}/raids/phase-${raid.phase}/${raid.id}`,
      lastModified: raids,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const boss of BOSSES) {
    entries.push({
      url: `${SITE_URL}/raids/phase-${boss.phase}/${boss.raidId}/${boss.id}`,
      lastModified: raids,
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
      lastModified: later(new Date(build.updatedAt), familyDate("builds")),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
