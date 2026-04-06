// Calls the Resend REST API directly — no SDK, no @react-email/render peer dependency.
// contact.chiang.ink must be verified as a sender domain in the Resend dashboard.

const RESEND_API = "https://api.resend.com/emails";
const SUBJECT = "contact from chiang.ink";

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;

  if (!apiKey) throw new Error("RESEND_API_KEY environment variable is not set");
  if (!from) throw new Error("CONTACT_FROM environment variable is not set");
  if (!to) throw new Error("CONTACT_TO environment variable is not set");

  const res = await fetch(RESEND_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: SUBJECT,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(body.message ?? `Resend API error ${res.status}`);
  }
}
