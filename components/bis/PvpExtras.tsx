// Tier-1 PvP-only sections for a BiS page — Macros, Best arena comps, and
// Best race. Every item is assembled from already-verified project data
// (data/macros, data/comps, data/bestRace), so nothing here is fabricated:
// this is a presentation + interlinking layer over the source of truth.

import Link from "next/link";
import type { ClassDef, SpecDef } from "@/lib/classes";
import { COMPS, compSlug, TIER_ORDER } from "@/data/comps";
import { getBestRace } from "@/data/bestRace";
import { macrosForClass } from "@/data/macros";
import { MacroList } from "@/components/guides/MacroList";
import { TierBadge } from "@/components/arena/CompBits";

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-foreground">
      <span id={id}>{children}</span>
    </h2>
  );
}

const FACTION_LABEL: Record<"horde" | "alliance", string> = {
  horde: "Horde",
  alliance: "Alliance",
};

export function PvpExtras({ cls, spec }: { cls: ClassDef; spec: SpecDef }) {
  const specName = `${spec.name} ${cls.name}`;

  // Macros: class-wide plus any tuned to this exact spec (drop other specs').
  const macros = macrosForClass(cls.slug).filter(
    (m) => !m.spec || m.spec === spec.slug,
  );

  // Best comps: comps that field this class, this spec first, then tier order.
  const comps = COMPS.filter((c) =>
    c.members.some((m) => m.class === cls.slug),
  )
    .sort((a, b) => {
      const aSpec = a.members.some(
        (m) => m.class === cls.slug && m.spec === spec.slug,
      );
      const bSpec = b.members.some(
        (m) => m.class === cls.slug && m.spec === spec.slug,
      );
      if (aSpec !== bSpec) return aSpec ? -1 : 1;
      return TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    })
    .slice(0, 4);

  // Best race: the PvP recommendations (one per faction), already authored.
  const pvpRaces =
    getBestRace(cls.slug)?.recommendations.filter((r) => r.content === "pvp") ??
    [];

  return (
    <>
      {/* Macros */}
      {macros.length > 0 && (
        <section className="mt-12" aria-labelledby={`${cls.slug}-${spec.slug}-macros`}>
          <H2 id={`${cls.slug}-${spec.slug}-macros`}>{specName} arena macros</H2>
          <p className="mt-2 mb-5 max-w-[62ch] text-sm leading-relaxed text-muted">
            The macros that carry {specName} in arena — focus control, burst and
            peels on a single press. Copy a block straight into your macro
            window.
          </p>
          <MacroList macros={macros} />
        </section>
      )}

      {/* Best arena comps */}
      {comps.length > 0 && (
        <section className="mt-12" aria-labelledby={`${cls.slug}-${spec.slug}-comps`}>
          <H2 id={`${cls.slug}-${spec.slug}-comps`}>Best {specName} arena comps</H2>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted">
            The comps this spec slots into best. Full setups, cooldown timelines
            and matchups live in each guide.
          </p>
          <ul className="mt-4 space-y-3">
            {comps.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/arena/comps/${c.bracket}/${compSlug(c)}`}
                  className="group flex gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
                >
                  <span className="shrink-0 pt-0.5">
                    <TierBadge tier={c.tier} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-accent">
                        {c.name}
                      </span>
                      <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                        {c.bracket}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      {c.blurb}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Best race */}
      {pvpRaces.length > 0 && (
        <section className="mt-12" aria-labelledby={`${cls.slug}-${spec.slug}-race`}>
          <H2 id={`${cls.slug}-${spec.slug}-race`}>Best race for {specName} PvP</H2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {pvpRaces.map((r) => (
              <div
                key={r.faction}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[11px] tracking-wider text-muted uppercase">
                    {FACTION_LABEL[r.faction]}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {r.race}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
                  {r.why}
                </p>
                {r.alternatives.length > 0 && (
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    Alternatives:{" "}
                    {r.alternatives.map((a, i) => (
                      <span key={a.race}>
                        {i > 0 && "; "}
                        <span className="text-muted-strong">{a.race}</span> — {a.note}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            <Link
              href={`/guides/best-race/${cls.slug}`}
              className="text-accent underline-offset-2 hover:underline"
            >
              Full {cls.name} race breakdown →
            </Link>
          </p>
        </section>
      )}
    </>
  );
}
