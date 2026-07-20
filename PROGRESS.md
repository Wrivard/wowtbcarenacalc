# wowtbcarena.com — build progress

Tracking the large feature/bug spec. Update as work lands so any session can resume.
Legend: ✅ done · 🚧 in progress · ⬜ not started

## 0. Critical bugs
- ✅ **0a** Canonical URL — `lib/site.ts` `SITE_URL` default now `https://wowtbcarena.com`; `.env.example` documents apex-domain requirement. metadataBase + all relative canonicals ripple.
- ✅ **0b** Unique OG per page — new `lib/seo.ts` `buildMetadata()` emits complete `openGraph`+`twitter` (Next does not deep-merge them). Applied to `/[class]`, `/[class]/[spec]/pvp`, `/pvp/[season]`, `/pve/[phase]`. New per-class OG image route `app/[class]/opengraph-image.tsx`.
- ✅ **0c** Dual-item (raid piece) bug — `lib/item-flags.ts` (`isPveOnly`), amber warning badge in `GearGrid` on PvP pages when a raid piece tops a slot >30%. Combat Rogue data rewritten: Merciless Gladiator (S2) set now BiS for head/shoulders/chest/hands/legs; Deathmantle demoted to flagged alts; FAQ corrected. Root cause fixed in `scripts/build-bis.mjs` (re-rank so a resilience piece wins the BiS slot over a raid piece).
- ✅ **0d** Season tabs — season page renders "Coming when the season opens" placeholder (via `ComingSoon` `heading`/`description` props) instead of 404 when a season lacks data.

## 1. Navbar + logo
- ✅ Larger logo (40px), BiS / Guides / Arena / Leaderboard / Tools▾ dropdown, mobile hamburger, active accent underline, sticky+blur. Noindex hub placeholders for /arena, /guides, /leaderboard so nav never 404s.

## 4. BiS page expansions — ✅ (data-driven, archetype-based; covers all specs)
- ✅ **4a** Stat caps table (`data/caps.ts` by class+role+content → `components/bis/StatCaps.tsx`) below stat priority.
- ✅ **4b** Item "How to get" on slot expand (`data/itemSources.ts` seeded + `GearGrid` MapPin line; graceful when absent). Seed list, grows over time.
- ✅ **4c** Talent summary + tree bar (`components/bis/TalentSummary.tsx` from existing `getBuild`), links to talents page + calculator.
- ✅ **4d** "What to buy first" checklist (`data/gearPriority.ts` → `components/bis/GearPriorityList.tsx`).

## 2. Arena comps — ✅
- ✅ `data/comps.ts` — 22 real TBC S2 comps (10× 2s, 8× 3s, 3× 5s archetypes) with full guides (overview, win condition, cooldown timeline, positioning, counters, tips, gear reqs).
- ✅ `/arena/comps` filterable browser (bracket/tier/playstyle/class/difficulty/sort, URL-param driven, server-rendered → shareable+indexable).
- ✅ `/arena/comps/[bracket]/[slug]` static guide pages: hero (tier/style/difficulty/icons), strengths/weaknesses, timeline, vs-meta, gear, tips, per-member BiS+talent cross-links, arena-points CTA, AdUnits, FAQ+breadcrumb JSON-LD.
- ✅ `/arena` hub upgraded to real page (top comps per bracket + links). Comp routes in sitemap.
- Components: `components/arena/CompBits.tsx` (TierBadge, DifficultyPips, PlaystyleTag, CompIcons, CompCard).

## 3. Live leaderboard — 🚧 (UI + cron scaffold done; live feed pending user decision)
- ✅ `data/leaderboard.ts`: schema + Season 2 cutoffs (Glad/Duelist/Rival/Challenger) per bracket + **clearly-labeled SAMPLE snapshots** (`isSample: true`).
- ✅ `/leaderboard`: bracket tabs, cutoff banner, class-colored team table (rank/players/rating/W-L/win%/realm), faction+class filters, pagination (25/50/100), all URL-param driven; Dataset JSON-LD; "sample data" banner; ISR `revalidate=3600`.
- ✅ **Live feed wired to the official Battle.net PvP Season API** (`lib/blizzard.ts`) — the ToS-clean source (not scraping a third party). Env-gated OAuth client-credentials + leaderboard fetch + percentile cutoff computation; page prefers live, falls back to sample. `/api/leaderboard/sync` now probes the live feed (health check); `vercel.json` cron every 6h. `.env.example` documents the vars.
- ⬜ **To go live (user action):** register a client at develop.battle.net and set `BLIZZARD_CLIENT_ID/SECRET`, `BLIZZARD_REGION`, `BLIZZARD_PVP_NAMESPACE`, `BLIZZARD_PVP_SEASON_ID` (verify namespace/season via `/data/wow/pvp-season/index`). Note: official leaderboard lacks class/spec + team comps — those need per-character enrichment (a follow-up).
## 5. Guide pages — 🚧 (5a remaining)
- ✅ **5d** Best race per class (`data/bestRace.ts` → `/guides/best-race/[class]`, 9 pages).
- ✅ **5c** Professions (`data/professions.ts` → `/guides/professions` sortable hub + `/guides/professions/[profession]`, 12 pages).
- ✅ **5e** Addons (`data/addons.ts` → `/guides/addons` hub + `/guides/addons/[class]`, 9 pages, CurseForge links).
- ✅ **5b** Macros (`data/macros.ts` + client `MacroList` copy-button component, grouped by category; rendered on each `/guides/addons/[class]` page).
- ✅ Guides hub links best-race, professions, addons/macros.
- ⬜ **5a** Per-spec PvP/PvE MDX guides (the big content build — 28 specs × 2, ≥800 words each).
## 6. Raids + boss strats — 🚧 (Phase 1 done; phases 2-5 pending)
- ✅ Route tree: `/raids` hub → `/raids/[phase]` → `/raids/[phase]/[raid]` → `/raids/[phase]/[raid]/[boss]`.
- ✅ `data/raids.ts`: Phase 1 fully populated — Karazhan (9 bosses), Gruul's Lair (2), Magtheridon's Lair (1) with role-organized strategies, phases, common mistakes, loot.
- ✅ Original `BossPositionDiagram` SVG component (Gruul, Aran, Magtheridon, Maulgar, Prince, Moroes layouts; generic fallback).
- ✅ Boss pages: HowTo + breadcrumb JSON-LD, role notes, loot (ItemLink), next-boss nav. "Raids" added to navbar; routes in sitemap.
- ✅ Empty phases (2-5) show "coming soon" (noindex), never 404.
- ⬜ Populate phases 2-5 (SSC, TK, Hyjal, BT, ZA, Sunwell) + SVG diagrams for Illidan/Kael'thas/M'uru/Brutallus.

## 8. SEO site-wide — 🚧 (mostly done)
- ✅ **8a** Removed the site-wide `<meta name="keywords">` (noise); ranking lives in unique per-page titles/descriptions/H1s (already unique via `buildMetadata`).
- ✅ **8c** Organization + WebSite JSON-LD in root layout. (SearchAction deferred — needs a real search page; not adding a fake endpoint.)
- ✅ **8d** Sitemap expanded throughout (comps, guides, raids, best-race, professions, addons): **363 indexable URLs** now; crosses 400 once per-spec guides (5a) + raid phases 2-5 land. No query-param padding.
- ✅ **8b** New keyword targets covered by the new page titles/H1s (comps, leaderboard, guides, raids, best-race, professions, addons).

## 9. Performance pass — ⬜ (new pages are static/server-rendered; Lighthouse audit pending)

## 7. Interlinking system — 🚧 (core built)
- ✅ `lib/interlinks.ts`: `compsForClass()` + `guidesForClass()` — the class→comps/guides link graph.
- ✅ `SpecCrossLinks` (on every BiS page) now also links best-race, addons/macros, and the arena comps featuring that class. Reverse links already exist (comp guides → BiS/talents, raid loot → item tooltips).
- ⬜ Full "Related content" sidebar on raid/guide pages; profession→BiS crafted-item links.

## Notes for resuming
- Data: BiS lists are JSON in `data/bis/*.json`, registered in `data/bis/index.ts` (auto-generated by `scripts/build-bis.mjs`). Item meta in `data/items.json`.
- Class/spec matrix: `lib/classes.ts`. Metadata helper: `lib/seo.ts` (use for every new page).
- Aesthetic: dark Vercel; accent `#00e599`; tokens in `app/globals.css`.
- Remote: https://github.com/Wrivard/wowtbcarenacalc
