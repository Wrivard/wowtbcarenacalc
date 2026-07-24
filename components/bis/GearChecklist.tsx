"use client";

// Interactive "what to buy first" checklist. Ticking a step persists to
// localStorage (keyed per spec/content) and the next unticked step is
// highlighted, so returning players resume where they left off.

import { useEffect, useState } from "react";
import { useSettledEvent } from "@/lib/useSettledEvent";

export interface ChecklistStep {
  step: number;
  label: string;
  reason: string;
}

export function GearChecklist({
  steps,
  storageKey,
}: {
  steps: ChecklistStep[];
  storageKey: string;
}) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      // ignore corrupt/blocked storage
    }
    setHydrated(true);
  }, [storageKey]);

  const toggle = (step: number) => {
    setTouched(true);
    setDone((prev) => {
      const next = { ...prev, [step]: !prev[step] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const doneCount = steps.filter((s) => done[s.step]).length;

  // Gated on `touched`, not on doneCount: restoring saved progress from
  // localStorage on load would otherwise report a fresh usage event on every
  // return visit, inflating the tool's numbers with pure page views.
  useSettledEvent(
    "checklist_progress",
    touched
      ? { list: storageKey, steps_done: doneCount, steps_total: steps.length }
      : null,
  );
  // The first not-yet-done step gets the "up next" highlight (only after
  // hydration, so SSR and first paint stay identical).
  const nextStep =
    hydrated && doneCount < steps.length
      ? steps.find((s) => !done[s.step])?.step
      : undefined;

  return (
    <>
      <div className="mt-2 flex items-center gap-3">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface"
          role="progressbar"
          aria-valuenow={doneCount}
          aria-valuemin={0}
          aria-valuemax={steps.length}
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300"
            style={{ width: `${(doneCount / steps.length) * 100}%` }}
          />
        </div>
        <span className="shrink-0 font-mono text-xs text-muted tabular-nums">
          {doneCount}/{steps.length}
        </span>
      </div>

      <ol className="mt-4 space-y-2">
        {steps.map((s) => {
          const isDone = Boolean(done[s.step]);
          const isNext = s.step === nextStep;
          return (
            <li key={s.step}>
              <button
                type="button"
                onClick={() => toggle(s.step)}
                aria-pressed={isDone}
                className={`flex w-full gap-3 rounded-xl border p-3 text-left transition-colors ${
                  isNext
                    ? "border-accent/50 bg-accent-faint"
                    : "border-border bg-surface hover:border-border-strong"
                }`}
              >
                <span
                  aria-hidden
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold ${
                    isDone
                      ? "border-accent bg-accent text-background"
                      : "border-border text-muted"
                  }`}
                >
                  {isDone ? "✓" : s.step}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-sm font-medium ${
                      isDone ? "text-muted line-through" : "text-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-strong">
                    {s.reason}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </>
  );
}
