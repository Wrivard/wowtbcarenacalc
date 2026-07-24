"use client";

// Contact form. Posts to the sendContactMessage Server Action, so it works
// without client JS too (React falls back to a native form POST); the hook
// only adds inline errors and the pending state.

import { useActionState } from "react";
import { Check, Loader2, Send, TriangleAlert } from "lucide-react";
import { sendContactMessage } from "@/app/contact/actions";
import { CONTACT_INITIAL, MAX_MESSAGE, TOPICS } from "@/app/contact/shared";

const FIELD =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium tracking-wide text-muted-strong">
      {children}
      {optional && <span className="ml-1.5 text-muted">optional</span>}
    </label>
  );
}

function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-rose-400">{children}</p>;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, CONTACT_INITIAL);

  if (state.ok) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.06] p-5">
        <Check className="mt-0.5 size-5 shrink-0 text-emerald-400" aria-hidden />
        <p className="text-sm leading-relaxed text-emerald-200/90" role="status">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-xl border border-border bg-surface/40 p-5">
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" optional>
            Name or character
          </Label>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name or main character" className={FIELD} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(state.errors?.email)}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={FIELD}
          />
          <span id="email-error">
            <FieldError>{state.errors?.email}</FieldError>
          </span>
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="topic">What is this about?</Label>
        <select id="topic" name="topic" defaultValue={TOPICS[0]} className={FIELD}>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          maxLength={MAX_MESSAGE}
          placeholder="Reporting a points discrepancy? Include your bracket, team rating at reset, and the points you actually received. For BiS or talent data, link the page and describe what looks off."
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={`${FIELD} resize-y leading-relaxed`}
        />
        <span id="message-error">
          <FieldError>{state.errors?.message}</FieldError>
        </span>
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-amber-400">
          <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
