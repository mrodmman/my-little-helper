import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Copy, Check, AlertTriangle, Zap, ArrowRight } from "lucide-react";

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
  "Use Lovable (or another AI builder) to generate the initial lead capture website.",
  "Push/export the generated project to GitHub.",
  "Use Claude/GitHub AI to audit and fix Cloudflare compatibility issues.",
  "Deploy the project from GitHub directly to Cloudflare Pages.",
  "Use Claude/GitHub AI again to connect Telegram lead notifications.",
  "Submit a real test lead and confirm the workflow works end-to-end.",
];

const WORKFLOW_STEP_DETAILS = [
  {
    title: "Generate the initial lead capture website",
    details: [
      "Create your first version in Lovable (or your preferred AI builder) with a landing page and lead form.",
      "Keep the tech stack React + Vite + TypeScript so deployment to Cloudflare Pages stays straightforward.",
      "Use Prompt 1 from this page to force production-ready structure instead of mockup-only output.",
    ],
  },
  {
    title: "Push the project to GitHub",
    details: [
      "Export the generated project and create a GitHub repository for clean version control.",
      "Commit the initial baseline before making Cloudflare compatibility fixes.",
      "This creates a reliable rollback point and enables auto-deploy via Cloudflare Pages.",
    ],
  },
  {
    title: "Audit and fix Cloudflare compatibility",
    details: [
      "Use Prompt 2 in Claude or GitHub Copilot to check Vite config, scripts, env usage, and TypeScript issues.",
      "Remove Node-only backend patterns (Express, fs, server.listen, etc.) and keep runtime Worker-compatible.",
      "Keep the current design mostly intact while fixing deployment blockers.",
    ],
  },
  {
    title: "Deploy from GitHub to Cloudflare Pages",
    details: [
      "Create a new Cloudflare Pages project connected to your GitHub repository.",
      "Set build command/output directory according to your project config.",
      "Trigger the first deployment and confirm the site boots successfully.",
    ],
  },
  {
    title: "Connect Telegram lead notifications",
    details: [
      "Use Prompt 3 to wire lead submissions to Telegram via a server-side Cloudflare-compatible endpoint.",
      "Store TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as Cloudflare environment variables.",
      "Verify secrets remain server-side only and are never exposed in frontend code.",
    ],
  },
  {
    title: "Run a real end-to-end test",
    details: [
      "Submit a real test lead from the deployed site.",
      "Confirm form submission succeeds and thank-you behavior appears as expected.",
      "Verify Telegram receives the lead payload with correct fields and timestamp.",
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

const TELEGRAM_STEPS = [
  {
    title: "Create a Telegram Bot",
    steps: [
      "Open Telegram and search for BotFather.",
      "Start a chat with BotFather.",
      'Send the command: /newbot',
      "Choose a name for your bot.",
      "Choose a username ending in 'bot'. Example: myleadalertsbot",
      "BotFather will return a bot token in the format: 123456789:AAExampleTokenHere",
      "IMPORTANT: Never place the bot token in frontend code or public GitHub repos.",
    ],
  },
  {
    title: "Get Your Telegram Chat ID",
    steps: [
      "Create a normal chat with your bot OR add the bot to a Telegram group.",
      "Send at least one message to the bot or group.",
      "Open this URL in your browser (replace YOUR_BOT_TOKEN): https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates",
      'Look for the chat object in the JSON response.',
      'Private chat ID example: "chat":{"id":123456789}',
      'Group chat ID example: "chat":{"id":-1001234567890}',
    ],
  },
  {
    title: "Add Environment Variables to Cloudflare",
    steps: [
      "Open Cloudflare Dashboard → Pages → your project.",
      "Go to Settings → Environment Variables.",
      "Add: TELEGRAM_BOT_TOKEN = your_bot_token_here",
      "Add: TELEGRAM_CHAT_ID = your_chat_id_here",
      "After adding variables, redeploy the Cloudflare Pages project.",
    ],
  },
  {
    title: "Connect the Automation",
    steps: [
      "Use Prompt 3 above inside Claude or GitHub AI.",
      "Paste your existing project code when Claude asks for context.",
      "Apply the changes Claude returns to your project files.",
      "Commit and push to GitHub — Cloudflare will auto-deploy.",
    ],
  },
  {
    title: "Test the System",
    steps: [
      "Open your deployed website.",
      "Submit the lead form with test data.",
      "Confirm the thank-you page appears.",
      "Check Telegram for the lead alert message.",
      "Verify all lead fields appear correctly.",
    ],
  },
];

const COMMON_PROBLEMS = [
  {
    problem: "No Telegram message arrives",
    fix: "Make sure the bot token and chat ID are correct. Send a message to the bot before checking getUpdates.",
  },
  {
    problem: "Cloudflare deploys but alerts fail",
    fix: "Check environment variables are set correctly in Cloudflare Pages and redeploy after adding them.",
  },
  {
    problem: "Bot cannot send messages",
    fix: "Make sure you started a conversation with the bot first, or added it to the group.",
  },
  {
    problem: "getUpdates returns empty",
    fix: "Send at least one message to the bot before calling getUpdates.",
  },
];

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
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function PromptBox({ prompt }: { prompt: typeof PROMPTS[0] }) {
  return (
    <div className="rounded-lg border border-border bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/30">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary mr-3">{prompt.label}</span>
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
            A practical workflow for generating, deploying, and connecting a real lead capture system
            that alerts you the moment someone fills out your form. Built with AI, GitHub, Cloudflare, and Telegram.
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
              <details key={step} className="rounded-lg border border-border bg-surface p-5 group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[12px] font-black text-white">
                    {i + 1}
                  </span>
                  <div className="pt-0.5">
                    <p className="text-foreground font-semibold leading-relaxed">{step}</p>
                    <p className="text-xs text-muted-foreground mt-1">Click to expand implementation details.</p>
                  </div>
                </summary>
                <div className="mt-4 pl-11">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-2">Step details</p>
                  <ul className="space-y-2">
                    {WORKFLOW_STEP_DETAILS[i].details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
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
            Use these prompts in order inside Lovable, Claude, or GitHub AI. Each one builds on the last.
          </p>
          <div className="space-y-6">
            {PROMPTS.map((p) => <PromptBox key={p.id} prompt={p} />)}
          </div>
        </div>
      </section>

      {/* TELEGRAM SETUP */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
            Telegram Setup
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl mb-8">
            Get alerts the moment a lead comes in
          </h2>
          <div className="space-y-6">
            {TELEGRAM_STEPS.map(({ title, steps }, i) => (
              <div key={title} className="rounded-lg border border-border bg-surface p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-[12px] font-black text-white">
                    {i + 1}
                  </span>
                  <h3 className="font-display font-black uppercase tracking-tight text-foreground">{title}</h3>
                </div>
                <ol className="space-y-2 ml-10">
                  {steps.map((step) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm text-foreground/80 leading-relaxed">
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON PROBLEMS */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl font-black uppercase tracking-tight text-foreground mb-6">
            Common Problems
          </h2>
          <div className="space-y-3">
            {COMMON_PROBLEMS.map(({ problem, fix }) => (
              <div key={problem} className="rounded-lg border border-border bg-surface p-5">
                <p className="font-semibold text-foreground mb-1">{problem}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{fix}</p>
              </div>
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
            This starter kit gives you the prompts and workflow. If you want the lead system designed,
            deployed, and connected for your business — that's what the Work With Me engagement covers.
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
