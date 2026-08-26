import { Link } from "@tanstack/react-router";
import { FormEvent, useState } from "react";

export const LOGO_URL = "/api/cdn/Final.Logo.png"; // navbar logo; leave "" for SVG fallback

// Social links — leave a value empty ("") to hide that icon entirely
export const SOCIAL = {
  facebook: "https://www.facebook.com/profile.php?id=61588441014491c",
  youtube: "https://www.youtube.com/@Keyboard-Kraken",
  instagram: "", // e.g. "https://instagram.com/yourhandle"
  tiktok: "", // e.g. "https://tiktok.com/@yourhandle"
};

export const P = "#1a5cff"; // electric blue
export const V = "#2952cc"; // deep ocean navy
export const FG = "#0d1220"; // main dark text
export const fg = (a: number) => `rgba(13,18,32,${a})`; // helper for opacity text

export const glass: React.CSSProperties = {
  background: "rgba(252,250,246,0.80)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "0.5px solid rgba(0,0,0,0.10)",
  boxShadow: "0 8px 40px rgba(0,0,0,0.08)",
};

// ── Logo ──────────────────────────────────────────────────────────────────────

export function LogoMark({ className = "" }: { className?: string }) {
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

// ── NAV ───────────────────────────────────────────────────────────────────────

export function KrakenNav({ onOpenContact }: { onOpenContact: () => void }) {
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
        <span
          className="text-[11px] font-bold uppercase tracking-[0.28em]"
          style={{ color: fg(0.45) }}
        >
          Keyboard Kraken
        </span>
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          to="/pricing"
          className="text-[12px] font-semibold uppercase tracking-wider transition hidden sm:block"
          style={{ color: fg(0.4) }}
        >
          Pricing
        </Link>
        <button
          type="button"
          onClick={onOpenContact}
          className="text-[12px] font-semibold uppercase tracking-wider transition hidden sm:block"
          style={{ color: fg(0.4) }}
        >
          Work With Me
        </button>
        {(SOCIAL.facebook || SOCIAL.youtube || SOCIAL.instagram || SOCIAL.tiktok) && (
          <div
            className="flex items-center gap-3 pl-4"
            style={{ borderLeft: "0.5px solid rgba(0,0,0,0.10)" }}
          >
            {SOCIAL.facebook && (
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                style={{ color: fg(0.3) }}
                aria-label="Facebook"
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                  <path d="M11.64 19v-8.21h2.76l.41-3.2h-3.17V5.55c0-.93.26-1.56 1.59-1.56h1.7V1.13A22.7 22.7 0 0 0 12.45 1c-2.45 0-4.12 1.49-4.12 4.23v2.36H5.57v3.2h2.76V19h3.31Z" />
                </svg>
              </a>
            )}
            {SOCIAL.youtube && (
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                style={{ color: fg(0.3) }}
                aria-label="YouTube"
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                  <path d="M18.7 5.4a2.26 2.26 0 0 0-1.59-1.6C15.73 3.5 10 3.5 10 3.5s-5.73 0-7.11.3A2.26 2.26 0 0 0 1.3 5.4 23.8 23.8 0 0 0 1 10a23.8 23.8 0 0 0 .3 4.6 2.26 2.26 0 0 0 1.59 1.6C4.27 16.5 10 16.5 10 16.5s5.73 0 7.11-.3a2.26 2.26 0 0 0 1.59-1.6A23.8 23.8 0 0 0 19 10a23.8 23.8 0 0 0-.3-4.6Zm-10.58 7.5V7.1L13.37 10l-5.25 2.9Z" />
                </svg>
              </a>
            )}
            {SOCIAL.instagram && (
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                style={{ color: fg(0.3) }}
                aria-label="Instagram"
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
                  <path d="M10 1.8c2.67 0 2.99.01 4.04.06 2.75.13 4.03 1.42 4.16 4.16.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.13 2.73-1.4 4.03-4.16 4.16-1.05.05-1.36.06-4.04.06s-2.99-.01-4.04-.06c-2.75-.13-4.03-1.43-4.16-4.16C1.75 12.99 1.74 12.67 1.74 10s.01-2.99.06-4.04C1.93 3.22 3.21 1.93 5.96 1.86 7.01 1.81 7.33 1.8 10 1.8Zm0-1.8C7.28 0 6.94.01 5.88.06 2.24.23.23 2.24.06 5.88.01 6.94 0 7.28 0 10c0 2.72.01 3.06.06 4.12.17 3.64 2.18 5.65 5.82 5.82C6.94 19.99 7.28 20 10 20s3.06-.01 4.12-.06c3.63-.17 5.65-2.18 5.82-5.82C19.99 13.06 20 12.72 20 10c0-2.72-.01-3.06-.06-4.12C19.77 2.25 17.76.23 14.12.06 13.06.01 12.72 0 10 0Zm0 4.86a5.14 5.14 0 1 0 0 10.28A5.14 5.14 0 0 0 10 4.86Zm0 8.48a3.34 3.34 0 1 1 0-6.68 3.34 3.34 0 0 1 0 6.68Zm5.34-9.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
                </svg>
              </a>
            )}
            {SOCIAL.tiktok && (
              <a
                href={SOCIAL.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
                style={{ color: fg(0.3) }}
                aria-label="TikTok"
              >
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

// ── CONTACT MODAL ─────────────────────────────────────────────────────────────

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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
      setSent(true);
      return;
    }
    setError("Could not send right now. Please try again.");
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close contact modal"
      />
      <div className="relative w-full max-w-md rounded-xl p-6" style={glass}>
        {sent ? (
          <div className="py-4 text-center space-y-4">
            <div className="text-3xl">✓</div>
            <h3 className="text-xl font-bold">Message received.</h3>
            <p className="text-sm leading-relaxed" style={{ color: fg(0.6) }}>
              Thanks for reaching out. I review every message personally and will be in touch within
              1–2 business days.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-md bg-blue-600 px-6 py-2 text-sm text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold">Work With Me</h3>
            <p className="mt-1 text-sm" style={{ color: fg(0.55) }}>
              Tell me where you want more visibility, leads, reviews, or follow-up.
            </p>
            <form className="mt-4 space-y-3" onSubmit={onSubmit}>
              <input
                name="name"
                required
                placeholder="Name"
                className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm"
              />
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Where do you want help: visibility, leads, reviews, follow-up, or content?"
                className="w-full rounded-md border border-black/10 bg-white/70 px-3 py-2 text-sm"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="rounded-md px-4 py-2 text-sm">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
