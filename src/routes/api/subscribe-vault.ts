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

        // Send branded confirmation email via Resend template
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
              template_id: "8b1fd136-1503-44ce-a8e4-2f2c1417bc9a",
              variables: {
                email,
                first_name: "",
                drop_title: dropTitle,
                drop_url: dropUrl,
              },
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
