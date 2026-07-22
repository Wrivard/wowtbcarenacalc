// Stat-caps table rendered below the stat priority on every BiS page.
// High-value SEO content ("hit cap tbc", "resilience cap tbc arena").

import { getStatCaps } from "@/data/caps";
import type { Role } from "@/lib/classes";

export function StatCaps({
  classSlug,
  specSlug,
  role,
  content,
  specName,
  className,
}: {
  classSlug: string;
  specSlug: string;
  role: Role;
  content: "pvp" | "pve";
  specName: string;
  className?: string;
}) {
  const caps = getStatCaps(classSlug, specSlug, role, content);
  if (caps.length === 0) return null;

  return (
    <section className={className} aria-label={`${specName} stat caps`}>
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        Stat caps ({content === "pvp" ? "arena" : "raid"})
      </h3>
      <div className="mt-3 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-3 py-2 font-mono text-[10px] tracking-wider text-muted uppercase sm:px-4">
                Stat
              </th>
              <th className="px-3 py-2 font-mono text-[10px] tracking-wider text-muted uppercase">
                Cap
              </th>
              <th className="hidden px-3 py-2 font-mono text-[10px] tracking-wider text-muted uppercase sm:table-cell sm:px-4">
                Why
              </th>
            </tr>
          </thead>
          <tbody>
            {caps.map((c) => (
              <tr
                key={c.stat}
                className="border-b border-border bg-surface last:border-b-0 align-top"
              >
                <td className="px-3 py-2.5 font-medium text-foreground sm:px-4">
                  {c.stat}
                </td>
                <td className="px-3 py-2.5 font-mono whitespace-nowrap tabular-nums text-accent">
                  {c.cap > 0 ? `${c.cap} ${c.unit}` : "—"}
                </td>
                <td className="hidden px-3 py-2.5 text-xs leading-relaxed text-muted-strong sm:table-cell sm:px-4">
                  {c.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Notes stack under each row on mobile (Why column is hidden there). */}
      <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted sm:hidden">
        {caps.map((c) => (
          <li key={c.stat}>
            <span className="font-medium text-muted-strong">{c.stat}:</span>{" "}
            {c.note}
          </li>
        ))}
      </ul>
    </section>
  );
}
