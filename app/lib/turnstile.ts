const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Cloudflare Turnstile token server-side.
 * Returns true on success.
 * In non-production environments without a configured secret key, skips
 * verification and returns true so local dev works without credentials.
 */
export async function verifyTurnstile(
  token: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV !== "production") return true;
    throw new Error("TURNSTILE_SECRET_KEY environment variable is not set");
  }

  if (!token) return false;

  const res = await fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });

  if (!res.ok) return false;

  const data = (await res.json()) as { success: boolean };
  return data.success;
}
