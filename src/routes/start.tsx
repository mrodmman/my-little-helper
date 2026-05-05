import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Video,
  MessageCircle,
  Send,
  Database,
  Mail,
  Tag,
  ArrowRight,
  Check,
  X,
  Zap,
  FileText,
  Layers,
  GitBranch,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/start")({
  component: FunnelPage,
  head: () => ({
    meta: [
      { title: "The Vault — A Connected System for Making Money Online" },
      {
        name: "description",
        content:
          "Not another course. A complete backend system: content → engagement → DMs → leads → email → offers. Finally, something that actually connects.",
      },
      { property: "og:title", content: "The Vault — Stop Doing Random Stuff" },
      {
        property: "og:description",
        content:
          "A connected system for turning content into income. Everything works together or nothing works at all.",
      },
    ],
  }),
});

const flowSteps = [
  { label: "Content", icon: Video, color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/40", text: "text-blue-400" },
  { label: "Engagement", icon: MessageCircle, color: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/40", text: "text-violet-400" },
  { label: "DM", icon: Send, color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/40", text: "text-purple-400" },
  { label: "Lead", icon: Database, color: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/40", text: "text-indigo-400" },
  { label: "Email", icon: Mail, color: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/40", text: "text-cyan-400" },
  { label: "Offer", icon: Tag, color: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/40", text: "text-emerald-400" },
];

const included = [
  { icon: GitBranch, label: "System Map", desc: "The full visual backend. Every piece, every connection." },
  { icon: FileText, label: "Prompt Packs", desc: "Content prompts and DM conversation starters built for the system." },
  { icon: Mail, label: "Email Templates", desc: "Sequences that move leads toward offers without being cringe." },
  { icon: Layers, label: "Offer Frameworks", desc: "How to structure what you sell at each stage of the funnel." },
  { icon: BookOpen, label: "Workflows", desc: "Step-by-step processes so you're never guessing what to do next." },
  { icon: Zap, label: "Real Use Cases", desc: "The system shown in action across different niches and setups." },
];

const contrasts = [
  { chaos: "Post whenever. Hope something lands.", system: "Content is built to feed engagement." },
  { chaos: "Comments go nowhere.", system: "Engagement moves people to your DMs." },
  { chaos: "DMs die without a next step.", system: "DMs capture leads and build your list." },
  { chaos: "Email list collects dust.", system: "Email nurtures leads toward an offer." },
  { chaos: "Offers launched to cold audiences.", system: "Offers go to warm, primed buyers." },
  { chaos: "Start over every month.", system: "Every action builds on the last." },
];

function FunnelPage() {
  return (
    <div className="min-h-screen text-foreground">
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight">
            THE <span className="text-gradient">VAULT</span>
          </span>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl px-4 py-1.5 text-xs shadow-glow hover:opacity-90 transition-opacity"
            >
              Get Access <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── SECTION 1 — HOOK ────────────────────────────────── */}
      <section className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs text-muted-foreground mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            For people who are done buying random strategies
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-6">
            Most people don't fail online<br className="hidden sm:block" />
            because they're lazy.
          </h1>

          <p className="text-2xl sm:text-3xl font-bold text-gradient mb-8">
            They fail because nothing they're<br className="hidden sm:block" />
            doing actually connects.
          </p>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Content that doesn't feed DMs. DMs that don't capture leads. Email lists
            connected to nothing worth buying. You're doing the work. You're just not
            doing it in an order that compounds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-2xl px-8 py-4 text-base shadow-glow hover:opacity-90 transition-opacity"
            >
              Enter the Vault <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface/60 px-8 py-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border/60 transition-colors"
            >
              Already have access? Log in
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — PROBLEM ─────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border-glow">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">The real problem</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-snug">
            You don't have a hustle problem.<br />
            You have a{" "}
            <span className="text-gradient">structure problem.</span>
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every "guru" sells you a piece. Post more content. Run DM campaigns. Build
              an email list. Launch an offer. They're not wrong — those things matter.
              But they sell you the pieces without the blueprint.
            </p>
            <p>
              So you buy one course on content. Another on email. A template pack for
              DMs. None of it talks to the rest. You end up with a pile of strategies
              that don't connect to each other, let alone to money.
            </p>
            <p className="text-foreground font-medium">
              That's not a skill gap. That's a system gap. And a system is exactly what
              we built.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — WHAT THE VAULT IS ───────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What this is</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Not a course. A{" "}
            <span className="text-gradient">connected system.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The Vault is a structured backend you can actually follow — step by step,
            piece by piece — until everything in your online business works together.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { label: "Not", items: ["A 47-video course", "Vague strategies", "Another template dump", "Watch-and-forget content"] },
            null,
            { label: "Yes", items: ["A visual system map", "Step-by-step workflows", "Prompts built for the flow", "Real use cases"] },
          ].map((col, i) =>
            col === null ? (
              <div key={i} className="flex items-center justify-center">
                <div className="h-px w-full sm:h-full sm:w-px bg-gradient-to-b from-transparent via-border to-transparent" />
              </div>
            ) : (
              <div key={i} className="glass-card rounded-2xl p-6">
                <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${col.label === "Not" ? "text-destructive" : "text-emerald-400"}`}>
                  {col.label === "Not" ? "❌ Not this" : "✓ This"}
                </p>
                <ul className="space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </section>

      {/* ── SECTION 4 — VISUAL FLOW ─────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">The system</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Six steps. One connected flow.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Each step feeds the next. That's not how most people work online.
            That's what makes the difference.
          </p>
        </div>

        {/* Desktop: horizontal flow */}
        <div className="hidden sm:flex items-center gap-2 justify-center flex-wrap">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2">
              <div className={`flex flex-col items-center gap-2 glass-card rounded-2xl p-4 w-24 border ${step.border} bg-gradient-to-b ${step.color}`}>
                <step.icon className={`h-6 w-6 ${step.text}`} />
                <span className={`text-xs font-bold ${step.text}`}>{step.label}</span>
              </div>
              {i < flowSteps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical flow */}
        <div className="sm:hidden space-y-2">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col items-center">
              <div className={`flex items-center gap-3 glass-card rounded-2xl px-5 py-3 w-full max-w-xs border ${step.border} bg-gradient-to-r ${step.color}`}>
                <step.icon className={`h-5 w-5 ${step.text}`} />
                <span className={`text-sm font-bold ${step.text}`}>{step.label}</span>
              </div>
              {i < flowSteps.length - 1 && (
                <div className="h-4 w-px bg-border my-1" />
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-md mx-auto">
          When all six are connected, every piece of content you create has a path to revenue.
          That's the whole point.
        </p>
      </section>

      {/* ── SECTION 5 — WHAT YOU GET ────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Inside the vault</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Everything to run the system.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Not fluff. Not filler. Every module does one job and connects to the next.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {included.map((item) => (
            <div key={item.label} className="glass-card glass-card-hover rounded-2xl p-5">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold">⚡ {item.label}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6 — CONTRAST ────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">The difference</p>
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Random vs. connected.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Same effort. Completely different result.
          </p>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">
          {/* header row */}
          <div className="grid grid-cols-2 border-b border-border">
            <div className="p-4 flex items-center gap-2 border-r border-border">
              <X className="h-4 w-4 text-destructive" />
              <span className="text-xs font-bold uppercase tracking-wider text-destructive">Random strategies</span>
            </div>
            <div className="p-4 flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Connected system</span>
            </div>
          </div>

          {contrasts.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 ${i < contrasts.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="p-4 border-r border-border flex items-start gap-2.5">
                <X className="h-3.5 w-3.5 text-destructive/50 shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground leading-relaxed">{row.chaos}</span>
              </div>
              <div className="p-4 flex items-start gap-2.5">
                <Check className="h-3.5 w-3.5 text-emerald-400/70 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{row.system}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 7 — FINAL CTA ───────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16 pb-28">
        <div className="relative glass-card border-glow rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
          {/* background glow */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="relative">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Ready?</p>
            <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">
              Stop doing random.
              <br />
              <span className="text-gradient">Start the system.</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
              The Vault is ready. Everything's mapped. Everything's connected.
              You just have to start at step one.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-2xl px-10 py-4 text-base shadow-glow hover:opacity-90 transition-opacity"
              >
                Get Access — Start the System <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Already inside?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>
            THE <span className="text-gradient font-bold">VAULT</span>
          </span>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-foreground transition-colors">Log in</Link>
            <Link to="/signup" className="hover:text-foreground transition-colors">Get access</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
