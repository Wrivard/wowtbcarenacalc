"use client";

// Scroll-depth milestones.
//
// GA4's enhanced measurement only fires a `scroll` event at 90%, which on a
// long BiS table or comp guide tells you almost nothing — everyone who
// reaches 90% has already read the page. The interesting question for an SEO
// content site is where people STOP, so we report 25/50/75/100 and let the
// distribution answer it.

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/gtag";

const MILESTONES = [25, 50, 75, 100] as const;

export function ScrollDepth() {
  const pathname = usePathname();

  useEffect(() => {
    // Per-path state: the client router keeps the listener alive across
    // navigations, and without this every later page would look pre-read.
    let reached = 0;
    let queued = false;

    function measure() {
      queued = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Pages shorter than the viewport can't be scrolled; reporting 100%
      // for them would drown the real signal in trivially "complete" reads.
      if (scrollable < 200) return;

      const percent = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;
      for (const milestone of MILESTONES) {
        if (percent >= milestone && reached < milestone) {
          reached = milestone;
          trackEvent("scroll_depth", { percent_scrolled: milestone, page_path: pathname });
        }
      }
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(measure);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
