const { buildEmail } = require('./template.vault');

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY.');
  process.exit(1);
}

const LOGO_URL = 'https://i.ibb.co/607fGNdR/file-45.jpg';
const VAULT_URL = 'https://keyboardkraken.kbkcompanies.com/starter-vault';

// NOTE: Replace this ID with the real Resend template UUID after you create
// the template once in the Resend dashboard. The ID is a UUID assigned by Resend.
const templates = [
  {
    id: 'REPLACE_WITH_RESEND_TEMPLATE_UUID',
    name: 'vault-unlock-delivery',
    subject: 'Your free kit is ready — {{{drop_title}}}',
    headline: 'Your free kit',
    headlineAccent: 'is unlocked.',
    ctaText: 'Open Your Kit →',
    ctaUrl: '{{{drop_url}}}',
    body: `
      <p style="margin:0 0 14px;">Here's the free Starter Vault kit you requested — <strong>{{{drop_title}}}</strong>.</p>

      <p style="margin:0 0 14px;">
      It includes the full AI build prompt, file structure, setup steps, and edit map so you can ship the whole thing in one focused session.
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            One prompt. One session. A working system you actually own.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      You've also unlocked every other kit in the Starter Vault — no paywall, no catch.
      </p>
    `,
  },
];

async function createOrUpdateTemplate(t) {
  const html = buildEmail({
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
      { key: 'drop_title', type: 'string' },
      { key: 'drop_url', type: 'string' },
    ],
  };

  if (t.id === 'REPLACE_WITH_RESEND_TEMPLATE_UUID') {
    console.error('Template ID is still a placeholder. Create the template in Resend first, then paste the UUID.');
    process.exit(1);
  }

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
  console.log('\n🦑 STARTER VAULT — RESEND TEMPLATE UPDATE');
  console.log('==========================================');

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

  console.log('\n✅ Starter Vault templates updated + published');
}

run();
