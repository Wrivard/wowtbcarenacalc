import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CLASSES, getClass } from "@/lib/classes";
import { addonsForClass } from "@/data/addons";
import { macrosForClass } from "@/data/macros";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHero } from "@/components/PageHero";
import { MacroList } from "@/components/guides/MacroList";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { classBackground } from "@/lib/backgrounds";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.map((c) => ({ class: c.slug }));
}

type Params = Promise<{ class: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls) return {};
  return buildMetadata({
    title: `Best ${cls.name} Addons & Macros — TBC Classic PvP & PvE`,
    description: `The best addons and essential macros for ${cls.name} in TBC Classic: focus, arena and burst macros plus the class-specific addons worth running.`,
    path: `/guides/addons/${cls.slug}`,
    ogImage: `/${cls.slug}/opengraph-image`,
  });
}

export default async function ClassAddonsPage({ params }: { params: Params }) {
  const { class: classSlug } = await params;
  const cls = getClass(classSlug);
  if (!cls) notFound();

  const addons = addonsForClass(cls.slug);
  const macros = macrosForClass(cls.slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides" },
    { name: "Addons", href: "/guides/addons" },
    { name: cls.name, href: `/guides/addons/${cls.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {cls.name} Addons &amp; Macros — TBC Classic
        </h1>
        <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-strong sm:text-base">
          The addons worth running as a {cls.name}, plus copy-paste focus,
          arena and burst macros for the class.
        </p>
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4 pt-8">
        <section aria-label={`${cls.name} addons`}>
          <h2 className="text-xl font-semibold tracking-tight">
            {cls.name} addons
          </h2>
          <div className="mt-3 space-y-2">
            {addons.map((a) => (
              <div key={a.name} className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground">{a.name}</h3>
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
          <p className="mt-3 text-xs text-muted">
            Plus the{" "}
            <Link href="/guides/addons" className="text-accent underline-offset-2 hover:underline">
              universal essentials
            </Link>{" "}
            every character should run.
          </p>
        </section>

        <AdUnit slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_INCONTENT} className="mt-10" />

        <section className="mt-10" aria-label={`${cls.name} macros`}>
          <h2 className="text-xl font-semibold tracking-tight">
            {cls.name} macros
          </h2>
          <p className="mt-1.5 text-sm text-muted">
            Copy-paste and tweak the names to your spec. Focus macros assume you
            have a focus set (<code className="text-muted-strong">/focus</code>).
          </p>
          <div className="mt-4">
            {macros.length > 0 ? (
              <MacroList macros={macros} />
            ) : (
              <p className="text-sm text-muted">Class macros coming soon.</p>
            )}
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold text-foreground">
            {cls.name} gear &amp; talents
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
            Set up the rest of your {cls.name}:{" "}
            <Link href={`/${cls.slug}`} className="text-accent underline-offset-2 hover:underline">
              BiS lists &amp; talent builds
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
