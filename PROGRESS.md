# wowtbcarena.com — build progress

Tracking the large feature/bug spec. Update as work lands so any session can resume.
Legend: ✅ done · 🚧 in progress · ⬜ not started

## 0. Critical bugs
- ✅ **0a** Canonical URL — `lib/site.ts` `SITE_URL` default now `https://wowtbcarena.com`; `.env.example` documents apex-domain requirement. metadataBase + all relative canonicals ripple.
- ✅ **0b** Unique OG per page — new `lib/seo.ts` `buildMetadata()` emits complete `openGraph`+`twitter` (Next does not deep-merge them). Applied to `/[class]`, `/[class]/[spec]/pvp`, `/pvp/[season]`, `/pve/[phase]`. New per-class OG image route `app/[class]/opengraph-image.tsx`.
- ✅ **0c** Dual-item (raid piece) bug — `lib/item-flags.ts` (`isPveOnly`), amber warning badge in `GearGrid` on PvP pages when a raid piece tops a slot >30%. Combat Rogue data rewritten: Merciless Gladiator (S2) set now BiS for head/shoulders/chest/hands/legs; Deathmantle demoted to flagged alts; FAQ corrected. Root cause fixed in `scripts/build-bis.mjs` (re-rank so a resilience piece wins the BiS slot over a raid piece).
- ✅ **0d** Season tabs — season page renders "Coming when the season opens" placeholder (via `ComingSoon` `heading`/`description` props) instead of 404 when a season lacks data.

## 1. Navbar + logo
- ✅ Larger logo (40px), Tools▾ dropdown, mobile hamburger, active accent underline, sticky+blur.
- ✅ **UX two-door restructure:** nav is now **PvP · PvE · Guides · Tools▾**. Arena/comps + leaderboard live under PvP; raids live under PvE; BiS is split into per-spec PvP/PvE grids. New `/pvp` and `/pve` hub pages aggregate everything for each side (BiS-by-spec grid + gameplay tool cards + cross-link to the other door). Homepage hero CTAs and the two category cards now point to `/pvp` and `/pve` (were both `/classes`). `isActive` highlights the right door across all sub-pages.

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
## 5. Guide pages — ✅ (all spec guides authored)
- ✅ **5d** Best race per class (`data/bestRace.ts` → `/guides/best-race/[class]`, 9 pages).
- ✅ **5c** Professions (`data/professions.ts` → `/guides/professions` sortable hub + `/guides/professions/[profession]`, 12 pages).
- ✅ **5e** Addons (`data/addons.ts` → `/guides/addons` hub + `/guides/addons/[class]`, 9 pages, CurseForge links).
- ✅ **5b** Macros (`data/macros.ts` + client `MacroList` copy-button component, grouped by category; rendered on each `/guides/addons/[class]` page).
- ✅ Guides hub links best-race, professions, addons/macros.
- ✅ **5a** Per-spec PvP/PvE guide architecture — `data/specGuides.ts` (authored prose layer) assembled with data layers into `/guides/[class]/[spec]/[content]`: overview, strengths/weaknesses, stat priority + caps, BiS link, talent summary, **rotation**, **macros**, **addons (content-filtered)**, **best race (content)**, **best professions (content)**, common mistakes, arena comps (PvP), FAQ+schema — all clearly PvP/PvE. `/guides/[class]` hub lists every spec's PvP/PvE guide (authored → link, else "soon") + race/professions/addons. Guides hub leads with class guides; BiS pages link their spec guide. Guide pages generate ONLY where authored (no thin content).
  - **✅ ALL classes fully authored (52 spec/content guides):** Rogue, Warrior, Mage, Paladin, Hunter, Priest, Shaman, Warlock, Druid — every PvP/PvE spec combo the class matrix allows. Page + all data sections assemble the authored prose.
- ✅ Profession 1–375 leveling: `PROFESSION_LEVELING` in `data/professions.ts` (tiered skill range → craft/gather → materials) for all 12 professions, rendered as a table on each profession page.
- ✅ **Icon-backed material lists:** `scripts/resolve-items.mjs` resolved 62 real Wowhead material ids into `data/items.json`; craftable professions carry per-tier `mats` (item id + approx qty) rendered as `ItemLink` icons with quantities on the profession page (falls back to text for gatherers).
## 6. Raids + boss strats — ✅ (all phases 1-5 authored)
- ✅ Route tree: `/raids` hub → `/raids/[phase]` → `/raids/[phase]/[raid]` → `/raids/[phase]/[raid]/[boss]`.
- ✅ `data/raids.ts`: **Phase 1** — Karazhan (9), Gruul's Lair (2), Magtheridon's Lair (1); **Phase 2** — Serpentshrine Cavern (6: Hydross, Lurker, Leotheras, Karathress, Morogrim, **Lady Vashj**), Tempest Keep (4: Al'ar, Void Reaver, Solarian, **Kael'thas**). Role-organized strategies, phases, common mistakes.
- ✅ Original `BossPositionDiagram` SVG (Gruul, Aran, Magtheridon, Maulgar, Prince, Moroes, **Vashj, Kael'thas**; generic fallback).
- ✅ Boss pages: HowTo + breadcrumb JSON-LD, role notes, loot (ItemLink), next-boss nav. "Raids" added to navbar; routes in sitemap.
- ✅ **Phases 3-5 authored** — Mount Hyjal (5), Black Temple (9), Zul'Aman (6), Sunwell Plateau (6). All 4 raids + 26 bosses role-organized (tank/healer/dps), phase steps, common mistakes, in site voice. `/raids` hub + sitemap auto-pick-up; no more "coming soon". **Every TBC raid is now covered (phases 1-5).**
- ✅ **Boss position diagrams** for the marquee encounters: Illidan, Archimonde, Brutallus, M'uru, Kil'jaeden (+ earlier Gruul/Aran/Mag/Maulgar/Prince/Moroes/Vashj/Kael'thas; generic fallback for the rest).
- ✅ **Raid imagery** — every boss carries a hand-picked, CDN-verified thematic icon (`bossIcon()` in `data/raids.ts`, 48 bosses; `scripts/resolve-boss-icons.mjs` is a verifier that fails on any 404). Icons render on boss-list rows, phase-hub chips, and the boss page hero. Each raid gets its own hero background via `raidBackground()`.

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
