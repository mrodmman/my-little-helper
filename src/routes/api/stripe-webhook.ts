/**
 * POST /api/stripe-webhook
 * Handles Stripe webhook events.
 * - checkout.session.completed → provision Vault account + send access email
 */
import { createFileRoute } from "@tanstack/react-router";
import { getEnv } from "@/lib/env";
import { hashPassword, ensureAuthSchema } from "@/lib/auth";

export const Route = createFileRoute("/api/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();

        const rawBody = await request.text();
        const sig = request.headers.get("stripe-signature");

        if (!sig) {
          return json({ error: "Missing Stripe-Signature header" }, 400);
        }

        const valid = await verifyStripeSignature(rawBody, sig, env.STRIPE_WEBHOOK_SECRET);
        if (!valid) {
          return json({ error: "Invalid signature" }, 400);
        }

        let event: StripeEvent;
        try {
          event = JSON.parse(rawBody) as StripeEvent;
        } catch {
          return json({ error: "Invalid JSON" }, 400);
        }

        if (event.type === "checkout.session.completed") {
          await handleCheckoutComplete(event.data.object, env);
        }

        return json({ received: true });
      },
    },
  },
});

// ── Stripe webhook signature verification (Web Crypto, no SDK needed) ─────────

async function verifyStripeSignature(
  payload: string,
  header: string,
  secret: string,
): Promise<boolean> {
  try {
    const parts: Record<string, string> = {};
    for (const chunk of header.split(",")) {
      const [k, v] = chunk.split("=");
      parts[k] = v;
    }
    const timestamp = parts["t"];
    const sig = parts["v1"];
    if (!timestamp || !sig) return false;

    // Reject events older than 5 minutes
    if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

    const signed = `${timestamp}.${payload}`;
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signed));
    const computed = Array.from(new Uint8Array(mac))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return timingSafeEqual(computed, sig);
  } catch {
    return false;
  }
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ── Provision account after successful payment ─────────────────────────────────

interface CheckoutSession {
  customer_details?: { email?: string; name?: string };
  customer_email?: string;
  metadata?: Record<string, string>;
}

async function handleCheckoutComplete(session: CheckoutSession, env: Awaited<ReturnType<typeof getEnv>>) {
  const email = (session.customer_details?.email ?? session.customer_email ?? "").trim().toLowerCase();
  if (!email) return;

  const rawName = session.customer_details?.name ?? "";
  const firstName = rawName.split(" ")[0] || null;

  await ensureAuthSchema(env);

  // Remove from drip if they were a lead
  await env.DB.prepare("UPDATE drip_subscribers SET status = 'unsubscribed' WHERE email = ?")
    .bind(email)
    .run();

  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first<{ id: string }>();

  if (existing) {
    // Upgrade role in case they had a free account
    await env.DB.prepare("UPDATE users SET role = 'paid' WHERE id = ?")
      .bind(existing.id)
      .run();
    await sendAccessEmail(email, firstName, null, env);
    return;
  }

  const tempPassword = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  const id = crypto.randomUUID();
  const passwordHash = await hashPassword(tempPassword);
  const nowSec = Math.floor(Date.now() / 1000);

  await env.DB.prepare(
    "INSERT INTO users (id, email, password_hash, first_name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)",
  )
    .bind(id, email, passwordHash, firstName, "paid", nowSec)
    .run();

  await sendAccessEmail(email, firstName, tempPassword, env);
}

async function sendAccessEmail(
  email: string,
  firstName: string | null,
  tempPassword: string | null,
  env: Awaited<ReturnType<typeof getEnv>>,
) {
  const greeting = firstName ? `Hi ${firstName},` : "Hi,";
  const credBlock = tempPassword
    ? `<p><strong>Email:</strong> ${email}<br><strong>Temporary password:</strong> ${tempPassword}</p>
<p>Change your password after your first sign-in.</p>`
    : `<p>Sign in with your existing email and password.</p>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
      to: email,
      subject: "Your Kraken Vault access is ready 🔓",
      html: `<p>${greeting}</p>
<p>Payment confirmed — your Kraken Vault account is live.</p>
<p>Sign in at <a href="https://keyboardkraken.kbkcompanies.com/login">keyboardkraken.kbkcompanies.com/login</a>:</p>
${credBlock}
<p>Welcome to the Vault. — Matt</p>`,
    }),
  });
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface StripeEvent {
  type: string;
  data: { object: CheckoutSession };
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
