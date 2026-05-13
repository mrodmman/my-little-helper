import type { Env } from './env';

// ---------------------------------------------------------------------------
// Sequence configs
// ---------------------------------------------------------------------------

interface SequenceConfig {
  templateIds: Record<string, string>;
  templateOrder: string[];
  schedule: number[]; // days from subscribed_at that each step fires
}

const SEQUENCES: Record<string, SequenceConfig> = {
  kraken_vault: {
    templateIds: {
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
      'kv-sales-01':   'be623ad2-0add-4365-b193-4d7cdd5e2e67',
      'kv-sales-02':   'fa608ce3-ddb1-477e-93dd-80314b36a694',
      'kv-sales-03':   '78a46c87-2dc7-4ac3-987a-74e9353a8b6b',
      'kv-sales-04':   'e16018a4-6d58-48ba-aa0a-00353e518d39',
      'kv-sales-05':   'e6ad750c-638d-49d6-8f5c-c8b7b69aa50a',
    },
    templateOrder: [
      'kv-welcome-01','kv-welcome-02','kv-welcome-03','kv-welcome-04','kv-welcome-05',
      'kv-nurture-01','kv-nurture-02','kv-nurture-03','kv-nurture-04','kv-nurture-05',
      'kv-sales-01',  'kv-sales-02',  'kv-sales-03',  'kv-sales-04',  'kv-sales-05',
    ],
    schedule: [0, 2, 4, 6, 7, 10, 14, 18, 22, 26, 30, 31, 32, 33, 34],
  },

  business_ai_lead_kit: {
    templateIds: {
      'bo-lead-01-delivery':          'e9762cc8-6cdf-400e-a272-960d293e9776',
      'bo-lead-02-real-problem':      'f91831da-4d2f-4865-8541-f6fa14ed96ac',
      'bo-lead-03-leaky-website':     'b13c90af-b6ce-4897-956c-a0b2c7d26dbc',
      'bo-lead-04-example-system':    '5b10afce-d862-41bc-bd0c-3eba0bf474ac',
      'bo-lead-05-agencies-stop-short':'e24ff040-f874-4ed6-8496-2c13704fd6ab',
      'bo-lead-06-diy-or-dfy':        '70c31748-5166-4830-be3d-edf6ff8478d0',
      'bo-lead-07-work-with-me':      '44ced47a-6eff-450b-9f06-ecc78daabf65',
    },
    templateOrder: [
      'bo-lead-01-delivery',
      'bo-lead-02-real-problem',
      'bo-lead-03-leaky-website',
      'bo-lead-04-example-system',
      'bo-lead-05-agencies-stop-short',
      'bo-lead-06-diy-or-dfy',
      'bo-lead-07-work-with-me',
    ],
    // Days from signup: 0, +1, +2, +4, +6, +9, +12
    schedule: [0, 1, 2, 4, 6, 9, 12],
  },
};

// Legacy exports kept so existing callers (subscribe.ts) don't break until
// they are updated to use the sequence-aware API.
export const TEMPLATE_IDS   = SEQUENCES.kraken_vault.templateIds;
export const TEMPLATE_ORDER = SEQUENCES.kraken_vault.templateOrder;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export async function sendDripEmail(
  email: string,
  firstName: string | null,
  templateId: string,
  env: Env,
) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
      to: email,
      template: {
        id: templateId,
        variables: { first_name: firstName ?? '', email },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '(unreadable)');
    console.error(`sendDripEmail failed for ${email} template=${templateId}: ${res.status} ${detail}`);
  }
}

// ---------------------------------------------------------------------------
// Enrollment helpers (used by subscribe endpoints)
// ---------------------------------------------------------------------------

export function getSequenceConfig(sequenceType: string): SequenceConfig | null {
  return SEQUENCES[sequenceType] ?? null;
}

/**
 * Enroll a new subscriber and fire the first email immediately.
 * Returns { success, note? } where note is set for duplicates.
 */
export async function enrollSubscriber(
  email: string,
  firstName: string | null,
  sequenceType: string,
  env: Env,
): Promise<{ success: boolean; note?: string; error?: string }> {
  const seq = getSequenceConfig(sequenceType);
  if (!seq) return { success: false, error: `Unknown sequence: ${sequenceType}` };

  const existing = await env.DB.prepare(
    'SELECT id FROM drip_subscribers WHERE email = ? AND sequence_type = ?',
  )
    .bind(email, sequenceType)
    .first();

  if (existing) return { success: true, note: 'already subscribed' };

  const id       = crypto.randomUUID();
  const nowSec   = Math.floor(Date.now() / 1000);
  // step 0 fires immediately; next_send_at points to day of step 1
  const nextSendAt = nowSec + seq.schedule[1] * 86400;

  await env.DB.prepare(
    `INSERT INTO drip_subscribers
       (id, email, first_name, sequence_type, sequence_step, next_send_at, subscribed_at, status)
     VALUES (?, ?, ?, ?, 1, ?, ?, 'active')`,
  )
    .bind(id, email, firstName, sequenceType, nextSendAt, nowSec)
    .run();

  const templateId = seq.templateIds[seq.templateOrder[0]];
  await sendDripEmail(email, firstName, templateId, env);

  return { success: true };
}

// ---------------------------------------------------------------------------
// Cron handler — runs daily, sends any due emails for all sequences
// ---------------------------------------------------------------------------

interface DripSubscriber {
  id: string;
  email: string;
  first_name: string | null;
  sequence_type: string;
  sequence_step: number;
  subscribed_at: number;
  status: string;
}

export async function handleDripCron(env: Env) {
  const nowSec = Math.floor(Date.now() / 1000);

  const { results } = await env.DB.prepare(
    `SELECT id, email, first_name, sequence_type, sequence_step, subscribed_at, status
     FROM drip_subscribers
     WHERE status = 'active' AND next_send_at <= ?`,
  )
    .bind(nowSec)
    .all<DripSubscriber>();

  for (const sub of results) {
    const seq = getSequenceConfig(sub.sequence_type);
    if (!seq) {
      console.warn(`handleDripCron: unknown sequence_type "${sub.sequence_type}" for ${sub.email}`);
      continue;
    }

    const step = sub.sequence_step;
    if (step >= seq.templateOrder.length) continue;

    const templateId = seq.templateIds[seq.templateOrder[step]];
    await sendDripEmail(sub.email, sub.first_name, templateId, env);

    const nextStep = step + 1;

    if (nextStep >= seq.templateOrder.length) {
      await env.DB.prepare(
        `UPDATE drip_subscribers SET sequence_step = ?, status = 'completed' WHERE id = ?`,
      )
        .bind(nextStep, sub.id)
        .run();
    } else {
      const nextSendAt = sub.subscribed_at + seq.schedule[nextStep] * 86400;
      await env.DB.prepare(
        `UPDATE drip_subscribers SET sequence_step = ?, next_send_at = ? WHERE id = ?`,
      )
        .bind(nextStep, nextSendAt, sub.id)
        .run();
    }
  }
}
