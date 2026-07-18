// lib/arena.ts — SINGLE SOURCE OF TRUTH for all calc constants.
// ⚠️ VALIDATION NOTE (read this): The source site displays this formula
// but its own "quick reference" table does NOT match it (table shows
// ~1295 pts @1500 in 5v5; this formula yields ~1111). Numbers diverge
// further at higher ratings. Implement the formula as the canonical
// logic, but keep every constant here so it can be tuned in seconds
// after validating against real in-game values.

export const FORMULA = {
  ceiling: 1651.94, // upper asymptote numerator term
  floor: 475, // additive floor
  steepness: 2_500_000, // e-term coefficient
  decay: 0.009, // rating decay rate
  finalMultiplier: 1.5, // <- prime suspect if you re-tune vs table (≈1.75 fits their table)
} as const;

export const BRACKET_MULTIPLIERS = {
  "2v2": 0.76,
  "3v3": 0.88,
  "5v5": 1.0,
} as const;

export type Bracket = keyof typeof BRACKET_MULTIPLIERS;

export const BRACKETS = Object.keys(BRACKET_MULTIPLIERS) as Bracket[];

export const RATING_MIN = 0;
export const RATING_MAX = 3500;

export function clampRating(rating: number): number {
  if (!Number.isFinite(rating)) return RATING_MIN;
  return Math.min(RATING_MAX, Math.max(RATING_MIN, rating));
}

// Base points for a given team rating (before bracket multiplier)
export function basePoints(rating: number): number {
  const { ceiling, floor, steepness, decay, finalMultiplier } = FORMULA;
  const p =
    ((ceiling - floor) / (1 + steepness * Math.exp(-decay * rating)) + floor) *
    finalMultiplier;
  return p;
}

// Points for a specific bracket at a given rating
export function bracketPoints(rating: number, bracket: Bracket): number {
  return Math.round(basePoints(clampRating(rating)) * BRACKET_MULTIPLIERS[bracket]);
}

// Theoretical max points per bracket (rating -> infinity), for clamping/UX.
// As r→∞ the e-term vanishes: base → ((ceiling - floor) + floor) × finalMultiplier
// = ceiling × finalMultiplier. This must agree with requiredRating's
// "unachievable" cutoff or the UI contradicts itself.
export function maxPoints(bracket: Bracket): number {
  const { ceiling, finalMultiplier } = FORMULA;
  return Math.round(ceiling * finalMultiplier * BRACKET_MULTIPLIERS[bracket]);
}

// Inverse: given desired AWARDED points in a bracket, return required rating.
export function requiredRating(
  desiredPoints: number,
  bracket: Bracket,
): number | null {
  const { ceiling, floor, steepness, decay, finalMultiplier } = FORMULA;
  const mult = BRACKET_MULTIPLIERS[bracket];
  const targetBase = desiredPoints / mult; // undo bracket multiplier
  const A = targetBase / finalMultiplier - floor; // undo final multiplier + floor
  if (A <= 0) return 0; // achievable at any rating
  const inner = ((ceiling - floor) / A - 1) / steepness;
  if (inner <= 0) return null; // beyond bracket ceiling → unachievable
  const r = -(1 / decay) * Math.log(inner);
  return Math.round(r);
}

// Quick-reference table rows, generated from the formula above so the
// on-page table and the live calculator can never disagree.
export const REFERENCE_RATINGS = [
  1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200,
] as const;

export function referenceTable() {
  return REFERENCE_RATINGS.map((rating) => ({
    rating,
    "2v2": bracketPoints(rating, "2v2"),
    "3v3": bracketPoints(rating, "3v3"),
    "5v5": bracketPoints(rating, "5v5"),
  }));
}
