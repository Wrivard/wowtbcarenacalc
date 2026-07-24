"use server";

// Contact-form Server Action. Posts through Resend's REST API directly —
// no SDK dependency, one fetch. RESEND_API_KEY never reaches the client:
// this module is server-only and the key is read at call time.
//
// Env (all optional — without RESEND_API_KEY the form says so instead of
// pretending to send):
//   RESEND_API_KEY      re_… from https://resend.com/api-keys
//   CONTACT_TO_EMAIL    inbox that receives the messages
//   CONTACT_FROM_EMAIL  sender. Must be on a domain verified in Resend —
//                       defaults to bonjour@kua.quebec, which is.

import { MAX_MESSAGE, type ContactState } from "@/app/contact/shared";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(formData: FormData, name: string): string {
  const v = formData.get(name);
  return typeof v === "string" ? v.trim() : "";
}

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a real person never fills a hidden field. Report success so
  // the bot doesn't learn to retry.
  if (field(formData, "website"))
    return { ok: true, message: "Thanks — your message is on its way." };

  const name = field(formData, "name");
  const email = field(formData, "email");
  const topic = field(formData, "topic");
  const message = field(formData, "message");

  const errors: Record<string, string> = {};
  if (!EMAIL_RE.test(email))
    errors.email = "Enter an email address so a reply can reach you.";
  if (message.length < 10)
    errors.message = "Add a little more detail (10 characters minimum).";
  else if (message.length > MAX_MESSAGE)
    errors.message = `Keep it under ${MAX_MESSAGE} characters.`;
  if (Object.keys(errors).length)
    return { ok: false, message: "Please fix the fields below.", errors };

  if (!process.env.RESEND_API_KEY) {
    return {
      ok: false,
      message:
        "The contact form isn't configured on this deployment yet. Sorry — please try again later.",
    };
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "bonjour@kua.quebec";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "WoW TBC Arena <bonjour@kua.quebec>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[wowtbcarena] ${topic || "Message"} — ${name || email}`,
        text: [
          `From: ${name || "(no name)"} <${email}>`,
          `Topic: ${topic || "(none)"}`,
          "",
          message,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      // Resend's error text is useful in the logs but must not reach the
      // page — it echoes API-key and domain-verification state.
      console.error("[contact] resend %d: %s", res.status, await res.text());
      return { ok: false, message: "Sending failed. Please try again in a moment." };
    }
  } catch (err) {
    console.error("[contact] resend request failed", err);
    return { ok: false, message: "Sending failed. Please try again in a moment." };
  }

  return {
    ok: true,
    message:
      "Thanks — your message is on its way. Replies go to the address you gave.",
  };
}
