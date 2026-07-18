"use client";

// Dashboard-style metric card: small uppercase label, large mono value,
// subtle context line. Numbers count up quickly on change unless the
// user prefers reduced motion.

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useCountUp(target: number | null, durationMs = 250) {
  const [display, setDisplay] = useState<number | null>(target);
  const displayRef = useRef<number | null>(target);

  // All display updates happen inside rAF callbacks — never directly in
  // the effect body — so jumps (to/from empty) cost at most one frame.
  useEffect(() => {
    const from = displayRef.current;
    if (from === target) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const animate = from !== null && target !== null && !reduced;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = animate ? Math.min(1, (now - start) / durationMs) : 1;
      const eased = 1 - (1 - t) * (1 - t);
      const value =
        t >= 1 || target === null || from === null
          ? target
          : Math.round(from + (target - from) * eased);
      displayRef.current = value;
      setDisplay(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return display;
}

export function ResultCard({
  label,
  value,
  context,
  highlighted = false,
  className,
}: {
  label: string;
  value: number | null;
  context?: string;
  highlighted?: boolean;
  className?: string;
}) {
  const display = useCountUp(value);

  return (
    <div
      className={cn(
        "rounded-xl border bg-surface p-4 transition-colors sm:p-5",
        highlighted
          ? "border-accent/40 ring-1 ring-accent/20"
          : "border-border",
        className,
      )}
    >
      <div className="text-[11px] font-medium tracking-widest text-muted uppercase">
        {label}
      </div>
      <div
        className={cn(
          "mt-2 font-mono text-3xl tabular-nums sm:text-4xl",
          value === null
            ? "text-muted/50"
            : highlighted
              ? "text-accent"
              : "text-foreground",
        )}
      >
        {display === null ? "—" : display.toLocaleString("en-US")}
      </div>
      {context && (
        <div className="mt-1.5 text-xs text-muted">{context}</div>
      )}
    </div>
  );
}
