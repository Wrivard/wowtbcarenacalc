// Recommended talent builds per class/spec.
//
// Two sources, merged by getBuild():
//   1. Hand-curated builds below (rank maps keyed by talent id, resolved
//      and validated at page build — a typo fails `pnpm build`).
//   2. data/builds-generated.json — wowsims preset builds + curated
//      standard builds, generated and validated by
//      scripts/build-talent-builds.mjs. Their page blurbs live in
//      data/talent-blurbs.ts; their FAQs are generated from the build's
//      own numbers at render time.

import generated from "@/data/builds-generated.json";
import { TALENT_BLURBS } from "@/data/talent-blurbs";

export interface RecommendedBuild {
  classSlug: string;
  specSlug: string;
  /** ranks per talent id, per tree index 0..2 (hand-curated builds) */
  ranks?: Record<string, number>[];
  /** pre-encoded digit string (generated builds) */
  encoded?: string;
  updatedAt: string;
  summaryLabel: string; // e.g. "0/5/56"
  blurb: string;
  /** attribution line for generated builds */
  source?: string;
  notes: { talentId: string; treeIndex: number; note: string }[];
  faq?: { question: string; answer: string }[];
}

export const BUILDS: RecommendedBuild[] = [
  {
    classSlug: "shaman",
    specSlug: "restoration",
    updatedAt: "2026-07-01",
    summaryLabel: "0/5/56",
    ranks: [
      {},
      { ancestralKnowledge: 5 },
      {
        "improved-healing-wave": 5,
        "tidal-focus": 5,
        "ancestral-healing": 3,
        totemicFocus: 5,
        naturesGuidance: 3,
        "healing-focus": 5,
        "totemic-mastery": 1,
        "healing-grace": 3,
        restorativeTotems: 5,
        tidalMastery: 5,
        naturesSwiftness: 1,
        "focused-mind": 3,
        purification: 5,
        "mana-tide-totem": 1,
        naturesBlessing: 3,
        "improved-chain-heal": 2,
        "earth-shield": 1,
      },
    ],
    blurb: "The standard 0/5/56 arena build for Restoration Shaman. Everything funnels into Restoration: Earth Shield is the whole reason the spec dominates 5v5, Nature's Swiftness turns a kill window into a full Healing Wave, and the three PvP-defining utility talents — Healing Focus (pushback), Focused Mind (silence/interrupt duration), and Healing Grace (30% dispel resistance on Earth Shield at max rank) — are all non-negotiable against competent teams. The five leftover points go to Ancestral Knowledge in Enhancement for a flat 5% mana pool, which outperforms anything else you can buy with five points.",
    notes: [
      {
        talentId: "healing-grace",
        treeIndex: 2,
        note: "The hidden star of the build: 30% dispel resistance keeps Earth Shield on your kill target through priest/shaman dispel pressure.",
      },
      {
        talentId: "focused-mind",
        treeIndex: 2,
        note: "30% shorter silences and interrupts — directly counters the kick/counterspell rotations every team aims at you.",
      },
      {
        talentId: "naturesSwiftness",
        treeIndex: 2,
        note: "Macro it with Healing Wave. This is your answer to swap pressure; using it proactively at 60% HP beats using it reactively at 20%.",
      },
      {
        talentId: "earth-shield",
        treeIndex: 2,
        note: "Keep it rolling on the training-dummy target at all times; the knockback protection is as valuable as the healing.",
      },
      {
        talentId: "improved-chain-heal",
        treeIndex: 2,
        note: "The last two flex points. Swap into Nature's Guardian if you face heavy warrior/hunter swap comps.",
      },
    ],
    faq: [
      {
        question: "Why not put points in Elemental for Nature's Guidance hit?",
        answer: "Nature's Guidance sits in the Restoration tree in TBC and this build already takes it (3/3) — the 2% hit helps Earth Shock juking and Wind Shear-style purge trades, and the tree reaches it without sacrificing anything.",
      },
      {
        question: "Is Ancestral Healing worth 3 points for PvP?",
        answer: "It is a filler tier-2 requirement more than a goal: the armor buff is minor in arena, but you must spend points on tier 2 to descend, and its uptime against melee cleaves is near-permanent.",
      },
      {
        question: "Can I drop Improved Chain Heal in 2v2?",
        answer: "Yes — in 2v2 you cast Chain Heal far less. Nature's Guardian (2/5) is the usual swap for the extra survivability against double-DPS openers.",
      },
      {
        question: "Does this build work for battlegrounds and world PvP?",
        answer: "Completely. The same utility talents that win arenas (dispel resistance, interrupt reduction, NS) are what keep you alive in a battleground team fight.",
      },
      {
        question: "What's the leveling order if I'm respeccing at 70?",
        answer: "There is no order at 70 — but if you are leveling as resto, fill Tidal Focus and Improved Healing Wave first, take Nature's Swiftness the moment tier 5 opens, and leave the Enhancement points for last.",
      },
    ],
  },
];

export function getBuild(
  classSlug: string,
  specSlug: string,
): RecommendedBuild | null {
  const hand = BUILDS.find(
    (b) => b.classSlug === classSlug && b.specSlug === specSlug,
  );
  if (hand) return hand;
  const gen = (
    generated as {
      classSlug: string;
      specSlug: string;
      encoded: string;
      summaryLabel: string;
      source: string;
      updatedAt: string;
    }[]
  ).find((b) => b.classSlug === classSlug && b.specSlug === specSlug);
  if (!gen) return null;
  const blurb = TALENT_BLURBS[`${classSlug}/${specSlug}`];
  if (!blurb) return null; // no editorial → treat as unfilled
  return {
    classSlug: gen.classSlug,
    specSlug: gen.specSlug,
    encoded: gen.encoded,
    summaryLabel: gen.summaryLabel,
    updatedAt: gen.updatedAt,
    source: gen.source,
    blurb,
    notes: [],
  };
}
