import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/offer")({ component: OfferPage });

const INSIDE = [
  "Plug-and-play templates for content, funnels, and offers",
  "AI workflow blueprints that replace hours of manual work",
  "Automation setups for Zapier, Make, and n8n",
  "A step-by-step monetization system — not theory, actual steps",
  "The exact system used to generate leads without showing your face or owning a product",
  "30-day content calendar so you know exactly what to post",
  "Lifetime access — every update, every new template, forever",
];

const FAQ = [
  "Who is this for?",
  "Do I need technical skills?",
  "What if it's not for me?",
  "Is this a subscription?",
];

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(100%)",
        opacity: visible ? 1 : 0,
        background: "rgba(2,9,22,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-black uppercase tracking-wider text-white">The Vault</p>
          <p className="text-xs text-[#8ea0ba]">Less than a movie night · lifetime access</p>
        </div>
        <a
          href="mailto:matt@krakenvault.com?subject=Kraken%20Vault%20Access"
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-[#1973ea] px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:brightness-110 whitespace-nowrap"
        >
          Get Instant Access — $24.99 →
        </a>
      </div>
    </div>
  );
}

function OfferPage() {
  return (
    <main className="min-h-screen bg-[#e9edf2] text-[#0b1220]">
      <StickyCTA />
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-16">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] font-bold text-[#6e7f96]">
          <span className="text-[#111827]">Keyboard Kraken</span>
          <span>The Vault · Limited Offer</span>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex rounded-full bg-[#dbeafe] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#1d4ed8]">
              Inside the Vault
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight">
              Stop collecting courses.
              <br />
              <span className="text-[#1973ea]">Start shipping systems.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[28px] leading-relaxed text-[#6b7b90]">
              The Vault is a complete operating system for solo builders — templates, AI workflows,
              automations, and monetization playbooks that connect into one machine that actually
              makes money.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="mailto:matt@krakenvault.com?subject=Kraken%20Vault%20Access"
                className="inline-flex rounded-md bg-[#1973ea] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-white"
              >
                Get Instant Access — $24.99 →
              </a>
              <span className="text-xs uppercase font-bold tracking-[0.16em] text-[#7a879a]">
                One-time · Lifetime access
              </span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#020916] p-6 shadow-2xl border border-[#0c1f3a]">
            <img src="https://i.ibb.co/XhcGS64/file-49.jpg" alt="Vault" className="w-full rounded-xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-5xl font-black uppercase leading-[1] tracking-tight">
          You don't have a knowledge problem.
          <br />
          <span className="text-[#1973ea]">You have a system problem.</span>
        </h2>
        <p className="mt-5 max-w-3xl text-xl text-[#6d7f95]">
          Another course won't fix it. Another AI tool won't fix it. What you need is the wiring
          between them — the part nobody shows you.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Before the Vault", "20 tabs open, 3 half-built funnels, no income from any of it."],
            ["What changes", "One connected stack. Content → audience → offers → revenue."],
            ["Where you land", "A system you own that compounds while you sleep."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-xl bg-white p-6 shadow-sm border border-black/5">
              <div className="text-[11px] uppercase font-black tracking-[0.16em] text-[#1973ea]">{t}</div>
              <p className="mt-4 text-[15px] font-semibold text-[#1b2738]">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-5xl font-black uppercase">What you get inside.</h2>
        <p className="mt-3 text-[#7a8799]">Everything is plug-and-play. Open it, customize it, ship it the same day.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {INSIDE.map((item) => (
            <div key={item} className="rounded-xl bg-white border border-black/5 px-5 py-4 flex items-center gap-3">
              <span className="h-6 w-6 rounded-full bg-[#1973ea] text-white inline-flex items-center justify-center"><Check className="h-4 w-4" /></span>
              <p className="font-semibold text-[#1a2738]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 bg-[#020916] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-6xl font-black">Less Than a Movie Night.</h2>
          <p className="mt-4 text-lg text-[#98a7bf]">A new release on Amazon costs $24.99. So does lifetime access to The Vault.</p>
          <div className="mt-9 rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="text-7xl font-black">$24.99 <span className="text-base align-middle font-bold text-[#8fa0bb]">one-time · no subscription ever</span></div>
            <a href="mailto:matt@krakenvault.com?subject=Kraken%20Vault%20Access" className="mt-7 inline-flex rounded-md bg-[#1973ea] px-10 py-4 text-sm font-black uppercase tracking-[0.13em]">Get Instant Access — $24.99 →</a>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[#8ea0ba]">14-day money-back guarantee · secure checkout</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-5xl font-black uppercase">Questions?</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
          {FAQ.map((q) => (
            <div key={q} className="flex items-center justify-between border-b border-black/10 px-6 py-5 last:border-b-0">
              <span className="font-bold text-xl">{q}</span>
              <Plus className="h-4 w-4 text-[#1973ea]" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="mailto:matt@krakenvault.com?subject=Kraken%20Vault%20Access" className="inline-flex rounded-md bg-[#1973ea] px-8 py-4 text-sm font-black uppercase tracking-[0.13em] text-white">Get Instant Access — $24.99 →</a>
          <p className="mt-12 text-xs uppercase tracking-[0.16em] text-[#7b889b]">© Keyboard Kraken · The Vault</p>
        </div>
      </section>
    </main>
  );
}
