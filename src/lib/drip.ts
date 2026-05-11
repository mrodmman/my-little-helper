import type { Env } from './env';

export const TEMPLATE_IDS: Record<string, string> = {
  'kv-welcome-01': 'f26e99f7-212c-484e-9576-988a644fe0e8',
  'kv-welcome-02': '62d59869-87dd-43ee-ab97-e02f0cdd57f5',
  'kv-welcome-03': '72c3879e-1bcf-405e-9ee9-287efe08c095',
  'kv-welcome-04': '5cab1bbc-62d6-422a-a4c4-b8c8e3877e2a',
  'kv-welcome-05': '0b242f65-9059-40a5-8d9d-e661da424963',
  'kv-nurture-01': '7795a340-8ed0-4a4f-a814-a5667d23721c',
  'kv-nurture-02': '396d2876-d6e0-428f-b810-5e5489d851e7',
  'kv-nurture-03': 'be848a11-9689-4e37-8d21-7097acd89fae',
  'kv-nurture-04': '0740acc2-2cb4-4bc4-83de-3ed004abafa8',
  'kv-nurture-05': '018c683f-f4f3-4028-a983-c9d9ce874568',
  'kv-sales-01': 'be623ad2-0add-4365-b193-4d7cdd5e2e67',
  'kv-sales-02': 'fa608ce3-ddb1-477e-93dd-80314b36a694',
  'kv-sales-03': '78a46c87-2dc7-4ac3-987a-74e9353a8b6b',
  'kv-sales-04': 'e16018a4-6d58-48ba-aa0a-00353e518d39',
  'kv-sales-05': 'e6ad750c-638d-49d6-8f5c-c8b7b69aa50a',
};

// Days from signup that each step fires (index = sequence_step)
const DRIP_SCHEDULE = [0, 2, 4, 6, 7, 10, 14, 18, 22, 26, 30, 31, 32, 33, 34];

export const TEMPLATE_ORDER = Object.keys(TEMPLATE_IDS);

export async function sendDripEmail(
  email: string,
  firstName: string | null,
  templateId: string,
  env: Env,
) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
      to: email,
      template: { id: templateId },
    }),
  });
}

interface DripSubscriber {
  id: string;
  email: string;
  first_name: string | null;
  sequence_step: number;
  subscribed_at: number;
  status: string;
}

export async function handleDripCron(env: Env) {
  const nowSec = Math.floor(Date.now() / 1000);

  const { results } = await env.DB.prepare(
    `SELECT id, email, first_name, sequence_step, subscribed_at, status
     FROM drip_subscribers
     WHERE status = 'active' AND next_send_at <= ?`,
  )
    .bind(nowSec)
    .all<DripSubscriber>();

  for (const sub of results) {
    const step = sub.sequence_step;
    if (step >= TEMPLATE_ORDER.length) continue;

    const templateId = TEMPLATE_IDS[TEMPLATE_ORDER[step]];
    await sendDripEmail(sub.email, sub.first_name, templateId, env);

    const nextStep = step + 1;

    if (nextStep >= TEMPLATE_ORDER.length) {
      await env.DB.prepare(
        `UPDATE drip_subscribers SET sequence_step = ?, status = 'completed' WHERE id = ?`,
      )
        .bind(nextStep, sub.id)
        .run();
    } else {
      const nextSendAt = sub.subscribed_at + DRIP_SCHEDULE[nextStep] * 86400;
      await env.DB.prepare(
        `UPDATE drip_subscribers SET sequence_step = ?, next_send_at = ? WHERE id = ?`,
      )
        .bind(nextStep, nextSendAt, sub.id)
        .run();
    }
  }
}
