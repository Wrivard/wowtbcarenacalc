import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { universalAddons } from "@/data/addons";
import { CLASSES } from "@/lib/classes";
import { classIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Best Addons for TBC Classic — Essential UI, Raid & PvP Addons",
    description:
      "The essential TBC Classic addons for raiding and arena: DBM, WeakAuras, Bagnon, Details, Gladius and more, with download links and per-class picks.",
    path: "/guides/addons",
  }),
};

export default function AddonsHub() {
  const addons = universalAddons();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: "Addons", href: "/guides/addons" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.guides}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Best Addons for TBC Classic
        </h1>
        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The addons worth installing on every character, plus class-specific
          picks and macros. Links go to CurseForge.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8">
        <section aria-label="Universal addons">
          <h2 className="text-lg font-semibold tracking-tight">
            Universal essentials
          </h2>
          <div className="mt-3 space-y-2">
            {addons.map((a) => (
              <div key={a.name} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    {a.name}
                    {a.isEssential && (
                      <span className="ml-2 rounded-full bg-accent-faint px-1.5 py-0.5 font-mono text-[9px] tracking-wider text-accent uppercase">
                        Essential
                      </span>
                    )}
                  </h3>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs text-accent underline-offset-2 hover:underline"
                  >
                    CurseForge →
                  </a>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-strong">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-label="Class addons">
          <h2 className="text-lg font-semibold tracking-tight">
            Class-specific addons &amp; macros
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {CLASSES.map((cls) => (
              <Link
                key={cls.slug}
                href={`/guides/addons/${cls.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong"
              >
                <GameIcon
                  icon={classIconName(cls.slug)}
                  alt={`${cls.name} icon`}
                  size="small"
                  className="rounded"
                />
                <span className="text-sm font-medium text-foreground">
                  {cls.name} addons &amp; macros
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
