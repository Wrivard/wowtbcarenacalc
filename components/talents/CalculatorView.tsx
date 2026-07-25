// Shared body for the talent calculator, rendered by both the hub
// (/talent-calculator) and the per-class pages (/talent-calculator/<class>).
//
// The class dimension lives in the URL PATH so each class is its own
// indexable page with a unique title/H1/canonical — a ?class= query param
// canonicalises back to the hub and cannot rank, which is what the earlier
// consolidation cost us. The hub keeps a working calculator (defaulting to
// Warrior) and links out to all nine.

import Link from "next/link";
import type { ClassDef } from "@/lib/classes";
import { CLASSES } from "@/lib/classes";
import { getTalents, TOTAL_POINTS } from "@/lib/talents";
import { getBuild } from "@/data/builds";
import { classIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { classBackground } from "@/lib/backgrounds";
import { ClassSelect } from "@/components/talents/ClassSelect";
import { TalentCalculator } from "@/components/talents/TalentCalculator";
import type { Crumb } from "@/components/seo/JsonLd";
import { Suspense } from "react";

export function calculatorPath(classSlug: string): string {
  return `/talent-calculator/${classSlug}`;
}

export function CalculatorView({
  cls,
  variant,
}: {
  cls: ClassDef;
  variant: "hub" | "class";
}) {
  const talents = getTalents(cls.slug)!;
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Talent Calculator", href: "/talent-calculator" },
  ];
  if (variant === "class")
    crumbs.push({ name: cls.name, href: calculatorPath(cls.slug) });

  return (
    <>
      <PageHero image={classBackground(cls.slug)} contentClassName="max-w-[1200px]">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {variant === "class"
            ? `${cls.name} Talent Calculator — TBC Classic`
            : "TBC Classic Talent Calculator"}
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-muted-strong">
          {variant === "class" ? (
            <>
              Plan a {cls.name} build with the real rules — 61 points at level
              70, tiers unlocking every 5 points, prerequisites enforced — then
              share it as a link.
            </>
          ) : (
            <>
              Pick a class and plan a build with the real rules — 61 points at
              level 70, tiers unlocking every 5 points, prerequisites enforced —
              then share it as a link.
            </>
          )}
        </p>
      </PageHero>

      <main className="mx-auto max-w-[1200px] px-4 pt-6">
        <div className="mb-6">
          <ClassSelect value={cls.slug} />
        </div>

        {/* key by class so the calculator resets cleanly on class change */}
        <Suspense key={cls.slug}>
          <TalentCalculator cls={talents} className={cls.name} />
        </Suspense>

        {/* Every class calculator is a crawlable link, from both variants. */}
        <nav
          aria-label="Talent calculators by class"
          className="mt-10 border-t border-border pt-6"
        >
          <h2 className="text-[11px] font-medium tracking-widest text-muted uppercase">
            Talent calculators by class
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CLASSES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={calculatorPath(c.slug)}
                  aria-current={c.slug === cls.slug && variant === "class" ? "page" : undefined}
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm transition-colors hover:border-border-strong hover:bg-surface-hover"
                >
                  <GameIcon icon={classIconName(c.slug)} alt="" size="small" className="size-4 rounded" />
                  <span style={{ color: c.color }}>{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Supporting copy, class variant only. These nine pages were ~173
            words each — the thinnest on the site — while Search Console showed
            /classes accidentally ranking for "wow tbc <class> talent
            calculator" at position 22-30. A calculator widget alone gives
            Google nothing to match those queries against. The hub keeps its
            existing copy. */}
        {variant === "class" && (
          <section className="mt-10 max-w-[70ch]" aria-labelledby="about-calc">
            <h2 id="about-calc" className="text-xl font-semibold tracking-tight">
              About this {cls.name} talent calculator
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-strong">
              This is a TBC Classic {cls.name} talent calculator built on the
              patch 2.4.3 trees, not a Wrath or retail approximation. It
              enforces the rules the game does: {TOTAL_POINTS} points at level
              70, a tier unlocking only once you&apos;ve spent 5 points in that
              tree, and prerequisite talents required before their dependants.
              A build you can save here is a build that works in game.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-strong">
              {cls.name} has three trees —{" "}
              {talents.trees.map((t, i) => (
                <span key={t.treeName}>
                  <strong className="text-foreground">{t.treeName}</strong>
                  {i < talents.trees.length - 2
                    ? ", "
                    : i === talents.trees.length - 2
                      ? " and "
                      : ""}
                </span>
              ))}
              . Spend points by clicking a talent, remove them with
              right-click, and the URL updates as you go: copy it and whoever
              opens it sees the exact build, no account or export step.
            </p>
            {(() => {
              // Only render the spread table when builds actually exist —
              // an empty table would be worse than no table.
              const rows = cls.specs
                .map((s) => ({ spec: s, build: getBuild(cls.slug, s.slug) }))
                .filter((r) => r.build);
              if (!rows.length) return null;
              return (
                <>
                  <h3 className="mt-6 text-sm font-semibold text-foreground">
                    Recommended {cls.name} builds for TBC
                  </h3>
                  <div className="mt-3 overflow-x-auto rounded-xl border border-border">
                    <table className="w-full min-w-[380px] text-sm">
                      <thead>
                        <tr className="border-b border-border bg-surface">
                          <th className="px-4 py-2.5 text-left text-[11px] font-medium tracking-widest text-muted uppercase">
                            Spec
                          </th>
                          <th className="px-4 py-2.5 text-left text-[11px] font-medium tracking-widest text-muted uppercase">
                            Points
                          </th>
                          <th className="px-4 py-2.5 text-left text-[11px] font-medium tracking-widest text-muted uppercase">
                            For
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map(({ spec, build }) => (
                          <tr
                            key={spec.slug}
                            className="border-b border-border bg-surface last:border-b-0"
                          >
                            <td className="px-4 py-2.5">
                              <Link
                                href={`/${cls.slug}/${spec.slug}/talents`}
                                className="text-accent underline-offset-2 hover:underline"
                              >
                                {spec.name}
                              </Link>
                            </td>
                            <td className="px-4 py-2.5 font-mono text-muted-strong tabular-nums">
                              {build!.summaryLabel}
                            </td>
                            <td className="px-4 py-2.5 text-muted-strong">
                              {build!.category === "pvp" ? "Arena PvP" : "Raid PvE"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-strong">
                    Open any of those to see the full tree with the reasoning
                    behind each pick, then load it here to adapt it. Gearing the
                    build is a separate question — the{" "}
                    <Link
                      href={`/${cls.slug}`}
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      {cls.name} BiS lists
                    </Link>{" "}
                    cover arena and raid separately, and the{" "}
                    <Link
                      href="/arena-points-calculator"
                      className="text-accent underline-offset-2 hover:underline"
                    >
                      TBC arena points calculator
                    </Link>{" "}
                    works out how long the PvP set takes.
                  </p>
                </>
              );
            })()}
          </section>
        )}

        {/* Recommended builds for the class on screen. */}
        <nav aria-label="Recommended builds" className="mt-8 pb-4">
          <h2 className="text-[11px] font-medium tracking-widest text-muted uppercase">
            Recommended {cls.name} builds
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {cls.specs.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${cls.slug}/${s.slug}/talents`}
                  className="text-sm text-muted-strong transition-colors hover:text-foreground"
                >
                  {s.name} {cls.name} build
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/${cls.slug}`}
                className="text-sm text-accent underline-offset-2 hover:underline"
              >
                All {cls.name} BiS lists →
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
