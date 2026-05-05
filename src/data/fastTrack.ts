import {
  Rocket, Puzzle, Music2, Package, Timer, Repeat, Zap, type LucideIcon,
} from "lucide-react";

export type FastTrackItem = {
  title: string;
  body?: string;        // short paragraph under the title
  bullets?: string[];   // checklist bullets
};

export type FastTrackTile = {
  id: string;
  step: number;
  emoji: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  intro?: string;
  bullets?: string[];          // simple flat tile (intro + checklist)
  items?: FastTrackItem[];     // tiles with multiple sub-strategies
  closer?: string;             // final 👉 line
};

export const FAST_TRACK: FastTrackTile[] = [
  {
    id: "just-start",
    step: 1,
    emoji: "🚀",
    title: "Just Start",
    tagline: "Momentum beats mastery.",
    icon: Rocket,
    intro: `Do you actually like your job?
Taking breaks when you’re told…
Going to lunch when you’re allowed…
Dealing with people you can’t stand…

Truth is — you already do things you hate every day.

This won’t always be easy.
Sometimes it’ll click… sometimes it won’t.
Some days it’ll feel like work… because it is.

But remind yourself:
The work you’re putting in here is different.

You’re not just working…
You’re building a system.
A machine.
Something that works for you — not the other way around.

For you.
For your future.
For your kids.

If you can handle the daily grind you didn’t choose…
You can handle building something you did.`,
    closer: "Take simple steps and build momentum.",
  },
  {
    id: "the-method",
    step: 2,
    emoji: "🧩",
    title: "The Method",
    tagline: "Patience + repetition wins.",
    icon: Puzzle,
    bullets: [
      "Apply for TikTok Shop or Amazon Affiliate",
      "Find products you vibe with",
      "Make 3 posts per day using the strategies below",
      "Post on TikTok, Facebook, and Instagram",
      "Have your link in your post or comments",
      "Stay consistent — sales will come",
    ],
    closer: "Patience + repetition wins.",
  },
  {
    id: "tiktok-shop",
    step: 3,
    emoji: "📱",
    title: "TikTok Shop Strategies",
    tagline: "High-energy conversion + game-fied shopping. Pick a few a day — no thinking required.",
    icon: Music2,
    items: [
      {
        title: "Slash & Free Referral Hack",
        body: "Screen record the progress bar dropping toward $0 in the \"Slash & Free\" tab. Show users how to get free items via referrals.",
      },
      {
        title: "Low-Competition 'Blue Ocean' Find",
        body: "Search for items with 100+ sold but few creator videos. Use the hook: \"Nobody is talking about this yet.\"",
      },
      {
        title: "Flash Sale Countdown",
        body: "Use a 10-second recording of a live Flash Sale timer as your green screen background to drive urgency.",
      },
      {
        title: "The Cart Price Alert",
        body: "Record the red \"Price Dropped\" tag in your cart. Zoom in on the exact dollar amount saved.",
      },
      {
        title: "Voucher Stacking Demo",
        body: "Record yourself claiming a \"New Customer\" coupon and show the final checkout price drop.",
      },
      {
        title: "Live-Only Price Reaction",
        body: "Green screen over a Shopping Live \"Exclusive Price\" badge to show why the deal is a steal.",
      },
      {
        title: "Viral Shop Stitch",
        body: "Stitch the first 3 seconds of a viral review video, then transition to the product page showing it's in stock.",
      },
      {
        title: "Cross-Platform Price War",
        body: "Use split-screen to compare Amazon price vs TikTok price. Highlight the cheaper option.",
      },
      {
        title: "Shop Page Trust Tour",
        body: "Green screen over a brand storefront. Scroll through \"Sold\" counts (ex: 10k+ sold) to prove reliability.",
      },
      {
        title: "Negative Review Debunk",
        body: "Find a 1-star review where the user made a mistake. Point out the error to build authority.",
      },
      {
        title: "Inventory FOMO Alert",
        body: "Screen record \"Low Stock\" or \"Only X Left\" badges to create urgency.",
      },
      {
        title: "Affiliate-Only Creator Deal",
        body: "Record the \"Special Price\" tag that only appears when someone clicks your affiliate link.",
      },
    ],
  },
  {
    id: "amazon-curation",
    step: 4,
    emoji: "📦",
    title: "Amazon Curation Strategies",
    tagline: "Authority + trust + lifestyle integration. Pick a few a day — no thinking required.",
    icon: Package,
    items: [
      {
        title: "Prime Video Screenshot",
        body: "Use a still from a trending show. Add \"Watch Now\" text. Link the product (outfit, gear, etc.).",
      },
      {
        title: "Brand Page Green Screen",
        body: "Film yourself in front of a themed brand store (example: a collection page like Fallout).",
      },
      {
        title: "Review Showcase",
        body: "Green screen over a product page. Highlight customer photos and reviews.",
      },
      {
        title: "Feature Demo (Savings)",
        body: "Record yourself using features like coupon clipping, discounts, and scratch-offs.",
      },
      {
        title: "Audible Quote Overlay",
        body: "Screenshot an audiobook cover. Overlay a powerful quote for engagement.",
      },
      {
        title: "Home Item Find",
        body: "Show an item you already own in real life, then pull up the Amazon listing.",
      },
      {
        title: "Creator React",
        body: "React to an Amazon Live creator showcasing a product.",
      },
      {
        title: "Shoppable Page Tour",
        body: "Scroll through a shoppable image page showing how items look together.",
      },
      {
        title: "Image Pop-Up Talk",
        body: "Have product images pop up on screen while you explain benefits.",
      },
      {
        title: "Wishlist Walkthrough",
        body: "Scroll your wishlist. Explain why you want each item.",
      },
      {
        title: "Amazon Search Hack",
        body: "Record using filters like \"Under $25\" or \"Overstock Deals\".",
      },
      {
        title: "Best-Seller Reaction",
        body: "React to items on Movers & Shakers or Trending pages.",
      },
      {
        title: "Virtual Cart Build",
        body: "Create a themed cart: \"Spend $50 with me\" or \"Self-care night\".",
      },
      {
        title: "Gift Idea List",
        body: "Scroll through a custom idea list. Explain top picks.",
      },
      {
        title: "Rating Comparison",
        body: "Compare top positive review vs top negative review. Give honest perspective.",
      },
    ],
  },
  {
    id: "30-60-plan",
    step: 5,
    emoji: "⏱",
    title: "30–60 Minute Plan",
    tagline: "Replace Netflix time with this.",
    icon: Timer,
    bullets: [
      "10 min → find products",
      "20–30 min → record content",
      "10–15 min → post + add links",
    ],
    closer: "Replace Netflix time with this. Momentum builds fast.",
  },
  {
    id: "consistency",
    step: 6,
    emoji: "🔁",
    title: "Consistency",
    tagline: "Sales come from repetition + time.",
    icon: Repeat,
    bullets: [
      "First posts might flop — normal",
      "You're building data",
      "You're building momentum",
    ],
    closer: "Sales come from repetition + time.",
  },
  {
    id: "30-day-calendar",
    step: 7,
    emoji: "🗓️",
    title: "30 Day Calendar",
    tagline: "Randomize TikTok + Amazon ideas into a simple daily posting plan.",
    icon: Timer,
    bullets: [
      "Pick 1 TikTok Shop strategy prompt per day",
      "Pick 1 Amazon Curation strategy prompt per day",
      "Alternate the opening hook style so content feels fresh",
      "Batch-record every 3 days, then schedule daily posts",
      "Track what got clicks/saves and reuse winners in week 3 and 4",
      "Miss a day? Resume the next day — no restart needed",
    ],
    closer: "Use this calendar to remove decision fatigue and just execute.",
  },
  {
    id: "speed-it-up",
    step: 8,
    emoji: "⚡",
    title: "Speed It Up",
    tagline: "Use Content Kraken to remove friction.",
    icon: Zap,
    intro: "Use Content Kraken to:",
    bullets: [
      "Post to all platforms at once",
      "Keep links updated automatically",
      "Create a landing page for products",
    ],
    closer: "Less friction · More consistency · Faster growth.",
  },
];
