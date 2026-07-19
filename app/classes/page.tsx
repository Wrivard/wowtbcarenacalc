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
                {cls.specs.map((spec) => {
                  const bisHref = spec.pvp
                    ? `/${cls.slug}/${spec.slug}/pvp`
                    : `/${cls.slug}/${spec.slug}/pve/phase-1`;
                  return (
                    <li key={spec.slug} className="flex items-center gap-2.5">
                      <GameIcon
                        icon={specIconName(cls.slug, spec)}
                        alt=""
                        size="small"
                        className="rounded"
                      />
                      <Link
                        href={bisHref}
                        className="text-sm text-muted-strong transition-colors hover:text-foreground"
                      >
                        {spec.name} BiS
                      </Link>
                      <span className="ml-auto text-[10px] text-muted">
                        {spec.role}
                      </span>
                    </li>
                  );
                })}
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
      </main>
    </>
  );
}
