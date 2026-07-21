// Back-compat redirect: the per-class calculator pages were consolidated
// into a single /talent-calculator page with a class dropdown. Old links
// (and shared build links carrying ?b=) redirect there, preserving both
// the class and the build.

import { redirect } from "next/navigation";
import { getClass } from "@/lib/classes";

type Params = Promise<{ class: string }>;
type SP = Promise<Record<string, string | string[] | undefined>>;

export default async function ClassCalculatorRedirect({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SP;
}) {
  const { class: classSlug } = await params;
  const sp = await searchParams;
  const cls = getClass(classSlug);
  const target = cls ? `/talent-calculator?class=${cls.slug}` : "/talent-calculator";
  const b = Array.isArray(sp.b) ? sp.b[0] : sp.b;
  redirect(b ? `${target}&b=${encodeURIComponent(b)}` : target);
}
