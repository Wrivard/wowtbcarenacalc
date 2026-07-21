"use client";

// Class picker for the single-page talent calculator. Changing the class
// navigates to /talent-calculator?class=<slug> (which re-renders the tree
// for that class), so one page + this filter replaces the old per-class
// pages. Styled to match the calculator's dark UI, with class icons.

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { CLASSES } from "@/lib/classes";
import { classIconName } from "@/lib/icons";
import { GameIcon } from "@/components/GameIcon";
import { cn } from "@/lib/utils";

export function ClassSelect({ value }: { value: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = CLASSES.find((c) => c.slug === value) ?? CLASSES[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const pick = (slug: string) => {
    setOpen(false);
    if (slug !== value) router.push(`/talent-calculator?class=${slug}`, { scroll: false });
  };

  return (
    <div className="max-w-xs">
      <label className="mb-1.5 block text-xs font-medium tracking-wide text-muted">
        Class
      </label>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-surface px-3 py-2.5 text-left transition-colors hover:border-border-strong"
        >
          <GameIcon icon={classIconName(current.slug)} alt="" size="small" className="rounded" />
          <span className="text-sm font-semibold" style={{ color: current.color }}>
            {current.name}
          </span>
          <ChevronDown
            className={cn("ml-auto size-4 text-muted transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </button>
        {open && (
          <ul
            role="listbox"
            className="absolute left-0 z-40 mt-2 max-h-80 w-full overflow-auto rounded-lg border border-border bg-surface py-1 shadow-xl"
          >
            {CLASSES.map((cls) => (
              <li key={cls.slug}>
                <button
                  type="button"
                  role="option"
                  aria-selected={cls.slug === value}
                  onClick={() => pick(cls.slug)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-surface-hover",
                    cls.slug === value && "bg-surface-hover",
                  )}
                >
                  <GameIcon icon={classIconName(cls.slug)} alt="" size="small" className="rounded" />
                  <span className="font-medium" style={{ color: cls.color }}>
                    {cls.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
