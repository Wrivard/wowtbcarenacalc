// Generates data/contentDates.json — when each route's content last actually
// changed, for the sitemap's `lastmod`.
//
// Why this exists. lastmod used to be `new Date()` on every entry, which told
// Google the whole site changed on every deploy; cab4d25 replaced that with a
// real timestamp where one existed. But the timestamps available were the
// wrong measurement: a BiS page's `updatedAt` is the date the upstream DATA
// SNAPSHOT was taken, not the date the page changed. On 2026-07-29 the 140
// PvE pages advertised lastmod 2026-05-22 while their files had been rewritten
// that morning (ring split, enchant mats, resilience tags) — and 436 of 804
// URLs carried no lastmod at all. Google had no way to learn any of it, at the
// exact moment its crawl of the site had dropped from 137 pages a day to 4.
//
// What it measures instead: the last commit that touched the files a route's
// content is built from — its data, plus the components that decide what that
// data says. Both count. Splitting one ring row into two was a data change;
// adding the resilience tag was a component change; a reader saw both.
//
// Uncommitted files stamp today, since they are about to be committed. So the
// order is: change data -> run this -> commit both, exactly like the other
// build scripts. Re-running with nothing changed rewrites nothing.
//
// Run:  node scripts/build-content-dates.mjs

import { execFileSync } from "node:child_process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "data", "contentDates.json");
const BIS_DIR = path.join(process.cwd(), "data", "bis");

// Components that decide what a page SAYS, not how it looks. Kept explicit and
// short: every file here bumps a whole family, so a purely cosmetic edit to one
// costs real crawl signal. Anything not listed is treated as presentation.
const RENDERS = {
  bis: [
    "components/bis/BisPageBody.tsx",
    "components/bis/GearGrid.tsx",
    "components/bis/EnchantMats.tsx",
    "lib/bis.ts",
    "data/itemSources.ts",
  ],
  comps: [
    "data/comps.ts",
    "lib/comps-seo.ts",
    "components/arena/CompBrowser.tsx",
  ],
  raids: ["data/raids.ts", "data/raidRoutes.ts"],
  guides: ["data/specGuides.ts"],
  builds: ["data/builds.ts", "data/builds-generated.json"],
  classes: ["lib/classes.ts", "data/bestRace.ts", "data/rankings.ts"],
  professions: ["data/professions.ts"],
  addons: ["data/addons.ts"],
};

const dirty = new Set(
  execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" })
    .split("\n")
    .map((l) => l.slice(3).trim())
    .filter(Boolean),
);

const TODAY = new Date().toISOString().slice(0, 10);
const cache = new Map();

/** ISO date of the last commit touching a file — or today if it is staged. */
function fileDate(rel) {
  if (cache.has(rel)) return cache.get(rel);
  let d;
  if (dirty.has(rel)) {
    d = TODAY;
  } else {
    try {
      d = execFileSync("git", ["log", "-1", "--format=%cI", "--", rel], {
        encoding: "utf8",
      })
        .trim()
        .slice(0, 10);
    } catch {
      d = "";
    }
  }
  cache.set(rel, d || TODAY);
  return cache.get(rel);
}

/** Newest date across several files — the page changed when any of them did. */
const newest = (...rels) =>
  rels.flat().filter(Boolean).map(fileDate).sort().pop() ?? TODAY;

async function main() {
  const dates = {};
  const set = (p, d) => {
    if (d) dates[p] = d;
  };

  // BiS pages: one JSON per route, plus the components that render it.
  const bisFiles = (await readdir(BIS_DIR)).filter((f) => f.endsWith(".json"));
  const bisRender = newest(RENDERS.bis);
  for (const f of bisFiles) {
    const list = JSON.parse(await readFile(path.join(BIS_DIR, f), "utf8"));
    const p =
      list.content === "pve"
        ? `/${list.class}/${list.spec}/pve/phase-${list.phase}`
        : list.seasonPage
          ? `/${list.class}/${list.spec}/pvp/season-${list.season}`
          : `/${list.class}/${list.spec}/pvp`;
    set(p, newest(`data/bis/${f}`, RENDERS.bis));
  }
  // Spec hubs surface their spec's BiS, so they move with the family.
  const hubs = new Set(
    bisFiles.map((f) => {
      const [, cls, spec] = /^([a-z]+)-([a-z-]+?)-(pvp|pve)/.exec(f) ?? [];
      return cls && spec ? `/${cls}/${spec}` : null;
    }),
  );
  for (const h of hubs) if (h) set(h, bisRender);

  // Hand-written hubs and legal pages: no dataset, so the page file itself is
  // the content. /pvp matters most here — it is the hub of the family that
  // produced most of the site's clicks and Google had still never fetched it.
  const STATIC = {
    "/": "app/page.tsx",
    "/pvp": "app/pvp/page.tsx",
    "/pve": "app/pve/page.tsx",
    "/arena": "app/arena/page.tsx",
    "/arena/comps": "app/arena/comps/page.tsx",
    "/classes": "app/classes/page.tsx",
    "/guides": "app/guides/page.tsx",
    "/guides/professions": "app/guides/professions/page.tsx",
    "/guides/addons": "app/guides/addons/page.tsx",
    "/raids": "app/raids/page.tsx",
    "/talent-calculator": "app/talent-calculator/page.tsx",
    "/arena-points-calculator": "app/arena-points-calculator/page.tsx",
    "/about": "app/about/page.tsx",
    "/contact": "app/contact/page.tsx",
    "/privacy-policy": "app/privacy-policy/page.tsx",
    "/terms": "app/terms/page.tsx",
  };
  for (const [route, file] of Object.entries(STATIC)) set(route, fileDate(file));

  // Everything else keys off its own data module. Route enumeration lives in
  // app/sitemap.ts; this only has to answer "when did that family change".
  const families = {
    comps: newest(RENDERS.comps),
    raids: newest(RENDERS.raids),
    guides: newest(RENDERS.guides),
    builds: newest(RENDERS.builds),
    classes: newest(RENDERS.classes),
    professions: newest(RENDERS.professions),
    addons: newest(RENDERS.addons),
    // The nine /talent-calculator/<class> pages share one route file.
    talentCalc: newest([
      "app/talent-calculator/[class]/page.tsx",
      "components/talents/TalentCalculator.tsx",
      "lib/talents.ts",
    ]),
  };

  await writeFile(
    OUT,
    JSON.stringify({ generated: TODAY, families, routes: dates }, null, 1),
  );
  const n = Object.keys(dates).length;
  console.log(`data/contentDates.json: ${n} routes + ${Object.keys(families).length} families`);
  for (const [k, v] of Object.entries(families)) console.log(`  ${k.padEnd(12)} ${v}`);
  const spread = {};
  for (const d of Object.values(dates)) spread[d] = (spread[d] ?? 0) + 1;
  console.log("  route dates:", JSON.stringify(spread));
}

await main();
