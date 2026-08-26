import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, ChevronRight, Video } from "lucide-react";
import { useState } from "react";
import { P, V, FG, fg, glass, LogoMark, KrakenNav, ContactModal } from "@/components/kraken/shared";

// ══════════════════════════════════════════════════════════════════════════════
// SWAPPABLE ASSETS — edit only this block to customise the page
// ══════════════════════════════════════════════════════════════════════════════

const HERO_IMAGE_URL = "https://i.ibb.co/XhcGS64/file-49.jpg"; // right-side hero image; leave "" for network diagram
const ABOUT_MEDIA_URL = "/api/cdn/Logo.animate.mp4"; // About Me circle — paste a .gif, .mp4/.webm, or image URL; leave "" for logo fallback
const VAULT_IMAGE_URL = "https://i.ibb.co/fd8Q6fp8/file-48.jpg"; // Vault section image; leave "" for placeholder

// Video testimonial cards — paste any YouTube URL or bare video ID into youtubeId
const VIDEOS: {
  youtubeId: string;
  title: string;
  tag: string;
  quote: string;
  attribution: string;
}[] = [
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

export const Route = createFileRoute("/kraken")({
  component: KrakenPage,
  head: () => ({
    meta: [
      { title: "Keyboard Kraken — Growth Systems For Local Businesses" },
      {
        name: "description",
        content:
          "We help local businesses get found online, capture more leads, generate more reviews, and stay consistent across every platform—without adding more work to your day.",
      },
      { property: "og:title", content: "Keyboard Kraken — Growth Systems For Local Businesses" },
      {
        property: "og:description",
        content:
          "Get more visibility, more reviews, and more leads with practical growth systems for local businesses.",
      },
    ],
  }),
});

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
        <ServicesSection />
        <ProofSection />
        <AboutSection />
        <FinalCtaSection onOpenContact={() => setContactOpen(true)} />
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}

// ── 1. HERO ───────────────────────────────────────────────────────────────────

const TRUST_TAGS = [
  "More Visibility",
  "More Reviews",
  "More Leads",
  "Better Follow-Up",
  "Stronger Online Presence",
];

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
            <h1
              className="font-sans uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.92]"
              style={{ color: FG }}
            >
              Get More Leads, Reviews &{" "}
              <span style={{ color: P }}>
                Visibility For
                <br />
                Your Business.
              </span>
            </h1>

            <p className="mt-7 text-lg leading-relaxed max-w-lg" style={{ color: fg(0.55) }}>
              We help local businesses get found online, capture more leads, generate more reviews,
              and stay consistent across every platform—without adding more work to your day.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black uppercase tracking-wider transition hover:brightness-110"
                style={{
                  background: P,
                  color: "#ffffff",
                  boxShadow: `0 0 32px rgba(26,92,255,0.25)`,
                }}
              >
                Get a Free Growth Audit <ArrowRight className="h-4 w-4" />
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
                alt="Local business growth overview"
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
    { label: "Reviews", color: "#1a9ffa", x: 78, y: 28 },
    { label: "Follow-Up", color: V, x: 82, y: 58 },
    { label: "Trust", color: "#2952cc", x: 62, y: 82 },
    { label: "Calls", color: P, x: 28, y: 76 },
    { label: "Leads", color: "#1a9ffa", x: 14, y: 50 },
    { label: "Visibility", color: V, x: 22, y: 22 },
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

// ── 3. BOTTLENECKS ────────────────────────────────────────────────────────────

function ChoosePathSection({ onOpenContact }: { onOpenContact: () => void }) {
  return (
    <section className="px-6 py-24" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2 className="font-sans uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]">
            What's Holding <span style={{ color: P }}>Your Business Back?</span>
          </h2>
        </div>

        {/* Pain-point bullets */}
        <div
          className="rounded-xl p-8 mb-6"
          style={{
            ...glass,
            background: `linear-gradient(160deg, rgba(26,92,255,0.05), rgba(252,250,246,0.88))`,
            border: `0.5px solid rgba(26,92,255,0.15)`,
          }}
        >
          <ul className="space-y-5">
            {[
              "You know you should be posting online, but don't have the time to stay consistent.",
              "Potential customers comment, message, call, and inquire—but follow-up isn't always immediate.",
              "Your content isn't getting the reach or engagement it should.",
              "Reviews, leads, and customer conversations are spread across multiple platforms.",
              "Marketing feels disconnected and difficult to track.",
              "You're spending time on repetitive tasks instead of growing your business.",
            ].map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 text-base leading-relaxed"
                style={{ color: fg(0.65) }}
              >
                <span
                  className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: P }}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Lead-magnet card */}
        <div
          className="rounded-xl p-8"
          style={{ background: P, border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] mb-5"
            style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}
          >
            100% Free
          </div>
          <h4 className="font-sans uppercase text-2xl sm:text-3xl font-black tracking-tight leading-[1] text-white mb-4">
            The Customer Leak Audit
          </h4>
          <p className="text-white/80 text-sm leading-relaxed mb-6">
            Find the 5 places local businesses lose customers—and quickly spot where visibility,
            leads, reviews, and follow-up are breaking down.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              to="/lead-kit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3.5 text-sm font-black uppercase tracking-wider transition hover:brightness-95"
              style={{ color: P }}
            >
              Get the Free Customer Leak Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider transition hover:underline"
              style={{ color: "rgba(255,255,255,0.80)" }}
            >
              Work With Me <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="mt-4 block text-[11px] uppercase tracking-wider text-white/55">
            Instant access · 100% free · No spam
          </span>
        </div>
      </div>
    </section>
  );
}

// ── 5. SERVICES ───────────────────────────────────────────────────────────────

const SERVICES = [
  {
    title: "Get More Visibility",
    items: [
      "Content strategy",
      "Social media optimization",
      "Hook & CTA improvements",
      "Multi-platform posting",
      "Competitor analysis",
    ],
  },
  {
    title: "Capture More Leads",
    items: [
      "Lead alert systems",
      "Missed lead recovery",
      "Follow-up systems",
      "Contact forms",
      "Lead tracking",
    ],
  },
  {
    title: "Build More Trust",
    items: [
      "Review generation",
      "Reputation management",
      "Customer feedback systems",
      "Google Business optimization",
    ],
  },
];

function ServicesSection() {
  return (
    <section className="px-6 py-24" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div
            className="text-[10px] font-bold uppercase tracking-[0.28em] mb-4"
            style={{ color: P }}
          >
            — Growth Systems For Local Businesses
          </div>
          <h2
            className="font-sans uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]"
            style={{ color: FG }}
          >
            How I Help Local Businesses Grow
          </h2>
          <p className="mt-6 text-base leading-relaxed" style={{ color: fg(0.55) }}>
            Practical help to improve your online presence, respond faster to real inquiries, and
            turn more customer moments into reviews and revenue.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-xl p-7"
              style={{
                ...glass,
                background: "rgba(252,250,246,0.88)",
                border: "0.5px solid rgba(0,0,0,0.10)",
              }}
            >
              <h3
                className="font-sans uppercase text-xl font-black tracking-tight mb-5"
                style={{ color: P }}
              >
                {service.title}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: fg(0.62) }}
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: P }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 5. PROOF ──────────────────────────────────────────────────────────────────

function ProofSection() {
  return (
    <section className="px-6 py-24" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 text-center">
          <h2 className="font-sans text-2xl sm:text-3xl font-bold" style={{ color: FG }}>
            Real Results From Local Business Growth Work
          </h2>
          <p className="mt-2 text-sm" style={{ color: fg(0.42) }}>
            More visibility, more leads, and better follow-up for service businesses
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

function VideoCard({
  youtubeId: rawId,
  title,
  tag,
  quote,
  attribution,
}: {
  youtubeId: string;
  title: string;
  tag: string;
  quote: string;
  attribution: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = extractYoutubeId(rawId);
  const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

  const videoBlock =
    videoId && isPlaying ? (
      <div className="relative aspect-video overflow-hidden rounded-t-xl bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={`${title} testimonial video`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    ) : (
      <button
        type="button"
        onClick={() => videoId && setIsPlaying(true)}
        disabled={!videoId}
        aria-label={videoId ? `Play ${title} testimonial video` : `${title} video unavailable`}
        className="relative aspect-video flex w-full items-center justify-center overflow-hidden rounded-t-xl group cursor-pointer disabled:cursor-default"
      >
        {thumbUrl ? (
          <img src={thumbUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(230,226,219,0.9)" }}
          >
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
      </button>
    );

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        ...glass,
        background: "rgba(252,250,246,0.88)",
        border: "0.5px solid rgba(0,0,0,0.10)",
      }}
    >
      {videoBlock}

      <div className="p-5 flex flex-col gap-3 flex-1">
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 20 16" fill="none">
          <path
            d="M0 16V9.6C0 4.267 3.2 1.067 9.6 0l1.2 2C8 2.667 6.4 4 6 6h3v10H0Zm10.4 0V9.6C10.4 4.267 13.6 1.067 20 0l1.2 2c-2.8.667-4.4 2-4.8 4h3v10h-9.6Z"
            fill={V}
            opacity="0.6"
          />
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
  const isVideo =
    ABOUT_MEDIA_URL && (ABOUT_MEDIA_URL.includes(".mp4") || ABOUT_MEDIA_URL.includes(".webm"));

  return (
    <section className="px-6 py-24" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
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

          <h2 className="font-sans text-2xl font-bold mb-6" style={{ color: FG }}>
            About Me
          </h2>

          <p className="mb-4 text-sm" style={{ color: fg(0.6) }}>
            I'm not a "guru." I've:
          </p>

          <ul className="mb-7 space-y-1.5 text-sm" style={{ color: fg(0.55) }}>
            {[
              "Sold on Amazon",
              "Built and sold my own products",
              "Run ads for real businesses",
              "Improved follow-up and lead capture for local businesses",
            ].map((item) => (
              <li key={item} className="flex items-center justify-center gap-2">
                <span className="h-1 w-1 rounded-full shrink-0" style={{ background: P }} />
                {item}
              </li>
            ))}
          </ul>

          <p className="max-w-md text-sm leading-relaxed" style={{ color: fg(0.5) }}>
            I don't sell complicated software. I help local businesses solve real problems: not
            enough visibility, inconsistent lead flow, missed opportunities, weak follow-up, and a
            poor online presence. Then I build practical systems that help fix them.
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
            <h2
              className="font-sans uppercase text-4xl sm:text-5xl font-black tracking-tight leading-[0.93]"
              style={{ color: FG }}
            >
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
              style={{
                border: "0.5px solid rgba(0,0,0,0.10)",
                boxShadow: "0 0 60px -10px rgba(26,92,255,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
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
        <h2
          className="font-sans uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]"
          style={{ color: FG }}
        >
          Ready to Attract <span style={{ color: P }}>More Customers?</span>
        </h2>

        <p className="mt-9 max-w-md mx-auto leading-relaxed" style={{ color: fg(0.5) }}>
          Let's identify where your business is losing visibility, leads, reviews, and
          opportunities—and build a practical plan to fix it.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-black uppercase tracking-wider transition hover:brightness-110"
            style={{ background: P, color: "#ffffff", boxShadow: `0 0 32px rgba(26,92,255,0.25)` }}
          >
            Get My Free Growth Audit <ArrowRight className="h-4 w-4" />
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
            Book a Strategy Call <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.2em]" style={{ color: fg(0.25) }}>
          Keyboard Kraken · Growth Systems For Local Businesses · Operating since 2008
        </p>
      </div>
    </section>
  );
}
