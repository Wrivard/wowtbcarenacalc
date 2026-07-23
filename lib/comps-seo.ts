// SEO landing-page helpers for arena comps. The interactive hub at
// /arena/comps filters via query params (canonical to the hub), but query
// combos can't rank on their own — so the high-intent facets people actually
// search ("best 2v2 comps", "best shaman arena comps", "best shaman 2v2
// comp", "best rogue mage comps") get real static pages with unique
// titles/H1/intro, generated from the same COMPS data. This module is the
// single source for which facet pages exist, their filtered comp lists, and
// their copy.
//
// A facet's class dimension is a SET of one or more classes encoded in the URL
// as alphabetically-sorted, hyphen-joined slugs ("rogue-shaman"). One class is
// the original single-class facet; two or three form a "combo" facet whose
// comp list is AND-filtered (every selected class must appear in the comp).
// Class slugs are all single words, so the hyphen join is unambiguous.

import { COMPS, TIER_ORDER, type ArenaComp, type Bracket } from "@/data/comps";
import { CLASSES, getClass } from "@/lib/classes";

export const BRACKETS: Bracket[] = ["2s", "3s", "5s"];
export const BRACKET_LABEL: Record<Bracket, string> = {
  "2s": "2v2",
  "3s": "3v3",
  "5s": "5v5",
};

// Largest class-combo we build a static page for. Pairs + triples. Bumping
// this to 4/5 is the only change needed to open up wider combos (5s comps
// have up to 5 distinct classes); every enumerator below respects it.
export const MAX_COMBO_SIZE = 3;

export function isBracket(x: string): x is Bracket {
  return (BRACKETS as string[]).includes(x);
}

const CLASS_SLUGS = new Set(CLASSES.map((c) => c.slug));
export function isClassSlug(x: string): boolean {
  return CLASS_SLUGS.has(x);
}

/**
 * Parse the `[class]` URL segment, which encodes one class ("shaman") or a
 * combo ("rogue-shaman"). Returns the validated, de-duped, alphabetically
 * sorted class list, or null if the segment isn't a canonical class set:
 * unknown slug, duplicate, out-of-order, or more than MAX_COMBO_SIZE classes.
 * Rejecting non-canonical spellings keeps one URL per set (no /rogue-shaman
 * AND /shaman-rogue both resolving).
 */
export function parseClasses(segment: string): string[] | null {
  const parts = segment.split("-");
  if (parts.length === 0 || parts.length > MAX_COMBO_SIZE) return null;
  if (!parts.every(isClassSlug)) return null;
  if (new Set(parts).size !== parts.length) return null; // no repeats
  const sorted = [...parts].sort();
  if (sorted.some((s, i) => s !== parts[i])) return null; // must be pre-sorted
  return sorted;
}

/** Canonical URL segment for a class set — alphabetical, hyphen-joined. */
export function comboSlug(classSlugs: string[]): string {
  return [...classSlugs].sort().join("-");
}

/** Comps for a facet, tier-sorted (S→C, then alphabetical). When multiple
 *  classes are given the filter is AND: the comp must field all of them. */
export function compsFor({
  bracket,
  classSlugs,
}: {
  bracket?: Bracket;
  classSlugs?: string[];
}): ArenaComp[] {
  return COMPS.filter(
    (c) =>
      (!bracket || c.bracket === bracket) &&
      (!classSlugs ||
        classSlugs.every((cs) => c.members.some((m) => m.class === cs))),
  ).sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.name.localeCompare(b.name),
  );
}

/** Brackets in which a class appears in at least one comp. */
export function bracketsForClass(classSlug: string): Bracket[] {
  return BRACKETS.filter(
    (b) => compsFor({ bracket: b, classSlugs: [classSlug] }).length > 0,
  );
}

/** Classes that appear in at least one comp of a bracket. */
export function classesInBracket(bracket: Bracket): typeof CLASSES {
  return CLASSES.filter(
    (c) => compsFor({ bracket, classSlugs: [c.slug] }).length > 0,
  );
}

/** k-sized combinations of `arr` (input assumed sorted → output stays sorted). */
function combinations<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  if (k > arr.length) return [];
  const [head, ...rest] = arr;
  return [
    ...combinations(rest, k - 1).map((c) => [head, ...c]),
    ...combinations(rest, k),
  ];
}

/**
 * Every co-occurring class combo (size 2..MAX_COMBO_SIZE) that has at least one
 * comp — scoped to a bracket when given, else across all brackets. Returned
 * combos are alphabetically sorted and de-duped. This is the source of truth
 * for combo generateStaticParams and the sitemap, so no thin/empty combo page
 * is ever generated.
 */
export function classCombos(bracket?: Bracket): string[][] {
  const scope = bracket ? COMPS.filter((c) => c.bracket === bracket) : COMPS;
  const seen = new Map<string, string[]>();
  for (const comp of scope) {
    const classes = [...new Set(comp.members.map((m) => m.class))].sort();
    const max = Math.min(MAX_COMBO_SIZE, classes.length);
    for (let size = 2; size <= max; size++) {
      for (const combo of combinations(classes, size)) {
        seen.set(combo.join("-"), combo);
      }
    }
  }
  return [...seen.values()];
}

/** Clean path for a facet — the canonical, indexable URL. `classSlugs` may be
 *  one class or a combo; it is always canonicalized to sorted order. */
export function facetPath(bracket?: Bracket, classSlugs?: string[]): string {
  const cls = classSlugs && classSlugs.length ? comboSlug(classSlugs) : undefined;
  if (bracket && cls) return `/arena/comps/${bracket}/class/${cls}`;
  if (bracket) return `/arena/comps/${bracket}`;
  if (cls) return `/arena/comps/class/${cls}`;
  return "/arena/comps";
}

/** Human class list for copy: "Rogue", "Rogue & Shaman", "Rogue, Mage & Priest". */
export function classLabel(classSlugs: string[]): string {
  const names = classSlugs.map((s) => getClass(s)?.name ?? s);
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

export interface FacetCopy {
  title: string;
  description: string;
  h1: string;
  intro: string;
}

/** Unique copy for any facet combination, including the bare hub. */
export function facetCopy(bracket?: Bracket, classSlugs?: string[]): FacetCopy {
  const cls = classSlugs && classSlugs.length ? classSlugs : undefined;
  if (bracket && cls)
    return cls.length === 1
      ? bracketClassCopy(bracket, cls[0])
      : bracketComboCopy(bracket, cls);
  if (bracket) return bracketCopy(bracket);
  if (cls) return cls.length === 1 ? classCopy(cls[0]) : comboCopy(cls);
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

/** Copy for a class combo across all brackets, e.g. Rogue & Shaman. */
export function comboCopy(classSlugs: string[]): FacetCopy {
  const label = classLabel(classSlugs);
  return {
    title: `Best ${label} Arena Comps — TBC Classic Tier List`,
    description: `The best TBC Classic arena comps that pair ${label} together, across 2v2, 3v3 and 5v5. Ranked by tier with win conditions, counters and how to play each setup.`,
    h1: `Best ${label} Comps`,
    intro: `Every viable TBC Classic arena comp that fields ${label} on the same team, across all brackets, ranked by tier for Season 2. Pick a bracket below to narrow it to a specific bracket, or open any comp for its full game plan.`,
  };
}

/** Copy for a class combo inside one bracket, e.g. Rogue & Shaman in 5v5. */
export function bracketComboCopy(bracket: Bracket, classSlugs: string[]): FacetCopy {
  const b = BRACKET_LABEL[bracket];
  const label = classLabel(classSlugs);
  return {
    title: `Best ${label} ${b} Comps — TBC Classic Arena`,
    description: `The best TBC Classic ${b} arena comps that pair ${label} together in Season 2, ranked by tier — with win conditions, counters and how to play each setup.`,
    h1: `Best ${label} Comps in ${b}`,
    intro: `The top ${b} (${bracket}) arena comps that field ${label} on the same team in TBC Classic, ranked by tier for Season 2. Each links to a full guide covering the kill setup, cooldowns, positioning and matchups.`,
  };
}
