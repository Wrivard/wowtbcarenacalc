import type { Metadata } from "next";
import Link from "next/link";
import { CLASSES } from "@/lib/classes";
import { getPvpBis } from "@/lib/bis";
import { getBuild } from "@/data/builds";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, breadcrumbJsonLd, itemListJsonLd } from "@/components/seo/JsonLd";
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
    <main className="mx-auto max-w-[720px] px-4">
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
      <header className="pt-10 pb-8 sm:pt-14">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic BiS &amp; Talent Builds
        </h1>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Pick your class for best-in-slot gear lists (arena PvP and
          phase-by-phase PvE), recommended talent builds, and an interactive
          talent calculator.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {CLASSES.map((cls) => (
          <div
            key={cls.slug}
            className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <Link
              href={`/${cls.slug}`}
              className="text-base font-semibold tracking-tight text-foreground hover:text-accent"
            >
              {cls.name}
            </Link>
            <ul className="mt-2 space-y-1">
              {cls.specs.map((spec) => {
                const filled =
                  getPvpBis(cls.slug, spec.slug) ??
                  getBuild(cls.slug, spec.slug);
                return (
                  <li key={spec.slug} className="flex items-center gap-2">
                    <Link
                      href={`/${cls.slug}/${spec.slug}/talents`}
                      className="text-sm text-muted-strong transition-colors hover:text-foreground"
                    >
                      {spec.name}
                    </Link>
                    <span className="text-[10px] text-muted">{spec.role}</span>
                    {filled && (
                      <span className="rounded-full border border-accent/40 px-1.5 font-mono text-[9px] tracking-wider text-accent uppercase">
                        live
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
            <Link
              href={`/talent-calculator/${cls.slug}`}
              className="mt-3 inline-block text-xs text-accent underline-offset-2 hover:underline"
            >
              {cls.name} talent calculator →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
