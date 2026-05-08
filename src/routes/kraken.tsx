import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Wrench,
  Zap,
  TrendingUp,
  Play,
  BookOpen,
  Bot,
  Workflow,
  Network,
  ChevronRight,
  Terminal,
  Video,
  Globe,
  Settings,
  Target,
  ShoppingBag,
  FileText,
} from "lucide-react";

// ── Swappable assets — edit these without touching layout ─────────────────────
const LOGO_URL = ""; // set to your logo image URL, or leave empty for SVG default
const HERO_IMAGE_URL = ""; // optional hero/product screenshot URL

const VIDEOS = [
  { youtubeId: "", title: "Full Automation Workflow", tag: "Automation" },
  { youtubeId: "", title: "Funnel Build — Start to Finish", tag: "Funnels" },
  { youtubeId: "", title: "AI Content System", tag: "AI Workflow" },
];
// ─────────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/kraken")({
  component: KrakenPage,
  head: () => ({
    meta: [
      { title: "Keyboard Kraken — Systems Builder" },
      {
        name: "description",
        content:
          "AI, automation, funnels, content systems — one connected machine. Build. Automate. Grow.",
      },
      { property: "og:title", content: "Keyboard Kraken — Systems Builder" },
      {
        property: "og:description",
        content: "AI, automation, funnels, content systems — one connected machine.",
      },
    ],
  }),
});

// ── Shared ────────────────────────────────────────────────────────────────────

function LogoMark({ className = "" }: { className?: string }) {
  if (LOGO_URL) {
    return <img src={LOGO_URL} alt="Keyboard Kraken" className={className} />;
  }
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Keyboard Kraken">
      <defs>
        <linearGradient id="kk-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A8FE8" />
          <stop offset="100%" stopColor="#7F77DD" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#0d0d0d" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="url(#kk-g)" strokeWidth="2.5" />
      <path d="M22 44V20h6l4 6 4-6h6v24h-6V30l-4 5-4-5v14z" fill="url(#kk-g)" />
      <circle cx="20" cy="42" r="2" fill="#0A8FE8" opacity="0.6" />
      <circle cx="44" cy="42" r="2" fill="#7F77DD" opacity="0.6" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function KrakenPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <BuildSection />
      <ChoosePathSection />
      <EcosystemSection />
      <ProofSection />
      <VaultSection />
      <FinalCtaSection />
    </main>
  );
}

// ── 1. HERO ───────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 py-20 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 10%, rgba(10,143,232,0.15) 0%, transparent 50%), " +
          "radial-gradient(ellipse at 80% 30%, rgba(127,119,221,0.10) 0%, transparent 50%), " +
          "#0a0a0a",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,143,232,0.05) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(10,143,232,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <LogoMark className="h-9 w-9" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                Keyboard Kraken
              </span>
            </div>

            <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92] text-white">
              Stop piecing<br />together tactics.
              <br />
              <span className="text-gradient">Build a real system.</span>
            </h1>

            <p className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-lg">
              AI, automation, funnels, and content — connected into one machine that works without requiring more of your time.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/vault"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
              >
                Explore the Vault <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#work-with-me"
                className="inline-flex items-center gap-2 rounded-md border border-[#252525] bg-surface px-6 py-3.5 text-sm font-black uppercase tracking-wider hover:border-primary/40 transition"
              >
                Work With Me <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {["AI Workflows", "Funnels", "Automation", "Content Systems", "Lead Gen"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#1f1f1f] bg-surface/50 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            {HERO_IMAGE_URL ? (
              <img
                src={HERO_IMAGE_URL}
                alt="System overview"
                className="w-full max-w-md rounded-xl border border-[#1f1f1f] shadow-[0_0_60px_-10px_rgba(10,143,232,0.3)]"
              />
            ) : (
              <HeroCommandCenter />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroCommandCenter() {
  const nodes = [
    { label: "Content", color: "#0A8FE8", x: 50, y: 12 },
    { label: "Funnel", color: "#1a9ffa", x: 76, y: 32 },
    { label: "Email", color: "#7F77DD", x: 80, y: 60 },
    { label: "Offers", color: "#9f77ee", x: 60, y: 80 },
    { label: "Automation", color: "#0A8FE8", x: 28, y: 72 },
    { label: "Leads", color: "#1a9ffa", x: 16, y: 46 },
    { label: "AI", color: "#7F77DD", x: 24, y: 20 },
  ];

  return (
    <div className="relative w-full max-w-sm aspect-square">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-accent/6 blur-2xl" />

      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <line key={i} x1={`${n.x}%`} y1={`${n.y}%`} x2={`${next.x}%`} y2={`${next.y}%`}
              stroke="rgba(10,143,232,0.18)" strokeWidth="0.5" />
          );
        })}
        <line x1="50%" y1="12%" x2="80%" y2="60%" stroke="rgba(127,119,221,0.10)" strokeWidth="0.4" />
        <line x1="16%" y1="46%" x2="76%" y2="32%" stroke="rgba(10,143,232,0.08)" strokeWidth="0.4" />
        <line x1="24%" y1="20%" x2="60%" y2="80%" stroke="rgba(127,119,221,0.08)" strokeWidth="0.4" />
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="rounded-full border border-primary/35 bg-surface p-4 shadow-glow">
          <LogoMark className="h-12 w-12" />
        </div>
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div
            className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#0d0d0d]/80 backdrop-blur-sm"
            style={{ borderColor: `${node.color}35`, color: node.color }}
          >
            {node.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 2. BUILD · AUTOMATE · GROW ────────────────────────────────────────────────

const BUILD_CARDS = [
  {
    icon: Wrench,
    title: "Build",
    color: "#0A8FE8",
    body: "Funnels, offers, lead systems, landing pages, content engines. The infrastructure that turns attention into revenue.",
    tags: ["Funnels", "Lead Systems", "Landing Pages", "Offers"],
  },
  {
    icon: Zap,
    title: "Automate",
    color: "#7F77DD",
    body: "AI workflows, multi-step automations, operational systems. The work that used to take hours — running without you.",
    tags: ["AI Workflows", "No-Code Automation", "Email Sequences", "Ops"],
  },
  {
    icon: TrendingUp,
    title: "Grow",
    color: "#1aa0f5",
    body: "Content systems, lead generation, audience growth. Consistent output without the grind of starting from zero every day.",
    tags: ["Content Systems", "Lead Gen", "Audience Growth", "Traffic"],
  },
];

function BuildSection() {
  return (
    <section className="px-6 py-24 border-t border-[#181818]">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white mb-12">
          Build. Automate. <span className="text-primary">Grow.</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {BUILD_CARDS.map(({ icon: Icon, title, color, body, tags }) => (
            <div key={title} className="glass-card glass-card-hover rounded-xl p-6 border border-[#1e1e1e]">
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg mb-5"
                style={{ background: `${color}12`, border: `1px solid ${color}28` }}
              >
                <Icon className="h-4 w-4" style={{ color }} />
              </div>
              <h3 className="font-display uppercase text-xl font-black tracking-tight text-white mb-3">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{body}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span key={t} className="rounded-full border border-[#222] bg-[#0d0d0d] px-2.5 py-0.5 text-[10px] text-muted-foreground uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. CHOOSE YOUR PATH ───────────────────────────────────────────────────────

function ChoosePathSection() {
  return (
    <section className="px-6 py-24 border-t border-[#181818]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white">
            Different goals.{" "}
            <span className="text-primary">Same problem.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg">
            No clear system. No connected machine. Whether you're running a business or building one — that's the fix.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Business Owners */}
          <div
            id="work-with-me"
            className="rounded-xl border p-7 flex flex-col"
            style={{
              background: "linear-gradient(160deg, rgba(10,143,232,0.05), rgba(10,10,10,0.95))",
              borderColor: "rgba(10,143,232,0.22)",
            }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
              — Business Owners
            </div>
            <h3 className="font-display uppercase text-2xl font-black tracking-tight text-white mb-4">
              You need systems,<br />not more tasks.
            </h3>
            <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
              Scattered marketing, manual operations, inconsistent lead flow. That's an infrastructure problem. I build the system that fixes it.
            </p>
            <ul className="space-y-2 mb-8 flex-1">
              {[
                "No consistent lead pipeline",
                "Operations are manual and reactive",
                "Too much time on work AI should handle",
                "Marketing that doesn't compound",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/75">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="mailto:matt@krakenvault.com"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
            >
              Work With Me <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Creators / Builders */}
          <div
            className="rounded-xl border p-7 flex flex-col"
            style={{
              background: "linear-gradient(160deg, rgba(127,119,221,0.05), rgba(10,10,10,0.95))",
              borderColor: "rgba(127,119,221,0.22)",
            }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent mb-4">
              — Creators & Builders
            </div>
            <h3 className="font-display uppercase text-2xl font-black tracking-tight text-white mb-4">
              Stop consuming.<br />Start building.
            </h3>
            <p className="text-sm text-muted-foreground mb-7 leading-relaxed">
              You're motivated. You're watching the content. But nothing is being built. The Vault gives you the structure to actually execute.
            </p>
            <ul className="space-y-2 mb-8 flex-1">
              {[
                "Information overload, no clear path",
                "Learning without building anything",
                "Content that doesn't compound into leads",
                "No monetization system in place",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/75">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/vault"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-accent/40 bg-accent/8 text-accent px-5 py-3 text-sm font-black uppercase tracking-wider hover:bg-accent/15 transition"
            >
              Explore the Vault <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 4. ECOSYSTEM (replaces literal system map) ────────────────────────────────

const ECO_NODES = [
  { label: "Content", x: 50, y: 8, color: "#0A8FE8" },
  { label: "Traffic", x: 78, y: 20, color: "#1a9ffa" },
  { label: "Lead Capture", x: 88, y: 44, color: "#4ab0fc" },
  { label: "Email", x: 78, y: 68, color: "#7F77DD" },
  { label: "Offers", x: 54, y: 84, color: "#9f77ee" },
  { label: "Automation", x: 28, y: 76, color: "#7F77DD" },
  { label: "AI Layer", x: 12, y: 52, color: "#0A8FE8" },
  { label: "Analytics", x: 22, y: 28, color: "#1a9ffa" },
];

const ECO_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 4], [2, 6], [1, 5], [3, 7],
];

function EcosystemSection() {
  return (
    <section
      className="relative px-6 py-28 border-t border-[#181818] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(10,143,232,0.06) 0%, transparent 65%), #050505",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Visual */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-sm aspect-square">
              {/* Ambient glows */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/6 blur-3xl" />
              <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-accent/5 blur-2xl" />

              {/* Rotating ring */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
                style={{ border: "1px solid rgba(10,143,232,0.12)" }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                style={{ border: "1px solid rgba(127,119,221,0.08)" }}
              />

              {/* Edge lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {ECO_EDGES.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={`${ECO_NODES[a].x}%`} y1={`${ECO_NODES[a].y}%`}
                    x2={`${ECO_NODES[b].x}%`} y2={`${ECO_NODES[b].y}%`}
                    stroke="rgba(10,143,232,0.15)"
                    strokeWidth="0.4"
                  />
                ))}
              </svg>

              {/* Center mark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="h-3 w-3 rounded-full bg-primary shadow-glow" />
              </div>

              {/* Nodes */}
              {ECO_NODES.map((n) => (
                <div
                  key={n.label}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full" style={{ background: n.color, boxShadow: `0 0 6px ${n.color}` }} />
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{ color: n.color }}
                    >
                      {n.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white mb-6">
              Most people don't need<br />more tools.
              <br />
              <span className="text-primary">They need structure.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The difference between spinning and scaling is almost never capability. It's architecture. When the pieces connect — content feeds leads, leads feed email, email feeds offers, offers feed automation — the whole machine starts to compound.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              That's what gets built. Not tactics in isolation. A system where every layer feeds the next.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/vault"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
              >
                See What's Inside <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5. PROOF ──────────────────────────────────────────────────────────────────

function ProofSection() {
  return (
    <section className="px-6 py-24 border-t border-[#181818]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="font-display uppercase text-2xl sm:text-3xl font-black tracking-tight leading-[1] text-white">
            Real workflows. <span className="text-primary">Real output.</span>
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ youtubeId, title, tag }: { youtubeId: string; title: string; tag: string }) {
  const thumbUrl = youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null;
  const href = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined;

  const inner = (
    <div className="glass-card glass-card-hover rounded-xl border border-[#1e1e1e] overflow-hidden group cursor-pointer">
      <div className="relative aspect-video bg-surface flex items-center justify-center overflow-hidden">
        {thumbUrl ? (
          <img src={thumbUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#080808]">
            <Video className="h-8 w-8 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-11 w-11 rounded-full bg-primary/90 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Play className="h-4 w-4 text-white fill-white ml-0.5" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="rounded-md bg-background/80 backdrop-blur-sm border border-[#1f1f1f] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {tag}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm text-white leading-snug">{title}</h3>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Terminal className="h-3 w-3" />
          <span>Actual build · No filler</span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  }
  return inner;
}

// ── 6. THE VAULT ──────────────────────────────────────────────────────────────

const VAULT_SYSTEMS = [
  "Funnel Systems",
  "AI Workflows",
  "Content Engines",
  "Automation Stacks",
  "Offer Frameworks",
  "Lead Playbooks",
  "Email Sequences",
  "Swipe Files",
];

function VaultSection() {
  return (
    <section
      className="relative px-6 py-28 border-t border-[#181818] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, rgba(10,143,232,0.07) 0%, transparent 55%), " +
          "radial-gradient(ellipse at 70% 50%, rgba(127,119,221,0.05) 0%, transparent 55%), " +
          "#060606",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left — positioning */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary mb-5">
              — The Vault
            </div>
            <h2 className="font-display uppercase text-4xl sm:text-5xl font-black tracking-tight leading-[0.93] text-white mb-6">
              Your growth<br />
              <span className="text-gradient">operating system.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Not a course. Not a library of lessons. An operational toolkit built for people who are actually building — funnels, automation, content, and AI workflows that exist in the real world.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Built from operational experience since 2008. Practical tools at every stage — from day one through scale.
            </p>
            <Link
              to="/vault"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-3.5 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
            >
              Open the Vault <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right — system list */}
          <div
            className="rounded-xl border p-7"
            style={{
              background: "linear-gradient(160deg, rgba(15,15,15,0.9), rgba(8,8,8,0.95))",
              borderColor: "rgba(10,143,232,0.15)",
            }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-5">
              Inside the Vault
            </div>
            <div className="space-y-2">
              {VAULT_SYSTEMS.map((s, i) => (
                <div
                  key={s}
                  className="flex items-center justify-between py-3 border-b border-[#161616] last:border-0"
                >
                  <span className="text-sm font-medium text-foreground/85">{s}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary/50">
                    0{i + 1}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-[#161616]">
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Built for operators. Not students. Every system documented and executable from day one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 7. FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCtaSection() {
  return (
    <section
      className="relative px-6 py-36 border-t border-[#181818] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(10,143,232,0.10) 0%, transparent 55%), #0a0a0a",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,143,232,0.04) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(10,143,232,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92] text-white">
          Life is already hard.
          <br />
          <span className="text-gradient">At least build something</span>
          <br />
          that belongs to you.
        </h2>

        <p className="mt-8 text-muted-foreground max-w-md mx-auto leading-relaxed">
          The effort isn't the issue. The direction is. Point the same energy toward something that compounds.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/vault"
            className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-8 py-4 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Explore the Vault <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:matt@krakenvault.com"
            className="inline-flex items-center gap-2 rounded-md border border-[#222] bg-surface px-8 py-4 text-sm font-black uppercase tracking-wider hover:border-primary/40 transition"
          >
            Work With Me <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50">
          Keyboard Kraken · Systems Builder · Operating since 2008
        </p>
      </div>
    </section>
  );
}
