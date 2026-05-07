/**
 * POST /subscribe
 * Enrolls a new drip subscriber and sends their first email immediately.
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { sendDripEmail, TEMPLATE_ORDER, TEMPLATE_IDS } from '@/lib/drip';

export const Route = createFileRoute('/subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();
        let body: { email?: string; first_name?: string };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const email = body.email?.trim();
        const firstName = body.first_name?.trim() ?? null;

        if (!email) {
          return new Response(JSON.stringify({ error: 'email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // Silently succeed if already subscribed
        const existing = await env.DB.prepare(
          'SELECT id FROM drip_subscribers WHERE email = ?',
        )
          .bind(email)
          .first();

        if (existing) {
          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const id = crypto.randomUUID();
        const nowSec = Math.floor(Date.now() / 1000);
        // step 1 fires on day 2 relative to signup
        const nextSendAt = nowSec + 2 * 86400;

        await env.DB.prepare(
          `INSERT INTO drip_subscribers (id, email, first_name, sequence_step, next_send_at, subscribed_at, status)
           VALUES (?, ?, ?, 0, ?, ?, 'active')`,
        )
          .bind(id, email, firstName, nextSendAt, nowSec)
          .run();

        // Send step 0 immediately
        await sendDripEmail(email, firstName, TEMPLATE_IDS[TEMPLATE_ORDER[0]], env);

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
