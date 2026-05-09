import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  ArrowRight,
  Zap,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Compass,
  Layers,
  Clock,
  CheckCircle2,
  Calendar,
  Rocket,
} from "lucide-react";

export const Route = createFileRoute("/funnel")({ component: FunnelPage });

const PAINS = [
  "Too many tools, none of them connected",
  "No clear order — what do I even build first?",
  "Guru content that sells the dream and skips the steps",
  "Burned out before you ship anything real",
];

const COLUMNS = [
  {
    icon: Compass,
    title: "A clear path",
    body: "One sequence. You always know what step you're on and what comes next. No more scrolling YouTube at 11pm hoping for a sign.",
  },
  {
    icon: Layers,
    title: "Real assets",
    body: "Funnel, email list, automation. You build things that exist after you close the laptop — not notebooks full of tactics.",
  },
  {
    icon: Clock,
    title: "Built for tired people",
    body: "Designed for nights, lunch breaks, and exhausted weekends. 45 minutes a day is enough when the order is right.",
  },
];

const DAY1 = [
  {
    icon: Rocket,
    title: "Day 1 action",
    body: "One specific move you can do tonight. Not theory. Not warm-up. The real first rep.",
  },
  {
    icon: Calendar,
    title: "The full 7-day plan",
    body: "Every day mapped out. One action, ~45 minutes, no decisions to make about what to do next.",
  },
  {
    icon: Zap,
    title: "No waiting — instant access",
    body: "It hits your inbox in under a minute. Open it, read Day 1, do the thing. That's the whole loop.",
  },
];

function FunnelPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), first_name: name.trim() || undefined }),
        credentials: "include",
      });
      if (res.ok) {
        navigate({ to: "/thank-you", search: { email, name } as never });
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Free Resource · Kraken Vault
          </div>

          <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <h1 className="font-display uppercase text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-foreground">
                You already work hard every day.{" "}
                <span className="text-primary">None of it is yours yet.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                A no-fluff 7-day jumpstart for people who are tired of working for someone else's
                business. 45 minutes a day. Built for real life.
              </p>

              <ul className="mt-8 grid gap-2.5 text-sm text-foreground/85">
                {[
                  "One action per day — not a curriculum",
                  "Beginner-proof tools (mostly free tiers)",
                  "Built for nights, lunch breaks, exhausted weekends",
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FORM CARD */}
            <div className="relative">
              <div className="rounded-lg border border-border bg-surface p-6 md:p-8 shadow-glow">
                <h2 className="font-display uppercase text-2xl font-black tracking-tight text-foreground">
                  Get Instant Access
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  The 7-Day Affiliate Jumpstart — delivered to your inbox in under a minute.
                </p>

                {error && (
                  <div className="mt-4 flex items-start gap-2 rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    {error}
                  </div>
                )}

                <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
                  <label className="grid gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      First name
                    </span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex"
                      className="rounded-md border border-border bg-input px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </label>
                  <label className="grid gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      Best email
                    </span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                      placeholder="you@domain.com"
                      className="rounded-md border border-border bg-input px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3.5 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition disabled:opacity-60"
                  >
                    {loading ? "Sending…" : "Send me the jumpstart"} <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Zap className="h-3 w-3 text-primary" /> Instant access</span>
                  <span className="opacity-40">·</span>
                  <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3 text-primary" /> No spam</span>
                  <span className="opacity-40">·</span>
                  <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-primary" /> 100% free</span>
                  <span className="opacity-40">·</span>
                  <span>Built for beginners</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOUND FAMILIAR */}
      <section className="px-6 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" /> Sound familiar?
            </div>
            <h2 className="mt-5 font-display uppercase text-3xl md:text-5xl font-black tracking-tight leading-[1] text-foreground">
              You've been working. <span className="text-primary">Just not on anything that's yours.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PAINS.map((p) => (
              <div key={p} className="rounded-lg border border-border bg-surface p-5 flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-destructive shrink-0" />
                <span className="text-[15px] text-foreground/90">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM PROBLEM */}
      <section className="px-6 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="font-display uppercase text-3xl md:text-5xl font-black tracking-tight leading-[1] text-foreground">
              You don't have a motivation problem.{" "}
              <span className="text-primary">You have a system problem.</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              You've watched the videos. You've taken the notes. You've opened 12 tools and finished
              none of them. It's not you — it's the missing blueprint.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {COLUMNS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-lg border border-border bg-surface p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display uppercase text-lg font-black tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="px-6 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              What you get on day 1
            </div>
            <h2 className="mt-5 font-display uppercase text-3xl md:text-5xl font-black tracking-tight leading-[1] text-foreground">
              Open the email. <span className="text-primary">Do the thing.</span>
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {DAY1.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-lg border border-border bg-surface p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display uppercase text-lg font-black tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* repeated CTA */}
          <div className="mt-14 rounded-lg border border-border bg-surface p-8 md:p-10 text-center shadow-glow">
            <h3 className="font-display uppercase text-2xl md:text-3xl font-black tracking-tight text-foreground">
              Ready to build something <span className="text-primary">that's actually yours?</span>
            </h3>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Drop your email. Day 1 hits your inbox in under a minute.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
            >
              Send me the jumpstart <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
              Instant access · No spam · 100% free · Built for beginners
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
