// SEO landing-page helpers for arena comps. The interactive hub at
// /arena/comps filters via query params (canonical to the hub), but query
// combos can't rank on their own — so the high-intent facets people actually
// search ("best 2v2 comps", "best shaman arena comps", "best shaman 2v2
// comp") get real static pages with unique titles/H1/intro, generated from
// the same COMPS data. This module is the single source for which facet
// pages exist, their filtered comp lists, and their copy.

import { COMPS, TIER_ORDER, type ArenaComp, type Bracket } from "@/data/comps";
import { CLASSES, getClass } from "@/lib/classes";

export const BRACKETS: Bracket[] = ["2s", "3s", "5s"];
export const BRACKET_LABEL: Record<Bracket, string> = {
  "2s": "2v2",
  "3s": "3v3",
  "5s": "5v5",
};

export function isBracket(x: string): x is Bracket {
  return (BRACKETS as string[]).includes(x);
}

const CLASS_SLUGS = new Set(CLASSES.map((c) => c.slug));
export function isClassSlug(x: string): boolean {
  return CLASS_SLUGS.has(x);
}

/** Comps for a facet, tier-sorted (S→C, then alphabetical). */
export function compsFor({
  bracket,
  classSlug,
}: {
  bracket?: Bracket;
  classSlug?: string;
}): ArenaComp[] {
  return COMPS.filter(
    (c) =>
      (!bracket || c.bracket === bracket) &&
      (!classSlug || c.members.some((m) => m.class === classSlug)),
  ).sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.name.localeCompare(b.name),
  );
}

/** Brackets in which a class appears in at least one comp. */
export function bracketsForClass(classSlug: string): Bracket[] {
  return BRACKETS.filter((b) => compsFor({ bracket: b, classSlug }).length > 0);
}

/** Classes that appear in at least one comp of a bracket. */
export function classesInBracket(bracket: Bracket): typeof CLASSES {
  return CLASSES.filter((c) => compsFor({ bracket, classSlug: c.slug }).length > 0);
}

/** Clean path for a bracket/class facet — the canonical, indexable URL. */
export function facetPath(bracket?: Bracket, classSlug?: string): string {
  if (bracket && classSlug) return `/arena/comps/${bracket}/class/${classSlug}`;
  if (bracket) return `/arena/comps/${bracket}`;
  if (classSlug) return `/arena/comps/class/${classSlug}`;
  return "/arena/comps";
}

export interface FacetCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

/** Unique copy for any facet combination, including the bare hub. */
export function facetCopy(bracket?: Bracket, classSlug?: string): FacetCopy {
  if (bracket && classSlug) return bracketClassCopy(bracket, classSlug);
  if (bracket) return bracketCopy(bracket);
  if (classSlug) return classCopy(classSlug);
  return {
    title: "TBC Arena Comp Tier List — Best 2v2, 3v3 & 5v5 Comps",
    description:
      "Filterable TBC Classic arena comp tier list: the best 2s, 3s and 5s comps by tier, playstyle, class and difficulty — RMP, RLS, Warrior/Paladin and more.",
    h1: "TBC Arena Comp Tier List",
    intro:
      "Every viable 2v2, 3v3 and 5v5 comp for TBC Classic arena (Season 2), ranked by tier. Pick a bracket or class to open its own guide, or refine by playstyle and difficulty.",
  };
}

export function bracketCopy(bracket: Bracket): FacetCopy {
  const b = BRACKET_LABEL[bracket];
  return {
    title: `Best ${b} Arena Comps — TBC Classic Tier List (Season 2)`,
    description: `Every viable TBC Classic ${b} arena comp ranked by tier. The best ${bracket} setups for Season 2 with win conditions, counters and how to play each one.`,
    h1: `Best ${b} Arena Comps`,
    intro: `The strongest ${b} (${bracket}) arena compositions in TBC Classic, ranked S through C for Arena Season 2. Each comp links to a full guide with its game plan, cooldown timeline, positioning, counters and required gear. Browse by class below to narrow it to your main.`,
  };
}

export function classCopy(classSlug: string): FacetCopy {
  const name = getClass(classSlug)?.name ?? classSlug;
  return {
    title: `Best ${name} Arena Comps — TBC Classic 2v2, 3v3 & 5v5`,
    description: `The best TBC Classic arena comps that run a ${name}, across 2v2, 3v3 and 5v5. Ranked by tier with win conditions, counters and how to play each setup.`,
    h1: `Best ${name} Arena Comps`,
    intro: `Every viable TBC Classic arena comp that includes a ${name}, across all brackets, ranked by tier for Season 2. Pick a bracket below to see the best ${name} 2v2, 3v3 or 5v5 setups specifically.`,
  };
}

export function bracketClassCopy(bracket: Bracket, classSlug: string): FacetCopy {
  const b = BRACKET_LABEL[bracket];
  const name = getClass(classSlug)?.name ?? classSlug;
  return {
    title: `Best ${name} ${b} Comps — TBC Classic Arena Tier List`,
    description: `The best TBC Classic ${b} arena comps for ${name} in Season 2, ranked by tier — with win conditions, counters and how to play each ${name} ${bracket} setup.`,
    h1: `Best ${name} Comps in ${b}`,
    intro: `The top ${b} (${bracket}) arena comps that run a ${name} in TBC Classic, ranked by tier for Season 2. Each links to a full guide covering the kill setup, cooldowns, positioning and matchups.`,
  };
}
