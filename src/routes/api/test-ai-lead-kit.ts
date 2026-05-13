/**
 * POST /api/test-ai-lead-kit
 * Fires all 7 business_ai_lead_kit emails immediately to the given address.
 * Protected by DRIP_TEST_SECRET — pass it as Bearer token or in the body.
 *
 * Body: { email: string, first_name?: string, secret: string }
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { sendDripEmail, getSequenceConfig } from '@/lib/drip';

export const Route = createFileRoute('/api/test-ai-lead-kit')({
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

        let body: { email?: string; first_name?: string; secret?: string };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        // Auth: accept secret in body or as Authorization: Bearer <secret>
        const authHeader = request.headers.get('Authorization') ?? '';
        const bearerSecret = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
        const providedSecret = body.secret ?? bearerSecret;

        if (!providedSecret || providedSecret !== env.DRIP_TEST_SECRET) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
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

        const seq = getSequenceConfig('business_ai_lead_kit')!;
        const results: { step: number; templateKey: string; templateId: string; sent: boolean }[] = [];

        for (let i = 0; i < seq.templateOrder.length; i++) {
          const key        = seq.templateOrder[i];
          const templateId = seq.templateIds[key];
          try {
            await sendDripEmail(email, firstName, templateId, env);
            results.push({ step: i + 1, templateKey: key, templateId, sent: true });
          } catch (e) {
            results.push({ step: i + 1, templateKey: key, templateId, sent: false });
            console.error(`test-ai-lead-kit: failed step ${i + 1}:`, e);
          }
        }

        return new Response(JSON.stringify({ success: true, results }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
