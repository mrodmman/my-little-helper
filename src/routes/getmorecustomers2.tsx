import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

export const Route = createFileRoute("/getmorecustomers2")({
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
  component: GetMoreCustomers2Page,
});

const P = "#1a5cff";
const FG = "#0d1220";
const fg = (a: number) => `rgba(13,18,32,${a})`;
const LOGO_URL = "/api/cdn/Final.Logo.png";

const TILES = [
  {
    img: "/map.png",
    label: "Local Ads",
    sub: "People nearby see your business",
    title: "Local Ads That Drive Foot Traffic",
    body: "Geo-targeted ads that put your business in front of people nearby — so when you have an event or promo, the right people already know about it.",
    checks: [
      "Targeted to your zip code or neighbourhood",
      "Tied to your events, specials, and launches",
      "We handle the copy and creative",
    ],
  },
  {
    img: "/phone.png",
    label: "Text Marketing",
    sub: "Collect numbers, send mass texts",
    title: "Text Marketing That Brings People Back",
    body: "A lead capture offer collects phone numbers so you can text your audience directly any time you want to fill seats or promote an event.",
    checks: [
      "Offer page built and ready to collect leads",
      "Mass text blasts for events and promos",
      "Texts hit 40%+ open rate vs 20% for email",
    ],
  },
  {
    img: "/nfc.png",
    label: "Tap-to-Review",
    sub: "Google reviews with one tap",
    title: "Tap-to-Review Stations & Your Website Hub",
    body: "A tap or scan at your table sends customers to your Google review page — or your website, booking page, or latest offer. One tap, wherever you need them.",
    checks: [
      "NFC card or QR stand at your location",
      "Routes to Google, your site, or your offer",
      "Reviews feed live into your website",
    ],
  },
  {
    img: "/socials.png",
    label: "Social Automation",
    sub: "Post once, reach every platform",
    title: "Post Once, Reach Every Platform",
    body: "We set up an automation tool that pushes your content to Instagram, Facebook, TikTok, and more in one click — zero extra work, maximum reach.",
    checks: [
      "One post goes to every platform at once",
      "Schedule posts in advance — set it and forget it",
      "More reach means more people showing up",
    ],
  },
];

const VIDEOS = [
  { youtubeId: "9hxy2dzk7Ko", quote: "Very knowledgeable and concise. Definitely recommend!", attribution: "Real Estate Agent" },
  { youtubeId: "K5IYG4QB9RA", quote: "Helped me build my business. Super happy with my results.", attribution: "Micro Blading Client" },
  { youtubeId: "mXDCp4C24EA", quote: "5 days & 145 leads. Multiple appointments booked.", attribution: "Esthetician" },
];

const css = `
  .g2-wrap {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
    background: #edeae4; color: ${FG}; min-height: 100vh;
    overflow-x: hidden; -webkit-font-smoothing: antialiased;
  }
  /* NAV */
  .g2-nav {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 1.5rem;
    background: rgba(237,234,228,0.92); backdrop-filter: blur(18px);
    border-bottom: 0.5px solid rgba(13,18,32,0.12);
  }
  .g2-nav-brand { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; }
  .g2-nav-logo { height: 2rem; width: auto; }
  .g2-nav-cta {
    display: inline-flex; align-items: center; gap: 0.35rem;
    background: ${P}; color: #fff; padding: 0.5rem 1.1rem; border-radius: 6px;
    font-size: 0.75rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
    text-decoration: none; transition: filter 0.15s;
  }
  .g2-nav-cta:hover { filter: brightness(1.1); }
  /* HERO */
  .g2-hero {
    text-align: center; padding: 4rem 1.5rem 3rem;
    background:
      radial-gradient(ellipse at 30% 0%, rgba(26,92,255,0.07) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 20%, rgba(41,82,204,0.05) 0%, transparent 55%);
  }
  .g2-eyebrow {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase;
    color: ${P}; margin-bottom: 1.25rem;
  }
  .g2-eyebrow::before { content: '—'; }
  .g2-h1 {
    font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 900; line-height: 0.92;
    text-transform: uppercase; color: ${FG}; text-wrap: balance; margin-bottom: 1rem;
  }
  .g2-h1 span { color: ${P}; }
  .g2-sub {
    font-size: 1.05rem; color: ${fg(0.5)}; max-width: 32rem;
    margin: 0 auto 2.5rem; line-height: 1.65;
  }
  /* TILES */
  .g2-tiles {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    max-width: 72rem; margin: 0 auto; padding: 0 1.5rem 5rem;
  }
  @media (max-width: 900px) { .g2-tiles { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 480px) { .g2-tiles { grid-template-columns: 1fr 1fr; gap: 0.75rem; } }
  .g2-tile {
    border-radius: 0.875rem; overflow: hidden; cursor: pointer; position: relative;
    background: rgba(252,250,246,0.85); border: 1.5px solid rgba(26,92,255,0.18);
    box-shadow: 0 4px 24px rgba(13,18,32,0.06);
    transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
    display: flex; flex-direction: column;
  }
  .g2-tile:hover { box-shadow: 0 12px 40px rgba(26,92,255,0.15); transform: translateY(-3px); border-color: rgba(26,92,255,0.45); }
  .g2-tile-img { width: 100%; aspect-ratio: 1; object-fit: cover; display: block; }
  .g2-tile-plus {
    position: absolute; top: 0.6rem; right: 0.6rem;
    width: 1.6rem; height: 1.6rem; border-radius: 50%;
    background: ${P}; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem; font-weight: 700; line-height: 1;
    box-shadow: 0 2px 8px rgba(26,92,255,0.35);
    animation: g2-pulse 2s ease-in-out infinite;
  }
  @keyframes g2-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(26,92,255,0.4); }
    50% { box-shadow: 0 0 0 6px rgba(26,92,255,0); }
  }
  .g2-tile-foot {
    padding: 0.85rem 1rem; border-top: 0.5px solid rgba(13,18,32,0.07);
    display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  }
  .g2-tile-foot-text { flex: 1; }
  .g2-tile-label {
    font-size: 0.72rem; font-weight: 900; text-transform: uppercase;
    letter-spacing: 0.12em; color: ${FG}; margin-bottom: 0.2rem;
  }
  .g2-tile-sub { font-size: 0.68rem; color: ${fg(0.45)}; line-height: 1.4; }
  .g2-tile-arrow {
    font-size: 0.7rem; font-weight: 900; color: ${P}; flex-shrink: 0;
    width: 1.4rem; height: 1.4rem; border-radius: 50%;
    background: rgba(26,92,255,0.08); display: flex; align-items: center; justify-content: center;
  }
  .g2-tap-hint {
    text-align: center; font-size: 0.68rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase; color: ${fg(0.3)};
    margin-bottom: 2rem;
  }
  /* MODAL */
  .g2-overlay {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(13,18,32,0.55); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; padding: 1.5rem;
  }
  .g2-modal {
    background: #f5f2ec; border-radius: 1rem; max-width: 480px; width: 100%;
    box-shadow: 0 24px 80px rgba(13,18,32,0.22); overflow: hidden;
    animation: g2-pop 0.2s ease;
  }
  @keyframes g2-pop { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  .g2-modal-img { width: 100%; aspect-ratio: 16/8; object-fit: cover; display: block; }
  .g2-modal-body { padding: 1.5rem; }
  .g2-modal-title {
    font-size: 1.1rem; font-weight: 900; text-transform: uppercase;
    line-height: 1.1; color: ${FG}; margin-bottom: 0.75rem;
  }
  .g2-modal-text { font-size: 0.88rem; color: ${fg(0.55)}; line-height: 1.65; margin-bottom: 1rem; }
  .g2-modal-checks { display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1.25rem; }
  .g2-modal-check { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.82rem; color: ${fg(0.6)}; }
  .g2-modal-dot {
    width: 0.85rem; height: 0.85rem; border-radius: 50%; flex-shrink: 0; margin-top: 0.15rem;
    background: rgba(26,92,255,0.1); border: 0.5px solid rgba(26,92,255,0.3);
    display: flex; align-items: center; justify-content: center; color: ${P};
  }
  .g2-modal-close {
    position: absolute; top: 1rem; right: 1rem;
    width: 2rem; height: 2rem; border-radius: 50%; border: none; cursor: pointer;
    background: rgba(13,18,32,0.08); color: ${FG};
    display: flex; align-items: center; justify-content: center; transition: background 0.15s;
  }
  .g2-modal-close:hover { background: rgba(13,18,32,0.14); }
  .g2-modal-wrap { position: relative; }
  /* TESTIMONIALS */
  .g2-proof { max-width: 72rem; margin: 0 auto; padding: 0 1.5rem 5rem; }
  .g2-proof-eyebrow {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase;
    color: ${P}; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;
  }
  .g2-proof-eyebrow::before { content: '—'; }
  .g2-proof-heading {
    font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 900; text-transform: uppercase;
    line-height: 0.95; color: ${FG}; margin-bottom: 0.5rem;
  }
  .g2-proof-sub { font-size: 0.9rem; color: ${fg(0.5)}; margin-bottom: 2rem; }
  .g2-tgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1rem; }
  @media (max-width: 768px) { .g2-tgrid { grid-template-columns: 1fr; } }
  @media (min-width: 480px) and (max-width: 768px) { .g2-tgrid { grid-template-columns: repeat(2,1fr); } }
  .g2-tcard {
    border-radius: 0.875rem; overflow: hidden;
    background: rgba(252,250,246,0.88); border: 0.5px solid rgba(13,18,32,0.10);
    box-shadow: 0 8px 40px rgba(13,18,32,0.06); display: flex; flex-direction: column;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .g2-tcard:hover { box-shadow: 0 16px 48px rgba(13,18,32,0.11); transform: translateY(-2px); }
  .g2-tvideo { position: relative; aspect-ratio: 16/9; display: block; overflow: hidden; }
  .g2-tvideo img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .g2-tcard:hover .g2-tvideo img { transform: scale(1.04); }
  .g2-tplay {
    position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  }
  .g2-tplay-btn {
    width: 3rem; height: 3rem; border-radius: 50%;
    background: rgba(26,92,255,0.12); border: 1.5px solid rgba(26,92,255,0.55);
    box-shadow: 0 0 24px rgba(26,92,255,0.35);
    display: flex; align-items: center; justify-content: center; color: ${P};
  }
  .g2-tbody { padding: 1.1rem 1.25rem 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
  .g2-ttext { font-size: 0.85rem; line-height: 1.6; font-style: italic; color: ${fg(0.65)}; }
  .g2-tattr { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: ${fg(0.35)}; }
  /* CTA */
  .g2-cta {
    max-width: 72rem; margin: 0 auto; padding: 0 1.5rem 5rem;
  }
  .g2-cta-inner {
    background: ${P}; border-radius: 0.875rem; padding: 3rem 2rem; text-align: center;
  }
  .g2-cta-inner h2 {
    font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 900; text-transform: uppercase;
    line-height: 0.95; color: #fff; margin-bottom: 0.75rem; text-wrap: balance;
  }
  .g2-cta-inner p { font-size: 0.95rem; color: rgba(255,255,255,0.75); max-width: 28rem; margin: 0 auto 2rem; line-height: 1.65; }
  .g2-btn-white {
    display: inline-flex; align-items: center; gap: 0.4rem; background: #fff; color: ${P};
    padding: 0.875rem 1.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 900;
    letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; transition: filter 0.15s;
  }
  .g2-btn-white:hover { filter: brightness(0.96); }
  .g2-cta-note { font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.45); margin-top: 0.75rem; }
`;

function GetMoreCustomers2Page() {
  const [active, setActive] = useState<number | null>(null);
  const tile = active !== null ? TILES[active] : null;

  return (
    <div className="g2-wrap">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav className="g2-nav">
        <Link to="/kraken" className="g2-nav-brand">
          <img src={LOGO_URL} alt="Keyboard Kraken" className="g2-nav-logo" />
        </Link>
        <Link to="/book" className="g2-nav-cta">
          Book a Free Call <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </nav>

      {/* HERO */}
      <section className="g2-hero">
        <div className="g2-eyebrow">Local Business Growth</div>
        <h1 className="g2-h1">
          Get more people<br /><span>in your door.</span>
        </h1>
        <p className="g2-sub">
          Four simple systems that get people seeing your business, walking in, leaving reviews, and coming back.
        </p>
      </section>

      {/* TILES */}
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem 0.75rem" }}>
        <p className="g2-tap-hint">Tap a tile to learn more</p>
      </div>
      <div className="g2-tiles">
        {TILES.map((t, i) => (
          <div key={t.label} className="g2-tile" onClick={() => setActive(i)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setActive(i)}>
            <img src={t.img} alt={t.label} className="g2-tile-img" />
            <div className="g2-tile-plus">+</div>
            <div className="g2-tile-foot">
              <div className="g2-tile-foot-text">
                <div className="g2-tile-label">{t.label}</div>
                <div className="g2-tile-sub">{t.sub}</div>
              </div>
              <div className="g2-tile-arrow">›</div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {tile && (
        <div className="g2-overlay" onClick={() => setActive(null)}>
          <div className="g2-modal-wrap" onClick={(e) => e.stopPropagation()}>
            <div className="g2-modal">
              <img src={tile.img} alt={tile.title} className="g2-modal-img" />
              <div className="g2-modal-body">
                <div className="g2-modal-title">{tile.title}</div>
                <p className="g2-modal-text">{tile.body}</p>
                <div className="g2-modal-checks">
                  {tile.checks.map((c) => (
                    <div key={c} className="g2-modal-check">
                      <span className="g2-modal-dot">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} style={{ width: "0.45rem", height: "0.45rem" }}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                      {c}
                    </div>
                  ))}
                </div>
                <Link to="/book" className="g2-btn-white" style={{ background: P, color: "#fff", width: "100%", justifyContent: "center" }}>
                  Let's Talk <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <button className="g2-modal-close" onClick={() => setActive(null)} aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* TESTIMONIALS */}
      <div className="g2-proof">
        <div className="g2-proof-eyebrow">Real Results</div>
        <h2 className="g2-proof-heading">Real Results From Local Business</h2>
        <p className="g2-proof-sub">More visibility, more leads, and better follow-up for service businesses</p>
        <div className="g2-tgrid">
          {VIDEOS.map((v) => (
            <div key={v.youtubeId} className="g2-tcard">
              <a href={`https://www.youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer" className="g2-tvideo">
                <img src={`https://img.youtube.com/vi/${v.youtubeId}/maxresdefault.jpg`} alt={v.attribution} />
                <div className="g2-tplay">
                  <div className="g2-tplay-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "1.1rem", height: "1.1rem", marginLeft: "2px" }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div className="g2-tbody">
                <p className="g2-ttext">"{v.quote}"</p>
                <p className="g2-tattr">— {v.attribution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="g2-cta">
        <div className="g2-cta-inner">
          <h2>Let's build your growth system.</h2>
          <p>One free call. We'll map out exactly what your setup looks like and what it takes to get it running.</p>
          <Link to="/book" className="g2-btn-white">
            Get My Free Growth Audit <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <div className="g2-cta-note">No contracts · No pressure · Just real results</div>
        </div>
      </div>
    </div>
  );
}
