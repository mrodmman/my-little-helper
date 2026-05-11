import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";

const LOGO_URL = "/api/cdn/Final.Logo.png";
const BOOK_CALL_URL = "https://calendar.google.com"; // TODO: replace with your real booking URL

const VIDEOS = [
  {
    youtubeId: "https://youtu.be/9hxy2dzk7Ko?si=JdN5H2SZVBqFPpfv",
    title: "Real Estate Agent",
    quote: "Very knowledgeable and concise. Definitely recommend!",
  },
  {
    youtubeId: "https://youtu.be/K5IYG4QB9RA?si=Z6kWhPNN96Y01IAH",
    title: "Micro Blading Client",
    quote: "Helped me Build my Business, Super Happy with my results",
  },
  {
    youtubeId: "https://youtu.be/mXDCp4C24EA?si=uiKnKRN28zH19nKV",
    title: "Esthetician Client",
    quote: "5 days & 145 leads. Multiple Appointments booked.",
  },
];

const PAINS = [
  "Need more presence online",
  "Need more leads",
  "Need better follow-up systems",
  "Want to take the overwhelm out of setting up a system to take advantage of AI and the internet",
];

const INCLUDES = [
  ["Funnel + capture flow refinement", "Audit your existing funnel and tighten the path from first touch to qualified lead."],
  ["Automated lead routing + alerts", "Right lead, right person, right channel — within seconds, not hours."],
  ["Follow-up system + handoff logic", "AI-assisted sequences, clear human handoff, no leads slipping through cracks."],
  ["Pipeline dashboard + visibility", "One view of where every lead is, what's stuck, and what to fix next."],
  ["Implementation support", "We build and integrate it with you — not just send slides and disappear."],
] as const;

export const Route = createFileRoute("/work-with-me")({ component: WorkWithMePage });

function extractYoutubeId(input: string): string {
  const shortMatch = input.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const longMatch = input.match(/(?:v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (longMatch) return longMatch[1];
  return input;
}

function WorkWithMePage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const businessType = String(form.get("businessType") ?? "").trim();
    const leadVolume = String(form.get("leadVolume") ?? "").trim();
    const bottleneck = String(form.get("bottleneck") ?? "").trim();

    const message = [
      `Business Type: ${businessType}`,
      `Monthly Lead Volume: ${leadVolume}`,
      "",
      `Biggest Bottleneck: ${bottleneck}`,
    ].join("\n");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    setLoading(false);
    if (res.ok) setSent(true);
    else setError("Could not send right now. Please try again.");
  };

  return (
    <main className="min-h-screen bg-[#edeae4] text-[#0d1220]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#edeae4]/95 backdrop-blur px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Link to="/kraken" className="flex items-center gap-3">
            {LOGO_URL ? <img src={LOGO_URL} alt="Keyboard Kraken" className="h-8 w-8 rounded-md" /> : null}
            <span className="text-[12px] font-black uppercase tracking-[0.2em]">Keyboard Kraken</span>
          </Link>
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-[#1a5cff] px-4 py-2 text-xs font-black uppercase tracking-wider text-white">Book a Call</a>
        </div>
      </header>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex rounded-md bg-[#1a5cff]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a5cff]">For starter kit subscribers</div>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95]">You need more leads, <span className="text-[#1a5cff]">and a better way to manage them.</span></h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-[#1a5cff] px-6 py-3 text-sm font-black uppercase tracking-wider text-white inline-flex items-center gap-2">Book a Strategy Call <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section className="px-6 py-14 border-t border-black/10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Results, in their own words.</h2>
          <p className="mt-2 text-sm text-black/50 uppercase tracking-wider">Formerly Lead Net Marketing</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {VIDEOS.map((v) => {
              return <VideoInlineCard key={v.title} {...v} />;
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 border-t border-black/10">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">If this is you, <span className="text-[#1a5cff]">we should talk.</span></h2>
          <div className="mt-6 grid gap-3 md:grid-cols-2">{PAINS.map((p) => <div key={p} className="rounded-md bg-white border border-black/10 px-4 py-3 text-sm flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#1a5cff] mt-0.5" />{p}</div>)}</div>
        </div>
      </section>

      <section className="px-6 py-14 border-t border-black/10 bg-[#050a17] text-white">
        <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-3xl sm:text-4xl font-black uppercase leading-tight">Book a call, or send a quick fit form.</h3>
            <p className="mt-4 text-white/75">Strategy calls are 30 minutes. I'll review your current lead flow and tell you exactly where the leverage is.</p>
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-md bg-[#1a5cff] px-6 py-3 text-sm font-black uppercase tracking-wider text-white items-center gap-2">Book Strategy Call <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 p-6">
            <h4 className="text-xl font-black uppercase">Quick Fit Form</h4>
            {sent ? <p className="mt-4 text-green-300">Thanks — got it. I'll reply within 1-2 business days.</p> : (
            <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
              <input name="name" required placeholder="Your name" className="rounded-md border border-white/20 bg-black/20 px-3 py-2.5 text-sm" />
              <input name="email" required type="email" placeholder="you@business.com" className="rounded-md border border-white/20 bg-black/20 px-3 py-2.5 text-sm" />
              <input name="businessType" required placeholder="Business type" className="rounded-md border border-white/20 bg-black/20 px-3 py-2.5 text-sm" />
              <input name="leadVolume" required placeholder="Monthly lead volume" className="rounded-md border border-white/20 bg-black/20 px-3 py-2.5 text-sm" />
              <textarea name="bottleneck" required rows={4} placeholder="Biggest bottleneck" className="rounded-md border border-white/20 bg-black/20 px-3 py-2.5 text-sm" />
              {error && <p className="text-sm text-red-300">{error}</p>}
              <button type="submit" disabled={loading} className="rounded-md bg-[#1a5cff] px-5 py-3 text-sm font-black uppercase tracking-wider">{loading ? "Sending..." : "Send Fit Form"}</button>
            </form>)}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-[#1a5cff] text-white text-center">
        <h2 className="mx-auto max-w-4xl text-4xl sm:text-5xl font-black uppercase leading-[0.95]">Stop running your business out of your inbox.</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-black px-6 py-3 text-sm font-black uppercase tracking-wider">Book a Strategy Call</a>
          <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="rounded-md border border-white/40 px-6 py-3 text-sm font-black uppercase tracking-wider">Apply to Work With Me</a>
        </div>
      </section>
    </main>
  );
}

function VideoInlineCard({ youtubeId, title, quote }: { youtubeId: string; title: string; quote: string }) {
  const [play, setPlay] = useState(false);
  const videoId = extractYoutubeId(youtubeId);
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className="rounded-lg border border-black/10 bg-white overflow-hidden">
      <div className="relative aspect-video bg-[#071022]">
        {play ? (
          <iframe
            src={embedUrl}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button type="button" className="group h-full w-full" onClick={() => setPlay(true)} aria-label={`Play ${title} video`}>
            <img src={thumbUrl} alt={title} className="h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="h-14 w-14 rounded-full flex items-center justify-center" style={{ background: "rgba(26,92,255,0.12)", border: "1.5px solid rgba(26,92,255,0.55)", boxShadow: "0 0 24px rgba(26,92,255,0.35), inset 0 0 12px rgba(26,92,255,0.08)" }}>
                <Play className="h-5 w-5 fill-current ml-0.5 text-[#1a5cff] group-hover:scale-110 transition-transform" />
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="p-4"><p className="text-xs font-black uppercase tracking-wider">{title}</p><p className="mt-2 text-sm text-black/65">“{quote}”</p></div>
    </div>
  );
}
