// "What to buy first" ordered checklist. High-value for
// "what gear to get first tbc <spec>" searches.

import { getGearPriority } from "@/data/gearPriority";
import type { Role } from "@/lib/classes";

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
      <ol className="mt-4 space-y-3">
        {steps.map((s) => (
          <li key={s.step} className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-faint font-mono text-xs font-semibold text-accent">
              {s.step}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{s.label}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-strong">
                {s.reason}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
