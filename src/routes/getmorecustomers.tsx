import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/getmorecustomers")({
  head: () => ({
    meta: [
      { title: "Get More Customers — Keyboard Kraken" },
      {
        name: "description",
        content:
          "We build simple systems that get people in your area seeing your business, walking through your door, leaving reviews, and coming back again.",
      },
    ],
  }),
  component: GetMoreCustomersPage,
});

const P = "#1a5cff";
const V = "#2952cc";
const FG = "#0d1220";
const fg = (a: number) => `rgba(13,18,32,${a})`;

const LOGO_URL = "/api/cdn/Final.Logo.png";

const VIDEOS = [
  {
    youtubeId: "9hxy2dzk7Ko",
    quote: "Very knowledgeable and concise. Definitely recommend!",
    attribution: "Real Estate Agent",
  },
  {
    youtubeId: "K5IYG4QB9RA",
    quote: "Helped me build my business. Super happy with my results.",
    attribution: "Micro Blading Client",
  },
  {
    youtubeId: "mXDCp4C24EA",
    quote: "5 days & 145 leads. Multiple appointments booked.",
    attribution: "Esthetician",
  },
];

const PILLARS = [
  {
    step: "Step 01 — Visibility",
    title: "Local Ads That Drive Foot Traffic",
    body: "Geo-targeted ads that put your business in front of people nearby — so when you have an event or promo, the right people already know about it.",
    checks: [
      "Targeted to your zip code or neighbourhood",
      "Tied to your events, specials, and launches",
      "We handle the copy and creative",
    ],
    img: "/map.png",
  },
  {
    step: "Step 02 — Lead Capture",
    title: "Text Marketing That Brings People Back",
    body: "A lead capture offer collects phone numbers so you can text your audience directly any time you want to fill seats or promote an event.",
    checks: [
      "Offer page built and ready to collect leads",
      "Mass text blasts for events and promos",
      "Texts hit 40%+ open rate vs 20% for email",
    ],
    img: "/phone.png",
  },
  {
    step: "Step 03 — Trust",
    title: "Tap-to-Review Stations & Your Website Hub",
    body: "A tap or scan at your table sends customers to your Google review page — or your website, booking page, or latest offer. One tap, wherever you need them.",
    checks: [
      "NFC card or QR stand at your location",
      "Routes to Google, your site, or your offer",
      "Reviews feed live into your website",
    ],
    img: "/nfc.png",
  },
  {
    step: "Step 04 — Reach",
    title: "Post Once, Reach Every Platform",
    body: "We set up an automation tool that pushes your content to Instagram, Facebook, TikTok, and more in one click — zero extra work, maximum reach.",
    checks: [
      "One post goes to every platform at once",
      "Schedule posts in advance — set it and forget it",
      "More reach means more people showing up",
    ],
    img: "/socials.png",
  },
];

const JOURNEY = [
  { label: "Ads", sub: "People nearby see your ads" },
  { label: "Website", sub: "They click and visit your site" },
  { label: "Offer", sub: "They claim your deal" },
  { label: "Phone #", sub: "You collect their number" },
  { label: "SMS", sub: "You text, they come in" },
  { label: "Reviews", sub: "Happy customers leave 5 stars" },
  { label: "More Customers", sub: "More trust, more reach" },
];

const css = `
  .gmc-wrap {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    background: #edeae4;
    color: ${FG};
    line-height: 1.5;
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    position: relative;
  }
  .gmc-grid-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.3;
    background-image:
      linear-gradient(rgba(26,92,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(26,92,255,0.04) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  /* NAV */
  .gmc-nav {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1.5rem;
    background: rgba(237,234,228,0.92);
    backdrop-filter: blur(18px);
    border-bottom: 0.5px solid rgba(13,18,32,0.12);
  }
  .gmc-nav-brand { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
  .gmc-nav-logo { height: 2rem; width: auto; }
  .gmc-nav-name {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.28em;
    text-transform: uppercase; color: ${fg(0.35)};
  }
  .gmc-nav-cta {
    display: inline-flex; align-items: center; gap: 0.35rem;
    background: ${P}; color: #fff; padding: 0.5rem 1.1rem; border-radius: 6px;
    font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
    text-decoration: none; box-shadow: 0 0 24px rgba(26,92,255,0.22); transition: filter 0.15s;
  }
  .gmc-nav-cta:hover { filter: brightness(1.1); }
  /* HERO */
  .gmc-hero {
    position: relative; z-index: 1; min-height: 80vh;
    display: flex; align-items: center; padding: 5rem 1.5rem 4rem;
    background:
      radial-gradient(ellipse at 15% 10%, rgba(26,92,255,0.07) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 30%, rgba(41,82,204,0.05) 0%, transparent 50%);
  }
  .gmc-hero-inner {
    max-width: 72rem; margin: 0 auto; width: 100%;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
  }
  @media (max-width: 768px) {
    .gmc-hero-inner { grid-template-columns: 1fr; gap: 2rem; }
    .gmc-hero-graphic { display: flex; justify-content: center; }
    .gmc-hero-graphic-box { max-width: 75%; }
  }
  .gmc-hero-eyebrow {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.28em;
    text-transform: uppercase; color: ${P}; margin-bottom: 1.5rem;
  }
  .gmc-hero h1 {
    font-size: clamp(2.6rem, 5vw, 4rem); font-weight: 900; line-height: 0.92;
    text-transform: uppercase; color: ${FG}; margin-bottom: 1.75rem; text-wrap: balance;
  }
  .gmc-hero h1 span { color: ${P}; }
  .gmc-hero-sub {
    font-size: 1.05rem; line-height: 1.7; color: ${fg(0.55)};
    max-width: 30rem; margin-bottom: 2.25rem;
  }
  .gmc-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.25rem; }
  .gmc-tag {
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.04em;
    color: ${fg(0.55)}; display: flex; align-items: center; gap: 0.4rem;
  }
  .gmc-tag-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(26,92,255,0.35); flex-shrink: 0;
  }
  .gmc-btns { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .gmc-btn-blue {
    display: inline-flex; align-items: center; gap: 0.4rem;
    background: ${P}; color: #fff; padding: 0.875rem 1.5rem; border-radius: 6px;
    font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
    text-decoration: none; box-shadow: 0 0 32px rgba(26,92,255,0.25); transition: filter 0.15s;
  }
  .gmc-btn-blue:hover { filter: brightness(1.1); }
  .gmc-btn-outline {
    display: inline-flex; align-items: center; gap: 0.4rem;
    border: 1px solid rgba(13,18,32,0.12); background: transparent;
    color: ${fg(0.55)}; padding: 0.875rem 1.5rem; border-radius: 6px;
    font-size: 0.8rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
    text-decoration: none; transition: background 0.15s;
  }
  .gmc-btn-outline:hover { background: rgba(13,18,32,0.06); }
  .gmc-hero-graphic-box {
    width: 100%; max-width: 480px;
  }
  .gmc-gfx-label {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: ${P};
  }
  .gmc-gfx-desc { font-size: 0.78rem; color: ${fg(0.35)}; line-height: 1.5; }
  /* JOURNEY */
  .gmc-journey {
    position: relative; z-index: 1;
    border-top: 0.5px solid rgba(13,18,32,0.12); border-bottom: 0.5px solid rgba(13,18,32,0.12);
    background: rgba(252,250,246,0.60); backdrop-filter: blur(8px); overflow-x: auto;
  }
  .gmc-journey-inner {
    max-width: 72rem; margin: 0 auto; padding: 1.5rem 2rem;
    display: flex; align-items: center; gap: 0; min-width: max-content;
  }
  .gmc-jstep {
    display: flex; flex-direction: column; align-items: center;
    gap: 0.25rem; padding: 0 1rem; text-align: center;
  }
  .gmc-jicon {
    width: 2.2rem; height: 2.2rem; border-radius: 50%;
    background: rgba(26,92,255,0.08); border: 0.5px solid rgba(26,92,255,0.2);
    display: flex; align-items: center; justify-content: center; margin-bottom: 0.3rem;
    color: ${P};
  }
  .gmc-jlabel {
    font-size: 0.62rem; font-weight: 800; letter-spacing: 0.12em;
    text-transform: uppercase; color: ${FG};
  }
  .gmc-jsub { font-size: 0.58rem; color: ${fg(0.35)}; line-height: 1.3; max-width: 4.5rem; }
  .gmc-jarrow { color: rgba(26,92,255,0.3); flex-shrink: 0; padding: 0 0.25rem; }
  /* CONTENT */
  .gmc-content {
    position: relative; z-index: 1; max-width: 72rem; margin: 0 auto; padding: 4rem 1.5rem 5rem;
  }
  .gmc-eyebrow {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase;
    color: ${P}; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.5rem;
  }
  .gmc-eyebrow::before { content: '—'; }
  .gmc-heading {
    font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; text-transform: uppercase;
    line-height: 0.95; color: ${FG}; margin-bottom: 3rem; text-wrap: balance;
  }
  /* PILLARS */
  .gmc-pillars { display: grid; grid-template-columns: repeat(2,1fr); gap: 1rem; margin-bottom: 4rem; }
  @media (max-width: 640px) { .gmc-pillars { grid-template-columns: 1fr; } }
  .gmc-card {
    background: rgba(252,250,246,0.80); backdrop-filter: blur(24px);
    border: 0.5px solid rgba(13,18,32,0.12); box-shadow: 0 8px 40px rgba(13,18,32,0.06);
    border-radius: 0.875rem; overflow: hidden; display: flex; flex-direction: column;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .gmc-card:hover { box-shadow: 0 16px 56px rgba(13,18,32,0.12); transform: translateY(-2px); }
  .gmc-card-graphic {
    width: 100%; aspect-ratio: 16/7; background: rgba(237,234,228,0.6);
    border-bottom: 0.5px solid rgba(13,18,32,0.06);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 0.3rem; color: rgba(26,92,255,0.25);
  }
  .gmc-card-graphic img { width: 100%; height: 100%; object-fit: cover; }
  .gmc-card-hint {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(26,92,255,0.3);
  }
  .gmc-card-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
  .gmc-card-step {
    font-size: 0.62rem; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase;
    color: ${P}; margin-bottom: 0.5rem;
  }
  .gmc-card-body h3 {
    font-size: 1rem; font-weight: 900; text-transform: uppercase; line-height: 1.2;
    color: ${FG}; margin-bottom: 0.6rem;
  }
  .gmc-card-body p { font-size: 0.85rem; color: ${fg(0.55)}; line-height: 1.65; margin-bottom: 1rem; }
  .gmc-checks { display: flex; flex-direction: column; gap: 0.45rem; margin-top: auto; }
  .gmc-check { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.8rem; color: ${fg(0.55)}; line-height: 1.4; }
  .gmc-check-dot {
    width: 0.9rem; height: 0.9rem; border-radius: 50%; flex-shrink: 0;
    background: rgba(26,92,255,0.1); border: 0.5px solid rgba(26,92,255,0.25);
    display: flex; align-items: center; justify-content: center; margin-top: 0.1rem; color: ${P};
  }
  /* TESTIMONIALS */
  .gmc-tgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; margin-bottom: 2rem; }
  @media (max-width: 768px) { .gmc-tgrid { grid-template-columns: 1fr; } }
  @media (min-width: 480px) and (max-width: 768px) { .gmc-tgrid { grid-template-columns: repeat(2,1fr); } }
  .gmc-tcard {
    border-radius: 0.875rem; overflow: hidden;
    background: rgba(252,250,246,0.88); border: 0.5px solid rgba(13,18,32,0.10);
    box-shadow: 0 8px 40px rgba(13,18,32,0.06);
    display: flex; flex-direction: column; transition: box-shadow 0.25s, transform 0.25s;
  }
  .gmc-tcard:hover { box-shadow: 0 16px 48px rgba(13,18,32,0.11); transform: translateY(-2px); }
  .gmc-tvideo { position: relative; aspect-ratio: 16/9; display: block; overflow: hidden; cursor: pointer; }
  .gmc-tvideo img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .gmc-tcard:hover .gmc-tvideo img { transform: scale(1.04); }
  .gmc-tvideo iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
  .gmc-tplay {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  }
  .gmc-tplay-btn {
    width: 3rem; height: 3rem; border-radius: 50%;
    background: rgba(26,92,255,0.12); border: 1.5px solid rgba(26,92,255,0.55);
    box-shadow: 0 0 24px rgba(26,92,255,0.35);
    display: flex; align-items: center; justify-content: center; color: ${P};
  }
  .gmc-ttag {
    position: absolute; top: 0.65rem; left: 0.65rem;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
    background: rgba(237,234,228,0.92); border: 0.5px solid rgba(13,18,32,0.10); color: ${P};
    padding: 0.2rem 0.5rem; border-radius: 4px; backdrop-filter: blur(8px);
  }
  .gmc-tbody { padding: 1.1rem 1.25rem 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
  .gmc-ttext { font-size: 0.85rem; line-height: 1.6; font-style: italic; color: ${fg(0.65)}; }
  .gmc-tattr { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${fg(0.35)}; }
  /* ABOUT ROW */
  .gmc-about-row {
    display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;
    padding: 1.25rem 1.5rem; border-radius: 0.875rem;
    background: rgba(252,250,246,0.88); border: 0.5px solid rgba(13,18,32,0.12); margin-bottom: 4rem;
  }
  .gmc-about-label { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: ${FG}; margin-bottom: 0.15rem; }
  .gmc-about-sub { font-size: 0.8rem; color: ${fg(0.55)}; }
  /* STATEMENT */
  .gmc-statement {
    border-radius: 0.875rem; overflow: hidden; background: ${P};
    display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 4rem;
  }
  @media (max-width: 640px) { .gmc-statement { grid-template-columns: 1fr; } }
  .gmc-stmt-left { padding: 3rem 2rem 3rem 2.5rem; display: flex; flex-direction: column; justify-content: center; }
  .gmc-stmt-left h2 {
    font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 900; text-transform: uppercase;
    line-height: 0.95; color: #fff; text-wrap: balance;
  }
  .gmc-stmt-left h2 span { opacity: 0.55; }
  .gmc-stmt-right {
    padding: 3rem 2.5rem 3rem 2rem; display: flex; flex-direction: column; justify-content: center;
    border-left: 0.5px solid rgba(255,255,255,0.18);
  }
  @media (max-width: 640px) { .gmc-stmt-right { border-left: none; border-top: 0.5px solid rgba(255,255,255,0.18); padding: 2rem 2.5rem; } }
  .gmc-stmt-right p { font-size: 1rem; color: rgba(255,255,255,0.8); line-height: 1.7; margin-bottom: 1.75rem; }
  .gmc-btn-white {
    display: inline-flex; align-items: center; gap: 0.4rem; background: #fff; color: ${P};
    padding: 0.875rem 1.5rem; border-radius: 6px; font-size: 0.78rem; font-weight: 900;
    letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; width: fit-content; transition: filter 0.15s;
  }
  .gmc-btn-white:hover { filter: brightness(0.96); }
  .gmc-stmt-note { font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-top: 0.75rem; }
  /* CTA */
  .gmc-cta {
    text-align: center; padding: 3rem 1.5rem;
    background: rgba(252,250,246,0.80); backdrop-filter: blur(24px);
    border: 0.5px solid rgba(13,18,32,0.12); border-radius: 0.875rem;
    box-shadow: 0 8px 40px rgba(13,18,32,0.06);
  }
  .gmc-cta-eyebrow {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase;
    color: ${P}; margin-bottom: 0.75rem;
  }
  .gmc-cta-eyebrow::before { content: '— '; }
  .gmc-cta h2 {
    font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 900; text-transform: uppercase;
    line-height: 0.95; color: ${FG}; margin-bottom: 0.75rem; text-wrap: balance;
  }
  .gmc-cta p { font-size: 0.95rem; color: ${fg(0.55)}; max-width: 28rem; margin: 0 auto 2rem; line-height: 1.65; }
  .gmc-cta-note { font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: ${fg(0.35)}; margin-top: 0.75rem; }
  @media (prefers-reduced-motion: reduce) { .gmc-card, .gmc-tcard { transition: none; } }
`;

function GetMoreCustomersPage() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  return (
    <div className="gmc-wrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="gmc-grid-overlay" />

      {/* NAV */}
      <nav className="gmc-nav">
        <Link to="/kraken" className="gmc-nav-brand">
          {LOGO_URL ? (
            <img src={LOGO_URL} alt="Keyboard Kraken" className="gmc-nav-logo" />
          ) : (
            <span className="gmc-nav-name">Keyboard Kraken</span>
          )}
          <span className="gmc-nav-name">Keyboard Kraken</span>
        </Link>
        <Link to="/book" className="gmc-nav-cta">
          Book a Free Call <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </nav>

      {/* HERO */}
      <section className="gmc-hero">
        <div className="gmc-hero-inner">
          <div>
            <div className="gmc-hero-eyebrow">— Local Business Growth Systems</div>
            <h1>Get more people<br /><span>in your door.</span></h1>
            <p className="gmc-hero-sub">
              We build simple systems that get people in your area seeing your business,
              walking through your door, leaving reviews, and coming back again.
            </p>
            <div className="gmc-tags">
              <span className="gmc-tag">More Visibility</span>
              <span className="gmc-tag"><span className="gmc-tag-dot" />More Leads</span>
              <span className="gmc-tag"><span className="gmc-tag-dot" />More Reviews</span>
              <span className="gmc-tag"><span className="gmc-tag-dot" />More Repeat Business</span>
            </div>
            <div className="gmc-btns">
              <Link to="/book" className="gmc-btn-blue">
                Get a Free Growth Audit <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a href="#how" className="gmc-btn-outline">
                See How It Works <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <div className="gmc-hero-graphic">
            <div className="gmc-hero-graphic-box">
              <img src="/ads.sms.webs.ect.png" alt="Local business growth ecosystem" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY STRIP */}
      <div className="gmc-journey">
        <div className="gmc-journey-inner">
          {JOURNEY.map((step, i) => (
            <>
              <div key={step.label} className="gmc-jstep">
                <div className="gmc-jicon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "0.95rem", height: "0.95rem" }}>
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <div className="gmc-jlabel">{step.label}</div>
                <div className="gmc-jsub">{step.sub}</div>
              </div>
              {i < JOURNEY.length - 1 && (
                <div key={`arrow-${i}`} className="gmc-jarrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: "0.9rem", height: "0.9rem" }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div id="how" className="gmc-content">

        {/* PILLARS */}
        <div className="gmc-eyebrow">What We Build For You</div>
        <h2 className="gmc-heading">Four systems.<br />One growth engine.</h2>

        <div className="gmc-pillars">
          {PILLARS.map((p) => (
            <div key={p.step} className="gmc-card">
              <div className="gmc-card-graphic">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="gmc-card-body">
                <div className="gmc-card-step">{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="gmc-checks">
                  {p.checks.map((c) => (
                    <div key={c} className="gmc-check">
                      <span className="gmc-check-dot">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} style={{ width: "0.5rem", height: "0.5rem" }}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TESTIMONIALS */}
        <div className="gmc-eyebrow" style={{ marginBottom: "0.6rem" }}>Real Results</div>
        <h2 className="gmc-heading" style={{ marginBottom: "0.5rem" }}>
          Real Results From Local Business
        </h2>
        <p style={{ fontSize: "0.9rem", color: fg(0.55), marginBottom: "2rem" }}>
          More visibility, more leads, and better follow-up for service businesses
        </p>

        <div className="gmc-tgrid">
          {VIDEOS.map((v) => (
            <div key={v.youtubeId} className="gmc-tcard">
              <div className="gmc-tvideo" onClick={() => setPlayingVideo(v.youtubeId)}>
                {playingVideo === v.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={v.attribution}
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`}
                      alt={v.attribution}
                    />
                    <div className="gmc-tplay">
                      <div className="gmc-tplay-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.1rem", height: "1.1rem", marginLeft: "2px" }}>
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="gmc-ttag">Results</div>
                  </>
                )}
              </div>
              <div className="gmc-tbody">
                <svg viewBox="0 0 20 16" fill="none" style={{ width: "1.1rem", height: "0.9rem", flexShrink: 0 }}>
                  <path d="M0 16V9.6C0 4.267 3.2 1.067 9.6 0l1.2 2C8 2.667 6.4 4 6 6h3v10H0Zm10.4 0V9.6C10.4 4.267 13.6 1.067 20 0l1.2 2c-2.8.667-4.4 2-4.8 4h3v10h-9.6Z" fill={V} opacity="0.6" />
                </svg>
                <p className="gmc-ttext">"{v.quote}"</p>
                <p className="gmc-tattr">— {v.attribution}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ABOUT ROW */}
        <div className="gmc-about-row">
          <div>
            <div className="gmc-about-label">Who's behind this?</div>
            <div className="gmc-about-sub">Learn more about Keyboard Kraken and how we work.</div>
          </div>
          <Link to="/kraken" className="gmc-btn-outline">
            About Us <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* STATEMENT */}
        <div className="gmc-statement">
          <div className="gmc-stmt-left">
            <h2>
              <span>You don't need more followers.</span><br />
              You need more customers.
            </h2>
          </div>
          <div className="gmc-stmt-right">
            <p>
              We build the system that turns online attention into real foot traffic,
              more reviews, and repeat business. No agency retainers. No fluff. Just a system that works.
            </p>
            <Link to="/book" className="gmc-btn-white">
              Book a Free Call <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <div className="gmc-stmt-note">No contracts · No pressure · Just real results</div>
          </div>
        </div>

        {/* CTA */}
        <div className="gmc-cta">
          <div className="gmc-cta-eyebrow">Ready to grow your business?</div>
          <h2>Let's build your growth system.</h2>
          <p>One free call. We'll map out exactly what your setup looks like and what it takes to get it running.</p>
          <Link to="/book" className="gmc-btn-blue" style={{ margin: "0 auto" }}>
            Get My Free Growth Audit <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <div className="gmc-cta-note">No contracts · No pressure · Just real results</div>
        </div>

      </div>
    </div>
  );
}
