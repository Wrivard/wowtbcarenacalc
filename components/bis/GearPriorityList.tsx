// "What to buy first" ordered checklist. High-value for
// "what gear to get first tbc <spec>" searches.

import { getGearPriority } from "@/data/gearPriority";
import type { Role } from "@/lib/classes";
import { GearChecklist } from "@/components/bis/GearChecklist";

export function GearPriorityList({
  classSlug,
  role,
  content,
  specName,
  className,
}: {
  classSlug: string;
  role: Role;
  content: "pvp" | "pve";
  specName: string;
  className?: string;
}) {
  const steps = getGearPriority(classSlug, role, content);
  if (steps.length === 0) return null;

  return (
    <section className={className} aria-label={`${specName} gear priority`}>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        What to buy first ({content === "pvp" ? "arena" : "raid"})
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        Tick each step as you go — your progress is saved on this device.
      </p>
      <GearChecklist
        steps={steps}
        storageKey={`gear-checklist:${classSlug}:${role}:${content}`}
      />
    </section>
  );
}
