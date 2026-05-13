/**
 * GET /unsubscribe?email=xxx[&sequence=yyy]
 * Marks the subscriber as unsubscribed.
 * If ?sequence= is provided, only that sequence row is unsubscribed.
 * Without it, all sequences for that email are unsubscribed (fallback / manual use).
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';

export const Route = createFileRoute('/unsubscribe')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url      = new URL(request.url);
        const email    = url.searchParams.get('email');
        const sequence = url.searchParams.get('sequence');

        if (email) {
          try {
            const env = getEnv();
            if (sequence) {
              await env.DB.prepare(
                `UPDATE drip_subscribers SET status = 'unsubscribed'
                 WHERE email = ? AND sequence_type = ?`,
              )
                .bind(email, sequence)
                .run();
            } else {
              await env.DB.prepare(
                `UPDATE drip_subscribers SET status = 'unsubscribed' WHERE email = ?`,
              )
                .bind(email)
                .run();
            }
          } catch {
            // best-effort; still show the confirmation page
          }
        }

        const dest = new URL('/unsubscribed', url.origin);
        if (email) dest.searchParams.set('email', email);
        return Response.redirect(dest.toString(), 302);
      },
    },
  },
});
