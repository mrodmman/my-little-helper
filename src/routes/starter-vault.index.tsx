/**
 * /starter-vault — Starter Vault hub.
 * Free operator toolkit and implementation library.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Layers, Package, PackageOpen, FolderTree, Rocket } from "lucide-react";
import { getPublishedStarterDrops } from "@/rpc/intel";
import { StarterDropCard } from "@/components/starter-vault/StarterDropCard";
import { CategoryChips } from "@/components/intel/CategoryChips";

export const Route = createFileRoute("/starter-vault/")({
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
      <div className="relative overflow-hidden" style={{ background: "#02050C" }}>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full bg-[#14B8FF] text-[#031122] px-4 py-1.5 text-sm font-bold mb-6">
              Free Build Kits
            </div>

            <h1 className="font-hero-display text-6xl sm:text-7xl lg:text-8xl uppercase leading-[0.9] mb-6">
              <span className="block text-[#14B8FF]">Starter vault.</span>
              <span className="block text-[#FFD400]">Build faster.</span>
            </h1>

            <ul className="space-y-2.5 text-[#E6EEF9] text-xl sm:text-2xl mb-9 font-hero-sans">
              <li className="flex items-center gap-3"><PackageOpen className="h-6 w-6 text-[#14B8FF]" /> <span>Grab ready-to-use kits</span></li>
              <li className="flex items-center gap-3"><FolderTree className="h-6 w-6 text-[#14B8FF]" /> <span>Follow exact setup + edit maps</span></li>
              <li className="flex items-center gap-3"><Rocket className="h-6 w-6 text-[#14B8FF]" /> <span>Ship your system in hours</span></li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <a href="#drops" className="inline-flex items-center justify-center rounded-xl bg-[#14B8FF] text-[#031122] px-6 py-3 font-bold text-base hover:brightness-95 transition">
                Browse Build Kits
              </a>
              <Link to="/intel" className="inline-flex items-center justify-center rounded-xl border-2 border-[#14B8FF] text-[#14B8FF] px-6 py-3 font-bold text-base hover:bg-[#14B8FF]/10 transition">
                Kraken Intel Articles
              </Link>
            </div>
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
