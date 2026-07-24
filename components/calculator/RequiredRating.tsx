"use client";

// Core feature 2: inverse lookup — desired weekly points → required
// team rating per bracket.

import { useState } from "react";
import { BRACKETS, maxPoints, requiredRating } from "@/lib/arena";
import { bucketRating } from "@/lib/gtag";
import { useSettledEvent } from "@/lib/useSettledEvent";

export function RequiredRating() {
  const [raw, setRaw] = useState("");

  const desired = (() => {
    const n = Number(raw.trim());
    if (raw.trim() === "" || !Number.isFinite(n) || n < 0) return null;
    return Math.min(n, 10_000); // sanity cap, way above any bracket ceiling
  })();

  useSettledEvent(
    "required_rating_used",
    desired === null
      ? null
      : {
          desired_points: bucketRating(desired),
          // Which brackets can actually deliver it — the interesting half of
          // the answer, and free to derive here.
          achievable_brackets: BRACKETS.filter(
            (b) => requiredRating(desired, b) !== null,
          ).length,
        },
  );

  return (
    <div>
      <label
        htmlFor="desired-points"
        className="text-sm font-medium text-muted-strong"
      >
        Desired arena points per week
      </label>
      <input
        id="desired-points"
        type="number"
        inputMode="numeric"
        min={0}
        placeholder="e.g. 1200"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2.5 font-mono text-base tabular-nums text-foreground placeholder:text-muted/50 transition-colors focus:border-accent/60 focus:ring-2 focus:ring-accent/20 focus:outline-none sm:max-w-xs"
      />

      <div className="mt-5 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-4 py-3 text-left text-[11px] font-medium tracking-widest text-muted uppercase">
                Bracket
              </th>
              <th className="px-4 py-3 text-right text-[11px] font-medium tracking-widest text-muted uppercase">
                Required team rating
              </th>
            </tr>
          </thead>
          <tbody>
            {BRACKETS.map((bracket) => {
              const rating = desired === null ? null : requiredRating(desired, bracket);
              return (
                <tr
                  key={bracket}
                  className="border-b border-border bg-surface last:border-b-0"
                >
                  <td className="px-4 py-3 font-mono text-muted-strong">
                    {bracket}
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">
                    {desired === null ? (
                      <span className="text-muted/50">—</span>
                    ) : rating === null ? (
                      <span className="text-xs text-muted">
                        Not achievable — exceeds bracket cap of{" "}
                        {maxPoints(bracket).toLocaleString("en-US")} pts
                      </span>
                    ) : (
                      <span className="text-foreground">
                        {rating.toLocaleString("en-US")}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
