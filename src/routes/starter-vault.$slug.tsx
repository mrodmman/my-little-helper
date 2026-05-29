/**
 * /starter-vault/:slug — Individual Starter Drop page.
 */
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";
import {
  ChevronRight,
  Clock,
  Wrench,
  Package,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Lock,
} from "lucide-react";
import { getStarterDropBySlug, getPublishedStarterDrops } from "@/rpc/intel";
import type { DbStarterDrop } from "@/rpc/intel";
import { CopyButton } from "@/components/ui/CopyButton";
import { StarterDropCard } from "@/components/starter-vault/StarterDropCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/starter-vault/$slug")({
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.drop?.title ?? "Starter Kit — Starter Vault" },
      {
        name: "description",
        content: loaderData?.drop?.excerpt ?? "",
      },
    ],
  }),
  loader: async ({ params }) => {
    const [drop, allDrops] = await Promise.all([
      getStarterDropBySlug({ data: params.slug }),
      getPublishedStarterDrops().catch(() => []),
    ]);
    if (!drop) throw notFound();
    const related = allDrops
      .filter((d) => d.slug !== drop.slug)
      .slice(0, 3);
    return { drop, related };
  },
  component: StarterDropPage,
  notFoundComponent: () => (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#F4F6FA" }}
    >
      <div className="text-center">
        <div className="text-6xl font-black text-[#C8C3BA] mb-4">404</div>
        <h1 className="text-2xl font-bold text-[#0D1220] mb-2">Kit not found</h1>
        <p className="text-[#556070] mb-6">
          This build kit may have moved or been removed.
        </p>
        <Link
          to="/starter-vault"
          className="inline-flex items-center gap-2 bg-[#2563FF] text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
        >
          Back to Starter Vault
        </Link>
      </div>
    </div>
  ),
});

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw || "[]") as T;
  } catch {
    return fallback;
  }
}

function StarterDropPage() {
  const { drop, related } = Route.useLoaderData();
  const [expandedSection, setExpandedSection] = useState<string | null>("setup");
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("vaultUnlocked") === "true") setUnlocked(true);
  }, []);

  const handleUnlock = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/subscribe-vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), drop_slug: drop.slug, drop_title: drop.title }),
      });
      if (!res.ok) throw new Error("failed");
      localStorage.setItem("vaultUnlocked", "true");
      setUnlocked(true);
    } catch {
      setSubmitError("Something went wrong — try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const tools = parseJson<string[]>(drop.tools_used, []);
  const whatThisBuilds = parseJson<string[]>(drop.what_this_builds, []);
  const whatYouGet = parseJson<string[]>(drop.what_you_get, []);
  const setupSteps = parseJson<Array<string | { step?: unknown; title?: unknown; description?: unknown }>>(drop.setup_steps, []);
  const editMap = parseJson<Array<{ file?: unknown; description?: unknown; notes?: unknown; what_to_change?: unknown }>>(drop.edit_map, []);
  const troubleshooting = parseJson<Array<{ problem?: unknown; solution?: unknown; fix?: unknown }>>(drop.troubleshooting, []);

  const toggleSection = (id: string) => setExpandedSection((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen" style={{ background: "#F4F6FA" }}>
      {/* ── Header ── */}
      <div
        style={{
          background: "#0D1220",
          borderBottom: "1px solid rgba(200,195,186,0.1)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-[#8899BB] mb-6 flex-wrap">
            <Link to="/intel" className="hover:text-white transition-colors">
              Articles
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              to="/starter-vault"
              className="hover:text-white transition-colors"
            >
              Starter Vault
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-[#CBD5E0] line-clamp-1">{drop.title}</span>
          </nav>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center bg-[#2563FF]/12 text-[#60A5FA] text-xs font-bold px-3 py-1 rounded-full border border-[#2563FF]/30 uppercase tracking-wide">
              {drop.category}
            </span>
            <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
              {drop.difficulty}
            </span>
            {drop.estimated_build_time && (
              <span className="flex items-center gap-1 text-xs text-[#8899BB]">
                <Clock className="h-3 w-3" />
                {drop.estimated_build_time}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-hero-display leading-[0.92] uppercase max-w-4xl mb-3">
            <span className="text-[#14B8FF]">{drop.title.split(" ").slice(0, Math.ceil(drop.title.split(" ").length / 2)).join(" ")}</span>{" "}
            <span className="text-[#FFD400]">{drop.title.split(" ").slice(Math.ceil(drop.title.split(" ").length / 2)).join(" ")}</span>
          </h1>

          <p className="font-hero-sans text-[#8899BB] text-lg leading-relaxed max-w-2xl mb-5">
            {drop.excerpt}
          </p>

          {/* Tools */}
          {tools.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Wrench className="h-3.5 w-3.5 text-[#888]" />
              {tools.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-white border border-[#C8C3BA]/50 text-[#556070] px-2.5 py-0.5 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* What This Builds + What You Get — side by side on desktop */}
        <div className="grid sm:grid-cols-2 gap-5">
          {/* What This Builds */}
          {whatThisBuilds.length > 0 && (
            <div className="rounded-xl bg-white border border-[#C8C3BA]/50 p-5">
              <h2 className="font-bold text-[#0D1220] text-base mb-3 flex items-center gap-2">
                <span className="text-xl">🏗️</span> What This Builds
              </h2>
              <ul className="space-y-2">
                {whatThisBuilds.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#2D3748]">
                    <ChevronRight className="h-3.5 w-3.5 text-[#2563FF] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* What You Get */}
          {whatYouGet.length > 0 && (
            <div className="rounded-xl bg-white border border-[#C8C3BA]/50 p-5">
              <h2 className="font-bold text-[#0D1220] text-base mb-3 flex items-center gap-2">
                <span className="text-xl">📦</span> What You Get
              </h2>
              <ul className="space-y-2">
                {whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#2D3748]">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mt-0.5">
                      <span className="text-[8px] font-bold text-emerald-600">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Related article link */}
        {drop.related_article_slug && (
          <div className="rounded-xl bg-[#F4F6FA] border border-[#C8C3BA]/50 p-4 flex items-center gap-4">
            <BookOpen className="h-5 w-5 text-[#2563FF] shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold uppercase tracking-wide text-[#888] mb-0.5">
                Want the full strategy?
              </div>
              <p className="text-sm text-[#556070]">
                Read the companion article to understand the architecture and context behind this kit.
              </p>
            </div>
            <Link
              to="/intel/$slug"
              params={{ slug: drop.related_article_slug }}
              className="shrink-0 text-sm font-semibold text-[#2563FF] hover:underline flex items-center gap-1"
            >
              Read Article
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* Build Prompt — gated behind email */}
        {drop.build_prompt && (
          unlocked ? (
            <CollapsibleSection
              id="prompt"
              title="🤖 Build Prompt"
              subtitle="Copy and paste into Claude, ChatGPT, or your AI of choice."
              isOpen={expandedSection === "prompt"}
              onToggle={() => toggleSection("prompt")}
            >
              <div className="rounded-xl bg-[#0D1220] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                  <span className="text-[#8899BB] text-xs font-mono">prompt</span>
                  <CopyButton text={drop.build_prompt} label="Copy Prompt" />
                </div>
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-[#E2E8F0] font-mono leading-relaxed whitespace-pre-wrap">
                    {drop.build_prompt}
                  </code>
                </pre>
              </div>
            </CollapsibleSection>
          ) : (
            <div className="rounded-xl bg-white border border-[#C8C3BA]/50 overflow-hidden">
              {/* Blurred prompt preview */}
              <div className="relative select-none pointer-events-none px-5 py-4 blur-sm opacity-60">
                <div className="font-bold text-[#0D1220] text-base mb-1">🤖 Build Prompt</div>
                <div className="rounded-lg bg-[#0D1220] p-4 mt-2">
                  <code className="text-[#E2E8F0] text-xs font-mono leading-relaxed">
                    {drop.build_prompt.slice(0, 180)}...
                  </code>
                </div>
              </div>

              {/* Gate overlay */}
              <div className="relative -mt-2 bg-gradient-to-t from-white via-white to-white/80 px-5 pb-6 pt-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Lock className="h-4 w-4 text-[#2563FF]" />
                  <span className="font-bold text-[#0D1220] text-base">Unlock the Build Prompt</span>
                </div>
                <p className="text-[#556070] text-sm mb-4">
                  Free — enter your email to access this prompt and unlock every kit in the Vault.
                </p>
                <form onSubmit={handleUnlock} className="flex gap-2 max-w-sm mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 rounded-lg border border-[#C8C3BA] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563FF]/30 focus:border-[#2563FF]/50"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="shrink-0 bg-[#2563FF] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1D50D9] disabled:opacity-50 transition-colors"
                  >
                    {submitting ? "..." : "Unlock"}
                  </button>
                </form>
                {submitError && (
                  <p className="text-red-500 text-xs mt-2">{submitError}</p>
                )}
                <p className="text-[#AAA] text-xs mt-3">No spam. Unsubscribe any time.</p>
              </div>
            </div>
          )
        )}

        {/* File Tree */}
        {drop.file_tree && (
          <CollapsibleSection
            id="files"
            title="📁 File Structure"
            subtitle="The exact file tree for this project."
            isOpen={expandedSection === "files"}
            onToggle={() => toggleSection("files")}
          >
            <div className="rounded-xl bg-[#0D1220] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
                <span className="text-[#8899BB] text-xs font-mono">file tree</span>
                <CopyButton text={drop.file_tree} label="Copy Tree" />
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-[#E2E8F0] font-mono leading-relaxed">{drop.file_tree}</code>
              </pre>
            </div>
          </CollapsibleSection>
        )}

        {/* Setup Steps */}
        {setupSteps.length > 0 && (
          <CollapsibleSection
            id="setup"
            title="🚀 Setup Steps"
            subtitle="Follow these steps to get your project running."
            isOpen={expandedSection === "setup"}
            onToggle={() => toggleSection("setup")}
          >
            <ol className="space-y-3">
              {setupSteps.map((step, i) => {
                const title = typeof step === "object" && step !== null
                  ? String(step.title ?? "").trim()
                  : "";
                const description = typeof step === "object" && step !== null
                  ? String(step.description ?? "").trim()
                  : String(step ?? "").trim();
                return (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#F4F6FA] border border-[#C8C3BA]/40">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#2563FF] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {typeof step === "object" && step !== null && typeof step.step === "number" ? step.step : i + 1}
                    </span>
                    <div className="text-sm leading-relaxed">
                      {title && <div className="text-[#0D1220] font-semibold mb-0.5">{title}</div>}
                      {description && <div className="text-[#2D3748]">{description}</div>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </CollapsibleSection>
        )}

        {/* Edit Map */}
        {editMap.length > 0 && (
          <CollapsibleSection
            id="editmap"
            title="🗺️ Edit Map"
            subtitle="Exactly what to change for your niche."
            isOpen={expandedSection === "editmap"}
            onToggle={() => toggleSection("editmap")}
          >
            <div className="space-y-3">
              {editMap.map((item, i) => {
                const file = String(item.file ?? "").trim();
                const description = String(item.description ?? item.notes ?? "").trim();
                const whatToChange = String(item.what_to_change ?? "").trim();
                return (
                  <div
                    key={i}
                    className="rounded-lg bg-white border border-[#C8C3BA]/50 p-4"
                  >
                    <div className="flex items-start gap-2 mb-1.5">
                      <span className="shrink-0 mt-0.5 text-[10px] font-bold uppercase tracking-wide bg-[#2563FF]/8 text-[#2563FF] px-2 py-0.5 rounded border border-[#2563FF]/15 font-mono">
                        file
                      </span>
                      <code className="text-sm font-mono text-[#0D1220] font-semibold">
                        {file || "(not provided)"}
                      </code>
                    </div>
                    {whatToChange && (
                      <p className="text-[#0D1220] text-sm font-medium pl-2 mb-1">{whatToChange}</p>
                    )}
                    <p className="text-[#556070] text-sm leading-relaxed pl-2">
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>
          </CollapsibleSection>
        )}

        {/* Troubleshooting */}
        {troubleshooting.length > 0 && (
          <CollapsibleSection
            id="troubleshooting"
            title="🔧 Troubleshooting"
            subtitle="Common issues and how to fix them."
            isOpen={expandedSection === "troubleshooting"}
            onToggle={() => toggleSection("troubleshooting")}
          >
            <div className="space-y-4">
              {troubleshooting.map((item, i) => {
                const problem = String(item.problem ?? "").trim();
                const solution = String(item.solution ?? item.fix ?? "").trim();
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-amber-200 bg-amber-50 p-4"
                  >
                    <div className="font-semibold text-amber-900 text-sm mb-1.5 flex items-start gap-2">
                      <span className="text-amber-500 shrink-0">⚠</span>
                      {problem || "Issue"}
                    </div>
                    <p className="text-amber-800 text-sm leading-relaxed pl-5">
                      {solution}
                    </p>
                  </div>
                );
              })}
            </div>
          </CollapsibleSection>
        )}

        {/* Upgrade note */}
        {drop.upgrade_note && (
          <div className="rounded-xl bg-[#0D1220] p-5 text-white">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8899BB] mb-2">
              Ready to Level Up?
            </div>
            <p className="text-[#CBD5E0] text-sm leading-relaxed mb-3">
              {drop.upgrade_note}
            </p>
            <Link
              to="/subscribe"
              className="inline-flex items-center gap-2 bg-[#2563FF] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1D50D9] transition-colors"
            >
              Get Premium Access
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}

        {/* ── More Starter Systems ── */}
        {related.length > 0 && (
          <section className="pt-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-[#0D1220]">
                Explore More Starter Systems
              </h2>
              <div className="h-px flex-1 bg-[#C8C3BA]/40" />
              <Link
                to="/starter-vault"
                className="text-sm text-[#2563FF] font-medium hover:underline flex items-center gap-1"
              >
                See all
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((d) => (
                <StarterDropCard
                  key={d.slug}
                  title={d.title}
                  slug={d.slug}
                  excerpt={d.excerpt}
                  category={d.category}
                  coverImageUrl={d.cover_image_url}
                  difficulty={d.difficulty}
                  estimatedBuildTime={d.estimated_build_time}
                  toolsUsed={d.tools_used}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ── Collapsible section component ────────────────────────────────────────────

interface CollapsibleSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="rounded-xl bg-white border border-[#C8C3BA]/50 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[#F4F6FA]/60 transition-colors"
      >
        <div className="text-left">
          <div className="font-bold text-[#0D1220] text-base">{title}</div>
          {subtitle && (
            <div className="text-xs text-[#888] mt-0.5">{subtitle}</div>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#888] shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[#888] shrink-0" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-5 pb-5 pt-1">{children}</div>
      </div>
    </div>
  );
}
