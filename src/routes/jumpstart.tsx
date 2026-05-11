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
          <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-foreground md:text-6xl">
            Your <span className="text-primary">7-Day Affiliate</span> Jumpstart
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Every slot is a play straight from the Fast Track — TikTok Shop + Amazon Curation.
            Open the calendar, pick the strategy, record it, post it. Done in 30–60 minutes a day.
          </p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-4xl gap-4">
          {CALENDAR.map((day) => (
            <div
              key={day.n}
              className="grid gap-5 rounded-lg border border-border bg-surface p-6 md:grid-cols-[auto_1fr] md:gap-7 md:p-7"
            >
              <div className="flex items-center gap-3 md:min-w-[110px] md:flex-col md:items-start md:gap-1">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Day
                </div>
                <div className="font-display text-5xl font-black leading-none text-primary md:text-6xl">
                  {day.n}
                </div>
              </div>
              <div className="md:border-l md:border-border md:pl-7">
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
                  {day.theme}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{day.sub}</p>
                <ul className="mt-4 space-y-3">
                  {day.posts.map((post) => {
                    const cfg = PLATFORM_CONFIG[post.platform];
                    return (
                      <li key={post.title} className="flex items-start gap-2.5">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
                        <div>
                          <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mr-2 ${cfg.tag}`}>
                            {cfg.label}
                          </span>
                          <span className="text-[15px] font-semibold text-foreground">{post.title}</span>
                          <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{post.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-surface p-8 shadow-glow md:p-12">
          <h2 className="font-display text-3xl font-black uppercase leading-[1] tracking-tight text-foreground md:text-4xl">
            That&apos;s the foundation. <span className="text-primary">The Vault builds the full machine.</span>
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
