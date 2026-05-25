import {
  Wrench, GitBranch, Mail, Workflow, TrendingUp, Video, MessageSquare,
  Tag, Megaphone, Map, type LucideIcon,
} from "lucide-react";
import courseRaw from "./course.json";

export type Section = { title: string; content: string };
export type Module = {
  id: string;
  index: number;
  title: string;          // "Module 1" or "Module 2"
  subtitle: string;       // "Foundation & Your Path"
  icon: LucideIcon;
  image: string;
  tagline: string;
  sections: Section[];
};

const IMG = (n: number) => `/images/modules/module-${n}.svg`;

const META: { icon: LucideIcon; image: string; tagline: string }[] = [
  { icon: Wrench,        image: IMG(1),  tagline: "Get online, look professional, pay almost nothing." },
  { icon: GitBranch,     image: IMG(2),  tagline: "Build the three-page funnel that turns clicks into leads." },
  { icon: Mail,          image: IMG(3),  tagline: "Welcome, nurture and convert \u2014 on autopilot." },
  { icon: Workflow,      image: IMG(4),  tagline: "Wire your stack together so it runs without you." },
  { icon: TrendingUp,    image: IMG(5),  tagline: "Get real eyeballs \u2014 organic first, paid second." },
  { icon: Video,         image: IMG(6),  tagline: "Never run out of ideas, hooks or posts again." },
  { icon: MessageSquare, image: IMG(7),  tagline: "Turn DMs into leads without sounding salesy." },
  { icon: Tag,           image: IMG(8),  tagline: "Pick offers that actually pay, stack them properly." },
  { icon: Megaphone,     image: IMG(9),  tagline: "Run promotions that move your list to buy." },
  { icon: Map,           image: IMG(10), tagline: "Pick your path. Build the next 90 days." },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const MODULES: Module[] = (courseRaw as { title: string; sections: Section[] }[]).map(
  (m, i) => {
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