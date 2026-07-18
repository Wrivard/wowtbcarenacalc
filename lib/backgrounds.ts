// Page-header background art mapping. Class-specific art exists for
// paladin/priest/rogue/shaman/warlock; the rest use fitting generic
// arena/faction art until dedicated pieces land.

const CLASS_BG: Record<string, string> = {
  paladin: "/images/class-paladin.webp",
  priest: "/images/class-priest.webp",
  rogue: "/images/class-rogue.webp",
  shaman: "/images/class-shaman.webp",
  warlock: "/images/class-warlock.webp",
  warrior: "/images/bg-1.webp", // knight with shield and hammer
  hunter: "/images/bg-4.webp", // horde gate wilds
  mage: "/images/bg-6.webp", // silvermoon spires
  druid: "/images/bg-2.webp", // arena at sunset
};

export const BACKGROUNDS = {
  home: "/images/bg-1.webp",
  classes: "/images/bg-2.webp",
  calculator: "/images/bg-3.webp",
  legal: "/images/bg-8.webp",
} as const;

export function classBackground(classSlug: string): string {
  return CLASS_BG[classSlug] ?? BACKGROUNDS.classes;
}
