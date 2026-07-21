// PARTIE A — SEO Priority Scoring (run once, re-run whenever routes/data change)
//
// Enumerates every indexable URL on wowtbcarena.com straight from the
// real source of truth (lib/classes, lib/bis, data/comps, data/specGuides,
// data/raids, data/professions, …) — never a duplicated matrix — then
// scores each page 0-100 across five weighted factors and assigns it to a
// content batch (1 = pillar, 5 = noindex candidate).
//
// Outputs:
//   scripts/output/priority-report.json    — full machine-readable scores
//   scripts/output/priority-report.md      — human-readable ranked report
//   scripts/output/noindex-candidates.txt  — low-value URLs + reason
//
// Run:  npx tsx scripts/priority-score.ts   (or: pnpm priority-score)

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { CLASSES, PHASES, allSpecs, type Role } from "@/lib/classes";
import {
  PVP_SEASONS,
  LIVE_SEASON,
  getPvpBis,
  getPvpSeasonBis,
  getPveBis,
  type BisList,
  type PvpSeason,
} from "@/lib/bis";
import { COMPS, compSlug } from "@/data/comps";
import { SPEC_GUIDES } from "@/data/specGuides";
import { RAIDS, BOSSES } from "@/data/raids";
import { PROFESSIONS } from "@/data/professions";
import { getBestRace } from "@/data/bestRace";
import { getStatCaps } from "@/data/caps";
import { getGearPriority } from "@/data/gearPriority";
import { getItemSource } from "@/data/itemSources";
import { macrosForClass } from "@/data/macros";
import { getBuild } from "@/data/builds";

// ────────────────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────────────────

type PageType =
  | "pvp-bis"
  | "pve-bis"
  | "talent"
  | "comp"
  | "guide"
  | "raid"
  | "boss"
  | "calc"
  | "hub"
  | "utility";

interface PageScore {
  url: string;
  pageType: PageType;
  class?: string;
  spec?: string;
  phase?: number;
  season?: number;
  scores: {
    searchVolume: number; // 0-30
    competitionGap: number; // 0-25
    arenaRelevance: number; // 0-20
    contentGap: number; // 0-15
    freshnessPotential: number; // 0-10
  };
  totalScore: number;
  batch: 1 | 2 | 3 | 4 | 5;
  estimatedHours: number;
  /** filled only for batch-5 pages — why the page is a noindex candidate */
  noindexReason?: string;
}

// ────────────────────────────────────────────────────────────────────────
// Scoring tables (verbatim from the spec, extended where the spec left a
// "default"; every extension is flagged EXT so the numbers stay tunable).
// ────────────────────────────────────────────────────────────────────────

// searchVolume 0-30 — from the spec's SEARCH_VOLUME_SCORES table.
const SEARCH_VOLUME_SPEC: Record<string, number> = {
  "rogue-subtlety-pvp": 30,
  "priest-discipline-pvp": 28,
  "warrior-arms-pvp": 27,
  "mage-frost-pvp": 26,
  "warlock-affliction-pvp": 25,
  "druid-restoration-pvp": 24,
  "shaman-restoration-pvp": 23,
  "paladin-holy-pvp": 22,
};

// EXT — remaining PvP specs, estimated by TBC S2 arena representation so the
// long tail spreads instead of all collapsing onto the spec's default (8).
const SEARCH_VOLUME_SPEC_EXT: Record<string, number> = {
  "rogue-combat-pvp": 16,
  "warrior-fury-pvp": 15,
  "mage-arcane-pvp": 14,
  "warlock-destruction-pvp": 15,
  "warlock-demonology-pvp": 11,
  "priest-holy-pvp": 14,
  "priest-shadow-pvp": 16,
  "shaman-elemental-pvp": 13,
  "shaman-enhancement-pvp": 12,
  "paladin-retribution-pvp": 14,
  "hunter-beast-mastery-pvp": 17,
  "hunter-survival-pvp": 15,
  "hunter-marksmanship-pvp": 12,
  "druid-balance-pvp": 13,
  "druid-feral-cat-pvp": 16,
};

// EXT — best-race pages (spec lists rogue/warrior/mage; extend the rest).
const SEARCH_VOLUME_BEST_RACE: Record<string, number> = {
  rogue: 20,
  warrior: 19,
  mage: 18,
  warlock: 16,
  priest: 15,
  druid: 15,
  hunter: 15,
  shaman: 14,
  paladin: 14,
};

// competitionGap 0-25 — from the spec's COMPETITION_GAP table, keyed here by
// the signal each page carries.
const COMPETITION_GAP = {
  pvpBisLiveSnapshot: 25, // live S2 ladder snapshot — nobody else has it
  arenaLeaderboardLive: 25,
  arenaCompsGuide: 20,
  bestRace: 18,
  macros: 16,
  statCaps: 15,
  talentCalculator: 10,
  pveBis: 8,
} as const;

// ────────────────────────────────────────────────────────────────────────
// Per-factor scorers
// ────────────────────────────────────────────────────────────────────────

/** 0-30 search volume, resolved per page type. */
function searchVolume(p: {
  pageType: PageType;
  url: string;
  class?: string;
  spec?: string;
  phase?: number;
  season?: number;
}): number {
  switch (p.pageType) {
    case "calc":
      // arena-points-calculator is the top tool keyword; per-class talent
      // calc pages sit a notch below the calculator hub.
      if (p.url === "/arena-points-calculator") return 30;
      if (p.url === "/talent-calculator") return 25;
      return 18; // /talent-calculator/[class]
    case "comp": {
      // Marquee comps from the spec table; others estimated by bracket.
      const key = `comp-${p.spec ?? ""}`; // spec unused for comps; fall through
      void key;
      const url = p.url;
      if (url.endsWith("/rogue-mage-priest")) return 30; // RMP 3s
      if (url.includes("/2s/") && url.includes("rogue")) return 26;
      if (url.includes("/3s/")) return 20;
      if (url.includes("/2s/")) return 18;
      return 12; // 5s
    }
    case "pvp-bis": {
      const k = `${p.class}-${p.spec}-pvp`;
      const base =
        SEARCH_VOLUME_SPEC[k] ?? SEARCH_VOLUME_SPEC_EXT[k] ?? 8;
      // Derived-season pages (S1/S3/S4) draw far less traffic than the live
      // S2 snapshot — discount them.
      if (p.season && p.season !== LIVE_SEASON) return Math.round(base * 0.45);
      return base;
    }
    case "pve-bis": {
      const phaseScore: Record<number, number> = {
        1: 18,
        2: 16,
        3: 12,
        4: 10,
        5: 15, // Sunwell spike
      };
      return phaseScore[p.phase ?? 1] ?? 8;
    }
    case "talent":
      return 12; // talent pages ride the calculator keyword tail
    case "guide":
      return 14;
    case "boss": {
      // Marquee raids pull the searches; keyed by raid segment.
      const url = p.url;
      if (url.includes("/karazhan/")) return 20;
      if (url.includes("/black-temple/")) return 18;
      if (url.includes("/sunwell-plateau/")) return 17;
      return 10;
    }
    case "raid":
      return 12;
    case "hub": {
      const hubs: Record<string, number> = {
        "/leaderboard": 22,
        "/arena/comps": 20,
        "/pvp": 16,
        "/pve": 14,
        "/raids": 14,
        "/classes": 12,
        "/class-rankings": 14,
        "/guides": 12,
        "/arena": 12,
        "/guides/professions": 12,
        "/guides/addons": 10,
      };
      return hubs[p.url] ?? 8;
    }
    case "utility":
      return 2;
  }
}

/** 0-25 competition gap. */
function competitionGap(p: {
  pageType: PageType;
  season?: number;
}): number {
  switch (p.pageType) {
    case "pvp-bis":
      // Live snapshot is the moat; derived seasons are historical (weaker gap).
      return p.season && p.season !== LIVE_SEASON
        ? 12
        : COMPETITION_GAP.pvpBisLiveSnapshot;
    case "hub": // leaderboard hub carries the live-data gap; handled below
      return 12;
    case "comp":
      return COMPETITION_GAP.arenaCompsGuide;
    case "guide":
      return COMPETITION_GAP.macros; // guides bundle macros/race — mid gap
    case "pve-bis":
      return COMPETITION_GAP.pveBis;
    case "calc":
      return COMPETITION_GAP.talentCalculator;
    case "talent":
      return COMPETITION_GAP.talentCalculator;
    case "boss":
      return 10;
    case "raid":
      return 9;
    case "utility":
      return 0;
  }
}

/** 0-20 arena relevance — PvP surfaces beat PvE on this site. */
function arenaRelevance(p: { pageType: PageType; url: string }): number {
  switch (p.pageType) {
    case "pvp-bis":
      return 20;
    case "comp":
      return 20;
    case "calc":
      return p.url === "/arena-points-calculator" ? 18 : 10;
    case "hub": {
      const pvpHubs = ["/leaderboard", "/arena", "/arena/comps", "/pvp"];
      return pvpHubs.includes(p.url) ? 16 : 6;
    }
    case "guide":
      return 12; // mix of pvp/pve guides
    case "talent":
      return 11;
    case "pve-bis":
      return 6;
    case "boss":
      return 4;
    case "raid":
      return 4;
    case "utility":
      return 0;
  }
}

/** 0-10 freshness potential — live data pages get the bonus. */
function freshnessPotential(p: {
  pageType: PageType;
  url: string;
  season?: number;
}): number {
  if (p.url === "/leaderboard") return 10;
  if (p.pageType === "pvp-bis")
    return p.season && p.season !== LIVE_SEASON ? 3 : 8; // live snapshot
  if (p.url === "/class-rankings") return 6;
  if (p.pageType === "comp") return 3;
  if (p.pageType === "calc") return 2;
  return 1;
}

// ── contentGap 0-15 — measured against the real backing data, not guessed.
// More missing sections = more upside = higher score (per the spec).

function bisContentGap(list: BisList | null, classSlug: string, role: Role, content: "pvp" | "pve"): number {
  if (!list) return 15; // unfilled page (e.g. a season with no data) — max gap
  let missing = 0;
  const slotCount = list.slots?.length ?? 0;
  if (slotCount < 14) missing += 3; // an incomplete gear grid is the biggest gap
  if (!list.blurb || list.blurb.split(/\s+/).length < 40) missing += 2;
  if (!list.statPriorityRationale) missing += 1;
  if ((list.gems?.length ?? 0) === 0) missing += 1;
  if ((list.enchants?.length ?? 0) === 0) missing += 1;
  if ((list.faq?.length ?? 0) < 5) missing += 2;
  if (getStatCaps(classSlug, role, content).length === 0) missing += 1;
  if (getGearPriority(classSlug, role, content).length === 0) missing += 1;
  // "How to get" coverage across the BiS slots.
  const withSource = (list.slots ?? []).filter(
    (s) => (getItemSource(s.bis.itemId)?.length ?? 0) > 0,
  ).length;
  if (slotCount > 0 && withSource / slotCount < 0.5) missing += 2;
  if (content === "pvp" && macrosForClass(classSlug).length === 0) missing += 1;
  return Math.min(15, missing);
}

// ────────────────────────────────────────────────────────────────────────
// Batch + effort assignment
// ────────────────────────────────────────────────────────────────────────

function assignBatch(total: number): PageScore["batch"] {
  if (total >= 75) return 1;
  if (total >= 55) return 2;
  if (total >= 35) return 3;
  if (total >= 15) return 4;
  return 5;
}

function estimatedHours(pageType: PageType, batch: number): number {
  const base: Record<PageType, number> = {
    "pvp-bis": 4,
    "pve-bis": 2.5,
    comp: 4,
    guide: 3,
    talent: 1.5,
    boss: 2,
    raid: 1,
    calc: 3,
    hub: 2,
    utility: 0.25,
  };
  // Lower batches (higher priority) get the Tier-1 depth pass; batch 4/5 stay
  // minimal, so effort scales down.
  const batchMult = batch <= 1 ? 1 : batch === 2 ? 0.8 : batch === 3 ? 0.55 : 0.3;
  return Math.round(base[pageType] * batchMult * 4) / 4; // round to 0.25h
}

// ────────────────────────────────────────────────────────────────────────
// URL enumeration — mirrors every generateStaticParams + static route.
// ────────────────────────────────────────────────────────────────────────

interface RawPage {
  url: string;
  pageType: PageType;
  class?: string;
  spec?: string;
  phase?: number;
  season?: number;
  role?: Role;
  bis?: BisList | null;
  content?: "pvp" | "pve";
}

function enumeratePages(): RawPage[] {
  const pages: RawPage[] = [];

  // Static hubs + tools + utility pages.
  const HUB_URLS = [
    "/",
    "/pvp",
    "/pve",
    "/arena",
    "/arena/comps",
    "/raids",
    "/leaderboard",
    "/classes",
    "/class-rankings",
    "/guides",
    "/guides/addons",
    "/guides/professions",
  ];
  for (const url of HUB_URLS) pages.push({ url, pageType: "hub" });

  pages.push({ url: "/arena-points-calculator", pageType: "calc" });
  pages.push({ url: "/talent-calculator", pageType: "calc" });

  const UTILITY_URLS = ["/about", "/contact", "/privacy-policy", "/terms"];
  for (const url of UTILITY_URLS) pages.push({ url, pageType: "utility" });

  // /[class]
  for (const c of CLASSES) pages.push({ url: `/${c.slug}`, pageType: "hub", class: c.slug });

  const specs = allSpecs();

  // /[class]/[spec]  (spec overview)
  for (const { cls, spec } of specs)
    pages.push({ url: `/${cls.slug}/${spec.slug}`, pageType: "hub", class: cls.slug, spec: spec.slug });

  // /[class]/[spec]/talents
  for (const { cls, spec } of specs)
    pages.push({
      url: `/${cls.slug}/${spec.slug}/talents`,
      pageType: "talent",
      class: cls.slug,
      spec: spec.slug,
    });

  // /[class]/[spec]/pvp  (live S2 snapshot)
  for (const { cls, spec } of specs.filter((s) => s.spec.pvp))
    pages.push({
      url: `/${cls.slug}/${spec.slug}/pvp`,
      pageType: "pvp-bis",
      class: cls.slug,
      spec: spec.slug,
      season: LIVE_SEASON,
      role: spec.role,
      content: "pvp",
      bis: getPvpBis(cls.slug, spec.slug),
    });

  // /[class]/[spec]/pvp/[season]  (derived S1/S3/S4)
  const DERIVED_SEASONS = PVP_SEASONS.filter((s) => s !== LIVE_SEASON);
  for (const { cls, spec } of specs.filter((s) => s.spec.pvp))
    for (const season of DERIVED_SEASONS)
      pages.push({
        url: `/${cls.slug}/${spec.slug}/pvp/season-${season}`,
        pageType: "pvp-bis",
        class: cls.slug,
        spec: spec.slug,
        season,
        role: spec.role,
        content: "pvp",
        bis: getPvpSeasonBis(cls.slug, spec.slug, season as PvpSeason),
      });

  // /[class]/[spec]/pve/[phase]
  for (const { cls, spec } of specs.filter((s) => s.spec.pve))
    for (const phase of PHASES)
      pages.push({
        url: `/${cls.slug}/${spec.slug}/pve/phase-${phase}`,
        pageType: "pve-bis",
        class: cls.slug,
        spec: spec.slug,
        phase,
        role: spec.role,
        content: "pve",
        bis: getPveBis(cls.slug, spec.slug, phase),
      });

  // /talent-calculator/[class]
  for (const c of CLASSES)
    pages.push({ url: `/talent-calculator/${c.slug}`, pageType: "calc", class: c.slug });

  // /arena/comps/[bracket]/[slug]
  for (const comp of COMPS)
    pages.push({
      url: `/arena/comps/${comp.bracket}/${compSlug(comp)}`,
      pageType: "comp",
    });

  // /guides/[class]
  for (const c of CLASSES)
    pages.push({ url: `/guides/${c.slug}`, pageType: "hub", class: c.slug });

  // /guides/[class]/[spec]/[content]
  for (const g of SPEC_GUIDES)
    pages.push({
      url: `/guides/${g.class}/${g.spec}/${g.content}`,
      pageType: "guide",
      class: g.class,
      spec: g.spec,
      content: g.content,
    });

  // /guides/addons/[class]
  for (const c of CLASSES)
    pages.push({ url: `/guides/addons/${c.slug}`, pageType: "guide", class: c.slug });

  // /guides/best-race/[class]
  for (const c of CLASSES.filter((c) => getBestRace(c.slug)))
    pages.push({ url: `/guides/best-race/${c.slug}`, pageType: "guide", class: c.slug });

  // /guides/professions/[profession]
  for (const p of PROFESSIONS)
    pages.push({ url: `/guides/professions/${p.slug}`, pageType: "guide" });

  // /raids/[phase]
  for (const phase of PHASES)
    pages.push({ url: `/raids/phase-${phase}`, pageType: "raid", phase });

  // /raids/[phase]/[raid]
  for (const r of RAIDS)
    pages.push({ url: `/raids/phase-${r.phase}/${r.id}`, pageType: "raid", phase: r.phase });

  // /raids/[phase]/[raid]/[boss]
  for (const b of BOSSES)
    pages.push({
      url: `/raids/phase-${b.phase}/${b.raidId}/${b.id}`,
      pageType: "boss",
      phase: b.phase,
    });

  return pages;
}

// ────────────────────────────────────────────────────────────────────────
// Score a page + explain a noindex candidate.
// ────────────────────────────────────────────────────────────────────────

function noindexReasonFor(raw: RawPage): string {
  if (raw.pageType === "pvp-bis" && raw.season && raw.season !== LIVE_SEASON && !raw.bis)
    return `derived season ${raw.season} has no BiS data (renders "coming soon")`;
  if (raw.pageType === "pvp-bis" && raw.season && raw.season !== LIVE_SEASON)
    return `historical season ${raw.season} — low search, low competition gap`;
  if (raw.pageType === "pve-bis" && (raw.phase === 3 || raw.phase === 4) && !raw.bis)
    return `phase ${raw.phase} unfilled BiS data`;
  if (raw.pageType === "utility") return "legal/utility page — no SEO intent";
  if (raw.pageType === "pve-bis") return `low-traffic PvE spec/phase (${raw.spec})`;
  return "below indexing threshold (thin search demand)";
}

function scorePage(raw: RawPage): PageScore {
  const scores = {
    searchVolume: searchVolume(raw),
    competitionGap: competitionGap(raw),
    arenaRelevance: arenaRelevance(raw),
    contentGap:
      raw.pageType === "pvp-bis" || raw.pageType === "pve-bis"
        ? bisContentGap(raw.bis ?? null, raw.class!, raw.role!, raw.content!)
        : contentGapNonBis(raw.pageType),
    freshnessPotential: freshnessPotential(raw),
  };
  const totalScore =
    scores.searchVolume +
    scores.competitionGap +
    scores.arenaRelevance +
    scores.contentGap +
    scores.freshnessPotential;
  const batch = assignBatch(totalScore);
  return {
    url: raw.url,
    pageType: raw.pageType,
    class: raw.class,
    spec: raw.spec,
    phase: raw.phase,
    season: raw.season,
    scores,
    totalScore,
    batch,
    estimatedHours: estimatedHours(raw.pageType, batch),
    noindexReason: batch === 5 ? noindexReasonFor(raw) : undefined,
  };
}

// Non-BiS content gap: these page types are richly authored already
// (comps, guides, bosses per PROGRESS.md), so their upside is small.
function contentGapNonBis(pageType: PageType): number {
  const map: Record<PageType, number> = {
    comp: 3,
    guide: 4,
    boss: 5,
    raid: 4,
    talent: 6,
    calc: 5,
    hub: 6,
    utility: 1,
    "pvp-bis": 0,
    "pve-bis": 0,
  };
  return map[pageType];
}

// ────────────────────────────────────────────────────────────────────────
// Report generation
// ────────────────────────────────────────────────────────────────────────

function main() {
  const raw = enumeratePages();
  const scored = raw.map(scorePage).sort((a, b) => b.totalScore - a.totalScore);

  const byBatch = (n: number) => scored.filter((p) => p.batch === n);
  const b1 = byBatch(1),
    b2 = byBatch(2),
    b3 = byBatch(3),
    b4 = byBatch(4),
    b5 = byBatch(5);

  const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "output");
  mkdirSync(outDir, { recursive: true });

  // JSON
  writeFileSync(
    path.join(outDir, "priority-report.json"),
    JSON.stringify(
      {
        generatedFrom: "scripts/priority-score.ts",
        totalPages: scored.length,
        batchCounts: { 1: b1.length, 2: b2.length, 3: b3.length, 4: b4.length, 5: b5.length },
        pages: scored,
      },
      null,
      2,
    ),
  );

  // Markdown
  const md: string[] = [];
  md.push("# Priority Report — wowtbcarena.com\n");
  md.push(
    "Generated by `scripts/priority-score.ts` from the live route/data source of truth. " +
      "Re-run after adding routes or data.\n",
  );
  md.push("## Batch summary\n");
  md.push("| Batch | Tier | Pages | Est. hours |");
  md.push("| --- | --- | ---: | ---: |");
  const hrs = (arr: PageScore[]) =>
    Math.round(arr.reduce((s, p) => s + p.estimatedHours, 0) * 10) / 10;
  md.push(`| 1 | Pillars (75-100) | ${b1.length} | ${hrs(b1)} |`);
  md.push(`| 2 | High value (55-74) | ${b2.length} | ${hrs(b2)} |`);
  md.push(`| 3 | Standard (35-54) | ${b3.length} | ${hrs(b3)} |`);
  md.push(`| 4 | Minimal (15-34) | ${b4.length} | ${hrs(b4)} |`);
  md.push(`| 5 | noindex (0-14) | ${b5.length} | ${hrs(b5)} |`);
  md.push(`| **Total** | | **${scored.length}** | **${hrs(scored)}** |\n`);

  const table = (arr: PageScore[]) => {
    const lines = [
      "| # | URL | Type | Score | SV | CG | AR | Gap | Fr | Hrs |",
      "| ---: | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
    ];
    arr.forEach((p, i) => {
      const s = p.scores;
      lines.push(
        `| ${i + 1} | \`${p.url}\` | ${p.pageType} | **${p.totalScore}** | ${s.searchVolume} | ${s.competitionGap} | ${s.arenaRelevance} | ${s.contentGap} | ${s.freshnessPotential} | ${p.estimatedHours} |`,
      );
    });
    return lines.join("\n");
  };

  md.push("## Top 25 priority pages\n");
  md.push(table(scored.slice(0, 25)));
  md.push("\n_SV=searchVolume CG=competitionGap AR=arenaRelevance Gap=contentGap Fr=freshness_\n");

  md.push("\n## Batch 1 — Pillars (Tier 1)\n");
  md.push(table(b1));
  md.push("\n## Batch 2 — High value\n");
  md.push(table(b2));
  md.push(
    `\n## Batches 3-5\n\nBatch 3: ${b3.length} pages · Batch 4: ${b4.length} pages · Batch 5: ${b5.length} pages. ` +
      "Full per-page detail in `priority-report.json`; noindex list in `noindex-candidates.txt`.\n",
  );

  writeFileSync(path.join(outDir, "priority-report.md"), md.join("\n"));

  // noindex candidates
  const noindex = b5
    .map((p) => `${p.url}\t[score ${p.totalScore}]\t${p.noindexReason ?? ""}`)
    .join("\n");
  writeFileSync(
    path.join(outDir, "noindex-candidates.txt"),
    `# Batch 5 — noindex candidates (score < 15)\n# URL\\tScore\\tReason\n${noindex}\n`,
  );

  // Terminal summary
  const pad = (n: number) => String(n).padStart(3);
  console.log("=== PRIORITY REPORT ===");
  console.log(`Batch 1 (Tier 1 pillars): ${pad(b1.length)} pages`);
  console.log(`Batch 2 (High value):     ${pad(b2.length)} pages`);
  console.log(`Batch 3 (Standard):       ${pad(b3.length)} pages`);
  console.log(`Batch 4 (Minimal):        ${pad(b4.length)} pages`);
  console.log(`Batch 5 (noindex):        ${pad(b5.length)} pages`);
  console.log(`Total: ${scored.length} pages`);
  console.log("");
  console.log("Top 10 priority pages:");
  scored.slice(0, 10).forEach((p, i) => {
    console.log(`${String(i + 1).padStart(2)}. ${p.url.padEnd(42)} [score: ${p.totalScore}]`);
  });
  console.log("");
  console.log(`Reports written to scripts/output/ (priority-report.json/.md, noindex-candidates.txt)`);
}

main();
