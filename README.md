# TBC Arena Points Calculator

Production-ready, SEO-optimized single-page calculator for **WoW: The Burning
Crusade Classic (Anniversary)** arena points. 100% client-side — no backend,
no database. Built with Next.js (App Router), Tailwind CSS, and Radix
primitives, styled after the Vercel/Supabase dashboard aesthetic.

**Features**

- **Points calculator** — 2v2 / 3v3 / 5v5 team rating → weekly arena points,
  with the highest-earning bracket highlighted (points don't stack).
- **Required rating lookup** — inverse of the formula: desired points →
  required rating per bracket.
- **Gear planner (beta)** — checklist of arena vendor items, total cost, and
  estimated weeks to afford at your current earn rate.
- SEO content + JSON-LD (`WebApplication` + `FAQPage`), sitemap, robots,
  generated OG image.
- Consent-gated Google Analytics 4, Google AdSense, Vercel Analytics + Speed
  Insights (GDPR / Quebec Law 25 compliant — nothing loads before consent).
- Compliance pages: privacy policy, terms, about, contact.

**Gear + talents hub** (programmatic SEO)

- **Talent calculator** (`/talent-calculator/[class]`) — all 9 classes, 61
  points, real tier/prereq rules, shareable `?b=` build links (also
  Wowhead-compatible via "Open on Wowhead").
- **BiS pages** (`/[class]/[spec]/pvp`, `/[class]/[spec]/pve/phase-1..5`) —
  keyed off Wowhead item ids with live tooltips, usage %, gems/enchants/
  stat-priority + per-spec FAQ. Specs without curated data render noindex
  "coming soon" and stay out of the sitemap (see [lib/bis.ts](lib/bis.ts)).
- **Talent build pages** (`/[class]/[spec]/talents`) — curated builds from
  [data/builds.ts](data/builds.ts), validated against the talent rules at
  build time.
- **Talent data pipeline** — `node scripts/build-talents.mjs` regenerates
  [data/talents/](data/talents) from wowsims/tbc (structure) + the Wowhead
  tooltip API (names/icons/descriptions). Never hand-edit those JSONs.
- Note: level 70 grants **61** talent points (not 71); the calculator and
  validators use 61, matching Wowhead.

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build + type check
```

With no env vars set, ads and analytics are clean no-ops — no console
errors, nothing loads.

## Deploy to Vercel

1. Push this repo to GitHub and import it at [vercel.com/new](https://vercel.com/new)
   (framework auto-detected).
2. Set the env vars from [.env.example](.env.example) in Project Settings →
   Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` — your production domain (used for canonical
     URLs, sitemap, and JSON-LD).
   - `NEXT_PUBLIC_GA_ID` — GA4 measurement id (create a property at
     [analytics.google.com](https://analytics.google.com)).
   - `NEXT_PUBLIC_ADSENSE_CLIENT` + the three `NEXT_PUBLIC_ADSENSE_SLOT_*`
     ids — from [adsense.google.com](https://adsense.google.com) after your
     site is approved. The site ships with enough content, a privacy policy,
     and clear navigation to pass review; apply once the domain is live.
3. Enable **Vercel Analytics** and **Speed Insights** in the Vercel
   dashboard (the components are already wired, gated on cookie consent).
4. Redeploy after adding env vars (they're inlined at build time).

## Post-deploy: Google Search Console

This is where the real SEO traffic insight lives:

1. Add your domain at [search.google.com/search-console](https://search.google.com/search-console)
   and verify (DNS record is easiest on Vercel-managed domains).
2. Submit the sitemap: `https://your-domain.com/sitemap.xml`.
3. Monitor **Performance → Search results** for impressions/queries
   ("wow tbc arena points calculator", "tbc arena calculator", …) and fix
   any Coverage issues it reports.

GA4's `calculate_clicked` event (fired with ratings bucketed to the nearest
100 plus the awarded bracket) measures engagement quality beyond pageviews.

## Formula validation caveat ⚠️

[lib/arena.ts](lib/arena.ts) is the **single source of truth** for all
constants. The source site this formula was taken from displays the formula
but publishes a quick-reference table that does *not* match it (~1295 pts @
1500 in 5v5 vs ~1111 from the formula; divergence grows with rating). The
formula is implemented as canonical; `finalMultiplier` is the prime suspect
if you re-tune against real in-game values (≈1.75 fits their table). The
on-page reference table is *generated from the code*, so calculator and
table always agree. If in-game numbers diverge, tune the constants in that
one file — everything else follows.

## Gear data TODO

[data/gear.ts](data/gear.ts) ships with representative S1 placeholder items.
Before promoting the gear planner past "beta", fill it from Wowhead's TBC
Classic S1–S4 arena vendor data (all slots, costs, rating requirements).
