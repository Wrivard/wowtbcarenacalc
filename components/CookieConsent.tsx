"use client";

// Cookie consent (GDPR / Quebec Law 25). Non-essential scripts —
// Google Analytics 4 and Google AdSense — are mounted ONLY after the
// user grants consent. The choice persists in localStorage and can be
// revisited from the footer ("Cookie settings").

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

export type ConsentStatus = "unset" | "granted" | "denied";

const STORAGE_KEY = "wowtbc-cookie-consent";
const CHANGE_EVENT = "wowtbc-consent-change";

// localStorage as an external store: the server snapshot is "denied" so
// scripts never render during SSR; the client snapshot reflects the
// stored choice ("unset" shows the banner after hydration).
function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): ConsentStatus {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "granted" || stored === "denied" ? stored : "unset";
}

function getServerSnapshot(): ConsentStatus {
  return "denied";
}

function writeConsent(value: string | null) {
  if (value === null) window.localStorage.removeItem(STORAGE_KEY);
  else window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

type ConsentContextValue = {
  status: ConsentStatus;
  grant: () => void;
  deny: () => void;
  reopen: () => void;
};

const ConsentContext = createContext<ConsentContextValue>({
  status: "unset",
  grant: () => {},
  deny: () => {},
  reopen: () => {},
});

export function useConsent() {
  return useContext(ConsentContext);
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const grant = useCallback(() => writeConsent("granted"), []);
  const deny = useCallback(() => writeConsent("denied"), []);
  const reopen = useCallback(() => writeConsent(null), []);

  return (
    <ConsentContext.Provider value={{ status, grant, deny, reopen }}>
      {children}
      {status === "unset" && <ConsentBanner />}
    </ConsentContext.Provider>
  );
}

function ConsentBanner() {
  const { grant, deny } = useConsent();
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md rounded-xl border border-border bg-surface p-4 shadow-lg shadow-black/40 sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <p className="text-sm leading-relaxed text-muted-strong">
        We use cookies for analytics and ads to keep this tool free. No
        tracking loads unless you accept.{" "}
        <a
          href="/privacy-policy"
          className="text-accent underline-offset-2 hover:underline"
        >
          Privacy policy
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={grant}
          className="flex-1 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-black transition-colors hover:bg-accent-dim"
        >
          Accept
        </button>
        <button
          onClick={deny}
          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm text-muted-strong transition-colors hover:bg-surface-hover"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
