import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, ChevronRight, Video } from "lucide-react";
import { FormEvent, useState } from "react";

// ══════════════════════════════════════════════════════════════════════════════
// SWAPPABLE ASSETS — edit only this block to customise the page
// ══════════════════════════════════════════════════════════════════════════════

const LOGO_URL        = "/api/cdn/Final.Logo.png"; // navbar + hero logo; leave "" for SVG fallback
const HERO_IMAGE_URL  = "https://i.ibb.co/XhcGS64/file-49.jpg"; // right-side hero image; leave "" for network diagram
const ABOUT_MEDIA_URL = "/api/cdn/Logo.animate.mp4"; // About Me circle — paste a .gif, .mp4/.webm, or image URL; leave "" for logo fallback
const VAULT_IMAGE_URL = "https://i.ibb.co/fd8Q6fp8/file-48.jpg"; // Vault section image; leave "" for placeholder

// Social links — leave a value empty ("") to hide that icon entirely
const SOCIAL = {
  twitter:   "https://x.com/keyboardkraken",
  youtube:   "https://youtube.com/@keyboardkraken",
  instagram: "", // e.g. "https://instagram.com/yourhandle"
  tiktok:    "", // e.g. "https://tiktok.com/@yourhandle"
};

// Video testimonial cards — paste any YouTube URL or bare video ID into youtubeId
const VIDEOS: { youtubeId: string; title: string; tag: string; quote: string; attribution: string }[] = [
  {
    youtubeId: "https://youtu.be/9hxy2dzk7Ko?si=JdN5H2SZVBqFPpfv",
    title: "Real Estate Agent",
    tag: "Results",
    quote: "Very knowledgeable and concise. Definitely recommend!",
    attribution: "Real Estate Agent",
  },
  {
    youtubeId: "https://youtu.be/K5IYG4QB9RA?si=Z6kWhPNN96Y01IAH",
    title: "Micro Blading Client",
    tag: "Results",
    quote: "Helped me Build my Business, Super Happy with my results",
    attribution: "Micro Blading Client",
  },
  {
    youtubeId: "https://youtu.be/mXDCp4C24EA?si=uiKnKRN28zH19nKV",
    title: "Esthetician Client",
    tag: "Results",
    quote: "5 days & 145 leads. Multiple Appointments booked.",
    attribution: "Esthetician",
  },
];

// ══════════════════════════════════════════════════════════════════════════════

// Parse any YouTube URL or bare ID into a video ID string
function extractYoutubeId(input: string): string {
  if (!input) return "";
  const shortMatch = input.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const longMatch = input.match(/(?:v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  return "";
}

const P = "#1a5cff"; // electric blue
const V = "#2952cc"; // deep ocean navy

const FG  = "#0d1220";                    // main dark text
const fg  = (a: number) => `rgba(13,18,32,${a})`; // helper for opacity text

const glass: React.CSSProperties = {
  background: "rgba(252,250,246,0.80)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "0.5px solid rgba(0,0,0,0.10)",
  boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
};

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
      <rect width="64" height="64" rx="14" fill="#edeae4" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="url(#kk-g)" strokeWidth="2.5" />
      <path d="M22 44V20h6l4 6 4-6h6v24h-6V30l-4 5-4-5v14z" fill="url(#kk-g)" />
      <circle cx="20" cy="42" r="2" fill={P} opacity="0.6" />
      <circle cx="44" cy="42" r="2" fill={V} opacity="0.6" />
    </svg>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function KrakenPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main
      className="min-h-screen overflow-x-hidden relative"
      style={{ background: "#edeae4", color: FG, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="relative" style={{ zIndex: 1 }}>
        <KrakenNav onOpenContact={() => setContactOpen(true)} />
        <HeroSection onOpenContact={() => setContactOpen(true)} />
        <ChoosePathSection onOpenContact={() => setContactOpen(true)} />
        <ProofSection />
        <AboutSection />
        <VaultSection />
        <FinalCtaSection onOpenContact={() => setContactOpen(true)} />
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────

function KrakenNav({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(237,234,228,0.92)",
        backdropFilter: "blur(18px)",
        borderBottom: "0.5px solid rgba(0,0,0,0.08)",
      }}
    >
      <Link to="/kraken" className="flex items-center gap-2.5">
        <LogoMark className="h-7 w-7" />
        <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: fg(0.45) }}>
          Keyboard Kraken
        </span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          to="/offer"
          className="text-[12px] font-semibold uppercase tracking-wider transition hidden sm:block"
          style={{ color: fg(0.40) }}
        >
          Vault
        </Link>
        <button
          type="button"
          onClick={onOpenContact}
          className="text-[12px] font-semibold uppercase tracking-wider transition hidden sm:block"
          style={{ color: fg(0.40) }}
        >
          Work With Me
        </button>
        {(SOCIAL.twitter || SOCIAL.youtube || SOCIAL.instagram || SOCIAL.tiktok) && (
          <div
            className="flex items-center gap-3 pl-4"
            style={{ borderLeft: "0.5px solid rgba(0,0,0,0.10)" }}
          >
            {SOCIAL.twitter && (
              <a href={SOCIAL.twitter} target="_blank" rel="noopener noreferrer"
                className="transition" style={{ color: fg(0.30) }} aria-label="X / Twitter">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                  <path d="M15.32 1.5H18L11.93 8.5 18.9 18.5h-5.65l-4.08-5.34L4.07 18.5H1.39l6.49-7.43L1.1 1.5h5.8l3.69 4.88L15.32 1.5Zm-.95 15.3h1.5L5.73 3H4.12L14.37 16.8Z" />
                </svg>
              </a>
            )}
            {SOCIAL.youtube && (
              <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer"
                className="transition" style={{ color: fg(0.30) }} aria-label="YouTube">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                  <path d="M18.7 5.4a2.26 2.26 0 0 0-1.59-1.6C15.73 3.5 10 3.5 10 3.5s-5.73 0-7.11.3A2.26 2.26 0 0 0 1.3 5.4 23.8 23.8 0 0 0 1 10a23.8 23.8 0 0 0 .3 4.6 2.26 2.26 0 0 0 1.59 1.6C4.27 16.5 10 16.5 10 16.5s5.73 0 7.11-.3a2.26 2.26 0 0 0 1.59-1.6A23.8 23.8 0 0 0 19 10a23.8 23.8 0 0 0-.3-4.6Zm-10.58 7.5V7.1L13.37 10l-5.25 2.9Z" />
                </svg>
              </a>
            )}
            {SOCIAL.instagram && (
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer"
                className="transition" style={{ color: fg(0.30) }} aria-label="Instagram">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                  <path d="M10 1.8c2.67 0 2.99.01 4.04.06 2.75.13 4.03 1.42 4.16 4.16.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.13 2.73-1.4 4.03-4.16 4.16-1.05.05-1.36.06-4.04.06s-2.99-.01-4.04-.06c-2.75-.13-4.03-1.43-4.16-4.16C1.75 12.99 1.74 12.67 1.74 10s.01-2.99.06-4.04C1.93 3.22 3.21 1.93 5.96 1.86 7.01 1.81 7.33 1.8 10 1.8Zm0-1.8C7.28 0 6.94.01 5.88.06 2.24.23.23 2.24.06 5.88.01 6.94 0 7.28 0 10c0 2.72.01 3.06.06 4.12.17 3.64 2.18 5.65 5.82 5.82C6.94 19.99 7.28 20 10 20s3.06-.01 4.12-.06c3.63-.17 5.65-2.18 5.82-5.82C19.99 13.06 20 12.72 20 10c0-2.72-.01-3.06-.06-4.12C19.77 2.25 17.76.23 14.12.06 13.06.01 12.72 0 10 0Zm0 4.86a5.14 5.14 0 1 0 0 10.28A5.14 5.14 0 0 0 10 4.86Zm0 8.48a3.34 3.34 0 1 1 0-6.68 3.34 3.34 0 0 1 0 6.68Zm5.34-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
                </svg>
              </a>
            )}
            {SOCIAL.tiktok && (
              <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer"
                className="transition" style={{ color: fg(0.30) }} aria-label="TikTok">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                  <path d="M17 4.1a4.9 4.9 0 0 1-3-.96V12a5 5 0 1 1-5-5c.17 0 .34.01.5.03V9.6a2.5 2.5 0 1 0 2 2.45V0h2.5A4.9 4.9 0 0 0 17 4.1Z" />
                </svg>
              </a>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

// ── 1. HERO ───────────────────────────────────────────────────────────────────

const TRUST_TAGS = ["Systems", "Automation", "Funnels", "AI Workflows", "Content Engines"];

function HeroSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-20 overflow-hidden"
      style={{
        background:
          `radial-gradient(ellipse at 15% 10%, rgba(26,92,255,0.06) 0%, transparent 50%), ` +
          `radial-gradient(ellipse at 80% 25%, rgba(41,82,204,0.05) 0%, transparent 50%), ` +
          `transparent`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            `linear-gradient(rgba(26,92,255,0.04) 1px, transparent 1px), ` +
            `linear-gradient(90deg, rgba(26,92,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <LogoMark className="h-9 w-9" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: fg(0.35) }}>
                Keyboard Kraken
              </span>
            </div>

            <h1 className="font-sans uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92]" style={{ color: FG }}>
              Build systems that grow your{" "}
              <span style={{ color: P }}>
                business, audience,
                <br />
                and income.
              </span>
            </h1>

            <p className="mt-7 text-lg leading-relaxed max-w-lg" style={{ color: fg(0.55) }}>
              understand what matters, how the pieces connect, and how to start building real online systems that generate money step-by-step.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/offer"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black uppercase tracking-wider transition hover:brightness-110"
                style={{ background: P, color: "#ffffff", boxShadow: `0 0 32px rgba(26,92,255,0.25)` }}
              >
                Explore the Vault <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black uppercase tracking-wider transition"
                style={{
                  border: "1px solid rgba(0,0,0,0.18)",
                  background: "transparent",
                  color: fg(0.65),
                }}
              >
                Work With Me <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2">
              {TRUST_TAGS.map((tag, i) => (
                <span key={tag} className="flex items-center gap-2">
                  {i > 0 && (
                    <span
                      className="h-1 w-1 rounded-full shrink-0"
                      style={{ background: `rgba(26,92,255,0.35)` }}
                    />
                  )}
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: fg(0.35) }}
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
                  border: "0.5px solid rgba(0,0,0,0.10)",
                  boxShadow: `0 0 60px -10px rgba(26,92,255,0.18), 0 0 0 1px rgba(0,0,0,0.05)`,
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
    { label: "Offers", color: "#2952cc", x: 62, y: 82 },
    { label: "Automation", color: P, x: 28, y: 76 },
    { label: "Leads", color: "#1a9ffa", x: 14, y: 50 },
    { label: "AI", color: V, x: 22, y: 22 },
  ];

  return (
    <div className="relative w-full max-w-sm aspect-square">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full"
        style={{ background: `radial-gradient(circle, rgba(26,92,255,0.07) 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full"
        style={{ background: `radial-gradient(circle, rgba(41,82,204,0.06) 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full"
        style={{ border: `1px solid rgba(26,92,255,0.14)` }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{ border: `1px solid rgba(41,82,204,0.10)` }}
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
              stroke="rgba(26,92,255,0.15)"
              strokeWidth="0.5"
            />
          );
        })}
        <line x1="50%" y1="10%" x2="82%" y2="58%" stroke="rgba(41,82,204,0.10)" strokeWidth="0.4" />
        <line x1="14%" y1="50%" x2="78%" y2="28%" stroke="rgba(26,92,255,0.08)" strokeWidth="0.4" />
        <line x1="22%" y1="22%" x2="62%" y2="82%" stroke="rgba(41,82,204,0.08)" strokeWidth="0.4" />
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div
          className="rounded-full border p-4"
          style={{
            borderColor: `rgba(26,92,255,0.30)`,
            background: "rgba(237,234,228,0.9)",
            boxShadow: `0 0 28px rgba(26,92,255,0.15)`,
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
              background: "rgba(237,234,228,0.88)",
            }}
          >
            {node.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 3. AUDIENCE SPLIT ─────────────────────────────────────────────────────────

function ChoosePathSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section
      className="px-6 py-24"
      style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <h2 className="font-sans uppercase text-3xl sm:text-4xl font-black tracking-tight leading-[1]" style={{ color: FG }}>
            Different goals.{" "}
            <span style={{ color: P }}>Same problem.</span>
          </h2>
          <p className="mt-4 max-w-lg" style={{ color: fg(0.48) }}>
            Most people don't need more information. They need structure.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div
            id="work-with-me"
            className="rounded-xl p-8 flex flex-col"
            style={{
              ...glass,
              background: `linear-gradient(160deg, rgba(26,92,255,0.06), rgba(252,250,246,0.85))`,
              border: `0.5px solid rgba(26,92,255,0.20)`,
            }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: P }}
            >
              — Business Owners
            </div>
            <h3 className="font-sans uppercase text-2xl font-black tracking-tight mb-4 leading-tight" style={{ color: FG }}>
              You need systems,<br />not more manual work.
            </h3>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "No consistent lead pipeline",
                "Operations are manual and reactive",
                "Too much time on work AI should handle",
                "Marketing that doesn't compound",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: fg(0.55) }}>
                  <span
                    className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                    style={{ background: P }}
                  />
                  {p}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase tracking-wider transition hover:brightness-110"
              style={{ background: P, color: "#ffffff", boxShadow: `0 0 24px rgba(26,92,255,0.22)` }}
            >
              Work With Me <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div
            className="rounded-xl p-8 flex flex-col"
            style={{
              ...glass,
              background: `linear-gradient(160deg, rgba(41,82,204,0.06), rgba(252,250,246,0.85))`,
              border: `0.5px solid rgba(41,82,204,0.20)`,
            }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.25em] mb-5"
              style={{ color: V }}
            >
              — Builders & Creators
            </div>
            <h3 className="font-sans uppercase text-2xl font-black tracking-tight mb-4 leading-tight" style={{ color: FG }}>
              Stop consuming.<br />Start building.
            </h3>
            <ul className="space-y-2.5 mb-8 flex-1">
              {[
                "Information overload, no clear path",
                "Learning without building anything",
                "Content that doesn't compound into leads",
                "No monetization system in place",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: fg(0.55) }}>
                  <span
                    className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                    style={{ background: V }}
                  />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/funnel"
              className="mb-3 inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase tracking-wider transition"
              style={{ border: `1px solid rgba(26,92,255,0.3)`, color: P, background: "transparent" }}
            >
              Get the free guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/offer"
              className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-black uppercase tracking-wider transition"
              style={{ border: `1px solid rgba(41,82,204,0.36)`, color: V, background: "transparent" }}
            >
              Explore the Vault <ArrowRight className="h-4 w-4" />
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
      style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 text-center">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold" style={{ color: FG }}>
            Real Results Using This System
          </h2>
          <p className="mt-2 text-sm" style={{ color: fg(0.42) }}>
            Formerly Lead Net Marketing
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v, i) => (
            <VideoCard key={i} {...v} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ youtubeId: rawId, title, tag, quote, attribution }: {
  youtubeId: string;
  title: string;
  tag: string;
  quote: string;
  attribution: string;
}) {
  const videoId = extractYoutubeId(rawId);
  const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  const href = videoId ? `https://www.youtube.com/watch?v=${videoId}` : undefined;

  const videoBlock = (
    <div className="relative aspect-video flex items-center justify-center overflow-hidden rounded-t-xl group cursor-pointer">
      {thumbUrl ? (
        <img src={thumbUrl} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(230,226,219,0.9)" }}>
          <Video className="h-8 w-8" style={{ color: fg(0.15) }} />
        </div>
      )}
      <div
        className="absolute inset-x-0 top-0 h-1/3 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, transparent 100%)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
          style={{
            background: "rgba(26,92,255,0.12)",
            border: `1.5px solid rgba(26,92,255,0.55)`,
            boxShadow: `0 0 24px rgba(26,92,255,0.35), inset 0 0 12px rgba(26,92,255,0.08)`,
          }}
        >
          <Play className="h-4 w-4 fill-current ml-0.5" style={{ color: P }} />
        </div>
      </div>
      <div className="absolute top-3 left-3">
        <span
          className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
          style={{
            background: "rgba(237,234,228,0.90)",
            border: "0.5px solid rgba(0,0,0,0.10)",
            color: P,
          }}
        >
          {tag}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ ...glass, background: "rgba(252,250,246,0.88)", border: "0.5px solid rgba(0,0,0,0.10)" }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">{videoBlock}</a>
      ) : videoBlock}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 16" fill="none">
          <path d="M0 16V9.6C0 4.267 3.2 1.067 9.6 0l1.2 2C8 2.667 6.4 4 6 6h3v10H0Zm10.4 0V9.6C10.4 4.267 13.6 1.067 20 0l1.2 2c-2.8.667-4.4 2-4.8 4h3v10h-9.6Z" fill={V} opacity="0.6"/>
        </svg>
        <p className="text-sm leading-relaxed italic" style={{ color: fg(0.65) }}>
          "{quote}"
        </p>
        <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: fg(0.35) }}>
          — {attribution}
        </p>
      </div>
    </div>
  );
}

// ── 6. ABOUT ME ───────────────────────────────────────────────────────────────

function AboutSection() {
  const isVideo = ABOUT_MEDIA_URL && (ABOUT_MEDIA_URL.includes(".mp4") || ABOUT_MEDIA_URL.includes(".webm"));

  return (
    <section
      className="px-6 py-24"
      style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}
    >
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl p-10 flex flex-col items-center text-center" style={glass}>
          <div
            className="mb-8 h-28 w-28 rounded-full overflow-hidden shrink-0"
            style={{
              border: `2px solid rgba(26,92,255,0.30)`,
              boxShadow: `0 0 28px rgba(26,92,255,0.15)`,
            }}
          >
            {isVideo ? (
              <video
                src={ABOUT_MEDIA_URL}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : ABOUT_MEDIA_URL ? (
              <img src={ABOUT_MEDIA_URL} alt="About" className="w-full h-full object-cover" />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "rgba(26,92,255,0.06)" }}
              >
                <LogoMark className="h-16 w-16" />
              </div>
            )}
          </div>

          <h2 className="font-sans text-2xl font-bold mb-6" style={{ color: FG }}>About Me</h2>

          <p className="mb-4 text-sm" style={{ color: fg(0.60) }}>
            I'm not a "guru." I've:
          </p>

          <ul className="mb-7 space-y-1.5 text-sm" style={{ color: fg(0.55) }}>
            {[
              "Sold on Amazon",
              "Built and sold my own products",
              "Run ads for real businesses",
              "Built automation systems that actually save time",
            ].map((item) => (
              <li key={item} className="flex items-center justify-center gap-2">
                <span className="h-1 w-1 rounded-full shrink-0" style={{ background: P }} />
                {item}
              </li>
            ))}
          </ul>

          <p className="max-w-md text-sm leading-relaxed" style={{ color: fg(0.50) }}>
            I'm not here to sell you another course to resell to the next desperate taker.
            I help you build the system behind them — the part that actually makes money.
          </p>
        </div>
      </div>
    </section>
  );
}

// ── 7. THE VAULT ──────────────────────────────────────────────────────────────

function VaultSection() {
  return (
    <section
      className="relative px-6 py-28 overflow-hidden"
      style={{
        background:
          `radial-gradient(ellipse at 30% 50%, rgba(26,92,255,0.05) 0%, transparent 55%), ` +
          `radial-gradient(ellipse at 70% 50%, rgba(41,82,204,0.04) 0%, transparent 55%), ` +
          `transparent`,
        borderTop: "0.5px solid rgba(0,0,0,0.08)",
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
            <h2 className="font-sans uppercase text-4xl sm:text-5xl font-black tracking-tight leading-[0.93]" style={{ color: FG }}>
              Inside the Vault.
            </h2>
          </div>
          <Link
            to="/vault"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black uppercase tracking-wider transition hover:brightness-110 shrink-0"
            style={{ background: P, color: "#ffffff", boxShadow: `0 0 28px rgba(26,92,255,0.22)` }}
          >
            Open the Vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex justify-center">
          {VAULT_IMAGE_URL ? (
            <img
              src={VAULT_IMAGE_URL}
              alt="Inside the Vault"
              className="w-full max-w-md rounded-xl"
              style={{ border: "0.5px solid rgba(0,0,0,0.10)", boxShadow: "0 0 60px -10px rgba(26,92,255,0.18), 0 0 0 1px rgba(0,0,0,0.05)" }}
            />
          ) : (
            <div
              className="w-full max-w-md rounded-xl flex items-center justify-center py-24"
              style={{ ...glass, minHeight: 240 }}
            >
              <p className="text-sm" style={{ color: fg(0.25) }}>
                Vault image coming soon — set VAULT_IMAGE_URL at the top of this file
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ── 8. FINAL CTA ──────────────────────────────────────────────────────────────

function FinalCtaSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section
      className="relative px-6 py-36 overflow-hidden"
      style={{
        background:
          `radial-gradient(ellipse at 50% 0%, rgba(26,92,255,0.07) 0%, transparent 50%), ` +
          `radial-gradient(ellipse at 30% 100%, rgba(41,82,204,0.06) 0%, transparent 50%), ` +
          `radial-gradient(ellipse at 70% 80%, rgba(26,92,255,0.04) 0%, transparent 40%), ` +
          `#e6e2db`,
        borderTop: "0.5px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            `linear-gradient(rgba(26,92,255,0.04) 1px, transparent 1px), ` +
            `linear-gradient(90deg, rgba(26,92,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(26,92,255,0.04) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="font-sans uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]" style={{ color: FG }}>
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
          style={{ color: fg(0.50) }}
        >
          You already deal with schedules, stress, difficult people, and exhausting work every day. Put some of that effort into building systems that belong to you.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/offer"
            className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:brightness-110"
            style={{ background: P, color: "#ffffff", boxShadow: `0 0 32px rgba(26,92,255,0.25)` }}
          >
            Explore the Vault <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-black uppercase tracking-wider transition"
            style={{
              border: "1px solid rgba(0,0,0,0.18)",
              background: "transparent",
              color: fg(0.65),
            }}
          >
            Work With Me <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <p
          className="mt-10 text-[11px] uppercase tracking-[0.2em]"
          style={{ color: fg(0.25) }}
        >
          Keyboard Kraken · Systems Builder · Operating since 2008
        </p>
      </div>
    </section>
  );
}


function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  if (!open) return null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) {
      setStatus("Thanks — message sent.");
      e.currentTarget.reset();
      return;
    }
    setStatus("Could not send right now. Please try again.");
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <button type="button" className="absolute inset-0 bg-black/40" onClick={onClose} aria-label="Close contact modal" />
      <div className="relative w-full max-w-md rounded-xl p-6" style={glass}>
        <h3 className="text-xl font-bold">Work With Me</h3>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input name="name" required placeholder="Name" className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm" />
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm" />
          <textarea name="message" required rows={4} placeholder="Message" className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm" />
          {status && <p className="text-sm" style={{ color: fg(0.65) }}>{status}</p>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-md px-4 py-2 text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white">{loading ? "Sending..." : "Send"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
