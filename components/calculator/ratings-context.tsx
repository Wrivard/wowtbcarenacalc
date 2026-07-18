"use client";

// Shared ratings state: the points calculator writes it, the gear
// planner reads the resulting points-per-week to estimate weeks to
// afford a selection. Pure client state — nothing persists.

import { createContext, useContext, useMemo, useState } from "react";
import {
  BRACKETS,
  bracketPoints,
  clampRating,
  type Bracket,
} from "@/lib/arena";

export type RatingInputs = Record<Bracket, string>;

export interface BracketResult {
  bracket: Bracket;
  rating: number | null; // null = no input
  points: number | null;
}

interface RatingsContextValue {
  inputs: RatingInputs;
  setInput: (bracket: Bracket, value: string) => void;
  results: BracketResult[];
  best: BracketResult | null; // highest-earning eligible bracket
}

const RatingsContext = createContext<RatingsContextValue | null>(null);

export function parseRating(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n)) return null;
  return clampRating(n);
}

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const [inputs, setInputs] = useState<RatingInputs>({
    "2v2": "",
    "3v3": "",
    "5v5": "",
  });

  const value = useMemo<RatingsContextValue>(() => {
    const results: BracketResult[] = BRACKETS.map((bracket) => {
      const rating = parseRating(inputs[bracket]);
      return {
        bracket,
        rating,
        points: rating === null ? null : bracketPoints(rating, bracket),
      };
    });
    const best = results.reduce<BracketResult | null>(
      (acc, r) =>
        r.points !== null && (acc === null || r.points > (acc.points ?? 0))
          ? r
          : acc,
      null,
    );
    return {
      inputs,
      setInput: (bracket, v) => setInputs((prev) => ({ ...prev, [bracket]: v })),
      results,
      best,
    };
  }, [inputs]);

  return (
    <RatingsContext.Provider value={value}>{children}</RatingsContext.Provider>
  );
}

export function useRatings() {
  const ctx = useContext(RatingsContext);
  if (!ctx) throw new Error("useRatings must be used within RatingsProvider");
  return ctx;
}
