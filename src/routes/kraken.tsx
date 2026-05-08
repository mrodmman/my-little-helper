import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Wrench,
  Zap,
  TrendingUp,
  Play,
  ChevronRight,
  Terminal,
  Video,
  Bot,
  GitBranch,
  FileText,
  Package,
  BookOpen,
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

const P = "#1da1ff"; // electric blue
const V = "#7F77DD"; // violet accent

export const Route = createFileRoute("/kraken")({
  component: KrakenPage,
  head: () => ({
    meta: [
      { title: "Keyboard Kraken — Systems Builder" },
      {
        name: "description",
        content:
          "AI, automation, funnels, content systems — connected properly so they actually work together.",
      },
      { property: "og:title", content: "Keyboard Kraken — Systems Builder" },
      {
        property: "og:description",
        content: "Build systems that grow your business, audience, and income.",
      },
    ],
  }),
});

// ── Logo ──────────────────────────────────────────────────────────────────────

function LogoMark({ className = "" }: { className?: string }) {
  if (LOGO_URL) return <img src={LOGO_URL} alt="Keyboard Kraken" className={className} />;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-label="Keyboard Kraken">
      <defs>
        <linearGradient id="kk-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={P} />
          <stop offset="100%" stopColor={V} />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#0d0d0d" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="url(#kk-g)" strokeWidth="2.5" />
      <path d="M22 44V20h6l4 6 4-6h6v24h-6V30l-4 5-4-5v14z" fill="url(#kk-g)" />
      <circle cx="20" cy="42" r="2" fill={P} opacity="0.6" />
      <circle cx="44" cy="42" r="2" fill={V} opacity="0.6" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function KrakenPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <KrakenNav />
      <HeroSection />
      <BuildSection />
      <ChoosePathSection />
      <EcosystemSection />
      <ProofSection />
      <VaultSection />
      <CredibilitySection />
      <FinalCtaSection />
    </main>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────

function KrakenNav() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(8,8,8,0.88)",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Link to="/kraken" className="flex items-center gap-2.5">
        <LogoMark className="h-7 w-7" />
        <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
          Keyboard Kraken
        </span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          to="/vault"
          className="text-[12px] font-semibold uppercase tracking-wider text-white/40 hover:text-white transition hidden sm:block"
        >
          Vault
        </Link>
        <a
          href="mailto:matt@krakenvault.com"
          className="text-[12px] font-semibold uppercase tracking-wider text-white/40 hover:text-white transition hidden sm:block"
        >
          Work With Me
        </a>
        <div
          className="flex items-center gap-3 pl-4"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}
        >
          <a
            href="https://x.com/keyboardkraken"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-white/60 transition"
            aria-label="X / Twitter"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
              <path d="M15.32 1.5H18L11.93 8.5 18.9 18.5h-5.65l-4.08-5.34L4.07 18.5H1.39l6.49-7.43L1.1 1.5h5.8l3.69 4.88L15.32 1.5Zm-.95 15.3h1.5L5.73 3H4.12L14.37 16.8Z" />
            </svg>
          </a>
          <a
            href="https://youtube.com/@keyboardkraken"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/25 hover:text-white/60 transition"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
              <path d="M18.7 5.4a2.26 2.26 0 0 0-1.59-1.6C15.73 3.5 10 3.5 10 3.5s-5.73 0-7.11.3A2.26 2.26 0 0 0 1.3 5.4 23.8 23.8 0 0 0 1 10a23.8 23.8 0 0 0 .3 4.6 2.26 2.26 0 0 0 1.59 1.6C4.27 16.5 10 16.5 10 16.5s5.73 0 7.11-.3a2.26 2.26 0 0 0 1.59-1.6A23.8 23.8 0 0 0 19 10a23.8 23.8 0 0 0-.3-4.6Zm-10.58 7.5V7.1L13.37 10l-5.25 2.9Z" />
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}

// ── 1. HERO ───────────────────────────────────────────────────────────────────

const TRUST_TAGS = ["Systems", "Automation", "Funnels", "AI Workflows", "Content Engines"];

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden"
      style={{
        background:
          `radial-gradient(ellipse at 15% 10%, rgba(29,161,255,0.12) 0%, transparent 50%), ` +
          `radial-gradient(ellipse at 80% 25%, rgba(127,119,221,0.08) 0%, transparent 50%), ` +
          `#080808`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            `linear-gradient(rgba(29,161,255,0.05) 1px, transparent 1px), ` +
            `linear-gradient(90deg, rgba(29,161,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <LogoMark className="h-9 w-9" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/35">
                Keyboard Kraken
              </span>
            </div>

            <h1 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92] text-white">
              Build systems that grow your{" "}
              <span style={{ color: P }}>
                business, audience,
                <br />
                and income.
              </span>
            </h1>

            <p className="mt-7 text-lg leading-relaxed max-w-lg" style={{ color: "rgba(255,255,255,0.42)" }}>
              AI, automation, content, funnels, and practical systems — connected properly so they actually work together.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/vault"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition hover:brightness-110"
                style={{ background: P, boxShadow: `0 0 28px rgba(29,161,255,0.3)` }}
              >
                Explore the Vault <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#work-with-me"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black uppercase tracking-wider transition hover:text-white"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                Work With Me <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
              {TRUST_TAGS.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  {i > 0 && (
                    <span
                      className="h-1 w-1 rounded-full shrink-0"
                      style={{ background: `rgba(29,161,255,0.35)` }}
                    />
                  )}
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: "rgba(255,255,255,0.28)" }}
                  >
                    {tag}
                  </span>
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            {HERO_IMAGE_URL ? (
              <img
                src={HERO_IMAGE_URL}
                alt="System overview"
                className="w-full max-w-md rounded-xl"
                style={{
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: `0 0 60px -10px rgba(29,161,255,0.25)`,
                }}
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
    { label: "Content", color: P, x: 50, y: 10 },
    { label: "Funnel", color: "#1a9ffa", x: 78, y: 28 },
    { label: "Email", color: V, x: 82, y: 58 },
    { label: "Offers", color: "#9f77ee", x: 62, y: 82 },
    { label: "Automation", color: P, x: 28, y: 76 },
    { label: "Leads", color: "#1a9ffa", x: 14, y: 50 },
    { label: "AI", color: V, x: 22, y: 22 },
  ];

  return (
    <div className="relative w-full max-w-sm aspect-square">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full"
        style={{ background: `radial-gradient(circle, rgba(29,161,255,0.07) 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full"
        style={{ background: `radial-gradient(circle, rgba(127,119,221,0.06) 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full"
        style={{ border: `1px solid rgba(29,161,255,0.10)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{ border: `1px solid rgba(127,119,221,0.07)` }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {nodes.map((n, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={i}
              x1={`${n.x}%`}
              y1={`${n.y}%`}
              x2={`${next.x}%`}
              y2={`${next.y}%`}
              stroke="rgba(29,161,255,0.15)"
              strokeWidth="0.5"
            />
          );
        })}
        <line x1="50%" y1="10%" x2="82%" y2="58%" stroke="rgba(127,119,221,0.09)" strokeWidth="0.4" />
        <line x1="14%" y1="50%" x2="78%" y2="28%" stroke="rgba(29,161,255,0.07)" strokeWidth="0.4" />
        <line x1="22%" y1="22%" x2="62%" y2="82%" stroke="rgba(127,119,221,0.07)" strokeWidth="0.4" />
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="rounded-full border p-4"
          style={{
            borderColor: `rgba(29,161,255,0.28)`,
            background: "#0d0d0d",
            boxShadow: `0 0 24px rgba(29,161,255,0.18)`,
          }}
        >
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
            className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{
              borderColor: `${node.color}28`,
              color: node.color,
              background: "rgba(8,8,8,0.85)",
            }}
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
    color: P,
    body: "Funnels, landing pages, lead systems, content engines.",
  },
  {
    icon: Zap,
    title: "Automate",
    color: V,
    body: "AI workflows, operational systems, automation infrastructure.",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    color: "#1aa0f5",
    body: "Content systems, lead generation, audience growth.",
  },
];

function BuildSection() {
  return (
    <section
      className="px-6 py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white mb-12">
          Build. Automate. <span style={{ color: P }}>Grow.</span>
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {BUILD_CARDS.map(({ icon: Icon, title, color, body }) => (
            <div
              key={title}
              className="rounded-xl p-7 flex flex-col gap-5"
              style={{
                background: "rgba(12,12,12,0.9)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: `${color}0f`, border: `1px solid ${color}22` }}
              >
                <Icon className="h-4 w-4" style={{ color }} />
              </div>
              <div>
                <h3 className="font-display uppercase text-xl font-black tracking-tight text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. AUDIENCE SPLIT ─────────────────────────────────────────────────────────

function ChoosePathSection() {
  return (
    <section
      className="px-6 py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white">
            Different goals.{" "}
            <span style={{ color: P }}>Same problem.</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: "rgba(255,255,255,0.38)" }}>
            Most people don't need more information. They need structure.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div
            id="work-with-me"
            className="rounded-xl p-8 flex flex-col"
            style={{
              background: `linear-gradient(160deg, rgba(29,161,255,0.05), rgba(8,8,8,0.96))`,
              border: `1px solid rgba(29,161,255,0.16)`,
            }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: P }}
            >
              — Business Owners
            </div>
            <h3 className="font-display uppercase text-2xl font-black tracking-tight text-white mb-4 leading-tight">
              You need systems,<br />not more manual work.
            </h3>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "No consistent lead pipeline",
                "Operations are manual and reactive",
                "Too much time on work AI should handle",
                "Marketing that doesn't compound",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span
                    className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                    style={{ background: P }}
                  />
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="mailto:matt@krakenvault.com"
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:brightness-110"
              style={{ background: P, boxShadow: `0 0 20px rgba(29,161,255,0.22)` }}
            >
              Work With Me <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div
            className="rounded-xl p-8 flex flex-col"
            style={{
              background: `linear-gradient(160deg, rgba(127,119,221,0.05), rgba(8,8,8,0.96))`,
              border: `1px solid rgba(127,119,221,0.16)`,
            }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: V }}
            >
              — Builders & Creators
            </div>
            <h3 className="font-display uppercase text-2xl font-black tracking-tight text-white mb-4 leading-tight">
              Stop consuming.<br />Start building.
            </h3>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "Information overload, no clear path",
                "Learning without building anything",
                "Content that doesn't compound into leads",
                "No monetization system in place",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span
                    className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                    style={{ background: V }}
                  />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/vault"
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase tracking-wider transition hover:bg-white/5"
              style={{ border: `1px solid rgba(127,119,221,0.32)`, color: V }}
            >
              Explore the Vault <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 4. ECOSYSTEM ──────────────────────────────────────────────────────────────

const ECO_NODES = [
  { label: "Content", x: 50, y: 8, color: P },
  { label: "Traffic", x: 78, y: 20, color: "#1a9ffa" },
  { label: "Lead Capture", x: 88, y: 44, color: "#4ab0fc" },
  { label: "Email", x: 78, y: 68, color: V },
  { label: "Offers", x: 54, y: 84, color: "#9f77ee" },
  { label: "Automation", x: 28, y: 76, color: V },
  { label: "AI Layer", x: 12, y: 52, color: P },
  { label: "Analytics", x: 22, y: 28, color: "#1a9ffa" },
];

const ECO_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 4], [2, 6], [1, 5], [3, 7],
];

function EcosystemSection() {
  return (
    <section
      className="relative px-6 py-28 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 50%, rgba(29,161,255,0.05) 0%, transparent 65%), #050505`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-sm aspect-square">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                style={{ background: `radial-gradient(circle, rgba(29,161,255,0.06) 0%, transparent 70%)` }}
              />
              <div
                className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full"
                style={{ background: `radial-gradient(circle, rgba(127,119,221,0.05) 0%, transparent 70%)` }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full"
                style={{ border: `1px solid rgba(29,161,255,0.10)` }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
                style={{ border: `1px solid rgba(127,119,221,0.07)` }}
              />

              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {ECO_EDGES.map(([a, b], i) => (
                  <line
                    key={i}
                    x1={`${ECO_NODES[a].x}%`}
                    y1={`${ECO_NODES[a].y}%`}
                    x2={`${ECO_NODES[b].x}%`}
                    y2={`${ECO_NODES[b].y}%`}
                    stroke="rgba(29,161,255,0.13)"
                    strokeWidth="0.4"
                  />
                ))}
              </svg>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div
                  className="h-3 w-3 rounded-full animate-pulse"
                  style={{ background: P, boxShadow: `0 0 14px ${P}` }}
                />
              </div>

              {ECO_NODES.map((n) => (
                <div
                  key={n.label}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: n.color, boxShadow: `0 0 5px ${n.color}` }}
                    />
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

          <div className="order-1 lg:order-2">
            <h2 className="font-display uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1] text-white mb-6">
              Not tactics.
              <br />
              <span style={{ color: P }}>Connected systems.</span>
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.38)" }}>
              The difference between spinning and scaling is almost never capability. It's architecture. When the pieces connect — content feeds leads, leads feed email, email feeds offers, offers feed automation — the whole machine starts to compound.
            </p>
            <p className="leading-relaxed mb-9" style={{ color: "rgba(255,255,255,0.38)" }}>
              Not isolated tactics. Infrastructure.
            </p>
            <Link
              to="/vault"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:brightness-110"
              style={{ background: P, boxShadow: `0 0 20px rgba(29,161,255,0.25)` }}
            >
              See What's Inside <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5. PROOF ──────────────────────────────────────────────────────────────────

function ProofSection() {
  return (
    <section
      className="px-6 py-24"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h2 className="font-display uppercase text-2xl sm:text-3xl font-black tracking-tight leading-[1] text-white">
            Real systems. <span style={{ color: P }}>Real workflows.</span>
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
    <div
      className="rounded-xl overflow-hidden group cursor-pointer"
      style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#0a0a0a" }}
    >
      <div className="relative aspect-video flex items-center justify-center overflow-hidden">
        {thumbUrl ? (
          <img src={thumbUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] to-[#080808]">
            <Video className="h-8 w-8" style={{ color: "rgba(255,255,255,0.08)" }} />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-11 w-11 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ background: `${P}e6`, boxShadow: `0 0 20px rgba(29,161,255,0.4)` }}
          >
            <Play className="h-4 w-4 text-white fill-white ml-0.5" />
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span
            className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
            style={{
              background: "rgba(8,8,8,0.88)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: P,
            }}
          >
            {tag}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm text-white leading-snug">{title}</h3>
        <div
          className="mt-1.5 flex items-center gap-1.5 text-[11px]"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          <Terminal className="h-3 w-3" />
          <span>Actual build · No filler</span>
        </div>
      </div>
    </div>
  );

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return inner;
}

// ── 6. THE VAULT ──────────────────────────────────────────────────────────────

const VAULT_ITEMS = [
  {
    icon: GitBranch,
    label: "Funnel Systems",
    desc: "Complete funnel builds, templates, and sequences.",
  },
  {
    icon: Bot,
    label: "AI Workflows",
    desc: "Practical AI systems built for real-world use.",
  },
  {
    icon: Zap,
    label: "Automation Systems",
    desc: "Multi-step automations and operational stacks.",
  },
  {
    icon: FileText,
    label: "Content Systems",
    desc: "Content engines that generate consistent output.",
  },
  {
    icon: Package,
    label: "Offer Vault",
    desc: "Offer frameworks, positioning, and packaging guides.",
  },
  {
    icon: BookOpen,
    label: "Swipe Files",
    desc: "Copy, hooks, frameworks, and reusable assets.",
  },
];

function VaultSection() {
  return (
    <section
      className="relative px-6 py-28 overflow-hidden"
      style={{
        background:
          `radial-gradient(ellipse at 30% 50%, rgba(29,161,255,0.06) 0%, transparent 55%), ` +
          `radial-gradient(ellipse at 70% 50%, rgba(127,119,221,0.04) 0%, transparent 55%), ` +
          `#060606`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.28em] mb-4"
              style={{ color: P }}
            >
              — The Vault
            </div>
            <h2 className="font-display uppercase text-4xl sm:text-5xl font-black tracking-tight leading-[0.93] text-white">
              Inside the Vault.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Templates, systems, workflows, AI tools, funnels, and practical guidance designed to help you build something real.
            </p>
          </div>
          <Link
            to="/vault"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black uppercase tracking-wider text-white transition hover:brightness-110 shrink-0"
            style={{ background: P, boxShadow: `0 0 24px rgba(29,161,255,0.28)` }}
          >
            Open the Vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VAULT_ITEMS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="rounded-xl p-5 flex gap-4 items-start"
              style={{
                background: "rgba(12,12,12,0.9)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg mt-0.5"
                style={{
                  background: `rgba(29,161,255,0.08)`,
                  border: `1px solid rgba(29,161,255,0.15)`,
                }}
              >
                <Icon className="h-4 w-4" style={{ color: P }} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{label}</h3>
                <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-[11px] uppercase tracking-wider"
          style={{ color: `rgba(29,161,255,0.38)` }}
        >
          Built for operators. Not students.
        </p>
      </div>
    </section>
  );
}

// ── 7. CREDIBILITY ────────────────────────────────────────────────────────────

function CredibilitySection() {
  return (
    <section
      className="px-6 py-16"
      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.26)" }}>
          Operating since 2008. Real-world systems across funnels, automation, AI, and content.
          Low-cost tools, practical implementation, no certification required.
          The systems here exist because they were built and used — not designed to look impressive in a presentation.
        </p>
      </div>
    </section>
  );
}

// ── 8. FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCtaSection() {
  return (
    <section
      className="relative px-6 py-36 overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, rgba(29,161,255,0.09) 0%, transparent 55%), #080808`,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            `linear-gradient(rgba(29,161,255,0.04) 1px, transparent 1px), ` +
            `linear-gradient(90deg, rgba(29,161,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-display uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-white">
          You wake up early
          <br />
          for a job you tolerate.
          <br />
          <span style={{ color: P }}>What if you woke up early</span>
          <br />
          for a life you actually wanted?
        </h2>

        <p
          className="mt-9 max-w-md mx-auto leading-relaxed"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          You already deal with schedules, stress, difficult people, and exhausting work every day. Put some of that effort into building systems that belong to you.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/vault"
            className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:brightness-110"
            style={{ background: P, boxShadow: `0 0 28px rgba(29,161,255,0.3)` }}
          >
            Explore the Vault <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="mailto:matt@krakenvault.com"
            className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:text-white"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.60)",
            }}
          >
            Work With Me <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <p
          className="mt-10 text-[11px] uppercase tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Keyboard Kraken · Systems Builder · Operating since 2008
        </p>
      </div>
    </section>
  );
}
