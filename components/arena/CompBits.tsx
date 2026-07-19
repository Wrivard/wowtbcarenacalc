// Shared presentational bits for arena comps: tier badge, difficulty
// pips, playstyle tag, class-icon row, and the comp card.

import Link from "next/link";
import type { ArenaComp, Tier, Difficulty, Playstyle } from "@/data/comps";
import { compSlug } from "@/data/comps";
import { classIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { getClass } from "@/lib/classes";
import { cn } from "@/lib/utils";

const TIER_STYLES: Record<Tier, string> = {
  S: "border-amber-400/50 bg-amber-400/10 text-amber-300",
  A: "border-emerald-400/50 bg-emerald-400/10 text-emerald-300",
  B: "border-sky-400/50 bg-sky-400/10 text-sky-300",
  C: "border-zinc-400/40 bg-zinc-400/10 text-zinc-300",
};

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-md border font-mono text-xs font-bold",
        TIER_STYLES[tier],
      )}
      title={`${tier} tier`}
    >
      {tier}
    </span>
  );
}

export function DifficultyPips({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      title={`Difficulty ${difficulty}/3`}
      aria-label={`Difficulty ${difficulty} of 3`}
    >
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 rounded-full",
            i <= difficulty ? "bg-accent" : "bg-border-strong",
          )}
        />
      ))}
    </span>
  );
}

const PLAYSTYLE_LABEL: Record<Playstyle, string> = {
  cleave: "Cleave",
  control: "Control",
  sustain: "Sustain",
  burst: "Burst",
};

export function PlaystyleTag({ playstyle }: { playstyle: Playstyle }) {
  return (
    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-strong uppercase">
      {PLAYSTYLE_LABEL[playstyle]}
    </span>
  );
}

export function CompIcons({ comp, size = "medium" }: { comp: ArenaComp; size?: "small" | "medium" }) {
  return (
    <span className="flex items-center -space-x-1">
      {comp.members.map((m, i) => {
        const cls = getClass(m.class);
        return (
          <GameIcon
            key={`${m.class}-${m.spec}-${i}`}
            icon={classIconName(m.class)}
            alt={cls?.name ?? m.class}
            size={size}
            className="rounded-md ring-1 ring-background"
          />
        );
      })}
    </span>
  );
}

export function CompCard({ comp }: { comp: ArenaComp }) {
  return (
    <Link
      href={`/arena/comps/${comp.bracket}/${compSlug(comp)}`}
      className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
    >
      <div className="flex items-center justify-between gap-3">
        <CompIcons comp={comp} />
        <TierBadge tier={comp.tier} />
      </div>
      <div>
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {comp.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
          {comp.blurb}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <PlaystyleTag playstyle={comp.playstyle} />
        <DifficultyPips difficulty={comp.difficulty} />
      </div>
    </Link>
  );
}
