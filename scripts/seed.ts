/**
 * Seed script — run once to populate D1 from the static course.json data.
 *
 * Usage (local):
 *   bunx wrangler d1 execute kraken-vault-db --local --file=migrations/0001_init.sql
 *   bun scripts/seed.ts --local
 *
 * Usage (production):
 *   bunx wrangler d1 execute kraken-vault-db --file=migrations/0001_init.sql
 *   bunx wrangler d1 execute kraken-vault-db --file=scripts/seed.sql
 *
 * This script generates seed.sql which can be executed directly by wrangler d1 execute.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dir = dirname(__filename);
const root = join(__dir, "..");

// ---- Load course data ----
const courseRaw: { title: string; sections: { title: string; content: string }[] }[] =
  JSON.parse(readFileSync(join(root, "src/data/course.json"), "utf-8"));

// ---- Icon + tagline mapping (mirrors courseMeta.ts) ----
const META = [
  { iconName: "Wrench",        tagline: "Get online, look professional, pay almost nothing." },
  { iconName: "GitBranch",     tagline: "Build the three-page funnel that turns clicks into leads." },
  { iconName: "Mail",          tagline: "Welcome, nurture and convert — on autopilot." },
  { iconName: "Workflow",      tagline: "Wire your stack together so it runs without you." },
  { iconName: "TrendingUp",    tagline: "Get real eyeballs — organic first, paid second." },
  { iconName: "Video",         tagline: "Never run out of ideas, hooks or posts again." },
  { iconName: "MessageSquare", tagline: "Turn DMs into leads without sounding salesy." },
  { iconName: "Tag",           tagline: "Pick offers that actually pay, stack them properly." },
  { iconName: "Megaphone",     tagline: "Run promotions that move your list to buy." },
  { iconName: "Map",           tagline: "Pick your path. Build the next 90 days." },
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

// ---- Build SQL ----
const lines: string[] = [
  "-- Auto-generated seed — do not edit by hand",
  "-- Re-run scripts/seed.ts to regenerate",
  "",
  "DELETE FROM module_assets;",
  "DELETE FROM lessons;",
  "DELETE FROM modules;",
  "DELETE FROM assets;",
  "",
];

// Modules + Lessons
for (const [i, raw] of courseRaw.entries()) {
  const match = raw.title.match(/^Module\s+([0-9a-z]+):\s*(.+)$/i);
  const num = match ? match[1] : String(i + 1);
  const sub = match ? match[2] : raw.title;
  const id = slugify(`module-${num}-${sub}`);
  const meta = META[i] ?? { iconName: "BookOpen", tagline: "" };

  lines.push(
    `INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, icon_name, visible)` +
      ` VALUES (${q(id)}, ${i}, ${q(`Module ${num}`)}, ${q(sub)}, ${q(meta.tagline)}, ${q(meta.iconName)}, 1);`,
  );

  const validSections = raw.sections.filter((s) => s.content.trim().length > 0);
  for (const [j, section] of validSections.entries()) {
    lines.push(
      `INSERT INTO lessons (module_id, idx, title, content)` +
        ` VALUES (${q(id)}, ${j}, ${q(section.title)}, ${q(section.content)});`,
    );
  }
  lines.push("");
}

// Assets (from src/data/assets.ts — hardcoded here for portability)
const assetsData = [
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
    body: "Hey {{name}} — saw your post about {{topic}}. Genuinely curious: what's the biggest bottleneck you're hitting with {{outcome}} right now? No pitch, just nerding out on this stuff.",
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
] as const;

for (const a of assetsData) {
  const cols: string[] = ["id", "type", "title"];
  const vals: string[] = [q(a.id), q(a.type), q(a.title)];

  if ("description" in a && a.description) { cols.push("description"); vals.push(q(a.description)); }
  if ("url" in a && a.url) { cols.push("url"); vals.push(q(a.url)); }
  if ("body" in a && a.body) { cols.push("body"); vals.push(q(a.body)); }
  if ("filename" in a && a.filename) { cols.push("filename"); vals.push(q(a.filename)); }
  if ("size" in a && a.size) { cols.push("size"); vals.push(q(a.size)); }
  if ("format" in a && a.format) { cols.push("format"); vals.push(q(a.format)); }
  if ("source" in a && a.source) { cols.push("source"); vals.push(q(a.source)); }
  if ("duration" in a && a.duration) { cols.push("duration"); vals.push(q(a.duration)); }
  cols.push("tags");
  vals.push(q(JSON.stringify((a as { tags?: readonly string[] }).tags ?? [])));

  lines.push(`INSERT OR REPLACE INTO assets (${cols.join(", ")}) VALUES (${vals.join(", ")});`);
}

lines.push("");

// Module-asset associations
const moduleAssets: { moduleId: string; assetId: string; lessonIdx: number | null }[] = [
  { moduleId: "module-2-the-funnel-system", assetId: "file-prompt-module-2-funnel-shell", lessonIdx: 5 },
  { moduleId: "module-2-the-funnel-system", assetId: "file-funnel-checklist", lessonIdx: 8 },
  { moduleId: "module-3-the-email-system", assetId: "file-prompt-module-3-email-injection", lessonIdx: 3 },
  { moduleId: "module-4-the-automation-system", assetId: "file-prompt-module-4-sheets-telegram", lessonIdx: 3 },
];

for (const { moduleId, assetId, lessonIdx } of moduleAssets) {
  const li = lessonIdx === null ? "NULL" : String(lessonIdx);
  lines.push(
    `INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES (${q(moduleId)}, ${q(assetId)}, ${li});`,
  );
}

lines.push("");

// Write output
const outPath = join(root, "scripts/seed.sql");
writeFileSync(outPath, lines.join("\n"), "utf-8");
console.log(`✅ Wrote ${lines.length} lines to ${outPath}`);
console.log("\nRun locally:");
console.log("  bunx wrangler d1 execute kraken-vault-db --local --file=migrations/0001_init.sql");
console.log("  bunx wrangler d1 execute kraken-vault-db --local --file=scripts/seed.sql");
console.log("\nRun in production:");
console.log("  bunx wrangler d1 execute kraken-vault-db --file=migrations/0001_init.sql");
console.log("  bunx wrangler d1 execute kraken-vault-db --file=scripts/seed.sql");
