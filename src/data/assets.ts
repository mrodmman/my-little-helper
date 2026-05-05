// Shared asset registry. No database — single source of truth in code.
// Modules, lessons, Fast Track and the Asset Vault all reference assets by `id`.

export type AssetType = "video" | "prompt" | "file" | "link";

export type BaseAsset = {
  id: string;
  type: AssetType;
  title: string;
  description?: string;
  tags?: string[];
};

export type VideoAsset = BaseAsset & {
  type: "video";
  // YouTube, Vimeo, Loom or direct mp4. Iframe-embeddable URL preferred.
  url: string;
  duration?: string; // "4:21"
};

export type PromptAsset = BaseAsset & {
  type: "prompt";
  body: string; // copyable text
};

export type FileAsset = BaseAsset & {
  type: "file";
  url: string;            // download URL (public path or external)
  filename?: string;
  size?: string;          // "1.2 MB"
  format?: string;        // "PDF", "Notion", "CSV"
};

export type LinkAsset = BaseAsset & {
  type: "link";
  url: string;
  source?: string; // "Notion", "Figma", "GitHub"
};

export type Asset = VideoAsset | PromptAsset | FileAsset | LinkAsset;

// ---------- Registry ----------
// Add new assets here. Reference them by `id` from modules, lessons, Fast Track,
// and the Asset Vault — edit once, updates everywhere.
export const ASSETS: Asset[] = [
  {
    id: "video-welcome",
    type: "video",
    title: "Welcome — how to use The Vault",
    description: "Quick tour of guided mode, Fast Track and asset downloads.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3:12",
    tags: ["onboarding"],
  },
  {
    id: "prompt-cold-dm",
    type: "prompt",
    title: "Cold DM opener (no-pitch)",
    description: "Drop in their handle + niche. Designed to start a real convo.",
    body:
      "Hey {{name}} — saw your post about {{topic}}. Genuinely curious: what's the biggest bottleneck you're hitting with {{outcome}} right now? No pitch, just nerding out on this stuff.",
    tags: ["dms", "outreach"],
  },
  {
    id: "file-funnel-checklist",
    type: "file",
    title: "3-page funnel checklist",
    description: "Every element your landing → offer → thank-you pages need.",
    url: "/assets/downloads/funnel-checklist.pdf",
    filename: "funnel-checklist.pdf",
    format: "PDF",
    size: "180 KB",
    tags: ["funnel", "templates"],
  },
  {
    id: "link-tool-stack",
    type: "link",
    title: "Free tool stack (Notion)",
    description: "Live list of every free tool referenced in the course.",
    url: "https://www.notion.so/",
    source: "Notion",
    tags: ["tools"],
  },
  {
    id: "file-prompt-module-2-funnel-shell",
    type: "file",
    title: "Module 2 — Funnel shell build prompt",
    description: "Drop into Claude/ChatGPT to generate the full Cloudflare-ready React + Vite funnel app.",
    url: "/prompts/module-2-funnel-shell.md",
    filename: "module-2-funnel-shell.md",
    format: "Prompt",
    tags: ["prompt", "module-2", "funnel"],
  },
  {
    id: "file-prompt-module-3-email-injection",
    type: "file",
    title: "Module 3 — Email form injection prompt",
    description: "Tells the AI exactly which file to edit to swap the placeholder form for your MailerLite / EmailOctopus embed.",
    url: "/prompts/module-3-email-form-injection.md",
    filename: "module-3-email-form-injection.md",
    format: "Prompt",
    tags: ["prompt", "module-3", "email"],
  },
  {
    id: "file-prompt-module-4-sheets-telegram",
    type: "file",
    title: "Module 4 — Google Sheets + Telegram automation prompt",
    description: "Generates the Apps Script webhook + Telegram ping and wires it into your funnel.",
    url: "/prompts/module-4-sheets-telegram.md",
    filename: "module-4-sheets-telegram.md",
    format: "Prompt",
    tags: ["prompt", "module-4", "automation"],
  },
];

// ---------- Lookup ----------
export const getAsset = (id: string): Asset | undefined =>
  ASSETS.find((a) => a.id === id);

export const getAssets = (ids: readonly string[] | undefined): Asset[] => {
  if (!ids) return [];
  return ids.map(getAsset).filter((a): a is Asset => Boolean(a));
};

// ---------- Module / Lesson attachments ----------
// Attach assets to a module (always shown) and/or to a specific lesson index.
// Lesson index matches the filtered `lessons` array used in the module page.
export type ModuleAssets = {
  module?: string[];                       // shown on every lesson in the module
  lessons?: Record<number, string[]>;      // shown only on that lesson index
};

export const MODULE_ASSETS: Record<string, ModuleAssets> = {
  "module-2-the-funnel-system": {
    lessons: {
      5: ["file-prompt-module-2-funnel-shell"],
      8: ["file-funnel-checklist"],
    },
  },
  "module-3-the-email-system": {
    lessons: {
      3: ["file-prompt-module-3-email-injection"],
    },
  },
  "module-4-the-automation-system": {
    lessons: {
      3: ["file-prompt-module-4-sheets-telegram"],
    },
  },
};

export const getLessonAssets = (moduleId: string, lessonIdx: number): Asset[] => {
  const m = MODULE_ASSETS[moduleId];
  if (!m) return [];
  return getAssets([...(m.module ?? []), ...(m.lessons?.[lessonIdx] ?? [])]);
};
