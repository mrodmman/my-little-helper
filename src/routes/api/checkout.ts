/**
 * GET /api/checkout
 * Creates a Stripe Checkout Session for Kraken Vault ($24.99 one-time)
 * and redirects the browser to the hosted checkout page.
 */
import { createFileRoute } from "@tanstack/react-router";
import { getEnv } from "@/lib/env";

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const env = getEnv();
        const origin = new URL(request.url).origin;

        const params = new URLSearchParams({
          "mode": "payment",
          "line_items[0][price_data][currency]": "usd",
          "line_items[0][price_data][product_data][name]": "Kraken Vault",
          "line_items[0][price_data][product_data][description]":
            "Lifetime access — AI, automation, content, funnels & practical systems.",
          "line_items[0][price_data][unit_amount]": "2499",
          "line_items[0][quantity]": "1",
          "payment_intent_data[description]": "Kraken Vault — lifetime access",
          "success_url": `${origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
          "cancel_url": `${origin}/offer`,
          // Collect email so webhook has it for provisioning
          "customer_email": "",
        });

        // Remove empty customer_email — Stripe will collect it on the form
        params.delete("customer_email");

        const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        });

        if (!res.ok) {
          const err = await res.text();
          console.error("Stripe session error:", err);
          return new Response(`Stripe error: ${err}`, { status: 502 });
        }

        const session = await res.json() as { url: string };
        return Response.redirect(session.url, 303);
      },
    },
  },
});
