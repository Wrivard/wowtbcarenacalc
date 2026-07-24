"use client";

// Core feature 3 (Phase 2 shell): gear checklist. Selecting items sums
// their arena point cost; combined with the calculator's points/week it
// estimates weeks to afford. Dataset lives in data/gear.ts (placeholder
// seed — see the TODO there).

import { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, ChevronDown, RotateCcw } from "lucide-react";
import { GEAR_ITEMS, GEAR_SECTIONS } from "@/data/gear";
import { useRatings } from "@/components/calculator/ratings-context";
import { useSettledEvent } from "@/lib/useSettledEvent";

export function GearPlanner() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { best } = useRatings();

  const totalCost = useMemo(
    () =>
      GEAR_ITEMS.filter((i) => selected.has(i.id)).reduce(
        (sum, i) => sum + i.arenaPointCost,
        0,
      ),
    [selected],
  );

  const perWeek = best?.points ?? null;
  const weeks =
    perWeek !== null && perWeek > 0 && totalCost > 0
      ? Math.ceil(totalCost / perWeek)
      : null;

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Ticking a shopping list is a burst of clicks, not one decision — report
  // the basket the player settled on, not each item.
  useSettledEvent(
    "gear_planner_used",
    selected.size === 0
      ? null
      : {
          items_selected: selected.size,
          total_cost: totalCost,
          // Only meaningful once the calculator above has a rating in it;
          // its absence is itself the signal that the two tools aren't
          // being used together.
          weeks_to_afford: weeks ?? undefined,
        },
  );

  return (
    <div>
      <Accordion.Root type="multiple" className="overflow-hidden rounded-xl border border-border">
        {GEAR_SECTIONS.map((section) => {
          const items = GEAR_ITEMS.filter((i) => i.section === section);
          return (
            <Accordion.Item
              key={section}
              value={section}
              className="border-b border-border last:border-b-0"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between bg-surface px-4 py-3.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-surface-hover">
                  {section}
                  <ChevronDown
                    className="size-4 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="accordion-content overflow-hidden bg-background">
                <ul className="px-2 py-2">
                  {items.map((item) => (
                    <li key={item.id}>
                      <label className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-surface">
                        <Checkbox.Root
                          checked={selected.has(item.id)}
                          onCheckedChange={() => toggle(item.id)}
                          className="flex size-4.5 shrink-0 items-center justify-center rounded border border-border-strong bg-surface transition-colors data-[state=checked]:border-accent data-[state=checked]:bg-accent"
                        >
                          <Checkbox.Indicator>
                            <Check className="size-3 text-black" strokeWidth={3} />
                          </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="flex-1 text-sm text-muted-strong">
                          {item.name}
                        </span>
                        <span className="font-mono text-sm tabular-nums text-muted">
                          {item.arenaPointCost.toLocaleString("en-US")}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>

      {/* Totals */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <div>
          <div className="text-[11px] font-medium tracking-widest text-muted uppercase">
            Total cost
          </div>
          <div className="mt-1 font-mono text-2xl tabular-nums">
            {totalCost.toLocaleString("en-US")}{" "}
            <span className="text-sm text-muted">pts</span>
          </div>
          <div className="mt-1 text-xs text-muted">
            {weeks !== null
              ? `≈ ${weeks} week${weeks === 1 ? "" : "s"} at ${perWeek?.toLocaleString("en-US")} pts/week`
              : perWeek === null
                ? "Enter a rating above to estimate weeks to afford"
                : "Select items to estimate weeks to afford"}
          </div>
        </div>
        <button
          onClick={() => setSelected(new Set())}
          disabled={selected.size === 0}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-strong transition-colors hover:bg-surface-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Clear selections
        </button>
      </div>
    </div>
  );
}
