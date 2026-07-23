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
import { getTalents } from "@/lib/talents";
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
