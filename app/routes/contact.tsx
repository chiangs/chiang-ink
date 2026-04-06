import { useEffect, useRef } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import type { Route } from "./+types/contact";
import { sendContactEmail } from "~/lib/resend";
import { verifyTurnstile } from "~/lib/turnstile";

// ─── Copy ─────────────────────────────────────────────────────────────────────

const PAGE_TITLE = "Contact — Stephen Chiang";
const SECTION_LABEL = "Contact";
const HEADING = "Let's talk.";
const DESCRIPTION =
  "Available for consulting engagements, advisory roles, and interesting problems. Based in Stavanger, Norway — CET timezone.";
const LABEL_NAME = "Name";
const LABEL_EMAIL = "Email";
const LABEL_MESSAGE = "Message";
const PLACEHOLDER_NAME = "Your name";
const PLACEHOLDER_EMAIL = "your@email.com";
const PLACEHOLDER_MESSAGE = "Tell me what you're working on…";
const LABEL_SUBMIT = "Send Message";
const SUCCESS_MESSAGE = "Message sent — I'll be in touch.";
const ERROR_FIELDS = "Please fill in all required fields.";
const ERROR_EMAIL = "Please enter a valid email address.";
const ERROR_CAPTCHA = "Verification failed. Please try again.";
const ERROR_SEND = "Something went wrong. Please try again later.";

const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js";

// ─── Types ────────────────────────────────────────────────────────────────────

type ActionResult =
  | { status: "success" }
  | { status: "error"; message: string };

type WindowWithTurnstile = typeof window & {
  turnstile?: { reset: (container?: string | HTMLElement) => void };
};

// ─── Loader ───────────────────────────────────────────────────────────────────

export async function loader() {
  return { turnstileSiteKey: process.env.TURNSTILE_SITE_KEY ?? "" };
}

// ─── Action ───────────────────────────────────────────────────────────────────

export async function action({
  request,
}: Route.ActionArgs): Promise<ActionResult> {
  const form = await request.formData();

  // Honeypot — bots fill hidden fields; real users never do
  if (form.get("_honeypot")) return { status: "success" };

  const name = ((form.get("name") as string | null) ?? "").trim();
  const email = ((form.get("email") as string | null) ?? "").trim();
  const message = ((form.get("message") as string | null) ?? "").trim();

  if (!name || !email || !message) {
    return { status: "error", message: ERROR_FIELDS };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: ERROR_EMAIL };
  }

  // Turnstile — verify invisible challenge token
  const token = form.get("cf-turnstile-response") as string | null;
  const verified = await verifyTurnstile(token);
  if (!verified) {
    return { status: "error", message: ERROR_CAPTCHA };
  }

  try {
    await sendContactEmail({ name, email, message });
    return { status: "success" };
  } catch {
    return { status: "error", message: ERROR_SEND };
  }
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

export function meta() {
  return [{ title: PAGE_TITLE }];
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const { turnstileSiteKey } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const isSubmitting = navigation.state === "submitting";

  // Reset form and refresh Turnstile token on successful submission
  useEffect(() => {
    if (actionData?.status !== "success") return;
    formRef.current?.reset();
    (window as WindowWithTurnstile).turnstile?.reset();
  }, [actionData]);

  // Inject Turnstile script once, client-side only
  useEffect(() => {
    if (!turnstileSiteKey) return;
    if (document.querySelector(`script[src*="turnstile"]`)) return;
    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  return (
    <main className="py-section-mob md:py-section">
      <div className="max-w-container mx-auto px-margin-mob md:px-margin">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-text-muted mb-6">
              {SECTION_LABEL}
            </p>
            <h1 className="font-display font-black text-[clamp(40px,6vw,72px)] text-accent leading-[0.95] mb-8">
              {HEADING}
            </h1>
            <p className="text-base text-text-muted leading-[1.75] mb-8">
              {DESCRIPTION}
            </p>
          </div>

          {/* Right — form */}
          <Form
            method="post"
            ref={formRef}
            className="flex flex-col gap-10 bg-card p-10"
          >
            {/* Honeypot — hidden from real users, invisible to screen readers */}
            <input
              type="text"
              name="_honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ display: "none" }}
            />

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium uppercase tracking-[0.15em] text-text-muted">
                {LABEL_NAME}
              </label>
              <input
                type="text"
                name="name"
                required
                className="bg-transparent border-0 border-b border-border-accent text-text-primary text-base py-2 outline-none focus:border-border-accent placeholder:text-text-muted"
                placeholder={PLACEHOLDER_NAME}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium uppercase tracking-[0.15em] text-text-muted">
                {LABEL_EMAIL}
              </label>
              <input
                type="email"
                name="email"
                required
                className="bg-transparent border-0 border-b border-border-accent text-text-primary text-base py-2 outline-none focus:border-border-accent placeholder:text-text-muted"
                placeholder={PLACEHOLDER_EMAIL}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium uppercase tracking-[0.15em] text-text-muted">
                {LABEL_MESSAGE}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="bg-transparent border-0 border-b border-border-accent text-text-primary text-base py-2 outline-none focus:border-border-accent placeholder:text-text-muted resize-none"
                placeholder={PLACEHOLDER_MESSAGE}
              />
            </div>

            {/* Cloudflare Turnstile invisible widget — auto-executes on load */}
            {turnstileSiteKey && (
              <div
                className="cf-turnstile"
                data-sitekey={turnstileSiteKey}
                data-size="invisible"
              />
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-invert-bg text-invert-text font-display font-bold text-sm uppercase tracking-[0.15em] py-4 hover:bg-bg hover:text-accent border border-border-accent transition-colors duration-200"
            >
              {LABEL_SUBMIT}
            </button>

            {actionData?.status === "success" && (
              <p className="font-body text-sm text-accent">{SUCCESS_MESSAGE}</p>
            )}
            {actionData?.status === "error" && (
              <p className="font-body text-sm text-text-muted">
                {actionData.message}
              </p>
            )}
          </Form>
        </div>
      </div>
    </main>
  );
}
