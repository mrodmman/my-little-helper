import {
  Rocket, Target, Hammer, Send, Magnet, Megaphone, type LucideIcon,
} from "lucide-react";

export type FastTrackTile = {
  id: string;
  step: number;
  title: string;
  tagline: string;
  time: string;
  icon: LucideIcon;
  bullets: string[];
};

export const FAST_TRACK: FastTrackTile[] = [
  {
    id: "pick-one-offer",
    step: 1,
    title: "Pick One Offer",
    tagline: "Don't overthink it. One thing to sell.",
    time: "10 min",
    icon: Target,
    bullets: [
      "Choose 1 product, service, or affiliate offer",
      "Write the outcome in one sentence",
      "Set a price. Move on.",
    ],
  },
  {
    id: "minimum-stack",
    step: 2,
    title: "Minimum Stack",
    tagline: "The 3 tools you actually need today.",
    time: "20 min",
    icon: Hammer,
    bullets: [
      "Landing page builder",
      "Email tool with 1 list",
      "Payment link",
    ],
  },
  {
    id: "one-page-funnel",
    step: 3,
    title: "One-Page Funnel",
    tagline: "Headline, promise, CTA. Ship it ugly.",
    time: "30 min",
    icon: Rocket,
    bullets: [
      "Hook + outcome above the fold",
      "3 bullets of proof",
      "One CTA button. Repeat 3x.",
    ],
  },
  {
    id: "lead-magnet",
    step: 4,
    title: "Instant Lead Magnet",
    tagline: "A 1-page PDF beats a 30-page ebook.",
    time: "20 min",
    icon: Magnet,
    bullets: [
      "Solve one tiny problem",
      "Deliver via email opt-in",
      "Pitch your offer at the bottom",
    ],
  },
  {
    id: "first-100",
    step: 5,
    title: "First 100 Eyeballs",
    tagline: "Free traffic, today.",
    time: "1 hr",
    icon: Megaphone,
    bullets: [
      "Post 3 short-form videos",
      "DM 10 warm leads",
      "Drop link in 3 relevant communities",
    ],
  },
  {
    id: "send-it",
    step: 6,
    title: "Send It",
    tagline: "Email your list. Ask for the sale.",
    time: "15 min",
    icon: Send,
    bullets: [
      "Subject: a specific result",
      "3 short paragraphs",
      "One link. One ask.",
    ],
  },
];
