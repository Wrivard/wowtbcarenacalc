import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CLASSES } from "@/lib/classes";
import { classIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { BACKGROUNDS } from "@/lib/backgrounds";

// Guides hub. Best-race pages are live; per-spec PvP/PvE guides,
// professions, macros and addons land next (section 5).
export const metadata: Metadata = {
  ...buildMetadata({
    title: "TBC Classic Guides — Best Race, PvP, PvE, Professions & Addons",
    description:
      "TBC Classic guides: best race per class, per-spec PvP and PvE strategy, profession picks, macros and the essential addons.",
    path: "/guides",
  }),
};

export default function GuidesHub() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
  ];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={BACKGROUNDS.guides}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          TBC Classic Guides
        </h1>
        <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          Best race per class, plus per-spec PvP and PvE strategy, professions,
          macros and addons.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-10">
        <section aria-label="Best race per class">
          <h2 className="text-lg font-semibold tracking-tight">
            Best race per class
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Which racials matter most for each class in arena PvP and raid PvE.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {CLASSES.map((cls) => (
              <Link
                key={cls.slug}
                href={`/guides/best-race/${cls.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-surface p-3 transition-colors hover:border-border-strong"
              >
                <GameIcon
                  icon={classIconName(cls.slug)}
                  alt={`${cls.name} icon`}
                  size="small"
                  className="rounded"
                />
                <span className="text-sm font-medium text-foreground">
                  Best race for {cls.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-label="Reference guides">
          <h2 className="text-lg font-semibold tracking-tight">
            Reference guides
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Link
              href="/guides/professions"
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
            >
              <h3 className="text-sm font-semibold text-foreground">
                Professions tier list
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Every profession ranked for PvP and PvE, with the classes that
                want it most.
              </p>
            </Link>
            <Link
              href="/guides/addons"
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
            >
              <h3 className="text-sm font-semibold text-foreground">
                Addons &amp; macros
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Essential addons plus copy-paste focus, arena and burst macros
                per class.
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-base font-semibold tracking-tight">
            More guides coming
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            Per-spec PvP and PvE playstyle guides are being written. In the
            meantime, browse{" "}
            <Link href="/classes" className="text-accent underline-offset-2 hover:underline">
              BiS lists &amp; talents
            </Link>{" "}
            or the{" "}
            <Link href="/arena/comps" className="text-accent underline-offset-2 hover:underline">
              arena comp tier list
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
