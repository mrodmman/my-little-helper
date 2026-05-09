import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Rocket, Music2, Package, Zap, ChevronRight } from "lucide-react";
import { MODULES } from "@/data/courseMeta";

export const Route = createFileRoute("/jumpstart")({
  component: JumpstartPage,
});

// ─── Calendar data (pulled from Fast Track strategies) ────────────────────────

type PostSlot = {
  platform: "tiktok" | "amazon" | "bonus";
  title: string;
  body: string;
};

type CalDay = {
  n: number;
  theme: string;
  sub: string;
  posts: PostSlot[];
};

const CALENDAR: CalDay[] = [
  {
    n: 1,
    theme: "Start",
    sub: "Easiest plays — build the habit",
    posts: [
      {
        platform: "tiktok",
        title: "Slash & Free Referral Hack",
        body: "Screen record the progress bar dropping to $0. Show how to get free items via referrals.",
      },
      {
        platform: "amazon",
        title: "Home Item Find",
        body: "Show something you already own in real life, then pull up the Amazon listing.",
      },
      {
        platform: "bonus",
        title: "Wishlist Walkthrough",
        body: "Scroll your Amazon wishlist. Explain quickly why you want each item.",
      },
    ],
  },
  {
    n: 2,
    theme: "Urgency",
    sub: "Scarcity & deal angles",
    posts: [
      {
        platform: "tiktok",
        title: "Flash Sale Countdown",
        body: "Use a live Flash Sale timer as your green screen background to drive urgency.",
      },
      {
        platform: "amazon",
        title: "Feature Demo (Savings)",
        body: "Record clipping coupons and using discounts. Show the final price drop.",
      },
      {
        platform: "bonus",
        title: "Inventory FOMO Alert",
        body: `Screen record "Low Stock" or "Only X Left" badges. Create urgency with the visual.`,
      },
    ],
  },
  {
    n: 3,
    theme: "Trust",
    sub: "Social proof builds buyers",
    posts: [
      {
        platform: "tiktok",
        title: "Shop Page Trust Tour",
        body: "Green screen over a brand storefront. Scroll sold counts — 10k+ sold proves reliability.",
      },
      {
        platform: "amazon",
        title: "Review Showcase",
        body: "Green screen over a product page. Highlight customer photos and star reviews.",
      },
      {
        platform: "bonus",
        title: "Negative Review Debunk",
        body: "Find a 1-star where the user made a mistake. Point it out — builds authority fast.",
      },
    ],
  },
  {
    n: 4,
    theme: "Discovery",
    sub: "Blue ocean + search hacks",
    posts: [
      {
        platform: "tiktok",
        title: "Low-Competition Blue Ocean",
        body: `Find items with 100+ sold but few creator videos. Hook: "Nobody is talking about this yet."`,
      },
      {
        platform: "amazon",
        title: "Amazon Search Hack",
        body: `Record using filters like "Under $25" or "Overstock Deals." Show the find live.`,
      },
      {
        platform: "bonus",
        title: "Best-Seller Reaction",
        body: "React to items on Movers & Shakers or Trending pages. Show your honest take.",
      },
    ],
  },
  {
    n: 5,
    theme: "Compare",
    sub: "Comparison content converts",
    posts: [
      {
        platform: "tiktok",
        title: "Cross-Platform Price War",
        body: "Split-screen: Amazon price vs TikTok price. Highlight the cheaper one clearly.",
      },
      {
        platform: "amazon",
        title: "Rating Comparison",
        body: "Compare top positive review vs top negative review. Give your honest perspective.",
      },
      {
        platform: "bonus",
        title: "Cart Price Alert",
        body: `Record the red "Price Dropped" tag in your cart. Zoom into the exact dollar saved.`,
      },
    ],
  },
  {
    n: 6,
    theme: "Curation",
    sub: "List & lifestyle content",
    posts: [
      {
        platform: "tiktok",
        title: "Viral Shop Stitch",
        body: "Stitch the first 3 seconds of a viral review. Transition to the product page — still in stock.",
      },
      {
        platform: "amazon",
        title: "Virtual Cart Build",
        body: `"Spend $50 with me" or "Self-care night" — build a themed cart live on camera.`,
      },
      {
        platform: "bonus",
        title: "Gift Idea List",
        body: "Scroll a custom idea list. Explain your top picks and why you'd actually give them.",
      },
    ],
  },
  {
    n: 7,
    theme: "Close",
    sub: "Deals that drive the click",
    posts: [
      {
        platform: "tiktok",
        title: "Voucher Stacking Demo",
        body: `Record claiming a "New Customer" coupon. Show the checkout price drop in real time.`,
      },
      {
        platform: "amazon",
        title: "Shoppable Page Tour",
        body: "Scroll through a shoppable image page. Show how items look together in a real space.",
      },
      {
        platform: "bonus",
        title: "Affiliate-Only Creator Deal",
        body: `Record the "Special Price" tag that only appears when someone clicks your affiliate link.`,
      },
    ],
  },
];

// ─── Platform config ──────────────────────────────────────────────────────────

const PLATFORM_CONFIG = {
  tiktok: {
    label: "TikTok Shop",
    dot: "bg-pink-500",
    tag: "text-pink-400 border-pink-500/30 bg-pink-500/10",
  },
  amazon: {
    label: "Amazon",
    dot: "bg-amber-400",
    tag: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  bonus: {
    label: "Bonus",
    dot: "bg-emerald-400",
    tag: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

function JumpstartPage() {
  const firstModule = MODULES[0];

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background" />
        <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-12 md:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-5">
            <Rocket className="h-3 w-3" /> Free guide · Kraken Vault
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] max-w-3xl">
            Your 7-day jumpstart.{" "}
            <span className="text-gradient">3 posts a day. Real strategies. Zero guessing.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Every slot is a play straight from the Fast Track — TikTok Shop + Amazon Curation.
            Open the calendar, pick the strategy, record it, post it. Done in 30–60 minutes a day.
          </p>
        </div>
      </section>

      {/* Setup */}
      <section className="max-w-5xl mx-auto px-6 py-10 border-b border-border">
        <h2 className="text-lg font-bold tracking-tight mb-5">Before day 1 — the only setup you need</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: <Music2 className="h-5 w-5 text-pink-400" />, title: "Apply for TikTok Shop affiliate", body: "TikTok Shop Seller Center → apply as creator affiliate." },
            { icon: <Package className="h-5 w-5 text-amber-400" />, title: "Apply for Amazon Associates", body: "affiliate-program.amazon.com — usually approved same day." },
            { icon: <Zap className="h-5 w-5 text-primary" />, title: "Link in bio ready", body: "One page with your affiliate links. Even a Linktree works for now." },
            { icon: <ChevronRight className="h-5 w-5 text-emerald-400" />, title: "Find products you vibe with", body: "Things you own or would buy. Real experience = better content." },
          ].map((item) => (
            <div key={item.title} className="glass-card rounded-xl border border-border p-4 flex items-start gap-4">
              <div className="mt-0.5 shrink-0">{item.icon}</div>
              <div>
                <div className="font-semibold text-sm text-foreground">{item.title}</div>
                <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calendar */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-lg font-bold tracking-tight mb-1">7-day posting calendar</h2>
        <p className="text-sm text-muted-foreground mb-5">
          1 TikTok Shop strategy · 1 Amazon strategy · 1 bonus pick — every day
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6">
          {(Object.entries(PLATFORM_CONFIG) as [keyof typeof PLATFORM_CONFIG, (typeof PLATFORM_CONFIG)[keyof typeof PLATFORM_CONFIG]][]).map(([key, cfg]) => (
            <span key={key} className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
              {cfg.label}
            </span>
          ))}
          <span className="text-xs text-muted-foreground">· Bonus = either platform</span>
        </div>

        {/* Calendar grid */}
        <div className="overflow-x-auto -mx-6 px-6 pb-2">
          <div className="grid grid-cols-7 gap-3 min-w-[1000px]">
            {CALENDAR.map((day) => (
              <article
                key={day.n}
                className="glass-card rounded-2xl border border-border overflow-hidden flex flex-col"
              >
                <div className="px-3 pt-3 pb-2 border-b border-border/60">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold leading-none">{day.n}</span>
                    <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-medium">{day.theme}</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-1 leading-tight font-medium">{day.sub}</div>
                </div>

                {day.posts.map((post, i) => {
                  const cfg = PLATFORM_CONFIG[post.platform];
                  return (
                    <div key={i} className="px-3 py-2.5 border-t border-border/50">
                      <span className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] border rounded-full px-2 py-0.5 mb-1.5 ${cfg.tag}`}>
                        <span className={`h-1 w-1 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                      <div className="text-[11px] font-semibold text-foreground mb-1 leading-tight">{post.title}</div>
                      <div className="text-[10px] text-muted-foreground leading-[1.45]">{post.body}</div>
                    </div>
                  );
                })}
              </article>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { emoji: "⏱", title: "30–60 min total", body: "10 min finding · 20–30 min recording · 10–15 min posting + links" },
            { emoji: "🔁", title: "Week 2 = repeat", body: "Same structure. Different strategies. 12 TikTok + 15 Amazon plays to rotate." },
            { emoji: "📊", title: "Track what clicks", body: "Check views once a day. Whatever got traction — do more of that." },
            { emoji: "📌", title: "Link every post", body: "Every post pushes to your bio link. No exceptions." },
          ].map((tip) => (
            <div key={tip.title} className="glass-card rounded-xl border border-border p-4">
              <div className="text-xl mb-2">{tip.emoji}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{tip.title}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{tip.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="glass-card rounded-3xl border-glow p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Done with week 1?{" "}
            <span className="text-gradient">The full vault has the rest of the plays.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            All 12 TikTok Shop strategies and 15 Amazon Curation plays — plus automation, traffic systems,
            and a 30-day calendar that turns this into a real machine.
          </p>
          <Link
            to="/module/$moduleId"
            params={{ moduleId: firstModule.id }}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 transition-opacity"
          >
            Enter the full vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
