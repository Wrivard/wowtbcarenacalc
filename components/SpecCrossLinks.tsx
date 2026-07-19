// Internal-linking block rendered on every spec page: sibling specs,
// the talent ↔ BiS counterpart, the class calculator, and the arena
// points calculator.

import Link from "next/link";
import type { ClassDef, SpecDef } from "@/lib/classes";

export function SpecCrossLinks({
  cls,
  spec,
  current,
}: {
  cls: ClassDef;
  spec: SpecDef;
  current: "pvp" | "pve" | "talents";
}) {
  const links: { href: string; label: string }[] = [];

  if (current !== "pvp" && spec.pvp)
    links.push({
      href: `/${cls.slug}/${spec.slug}/pvp`,
      label: `${spec.name} ${cls.name} PvP BiS`,
    });
  if (current !== "pve" && spec.pve)
    links.push({
      href: `/${cls.slug}/${spec.slug}/pve/phase-1`,
      label: `${spec.name} ${cls.name} PvE BiS`,
    });
  if (current !== "talents")
    links.push({
      href: `/${cls.slug}/${spec.slug}/talents`,
      label: `${spec.name} ${cls.name} talents`,
    });
  links.push({
    href: `/talent-calculator/${cls.slug}`,
    label: `${cls.name} talent calculator`,
  });
  for (const sibling of cls.specs.filter((s) => s.slug !== spec.slug)) {
    links.push({
      href: `/${cls.slug}/${sibling.slug}${current === "talents" ? "/talents" : sibling.pvp ? "/pvp" : "/pve/phase-1"}`,
      label: `${sibling.name} ${cls.name}`,
    });
  }
  links.push({
    href: "/arena-points-calculator",
    label: "Arena points calculator",
  });

  return (
    <nav aria-label="Related guides" className="mt-12 border-t border-border pt-8">
      <h2 className="text-[11px] font-medium tracking-widest text-muted uppercase">
        Related
      </h2>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-sm text-muted-strong transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
