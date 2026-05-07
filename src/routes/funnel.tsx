import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Mail,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Layers,
  Compass,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/funnel")({ component: FunnelPage });

function FunnelPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 15% 0%, oklch(0.45 0.2 245 / 0.35), transparent 55%), radial-gradient(ellipse at 85% 20%, oklch(0.55 0.22 285 / 0.25), transparent 55%)",
          }}
        />
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Free training
          </div>

          <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                Stop collecting courses.{" "}
                <span className="text-gradient">Start building a system.</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-xl">
                A no-fluff blueprint for beginners who are tired of guru noise, drowning in tools,
                and just want a clear path from zero to a working online business.
              </p>

              <ul className="mt-6 grid gap-2 text-sm text-foreground/80">
                {[
                  "The 3-step income system, broken down step by step",
                  "Skip the tool overwhelm — only what you actually need",
                  "Built for real life, not 14-hour content sprints",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FORM CARD */}
            <div className="relative">
              <div className="glass-card border-glow rounded-2xl p-6 md:p-8 shadow-glow">
                <div className="text-xs uppercase tracking-[0.2em] text-primary mb-2">
                  Instant access
                </div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Get the Kraken 3-Step System
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Quickstart guide + checklists. Delivered to your inbox in under a minute.
                </p>

                <form
                  className="mt-6 grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!email.trim()) return;
                    navigate({ to: "/thank-you", search: { email, name } as never });
                  }}
                >
                  <label className="grid gap-1.5">
                    <span className="text-xs text-muted-foreground">First name</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex"
                      className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-xs text-muted-foreground">Best email</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      placeholder="you@domain.com"
                      className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-ring"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-5 py-3.5 font-semibold shadow-glow hover:opacity-95 transition-opacity"
                  >
                    Send me the system <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                {/* TRUST ROW */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-muted-foreground">
                  {[
                    { icon: Zap, label: "Instant access" },
                    { icon: Mail, label: "No spam" },
                    { icon: ShieldCheck, label: "100% free" },
                    { icon: Sparkles, label: "Beginner-friendly" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/40 px-2.5 py-2">
                      <Icon className="h-3.5 w-3.5 text-primary" /> {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Less noise. <span className="text-gradient">More signal.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three things you actually walk away with — not 47 tabs and a headache.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Compass,
                title: "A clear path",
                body: "Know exactly what step you're on and what comes next. No more random YouTube spirals.",
              },
              {
                icon: Layers,
                title: "Real assets",
                body: "Funnel, email, automation — built once, working in the background while you sleep.",
              },
              {
                icon: Zap,
                title: "Built for tired people",
                body: "Designed for nights and weekends. Small wins that compound, not burnout sprints.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="glass-card glass-card-hover rounded-2xl p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card border-glow rounded-2xl p-8 md:p-10 relative">
            <Quote className="absolute -top-3 left-6 h-6 w-6 text-primary bg-background rounded-full p-1 border border-border" />
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90">
              “I bought five courses and built nothing. This was the first time I actually finished
              a setup — funnel, email, automation — in one weekend. Felt like cheating.”
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary" />
              <div className="text-sm">
                <div className="font-semibold">Reader of the system</div>
                <div className="text-muted-foreground text-xs">Beginner · built first funnel in 2 weekends</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" /> Sound familiar?
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              You don't have a motivation problem.{" "}
              <span className="text-gradient">You have a system problem.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              You've watched the videos. You've taken the notes. You've opened 12 tools and finished
              none of them. It's not you — it's the missing blueprint.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "Too many tools, none of them connected",
              "No clear order — what do I even build first?",
              "Guru content that sells the dream and skips the steps",
              "Burned out before you ship anything real",
            ].map((p) => (
              <div key={p} className="flex items-start gap-3 rounded-xl border border-border bg-surface/40 p-4">
                <span className="mt-1 h-2 w-2 rounded-full bg-destructive shrink-0" />
                <span className="text-sm text-foreground/85">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> The reframe
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
              One path. <span className="text-gradient">Three systems.</span> Done.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Forget the 90-video curriculum. You're going to build three things — and they'll keep
              working for you long after you close the laptop.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { n: "01", title: "Funnel", body: "A simple page that turns a stranger into a subscriber." },
              { n: "02", title: "Email", body: "An automated welcome sequence that builds trust on autopilot." },
              { n: "03", title: "Automation", body: "Plumbing that connects everything so you don't babysit it." },
            ].map((s) => (
              <div key={s.n} className="glass-card rounded-2xl p-6 relative">
                <div className="text-xs font-mono text-primary">{s.n}</div>
                <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-glow hover:opacity-95 transition-opacity"
            >
              Get the free system <ArrowRight className="h-4 w-4" />
            </a>
            <div className="mt-4 text-xs text-muted-foreground">
              Already inside?{" "}
              <Link to="/login" className="text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
