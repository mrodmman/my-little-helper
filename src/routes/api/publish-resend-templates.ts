import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';

type TemplateTarget = { id: string; name: string };

const KRAKEN_TEMPLATES: TemplateTarget[] = [
  { id: 'f26e99f7-212c-484e-9576-988a644fe0e8', name: 'kv-welcome-01' },
  { id: '62d59869-87dd-43ee-ab97-e02f0cdd57f5', name: 'kv-welcome-02' },
  { id: '72c3879e-1bcf-405e-9ee9-287efe08c095', name: 'kv-welcome-03' },
  { id: '5cab1bbc-62d6-422a-a4c4-b8c8e3877e2a', name: 'kv-welcome-04' },
  { id: '0b242f65-9059-40a5-8d9d-e661da424963', name: 'kv-welcome-05' },
  { id: '7795a340-8ed0-4a4f-a814-a5667d23721c', name: 'kv-nurture-01' },
  { id: '396d2876-d6e0-428f-b810-5e5489d851e7', name: 'kv-nurture-02' },
  { id: 'be848a11-9689-4e37-8d21-7097acd89fae', name: 'kv-nurture-03' },
  { id: '0740acc2-2cb4-4bc4-83de-3ed004abafa8', name: 'kv-nurture-04' },
  { id: '018c683f-f4f3-4028-a983-c9d9ce874568', name: 'kv-nurture-05' },
  { id: 'be623ad2-0add-4365-b193-4d7cdd5e2e67', name: 'kv-sales-01' },
  { id: 'fa608ce3-ddb1-477e-93dd-80314b36a694', name: 'kv-sales-02' },
  { id: '78a46c87-2dc7-4ac3-987a-74e9353a8b6b', name: 'kv-sales-03' },
  { id: 'e16018a4-6d58-48ba-aa0a-00353e518d39', name: 'kv-sales-04' },
  { id: 'e6ad750c-638d-49d6-8f5c-c8b7b69aa50a', name: 'kv-sales-05' },
];

const BIZ_TEMPLATES: TemplateTarget[] = [
  { id: 'e9762cc8-6cdf-400e-a272-960d293e9776', name: 'bo-lead-01-delivery' },
  { id: 'f91831da-4d2f-4865-8541-f6fa14ed96ac', name: 'bo-lead-02-real-problem' },
  { id: 'b13c90af-b6ce-4897-956c-a0b2c7d26dbc', name: 'bo-lead-03-leaky-website' },
  { id: '5b10afce-d862-41bc-bd0c-3eba0bf474ac', name: 'bo-lead-04-example-system' },
  { id: 'e24ff040-f874-4ed6-8496-2c13704fd6ab', name: 'bo-lead-05-agencies-stop-short' },
  { id: '70c31748-5166-4830-be3d-edf6ff8478d0', name: 'bo-lead-06-diy-or-dfy' },
  { id: '44ced47a-6eff-450b-9f06-ecc78daabf65', name: 'bo-lead-07-work-with-me' },
];

async function publishTemplate(id: string, env: ReturnType<typeof getEnv>) {
  const response = await fetch(`https://api.resend.com/templates/${id}/publish`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { message?: string }).message ?? `HTTP ${response.status}`);
  }
}

export const Route = createFileRoute('/api/publish-resend-templates')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();

        const authHeader = request.headers.get('Authorization') ?? '';
        const bearerSecret = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

        let body: { secret?: string; flow?: 'kraken' | 'begin' | 'business' | 'all' } = {};
        try { body = await request.json(); } catch {}

        const providedSecret = body.secret ?? bearerSecret;
        if (!providedSecret || providedSecret !== env.DRIP_TEST_SECRET) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
        }

        const flow = body.flow ?? 'all';
        const selected: TemplateTarget[] = flow === 'all'
          ? [...KRAKEN_TEMPLATES, ...BIZ_TEMPLATES]
          : flow === 'kraken' || flow === 'begin'
            ? KRAKEN_TEMPLATES
            : BIZ_TEMPLATES;

        const results: Array<{ name: string; id: string; ok: boolean; error?: string }> = [];
        for (const t of selected) {
          try {
            await publishTemplate(t.id, env);
            results.push({ name: t.name, id: t.id, ok: true });
          } catch (e) {
            results.push({ name: t.name, id: t.id, ok: false, error: String(e) });
          }
        }

        const ok = results.filter(r => r.ok).length;
        const fail = results.length - ok;

        return new Response(JSON.stringify({ success: fail === 0, flow, ok, fail, results }), {
          status: fail === 0 ? 200 : 207,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
