import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Wrench,
  Zap,
  TrendingUp,
  FileText,
  Users,
  Target,
  Mail,
  ShoppingBag,
  Settings,
  BarChart2,
  Play,
  BookOpen,
  Bot,
  Layers,
  Workflow,
  Network,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Terminal,
  Video,
  Globe,
} from "lucide-react";

// ── Swappable assets — edit these without touching layout ─────────────────────
const LOGO_URL = ""; // set to your logo image URL, or leave empty for SVG default
const HERO_IMAGE_URL = ""; // optional hero/product screenshot URL
const AVATAR_URL = ""; // your photo URL

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
          "Build systems that grow your business, audience, and income. AI, automation, funnels, content systems — one connected machine.",
      },
      { property: "og:title", content: "Keyboard Kraken — Systems Builder" },
      {
        property: "og:description",
        content: "Build systems that grow your business, audience, and income.",
      },
    ],
  }),
});

// ── Sub-components ────────────────────────────────────────────────────────────

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
      {/* Simplified kraken tentacle shape */}
      <path
        d="M22 44V20h6l4 6 4-6h6v24h-6V30l-4 5-4-5v14z"
        fill="url(#kk-g)"
      />
      <circle cx="20" cy="42" r="2" fill="#0A8FE8" opacity="0.6" />
      <circle cx="44" cy="42" r="2" fill="#7F77DD" opacity="0.6" />
    </svg>
  );
}

function Connector() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-primary/10" />
      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function KrakenPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <WhatIBuildSection />
      <ChoosePathSection />
      <SystemMapSection />
      <ProofSection />
      <VaultPreviewSection />
      <AboutSection />
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
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,143,232,0.04) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(10,143,232,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left — text */}
          <div>
            {/* Logo + brand name */}
            <div className="flex items-center gap-3 mb-8">
              <LogoMark className="h-10 w-10" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground">
                Keyboard Kraken
              </span>
            </div>

            <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-6">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Systems Builder
            </div>

            <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92] text-white">
              Build systems that grow your{" "}
              <span className="text-gradient">business,<br />audience,</span>{" "}
              and income.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              AI workflows, funnel systems, content engines, and automation — simplified into one practical, connected machine. No fluff. No guru nonsense.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/vault"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
              >
                Explore the Vault <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#work-with-me"
                className="inline-flex items-center gap-2 rounded-md border border-[#222] bg-surface px-6 py-3.5 text-sm font-black uppercase tracking-wider hover:border-primary/40 transition"
              >
                Work With Me <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-2">
              {["AI Workflows", "Funnels", "Automation", "Content Systems", "Lead Gen", "Growth Systems"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#1f1f1f] bg-surface/60 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — visual */}
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
    { label: "Funnel", color: "#1a9ffa", x: 75, y: 32 },
    { label: "Email", color: "#7F77DD", x: 80, y: 58 },
    { label: "Offers", color: "#9f77ee", x: 60, y: 78 },
    { label: "Automation", color: "#0A8FE8", x: 30, y: 70 },
    { label: "Leads", color: "#1a9ffa", x: 18, y: 45 },
    { label: "AI", color: "#7F77DD", x: 25, y: 22 },
  ];

  return (
    <div className="relative w-full max-w-sm aspect-square">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-accent/8 blur-2xl" />

      {/* SVG connector lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={i}
              x1={`${n.x}%`} y1={`${n.y}%`}
              x2={`${next.x}%`} y2={`${next.y}%`}
              stroke="rgba(10,143,232,0.2)"
              strokeWidth="0.5"
            />
          );
        })}
        {/* Cross connections */}
        <line x1="50%" y1="12%" x2="80%" y2="58%" stroke="rgba(127,119,221,0.12)" strokeWidth="0.4" />
        <line x1="18%" y1="45%" x2="75%" y2="32%" stroke="rgba(10,143,232,0.10)" strokeWidth="0.4" />
        <line x1="25%" y1="22%" x2="60%" y2="78%" stroke="rgba(127,119,221,0.10)" strokeWidth="0.4" />
      </svg>

      {/* Center logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="rounded-full border border-primary/40 bg-surface p-4 shadow-glow">
          <LogoMark className="h-12 w-12" />
        </div>
      </div>

      {/* Orbit nodes */}
      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div
            className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-surface/80 backdrop-blur-sm"
            style={{ borderColor: `${node.color}40`, color: node.color }}
          >
            {node.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 2. WHAT I BUILD ───────────────────────────────────────────────────────────

const BUILD_CARDS = [
  {
    icon: Wrench,
    title: "Build",
    color: "#0A8FE8",
    body: "Funnels, offers, lead systems, landing pages, content engines. From zero to a working acquisition machine.",
    tags: ["Funnels", "Landing Pages", "Lead Systems", "Offers"],
  },
  {
    icon: Zap,
    title: "Automate",
    color: "#7F77DD",
    body: "AI workflows, multi-step automations, operational systems that cut manual work so you can focus on growth.",
    tags: ["AI Workflows", "Zapier / Make", "Email Automation", "Ops Systems"],
  },
  {
    icon: TrendingUp,
    title: "Grow",
    color: "#1aa0f5",
    body: "Content systems, lead generation frameworks, audience growth workflows, and scalable traffic engines.",
    tags: ["Content Systems", "Lead Gen", "Audience Growth", "Traffic"],
  },
];

function WhatIBuildSection() {
  return (
    <section className="px-6 py-24 border-t border-[#1a1a1a]">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5">
            What I Build
          </div>
          <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white">
            One operator. <span className="text-primary">Three capabilities.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Not an agency. Not a coach. A systems builder who makes the whole machine work together.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {BUILD_CARDS.map(({ icon: Icon, title, color, body, tags }) => (
            <div key={title} className="glass-card glass-card-hover rounded-xl p-6 border border-[#1f1f1f]">
              <div
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg mb-5"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <h3 className="font-display uppercase text-xl font-black tracking-tight text-white mb-3">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{body}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#242424] bg-[#0d0d0d] px-2.5 py-0.5 text-[10px] text-muted-foreground uppercase tracking-wider"
                  >
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
    <section className="px-6 py-24 border-t border-[#1a1a1a]">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5">
            Choose Your Path
          </div>
          <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white">
            Two audiences. <span className="text-primary">One system.</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Business Owners */}
          <div
            id="work-with-me"
            className="rounded-xl border p-7 flex flex-col"
            style={{
              background: "linear-gradient(160deg, rgba(10,143,232,0.06), rgba(10,10,10,0.9))",
              borderColor: "rgba(10,143,232,0.25)",
            }}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center">
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                Business Owners
              </span>
            </div>
            <h3 className="font-display uppercase text-2xl font-black tracking-tight text-white mb-2">
              You need systems,<br />not more tasks.
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              If you're running a business and drowning in manual work, scattered marketing, or inconsistent lead flow — you need infrastructure, not advice.
            </p>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "Need a consistent lead pipeline",
                "Operations are all manual, all reactive",
                "Marketing is inconsistent or nonexistent",
                "Too much time on tasks AI could handle",
                "No clear funnel or follow-up system",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
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
              background: "linear-gradient(160deg, rgba(127,119,221,0.06), rgba(10,10,10,0.9))",
              borderColor: "rgba(127,119,221,0.25)",
            }}
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-8 w-8 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">
                Creators & Builders
              </span>
            </div>
            <h3 className="font-display uppercase text-2xl font-black tracking-tight text-white mb-2">
              Stop consuming.<br />Start building.
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              You're motivated, you're watching the content — but you're spinning in circles without a real system. The Vault gives you the actual blueprint.
            </p>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "Overwhelmed by information, no clear path",
                "Watching tutorials but building nothing",
                "No monetization system in place",
                "Content is inconsistent and scattered",
                "Not sure how the pieces connect",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/vault"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-accent/50 bg-accent/10 text-accent px-5 py-3 text-sm font-black uppercase tracking-wider hover:bg-accent/20 transition"
            >
              Explore the Vault <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 4. SYSTEM MAP ─────────────────────────────────────────────────────────────

const SYSTEM_NODES = [
  {
    icon: FileText,
    label: "Content Creation",
    desc: "Short-form video, posts, and assets built from a repeatable system — not random effort.",
    color: "#0A8FE8",
  },
  {
    icon: Users,
    label: "Audience & Engagement",
    desc: "Comments, DMs, and discovery that turn cold scrollers into warm leads automatically.",
    color: "#1a9ffa",
  },
  {
    icon: Target,
    label: "Lead Capture",
    desc: "A funnel or opt-in page that converts attention into an email address you own.",
    color: "#4ab0fc",
  },
  {
    icon: Mail,
    label: "Email Nurture",
    desc: "Automated sequences that educate, build trust, and move leads toward a buying decision.",
    color: "#7F77DD",
  },
  {
    icon: ShoppingBag,
    label: "Offers & Sales",
    desc: "Positioned products and services tied directly to the problems your audience already has.",
    color: "#9f77ee",
  },
  {
    icon: Settings,
    label: "Automation Layer",
    desc: "AI and no-code tools that run the follow-up, notifications, and operations without you.",
    color: "#7F77DD",
  },
  {
    icon: BarChart2,
    label: "Scale",
    desc: "Paid traffic, affiliate loops, and optimised funnels that grow without proportional effort.",
    color: "#0A8FE8",
  },
];

function SystemMapSection() {
  return (
    <section className="px-6 py-24 border-t border-[#1a1a1a]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5">
            The System Map
          </div>
          <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white">
            Not tactics. <span className="text-primary">One connected machine.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every piece feeds the next. When the system is built, it runs — with or without you in it.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Background glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-full rounded-full bg-primary/5 blur-3xl pointer-events-none" />

          <div className="relative space-y-0">
            {SYSTEM_NODES.map((node, i) => {
              const Icon = node.icon;
              const isLast = i === SYSTEM_NODES.length - 1;
              return (
                <div key={node.label}>
                  <div className="group relative glass-card rounded-xl border border-[#1f1f1f] p-5 flex items-start gap-5 hover:border-primary/25 transition-colors">
                    {/* Step number */}
                    <span
                      className="absolute -left-3 top-1/2 -translate-y-1/2 hidden md:flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold"
                      style={{
                        background: "#0a0a0a",
                        borderColor: `${node.color}40`,
                        color: node.color,
                      }}
                    >
                      {i + 1}
                    </span>

                    {/* Icon */}
                    <div
                      className="shrink-0 h-12 w-12 rounded-lg flex items-center justify-center"
                      style={{ background: `${node.color}12`, border: `1px solid ${node.color}30` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: node.color }} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-[11px] font-bold uppercase tracking-[0.2em] mb-1"
                        style={{ color: node.color }}
                      >
                        Step {i + 1}
                      </div>
                      <h3 className="font-semibold text-white text-[15px] mb-1">{node.label}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{node.desc}</p>
                    </div>
                  </div>

                  {!isLast && <Connector />}
                </div>
              );
            })}
          </div>

          {/* Final indicator */}
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/8 p-4 text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              A machine that grows without requiring more of your time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5. PROOF STRIP ────────────────────────────────────────────────────────────

function ProofSection() {
  return (
    <section className="px-6 py-24 border-t border-[#1a1a1a]">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl mb-14">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5">
            Real Systems
          </div>
          <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white">
            Not theory. <span className="text-primary">Working examples.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Watch these systems in action — actual builds, actual workflows, actual output.
          </p>
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

function VideoCard({
  youtubeId,
  title,
  tag,
}: {
  youtubeId: string;
  title: string;
  tag: string;
}) {
  const thumbUrl = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    : null;
  const href = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : undefined;

  const inner = (
    <div className="glass-card glass-card-hover rounded-xl border border-[#1f1f1f] overflow-hidden group cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-surface flex items-center justify-center overflow-hidden">
        {thumbUrl ? (
          <img src={thumbUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#111] to-[#0a0a0a]">
            <Video className="h-10 w-10 text-muted-foreground/30" />
          </div>
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-primary/90 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <Play className="h-5 w-5 text-white fill-white ml-0.5" />
          </div>
        </div>
        {/* Tag */}
        <div className="absolute top-3 left-3">
          <span className="rounded-md bg-background/80 backdrop-blur-sm border border-[#1f1f1f] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {tag}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm text-white leading-snug">{title}</h3>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Terminal className="h-3 w-3" />
          <span>Real workflow · No fluff</span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return inner;
}

// ── 6. THE VAULT ──────────────────────────────────────────────────────────────

const VAULT_ITEMS = [
  { icon: Workflow, label: "System Maps", desc: "Visual blueprints for every system in the stack." },
  { icon: Target, label: "Funnel Templates", desc: "Plug-and-play funnel structures that convert." },
  { icon: Bot, label: "AI Workflows", desc: "Prompt stacks and automation chains for daily ops." },
  { icon: Settings, label: "Automation Systems", desc: "No-code flows that handle the repetitive work." },
  { icon: FileText, label: "Content Systems", desc: "Batch creation workflows for consistent output." },
  { icon: ShoppingBag, label: "Offer Vault", desc: "Frameworks for building and positioning offers." },
  { icon: BookOpen, label: "Swipe Files", desc: "Proven hooks, headlines, and email structures." },
  { icon: Network, label: "Lead Gen Playbooks", desc: "Step-by-step systems for growing an email list." },
];

function VaultPreviewSection() {
  return (
    <section className="px-6 py-24 border-t border-[#1a1a1a]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-5">
            The Vault
          </div>
          <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white">
            Your guided <span className="text-primary">operator toolkit.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Not a course. A living ecosystem of systems, templates, workflows, and resources — built for people who want to build, not just learn.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VAULT_ITEMS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="glass-card glass-card-hover rounded-xl border border-[#1f1f1f] p-5"
            >
              <div className="h-9 w-9 rounded-md bg-primary/12 border border-primary/20 flex items-center justify-center mb-4">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-semibold text-[13px] text-white mb-1.5">{label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/vault"
            className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-3.5 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Open the Vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── 7. ABOUT ──────────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="px-6 py-24 border-t border-[#1a1a1a]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Avatar */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-primary/8 blur-2xl" />
              <div className="relative h-64 w-64 rounded-2xl border border-[#1f1f1f] overflow-hidden bg-surface flex items-center justify-center">
                {AVATAR_URL ? (
                  <img src={AVATAR_URL} alt="Matt" className="h-full w-full object-cover" />
                ) : (
                  <LogoMark className="h-24 w-24 opacity-30" />
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-6">
              About
            </div>
            <h2 className="font-display uppercase text-3xl font-black tracking-tight leading-[1] text-white mb-6">
              Not a guru. <span className="text-primary">An operator.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Retail operator since 2008. Built funnels, automations, AI workflows, lead systems, and scalable content systems using practical low-cost tools that actually exist in the real world.
              </p>
              <p>
                I don't sell a dream. I build systems. The same systems I use to run my own business — documented, simplified, and put into tools that beginners can actually execute.
              </p>
              <p>
                The goal has never been passive income mythology. It's leverage — building things that work when you're not in the room.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Since", value: "2008" },
                { label: "Focus", value: "Systems" },
                { label: "Stack", value: "AI + No-Code" },
                { label: "Mission", value: "Real Leverage" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg border border-[#1f1f1f] bg-surface p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
                  <div className="font-display font-black text-lg text-white uppercase tracking-tight">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 8. FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCtaSection() {
  return (
    <section
      className="relative px-6 py-32 border-t border-[#1a1a1a] overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(10,143,232,0.12) 0%, transparent 60%), #0a0a0a",
      }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,143,232,0.03) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(10,143,232,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-8">
          <CheckCircle2 className="h-3.5 w-3.5" />
          You already do the hard part
        </div>

        <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92] text-white">
          Life is already hard.
          <br />
          <span className="text-gradient">At least build something</span>
          <br />
          that belongs to you.
        </h2>

        <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          You're already doing difficult things every day. The systems are the same effort — just pointed in a direction that builds equity instead of burning hours.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/vault"
            className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-8 py-4 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Explore the Vault <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#work-with-me"
            className="inline-flex items-center gap-2 rounded-md border border-[#222] bg-surface px-8 py-4 text-sm font-black uppercase tracking-wider hover:border-primary/40 transition"
          >
            Work With Me <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-primary" /> No fluff
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-primary" /> No fake urgency
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-primary" /> Real systems
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-primary" /> Built for real life
          </span>
        </div>
      </div>
    </section>
  );
}
