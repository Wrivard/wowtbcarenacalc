import Link from "next/link";
import { PHASE_ICONS, PHASE_LABELS, type Phase } from "@/lib/classes";
import { availablePhases } from "@/lib/bis";
import { GameIcon } from "@/components/GameIcon";
import { cn } from "@/lib/utils";

// Tab strip linking a spec's PvE phase BiS pages — the PvE counterpart of
// SeasonSwitcher. Each tab carries the phase's marquee-boss icon so players
// navigate by the raid they know, not a bare phase number.
export function PhaseSwitcher({
  classSlug,
  specSlug,
  current,
}: {
  classSlug: string;
  specSlug: string;
  current: Phase;
}) {
  const phases = availablePhases(classSlug, specSlug);
  if (phases.length < 2) return null;

  return (
    <nav aria-label="Raid phase" className="mt-5 flex flex-wrap gap-1.5">
      {phases.map((p) => {
        const active = p === current;
        return (
          <Link
            key={p}
            href={`/${classSlug}/${specSlug}/pve/phase-${p}`}
            aria-current={active ? "page" : undefined}
            title={PHASE_LABELS[p]}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
              active
                ? "border-accent/50 bg-accent-faint text-accent"
                : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
            )}
          >
            <GameIcon
              icon={PHASE_ICONS[p]}
              alt=""
              size="small"
              className="size-4"
            />
            <span className="font-mono">P{p}</span>
          </Link>
        );
      })}
    </nav>
  );
}
