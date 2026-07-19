import Link from "next/link";
import {
  LIVE_SEASON,
  SEASON_NAMES,
  availablePvpSeasons,
  type PvpSeason,
} from "@/lib/bis";
import { cn } from "@/lib/utils";

// Tab strip linking a spec's PvP seasons. The live-snapshot season (2)
// lives at /pvp; the derived seasons at /pvp/season-N.
export function SeasonSwitcher({
  classSlug,
  specSlug,
  current,
}: {
  classSlug: string;
  specSlug: string;
  current: PvpSeason;
}) {
  const seasons = availablePvpSeasons(classSlug, specSlug);
  if (seasons.length < 2) return null;

  return (
    <nav
      aria-label="Arena season"
      className="mt-5 flex flex-wrap gap-1.5"
    >
      {seasons.map((s) => {
        const href =
          s === LIVE_SEASON
            ? `/${classSlug}/${specSlug}/pvp`
            : `/${classSlug}/${specSlug}/pvp/season-${s}`;
        const active = s === current;
        return (
          <Link
            key={s}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              active
                ? "border-accent/50 bg-accent-faint text-accent"
                : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
            )}
          >
            <span className="font-mono">S{s}</span>{" "}
            <span className="hidden sm:inline">{SEASON_NAMES[s]}</span>
            {s === LIVE_SEASON && (
              <span className="ml-1.5 rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-accent uppercase">
                Live
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
