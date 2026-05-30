-- Restore: launch-your-free-funnel-website-kit drop
-- Paste this into your Cloudflare D1 console and click Execute.

INSERT OR REPLACE INTO starter_drops (
  id, slug, title, excerpt, category, cover_image_url, difficulty,
  estimated_build_time, tools_used, published, related_article_slug,
  what_this_builds, what_you_get, build_prompt, file_tree,
  setup_steps, edit_map, troubleshooting, upgrade_note,
  created_at, updated_at
) VALUES (
  'drop-free-funnel-website-001',
  'launch-your-free-funnel-website-kit',
  'Launch Your Free Funnel Website',
  'Stop renting your funnel from ClickFunnels or Kajabi. This kit builds a real 3-page lead capture website you own permanently — deployed free on Cloudflare with zero monthly fees.',
  'Funnels',
  NULL,
  'Beginner',
  '1–2 hours',
  '["React","Vite","Cloudflare Pages","Cloudflare Workers","GitHub"]',
  1,
  NULL,
  '["3-page funnel website — opt-in page, thank you page, and offer page","Cloudflare Pages frontend on a free global CDN — fast everywhere","Cloudflare Worker API layer ready for future automation connections","Professional clean design with no navigation — one page, one job","Placeholder email form with clear comments for connecting MailerLite in Module 3","Webhook handler stub ready for Google Sheets or Telegram in Module 4","Zero database required — deploy it and it works immediately"]',
  '["Complete AI build prompt — paste into Claude or Google AI Studio to generate every file","Full repo file tree with beginner-friendly file names and clear edit comments","Cloudflare Pages and Workers step-by-step setup guide","Local dev and deploy commands","Edit map in plain language — which file controls which part of the site","Troubleshooting guide for the most common first-time deploy issues"]',
  'You are building me a complete GitHub repo that MUST deploy and run correctly on Cloudflare.

This project is a free funnel website — a 3-page lead capture system that a beginner can own permanently with zero monthly fees.

The user should NOT have to fill in anything before using this prompt.

Build the app using the details below.

--------------------------------------------------
ARCHITECTURE
--------------------------------------------------

Frontend:
- React + Vite
- Deployed on Cloudflare Pages

Backend:
- Separate Cloudflare Worker
- NOT Pages Functions

API:
- All endpoints under /api/*
- Frontend calls API using relative path:
  fetch("/api/...")

--------------------------------------------------
CLOUDFLARE RULES
--------------------------------------------------

- No Express
- No Node-only APIs
- No server.listen()
- Must work in Workers runtime
- No filesystem writes
- Must deploy cleanly to Cloudflare

--------------------------------------------------
REPO STRUCTURE
--------------------------------------------------

/src
/public
/worker/index.ts
/worker/wrangler.toml
/worker/migrations/ (for future D1 if added)
package.json
vite.config.ts
README.md

--------------------------------------------------
SITE DEFINITION
--------------------------------------------------

Site Type:
3-page funnel website — lead capture system

Site Name:
Free Funnel Website

Core Purpose:
Help the builder launch a real lead capture funnel they permanently own, deployed for free, with no platform subscription required.

Framing:
This is the alternative to ClickFunnels, Kajabi, and Systeme.io. Instead of renting a funnel on someone else''s platform, you own every file, every page, and every byte of data — and it costs nothing to keep live.

Target Audience:
Any beginner building an online presence. Use placeholder copy that fits most niches.

Main Pages:
- Home / Opt-In Page
- Thank You Page
- Offer Page

Lead Magnet:
Free Checklist

Offer:
Placeholder next-step offer — clearly marked for the builder to swap in their own product, affiliate link, service, or recommended resource.

Design Style:
Clean, modern, mobile-first, professional. Fast-loading. No unnecessary elements.

Tone:
Direct, practical, beginner-friendly, and trustworthy.

--------------------------------------------------
FUNNEL STRUCTURE
--------------------------------------------------

This is NOT a generic website. It is a conversion-focused funnel.

Build a 3-page funnel system where each page has one job.

1. Home Page / Opt-In Page
Route: /

Requirements:
- No navigation menu — this is intentional. One page, one job.
- Strong headline focused on the free checklist benefit
- 3–5 trust-building bullet points explaining what they get
- Placeholder email opt-in form built as:
  /src/components/OptInForm.jsx

Add this comment inside the form component:
REPLACE THIS WITH EMAIL EMBED CODE IN MODULE 3

Opt-in form fields:
- firstName
- email

Button text:
Send Me the Free Checklist

After placeholder submit:
- Redirect user to /thank-you

2. Thank You Page
Route: /thank-you

Requirements:
- Confirm the checklist is on its way
- Tell the visitor to check their inbox
- Build trust with simple, warm copy
- Include a clear button to continue to /offer

3. Offer Page
Route: /offer

Requirements:
- Bridge-style offer page
- Present a helpful next-step recommendation
- Explain how it goes deeper than the free checklist
- Clearly mark the CTA link as a placeholder with a comment:
  REPLACE THIS LINK WITH YOUR OFFER URL
- Include a secondary line of text under the CTA for context

--------------------------------------------------
FORM + FUTURE AUTOMATION PREP
--------------------------------------------------

Include a submit handler named:

handleSubmit()

Inside it, include a placeholder function:

sendLeadToWebhook({ firstName, email })

Do NOT implement the webhook yet.

Add this comment above it:
WEBHOOK URL WILL BE ADDED IN MODULE 4

The form structure should make it easy to later connect:
- MailerLite
- EmailOctopus
- Google Apps Script Web App
- Google Sheets
- Telegram bot notifications

--------------------------------------------------
WORKER — HEALTH CHECK ONLY FOR NOW
--------------------------------------------------

Include one Worker route:

GET /api/health

Return:
{ "ok": true, "service": "funnel-api" }

The Worker structure should be clean and easy to extend later for:
- Webhook forwarding to email platforms
- Google Sheets lead logging
- Telegram notifications
- Form validation

Add a comment in the Worker:
ADD YOUR WEBHOOK HANDLER HERE IN MODULE 4

--------------------------------------------------
NO DATABASE IN THIS BUILD
--------------------------------------------------

Do NOT include D1 or R2.

The funnel works immediately after deploy without any database.
Lead capture and storage will be added in later modules via the Worker webhook layer.

--------------------------------------------------
CODE ORGANIZATION
--------------------------------------------------

/src/pages/Home.jsx       — Opt-in page
/src/pages/ThankYou.jsx   — Thank you page
/src/pages/Offer.jsx      — Offer page
/src/components/OptInForm.jsx — Email form (module 3 connection point)
/src/App.jsx              — Route definitions
/src/main.jsx             — Entry point
/src/styles.css           — All styles
/worker/index.ts          — API logic
/worker/wrangler.toml     — Worker config
package.json
vite.config.ts
README.md

Use clear file names.
Add beginner-friendly comments wherever something will be edited later.
Do not abstract logic into confusing utility files.

--------------------------------------------------
LOCAL DEV + DEPLOY
--------------------------------------------------

Local dev:
npm install
npm run dev                          (frontend)
npx wrangler dev worker/index.ts     (Worker, in a second terminal)

Deploy:
npm run build
npx wrangler pages deploy dist
npx wrangler deploy -c worker/wrangler.toml

--------------------------------------------------
CLOUDFLARE SETUP GUIDE
--------------------------------------------------

Include clear beginner-friendly instructions for:
- Creating the GitHub repo and uploading files via the GitHub web UI (no terminal needed)
- Creating a Cloudflare Pages project connected to the GitHub repo
- Setting the build command (npm run build) and output directory (dist)
- Deploying the Cloudflare Worker with wrangler
- How /api/* routes are proxied from Pages to the Worker
- How the frontend uses relative fetch paths so no hardcoded URLs are needed

--------------------------------------------------
BUILD THE SITE
--------------------------------------------------

Requirements:
- Real content — no lorem ipsum
- Mobile-first responsive layout
- Clean, professional design that looks credible
- Fast loading — no unnecessary libraries or heavy assets
- No broken links — mark placeholders with clear comments
- Strong funnel flow with one clear CTA per page
- Cloudflare-compatible code only

--------------------------------------------------
HOW TO EDIT THE SITE
--------------------------------------------------

Explain in plain language:
- Which file controls each page
- Where to edit headlines, copy, and bullet points
- Where to paste the MailerLite or EmailOctopus embed code (Module 3)
- Where to paste the Google Apps Script webhook URL (Module 4)
- How to change the offer link on the Offer page
- How to change colors and styles
- Where to add images or logos
- How the /thank-you redirect works
- Where the Worker API logic lives

--------------------------------------------------
FINAL OUTPUT
--------------------------------------------------

Return:
1. Full file tree
2. Complete code for every file
3. Cloudflare setup steps
4. Local dev steps
5. Deploy steps
6. How to edit the site — plain language
7. Troubleshooting section

FINAL RULE:
If anything would fail on Cloudflare, fix it before returning.

please confirm understanding and then I will decide to approve whether to start coding/building',
  '/src
  /pages
    Home.jsx
    ThankYou.jsx
    Offer.jsx
  /components
    OptInForm.jsx
  App.jsx
  main.jsx
  styles.css
/public
/worker
  index.ts
  wrangler.toml
package.json
vite.config.ts
README.md',
  '[{"title":"Create your GitHub repo","text":"Go to github.com and create a new repository. Upload all the files from the AI-generated output by dragging and dropping them in the GitHub web UI — no terminal needed for this step."},{"title":"Create a Cloudflare Pages project","text":"Go to Cloudflare Dashboard, open Workers and Pages, click Create, then Pages, then Connect to Git. Select your GitHub repo. Set the build command to: npm run build. Set the output directory to: dist. Cloudflare will auto-deploy every time you push to GitHub."},{"title":"Deploy the Cloudflare Worker","text":"Open a terminal in your project folder and run: npx wrangler deploy -c worker/wrangler.toml. This deploys your background API layer. You only need to redeploy the Worker when you change worker/index.ts."},{"title":"Verify API routing","text":"The frontend uses relative paths like fetch(\"/api/health\") — Cloudflare Pages automatically proxies /api/* requests to your Worker. No manual routing config is needed with the included wrangler.toml setup."},{"title":"Test the full funnel","text":"Visit your Cloudflare Pages URL. Fill out the opt-in form — you should be redirected to /thank-you. Click through to /offer. Open /api/health in your browser and confirm it returns {\"ok\":true}. Your funnel is live."}]',
  '[{"file":"/src/pages/Home.jsx","description":"Opt-in page — edit the headline, subheadline, and benefit bullet points here"},{"file":"/src/pages/ThankYou.jsx","description":"Thank you page — edit the confirmation copy and the button that leads to /offer"},{"file":"/src/pages/Offer.jsx","description":"Offer page — replace the placeholder CTA link and copy with your actual offer, affiliate link, or service"},{"file":"/src/components/OptInForm.jsx","description":"Email form — paste your MailerLite or EmailOctopus embed code here in Module 3"},{"file":"/src/styles.css","description":"All styles — change colors, fonts, spacing, button styles, and layout here"},{"file":"/worker/index.ts","description":"Background API — add your webhook URL and form processing logic here in Module 4"}]',
  '[{"problem":"Pages site not loading after deploy","solution":"Check the Cloudflare Pages build settings — build command should be npm run build and output directory should be dist. Trigger a manual redeploy from the Cloudflare dashboard if needed."},{"problem":"Worker not responding at /api/health","solution":"Make sure the Worker was deployed by running npx wrangler deploy -c worker/wrangler.toml. Check your wrangler.toml to confirm the routes section includes your Cloudflare Pages domain."},{"problem":"Opt-in form submits but nothing happens","solution":"This is expected in the starter build. The form is a placeholder. Email platform connection is added in Module 3 and the webhook handler in Module 4."},{"problem":"Local dev not working","solution":"Run npm install first. Then open two terminals — run npm run dev in the first for the frontend, and npx wrangler dev worker/index.ts in the second for the Worker API."},{"problem":"Offer page link goes nowhere","solution":"The offer CTA is a placeholder by design. Open /src/pages/Offer.jsx and replace the placeholder href with your actual offer URL."}]',
  NULL,
  datetime('now'),
  datetime('now')
);
