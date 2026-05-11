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
        console.log('[subscribe] handler reached');
        let env;
        try {
          env = getEnv();
          console.log('[subscribe] env loaded');
        } catch (e) {
          console.error('[subscribe] getEnv failed:', e);
          return new Response(JSON.stringify({ error: 'env unavailable', detail: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

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
        console.log('[subscribe] email:', email, 'firstName:', firstName);

        if (!email) {
          return new Response(JSON.stringify({ error: 'email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // Check for existing subscriber
        let existing;
        try {
          existing = await env.DB.prepare(
            'SELECT id FROM drip_subscribers WHERE email = ?',
          )
            .bind(email)
            .first();
          console.log('[subscribe] existing check done, found:', !!existing);
        } catch (e) {
          console.error('[subscribe] DB select failed:', e);
          return new Response(JSON.stringify({ error: 'DB error', detail: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        if (existing) {
          return new Response(JSON.stringify({ success: true, note: 'already subscribed' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const id = crypto.randomUUID();
        const nowSec = Math.floor(Date.now() / 1000);
        const nextSendAt = nowSec + 2 * 86400;

        try {
          await env.DB.prepare(
            `INSERT INTO drip_subscribers (id, email, first_name, sequence_step, next_send_at, subscribed_at, status)
             VALUES (?, ?, ?, 0, ?, ?, 'active')`,
          )
            .bind(id, email, firstName, nextSendAt, nowSec)
            .run();
          console.log('[subscribe] inserted subscriber');
        } catch (e) {
          console.error('[subscribe] DB insert failed:', e);
          return new Response(JSON.stringify({ error: 'DB insert error', detail: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const templateId = TEMPLATE_IDS[TEMPLATE_ORDER[0]];
        console.log('[subscribe] sending drip email, templateId:', templateId);
        await sendDripEmail(email, firstName, templateId, env);
        console.log('[subscribe] sendDripEmail done');

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
