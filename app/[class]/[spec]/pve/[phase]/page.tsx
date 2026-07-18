import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PHASES, PHASE_LABELS, allSpecs, getSpec, type Phase } from "@/lib/classes";
import { getPveBis, wowheadItemUrl } from "@/lib/bis";
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
import { PageHero } from "@/components/PageHero";
import { classBackground } from "@/lib/backgrounds";
import { getItem } from "@/lib/items";

export const dynamicParams = false;

export function generateStaticParams() {
  return allSpecs()
    .filter(({ spec }) => spec.pve)
    .flatMap(({ cls, spec }) =>
      PHASES.map((p) => ({
        class: cls.slug,
        spec: spec.slug,
        phase: `phase-${p}`,
      })),
    );
}

type Params = Promise<{ class: string; spec: string; phase: string }>;

function parsePhase(raw: string): Phase | null {
  const m = /^phase-([1-5])$/.exec(raw);
  return m ? (Number(m[1]) as Phase) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { class: classSlug, spec: specSlug, phase: rawPhase } = await params;
  const found = getSpec(classSlug, specSlug);
  const phase = parsePhase(rawPhase);
  if (!found?.spec.pve || phase === null) return {};
  const { cls, spec } = found;
  const list = getPveBis(cls.slug, spec.slug, phase);
  return {
    title: `${spec.name} ${cls.name} BiS Phase ${phase} — TBC Classic Best in Slot`,
    description: `${spec.name} ${cls.name} Phase ${phase} best in slot (${PHASE_LABELS[phase]}) for TBC Classic — gear list, gems, enchants and stat priority.`,
    alternates: { canonical: `/${cls.slug}/${spec.slug}/pve/phase-${phase}` },
    ...(list ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function PveBisPage({ params }: { params: Params }) {
  const { class: classSlug, spec: specSlug, phase: rawPhase } = await params;
  const found = getSpec(classSlug, specSlug);
  const phase = parsePhase(rawPhase);
  if (!found?.spec.pve || phase === null) notFound();
  const { cls, spec } = found;
  const list = getPveBis(cls.slug, spec.slug, phase);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: cls.name, href: `/${cls.slug}` },
    {
      name: `${spec.name} P${phase} BiS`,
      href: `/${cls.slug}/${spec.slug}/pve/phase-${phase}`,
    },
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
                  `${spec.name} ${cls.name} Phase ${phase} best in slot (TBC Classic)`,
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
          {spec.name} {cls.name} BiS — Phase {phase}
        </h1>
        <p className="mt-2 font-mono text-[11px] tracking-wider text-muted uppercase">
          {PHASE_LABELS[phase]}
        </p>
        {list && (
          <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted-strong sm:text-base">
            {list.blurb}
          </p>
        )}
      </PageHero>

      <main className="mx-auto max-w-[720px] px-4">
        {list ? (
          <BisPageBody list={list} cls={cls} spec={spec} />
        ) : (
          <ComingSoon
            title={`${spec.name} ${cls.name} Phase ${phase} BiS`}
            fallbackHref={`/${cls.slug}/${spec.slug}/talents`}
            fallbackLabel={`${spec.name} ${cls.name} talent build`}
          />
        )}

        <SpecCrossLinks cls={cls} spec={spec} current="pve" />
      </main>
    </>
  );
}
