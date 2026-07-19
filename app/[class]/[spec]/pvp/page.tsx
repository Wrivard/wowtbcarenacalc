import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allSpecs, getSpec } from "@/lib/classes";
import { getPvpBis, wowheadItemUrl } from "@/lib/bis";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  itemListJsonLd,
} from "@/components/seo/JsonLd";
import { BisPageBody } from "@/components/bis/BisPageBody";
import { ComingSoon } from "@/components/ComingSoon";
import { SpecCrossLinks } from "@/components/SpecCrossLinks";
import { SeasonSwitcher } from "@/components/bis/SeasonSwitcher";
import { LIVE_SEASON } from "@/lib/bis";
import { PageHero } from "@/components/PageHero";
import { classBackground } from "@/lib/backgrounds";
import { getItem } from "@/lib/items";

export const dynamicParams = false;

export function generateStaticParams() {
  return allSpecs()
    .filter(({ spec }) => spec.pvp)
    .map(({ cls, spec }) => ({ class: cls.slug, spec: spec.slug }));
}

type Params = Promise<{ class: string; spec: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { class: classSlug, spec: specSlug } = await params;
  const found = getSpec(classSlug, specSlug);
  if (!found?.spec.pvp) return {};
  const { cls, spec } = found;
  const list = getPvpBis(cls.slug, spec.slug);
  const season = list?.season ?? 2;
  return {
    title: `${spec.name} ${cls.name} PvP BiS — TBC Classic Arena Gear (Season ${season})`,
    description: `${spec.name} ${cls.name} PvP best in slot for TBC Classic arena — most-used gear with usage %, plus gems, enchants and stat priority.`,
    alternates: { canonical: `/${cls.slug}/${spec.slug}/pvp` },
    ...(list ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function PvpBisPage({ params }: { params: Params }) {
  const { class: classSlug, spec: specSlug } = await params;
  const found = getSpec(classSlug, specSlug);
  if (!found?.spec.pvp) notFound();
  const { cls, spec } = found;
  const list = getPvpBis(cls.slug, spec.slug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: cls.name, href: `/${cls.slug}` },
    { name: `${spec.name} PvP BiS`, href: `/${cls.slug}/${spec.slug}/pvp` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          ...(list
            ? [
                faqJsonLd(list.faq),
                itemListJsonLd(
                  `${spec.name} ${cls.name} PvP best in slot (TBC Classic)`,
                  list.slots.map((s) => ({
                    name: `${s.slot}: ${getItem(s.bis.itemId)?.name ?? s.bis.name ?? `item ${s.bis.itemId}`}`,
                    url: wowheadItemUrl(s.bis.itemId),
                  })),
                ),
              ]
            : []),
        ]}
      />
      <PageHero image={classBackground(cls.slug)}>
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {spec.name} {cls.name} PvP BiS — TBC Arena
        </h1>
        {list && (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] tracking-wider text-muted uppercase">
              <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] text-accent">
                PvP · Arena
              </span>
              <span>Season {list.season}</span>
              {list.ratingRange && (
                <span>
                  {list.ratingRange[0]}–{list.ratingRange[1]} rating
                </span>
              )}
              {list.sampleSize && <span>n={list.sampleSize}</span>}
              <span className="text-accent">
                Updated{" "}
                {new Date(list.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
              {list.blurb}
            </p>
            <SeasonSwitcher
              classSlug={cls.slug}
              specSlug={spec.slug}
              current={LIVE_SEASON}
            />
          </>
        )}
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4">
        {list ? (
          <BisPageBody list={list} cls={cls} spec={spec} />
        ) : (
          <ComingSoon
            title={`${spec.name} ${cls.name} PvP BiS`}
            fallbackHref={`/talent-calculator/${cls.slug}`}
            fallbackLabel={`Open the ${cls.name} talent calculator`}
          />
        )}

        <SpecCrossLinks cls={cls} spec={spec} current="pvp" />
      </main>
    </>
  );
}
