import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  BRACKETS,
  BRACKET_LABEL,
  isBracket,
  compsFor,
  classesInBracket,
  bracketCopy,
} from "@/lib/comps-seo";
import { CompCollection, type RefineGroup } from "@/components/arena/CompCollection";

export const dynamicParams = false;

export function generateStaticParams() {
  return BRACKETS.map((b) => ({ bracket: b }));
}

type Params = Promise<{ bracket: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { bracket } = await params;
  if (!isBracket(bracket)) return {};
  const copy = bracketCopy(bracket);
  return buildMetadata({
    title: copy.title,
    description: copy.description,
    path: `/arena/comps/${bracket}`,
  });
}

export default async function BracketCompsPage({ params }: { params: Params }) {
  const { bracket } = await params;
  if (!isBracket(bracket)) notFound();
  const copy = bracketCopy(bracket);
  const comps = compsFor({ bracket });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Comps", href: "/arena/comps" },
    { name: BRACKET_LABEL[bracket], href: `/arena/comps/${bracket}` },
  ];

  const refine: RefineGroup[] = [
    {
      label: "Bracket",
      links: BRACKETS.map((b) => ({
        href: `/arena/comps/${b}`,
        label: BRACKET_LABEL[b],
        active: b === bracket,
      })),
    },
    {
      label: `${BRACKET_LABEL[bracket]} class`,
      links: classesInBracket(bracket).map((c) => ({
        href: `/arena/comps/${bracket}/class/${c.slug}`,
        label: c.name,
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
