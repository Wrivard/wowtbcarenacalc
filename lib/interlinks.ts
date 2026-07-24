// Centralized internal-linking service. Given a class/spec, returns the
// contextually relevant links across the whole site (BiS, talents, best
// race, addons/macros, and the arena comps that contain the class) so
// every guide/BiS page flows authority to the related content.

import { COMPS, compSlug } from "@/data/comps";
import { getBestRace } from "@/data/bestRace";
import { getClass, getSpec } from "@/lib/classes";
import { BIS_REGISTRY } from "@/data/bis/index";
import { getItemSource } from "@/data/itemSources";

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

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * PvE BiS pages that list an item dropping from this boss — the reverse of
 * the "how to get" link on the gear grid. Built by walking every filled BiS
 * list and asking data/itemSources where each item comes from, so it can
 * never claim a drop the source data doesn't record.
 *
 * Boss pages were otherwise near dead ends: they averaged under three
 * internal links that weren't already in the sitewide nav.
 */
export function specsWantingLootFrom(
  bossName: string,
  raidPhase: number,
  limit = 12,
): RelatedLink[] {
  const target = norm(bossName);
  const seen = new Map<string, RelatedLink>();

  for (const list of Object.values(BIS_REGISTRY)) {
    // Only the phase this boss belongs to: a Phase 5 list containing a
    // Karazhan trinket is not a reason to send Karazhan's page there.
    if (list.content !== "pve" || list.phase !== raidPhase) continue;
    const itemIds = list.slots.flatMap((s) => [
      s.bis.itemId,
      ...s.alternatives.map((a) => a.itemId),
    ]);
    const drops = itemIds.some((id) =>
      (getItemSource(id) ?? []).some(
        (src) => src.type === "raid" && src.boss && norm(src.boss) === target,
      ),
    );
    if (!drops) continue;
    const found = getSpec(list.class, list.spec);
    if (!found) continue;
    const href = `/${list.class}/${list.spec}/pve/phase-${list.phase}`;
    if (!seen.has(href))
      seen.set(href, {
        href,
        label: `${found.spec.name} ${found.cls.name} Phase ${list.phase} BiS`,
      });
  }

  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label)).slice(0, limit);
}
