import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Video, Bell, ChevronRight, Zap, Search } from "lucide-react";
import { MessageCircle, Send, Database, Mail, Tag } from "lucide-react";
import { ModuleCard } from "@/components/vault/ModuleCard";
import { AssetList } from "@/components/vault/AssetList";
import { OfferCard } from "@/components/vault/OfferCard";
import { FastTrackSection } from "@/components/vault/FastTrackSection";
import { MODULES } from "@/data/courseMeta";
import { ASSETS } from "@/data/assets";

const toDataUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

type DbModule = { id: string; image_key: string | null };
type DbAsset = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  url: string | null;
  body: string | null;
  filename: string | null;
  size: string | null;
  format: string | null;
  source: string | null;
  duration: string | null;
  tags: string | null;
};
type ModuleProgressSummary = { module_id: string; completed: number; total: number };

const logo = toDataUri(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#60a5fa' />
      <stop offset='100%' stop-color='#8b5cf6' />
    </linearGradient>
  </defs>
  <rect width='80' height='80' rx='40' fill='#0b1220' />
  <circle cx='40' cy='40' r='31' fill='none' stroke='url(#g)' stroke-width='4' />
  <path d='M24 54V26h8l8 10 8-10h8v28h-8V38l-8 9-8-9v16z' fill='url(#g)' />
</svg>
`);

const heroBg = toDataUri(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#0b1020' />
      <stop offset='50%' stop-color='#1f2a44' />
      <stop offset='100%' stop-color='#131a30' />
    </linearGradient>
    <radialGradient id='glow' cx='75%' cy='20%' r='60%'>
      <stop offset='0%' stop-color='#8b5cf6' stop-opacity='0.45' />
      <stop offset='100%' stop-color='#8b5cf6' stop-opacity='0' />
    </radialGradient>
  </defs>
  <rect width='1600' height='900' fill='url(#bg)'/>
  <rect width='1600' height='900' fill='url(#glow)'/>
  <g stroke='#60a5fa' stroke-opacity='0.12'>
    <path d='M0 130h1600M0 300h1600M0 470h1600M0 640h1600M0 810h1600'/>
    <path d='M160 0v900M420 0v900M680 0v900M940 0v900M1200 0v900M1460 0v900'/>
  </g>
</svg>
`);

const heroFlow = [
  { label: "Content", icon: Video },
  { label: "Engagement", icon: MessageCircle },
  { label: "DM", icon: Send },
  { label: "Lead Capture", icon: Database },
  { label: "Email", icon: Mail },
  { label: "Offer", icon: Tag },
];

const offers = [
  { category: "Lead Magnet", title: "The 7-Day Content Map", useCase: "Capture leads from cold content", stage: "Top of Funnel" },
  { category: "Tripwire", title: "DM Script Vault", useCase: "Convert engaged followers into buyers", stage: "Mid Funnel" },
  { category: "Core Offer", title: "The System Blueprint", useCase: "Deliver the full backend system", stage: "Bottom Funnel" },
  { category: "Upsell", title: "Done-With-You Build", useCase: "Hands-on automation install", stage: "Post Purchase" },
];

export const Route = createFileRoute("/")({
  component: VaultDashboard,
  loader: async () => {
    // Dynamically import server fns to avoid client-side direct /server imports
    const [{ getModules, getAllAssets }, { loadProgressSummary }] = await Promise.all([
      import("@/rpc/modules"),
      import("@/rpc/progress"),
    ]);

    const [dbModules, dbAssets, progressData] = await Promise.all([
      getModules().catch(() => null),
      getAllAssets().catch(() => null),
      loadProgressSummary().catch(() => null),
    ]);

    return { dbModules, dbAssets, progressData };
  },
  head: () => ({
    meta: [
      { title: "The Kraken Vault — Crack the Code to Generating Income Online" },
      { name: "description", content: "Your private member vault — 10 modules covering tools, funnels, email, automation, traffic, content, DMs, offers and promotion." },
    ],
  }),
});

function getModuleImageUrl(dbMod: DbModule | null | undefined): string | null {
  if (!dbMod?.image_key) return null;
  return `/api/cdn/${encodeURIComponent(dbMod.image_key)}`;
}

function VaultDashboard() {
  const { dbModules, dbAssets, progressData } = Route.useLoaderData();

  // Fall back to static data if D1 unavailable
  const modules = MODULES;
  const staticAssets = dbAssets
    ? dbAssets.map((a: DbAsset) => ({
        id: a.id,
        type: a.type,
        title: a.title,
        description: a.description ?? undefined,
        url: a.url ?? undefined,
        body: a.body ?? undefined,
        filename: a.filename ?? undefined,
        size: a.size ?? undefined,
        format: a.format ?? undefined,
        source: a.source ?? undefined,
        duration: a.duration ?? undefined,
        tags: a.tags ? JSON.parse(a.tags) : [],
      }))
    : ASSETS;

  const totalLessons = progressData?.totalLessons ?? modules.reduce((a, m) => a + m.sections.length, 0);
  const completedLessons = progressData?.completedLessons ?? 0;
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const dashOffset = 100 - progressPct;

  // Build a quick lookup: module_id → completed count
  const progressMap = new Map<string, ModuleProgressSummary>(
    (progressData?.moduleSummaries ?? []).map((s: ModuleProgressSummary) => [s.module_id, s]),
  );

  const completedModules = (progressData?.moduleSummaries ?? []).filter(
    (s: ModuleProgressSummary) => s.total > 0 && s.completed >= s.total,
  ).length;

  const firstModule = modules[0];

  // Merge D1 data with static metadata
  const dbModuleMap = new Map((dbModules ?? []).map((m: DbModule) => [m.id, m]));

  return (
    <div className="min-h-screen text-foreground">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Kraken Vault" className="h-9 w-9 rounded-full object-cover ring-1 ring-primary/40" />
            <div className="leading-tight">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Kraken</div>
              <div className="text-sm font-semibold">Vault</div>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search modules, templates, offers…"
              className="w-full bg-surface/60 border border-border rounded-xl pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-surface transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin" className="hidden sm:inline-flex items-center rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-2 text-xs font-semibold transition-colors">
              Admin
            </Link>
            <button aria-label="Notifications" className="h-9 w-9 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated transition-colors flex items-center justify-center relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
            </button>
            <Link to="/profile" aria-label="Profile" className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity">
              KV
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 md:py-14 space-y-20">
        {/* HERO */}
        <section className="relative rounded-3xl overflow-hidden border-glow glass-card">
          <img src={heroBg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />

          <div className="relative px-8 md:px-14 py-14 md:py-20 grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
                Member Vault · v1
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
                The <span className="text-gradient">Kraken Vault</span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Crack the code to generating income online. {modules.length} modules, {totalLessons}+ lessons — the exact system, written for people who are tired, busy, and sick of fluff.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/module/$moduleId"
                  params={{ moduleId: firstModule.id }}
                  className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 transition-opacity"
                >
                  <Play className="h-4 w-4 fill-current" />
                  Start · {firstModule.title}
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <a href="#modules" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated px-5 py-3 text-sm font-medium transition-all">
                  Browse All Modules
                </a>
              </div>
            </div>

            {/* Progress summary */}
            <div className="glass-card rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Course Progress</div>
                  <div className="text-3xl font-bold mt-1">{progressPct}%</div>
                </div>
                <div className="relative h-16 w-16">
                  <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="15.9"
                      fill="none" stroke="url(#g1)" strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="100"
                      strokeDashoffset={dashOffset}
                      style={{ transition: "stroke-dashoffset 0.6s ease" }}
                    />
                    <defs>
                      <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.72 0.19 245)" />
                        <stop offset="100%" stopColor="oklch(0.65 0.22 285)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Modules", value: `${completedModules}/${modules.length}` },
                  { label: "Lessons", value: `${completedLessons}/${totalLessons}` },
                  { label: "Assets", value: String(staticAssets.length) },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-surface/60 border border-border py-3">
                    <div className="text-base font-semibold">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-2">Start here</div>
                <Link
                  to="/module/$moduleId"
                  params={{ moduleId: firstModule.id }}
                  className="flex items-center gap-3 rounded-xl bg-surface/60 border border-border p-3 hover:border-primary/40 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-primary/20 border border-primary/40 flex items-center justify-center">
                    <Video className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{firstModule.subtitle}</div>
                    <div className="text-xs text-muted-foreground truncate">{firstModule.title} · {firstModule.sections.length} lessons</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </div>

              {progressPct > 0 && (
                <Link
                  to="/profile"
                  className="w-full text-center text-xs text-primary hover:underline block"
                >
                  Reset my progress →
                </Link>
              )}
            </div>
          </div>

          {/* Flow visual */}
          <div className="relative px-8 md:px-14 pb-10 md:pb-12">
            <div className="rounded-2xl border border-border bg-surface/40 backdrop-blur p-5 md:p-6">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4 text-center">
                The system, end to end
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {heroFlow.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-2 md:gap-3">
                    <div className="flex flex-col items-center gap-1.5 group">
                      <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-surface-elevated border border-border flex items-center justify-center transition-all group-hover:border-primary/50 group-hover:shadow-glow">
                        <step.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <span className="text-[10px] md:text-xs font-medium text-center max-w-[80px]">{step.label}</span>
                    </div>
                    {i < heroFlow.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-primary/50 shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAST TRACK */}
        <FastTrackSection />

        {/* MODULES */}
        <section id="modules" className="scroll-mt-20">
          <SectionHeader
            eyebrow="Course Vault"
            title="The 10 Modules"
            description="Each module is a complete playbook. Work through them in order or jump to what you need most."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => {
              const dbMod = dbModuleMap.get(m.id) as DbModule | undefined;
              const imageUrl = getModuleImageUrl(dbMod) ?? m.image;
              const prog = progressMap.get(m.id);
              return (
                <ModuleCard
                  key={m.id}
                  id={m.id}
                  image={imageUrl}
                  icon={m.icon}
                  title={m.title}
                  subtitle={m.subtitle}
                  tagline={m.tagline}
                  lessonCount={m.sections.length}
                  completedLessons={prog?.completed ?? 0}
                  totalLessons={prog?.total ?? m.sections.length}
                />
              );
            })}
          </div>
        </section>

        {/* ASSET VAULT */}
        <section>
          <SectionHeader
            eyebrow="Asset Vault"
            title="Templates, Prompts & Swipe Files"
            description="Plug-and-play resources you can ship today."
          />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <AssetList assets={staticAssets as any} title="All resources" />
        </section>

        {/* OFFER VAULT */}
        <section>
          <SectionHeader
            eyebrow="Offer Vault"
            title="Offer Frameworks & Funnel Plays"
            description="Pre-built offer structures mapped to each stage of your funnel."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offers.map((o) => <OfferCard key={o.title} {...o} />)}
          </div>
        </section>

        <footer className="pt-10 pb-6 border-t border-border text-center text-xs text-muted-foreground">
          © Kraken Vault · Private member access
        </footer>
      </main>
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">{eyebrow}</div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground max-w-md">{description}</p>
    </div>
  );
}
