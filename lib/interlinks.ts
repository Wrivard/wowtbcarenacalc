// Centralized internal-linking service. Given a class/spec, returns the
// contextually relevant links across the whole site (BiS, talents, best
// race, addons/macros, and the arena comps that contain the class) so
// every guide/BiS page flows authority to the related content.

import { COMPS, compSlug } from "@/data/comps";
import { getBestRace } from "@/data/bestRace";
import { getClass } from "@/lib/classes";

export interface RelatedLink {
  href: string;
  label: string;
}

/** Arena comps that include the given class (deduped, tier order preserved). */
export function compsForClass(classSlug: string, limit = 4): RelatedLink[] {
  return COMPS.filter((c) => c.members.some((m) => m.class === classSlug))
    .slice(0, limit)
    .map((c) => ({
      href: `/arena/comps/${c.bracket}/${compSlug(c)}`,
      label: `${c.name} (${c.bracket})`,
    }));
}

/** Guide links (best race, addons/macros) for a class, when they exist. */
export function guidesForClass(classSlug: string): RelatedLink[] {
  const cls = getClass(classSlug);
  if (!cls) return [];
  const links: RelatedLink[] = [];
  if (getBestRace(classSlug)) {
    links.push({
      href: `/guides/best-race/${classSlug}`,
      label: `Best race for ${cls.name}`,
    });
  }
  links.push({
    href: `/guides/addons/${classSlug}`,
    label: `${cls.name} addons & macros`,
  });
  return links;
}
