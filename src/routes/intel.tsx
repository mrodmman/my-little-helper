/**
 * /intel — Kraken Intel article hub.
 * Public editorial layer for Keyboard Kraken.
 */
import { createFileRoute, Link, Outlet, useChildMatches } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Layers, ArrowRight, Search } from "lucide-react";
import { getPublishedArticles } from "@/rpc/intel";
import { ArticleCard } from "@/components/intel/ArticleCard";
import { CategoryChips } from "@/components/intel/CategoryChips";

export const Route = createFileRoute("/intel")({
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
    const articles = await getPublishedArticles().catch(() => []);
    return { articles };
  },
  component: IntelLayout,
});

// Layout wrapper: renders the hub at /intel, transparently passes through to
// child routes (e.g. /intel/$slug) via <Outlet />.
function IntelLayout() {
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return <IntelHub />;
}

function IntelHub() {
  const { articles } = Route.useLoaderData();
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
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0D1220 0%, #1a2744 60%, #1a3a80 100%)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(37,99,255,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(37,99,255,0.10) 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[#8899BB] text-sm mb-8">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Intel</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#2563FF]/20 border border-[#2563FF]/30 text-[#7BA7FF] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <BookOpen className="h-3 w-3" />
              Kraken Intel
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
              Build smarter{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(135deg, #2563FF, #60A5FA)",
                }}
              >
                systems.
              </span>
            </h1>

            <p className="text-[#8899BB] text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
              Find better tools. Own more of your online infrastructure.
              Tactical articles for independent operators and system builders.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#articles"
                className="inline-flex items-center gap-2 bg-[#2563FF] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#1D50D9] transition-colors"
              >
                Browse Articles
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/starter-vault"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/15 transition-colors"
              >
                <Layers className="h-4 w-4" />
                Explore Starter Vault
              </Link>
            </div>
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
            <div className="grid lg:grid-cols-2 gap-5">
              {featured.slice(0, 2).map((a) => (
                <ArticleCard
                  key={a.slug}
                  href={a.external_url || `/intel/${a.slug}`}
                  title={a.title}
                  excerpt={a.excerpt}
                  category={a.category}
                  coverImageUrl={a.cover_image_url}
                  readTime={a.read_time}
                  publishedAt={a.published_at}
                  featured
                  large
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
                  href={a.external_url || `/intel/${a.slug}`}
                  title={a.title}
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
