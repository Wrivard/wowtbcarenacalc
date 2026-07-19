// Single source of truth for the class/spec matrix. Every programmatic
// route, sitemap entry, metadata template, and internal link generates
// from this file.

export type Role = "Healer" | "Melee DPS" | "Ranged DPS" | "Tank";

export interface SpecDef {
  slug: string; // url segment, e.g. "beast-mastery"
  name: string; // display name, e.g. "Beast Mastery"
  role: Role;
  /** index of the talent tree this spec centers on (0..2 in data/talents) */
  treeIndex: number;
  pvp: boolean;
  pve: boolean;
}

export interface ClassDef {
  slug: string; // url segment, e.g. "shaman"
  name: string; // display name, e.g. "Shaman"
  /** wowhead-style class color for subtle accents if ever needed */
  color: string;
  specs: SpecDef[];
}

export const CLASSES: ClassDef[] = [
  {
    slug: "warrior",
    name: "Warrior",
    color: "#C79C6E",
    specs: [
      { slug: "arms", name: "Arms", role: "Melee DPS", treeIndex: 0, pvp: true, pve: true },
      { slug: "fury", name: "Fury", role: "Melee DPS", treeIndex: 1, pvp: true, pve: true },
      { slug: "protection", name: "Protection", role: "Tank", treeIndex: 2, pvp: true, pve: true },
    ],
  },
  {
    slug: "paladin",
    name: "Paladin",
    color: "#F58CBA",
    specs: [
      { slug: "holy", name: "Holy", role: "Healer", treeIndex: 0, pvp: true, pve: true },
      { slug: "protection", name: "Protection", role: "Tank", treeIndex: 1, pvp: false, pve: true },
      { slug: "retribution", name: "Retribution", role: "Melee DPS", treeIndex: 2, pvp: true, pve: true },
    ],
  },
  {
    slug: "hunter",
    name: "Hunter",
    color: "#ABD473",
    specs: [
      { slug: "beast-mastery", name: "Beast Mastery", role: "Ranged DPS", treeIndex: 0, pvp: true, pve: true },
      { slug: "marksmanship", name: "Marksmanship", role: "Ranged DPS", treeIndex: 1, pvp: true, pve: true },
      { slug: "survival", name: "Survival", role: "Ranged DPS", treeIndex: 2, pvp: true, pve: true },
    ],
  },
  {
    slug: "rogue",
    name: "Rogue",
    color: "#FFF569",
    specs: [
      { slug: "combat", name: "Combat", role: "Melee DPS", treeIndex: 1, pvp: true, pve: true },
      { slug: "assassination", name: "Assassination", role: "Melee DPS", treeIndex: 0, pvp: false, pve: true },
      { slug: "subtlety", name: "Subtlety", role: "Melee DPS", treeIndex: 2, pvp: true, pve: true },
    ],
  },
  {
    slug: "priest",
    name: "Priest",
    color: "#FFFFFF",
    specs: [
      { slug: "discipline", name: "Discipline", role: "Healer", treeIndex: 0, pvp: true, pve: true },
      { slug: "holy", name: "Holy", role: "Healer", treeIndex: 1, pvp: true, pve: true },
      { slug: "shadow", name: "Shadow", role: "Ranged DPS", treeIndex: 2, pvp: true, pve: true },
    ],
  },
  {
    slug: "shaman",
    name: "Shaman",
    color: "#0070DE",
    specs: [
      { slug: "elemental", name: "Elemental", role: "Ranged DPS", treeIndex: 0, pvp: true, pve: true },
      { slug: "enhancement", name: "Enhancement", role: "Melee DPS", treeIndex: 1, pvp: true, pve: true },
      { slug: "restoration", name: "Restoration", role: "Healer", treeIndex: 2, pvp: true, pve: true },
    ],
  },
  {
    slug: "mage",
    name: "Mage",
    color: "#69CCF0",
    specs: [
      { slug: "arcane", name: "Arcane", role: "Ranged DPS", treeIndex: 0, pvp: true, pve: true },
      { slug: "fire", name: "Fire", role: "Ranged DPS", treeIndex: 1, pvp: false, pve: true },
      { slug: "frost", name: "Frost", role: "Ranged DPS", treeIndex: 2, pvp: true, pve: true },
    ],
  },
  {
    slug: "warlock",
    name: "Warlock",
    color: "#9482C9",
    specs: [
      { slug: "affliction", name: "Affliction", role: "Ranged DPS", treeIndex: 0, pvp: true, pve: true },
      { slug: "demonology", name: "Demonology", role: "Ranged DPS", treeIndex: 1, pvp: true, pve: true },
      { slug: "destruction", name: "Destruction", role: "Ranged DPS", treeIndex: 2, pvp: true, pve: true },
    ],
  },
  {
    slug: "druid",
    name: "Druid",
    color: "#FF7D0A",
    specs: [
      { slug: "balance", name: "Balance", role: "Ranged DPS", treeIndex: 0, pvp: true, pve: true },
      { slug: "feral-bear", name: "Feral (Bear)", role: "Tank", treeIndex: 1, pvp: false, pve: true },
      { slug: "feral-cat", name: "Feral (Cat)", role: "Melee DPS", treeIndex: 1, pvp: true, pve: true },
      { slug: "restoration", name: "Restoration", role: "Healer", treeIndex: 2, pvp: true, pve: true },
    ],
  },
];

export const PHASES = [1, 2, 3, 4, 5] as const;
export type Phase = (typeof PHASES)[number];

export const PHASE_LABELS: Record<Phase, string> = {
  1: "Karazhan / Gruul / Magtheridon",
  2: "Serpentshrine Cavern / Tempest Keep",
  3: "Black Temple / Hyjal",
  4: "Zul'Aman",
  5: "Sunwell Plateau",
};

export function getClass(classSlug: string): ClassDef | undefined {
  return CLASSES.find((c) => c.slug === classSlug);
}

export function getSpec(
  classSlug: string,
  specSlug: string,
): { cls: ClassDef; spec: SpecDef } | undefined {
  const cls = getClass(classSlug);
  const spec = cls?.specs.find((s) => s.slug === specSlug);
  return cls && spec ? { cls, spec } : undefined;
}

export function allSpecs(): { cls: ClassDef; spec: SpecDef }[] {
  return CLASSES.flatMap((cls) => cls.specs.map((spec) => ({ cls, spec })));
}
