import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CLASSES, getClass } from "@/lib/classes";
import {
  BRACKETS,
  BRACKET_LABEL,
  isBracket,
  isClassSlug,
  compsFor,
  classesInBracket,
  bracketsForClass,
  bracketClassCopy,
} from "@/lib/comps-seo";
import { CompCollection, type RefineGroup } from "@/components/arena/CompCollection";

export const dynamicParams = false;

// Only the (bracket, class) pairs that actually have comps — no thin pages.
export function generateStaticParams() {
  const out: { bracket: string; class: string }[] = [];
  for (const b of BRACKETS)
    for (const c of CLASSES)
      if (compsFor({ bracket: b, classSlug: c.slug }).length > 0)
        out.push({ bracket: b, class: c.slug });
  return out;
}

type Params = Promise<{ bracket: string; class: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { bracket, class: classSlug } = await params;
  if (!isBracket(bracket) || !isClassSlug(classSlug)) return {};
  const copy = bracketClassCopy(bracket, classSlug);
  return buildMetadata({
    title: copy.title,
    description: copy.description,
    path: `/arena/comps/${bracket}/class/${classSlug}`,
  });
}

export default async function BracketClassCompsPage({ params }: { params: Params }) {
  const { bracket, class: classSlug } = await params;
  if (!isBracket(bracket) || !isClassSlug(classSlug)) notFound();
  const cls = getClass(classSlug)!;
  const comps = compsFor({ bracket, classSlug });
  if (comps.length === 0) notFound();
  const copy = bracketClassCopy(bracket, classSlug);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Comps", href: "/arena/comps" },
    { name: BRACKET_LABEL[bracket], href: `/arena/comps/${bracket}` },
    { name: cls.name, href: `/arena/comps/${bracket}/class/${classSlug}` },
  ];

  const refine: RefineGroup[] = [
    {
      label: `${cls.name} in`,
      links: bracketsForClass(classSlug).map((b) => ({
        href: `/arena/comps/${b}/class/${classSlug}`,
        label: BRACKET_LABEL[b],
        active: b === bracket,
      })),
    },
    {
      label: `${BRACKET_LABEL[bracket]} class`,
      links: classesInBracket(bracket).map((c) => ({
        href: `/arena/comps/${bracket}/class/${c.slug}`,
        label: c.name,
        active: c.slug === classSlug,
      })),
    },
  ];

  return (
    <CompCollection
      crumbs={crumbs}
      h1={copy.h1}
      intro={copy.intro}
      comps={comps}
      refine={refine}
    />
  );
}
