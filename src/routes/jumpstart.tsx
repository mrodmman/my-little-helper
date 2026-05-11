import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Rocket, CheckCircle2, ExternalLink, Lightbulb, Link2 } from "lucide-react";
import { MODULES } from "@/data/courseMeta";

export const Route = createFileRoute("/jumpstart")({
  component: JumpstartPage,
});

// ─── Calendar data ─────────────────────────────────────────────────────────────

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

// ─── Platform config ───────────────────────────────────────────────────────────

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

      {/* 1. HERO */}
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
            Everything you need to go from zero to your first affiliate commissions — platform setup,
            link-in-bio, and a 7-day posting plan. 30–60 minutes a day.
          </p>
        </div>
      </section>

      {/* 2. PICK YOUR PLATFORM */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
            Step 1
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            Pick your platform
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
            You can run both eventually. Start with one. TikTok Shop is faster to see commissions.
            Amazon is more stable long-term. Both are free to join.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {/* TikTok Shop */}
            <div className="rounded-lg border border-pink-500/30 bg-pink-500/5 p-6">
              <div className="inline-flex items-center gap-2 rounded border border-pink-500/30 bg-pink-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-pink-400 mb-3">
                TikTok Shop Affiliate
              </div>
              <ul className="space-y-2 text-sm text-foreground/85 mb-5">
                {[
                  "Commission: 5–20% per sale",
                  "No follower minimum required",
                  "Approval: usually 1–3 days",
                  "Best for: short video content",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-pink-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://seller.tiktok.com/university/essay?knowledge_id=10001537"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-400 hover:underline"
              >
                Apply for TikTok Shop Affiliate <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Amazon */}
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-6">
              <div className="inline-flex items-center gap-2 rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-3">
                Amazon Associates
              </div>
              <ul className="space-y-2 text-sm text-foreground/85 mb-5">
                {[
                  "Commission: 1–10% depending on category",
                  "Earn on everything in the cart",
                  "Approval: instant, confirm in 180 days",
                  "Best for: product recommendation content",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-amber-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://affiliate-program.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-400 hover:underline"
              >
                Apply for Amazon Associates <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACCOUNT SETUP CHECKLIST */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
            Step 2
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            Account setup checklist
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
            Do this before Day 1. Should take under 30 minutes.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-pink-400 mb-4">TikTok Shop</div>
              <ol className="space-y-3">
                {[
                  "Download TikTok — set up your creator account",
                  "Go to TikTok Shop → apply as an affiliate creator",
                  "Add a short bio and profile photo",
                  "Set your niche in your bio (deals, home, gadgets, etc.)",
                  "Link your bank account for payouts",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-black text-primary">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400 mb-4">Amazon Associates</div>
              <ol className="space-y-3">
                {[
                  "Go to affiliate-program.amazon.com and sign up",
                  "Enter your website or social media URL",
                  "Choose your preferred store ID (your brand name)",
                  "Complete tax info (required for payouts)",
                  "Get your unique affiliate tracking ID",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-foreground/85">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-black text-primary">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LINK-IN-BIO */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
            Step 3
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            Set up your link-in-bio
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
            You need one place to send people. Your bio can only hold one link — make it a page
            that holds all your affiliate links in one spot.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                name: "Linktree",
                note: "Free tier is enough to start",
                url: "https://linktr.ee",
                rec: false,
              },
              {
                name: "Stan Store",
                note: "Best for selling + links combined",
                url: "https://stan.store",
                rec: true,
              },
              {
                name: "Beacons",
                note: "Clean design, free plan available",
                url: "https://beacons.ai",
                rec: false,
              },
            ].map(({ name, note, url, rec }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-lg border p-5 block hover:border-primary/50 transition ${rec ? "border-primary/40 bg-primary/5" : "border-border bg-surface"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-foreground">{name}</span>
                  {rec && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Recommended</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{note}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-primary font-semibold">
                  <Link2 className="h-3 w-3" /> {url.replace("https://", "")}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-border bg-surface p-5">
            <p className="text-sm font-semibold text-foreground mb-2">What to put on your link-in-bio:</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {[
                "Your TikTok Shop affiliate storefront link",
                "Your Amazon storefront or a curated list",
                "A \"Deals I found today\" section you update regularly",
                "Optional: your email opt-in (grow your list while you grow your following)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. BEFORE YOU POST */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
            Step 4
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            Before you post: 3 things
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
            You don't need gear. You need these three basics dialed in.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Light",
                body: "Face a window. Natural light is free and beats most ring lights. If you're recording at night, a $20 ring light from Amazon works fine.",
              },
              {
                n: "02",
                title: "Caption format",
                body: "Hook (first line) → context (1–2 lines) → CTA (\"Link in bio\" or \"Check comments\"). Keep it tight. The algorithm reads captions.",
              },
              {
                n: "03",
                title: "Your affiliate link",
                body: "Add your link-in-bio URL to your TikTok bio before Day 1. For Amazon: generate your affiliate link from the SiteStripe bar on any product page.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="rounded-lg border border-border bg-surface p-6">
                <div className="font-display text-4xl font-black text-primary/20 leading-none mb-3">{n}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <h3 className="font-display font-black uppercase tracking-tight text-foreground">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 7-DAY CALENDAR */}
      <section className="px-6 py-16 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary mb-4">
            Step 5 — The Plan
          </div>
          <h2 className="font-display text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            7-day posting calendar
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl leading-relaxed">
            One theme per day. Pick one or all three post ideas — each is a proven play from the Fast Track.
          </p>

          <div className="mt-8 grid gap-4">
            {CALENDAR.map((day) => (
              <div
                key={day.n}
                className="grid gap-5 rounded-lg border border-border bg-surface p-6 md:grid-cols-[auto_1fr] md:gap-7 md:p-7"
              >
                <div className="flex items-center gap-3 md:min-w-[110px] md:flex-col md:items-start md:gap-1">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Day</div>
                  <div className="font-display text-5xl font-black leading-none text-primary md:text-6xl">{day.n}</div>
                </div>
                <div className="md:border-l md:border-border md:pl-7">
                  <h3 className="font-display text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
                    {day.theme}
                  </h3>
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
        </div>
      </section>

      {/* 7. VAULT CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-surface p-8 shadow-glow md:p-12">
          <h2 className="font-display text-3xl font-black uppercase leading-[1] tracking-tight text-foreground md:text-4xl">
            That&apos;s the foundation. <span className="text-primary">The Vault builds the full machine.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            All 12 TikTok Shop strategies and 15 Amazon Curation plays — plus automation, traffic systems,
            and a 30-day calendar that turns this into a real business.
          </p>
          <Link
            to="/module/$moduleId"
            params={{ moduleId: firstModule.id }}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground font-black uppercase tracking-wider px-6 py-3.5 shadow-glow hover:brightness-110 transition text-sm"
          >
            Enter the full vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
