"use client";

// One talent tree rendered on a 4-column grid by row/col, with
// prerequisite arrows, rank badges, and a CSS hover tooltip. Used
// read-only on talent build pages and interactively in the calculator.

import { Fragment } from "react";
import type { Talent, TalentTree } from "@/lib/talents";
import { gameIconUrl } from "@/components/GameIcon";
import { cn } from "@/lib/utils";

// Grid geometry (px). Icon 36 + padding; arrows are drawn from these.
const CELL = 56;
const GAP = 10;

function cellPos(row: number, col: number) {
  return { x: col * (CELL + GAP), y: row * (CELL + GAP) };
}

function PrereqArrow({ from, to }: { from: Talent; to: Talent }) {
  const a = cellPos(from.row, from.col);
  const b = cellPos(to.row, to.col);
  if (from.col === to.col) {
    // vertical arrow down
    const x = a.x + CELL / 2;
    return (
      <div
        aria-hidden
        className="absolute w-0.5 bg-accent/40"
        style={{ left: x - 1, top: a.y + CELL, height: b.y - a.y - CELL }}
      />
    );
  }
  // horizontal arrow (same row)
  const y = a.y + CELL / 2;
  const [x1, x2] =
    a.x < b.x ? [a.x + CELL, b.x] : [b.x + CELL, a.x];
  return (
    <div
      aria-hidden
      className="absolute h-0.5 bg-accent/40"
      style={{ top: y - 1, left: x1, width: x2 - x1 }}
    />
  );
}

export interface TalentInteraction {
  canAdd: (talentIndex: number) => boolean;
  canRemove: (talentIndex: number) => boolean;
  onAdd: (talentIndex: number) => void;
  onRemove: (talentIndex: number) => void;
}

export function TalentTreeGrid({
  tree,
  ranks,
  interaction,
  notes,
}: {
  tree: TalentTree;
  ranks: number[];
  interaction?: TalentInteraction;
  /** optional per-talent annotations (talent build pages) */
  notes?: Record<string, string>;
}) {
  const maxRow = Math.max(...tree.talents.map((t) => t.row));
  const width = 4 * CELL + 3 * GAP;
  const height = (maxRow + 1) * CELL + maxRow * GAP;
  const spent = ranks.reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold tracking-tight">
          {tree.treeName}
        </h3>
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            spent > 0 ? "text-accent" : "text-muted",
          )}
        >
          {spent}
        </span>
      </div>
      <div className="relative" style={{ width, height }}>
        {tree.talents.map(
          (t) =>
            t.requires && (
              <PrereqArrow
                key={`arrow-${t.id}`}
                from={
                  tree.talents.find((x) => x.id === t.requires!.talentId)!
                }
                to={t}
              />
            ),
        )}
        {tree.talents.map((talent, i) => {
          const rank = ranks[i];
          const pos = cellPos(talent.row, talent.col);
          const addable = interaction?.canAdd(i) ?? false;
          const removable = interaction?.canRemove(i) ?? false;
          const active = rank > 0;
          const locked = interaction && !addable && !active;

          return (
            <Fragment key={talent.id}>
              <div
                className="group absolute"
                style={{ left: pos.x, top: pos.y, width: CELL, height: CELL }}
              >
                <button
                  type="button"
                  disabled={!interaction || (!addable && !removable)}
                  onClick={() => {
                    if (addable) interaction?.onAdd(i);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (removable) interaction?.onRemove(i);
                  }}
                  aria-label={`${talent.name} — rank ${rank}/${talent.maxRank}${interaction ? ". Click to add, right-click to remove." : ""}`}
                  className={cn(
                    "relative block rounded-lg border p-0.5 transition-all",
                    active
                      ? "border-accent shadow-[0_0_10px_rgba(0,229,153,0.25)]"
                      : "border-border-strong",
                    locked && "opacity-35 grayscale",
                    interaction && addable && "cursor-pointer hover:border-accent/70",
                    interaction && !addable && removable && "cursor-pointer",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- zamimg CDN pre-sized square jpg */}
                  <img
                    src={gameIconUrl(talent.icon, "large")}
                    alt=""
                    width={50}
                    height={50}
                    decoding="async"
                    className="rounded-md"
                    style={{ width: 50, height: 50 }}
                  />
                  <span
                    className={cn(
                      "absolute -right-1.5 -bottom-1.5 rounded border bg-background px-1 font-mono text-[10px] tabular-nums",
                      active
                        ? "border-accent/60 text-accent"
                        : "border-border-strong text-muted",
                    )}
                  >
                    {rank}/{talent.maxRank}
                  </span>
                </button>
                {/* Tooltip */}
                <div
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-60 -translate-x-1/2 rounded-lg border border-border bg-background p-3 opacity-0 shadow-xl shadow-black/50 transition-opacity duration-100 group-hover:opacity-100"
                >
                  <div className="text-xs font-semibold text-foreground">
                    {talent.name}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-accent">
                    Rank {rank}/{talent.maxRank}
                    {talent.requiresPoints > 0 &&
                      ` · needs ${talent.requiresPoints} pts in ${tree.treeName}`}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-strong">
                    {talent.description}
                  </p>
                  {notes?.[talent.id] && (
                    <p className="mt-1.5 border-t border-border pt-1.5 text-[11px] leading-relaxed text-accent/90">
                      {notes[talent.id]}
                    </p>
                  )}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
