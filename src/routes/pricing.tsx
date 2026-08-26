import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { P, FG, fg, glass, KrakenNav, ContactModal } from "@/components/kraken/shared";

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
  head: () => ({
    meta: [
      { title: "Pricing — Keyboard Kraken" },
      {
        name: "description",
        content:
          "Plug one leak or plug all five. Growth systems for local businesses — presence, visibility, and full-funnel systems, priced month to month.",
      },
      { property: "og:title", content: "Pricing — Keyboard Kraken" },
      {
        property: "og:description",
        content:
          "Start where you're losing the most customers, and add on when it's paying for itself.",
      },
    ],
  }),
});

type Tier = {
  name: string;
  tag?: string;
  featured?: boolean;
  forWhom: string;
  price: string;
  setup: string;
  features: string[];
  moreTitle: string;
  moreBody: string;
};

const TIERS: Tier[] = [
  {
    name: "Presence",
    forWhom: "For businesses that show up in search but look inactive or hard to reach.",
    price: "$400",
    setup: "Setup $750, one time",
    features: [
      "Google Business Profile kept current",
      "Review requests sent automatically",
      "Website hosting, updates, and fixes",
      "Contact forms that alert you instantly",
      "One report a month, in plain English",
    ],
    moreTitle: "What this does not include",
    moreBody:
      "No paid ads and no ongoing content. This plan keeps your online presence accurate and responsive. If you want new customers actively pushed toward you, start with Visibility.",
  },
  {
    name: "Visibility",
    tag: "Where most start",
    featured: true,
    forWhom:
      "For businesses that need more people finding them every week, not just finding them once.",
    price: "$1,000",
    setup: "Setup $750, one time",
    features: [
      "Everything in Presence",
      "Facebook and Instagram ads managed",
      "New ad creative every month",
      "Multi-platform posting handled for you",
      "Lead alerts to your phone in real time",
      "A strategy call every month",
    ],
    moreTitle: "What you spend on ads",
    moreBody:
      "Ad budget is separate and goes straight to Meta on your card, not through us. Plan on at least $1,000 a month in ad spend for this to be worth doing. You own the ad account and everything in it.",
  },
  {
    name: "Systems",
    forWhom: "For businesses losing money to follow-up, not to visibility.",
    price: "$1,800",
    setup: "Setup quoted after the audit",
    features: [
      "Everything in Visibility",
      "Missed-call and missed-lead recovery",
      "Automatic follow-up sequences",
      "Leads routed to the right person",
      "Custom automations for your workflow",
      "Competitor and rank tracking",
    ],
    moreTitle: "Who this is actually for",
    moreBody:
      "Businesses already getting inquiries and dropping some of them. If you are not fielding leads yet, this is the wrong plan and we'll tell you so on the call.",
  },
];

const NOTES = [
  {
    lead: "Ad spend is always separate.",
    body: "It goes directly to the platform on your card. You keep the ad account, the pixel, and the audience data if we ever stop working together.",
  },
  {
    lead: "Three months, then month to month.",
    body: "Ads need time to learn before the numbers mean anything. After that, leave whenever you want.",
  },
  {
    lead: "Not sure which one?",
    body: "Run the free Customer Leak Audit first. It usually makes the answer obvious.",
  },
];

function PricingPage() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main
      className="min-h-screen overflow-x-hidden relative"
      style={{ background: "#edeae4", color: FG, fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="relative" style={{ zIndex: 1 }}>
        <KrakenNav onOpenContact={() => setContactOpen(true)} />
        <PricingHero />
        <PricingGrid />
        <PricingNotes />
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}

function PricingHero() {
  return (
    <section
      className="relative px-6 pt-32 pb-16 overflow-hidden"
      style={{
        background:
          `radial-gradient(ellipse at 15% 10%, rgba(26,92,255,0.06) 0%, transparent 50%), ` +
          `radial-gradient(ellipse at 80% 25%, rgba(41,82,204,0.05) 0%, transparent 50%), ` +
          `transparent`,
      }}
    >
      <div className="relative mx-auto max-w-3xl text-center">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.28em] mb-4"
          style={{ color: P }}
        >
          — Pricing
        </div>
        <h1
          className="font-sans uppercase text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]"
          style={{ color: FG }}
        >
          Plug One Leak <span style={{ color: P }}>or Plug All Five.</span>
        </h1>
        <p
          className="mt-7 text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
          style={{ color: fg(0.55) }}
        >
          Most local businesses lose customers in the same handful of places. Start where you're
          losing the most, and add on when it's paying for itself. Three months to start, then month
          to month.
        </p>
      </div>
    </section>
  );
}

function PricingGrid() {
  return (
    <section className="px-6 pb-8" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
      <div className="mx-auto max-w-6xl pt-20">
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {TIERS.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <div
      className="rounded-xl p-8 h-full flex flex-col"
      style={{
        ...glass,
        background: "rgba(252,250,246,0.88)",
        border: tier.featured ? `1px solid ${P}` : "0.5px solid rgba(0,0,0,0.10)",
        boxShadow: tier.featured ? `0 0 0 1px ${P}, 0 8px 40px rgba(0,0,0,0.08)` : glass.boxShadow,
      }}
    >
      {tier.tag && (
        <span
          className="inline-block self-start rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider mb-4"
          style={{ background: "rgba(26,92,255,0.12)", color: P }}
        >
          {tier.tag}
        </span>
      )}
      <h3
        className="font-sans uppercase text-xl font-black tracking-tight mb-2"
        style={{ color: FG }}
      >
        {tier.name}
      </h3>
      <p className="text-sm leading-relaxed mb-6 min-h-[3.5rem]" style={{ color: fg(0.55) }}>
        {tier.forWhom}
      </p>
      <p className="text-3xl font-black tracking-tight leading-none" style={{ color: FG }}>
        {tier.price}{" "}
        <span className="text-sm font-normal" style={{ color: fg(0.45) }}>
          / month
        </span>
      </p>
      <p className="mt-2 mb-6 text-xs" style={{ color: fg(0.4) }}>
        {tier.setup}
      </p>

      <ul className="space-y-3 mb-6">
        {tier.features.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-relaxed"
            style={{ color: fg(0.62) }}
          >
            <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: P }} />
            {item}
          </li>
        ))}
      </ul>

      <details className="mb-6 pt-4" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
        <summary className="cursor-pointer text-sm font-semibold list-none" style={{ color: P }}>
          {tier.moreTitle}
        </summary>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: fg(0.55) }}>
          {tier.moreBody}
        </p>
      </details>

      <div className="mt-auto">
        <Link
          to="/book"
          className="inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3.5 text-sm font-black uppercase tracking-wider transition hover:brightness-110"
          style={
            tier.featured
              ? { background: P, color: "#ffffff", boxShadow: `0 0 28px rgba(26,92,255,0.22)` }
              : { border: "1px solid rgba(0,0,0,0.18)", background: "transparent", color: fg(0.65) }
          }
        >
          Book a Strategy Call <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function PricingNotes() {
  return (
    <section className="px-6 pt-8 pb-28">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl p-8 sm:p-10" style={glass}>
          <div className="grid gap-6 sm:grid-cols-3">
            {NOTES.map((note) => (
              <div key={note.lead}>
                <p className="text-sm font-bold mb-2" style={{ color: FG }}>
                  {note.lead}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: fg(0.55) }}>
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center">
          <Link
            to="/lead-kit"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-black uppercase tracking-wider transition hover:brightness-110"
            style={{ background: P, color: "#ffffff", boxShadow: `0 0 28px rgba(26,92,255,0.22)` }}
          >
            Get the Free Customer Leak Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
