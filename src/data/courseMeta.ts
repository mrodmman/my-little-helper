import {
  Wrench, GitBranch, Mail, Workflow, TrendingUp, Video, MessageSquare,
  Tag, Megaphone, Map, type LucideIcon,
} from "lucide-react";
import courseRaw from "./course.json";

const toDataUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

const makeModuleImage = (from: string, to: string, accent: string) =>
  toDataUri(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${from}' />
      <stop offset='100%' stop-color='${to}' />
    </linearGradient>
    <radialGradient id='ring' cx='75%' cy='15%' r='70%'>
      <stop offset='0%' stop-color='${accent}' stop-opacity='0.35' />
      <stop offset='100%' stop-color='${accent}' stop-opacity='0' />
    </radialGradient>
  </defs>
  <rect width='1200' height='675' fill='url(#bg)' />
  <rect width='1200' height='675' fill='url(#ring)' />
  <g stroke='${accent}' stroke-opacity='0.18' fill='none'>
    <rect x='110' y='95' width='980' height='485' rx='24' stroke-width='2' />
    <path d='M110 250h980M110 405h980M365 95v485M620 95v485M875 95v485' />
  </g>
</svg>
`);

const imgStart = makeModuleImage("#111827", "#1f2937", "#60a5fa");
const imgContent = makeModuleImage("#0f172a", "#1e3a8a", "#38bdf8");
const imgDm = makeModuleImage("#1e1b4b", "#312e81", "#a78bfa");
const imgEmail = makeModuleImage("#1f2937", "#0f766e", "#2dd4bf");
const imgAuto = makeModuleImage("#111827", "#334155", "#93c5fd");
const imgOffer = makeModuleImage("#172554", "#312e81", "#c4b5fd");
const imgHero = makeModuleImage("#0b1020", "#1f2a44", "#8b5cf6");

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
