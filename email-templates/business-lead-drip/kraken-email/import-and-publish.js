const { buildEmail } = require('./template.business');

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY || RESEND_API_KEY === 'PASTE_YOUR_RESEND_KEY_HERE') {
  console.error('Missing RESEND_API_KEY. Paste your Resend key into the RESEND_API_KEY line.');
  process.exit(1);
}

const LOGO_URL = 'https://i.ibb.co/607fGNdR/file-45.jpg';
const PLAYBOOK_URL = 'https://keyboardkraken.kbkcompanies.com/playbook/business-owner-growth-playbook.html';
const WORK_WITH_ME_URL = 'https://keyboardkraken.kbkcompanies.com/work-with-me';

const templates = [
  {
    id: 'e9762cc8-6cdf-400e-a272-960d293e9776',
    name: 'bo-lead-01-delivery',
    subject: 'Your free growth playbook is inside',
    seriesLabel: 'Business Systems',
    headline: 'Your growth',
    headlineAccent: 'playbook is ready.',
    ctaText: 'Open The Playbook →',
    ctaUrl: PLAYBOOK_URL,
    body: `
      <p style="margin:0 0 14px;">Hey {{{first_name}}} — here’s the free business owner growth playbook you requested.</p>

      <p style="margin:0 0 14px;">
      This is the simple version of how your online presence, lead capture, follow-up, and backend automation should connect.
      </p>

      <p style="margin:0 0 14px;">
      The goal is not to give you more random marketing tasks. The goal is to show you the system your business should be building toward.
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            Traffic, content, funnels, lead capture, and automation only work when they are connected.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      Open the playbook first. Then look at where your current setup is disconnected.
      </p>
    `,
  },

  {
    id: 'f91831da-4d2f-4865-8541-f6fa14ed96ac',
    name: 'bo-lead-02-real-problem',
    subject: 'The bottleneck is probably not effort',
    seriesLabel: 'Business Systems',
    headline: 'Your growth',
    headlineAccent: 'may be bottlenecked.',
    ctaText: 'Audit The Bottlenecks →',
    ctaUrl: WORK_WITH_ME_URL,
    body: `
      <p style="margin:0 0 14px;">
      Most business owners are not lazy.
      </p>

      <p style="margin:0 0 14px;">
      They are already busy. They are already solving problems. They are already wearing too many hats.
      </p>

      <p style="margin:0 0 14px;">
      The real issue is usually that the business has pieces that do not talk to each other.
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ The website is separate from the follow-up</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ The social content is separate from the lead capture</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ The forms are separate from the reminders</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ The owner becomes the glue holding everything together</p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            Growth gets harder when your systems are disconnected.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      The playbook shows the layers. The next step is finding which layer is holding you back.
      </p>
    `,
  },

  {
    id: 'b13c90af-b6ce-4897-956c-a0b2c7d26dbc',
    name: 'bo-lead-03-leaky-website',
    subject: 'A website is not the whole system',
    seriesLabel: 'Business Systems',
    headline: 'A website alone',
    headlineAccent: 'is not enough.',
    ctaText: 'Fix The Leaks →',
    ctaUrl: WORK_WITH_ME_URL,
    body: `
      <p style="margin:0 0 14px;">
      A website matters. But a website by itself does not create a real customer acquisition system.
      </p>

      <p style="margin:0 0 14px;">
      If somebody lands on your page, clicks around, leaves, and nothing happens after that, your business is relying on luck.
      </p>

      <p style="margin:0 0 14px;">
      A stronger setup connects the full path:
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ Online presence</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Traffic source</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Lead capture</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Instant follow-up</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ Backend tracking and automation</p>

      <p style="margin:0 0 14px;">
      That is the difference between having a page and having a pipeline.
      </p>
    `,
  },

  {
    id: '5b10afce-d862-41bc-bd0c-3eba0bf474ac',
    name: 'bo-lead-04-example-system',
    subject: 'What a hands-off acquisition system looks like',
    seriesLabel: 'Business Systems',
    headline: 'The simple',
    headlineAccent: 'connected system.',
    ctaText: 'Map Your System →',
    ctaUrl: WORK_WITH_ME_URL,
    body: `
      <p style="margin:0 0 14px;">
      Here is the simple version of what your system should do.
      </p>

      <p style="margin:0 0 14px;">
      A potential customer sees your content, ad, Google profile, or referral link. They land on a page that gives them a clear next step.
      </p>

      <p style="margin:0 0 14px;">
      When they take that step, the system should automatically:
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ Capture their info</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Notify you immediately</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Send them a confirmation</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Start follow-up</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ Keep the lead from getting buried</p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            The win is not more software. The win is making the pieces work together.
            </span>
          </td>
        </tr>
      </table>
    `,
  },

  {
    id: 'e24ff040-f874-4ed6-8496-2c13704fd6ab',
    name: 'bo-lead-05-agencies-stop-short',
    subject: 'Most marketing help stops too early',
    seriesLabel: 'Business Systems',
    headline: 'Traffic is not',
    headlineAccent: 'the whole game.',
    ctaText: "See What You're Missing →",
    ctaUrl: WORK_WITH_ME_URL,
    body: `
      <p style="margin:0 0 14px;">
      A lot of marketing help focuses on one piece.
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ Someone builds a page</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Someone posts content</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Someone runs ads</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ Someone sets up a form</p>

      <p style="margin:0 0 14px;">
      None of that is bad. But when those pieces are not connected, the owner still has to manually chase the outcome.
      </p>

      <p style="margin:0 0 14px;">
      That is where businesses start leaking opportunities.
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            You do not just need marketing assets. You need a connected customer acquisition system.
            </span>
          </td>
        </tr>
      </table>
    `,
  },

  {
    id: '70c31748-5166-4830-be3d-edf6ff8478d0',
    name: 'bo-lead-06-diy-or-dfy',
    subject: 'You can build this yourself',
    seriesLabel: 'Business Systems',
    headline: 'DIY or',
    headlineAccent: 'done with help.',
    ctaText: 'Build Smarter →',
    ctaUrl: WORK_WITH_ME_URL,
    body: `
      <p style="margin:0 0 14px;">
      You can absolutely build parts of this yourself.
      </p>

      <p style="margin:0 0 14px;">
      That is why the playbook lays out the layers. Foundation, traffic, lead capture, follow-up, and automation.
      </p>

      <p style="margin:0 0 14px;">
      But when you are running the actual business, building the system often gets pushed behind everything urgent.
      </p>

      <p style="margin:0 0 14px;">
      That is where help makes sense.
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            The goal is not to make your business more complicated. The goal is to remove the manual bottlenecks.
            </span>
          </td>
        </tr>
      </table>
    `,
  },

  {
    id: '44ced47a-6eff-450b-9f06-ecc78daabf65',
    name: 'bo-lead-07-work-with-me',
    subject: 'Stop stalling your growth',
    seriesLabel: 'Business Systems',
    headline: 'Ready for',
    headlineAccent: 'a connected system?',
    ctaText: 'Work With Me →',
    ctaUrl: WORK_WITH_ME_URL,
    body: `
      <p style="margin:0 0 14px;">
      If your business depends on leads, follow-up, appointments, quotes, calls, or repeat customers, the system behind those steps matters.
      </p>

      <p style="margin:0 0 14px;">
      A disconnected setup keeps forcing you to do manual work that should already be handled.
      </p>

      <p style="margin:0 0 14px;">
      That slows down response time, buries opportunities, and makes growth feel harder than it needs to be.
      </p>

      <p style="margin:0 0 14px;">
      If you want help building the traffic pipelines, marketing assets, lead capture, and backend automation your business needs to scale, that is the kind of work I help with.
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            Stop patching together tools. Build the system your business actually needs.
            </span>
          </td>
        </tr>
      </table>
    `,
  },
];

async function createOrUpdateTemplate(t) {
  const html = buildEmail({
    seriesLabel: t.seriesLabel,
    headline: t.headline,
    headlineAccent: t.headlineAccent,
    body: t.body,
    ctaText: t.ctaText,
    ctaUrl: t.ctaUrl,
    logoUrl: LOGO_URL,
  });

  const payload = {
    name: t.name,
    subject: t.subject,
    html,
    variables: [
      { key: 'email', type: 'string' },
      { key: 'first_name', type: 'string' },
    ],
  };

  const response = await fetch(`https://api.resend.com/templates/${t.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return { response, data: await response.json(), id: t.id };
}

async function publishTemplate(id) {
  const response = await fetch(`https://api.resend.com/templates/${id}/publish`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json().catch(() => ({}));
  return { response, data };
}

async function run() {
  console.log('\n🦑 BUSINESS OWNER GROWTH PLAYBOOK — RESEND BULK UPDATE');
  console.log('=====================================================');

  for (const t of templates) {
    try {
      const result = await createOrUpdateTemplate(t);

      if (!result.response.ok) {
        console.log(`✗ ${t.name} — ${result.data?.message || result.response.status}`);
        continue;
      }

      console.log(`✓ ${t.name} — updated`);

      const publish = await publishTemplate(result.id);

      if (!publish.response.ok) {
        console.log(`✗ ${t.name} — publish failed: ${publish.data?.message || publish.response.status}`);
      } else {
        console.log(`🚀 ${t.name} — published`);
      }

      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.log(`✗ ${t.name} — ${err.message}`);
    }
  }

  console.log('\n✅ Business-owner growth playbook templates updated + published');
}

run();
