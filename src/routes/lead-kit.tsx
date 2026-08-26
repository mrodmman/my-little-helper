import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  AlertCircle,
  TrendingUp,
  Bell,
  Users,
  BarChart2,
} from "lucide-react";

export const Route = createFileRoute("/lead-kit")({ component: LeadKitPage });

const WHAT_YOU_GET = [
  { icon: TrendingUp, text: "The 5 places local businesses most often lose customers" },
  { icon: Users, text: "Where visibility and lead capture may be leaking opportunities" },
  { icon: Bell, text: "How missed follow-up causes interested customers to disappear" },
  {
    icon: BarChart2,
    text: "A practical audit to help you find the leaks and decide what to fix first",
  },
];

function LeadKitPage() {
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
      const res = await fetch("/api/subscribe-ai-lead-kit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), first_name: name.trim() || undefined }),
      });
      if (res.ok) {
        navigate({ to: "/biz-thank-you" });
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
      <section className="relative overflow-hidden px-6 pt-16 pb-20 md:pt-24">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Free Customer Leak Audit · Keyboard Kraken
          </div>

          <div className="mt-6 grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <h1 className="font-display uppercase text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-foreground">
                Find The 5 Places{" "}
                <span className="text-primary">Your Business Loses Customers</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
                A practical local business audit that helps you spot where visibility, leads,
                reviews, and follow-up are breaking down—so you know what to fix first.
              </p>

              <ul className="mt-8 grid gap-3">
                {WHAT_YOU_GET.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-foreground/85">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/15">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* FORM */}
            <div className="rounded-lg border border-border bg-surface p-6 md:p-8 shadow-glow">
              <h2 className="font-display uppercase text-2xl font-black tracking-tight text-foreground">
                Send Me the Customer Leak Audit
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The free audit hits your inbox in under a minute.
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
                  {loading ? "Sending…" : "Send me the free audit"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Zap className="h-3 w-3 text-primary" /> Instant access
                </span>
                <span className="opacity-40">·</span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-primary" /> 100% free
                </span>
                <span className="opacity-40">·</span>
                <span>No spam</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
