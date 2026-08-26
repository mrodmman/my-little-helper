const { buildEmail } = require("./template.business");

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY || RESEND_API_KEY === "PASTE_YOUR_RESEND_KEY_HERE") {
  console.error("Missing RESEND_API_KEY.");
  process.exit(1);
}

const LOGO_URL = "https://i.ibb.co/607fGNdR/file-45.jpg";
const AUDIT_DOWNLOAD_URL =
  "https://keyboardkraken.kbkcompanies.com/playbook/business-owner-growth-playbook.html";
const AUDIT_URL = "https://keyboardkraken.kbkcompanies.com/book";

const templates = [
  {
    name: "bo-lead-01-delivery",
    subject: "Your customer leak audit is inside",
    seriesLabel: "Customer Leak Audit",
    headline: "Your customer leak",
    headlineAccent: "audit is ready.",
    ctaText: "Open The Audit →",
    ctaUrl: AUDIT_DOWNLOAD_URL,
    body: `
      <p style="margin:0 0 14px;">Hey {{{first_name}}} — here is the free local business audit you requested.</p>

      <p style="margin:0 0 14px;">
      It is called <strong>The 5 Places Local Businesses Lose Customers</strong>, and it is built to help you quickly spot where real opportunities may be slipping through the cracks.
      </p>

      <p style="margin:0 0 14px;">
      Most businesses do not need more random marketing tasks. They need to know where visibility, leads, reviews, and follow-up are breaking down.
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            The goal is simple: find the leaks, fix the missed opportunities, and make growth easier to see.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      Open the audit first. As you go through it, ask yourself: “Where are customers most likely getting lost in my business?”
      </p>
    `,
  },

  {
    name: "bo-lead-02-real-problem",
    subject: "Most businesses do not have a traffic problem",
    seriesLabel: "Customer Leak Audit",
    headline: "The real problem",
    headlineAccent: "is usually leaks.",
    ctaText: "Review The 5 Leaks →",
    ctaUrl: AUDIT_DOWNLOAD_URL,
    body: `
      <p style="margin:0 0 14px;">
      Most business owners are already working hard.
      </p>

      <p style="margin:0 0 14px;">
      They are serving customers, answering calls, managing staff, handling appointments, posting when they can, and trying to keep everything moving.
      </p>

      <p style="margin:0 0 14px;">
      The problem is usually not effort. It is that customers are getting lost in a few predictable places:
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ People do not see the business often enough</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Comments, messages, forms, or calls get missed</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Follow-up happens too late or not at all</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Happy customers are not being turned into reviews</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ The owner is buried in repetitive work</p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            Growth gets easier when you know exactly where customers are leaking out.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      That is why the audit starts with visibility, then moves through leads, follow-up, reviews, and efficiency.
      </p>
    `,
  },

  {
    name: "bo-lead-03-leaky-website",
    subject: "People can't buy from you if they don't see you",
    seriesLabel: "Visibility Leak",
    headline: "Visibility is",
    headlineAccent: "the first leak.",
    ctaText: "Check Visibility →",
    ctaUrl: AUDIT_DOWNLOAD_URL,
    body: `
      <p style="margin:0 0 14px;">
      The first place local businesses lose customers is before a conversation ever happens.
      </p>

      <p style="margin:0 0 14px;">
      If people do not see you consistently on Facebook, Instagram, Google, YouTube, or wherever your customers spend time, they may never think of you when they need help.
      </p>

      <p style="margin:0 0 14px;">
      This usually shows up as:
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ Posting only when there is time</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Content that gets low engagement</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Weak hooks that do not stop the scroll</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ No clear next step for interested customers</p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            Better visibility means more reach, more awareness, and more opportunities.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      The fix starts with a simple content plan, stronger hooks, better calls to action, and consistent publishing across the places your customers already check.
      </p>
    `,
  },

  {
    name: "bo-lead-04-example-system",
    subject: "Interested customers are falling through the cracks",
    seriesLabel: "Lead Leak",
    headline: "Every inquiry",
    headlineAccent: "needs to be seen.",
    ctaText: "Find Missed Leads →",
    ctaUrl: AUDIT_DOWNLOAD_URL,
    body: `
      <p style="margin:0 0 14px;">
      Once people start noticing your business, the next leak is lead capture.
      </p>

      <p style="margin:0 0 14px;">
      Local businesses get interest from more places than they realize: comments, direct messages, form submissions, missed calls, review questions, quote requests, and referral conversations.
      </p>

      <p style="margin:0 0 14px;">
      The problem is that those opportunities are often scattered.
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ A comment gets buried</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ A message is opened but not handled</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ A missed call never gets called back</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ A form submission sits too long</p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            The win is making sure every real opportunity gets seen quickly.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      A strong lead alert setup gives you clear notifications, lead tracking, one place to review inquiries, and reminders so nothing important disappears.
      </p>
    `,
  },

  {
    name: "bo-lead-05-agencies-stop-short",
    subject: "Most sales are lost after the first contact",
    seriesLabel: "Follow-Up Leak",
    headline: "The first contact",
    headlineAccent: "is not enough.",
    ctaText: "Check Follow-Up →",
    ctaUrl: AUDIT_DOWNLOAD_URL,
    body: `
      <p style="margin:0 0 14px;">
      A lot of customers do not buy the first time they reach out.
      </p>

      <p style="margin:0 0 14px;">
      They ask a question. They compare options. They get busy. They mean to reply later. Then, if nobody follows up, the opportunity fades.
      </p>

      <p style="margin:0 0 14px;">
      This is where many local businesses lose sales they already had a shot at winning.
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ Follow-up gets forgotten during a busy day</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ There is no reminder to check back in</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Past inquiries are not organized</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ Warm leads slowly go cold</p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            Better follow-up turns more interested people into actual customers.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      The fix is simple: reminders, lead tracking, follow-up sequences, and re-engagement for people who already showed interest.
      </p>
    `,
  },

  {
    name: "bo-lead-06-diy-or-dfy",
    subject: "Customers check reviews before they contact you",
    seriesLabel: "Trust Leak",
    headline: "Reviews build",
    headlineAccent: "the trust gap.",
    ctaText: "Review The Trust Leak →",
    ctaUrl: AUDIT_DOWNLOAD_URL,
    body: `
      <p style="margin:0 0 14px;">
      Before many customers call, book, or request a quote, they check reviews.
      </p>

      <p style="margin:0 0 14px;">
      That means trust is not only built during the service. It is also built before the customer ever contacts you.
      </p>

      <p style="margin:0 0 14px;">
      The trust leak usually looks like this:
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ Happy customers are not asked for reviews</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Review requests happen randomly</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Negative feedback is not caught early</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ Google and Facebook proof does not reflect the real quality of the business</p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            More trust leads to stronger conversion before the first conversation even starts.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      A review growth setup makes it easier to request reviews, collect feedback, monitor reputation, and turn satisfied customers into public proof.
      </p>
    `,
  },

  {
    name: "bo-lead-07-work-with-me",
    subject: "Want me to find the leaks for you?",
    seriesLabel: "Free Growth Audit",
    headline: "Ready to attract",
    headlineAccent: "more customers?",
    ctaText: "Book A Free Growth Audit →",
    ctaUrl: AUDIT_URL,
    body: `
      <p style="margin:0 0 14px;">
      The last leak is efficiency: too much of the owner’s time gets swallowed by posting, checking messages, remembering follow-up, scheduling, admin work, and trying to keep track of everything manually.
      </p>

      <p style="margin:0 0 14px;">
      That is usually the point where growth starts feeling heavier than it should.
      </p>

      <p style="margin:0 0 14px;">
      If you want help, the next step is a free growth audit. We will look for where your business may be losing:
      </p>

      <p style="margin:0 0 6px;padding-left:12px;">→ Visibility</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Leads</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Follow-up opportunities</p>
      <p style="margin:0 0 6px;padding-left:12px;">→ Reviews</p>
      <p style="margin:0 0 20px;padding-left:12px;">→ Time that should be going back into the business</p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:20px 0;">
        <tr>
          <td style="border-left:3px solid #0A8FE8;padding:12px 16px;background:#f0f8ff;">
            <span style="font-family:Arial Black,Arial,sans-serif;font-size:13px;color:#0a0a0a;text-transform:uppercase;">
            The goal is not more software. The goal is a business that consistently attracts, captures, and converts customers.
            </span>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 14px;">
      If that would help, book the audit and we will map out the most practical places to start.
      </p>
    `,
  },
];

async function listExistingTemplates() {
  const res = await fetch("https://api.resend.com/templates", {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  });
  const data = await res.json();
  const list = Array.isArray(data.data) ? data.data : [];
  return Object.fromEntries(list.map((t) => [t.name, t]));
}

async function upsertTemplate(t, existingByName) {
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
      { key: "email", type: "string" },
      { key: "first_name", type: "string" },
    ],
  };

  const existing = existingByName[t.name];

  if (existing) {
    const res = await fetch(`https://api.resend.com/templates/${existing.id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || res.status);
    console.log(`✓ ${t.name} — updated (id: ${existing.id})`);
    return existing.id;
  } else {
    const res = await fetch("https://api.resend.com/templates", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || res.status);
    console.log(`✓ ${t.name} — created (id: ${data.id})`);
    return data.id;
  }
}

async function publishTemplate(id, name) {
  const res = await fetch(`https://api.resend.com/templates/${id}/publish`, {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || res.status);
  console.log(`🚀 ${name} — published`);
}

async function run() {
  console.log("\n🦑 CUSTOMER LEAK AUDIT — RESEND UPSERT + PUBLISH");
  console.log("==================================================");

  const existingByName = await listExistingTemplates();
  console.log(`Found ${Object.keys(existingByName).length} existing templates in Resend\n`);

  for (const t of templates) {
    try {
      const id = await upsertTemplate(t, existingByName);
      await publishTemplate(id, t.name);
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      console.error(`✗ ${t.name} — ${err.message}`);
      process.exitCode = 1;
    }
  }

  console.log("\n✅ Customer leak audit templates done");
}

run();
