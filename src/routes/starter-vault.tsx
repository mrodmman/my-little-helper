/**
 * /starter-vault — Starter Vault hub.
 * Free operator toolkit and implementation library.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Package, BookOpen, ArrowRight, Layers } from "lucide-react";
import { getPublishedStarterDrops } from "@/rpc/intel";
import { StarterDropCard } from "@/components/starter-vault/StarterDropCard";
import { CategoryChips } from "@/components/intel/CategoryChips";

export const Route = createFileRoute("/starter-vault")({
  head: () => ({
    meta: [
      { title: "Starter Vault — Free Build Kits & Starter Systems" },
      {
        name: "description",
        content:
          "Free build kits, prompts, templates, workflows, and starter systems for independent operators.",
      },
    ],
  }),
  loader: async () => {
    const drops = await getPublishedStarterDrops().catch(() => []);
    return { drops };
  },
  component: StarterVaultHub,
});

function StarterVaultHub() {
  const { drops } = Route.useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(drops.map((d) => d.category).filter(Boolean))];

  const filtered = !selectedCategory
    ? drops
    : drops.filter((d) => d.category === selectedCategory);

  return (
    <div className="min-h-screen" style={{ background: "#F4F6FA" }}>
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0D1220 0%, #0f2244 60%, #112b66 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 10% 60%, rgba(37,99,255,0.15) 0%, transparent 55%), radial-gradient(ellipse at 90% 10%, rgba(37,99,255,0.08) 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[#8899BB] text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Starter Vault</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#2563FF]/20 border border-[#2563FF]/30 text-[#7BA7FF] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <Package className="h-3 w-3" />
              Free Build Kits
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              Starter{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #2563FF, #60A5FA)",
                }}
              >
                Vault
              </span>
            </h1>

            <p className="text-[#8899BB] text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Free build kits, prompts, templates, workflows, and starter
              systems. Pick a project. Get the kit. Build it today.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#drops"
                className="inline-flex items-center gap-2 bg-[#2563FF] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1D50D9] transition-colors"
              >
                Browse Build Kits
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/intel"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/15 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Kraken Intel Articles
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
            {[
              { label: "Free kits", value: drops.length.toString() },
              { label: "Always free", value: "100%" },
              { label: "Build time", value: "1–4h" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-[11px] text-[#8899BB] uppercase tracking-wide mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── What Is The Starter Vault ── */}
      <div className="bg-white border-b border-[#C8C3BA]/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "🧠",
                title: "Build Prompt",
                desc: "Copy-paste prompt to generate your entire project. No starting from scratch.",
              },
              {
                icon: "📁",
                title: "File Structure",
                desc: "Exact file tree for your project. Know what to build before you start.",
              },
              {
                icon: "🗺️",
                title: "Edit Map",
                desc: "Line-by-line edit guide. Know exactly what to change for your niche.",
              },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <div className="text-2xl shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <div className="font-semibold text-[#0D1220] text-sm mb-1">
                    {f.title}
                  </div>
                  <p className="text-[#556070] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Drops Grid ── */}
      <div id="drops" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Category filter */}
        {categories.length > 0 && (
          <div className="mb-8">
            <CategoryChips
              categories={categories}
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-10 w-10 text-[#C8C3BA] mx-auto mb-3" />
            <div className="text-[#888] text-lg mb-1">No build kits yet</div>
            <p className="text-[#AAA] text-sm">Check back soon — new drops added regularly.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-lg font-bold text-[#0D1220]">
                {selectedCategory || "All Build Kits"}
              </h2>
              <div className="h-px flex-1 bg-[#C8C3BA]/40" />
              <span className="text-sm text-[#888]">{filtered.length} kit{filtered.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((d) => (
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
          </>
        )}

        {/* Cross-promo CTA */}
        <div className="mt-16 rounded-2xl overflow-hidden grid sm:grid-cols-2">
          <div className="bg-[#0D1220] p-8">
            <Layers className="h-8 w-8 text-[#2563FF] mb-4" />
            <div className="text-white text-xl font-bold mb-2">
              Learn the strategy first.
            </div>
            <p className="text-[#8899BB] text-sm leading-relaxed mb-4">
              Every Starter Vault kit links to a Kraken Intel article that
              teaches the full context, strategy, and architecture.
            </p>
            <Link
              to="/intel"
              className="inline-flex items-center gap-2 text-[#2563FF] font-semibold text-sm hover:underline"
            >
              Browse Intel Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div
            className="p-8 flex flex-col justify-center"
            style={{
              background: "linear-gradient(135deg, #1a3a80, #2563FF)",
            }}
          >
            <div className="text-white text-xl font-bold mb-2">
              Ready for advanced systems?
            </div>
            <p className="text-[#C0D4FF] text-sm leading-relaxed mb-4">
              The Premium Vault has full production-grade systems, automation frameworks, and advanced operator playbooks.
            </p>
            <Link
              to="/vault"
              className="inline-flex items-center gap-2 bg-white text-[#2563FF] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-[#F0F4FF] transition-colors w-fit"
            >
              Explore Premium Vault
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
