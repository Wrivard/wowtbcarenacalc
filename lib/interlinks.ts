// Centralized internal-linking service. Given a class/spec, returns the
// contextually relevant links across the whole site (BiS, talents, best
// race, addons/macros, and the arena comps that contain the class) so
// every guide/BiS page flows authority to the related content.

import { COMPS, compSlug } from "@/data/comps";
import { getBestRace } from "@/data/bestRace";
import { getClass, getSpec } from "@/lib/classes";
import { BIS_REGISTRY } from "@/data/bis/index";
import { getItemSource } from "@/data/itemSources";
import { specIconName } from "@/lib/icons";

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

/** A spec whose BiS list wants a given item, with the icon + link to render. */
export interface WantingSpec {
  classSlug: string;
  specSlug: string;
  className: string;
  specName: string;
  /** zamimg spec icon (talent capstone), the recognition anchor. */
  icon: string;
  href: string;
}

/** An item dropping from a boss, and the specs that list it as BiS. */
export interface BossLootItem {
  itemId: number;
  specs: WantingSpec[];
}

/**
 * The gear a boss drops that actually appears in a best-in-slot list, most-
 * wanted first, each with the specs that run it. This is the gear-first view
 * of the boss→BiS relationship: the item icon is the anchor players recognise,
 * and each spec is a class-icon link into its BiS page.
 *
 * Derived by crossing every filled PvE list for the boss's phase against
 * data/itemSources, so it can never claim a drop the source data doesn't
 * record. Phase-scoped: a Karazhan trinket surfacing in a Phase 5 list is not
 * a reason to file it under a Phase 5 fight.
 */
export function bossLootInBis(
  bossName: string,
  raidPhase: number,
  itemLimit = 10,
  specLimit = 16,
): BossLootItem[] {
  const target = norm(bossName);
  const dropsHere = (id: number) =>
    (getItemSource(id) ?? []).some(
      (src) => src.type === "raid" && src.boss && norm(src.boss) === target,
    );

  // itemId -> ordered, de-duped specs wanting it.
  const byItem = new Map<number, Map<string, WantingSpec>>();

  for (const list of Object.values(BIS_REGISTRY)) {
    if (list.content !== "pve" || list.phase !== raidPhase) continue;
    const found = getSpec(list.class, list.spec);
    if (!found) continue;
    const spec: WantingSpec = {
      classSlug: list.class,
      specSlug: list.spec,
      className: found.cls.name,
      specName: found.spec.name,
      icon: specIconName(list.class, found.spec),
      href: `/${list.class}/${list.spec}/pve/phase-${list.phase}`,
    };
    const ids = new Set(
      list.slots.flatMap((s) => [s.bis.itemId, ...s.alternatives.map((a) => a.itemId)]),
    );
    for (const id of ids) {
      if (!dropsHere(id)) continue;
      if (!byItem.has(id)) byItem.set(id, new Map());
      const specs = byItem.get(id)!;
      if (!specs.has(spec.href)) specs.set(spec.href, spec);
    }
  }

  return [...byItem.entries()]
    .map(([itemId, specs]) => ({
      itemId,
      specs: [...specs.values()].sort((a, b) =>
        `${a.className} ${a.specName}`.localeCompare(`${b.className} ${b.specName}`),
      ),
    }))
    // Most contested drops first — those are the marquee items.
    .sort((a, b) => b.specs.length - a.specs.length)
    .slice(0, itemLimit)
    .map((it) => ({ ...it, specs: it.specs.slice(0, specLimit) }));
}
