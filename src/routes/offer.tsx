import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  X,
  Sparkles,
  Layers,
  Mail,
  Zap,
  ShieldCheck,
  Compass,
  HelpCircle,
} from "lucide-react";

export const Route = createFileRoute("/offer")({ component: OfferPage });

const STACK = [
  {
    icon: Compass,
    title: "The Vault Roadmap",
    body: "A guided, step-by-step path. No more guessing what to build first or which video to watch next.",
  },
  {
    icon: Layers,
    title: "Funnel System",
    body: "A simple, beginner-proof landing page that turns visitors into subscribers — without coding.",
  },
  {
    icon: Mail,
    title: "Email Engine",
    body: "Pre-written welcome flows that build trust and warm up your list automatically.",
  },
  {
    icon: Zap,
    title: "Automation Layer",
    body: "Connect the pieces with Sheets + Telegram so it runs while you're at your day job.",
  },
];

const VALUE_BULLETS = [
  "Skip months of YouTube rabbit holes",
  "Only the tools you actually need — nothing else",
  "Built for nights, weekends, and tired brains",
  "Templates you can copy in minutes, not weeks",
  "Updated as platforms change — no stale courses",
];

const COMPARE = [
  {
    bad: "Watching 8 hours of free content per week",
    good: "Following one short step at a time",
  },
  { bad: "12 disconnected tools and free trials", good: "One clean, connected system" },
  { bad: "Guru hype, fake screenshots, no path", good: "Honest, realistic, fully guided" },
  { bad: "Burnout at week 3", good: "Small wins that actually compound" },
];

const FAQ = [
  {
    q: "What if I'm a complete beginner?",
    a: "That's exactly who this is built for. No coding, no marketing background, no audience required. If you can follow a checklist, you can build this.",
  },
  {
    q: "What if I don't have much time?",
    a: "Each step is designed for short, focused sessions. Most people work on this 30–60 minutes a few nights per week and still ship.",
  },
  {
    q: "Is this just another course?",
    a: "No. Courses give you information. The Vault gives you a system — templates, prompts, and a clear order — so you actually finish and launch.",
  },
];

function OfferPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative px-6 pt-20 pb-16 md:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Recommended next step
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            You got the system.{" "}
            <span className="text-gradient">Now get the whole vault.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            The Kraken Vault is everything you need to actually build it — funnel, email,
            automation — in one connected place. No more stitching tutorials together at midnight.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-glow hover:opacity-95 transition-opacity"
            >
              Get instant access <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/50 px-6 py-3.5 font-semibold hover:border-primary/40 transition-colors"
            >
              Preview the vault
            </Link>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Beginner-friendly · cancel anytime · no fluff
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What's <span className="text-gradient">inside the vault</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Four building blocks. One system. Every piece earns its place.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {STACK.map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card glass-card-hover rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Value bullets */}
          <div className="mt-10 glass-card border-glow rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-semibold tracking-tight">You also get:</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {VALUE_BULLETS.map((v) => (
                <li key={v} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHY IT WORKS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why this <span className="text-gradient">actually works</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Most people don't fail because they're lazy. They fail because they're trying to
            assemble a business from 40 disconnected tutorials. The Vault removes the assembly —
            you just follow the path. Small steps, in the right order, with the right tools.
            That's it. That's the trick nobody is selling.
          </p>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Random content vs <span className="text-gradient">guided system</span>
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface/40 p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
                Without a system
              </div>
              <ul className="space-y-3">
                {COMPARE.map((c) => (
                  <li key={c.bad} className="flex items-start gap-2 text-sm text-foreground/75">
                    <X className="h-4 w-4 mt-0.5 text-destructive shrink-0" />
                    {c.bad}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card border-glow rounded-2xl p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-primary mb-4">
                Inside the vault
              </div>
              <ul className="space-y-3">
                {COMPARE.map((c) => (
                  <li key={c.good} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    {c.good}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Honest <span className="text-gradient">answers</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group glass-card rounded-2xl p-5 cursor-pointer open:shadow-glow"
              >
                <summary className="flex items-center justify-between gap-4 list-none">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-semibold text-foreground">{q}</span>
                  </div>
                  <span className="text-primary transition-transform group-open:rotate-45 text-xl leading-none">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card border-glow rounded-3xl p-8 md:p-12 text-center shadow-glow">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to stop starting over?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Step inside the vault and follow the path. The same one that gets beginners from
              "lost" to "launched."
            </p>
            <div className="mt-7">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-7 py-4 font-semibold shadow-glow hover:opacity-95 transition-opacity"
              >
                Unlock the vault <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
