import { createFileRoute } from "@tanstack/react-router";
import { getEnv } from "@/lib/env";

export const Route = createFileRoute("/api/subscribe-vault")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();

        let body: { email?: string; drop_slug?: string; drop_title?: string };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const email = body.email?.trim().toLowerCase();
        if (!email) {
          return new Response(JSON.stringify({ error: "email required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // Save to drip_subscribers (ignore if already exists)
        try {
          const id = `vault-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
          await env.DB.prepare(
            `INSERT INTO drip_subscribers (id, email, status, subscribed_at)
             VALUES (?, ?, 'active', ?)
             ON CONFLICT(email) DO NOTHING`,
          )
            .bind(id, email, Date.now())
            .run();
        } catch {
          // Non-blocking — don't fail the request over a DB insert
        }

        // Send confirmation email with link back to the kit.
        // TODO: Once you've created the template in Resend and run the vault-unlock
        // workflow, replace this block with template_id + variables:
        //   template_id: "YOUR-RESEND-TEMPLATE-UUID",
        //   variables: { drop_title: dropTitle, drop_url: dropUrl, email, first_name: "" }
        const dropSlug = body.drop_slug ?? "";
        const dropTitle = body.drop_title ?? "Your Starter Kit";
        const dropUrl = `https://keyboardkraken.kbkcompanies.com/starter-vault/${dropSlug}`;

        try {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
              to: email,
              subject: `Your free kit: ${dropTitle}`,
              html: `
<p>Hi,</p>
<p>Here's your free Starter Vault kit — <strong>${dropTitle}</strong>.</p>
<p>It includes the full AI build prompt, file structure, setup steps, and edit map so you can ship the whole thing in one session.</p>
<p>
  <a href="${dropUrl}" style="display:inline-block;background:#2563FF;color:#fff;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;">
    Open Your Kit →
  </a>
</p>
<p>You've also unlocked every other kit in the Starter Vault — no paywall, no catch.</p>
<p>— Matt @ Keyboard Kraken</p>
              `.trim(),
            }),
          });
        } catch {
          // Email failure is non-blocking — the unlock already happened client-side
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
