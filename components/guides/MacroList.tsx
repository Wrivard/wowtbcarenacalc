"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { Macro, MacroCategory } from "@/data/macros";
import { trackEvent } from "@/lib/gtag";

const CATEGORY_LABEL: Record<MacroCategory, string> = {
  focus: "Focus macros",
  arena: "Arena target macros",
  offensive: "Offensive",
  defensive: "Defensive",
  utility: "Utility",
};

const CATEGORY_ORDER: MacroCategory[] = [
  "focus",
  "arena",
  "offensive",
  "defensive",
  "utility",
];

function MacroCard({ macro }: { macro: Macro }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(macro.code);
      setCopied(true);
      trackEvent("macro_copied", { macro: macro.name, class: macro.class });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked — no-op; the code is visible to copy manually.
    }
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-semibold text-foreground">{macro.name}</h4>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${macro.name} macro`}
          className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-xs text-muted-strong transition-colors hover:text-foreground"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-accent" /> Copied
            </>
          ) : (
            <>
              <Copy className="size-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">{macro.description}</p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-background p-3 font-mono text-xs leading-relaxed text-muted-strong">
        {macro.code}
      </pre>
    </div>
  );
}

export function MacroList({ macros }: { macros: Macro[] }) {
  if (macros.length === 0) return null;
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: macros.filter((m) => m.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      {byCategory.map(({ cat, items }) => (
        <div key={cat}>
          <h3 className="font-mono text-[11px] tracking-wider text-muted uppercase">
            {CATEGORY_LABEL[cat]}
          </h3>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {items.map((m) => (
              <MacroCard key={m.name} macro={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
