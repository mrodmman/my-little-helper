import { createFileRoute } from "@tanstack/react-router";
import { getEnv } from "@/lib/env";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();
        const body = (await request.json().catch(() => null)) as { name?: string; email?: string; message?: string } | null;
        if (!body?.name || !body?.email || !body?.message) {
          return json({ ok: false, error: "Missing fields" }, 400);
        }

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Kraken Vault <matt@krakenvault.com>",
            to: "matt@krakenvault.com",
            subject: `Work With Me lead: ${body.name}`,
            html: `<p><strong>Name:</strong> ${body.name}</p><p><strong>Email:</strong> ${body.email}</p><p><strong>Message:</strong><br/>${body.message}</p>`,
          }),
        });

        return json({ ok: true });
      },
    },
  },
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
