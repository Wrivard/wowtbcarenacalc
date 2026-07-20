import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import {
  getSnapshot,
  type Bracket,
  type Faction,
  type LeaderboardEntry,
} from "@/data/leaderboard";
import { CLASSES, getClass } from "@/lib/classes";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

// ISR: when the live sync route is wired, revalidate hourly.
export const revalidate = 3600;

export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic Arena Leaderboard — Season 2 Gladiator Cutoff",
    description:
      "TBC Classic arena leaderboard for 2v2, 3v3 and 5v5 with the current Gladiator, Duelist, Rival and Challenger rating cutoffs, filterable by faction and class.",
    path: "/leaderboard",
  }),
};

type SP = Promise<Record<string, string | string[] | undefined>>;
const BRACKETS: { key: Bracket; label: string }[] = [
  { key: "2s", label: "2v2" },
  { key: "3s", label: "3v3" },
  { key: "5s", label: "5v5" },
];
const PER_OPTIONS = [25, 50, 100];

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function ClassName({ name, classSlug }: { name: string; classSlug: string }) {
  const color = getClass(classSlug)?.color ?? "#ededed";
  return <span style={{ color }}>{name}</span>;
}

function TeamCell({ entry }: { entry: LeaderboardEntry }) {
  return (
    <span className="flex flex-col gap-0.5">
      {entry.teamName && (
        <span className="text-xs font-medium text-foreground">{entry.teamName}</span>
      )}
      <span className="flex flex-wrap gap-x-2 gap-y-0.5 text-sm">
        {entry.players.map((p, i) => (
          <ClassName key={`${p.name}-${i}`} name={p.name} classSlug={p.class} />
        ))}
      </span>
    </span>
  );
}

export default async function LeaderboardPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const bracket = (["2s", "3s", "5s"].includes(first(sp.bracket) ?? "")
    ? first(sp.bracket)
    : "2s") as Bracket;
  const faction = first(sp.faction) as Faction | undefined;
  const classFilter = first(sp.class);
  const per = PER_OPTIONS.includes(Number(first(sp.per))) ? Number(first(sp.per)) : 25;
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const snap = getSnapshot(bracket);
  let entries = snap.entries;
  if (faction === "horde" || faction === "alliance")
    entries = entries.filter((e) => e.faction === faction);
  if (classFilter)
    entries = entries.filter((e) => e.players.some((p) => p.class === classFilter));

  const totalPages = Math.max(1, Math.ceil(entries.length / per));
  const pageEntries = entries.slice((page - 1) * per, page * per);

  const updated = new Date(snap.fetchedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Leaderboard", href: "/leaderboard" },
  ];

  const withParam = (k: string, v?: string) => {
    const params = new URLSearchParams();
    const base = { bracket, faction, class: classFilter, per: String(per) };
    for (const [key, val] of Object.entries(base)) if (val) params.set(key, val);
    if (v) params.set(k, v);
    else params.delete(k);
    if (k !== "page") params.delete("page");
    const qs = params.toString();
    return qs ? `/leaderboard?${qs}` : "/leaderboard";
  };

  const cutoffs = [
    { label: "Gladiator", value: snap.gladiatorCutoff, color: "text-amber-300" },
    { label: "Duelist", value: snap.duelistCutoff, color: "text-fuchsia-300" },
    { label: "Rival", value: snap.rivalCutoff, color: "text-sky-300" },
    { label: "Challenger", value: snap.challengerCutoff, color: "text-emerald-300" },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: `TBC Classic ${bracket} arena leaderboard (Season ${snap.season})`,
            description: `Top ${bracket} arena teams with the current Gladiator cutoff of ${snap.gladiatorCutoff} for TBC Classic Season ${snap.season}.`,
            url: `${SITE_URL}/leaderboard?bracket=${bracket}`,
            creator: { "@type": "Organization", name: "wowtbcarena.com" },
          },
        ]}
      />
      <PageHero image={BACKGROUNDS.leaderboard}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic Arena Leaderboard
        </h1>
        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Season {snap.season} arena ladder with the current title cutoffs for
          every bracket.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[880px] px-4 pt-8">
        {snap.isSample && (
          <div className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-amber-200/90">
            <strong className="font-semibold">Sample data.</strong> The live
            ladder feed (ironforge.pro) is not yet wired — these entries are
            illustrative. The table, filters and cutoffs below are fully
            functional and will show real data once the sync is enabled.
          </div>
        )}

        {/* Bracket tabs */}
        <div className="flex gap-2">
          {BRACKETS.map((b) => (
            <Link
              key={b.key}
              href={`/leaderboard?bracket=${b.key}`}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                bracket === b.key
                  ? "border-accent/50 bg-accent-faint text-accent"
                  : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
              )}
            >
              {b.label}
            </Link>
          ))}
        </div>

        {/* Cutoff banner */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {cutoffs.map((c) => (
            <div key={c.label} className="rounded-xl border border-border bg-surface p-3 text-center">
              <div className={cn("font-mono text-lg font-bold", c.color)}>
                {c.value.toLocaleString()}
              </div>
              <div className="mt-0.5 font-mono text-[10px] tracking-wider text-muted uppercase">
                {c.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">
          {bracket} title cutoffs · updated {updated} · data from ironforge.pro
        </p>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT} className="mt-6" />

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] tracking-wider text-muted uppercase">Faction</span>
          {(["horde", "alliance"] as Faction[]).map((f) => (
            <Link
              key={f}
              href={withParam("faction", faction === f ? undefined : f)}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                faction === f
                  ? "border-accent/50 bg-accent-faint text-accent"
                  : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
              )}
            >
              {f}
            </Link>
          ))}
          <span className="ml-2 font-mono text-[10px] tracking-wider text-muted uppercase">Class</span>
          {CLASSES.slice(0, 9).map((c) => (
            <Link
              key={c.slug}
              href={withParam("class", classFilter === c.slug ? undefined : c.slug)}
              className={cn(
                "rounded-lg border px-2 py-1 text-xs font-medium transition-colors",
                classFilter === c.slug
                  ? "border-accent/50 bg-accent-faint text-accent"
                  : "border-border bg-surface text-muted-strong hover:bg-surface-hover hover:text-foreground",
              )}
            >
              {c.name}
            </Link>
          ))}
          {(faction || classFilter) && (
            <Link href={`/leaderboard?bracket=${bracket}`} className="text-xs text-muted underline-offset-2 hover:text-foreground hover:underline">
              Clear
            </Link>
          )}
        </div>

        {/* Table */}
        <div className="mt-4 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">#</th>
                <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">Team / Players</th>
                <th className="px-3 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">Rating</th>
                <th className="px-3 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">W / L</th>
                <th className="px-3 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">Win%</th>
                <th className="px-4 py-2.5 font-mono text-[10px] tracking-wider text-muted uppercase">Realm</th>
              </tr>
            </thead>
            <tbody>
              {pageEntries.map((e) => {
                const total = e.wins + e.losses;
                const winPct = total > 0 ? Math.round((e.wins / total) * 100) : 0;
                return (
                  <tr key={`${e.rank}-${e.players[0].name}`} className="border-b border-border bg-surface last:border-b-0 align-top">
                    <td className="px-4 py-3 font-mono tabular-nums text-muted">{e.rank}</td>
                    <td className="px-4 py-3"><TeamCell entry={e} /></td>
                    <td className="px-3 py-3 font-mono tabular-nums font-semibold text-accent">{e.rating}</td>
                    <td className="px-3 py-3 font-mono tabular-nums text-muted-strong">{e.wins}-{e.losses}</td>
                    <td className="px-3 py-3 font-mono tabular-nums text-muted-strong">{winPct}%</td>
                    <td className="px-4 py-3 text-xs text-muted">{e.realm}</td>
                  </tr>
                );
              })}
              {pageEntries.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-muted">
                    No teams match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination + per-page */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] tracking-wider text-muted uppercase">Per page</span>
            {PER_OPTIONS.map((n) => (
              <Link
                key={n}
                href={withParam("per", String(n))}
                className={cn(
                  "rounded-lg border px-2 py-1 text-xs transition-colors",
                  per === n ? "border-accent/50 bg-accent-faint text-accent" : "border-border bg-surface text-muted-strong hover:text-foreground",
                )}
              >
                {n}
              </Link>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-2 text-sm">
              {page > 1 && (
                <Link href={withParam("page", String(page - 1))} className="text-accent hover:underline">Prev</Link>
              )}
              <span className="text-muted">Page {page} / {totalPages}</span>
              {page < totalPages && (
                <Link href={withParam("page", String(page + 1))} className="text-accent hover:underline">Next</Link>
              )}
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-muted">
          Ladder data sourced from{" "}
          <a href="https://ironforge.pro" target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:text-foreground hover:underline">
            ironforge.pro
          </a>
          . Plan your climb with the{" "}
          <Link href="/arena-points-calculator" className="text-accent underline-offset-2 hover:underline">arena points calculator</Link>{" "}
          and the{" "}
          <Link href="/arena/comps" className="text-accent underline-offset-2 hover:underline">comp tier list</Link>.
        </p>
      </main>
    </>
  );
}
