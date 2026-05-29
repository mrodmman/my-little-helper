/**
 * /intel — Kraken Intel article hub.
 * Public editorial layer for Keyboard Kraken.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Wrench, Cog, DollarSign } from "lucide-react";
import { getPublishedArticles } from "@/rpc/intel";
import { getSiteConfig } from "@/rpc/siteConfig";
import { ArticleCard } from "@/components/intel/ArticleCard";
import { CategoryChips } from "@/components/intel/CategoryChips";

export const Route = createFileRoute("/intel/")({
  head: () => ({
    meta: [
      { title: "Kraken Intel — Build Smarter Systems" },
      {
        name: "description",
        content:
          "Build smarter systems. Find better tools. Own more of your online infrastructure.",
      },
    ],
  }),
  loader: async () => {
    const [articles, siteConfig] = await Promise.all([
      getPublishedArticles().catch(() => []),
      getSiteConfig().catch(() => ({ intel_hero_image_url: null })),
    ]);
    return { articles, heroImageUrl: siteConfig.intel_hero_image_url };
  },
  component: IntelHub,
});

function IntelHub() {
  const { articles, heroImageUrl } = Route.useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Derive categories
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))];

  // Filter
  const filtered = articles.filter((a) => {
    const matchCat = !selectedCategory || a.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = filtered.filter((a) => a.featured);
  const regular = filtered.filter((a) => !a.featured);

  return (
    <div className="min-h-screen" style={{ background: "#F4F6FA" }}>
      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ background: "#02050C" }}>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className={heroImageUrl ? "flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16" : ""}>
            {/* Text content */}
            <div className={heroImageUrl ? "flex-1 min-w-0" : "max-w-4xl"}>
              <div className="inline-flex items-center rounded-full bg-[#14B8FF] text-[#031122] px-4 py-1.5 text-sm font-bold mb-6">
                Online Marketing Growth
              </div>

              <h1 className="font-hero-display text-6xl sm:text-7xl lg:text-8xl uppercase leading-[0.9] mb-6">
                <span className="block text-[#14B8FF]">Reduce subscriptions.</span>
                <span className="block text-[#FFD400]">Increase control.</span>
              </h1>

              <ul className="space-y-2.5 text-[#E6EEF9] text-xl sm:text-2xl mb-9 font-hero-sans">
                <li className="flex items-center gap-3"><Wrench className="h-6 w-6 text-[#14B8FF]" /> <span>Find smarter tools</span></li>
                <li className="flex items-center gap-3"><Cog className="h-6 w-6 text-[#14B8FF]" /> <span>Build online systems you actually own</span></li>
                <li className="flex items-center gap-3"><DollarSign className="h-6 w-6 text-[#14B8FF]" /> <span>Grow your Business</span></li>
              </ul>

              <div className="flex flex-wrap gap-3">
                <a href="#articles" className="inline-flex items-center justify-center rounded-xl bg-[#14B8FF] text-[#031122] px-6 py-3 font-bold text-base hover:brightness-95 transition">
                  Browse Articles
                </a>
                <Link to="/starter-vault" className="inline-flex items-center justify-center rounded-xl border-2 border-[#14B8FF] text-[#14B8FF] px-6 py-3 font-bold text-base hover:bg-[#14B8FF]/10 transition">
                  Full Builds
                </Link>
              </div>
            </div>

            {/* Hero image / gif — stacked on mobile, side-by-side on lg+ */}
            {heroImageUrl && (
              <div className="flex shrink-0 items-center justify-center lg:w-80 xl:w-96">
                <img
                  src={heroImageUrl}
                  alt=""
                  className="max-h-64 lg:max-h-80 w-auto object-contain drop-shadow-2xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div id="articles" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#888]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-[#C8C3BA]/60 text-[#0D1220] placeholder:text-[#888] text-sm focus:outline-none focus:ring-2 focus:ring-[#2563FF]/30 focus:border-[#2563FF]/50"
            />
          </div>
          <CategoryChips
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Featured articles */}
        {featured.length > 0 && !searchQuery && !selectedCategory && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-lg font-bold text-[#0D1220]">
                Featured
              </h2>
              <div className="h-px flex-1 bg-[#C8C3BA]/40" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.slice(0, 3).map((a) => (
                <ArticleCard
                  key={a.slug}
                  title={a.title}
                  slug={a.slug}
                  excerpt={a.excerpt}
                  category={a.category}
                  coverImageUrl={a.cover_image_url}
                  readTime={a.read_time}
                  publishedAt={a.published_at}
                  featured
                />
              ))}
            </div>
          </section>
        )}

        {/* All articles grid */}
        <section>
          {(searchQuery || selectedCategory) && (
            <p className="text-sm text-[#556070] mb-5">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
              {selectedCategory ? ` in "${selectedCategory}"` : ""}
              {searchQuery ? ` for "${searchQuery}"` : ""}
            </p>
          )}

          {!searchQuery && !selectedCategory && (regular.length > 0 || featured.length > 2) && (
            <div className="flex items-center gap-2 mb-5">
              <h2 className="text-lg font-bold text-[#0D1220]">All Articles</h2>
              <div className="h-px flex-1 bg-[#C8C3BA]/40" />
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-[#888] text-lg mb-2">No articles found</div>
              <p className="text-[#AAA] text-sm">
                Try a different search or category.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(searchQuery || selectedCategory ? filtered : [...featured.slice(2), ...regular]).map((a) => (
                <ArticleCard
                  key={a.slug}
                  title={a.title}
                  slug={a.slug}
                  excerpt={a.excerpt}
                  category={a.category}
                  coverImageUrl={a.cover_image_url}
                  readTime={a.read_time}
                  publishedAt={a.published_at}
                  featured={!!a.featured}
                />
              ))}
            </div>
          )}
        </section>

        {/* CTA Block */}
        <div className="mt-16 rounded-2xl bg-[#0D1220] p-8 text-center">
          <div className="text-white text-2xl font-bold mb-2">
            Get the free build kits.
          </div>
          <p className="text-[#8899BB] text-sm mb-5">
            Every article links to a free Starter Vault system — prompts, file
            structures, and step-by-step setup guides.
          </p>
          <Link
            to="/starter-vault"
            className="inline-flex items-center gap-2 bg-[#2563FF] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1D50D9] transition-colors"
          >
            <Layers className="h-4 w-4" />
            Explore Starter Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
