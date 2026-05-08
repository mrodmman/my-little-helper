import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  X,
  Compass,
  Layers,
  Mail,
  Zap,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/offer")({ component: OfferPage });

const WHY_PAINS = [
  "No clear order — what do I even build first",
  "Tools that don't talk to each other",
  "Content with nowhere to go",
  "Burned out before anything compounded",
];

const STACK = [
  {
    icon: Compass,
    title: "The Vault Roadmap",
    body: "Stop wondering what to do next. You follow one path — and at the end of it, you actually have a working system instead of a notebook full of tactics.",
  },
  {
    icon: Layers,
    title: "Funnel System",
    body: "A landing page that turns strangers into subscribers while you're at your day job. No coding. No design decisions. You change the words and ship.",
  },
  {
    icon: Mail,
    title: "Email Engine",
    body: "Pre-written welcome flows that introduce you, build trust, and warm people up — so you're not starting from zero every time someone signs up.",
  },
  {
    icon: Zap,
    title: "Automation Layer",
    body: "Sheets + Telegram doing the boring work. New subscribers, sales, alerts — all flowing to one place. You stop babysitting; the system runs.",
  },
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
    a: "Yes — this is built for you. You don't need tech skills or an existing audience. If you can follow a checklist and copy/paste, you can build this.",
  },
  {
    q: "What if I don't have much time?",
    a: "The whole thing is designed around 45 minutes a day. You don't need more time. You need a better direction for the time you already have.",
  },
  {
    q: "Is this just another course?",
    a: "Honest answer: it's a system with a course wrapped around it. The lessons exist to build things, not just teach concepts. If you go through it and don't build anything, that's on me.",
  },
];

function OfferPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="px-6 pt-16 pb-12 md:pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            The Kraken Vault
          </div>
          <h1 className="mt-6 font-display uppercase text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-white">
            You got the system.{" "}
            <span className="text-primary">Now get the whole vault.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            The Kraken Vault is the full machine — funnel, email, automation, traffic, offers — in
            one connected path. No more stitching tutorials together at midnight.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
            >
              Get instant access <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY NOTHING HAS WORKED */}
      <section className="px-6 py-20 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-5xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-destructive">
            <AlertTriangle className="h-3.5 w-3.5" /> Why nothing has worked yet
          </div>
          <h2 className="mt-5 font-display uppercase text-3xl md:text-5xl font-black tracking-tight leading-[1] text-white max-w-3xl">
            You don't have a work ethic problem.{" "}
            <span className="text-primary">You have an architecture problem.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Most people fail at affiliate marketing not because they're lazy — but because they
            were handed tactics without a sequence. Post on this platform. Use this tool. Create
            this content. None of it was connected. When disconnected tactics don't work, you
            blame yourself. You shouldn't. You were just missing the blueprint.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {WHY_PAINS.map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-lg border border-[#1f1f1f] bg-surface p-4">
                <X className="h-4 w-4 mt-1 text-destructive shrink-0" />
                <span className="text-[15px] text-foreground/85">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="px-6 py-20 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              What's inside the vault
            </div>
            <h2 className="mt-5 font-display uppercase text-3xl md:text-5xl font-black tracking-tight leading-[1] text-white">
              Four building blocks. <span className="text-primary">One system.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {STACK.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-lg border border-[#1f1f1f] bg-surface p-6">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase text-lg font-black tracking-tight text-white">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="px-6 py-20 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display uppercase text-3xl md:text-5xl font-black tracking-tight leading-[1] text-white max-w-3xl">
            Without a system vs <span className="text-primary">inside the Vault</span>
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-[#1f1f1f] bg-surface p-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-5">
                Without a system
              </div>
              <ul className="space-y-3">
                {COMPARE.map((c) => (
                  <li key={c.bad} className="flex items-start gap-2.5 text-[15px] text-foreground/70">
                    <X className="h-4 w-4 mt-1 text-destructive shrink-0" />
                    {c.bad}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-primary/40 bg-surface p-6 shadow-glow">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5">
                Inside the Vault
              </div>
              <ul className="space-y-3">
                {COMPARE.map((c) => (
                  <li key={c.good} className="flex items-start gap-2.5 text-[15px] text-foreground/95">
                    <Check className="h-4 w-4 mt-1 text-primary shrink-0" />
                    {c.good}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display uppercase text-3xl md:text-5xl font-black tracking-tight leading-[1] text-white">
            Honest <span className="text-primary">answers</span>
          </h2>

          <div className="mt-10 space-y-3">
            {FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-lg border border-[#1f1f1f] bg-surface p-5 cursor-pointer open:border-primary/40"
              >
                <summary className="flex items-center justify-between gap-4 list-none">
                  <span className="font-display uppercase text-[15px] font-black tracking-tight text-white">
                    {q}
                  </span>
                  <span className="text-primary transition-transform group-open:rotate-45 text-2xl leading-none font-light">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-4xl rounded-lg border border-[#1f1f1f] bg-surface p-8 md:p-12 text-center shadow-glow">
          <h2 className="font-display uppercase text-3xl md:text-5xl font-black tracking-tight leading-[1] text-white">
            Stop starting over. <span className="text-primary">Build the system.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Step inside the Vault and follow the path. The same one that gets beginners from
            "lost" to "launched."
          </p>
          <Link
            to="/login"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Unlock the vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
