import {
  Wrench, GitBranch, Mail, Workflow, TrendingUp, Video, MessageSquare,
  Tag, Megaphone, Map, type LucideIcon,
} from "lucide-react";
import imgStart from "@/assets/vault-start.jpg";
import imgContent from "@/assets/vault-content.jpg";
import imgDm from "@/assets/vault-dm.jpg";
import imgEmail from "@/assets/vault-email.jpg";
import imgAuto from "@/assets/vault-automation.jpg";
import imgOffer from "@/assets/vault-offer.jpg";
import imgHero from "@/assets/vault-hero-bg.jpg";
import courseRaw from "./course.json";

export type Section = { title: string; content: string };
export type Module = {
  id: string;
  index: number;
  title: string;          // "Module 1a" or "Module 2"
  subtitle: string;       // "Tools, Stack & Setup"
  icon: LucideIcon;
  image: string;
  tagline: string;
  sections: Section[];
};

const META: { icon: LucideIcon; image: string; tagline: string }[] = [
  { icon: Wrench,        image: imgStart,   tagline: "Get online, look professional, pay almost nothing." },
  { icon: GitBranch,     image: imgHero,    tagline: "Build the three-page funnel that turns clicks into leads." },
  { icon: Mail,          image: imgEmail,   tagline: "Welcome, nurture and convert — on autopilot." },
  { icon: Workflow,      image: imgAuto,    tagline: "Wire your stack together so it runs without you." },
  { icon: TrendingUp,    image: imgContent, tagline: "Get real eyeballs — organic first, paid second." },
  { icon: Video,         image: imgContent, tagline: "Never run out of ideas, hooks or posts again." },
  { icon: MessageSquare, image: imgDm,      tagline: "Turn DMs into leads without sounding salesy." },
  { icon: Tag,           image: imgOffer,   tagline: "Pick offers that actually pay, stack them properly." },
  { icon: Megaphone,     image: imgOffer,   tagline: "Run promotions that move your list to buy." },
  { icon: Map,           image: imgHero,    tagline: "Pick your path. Build the next 90 days." },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const MODULES: Module[] = (courseRaw as { title: string; sections: Section[] }[]).map(
  (m, i) => {
    // "Module 1a: Tools, Stack & Setup"
    const match = m.title.match(/^Module\s+([0-9a-z]+):\s*(.+)$/i);
    const num = match ? match[1] : String(i + 1);
    const sub = match ? match[2] : m.title;
    return {
      id: slugify(`module-${num}-${sub}`),
      index: i,
      title: `Module ${num}`,
      subtitle: sub,
      icon: META[i].icon,
      image: META[i].image,
      tagline: META[i].tagline,
      sections: m.sections,
    };
  },
);

export const getModule = (id: string) => MODULES.find((m) => m.id === id);
