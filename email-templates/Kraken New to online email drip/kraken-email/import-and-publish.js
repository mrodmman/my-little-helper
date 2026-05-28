const { buildEmail } = require('./template.fixed');

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error('Missing RESEND_API_KEY. Run: set RESEND_API_KEY=re_xxx  (Windows CMD) or $env:RESEND_API_KEY="re_xxx" (PowerShell)');
  process.exit(1);
}
const LOGO_URL = 'https://i.ibb.co/607fGNdR/file-45.jpg';
const JUMPSTART_URL = 'https://keyboardkraken.kbkcompanies.com/jumpstart-guide.html';
const OFFER_URL = 'https://keyboardkraken.kbkcompanies.com/offer';


const templates = [
  {
    id: 'f26e99f7-212c-484e-9576-988a644fe0e8',
    name: 'kv-welcome-01',
    subject: "Your 7-Day Jumpstart is ready",
    seriesLabel: 'Keyboard Kraken',
    headline: "You're in.",
    headlineAccent: "Your jumpstart is ready.",
    ctaText: 'Access Your Jumpstart →',
    ctaUrl: JUMPSTART_URL,
    body: `
      <p style="margin:0 0 14px;">Hey — you made the right move getting here.</p>
      <p style="margin:0 0 14px;">Your free 7-Day Affiliate Jumpstart is ready right now. One action per day. 45 minutes max. By day 7 you'll have the foundation of a real affiliate system running.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">→ <a href="${JUMPSTART_URL}" style="color:#0A8FE8;text-decoration:none;">Access Your 7-Day Jumpstart Here</a></span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">This isn't theory. Each day is one specific move. Do the thing, close the laptop, go live your life. The system builds while you're not looking.</p>
      <p style="margin:0 0 14px;">Over the next few weeks I'll also send you the full system breakdown — the why behind each step and how to turn this foundation into something that actually compounds.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">Life is already hard. At least build something that belongs to you.</span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">No hype. Just the build.</p>
    `,
  },
  {
    id: '62d59869-87dd-43ee-ab97-e02f0cdd57f5',
    name: 'kv-welcome-02',
    subject: "Why most people fail at this (it's not what you think)",
    seriesLabel: 'Keyboard Kraken',
    headline: "The real reason",
    headlineAccent: "people stay stuck.",
    ctaText: 'See The System →',
    body: `
      <p style="margin:0 0 14px;">If you've tried affiliate marketing before and it didn't work — it probably wasn't your fault.</p>
      <p style="margin:0 0 14px;">90% of what's taught online is tactics without structure. "Start a YouTube channel." "Build a niche blog." None of that is wrong exactly. But it's incomplete in a way that destroys people.</p>
      <p style="margin:0 0 14px;">When you try one thing, don't see results in 30 days, and jump to something else — you're not building. You're just spinning.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">The missing piece isn't effort. It's sequence.</span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">Tomorrow I'll show you what the actual sequence looks like.</p>
    `,
  },
  {
    id: '72c3879e-1bcf-405e-9ee9-287efe08c095',
    name: 'kv-welcome-03',
    subject: "The actual sequence (nobody explains this part)",
    seriesLabel: 'Keyboard Kraken',
    headline: "The 5-part system",
    headlineAccent: "nobody shows you.",
    ctaText: 'Get The Full Blueprint →',
    body: `
      <p style="margin:0 0 14px;">Here's what a real affiliate system looks like — not the guru version, the actual version.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">01 — NICHE + ANGLE</strong></p>
      <p style="margin:0 0 14px;padding-left:12px;">Who you're talking to and why they'd listen. Specific, not broad.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">02 — CONTENT ENGINE</strong></p>
      <p style="margin:0 0 14px;padding-left:12px;">Content on a schedule. Not when you feel like it.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">03 — TRAFFIC SOURCE</strong></p>
      <p style="margin:0 0 14px;padding-left:12px;">One primary channel first. Add more later.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">04 — EMAIL LIST</strong></p>
      <p style="margin:0 0 14px;padding-left:12px;">The only asset you actually own. Social media is rented.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">05 — OFFER STACK</strong></p>
      <p style="margin:0 0 14px;padding-left:12px;">Affiliate products that match your audience's real problems.</p>
      <p style="margin:0 0 14px;">Five pieces. When they connect — it compounds.</p>
    `,
  },
  {
    id: '5cab1bbc-62d6-422a-a4c4-b8c8e3877e2a',
    name: 'kv-welcome-04',
    subject: "What this looks like when it actually works",
    seriesLabel: 'Keyboard Kraken',
    headline: "What real progress",
    headlineAccent: "actually looks like.",
    ctaText: "See What's Inside →",
    body: `
      <p style="margin:0 0 14px;">Progress with this is quieter than they show you. It's not a dashboard screenshot six months in.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">MONTH 1</strong> — Direction. System. Building in the background.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">MONTH 3</strong> — Content out. List starting. A few clicks.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">MONTH 6</strong> — Something converts. Small. But yours.</p>
      <p style="margin:0 0 20px;"><strong style="color:#0A8FE8;font-size:13px;">MONTH 12</strong> — Old content still works. Compounding is real.</p>
      <p style="margin:0 0 14px;">Nobody shows you that timeline because it doesn't sell well. But it's the one that's actually true.</p>
    `,
  },
  {
    id: '0b242f65-9059-40a5-8d9d-e661da424963',
    name: 'kv-welcome-05',
    subject: "Here's what's inside Kraken Vault (and how to get in)",
    seriesLabel: 'Keyboard Kraken',
    headline: "Here's what's",
    headlineAccent: "inside.",
    ctaText: 'Get Into Kraken Vault →',
    ctaUrl: OFFER_URL,
    body: `
      <p style="margin:0 0 14px;"><strong style="color:#0a0a0a;">Kraken Vault</strong> is a structured system for building affiliate marketing income — built for people who still have a job, still have a life, and are done with courses that teach concepts without a path.</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ The full affiliate system framework built in sequence</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Module-by-module lessons that build on each other</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Real tools, automations, and workflows you can actually use</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ The tech stack explained simply — no developer background needed</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ Content strategy that works without being online 24/7</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">Life is already hard. At least build something that's yours.</span>
        </td></tr>
      </table>
    `,
  },
  {
    id: '7795a340-8ed0-4a4f-a814-a5667d23721c',
    name: 'kv-nurture-01',
    subject: "Stop trying to stay motivated. Do this instead.",
    seriesLabel: 'Keyboard Kraken',
    headline: "Systems over",
    headlineAccent: "motivation.",
    ctaText: 'Get The System →',
    body: `
      <p style="margin:0 0 14px;">Motivation is unreliable. You know this. You've felt it.</p>
      <p style="margin:0 0 14px;">You get fired up, you're consistent for two weeks, then life happens and the streak dies.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">The best builders aren't the most motivated. They're the most systemized.</span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">Pre-scheduled content. Email automations. A workflow you follow, not a feeling you chase. Build the structure once. Let it run.</p>
    `,
  },
  {
    id: '396d2876-d6e0-428f-b810-5e5489d851e7',
    name: 'kv-nurture-02',
    subject: 'What "building slowly" actually means',
    seriesLabel: 'Keyboard Kraken',
    headline: "The honest",
    headlineAccent: "timeline.",
    ctaText: 'Start The Build →',
    body: `
      <p style="margin:0 0 14px;">"Building slowly" gets a bad rep because everyone sells speed. But here's what slow actually looks like:</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">MONTH 1</strong> — Direction. System. Building quietly.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">MONTH 3</strong> — Content live. List growing. A few clicks.</p>
      <p style="margin:0 0 6px;"><strong style="color:#0A8FE8;font-size:13px;">MONTH 6</strong> — Something converts. Small. But yours.</p>
      <p style="margin:0 0 20px;"><strong style="color:#0A8FE8;font-size:13px;">MONTH 12</strong> — Old content still works. Compounding is real.</p>
      <p style="margin:0 0 14px;">Nobody shows you that timeline because it doesn't sell well. But it's the true one.</p>
    `,
  },
  {
    id: 'be848a11-9689-4e37-8d21-7097acd89fae',
    name: 'kv-nurture-03',
    subject: "The cost of waiting (nobody says this out loud)",
    seriesLabel: 'Keyboard Kraken',
    headline: "Every week you",
    headlineAccent: "don't start.",
    ctaText: 'Get The Structure →',
    body: `
      <p style="margin:0 0 14px;">Every month you don't start is another month you could have been building. Not in a guilt-trip way. In a math way.</p>
      <p style="margin:0 0 14px;">If a piece of evergreen content published today generates traffic for two years — and you waited six months — you just lost six months of compounding.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">The cost of waiting isn't zero. It's just quiet.</span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">You don't need to be ready. You need to start with structure.</p>
    `,
  },
  {
    id: '0740acc2-2cb4-4bc4-83de-3ed004abafa8',
    name: 'kv-nurture-04',
    subject: "I don't have time for this. (Let's talk about that.)",
    seriesLabel: 'Keyboard Kraken',
    headline: "You have more",
    headlineAccent: "time than you think.",
    ctaText: 'Get The Direction →',
    body: `
      <p style="margin:0 0 14px;">"I would love to build something but I genuinely don't have time." I believe people when they say it. Life is full. But here's the question:</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">Do you have 45 minutes a day? Not two hours. Forty-five minutes.</span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">One piece of content a week is 52 pieces in a year. An automation set up once works every day. Time isn't the issue. Direction is.</p>
    `,
  },
  {
    id: '018c683f-f4f3-4028-a983-c9d9ce874568',
    name: 'kv-nurture-05',
    subject: "If you're still thinking about it…",
    seriesLabel: 'Keyboard Kraken',
    headline: "The door is",
    headlineAccent: "still open.",
    ctaText: 'Check Out Kraken Vault →',
    ctaUrl: OFFER_URL,
    body: `
      <p style="margin:0 0 14px;">If you're still here, some part of this resonates. You've felt the frustration of working hard with nothing to show for it outside a paycheck.</p>
      <p style="margin:0 0 14px;">Kraken Vault isn't a shortcut. It's a structure. For people who are already willing to work — they just need a direction that pays them back.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">If that's you, the door's open.</span>
        </td></tr>
      </table>
    `,
  },
  {
    id: 'be623ad2-0add-4365-b193-4d7cdd5e2e67',
    name: 'kv-sales-01',
    subject: "Something I built for people like us",
    seriesLabel: 'Keyboard Kraken',
    headline: "Built for people",
    headlineAccent: "like us.",
    ctaText: "See What's Inside →",
    ctaUrl: OFFER_URL,
    body: `
      <p style="margin:0 0 14px;">I want to tell you about something I've been building. Not because it'll make you rich. But because it fills a gap most online business content completely ignores.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">Kraken Vault is the blueprint I wish I had when I started.</span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">No hype. No fake screenshots. No lifestyle content. Just the system.</p>
    `,
  },
  {
    id: 'fa608ce3-ddb1-477e-93dd-80314b36a694',
    name: 'kv-sales-02',
    subject: "The real reason most people stay stuck",
    seriesLabel: 'Keyboard Kraken',
    headline: "Tactics without",
    headlineAccent: "architecture.",
    ctaText: 'See The Sequence →',
    ctaUrl: OFFER_URL,
    body: `
      <p style="margin:0 0 14px;">Most people who try to build online income aren't lazy. They're lost. Handed tactics without architecture.</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Content drives traffic</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Traffic builds a list</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ A list earns trust</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ Trust converts to commissions</p>
      <p style="margin:0 0 14px;"><strong style="color:#0a0a0a;">Kraken Vault puts the sequence back in.</strong></p>
    `,
  },
  {
    id: '78a46c87-2dc7-4ac3-987a-74e9353a8b6b',
    name: 'kv-sales-03',
    subject: "I've tried this before and it didn't work.",
    seriesLabel: 'Keyboard Kraken',
    headline: "Did you have a system",
    headlineAccent: "or just tactics?",
    ctaText: 'Start The Build →',
    ctaUrl: OFFER_URL,
    body: `
      <p style="margin:0 0 14px;">If you've tried affiliate marketing and nothing happened — here's the honest question:</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">Did you have a system, or a collection of tactics?</span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">Kraken Vault covers the tech side too — Cloudflare, automation, content tools — all explained for non-developers. You don't need a technical background. You need a clear build order.</p>
    `,
  },
  {
    id: 'e16018a4-6d58-48ba-aa0a-00353e518d39',
    name: 'kv-sales-04',
    subject: "The honest version of why now",
    seriesLabel: 'Keyboard Kraken',
    headline: "The honest version",
    headlineAccent: "of why now.",
    ctaText: 'Get Into Kraken Vault →',
    ctaUrl: OFFER_URL,
    body: `
      <p style="margin:0 0 14px;">I'm not going to fake scarcity or tell you this closes in 24 hours when it doesn't.</p>
      <p style="margin:0 0 14px;">But here's the honest version of why now: every week you don't start is a week you didn't build. Not a failure. Just a week that passed.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">You don't need to hurry. But you do need to start.</span>
        </td></tr>
      </table>
    `,
  },
  {
    id: 'e6ad750c-638d-49d6-8f5c-c8b7b69aa50a',
    name: 'kv-sales-05',
    subject: "Last thing I'll say about this.",
    seriesLabel: 'Keyboard Kraken',
    headline: "Life is already hard.",
    headlineAccent: "Build something that's yours.",
    ctaText: 'This Is Where You Start →',
    ctaUrl: OFFER_URL,
    body: `
      <p style="margin:0 0 14px;">Either it resonates or it doesn't. That's okay.</p>
      <p style="margin:0 0 14px;">You already work hard. You deal with exhaustion and difficult days. You know how to show up when it's hard.</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr><td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">The only question is whether any of that effort goes somewhere that belongs to you.</span>
        </td></tr>
      </table>
      <p style="margin:0 0 14px;">Kraken Vault is the system. If you're ready to build — this is where you start.</p>
    `,
  },
];

async function updateAll() {
  console.log('\n🦑 KEYBOARD KRAKEN JUMPSTART — RESEND BULK UPDATE');
  console.log('=====================================');
  console.log(`Updating + publishing ${templates.length} templates...\n`);

  const results = [];
  const errors = [];

  for (const t of templates) {
    try {
      const html = buildEmail({
        seriesLabel: t.seriesLabel,
        headline: t.headline,
        headlineAccent: t.headlineAccent,
        body: t.body,
        ctaText: t.ctaText,
        ctaUrl: t.ctaUrl || OFFER_URL,
        logoUrl: LOGO_URL,
      });

      const response = await fetch(`https://api.resend.com/templates/${t.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  name: t.name,
  subject: t.subject,
  html,
  variables: [
    { key: 'email', type: 'string' },
    { key: 'first_name', type: 'string' }
  ],
}),
      });

      const data = await response.json();

      if (!response.ok) {
        errors.push({ name: t.name, error: data.message || 'Unknown error' });
        console.log(`  ✗  ${t.name} — ${data.message}`);
      } else {
        console.log(`  ✓  ${t.name} — updated`);

        const publishResponse = await fetch(`https://api.resend.com/templates/${t.id}/publish`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        const publishData = await publishResponse.json().catch(() => ({}));

        if (!publishResponse.ok) {
          errors.push({ name: t.name, error: publishData.message || 'Publish failed' });
          console.log(`  ✗  ${t.name} — publish failed: ${publishData.message || publishResponse.status}`);
        } else {
          results.push({ name: t.name });
          console.log(`  🚀 ${t.name} — published`);
        }
      }

      await new Promise(r => setTimeout(r, 300));

    } catch (err) {
      errors.push({ name: t.name, error: err.message });
      console.log(`  ✗  ${t.name} — ${err.message}`);
    }
  }

  console.log('\n=====================================');
  console.log(`✅ ${results.length} templates updated`);
  if (errors.length) {
    console.log(`❌ ${errors.length} errors`);
    errors.forEach(e => console.log(`  ${e.name}: ${e.error}`));
  }
}

updateAll();
