import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { CLASSES, getClass } from "@/lib/classes";
import {
  BRACKET_LABEL,
  isClassSlug,
  compsFor,
  bracketsForClass,
  classCopy,
} from "@/lib/comps-seo";
import { CompCollection, type RefineGroup } from "@/components/arena/CompCollection";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.map((c) => ({ class: c.slug }));
}

type Params = Promise<{ class: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { class: classSlug } = await params;
  if (!isClassSlug(classSlug)) return {};
  const copy = classCopy(classSlug);
  return buildMetadata({
    title: copy.title,
    description: copy.description,
    path: `/arena/comps/class/${classSlug}`,
  });
}

export default async function ClassCompsPage({ params }: { params: Params }) {
  const { class: classSlug } = await params;
  if (!isClassSlug(classSlug)) notFound();
  const cls = getClass(classSlug)!;
  const copy = classCopy(classSlug);
  const comps = compsFor({ classSlug });

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Arena", href: "/arena" },
    { name: "Comps", href: "/arena/comps" },
    { name: cls.name, href: `/arena/comps/class/${classSlug}` },
  ];

  const refine: RefineGroup[] = [
    {
      label: `${cls.name} in`,
      links: bracketsForClass(classSlug).map((b) => ({
        href: `/arena/comps/${b}/class/${classSlug}`,
        label: `${BRACKET_LABEL[b]}`,
      })),
    },
    {
      label: "Other class",
      links: CLASSES.map((c) => ({
        href: `/arena/comps/class/${c.slug}`,
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
