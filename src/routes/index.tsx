import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Play, Video, FileText, Sparkles, ListChecks, GitBranch, Files,
  Search, Bell, ChevronRight, Zap,
} from "lucide-react";
import logo from "@/assets/kraken-logo.png";
import heroBg from "@/assets/vault-hero-bg.jpg";
import { ModuleCard } from "@/components/vault/ModuleCard";
import { AssetCard } from "@/components/vault/AssetCard";
import { OfferCard } from "@/components/vault/OfferCard";
import { FastTrackSection } from "@/components/vault/FastTrackSection";
import { Video, MessageCircle, Send, Database, Mail, Tag } from "lucide-react";

const heroFlow = [
  { label: "Content", icon: Video },
  { label: "Engagement", icon: MessageCircle },
  { label: "DM", icon: Send },
  { label: "Lead Capture", icon: Database },
  { label: "Email", icon: Mail },
  { label: "Offer", icon: Tag },
];
import { MODULES } from "@/data/courseMeta";

export const Route = createFileRoute("/")({
  component: VaultDashboard,
  head: () => ({
    meta: [
      { title: "The Kraken Vault — Crack the Code to Generating Income Online" },
      { name: "description", content: "Your private member vault — 10 modules covering tools, funnels, email, automation, traffic, content, DMs, offers and promotion." },
    ],
  }),
});

const assets = [
  { icon: FileText, title: "Hook & Hero Templates", type: "Templates", count: 24 },
  { icon: Sparkles, title: "Content Prompt Library", type: "Prompts", count: 120 },
  { icon: ListChecks, title: "Launch Day Checklist", type: "Checklist", count: 8 },
  { icon: GitBranch, title: "DM → Lead Workflow", type: "Workflow", count: 6 },
  { icon: Files, title: "High-Converting Swipe File", type: "Swipe File", count: 42 },
  { icon: FileText, title: "Email Sequence Pack", type: "Templates", count: 14 },
];

const offers = [
  { category: "Lead Magnet", title: "The 7-Day Content Map", useCase: "Capture leads from cold content", stage: "Top of Funnel" },
  { category: "Tripwire", title: "DM Script Vault", useCase: "Convert engaged followers into buyers", stage: "Mid Funnel" },
  { category: "Core Offer", title: "The System Blueprint", useCase: "Deliver the full backend system", stage: "Bottom Funnel" },
  { category: "Upsell", title: "Done-With-You Build", useCase: "Hands-on automation install", stage: "Post Purchase" },
];

function VaultDashboard() {
  const totalLessons = MODULES.reduce((acc, m) => acc + m.sections.length, 0);
  const firstModule = MODULES[0];

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
            <button aria-label="Notifications" className="h-9 w-9 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated transition-colors flex items-center justify-center relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
            </button>
            <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              KV
            </div>
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
                Crack the code to generating income online. {MODULES.length} modules, {totalLessons}+ lessons — the exact system, written for people who are tired, busy, and sick of fluff.
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
                  <div className="text-3xl font-bold mt-1">0%</div>
                </div>
                <div className="relative h-16 w-16">
                  <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100" />
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
                  { label: "Modules", value: `0/${MODULES.length}` },
                  { label: "Lessons", value: `0/${totalLessons}` },
                  { label: "Assets", value: String(assets.length) },
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
            {MODULES.map((m) => (
              <ModuleCard
                key={m.id}
                id={m.id}
                image={m.image}
                icon={m.icon}
                title={m.title}
                subtitle={m.subtitle}
                tagline={m.tagline}
                lessonCount={m.sections.length}
              />
            ))}
          </div>
        </section>

        {/* ASSET VAULT */}
        <section>
          <SectionHeader
            eyebrow="Asset Vault"
            title="Templates, Prompts & Swipe Files"
            description="Plug-and-play resources you can ship today."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {assets.map((a) => <AssetCard key={a.title} {...a} />)}
          </div>
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
