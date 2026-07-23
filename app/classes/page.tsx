import type { Metadata } from "next";
import Link from "next/link";
import { CLASSES } from "@/lib/classes";
import { classIconName, specIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/PageHero";
import { BACKGROUNDS } from "@/lib/backgrounds";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "TBC Classic BiS Lists & Talent Builds — All Classes",
  description:
    "Best-in-slot gear and talent builds for every TBC Classic class and spec — arena PvP BiS, phase-by-phase PvE BiS, and interactive talent calculators.",
  alternates: { canonical: "/classes" },
};

export default function ClassesHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
  ];
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(
            "TBC Classic classes",
            CLASSES.map((c) => ({
              name: c.name,
              url: `${SITE_URL}/${c.slug}`,
            })),
          ),
        ]}
      />
      <PageHero image={BACKGROUNDS.classes}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic BiS Lists
        </h1>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Best-in-slot gear for every class and spec — live arena PvP
          snapshots and phase-by-phase PvE lists from top Warcraft Logs
          parses. Pick a spec:
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-10">
        <div className="grid gap-3 sm:grid-cols-2">
          {CLASSES.map((cls) => (
            <div
              key={cls.slug}
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
            >
              <Link
                href={`/${cls.slug}`}
                className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-foreground hover:text-accent"
              >
                <GameIcon
                  icon={classIconName(cls.slug)}
                  alt={`${cls.name} class icon`}
                  size="medium"
                  className="rounded-lg"
                />
                {cls.name}
              </Link>
              <ul className="mt-3 space-y-2">
                {cls.specs.map((spec) => (
                  <li key={spec.slug} className="flex items-center gap-2.5">
                    <GameIcon
                      icon={specIconName(cls.slug, spec)}
                      alt=""
                      size="small"
                      className="rounded"
                    />
                    <span className="text-sm text-muted-strong">
                      {spec.name}
                    </span>
                    <span className="ml-auto flex items-center gap-1.5">
                      {spec.pvp && (
                        <Link
                          href={`/${cls.slug}/${spec.slug}/pvp`}
                          title={`${spec.name} ${cls.name} arena PvP BiS`}
                          className="rounded border border-accent/40 px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-accent uppercase transition-colors hover:bg-accent hover:text-black"
                        >
                          PvP
                        </Link>
                      )}
                      {spec.pve && (
                        <Link
                          href={`/${cls.slug}/${spec.slug}/pve/phase-1`}
                          title={`${spec.name} ${cls.name} raid PvE BiS`}
                          className="rounded border border-border-strong px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-muted-strong uppercase transition-colors hover:bg-surface-hover hover:text-foreground"
                        >
                          PvE
                        </Link>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Looking for talent builds instead? They live under{" "}
          <Link
            href="/talent-calculator"
            className="text-accent underline-offset-2 hover:underline"
          >
            Talents
          </Link>
          , together with the interactive calculator.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Gearing for the arena? See the{" "}
          <Link href="/arena/comps" className="text-accent underline-offset-2 hover:underline">comp tier list</Link>{" "}
          and top ladder picks like{" "}
          <Link href="/shaman/elemental/pvp" className="text-accent underline-offset-2 hover:underline">Elemental Shaman</Link>,{" "}
          <Link href="/mage/arcane/pvp" className="text-accent underline-offset-2 hover:underline">Arcane Mage</Link>{" "}
          and{" "}
          <Link href="/paladin/retribution/pvp" className="text-accent underline-offset-2 hover:underline">Retribution Paladin</Link>
          . For raids, the{" "}
          <Link href="/class-rankings" className="text-accent underline-offset-2 hover:underline">DPS rankings</Link>{" "}
          show which specs top the meters each phase.
        </p>
      </main>
    </>
  );
}
