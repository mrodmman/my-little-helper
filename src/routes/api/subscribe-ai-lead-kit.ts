/**
 * POST /api/subscribe-ai-lead-kit
 * Enrolls a business-owner opt-in into the business_ai_lead_kit drip sequence.
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { enrollSubscriber } from '@/lib/drip';

export const Route = createFileRoute('/api/subscribe-ai-lead-kit')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let env;
        try {
          env = getEnv();
        } catch (e) {
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

        if (!email) {
          return new Response(JSON.stringify({ error: 'email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        try {
          const result = await enrollSubscriber(email, firstName, 'business_ai_lead_kit', env);
          if (result.error) {
            return new Response(JSON.stringify({ error: result.error }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
          }
          return new Response(JSON.stringify({ success: true, ...(result.note ? { note: result.note } : {}) }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        } catch (e) {
          console.error('[subscribe-ai-lead-kit] unexpected error:', e);
          return new Response(JSON.stringify({ error: 'Internal error', detail: String(e) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },
    },
  },
});
