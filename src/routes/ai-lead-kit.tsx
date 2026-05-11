import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Copy, Check, AlertTriangle, Zap, ArrowRight, Info } from "lucide-react";

export const Route = createFileRoute("/ai-lead-kit")({ component: AiLeadKitPage });

const PROMPTS = [
  {
    id: "prompt-1",
    label: "Prompt 1",
    title: "Generate the Initial Lead System",
    body: `Build a production-ready marketing website with lead capture using a Cloudflare-compatible stack.

1) Tech stack and deployment constraints
Use React + Vite + TypeScript.

Must deploy cleanly to Cloudflare Pages (preferred) and be compatible with Cloudflare Workers runtime patterns.

Do not use Node-only server APIs (no fs, no Express, no server dependencies that require Node runtime).

Keep code portable and vendor-neutral (no proprietary lock-in).

Project must be cleanly versioned for GitHub.

2) Architecture requirements
Frontend-first architecture with static assets and client-rendered UI.

Include a serverless-compatible submission path for lead form data:
  Option A: Cloudflare Pages Function (/functions/api/contact.ts)
  Option B: Worker endpoint (/api/contact)

Use a simple adapter/service layer so form submission can be redirected later without UI rewrites.
Example: submitLead(payload, provider)

Keep code modular and easy to extend.

3) Required pages/sections
Create:
  Landing page containing:
    - Hero section
    - Benefits section (3–6 items)
    - CTA section
    - Contact/Lead form
  Thank-you page/state after successful submit

4) Form requirements
Fields: name, email, phone, message

Validation:
  - required: name, email, message
  - email format validation
  - basic phone validation (string length/pattern)
  - clear inline error messages
  - loading and disabled submit state
  - success redirect to thank-you page
  - graceful error state if submission fails

5) Integration-ready design (important)
Structure form handling so it can later connect to:
  - generic webhook endpoints
  - Cloudflare Workers
  - n8n automations
  - Telegram alerts
  - email alerts
  - Google Sheets

Implementation requirement:
Create a dedicated integration module (e.g. src/lib/leadProviders/) with provider adapters/interfaces.
Include at least one working default provider (generic webhook POST).
Keep other providers scaffolded with clear TODOs and typed interfaces.

6) UI/UX requirements
Mobile-first responsive design.
Premium modern visual style (clean typography, spacing, strong hierarchy).
Fast-loading and minimal bundle bloat.
Accessible markup (labels, aria where appropriate, keyboard-friendly form).

7) Deliverables
Generate complete project structure and production-ready code including:
  - package.json scripts for dev/build/preview
  - Vite config
  - Cloudflare deployment config/instructions
  - .env.example with all required env vars
  - README with local setup, build instructions, Cloudflare Pages deploy steps, how to switch lead providers

8) Output quality bar
No pseudocode. No placeholder-only UI.
Code should run after install with minimal setup.
Keep implementation simple, clean, and maintainable.`,
  },
  {
    id: "prompt-2",
    label: "Prompt 2",
    title: "Cloudflare Deployment Audit",
    body: `Audit this project for Cloudflare Pages deployment compatibility.

Do NOT redesign the site.
Do NOT change copy or layout unless required for functionality.
Do NOT add unnecessary dependencies.

Check and fix:
- React + Vite + TypeScript build errors
- package.json scripts
- Vite config
- TypeScript errors
- Cloudflare Pages compatibility
- environment variable usage
- form submission path
- thank-you redirect/state
- no Node-only APIs
- no Express
- no fs
- no server.listen
- no backend code that requires Node runtime
- no hardcoded secrets in frontend code

Make sure:
- npm install works
- npm run build works
- the project can deploy from GitHub to Cloudflare Pages
- the lead form still validates correctly
- the submit flow still works
- the integration layer is clean and easy to extend

Output:
1. List issues found.
2. Fix the issues.
3. Return full updated code for changed files.
4. Confirm Cloudflare Pages compatibility.`,
  },
  {
    id: "prompt-3",
    label: "Prompt 3",
    title: "Connect Telegram Lead Alerts",
    body: `You are editing an existing React + Vite + TypeScript lead capture project that already has a working lead form and Cloudflare-compatible submission path.

Goal:
Connect the lead form submission to Telegram alerts using a Cloudflare-compatible backend path.

Do NOT rebuild the app.
Do NOT change the visual design unless required.
Do NOT remove existing form fields.
Do NOT add Node-only dependencies.
Do NOT use Express, fs, or Node server APIs.

Current form fields: name, email, phone, message

Required behavior:
When a lead submits the form successfully, send a Telegram message to the business owner containing:

New Lead Captured

Name:
Email:
Phone:
Message:
Timestamp:
Source Page:

Implementation requirements:
- Use a Cloudflare Pages Function or Worker-compatible endpoint.
- Read TELEGRAM_BOT_TOKEN from environment variables.
- Read TELEGRAM_CHAT_ID from environment variables.
- Never expose the bot token in frontend code.
- Frontend should POST lead data to the backend endpoint.
- Backend endpoint should send the Telegram message using fetch().
- Keep the existing success redirect/thank-you behavior.
- Add clear error handling.
- Keep TypeScript safe.
- Keep code simple and production-ready.

Add/update:
- .env.example
- README instructions explaining:
  1. how to create a Telegram bot with BotFather
  2. how to get the Telegram chat ID
  3. how to add environment variables in Cloudflare Pages
  4. how to test the form

Environment variables:
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

Output:
1. Briefly explain what files you changed.
2. Return the full updated code for changed files.
3. Confirm that the Telegram token is only used server-side.`,
  },
];

const WORKFLOW_STEPS = [
  {
    title: "Step 1: Generate the initial lead capture website",
    subtitle: "Use Lovable (or another AI builder) to create the project",
    details: [
      `Create a free account on Lovable.dev Go to lovable.dev and sign up. Lovable is an AI-powered app builder that generates a full React + Vite project from a plain-English prompt. You can also use Bolt.new or v0.dev — they all export real code you can push to GitHub.`,
      `Start a new project Click "New Project" inside Lovable. Give it a name like "LeadCaptureSite" or your business name. This creates a blank workspace where your AI-generated code will live.`,
      `Paste in Prompt 1 from the guide Copy the full text of Prompt 1 (the "Generate the Initial Lead System" prompt) and paste it into the Lovable chat. Be sure to include the entire prompt — the tech stack, architecture, form fields, and all. Lovable will generate the full project structure for you.`,
      `Review the generated preview Lovable will show a live preview of the site. Scroll through it and verify you see: a hero section, a benefits section, a contact form with name/email/phone/message fields, and a thank-you state. The visuals don't need to be perfect at this stage — you're checking structure, not design.`,
      `Confirm the project files exist In Lovable's file explorer, check that you can see: package.json, vite.config.ts, src/ folder, and a functions/ or src/lib/ folder for the form submission handler. If any of these are missing, ask Lovable to regenerate with Prompt 1 again.`,
    ],
  },
  {
    title: "Step 2: Push the project to GitHub",
    subtitle: "Export your generated code into a GitHub repository",
    details: [
      `Create a free GitHub account if you don't have one Go to github.com and sign up. Your username will appear in repo URLs, so pick something professional.`,
      `Create a new GitHub repository Click the "+" icon in GitHub → "New repository". Name it something like lead-capture-site. Set it to Private if you want (Cloudflare can still access it). Do NOT initialize it with a README — Lovable will push the files itself.`,
      `Connect Lovable to your GitHub account In Lovable, go to Settings → GitHub Integration. Authorize Lovable to access your GitHub repos. Select the empty repo you just created. Lovable will push all generated project files into it automatically.`,
      `Verify the push was successful Go to your GitHub repo in the browser and refresh. You should see all your project files: src/, public/, package.json, vite.config.ts, etc. If the repo is still empty, go back to Lovable and push again from the GitHub settings panel.`,
    ],
  },
  {
    title: "Step 3: Audit and fix Cloudflare compatibility issues",
    subtitle: "Use Claude or GitHub AI to review and patch the code",
    details: [
      `Open your GitHub repo in claude.ai or GitHub Copilot In Claude, use the "Connect to GitHub" option or paste the relevant files (vite.config.ts, package.json, and your form submission handler) directly into the chat. In GitHub, use the Copilot Chat panel with your repo open.`,
      `Paste in Prompt 2 from the guide Paste the full "Cloudflare Deployment Audit" prompt into Claude or Copilot Chat. The AI will scan the code and flag: Node-only imports, missing Vite config settings, TypeScript errors, and any form submission logic that won't work on Cloudflare Pages.`,
      `Apply the suggested fixes The AI will return updated code for any changed files. Copy and paste each fixed file back into your GitHub repo using the web editor (click a file → pencil icon → paste → commit). Or use GitHub Desktop to apply changes locally first.`,
      `Confirm the build succeeds locally (optional but recommended) If you have Node.js installed, open PowerShell in the project folder and run: npm install npm run build. If both commands complete without errors, you're ready to deploy. If you don't have Node, skip to Step 4 — Cloudflare will attempt the build in the cloud and show you any errors there.`,
    ],
  },
  {
    title: "Step 4: Deploy from GitHub to Cloudflare Pages",
    subtitle: "Connect your repo and launch your live site",
    details: [
      `Log into Cloudflare and go to Pages Go to dash.cloudflare.com. In the left sidebar, click "Workers & Pages". Then click "Create application" → "Pages" → "Connect to Git".`,
      `Authorize GitHub and select your repo Cloudflare will ask you to connect your GitHub account. Authorize it, then select the repo you pushed your project to in Step 2. Click "Begin setup".`,
      `Set the build configuration Cloudflare will ask for build settings. Use these exact values: Framework preset: Vite, Build command: npm run build, Build output directory: dist. Leave everything else as default. Click "Save and Deploy".`,
      `Wait for the build to complete Cloudflare will pull your code from GitHub, run npm install + npm run build, and deploy the output. This takes about 60–90 seconds. Watch the build log — if it fails, read the error and go back to Step 3 for another AI audit pass.`,
      `Open your live site When the build succeeds, Cloudflare gives you a URL like yoursite.pages.dev. Open it and verify the site loads correctly, the form is visible, and all sections appear. From now on, any commit pushed to GitHub will trigger an automatic redeploy.`,
    ],
  },
  {
    title: "Step 5: Connect Telegram lead notifications",
    subtitle: "Wire up instant alerts when someone fills out the form",
    details: [
      `Open Telegram and find BotFather In Telegram (mobile or desktop), use the search bar to find @BotFather. This is Telegram's official bot for creating new bots. Start a chat with it.`,
      `Create your bot and get the token Send the command /newbot to BotFather. It will ask for a display name, then a username (must end in "bot", e.g. MyLeadsBot). BotFather will reply with your bot token — a string that looks like: 123456789:AAExampleTokenGoesHere.`,
      `Get your Telegram Chat ID Search for your new bot in Telegram and send it any message (e.g. "hello"). Then open this URL in your browser — replace YOUR_BOT_TOKEN with your actual token: https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates. In the JSON response, find the "chat" object and copy the "id" number. That's your Chat ID. For personal chats it's a positive number; for groups it starts with a minus sign.`,
      `Paste Prompt 3 into Claude with your project files Open Claude and paste in the "Connect Telegram Lead Alerts" prompt. Include the contents of your current form submission file and functions/api/contact.ts if it exists. Claude will return updated code that sends a Telegram message on every lead submission.`,
      `Add the updated files to GitHub Copy the updated files Claude returns and commit them to your GitHub repo. The main file to update is usually functions/api/contact.ts (the Cloudflare Pages Function). Also add or update the .env.example file.`,
      `Add environment variables to Cloudflare Pages In your Cloudflare Pages project, go to Settings → Environment Variables → Add variable. Add both: TELEGRAM_BOT_TOKEN = your_token_here and TELEGRAM_CHAT_ID = your_chat_id_here. After saving, trigger a new deployment (push any small change to GitHub, or use the "Retry deployment" button in Cloudflare).`,
    ],
  },
  {
    title: "Step 6: Submit a test lead and confirm end-to-end",
    subtitle: "Verify the full system works before going live",
    details: [
      `Open your live Cloudflare Pages URL Go to yoursite.pages.dev in a regular browser window (not localhost). You want to test the live deployed version, not your local dev environment, since the Telegram function only runs on Cloudflare's edge servers.`,
      `Fill out the form with test data Enter realistic-looking test data in all fields — a name, a valid email address format, a phone number, and a message. This matters because the form validates all fields before submitting. Click the submit button.`,
      `Confirm the thank-you state appears After clicking submit, the form should either redirect to a thank-you page or show a thank-you state inline (depending on how it was built). If you see an error message instead, check the browser console (F12 → Console) for the error and report it back to Claude for a fix.`,
      `Check Telegram for the alert Within a few seconds of submitting, you should receive a Telegram message from your bot containing all the lead data: name, email, phone, message, timestamp, and source page. If no message arrives within 30 seconds, check the troubleshooting steps below.`,
      `Troubleshoot if needed If no Telegram message arrives: 1. Check env vars are saved in Cloudflare Pages Settings; 2. Trigger a fresh deployment (env vars need a redeploy to apply); 3. Verify you sent a message to the bot before testing; 4. Re-check the Chat ID (group IDs start with a minus sign); 5. Open Cloudflare Pages → Functions → Logs to see server errors.`,
      `You're live — what's next Once the full flow works, your lead system is production-ready. You can now: connect a custom domain, add the leads to a Google Sheet via n8n, set up follow-up email sequences, or expand the form with additional fields. Every future change pushes through GitHub → Cloudflare automatically.`,
    ],
  },
];

const PROBLEMS_SOLVED = [
  "Most AI site builders create nice-looking mockups that are not connected to real business workflows.",
  "People spend hours tweaking designs but never launch anything.",
  "Forms often do not actually connect to alerts or follow-up systems.",
  "Projects get trapped inside proprietary AI builder ecosystems.",
  "Most beginners do not understand GitHub, deployment, webhooks, or hosting.",
];

const STEP_NOTES = {
  tips: [
    "The prompt specifically requests React + Vite + TypeScript with a Cloudflare-compatible form submission path. Don't skip or shorten it — every line matters for the next steps.",
    "Alternative: if your AI builder doesn't have a GitHub integration, download the project as a .zip, extract it, and use GitHub Desktop (no command line) to push the folder to a new repo.",
    "You can connect a custom domain later from Pages → Custom Domains. For now, the .pages.dev URL is fully functional.",
    "Environment variables are stored securely server-side. They are never exposed to the browser or visible in your GitHub code.",
    "The system is now fully operational. Real leads → real Telegram alerts → real follow-up capability.",
  ],
  warnings: [
    "Common issues found at this stage: Express used in the API endpoint, fs module imported, or missing wrangler.toml. The audit prompt is specifically designed to catch all of these.",
    "Save this token somewhere safe. Never paste it into frontend code or commit it to GitHub.",
  ],
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground transition"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function PromptBox({ prompt }: { prompt: (typeof PROMPTS)[0] }) {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mr-3">
            {prompt.label}
          </span>
          <span className="text-sm font-semibold text-foreground">{prompt.title}</span>
        </div>
        <CopyButton text={prompt.body} />
      </div>
      <pre className="px-5 py-5 text-[13px] text-foreground/80 leading-relaxed whitespace-pre-wrap font-mono overflow-x-auto">
        {prompt.body}
      </pre>
    </div>
  );
}

function AiLeadKitPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background" />
        <div className="relative max-w-4xl mx-auto px-6 pt-16 pb-12 md:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-5">
            <Zap className="h-3 w-3" /> Free Starter Kit · Keyboard Kraken
          </div>
          <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground md:text-5xl">
            AI Lead System <span className="text-primary">Generator</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            A practical workflow for generating, deploying, and connecting a real lead capture
            system that alerts you the moment someone fills out your form. Built with AI, GitHub,
            Cloudflare, and Telegram.
          </p>
        </div>
      </section>

      {/* WHAT PROBLEM THIS SOLVES */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-destructive mb-4">
            <AlertTriangle className="h-3.5 w-3.5" /> The Problem
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl mb-8">
            Why most AI-built sites <span className="text-destructive">never actually work</span>
          </h2>
          <ul className="space-y-3">
            {PROBLEMS_SOLVED.map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground/80">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-destructive shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WORKFLOW OVERVIEW */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
            The Workflow
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl mb-8">
            6-step overview
          </h2>
          <div className="space-y-4">
            {WORKFLOW_STEPS.map((step, i) => (
              <details
                key={step.title}
                className="rounded-lg border border-border bg-surface p-5 group"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[12px] font-black text-white">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-foreground font-semibold leading-relaxed">{step.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{step.subtitle}</p>
                  </div>
                </summary>
                <div className="mt-4 pl-11">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">
                    Step details
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed"
                      >
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-border bg-surface p-6">
            <h3 className="font-semibold mb-3">Important Tips & Warnings</h3>
            {STEP_NOTES.tips.map((tip) => (
              <div key={tip} className="flex gap-2 text-sm text-blue-700 dark:text-blue-300 mb-2">
                <Info className="h-4 w-4 mt-0.5 shrink-0" />
                <p>{tip}</p>
              </div>
            ))}
            {STEP_NOTES.warnings.map((warning) => (
              <div
                key={warning}
                className="flex gap-2 text-sm text-amber-700 dark:text-amber-300 mb-2"
              >
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <p>{warning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
            The Prompts
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl mb-3">
            Copy. Paste. Deploy.
          </h2>
          <p className="text-muted-foreground mb-10 max-w-xl leading-relaxed">
            Use these prompts in order inside Lovable, Claude, or GitHub AI. Each one builds on the
            last.
          </p>
          <div className="space-y-6">
            {PROMPTS.map((p) => (
              <PromptBox key={p.id} prompt={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-surface p-8 shadow-glow md:p-12">
          <h2 className="font-display text-3xl font-black uppercase leading-[1] tracking-tight text-foreground md:text-4xl">
            Want the full system built <span className="text-primary">for you?</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
            This starter kit gives you the prompts and workflow. If you want the lead system
            designed, deployed, and connected for your business — that's what the Work With Me
            engagement covers.
          </p>
          <Link
            to="/kraken"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground font-black uppercase tracking-wider px-6 py-3.5 shadow-glow hover:brightness-110 transition text-sm"
          >
            Work With Me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
