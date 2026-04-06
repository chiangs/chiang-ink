import { Resend } from "resend";

// chiang.ink domain must be verified in Resend dashboard before deploying.
// DNS records: SPF, DKIM, DMARC on chiang.ink.

const SUBJECT = "contact from chiang.ink";

let _client: Resend | null = null;

function getClient(): Resend {
  if (!_client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY environment variable is not set");
    _client = new Resend(key);
  }
  return _client;
}

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  if (!from) throw new Error("CONTACT_FROM environment variable is not set");
  if (!to) throw new Error("CONTACT_TO environment variable is not set");

  const { error } = await getClient().emails.send({
    from,
    to,
    replyTo: email,
    subject: SUBJECT,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) throw new Error(error.message);
}
