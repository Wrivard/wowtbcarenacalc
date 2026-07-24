"use client";

// Debounced GA4 event for tools driven by typing or rapid toggling.
// Firing on every keystroke would drown the useful signal (and burn
// event quota) — we only care about the state the player settled on.

import { useEffect } from "react";
import { trackEvent, type GtagEventParams } from "@/lib/gtag";

/**
 * Emits `name` once `params` has stopped changing for `delay` ms.
 * Pass `null` while the tool is still empty so an untouched widget never
 * reports a usage event.
 *
 * `params` is compared by value, not identity: call sites build a fresh
 * object every render and a reference dep would re-arm the timer forever.
 */
export function useSettledEvent(
  name: string,
  params: GtagEventParams | null,
  delay = 1200,
) {
  const key = params === null ? null : JSON.stringify(params);
  useEffect(() => {
    if (key === null) return;
    const timer = setTimeout(() => trackEvent(name, JSON.parse(key)), delay);
    return () => clearTimeout(timer);
  }, [name, key, delay]);
}
