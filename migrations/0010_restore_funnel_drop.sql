-- Restore: starter-funnel-shell-cloudflare drop
-- Paste this into your Cloudflare D1 console and click Execute.

INSERT OR REPLACE INTO starter_drops (
  id, slug, title, excerpt, category, cover_image_url, difficulty,
  estimated_build_time, tools_used, published, related_article_slug,
  what_this_builds, what_you_get, build_prompt, file_tree,
  setup_steps, edit_map, troubleshooting, upgrade_note,
  created_at, updated_at
) VALUES (
  'drop-funnel-shell-cf-001',
  'starter-funnel-shell-cloudflare',
  'Starter Funnel Shell — Cloudflare',
  '3-page lead capture funnel deployed free on Cloudflare Pages and Workers. Build your first opt-in page, thank you page, and offer page — no monthly fees, no platform lock-in.',
  'Funnels',
  NULL,
  'Beginner',
  '1–2 hours',
  '["React","Vite","Cloudflare Pages","Cloudflare Workers","GitHub"]',
  1,
  NULL,
  '["3-page lead capture funnel — opt-in, thank you, and offer pages","Cloudflare Pages frontend on a free global CDN","Cloudflare Worker API with health check route at /api/health","Beginner-friendly file structure with clear edit comments throughout","Placeholder email form ready to connect to MailerLite in Module 3","Webhook handler stub ready for automation in Module 4"]',
  '["Complete AI build prompt — paste into Claude or Google AI Studio to generate every file","Full repo file tree with beginner-friendly structure","Cloudflare Pages and Workers setup guide","Local dev and deploy steps","Edit map — exactly which files to change for content, styles, and offers","Troubleshooting guide for the most common deploy issues"]',
  'You are building me a complete GitHub repo that MUST deploy and run correctly on Cloudflare.

This project is for a beginner-friendly starter funnel site.

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
/worker/migrations/ if D1 is later added
package.json
vite.config.ts
README.md

--------------------------------------------------
SITE DEFINITION
--------------------------------------------------

Site Type:
3-page funnel / app-style lead capture site

Site Name:
Starter Funnel

Core Purpose:
Help the user build their first simple online funnel using free or low-cost tools.

Target User:
The site owner''s ideal audience. Since this is a starter template, use beginner-friendly placeholder copy that can fit most niches.

Main Pages:
- Home / Opt-In Page
- Thank You Page
- Offer Page

Lead Magnet:
Free Checklist

Offer:
Placeholder next-step offer, affiliate offer, service, product, or recommended resource.

Design Style:
Clean, modern, mobile-friendly, professional, and simple.

Tone:
Clear, beginner-friendly, practical, and trustworthy.

--------------------------------------------------
FUNNEL STRUCTURE
--------------------------------------------------

This is NOT a generic app.

Build a 3-page funnel system.

1. Home Page / Opt-In Page
Route: /

Requirements:
- No navigation menu
- One clear call-to-action
- Strong headline
- Short explanation of the free checklist
- Trust-building bullet points
- Placeholder email opt-in form
- Form must be built as:
  /src/components/OptInForm.jsx

Add this comment inside the form component:
REPLACE THIS WITH EMAIL EMBED CODE IN MODULE 3

Opt-in form fields:
- firstName
- email

Button text:
Send Me the Free Checklist

After successful placeholder submit:
- redirect user to /thank-you

2. Thank You Page
Route: /thank-you

Requirements:
- Explain the free checklist is on the way
- Build trust with simple beginner-friendly copy
- Tell the user to check their inbox
- Include a button to continue to /offer

3. Offer Page
Route: /offer

Requirements:
- Simple bridge-style offer page
- Present a generic next-step offer that the user can later replace with their own product, affiliate offer, service, or recommended resource
- Explain that the next step helps the visitor go deeper after downloading the free checklist
- Include a placeholder CTA button
- Add a clear comment showing where to change the offer link later

--------------------------------------------------
FORM + FUTURE AUTOMATION PREP
--------------------------------------------------

Include a submit handler named:

handleSubmit()

Inside it, include a placeholder function named:

sendLeadToWebhook({ firstName, email })

Do NOT fully implement the webhook yet.

Add this comment:
WEBHOOK URL WILL BE ADDED IN MODULE 4

The form should be easy to update later so it can connect to:
- MailerLite
- EmailOctopus
- Google Apps Script Web App
- Google Sheets
- Telegram notifications

--------------------------------------------------
DATA + STORAGE DECISION
--------------------------------------------------

For this Module 2 build:
- Use neither D1 nor R2 by default.

Reason:
This is the first funnel shell. The email provider and automation webhook will be connected later in Modules 3 and 4.

Do not create unnecessary database/storage complexity yet.

Still include a basic Worker health route:

GET /api/health

It should return JSON:
{ "ok": true, "service": "starter-funnel-api" }

--------------------------------------------------
CODE ORGANIZATION
--------------------------------------------------

Use this beginner-friendly structure:

/src/pages/Home.jsx
/src/pages/ThankYou.jsx
/src/pages/Offer.jsx
/src/components/OptInForm.jsx
/src/App.jsx
/src/main.jsx
/src/styles.css
/worker/index.ts
/worker/wrangler.toml
package.json
vite.config.ts
README.md

Use clear names.
Use comments where a beginner would edit something later.
Do not hide important logic in confusing files.

--------------------------------------------------
LOCAL DEV + DEPLOY
--------------------------------------------------

Local:
npm install
npm run dev
npx wrangler dev worker/index.ts

Deploy:
npm run build
npx wrangler pages deploy dist
npx wrangler deploy -c worker/wrangler.toml

--------------------------------------------------
CLOUDFLARE SETUP STEPS
--------------------------------------------------

Explain:
- how to create the GitHub repo
- how to upload the files to GitHub
- how to create the Cloudflare Pages project
- how to deploy the frontend
- how to deploy the Worker
- how routes connect under /api/*
- how the frontend uses relative fetch paths like fetch("/api/...")

--------------------------------------------------
BUILD THE SITE
--------------------------------------------------

Requirements:
- clean UI
- mobile responsive
- real content, not lorem ipsum
- beginner-friendly code
- no broken links unless clearly marked as placeholders
- strong funnel flow
- clear CTA
- fast-loading design
- Cloudflare-compatible code only

--------------------------------------------------
HOW TO EDIT THE SITE
--------------------------------------------------

Explain clearly:

- Which files control pages
- Which files control components
- Where styles are changed
- Where text/content is edited
- Where the opt-in form lives
- Where to paste MailerLite/EmailOctopus embed code later
- Where to paste the Google Apps Script Web App URL later
- How to change the offer link
- How the /thank-you page connects
- Where API logic lives
- Where images/assets go

Use simple beginner-friendly explanations.

--------------------------------------------------
FINAL OUTPUT
--------------------------------------------------

Return:

1. Full file tree
2. Full code for every file
3. Cloudflare setup steps
4. Local dev steps
5. Deploy steps
6. How to edit the site later
7. Troubleshooting section

FINAL RULE:
If anything would break on Cloudflare, fix it before returning.

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
  '[{"title":"Create your GitHub repo","text":"Go to github.com and create a new repository. Upload all the files from the AI-generated output directly in the GitHub web UI by dragging and dropping — no terminal required."},{"title":"Create a Cloudflare Pages project","text":"Go to Cloudflare Dashboard, open Workers and Pages, click Create, then Pages, then Connect to Git. Select your GitHub repo. Set the build command to: npm run build. Set the output directory to: dist."},{"title":"Deploy the Cloudflare Worker","text":"Open a terminal in your project folder and run: npx wrangler deploy -c worker/wrangler.toml. This deploys your API layer. You only need to do this again if you change worker/index.ts."},{"title":"Verify API routing","text":"The frontend calls the API using relative paths like fetch(\"/api/health\"). Cloudflare Pages automatically proxies those requests to your Worker. No extra configuration is needed — it works out of the box with the repo structure."},{"title":"Test the full funnel flow","text":"Visit your Cloudflare Pages URL. Submit the opt-in form — it should redirect to /thank-you. Click through to /offer. Open /api/health in your browser and confirm it returns {\"ok\":true}."}]',
  '[{"file":"/src/pages/Home.jsx","description":"Main opt-in page — edit the headline, subheadline, and bullet points here"},{"file":"/src/pages/ThankYou.jsx","description":"Thank you page — edit confirmation copy and the button that leads to /offer"},{"file":"/src/pages/Offer.jsx","description":"Offer page — replace placeholder copy and CTA link with your actual offer or affiliate link"},{"file":"/src/components/OptInForm.jsx","description":"Email opt-in form — paste your MailerLite or EmailOctopus embed code here in Module 3"},{"file":"/src/styles.css","description":"All styles — change colors, fonts, spacing, and layout here"},{"file":"/worker/index.ts","description":"API logic — add your webhook URL here in Module 4 to connect your email platform"}]',
  '[{"problem":"Pages not loading after deploy","solution":"Check Cloudflare Pages build settings — build command should be npm run build and output directory should be dist"},{"problem":"Worker not responding at /api/health","solution":"Make sure the Worker is deployed by running npx wrangler deploy -c worker/wrangler.toml and that your wrangler.toml routes include your Pages domain"},{"problem":"Form submits but nothing happens","solution":"This is expected in the starter build. The email platform connection is added in Module 3 and the webhook automation in Module 4"},{"problem":"Local dev not working","solution":"Run npm install first. Then start the frontend with npm run dev in one terminal and the Worker with npx wrangler dev worker/index.ts in a second terminal"}]',
  NULL,
  datetime('now'),
  datetime('now')
);
