// Shared contact-form types/constants. Kept out of actions.ts because a
// "use server" module may only export async functions — exporting these
// values from there is a build error.

export const TOPICS = [
  "Arena points calculation looks wrong",
  "BiS or talent data issue",
  "Bug or broken page",
  "Feature request",
  "Other",
] as const;

export interface ContactState {
  ok: boolean;
  message: string;
  /** Field name → error, for inline messages. */
  errors?: Record<string, string>;
}

export const CONTACT_INITIAL: ContactState = { ok: false, message: "" };

export const MAX_MESSAGE = 4000;
