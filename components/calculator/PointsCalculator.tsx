"use client";

// Core feature 1: live arena points calculation across the three
// brackets. Computation is instant; the GA4 "calculate_clicked" event
// is debounced so a typing session emits one event, with ratings
// bucketed to the nearest 100.

import { useEffect, useRef } from "react";
import { BRACKETS, BRACKET_MULTIPLIERS, RATING_MAX } from "@/lib/arena";
import { bucketRating, trackEvent } from "@/lib/gtag";
import { ResultCard } from "@/components/ResultCard";
import { useRatings } from "@/components/calculator/ratings-context";

export function PointsCalculator() {
  const { inputs, setInput, results, best } = useRatings();
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced GA4 event: fires once per settled input state.
  useEffect(() => {
    if (!best) return;
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      trackEvent("calculate_clicked", {
        rating_2v2: results[0].rating !== null ? bucketRating(results[0].rating) : undefined,
        rating_3v3: results[1].rating !== null ? bucketRating(results[1].rating) : undefined,
        rating_5v5: results[2].rating !== null ? bucketRating(results[2].rating) : undefined,
        awarded_bracket: best.bracket,
        awarded_points: best.points !== null ? bucketRating(best.points) : undefined,
      });
    }, 1200);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [inputs, best, results]);

  return (
    <div>
      {/* Rating inputs */}
      <div className="grid gap-3 sm:grid-cols-3">
        {BRACKETS.map((bracket) => (
          <div key={bracket}>
            <label
              htmlFor={`rating-${bracket}`}
              className="flex items-baseline justify-between"
            >
              <span className="text-sm font-medium text-muted-strong">
                {bracket} rating
              </span>
              <span className="font-mono text-[11px] text-muted">
                {bracket.toUpperCase()} ×{BRACKET_MULTIPLIERS[bracket].toFixed(2)}
              </span>
            </label>
            <input
              id={`rating-${bracket}`}
              type="number"
              inputMode="numeric"
              min={0}
              max={RATING_MAX}
              placeholder="e.g. 1650"
              value={inputs[bracket]}
              onChange={(e) => setInput(bracket, e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2.5 font-mono text-base tabular-nums text-foreground placeholder:text-muted/50 transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Per-bracket results */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {results.map((r) => (
          <ResultCard
            key={r.bracket}
            label={`${r.bracket} points`}
            value={r.points}
            highlighted={best !== null && r.bracket === best.bracket}
            context={
              r.points === null
                ? "Enter a rating"
                : best !== null && r.bracket === best.bracket
                  ? "Highest-earning bracket"
                  : undefined
            }
          />
        ))}
      </div>

      {/* Awarded summary */}
      <div className="mt-6 rounded-xl border border-border bg-surface p-5 sm:p-6">
        <div className="text-[11px] font-medium tracking-widest text-muted uppercase">
          You&apos;ll be awarded
        </div>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-5xl tabular-nums text-accent sm:text-6xl">
            {best?.points?.toLocaleString("en-US") ?? "—"}
          </span>
          <span className="text-sm text-muted">
            {best
              ? `points / week, from your ${best.bracket} team`
              : "points / week"}
          </span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          Points do <strong className="text-muted-strong">not stack</strong>{" "}
          across brackets — you receive points from your single
          highest-earning team only. A bracket counts only if you played{" "}
          <strong className="text-muted-strong">10+ rated games</strong> in it
          that week.
        </p>
      </div>
    </div>
  );
}
