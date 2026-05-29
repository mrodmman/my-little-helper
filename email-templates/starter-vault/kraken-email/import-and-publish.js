const { buildEmail } = require('./template.vault');

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY.');
  process.exit(1);
}

const LOGO_URL = 'https://i.ibb.co/607fGNdR/file-45.jpg';
const VAULT_URL = 'https://keyboardkraken.kbkcompanies.com/starter-vault';

const templates = [
  {
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
    variables: [
      { key: 'email', type: 'string' },
      { key: 'first_name', type: 'string' },
      { key: 'drop_title', type: 'string' },
      { key: 'drop_url', type: 'string' },
    ],
  },
];

async function listExistingTemplates() {
  const res = await fetch('https://api.resend.com/templates', {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  });
  const data = await res.json();
  const list = Array.isArray(data.data) ? data.data : [];
  return Object.fromEntries(list.map(t => [t.name, t]));
}

async function upsertTemplate(t, existingByName) {
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
    variables: t.variables,
  };

  const existing = existingByName[t.name];

  if (existing) {
    const res = await fetch(`https://api.resend.com/templates/${existing.id}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || res.status);
    console.log(`✓ ${t.name} — updated (id: ${existing.id})`);
    return existing.id;
  } else {
    const res = await fetch('https://api.resend.com/templates', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || res.status);
    console.log(`✓ ${t.name} — created`);
    console.log(`  ➜ Template ID: ${data.id}`);
    console.log(`  ➜ Set this in subscribe-vault.ts as the template_id`);
    return data.id;
  }
}

async function publishTemplate(id, name) {
  const res = await fetch(`https://api.resend.com/templates/${id}/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.status);
  console.log(`🚀 ${name} — published`);
}

async function run() {
  console.log('\n🦑 STARTER VAULT — RESEND TEMPLATE UPSERT + PUBLISH');
  console.log('=====================================================');

  const existingByName = await listExistingTemplates();
  console.log(`Found ${Object.keys(existingByName).length} existing templates in Resend\n`);

  for (const t of templates) {
    try {
      const id = await upsertTemplate(t, existingByName);
      await publishTemplate(id, t.name);
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.error(`✗ ${t.name} — ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log('\n✅ Starter Vault templates done');
}

run();
