"use client";

// Inline stat-cap calculator. Client-side only: the player types their
// current rating for each numeric cap and sees how far they are from the
// recommended target. No backend, no persistence — a quick gut-check.

import { useState } from "react";
import type { StatCap } from "@/data/caps";

type NumericCap = StatCap & { cap: number };

export function StatCapCalculator({
  caps,
  content,
  className,
}: {
  caps: StatCap[];
  content: "pvp" | "pve";
  className?: string;
}) {
  // Only caps with a real numeric target are actionable here.
  const numeric = caps.filter((c): c is NumericCap => c.cap > 0);
  const [values, setValues] = useState<Record<string, string>>({});

  if (numeric.length === 0) return null;

  return (
    <section
      className={className}
      aria-label={`${content === "pvp" ? "Arena" : "Raid"} stat cap calculator`}
    >
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        Are you capped? {content === "pvp" ? "Arena" : "Raid"} check
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        Enter your current rating from the character sheet to see the gap to
        each target.
      </p>
      <div className="mt-3 space-y-2">
        {numeric.map((c) => {
          const raw = values[c.stat] ?? "";
          const current = raw === "" ? null : Number(raw);
          const valid = current !== null && Number.isFinite(current);
          const gap = valid ? c.cap - current : null;
          const capped = gap !== null && gap <= 0;
          return (
            <div
              key={c.stat}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-border bg-surface px-4 py-3"
            >
              <label className="min-w-0 flex-1 text-sm text-foreground">
                {c.stat}
                <span className="ml-2 font-mono text-xs text-muted">
                  target {c.cap} {c.unit}
                </span>
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={raw}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [c.stat]: e.target.value }))
                }
                aria-label={`Your current ${c.stat}`}
                placeholder="0"
                className="w-24 rounded-lg border border-border bg-background px-2.5 py-1.5 text-right font-mono text-sm text-foreground tabular-nums outline-none focus:border-accent/60"
              />
              <span
                className={`w-28 shrink-0 text-right font-mono text-xs tabular-nums ${
                  !valid
                    ? "text-muted"
                    : capped
                      ? "text-accent"
                      : "text-muted-strong"
                }`}
              >
                {!valid
                  ? "—"
                  : capped
                    ? "capped ✓"
                    : `${gap} ${c.unit} to go`}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
