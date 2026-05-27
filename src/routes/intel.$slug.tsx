/**
 * /intel/:slug — Individual Kraken Intel article page.
 */
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, ChevronRight, BookOpen } from "lucide-react";
import { getArticleBySlug, getPublishedArticles } from "@/rpc/intel";
import type { ContentBlock } from "@/rpc/intel";
import { ContentBlockRenderer } from "@/components/intel/ContentBlockRenderer";
import { FastRouteBox } from "@/components/intel/FastRouteBox";
import { ArticleCard } from "@/components/intel/ArticleCard";

export const Route = createFileRoute("/intel/$slug")({
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.article?.title ?? "Article — Kraken Intel" },
      {
        name: "description",
        content: loaderData?.article?.excerpt ?? "",
      },
    ],
  }),
  loader: async ({ params }) => {
    const [article, allArticles] = await Promise.all([
      getArticleBySlug({ data: params.slug }),
      getPublishedArticles().catch(() => []),
    ]);
    
    // Debug log for troubleshooting
    if (!article) {
      console.error(`[Intel] Article not found for slug: "${params.slug}"`);
    }
    
    if (!article) throw notFound();
    
    const related = allArticles
      .filter((a) => a.slug !== article.slug && a.category === article.category)
      .slice(0, 3);

    const articleIndex = allArticles.findIndex((a) => a.slug === article.slug);
    const nextArticle = articleIndex >= 0 ? allArticles[articleIndex + 1] ?? null : null;

    return { article, related, nextArticle };
  },
  component: ArticlePage,
  notFoundComponent: () => (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#F4F6FA" }}
    >
      <div className="text-center">
        <div className="text-6xl font-black text-[#C8C3BA] mb-4">404</div>
        <h1 className="text-2xl font-bold text-[#0D1220] mb-2">Article not found</h1>
        <p className="text-[#556070] mb-6">This article may have moved or been unpublished.</p>
        <Link
          to="/intel"
          className="inline-flex items-center gap-2 bg-[#2563FF] text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
        >
          Back to Intel
        </Link>
      </div>
    </div>
  ),
});


function isRenderableImageUrl(url?: string | null) {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("REPLACE_WITH_")) return false;
  if (trimmed.includes("{{") || trimmed.includes("}}")) return false;
  return true;
}

function ArticlePage() {
  const { article, related, nextArticle } = Route.useLoaderData();

  const tags: string[] = (() => {
    try {
      return JSON.parse(article.tags || "[]") as string[];
    } catch {
      return [];
    }
  })();

  const blocks: ContentBlock[] = (() => {
    try {
      return JSON.parse(article.content_blocks || "[]") as ContentBlock[];
    } catch {
      return [];
    }
  })();

  const publishDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  // Derive "What You'll Learn" from block headings
  const learnItems = blocks
    .filter((b) => b.type === "subheading" || b.type === "heading")
    .map((b) => ("text" in b ? b.text : ""))
    .filter(Boolean)
    .slice(0, 5);

  return (
    <div className="min-h-screen" style={{ background: "#F4F6FA" }}>
      {/* ── Article Header ── */}
      <div
        style={{
          background: "#0D1220",
          borderBottom: "1px solid rgba(200,195,186,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-[#8899BB] mb-6">
            <Link to="/intel" className="hover:text-white transition-colors">
              Intel
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#CBD5E0] line-clamp-1">{article.title}</span>
          </nav>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center bg-[#2563FF]/8 text-[#2563FF] text-xs font-bold px-3 py-1 rounded-full border border-[#2563FF]/15 uppercase tracking-wide">
              {article.category}
            </span>
            {publishDate && <span className="text-xs text-[#888]">{publishDate}</span>}
            {article.read_time && (
              <span className="flex items-center gap-1 text-xs text-[#888]">
                <Clock className="h-3 w-3" />
                {article.read_time}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight uppercase tracking-tight max-w-4xl mb-4">
            <span className="text-[#14B8FF]">{article.title.split(" ").slice(0, Math.ceil(article.title.split(" ").length / 2)).join(" ")}</span>{" "}
            <span className="text-[#FFD400]">{article.title.split(" ").slice(Math.ceil(article.title.split(" ").length / 2)).join(" ")}</span>
          </h1>

          {/* Excerpt */}
          <p className="text-[#8899BB] text-lg leading-relaxed max-w-2xl mb-5">{article.excerpt}</p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] bg-white border border-[#C8C3BA]/50 text-[#556070] px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Hero Image (if exists) ── */}
      {isRenderableImageUrl(article.cover_image_url) && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-0 pb-0">
          <div className="rounded-2xl overflow-hidden border border-[#C8C3BA]/40 shadow-md">
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="w-full object-cover max-h-[420px]"
            />
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-10 items-start">
          {/* Article content */}
          <article className="flex-1 min-w-0">
            <ContentBlockRenderer blocks={blocks} />
          </article>

          {/* Sticky sidebar — desktop only */}
          <aside className="hidden lg:flex flex-col gap-5 w-72 shrink-0 sticky top-6">
            {/* What You'll Learn */}
            {learnItems.length > 0 && (
              <div className="rounded-xl bg-white border border-[#C8C3BA]/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="h-4 w-4 text-[#2563FF]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#556070]">
                    What You'll Learn
                  </span>
                </div>
                <ul className="space-y-2">
                  {learnItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#2D3748]">
                      <ChevronRight className="h-3.5 w-3.5 text-[#2563FF] shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Starter Drop */}
            {article.related_starter_drop_slug && (
              <div className="rounded-xl bg-[#0D1220] text-white p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8899BB] mb-2">
                  Free Build Kit
                </div>
                <p className="text-sm text-[#CBD5E0] mb-3 leading-relaxed">
                  Want the full step-by-step build kit? Grab the free Starter Vault version.
                </p>
                <Link
                  to="/starter-vault"
                  className="flex items-center justify-center gap-2 w-full bg-[#2563FF] text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-[#1D50D9] transition-colors"
                >
                  Browse Free Build Kits
                </Link>
              </div>
            )}

            {/* Fast Route */}
            {article.fast_route_tool_name && article.fast_route_affiliate_url && (
              <FastRouteBox
                toolName={article.fast_route_tool_name}
                description={article.fast_route_description ?? ""}
                affiliateUrl={article.fast_route_affiliate_url}
                buttonText={article.fast_route_button_text ?? "Try It Free"}
              />
            )}
          </aside>
        </div>

        {/* Mobile sidebar blocks */}
        <div className="lg:hidden mt-8 space-y-5">
          {article.related_starter_drop_slug && (
            <div className="rounded-xl bg-[#0D1220] text-white p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8899BB] mb-2">
                Free Build Kit
              </div>
              <p className="text-sm text-[#CBD5E0] mb-4 leading-relaxed">
                Want the full step-by-step build kit? Grab the free Starter Vault version.
              </p>
              <Link
                to="/starter-vault"
                className="flex items-center justify-center gap-2 w-full bg-[#2563FF] text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-[#1D50D9] transition-colors"
              >
                Browse Free Build Kits
              </Link>
            </div>
          )}

          {article.fast_route_tool_name && article.fast_route_affiliate_url && (
            <FastRouteBox
              toolName={article.fast_route_tool_name}
              description={article.fast_route_description ?? ""}
              affiliateUrl={article.fast_route_affiliate_url}
              buttonText={article.fast_route_button_text ?? "Try It Free"}
            />
          )}
        </div>



        {/* ── Article Navigation ── */}
        <section className="mt-12">
          <div className="rounded-2xl border border-[#C8C3BA]/50 bg-white p-4 sm:p-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <Link
              to="/intel"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#2563FF]/40 text-[#2563FF] px-4 py-2.5 text-sm font-semibold hover:bg-[#2563FF]/5 transition-colors"
            >
              Back to Articles
            </Link>
            {nextArticle ? (
              <a
                href={nextArticle.external_url || `/intel/${nextArticle.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563FF] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#1D50D9] transition-colors"
              >
                Read Next Article
                <ChevronRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-xl border border-[#C8C3BA]/60 text-[#888] px-4 py-2.5 text-sm font-semibold">
                You’re at the last article
              </span>
            )}
          </div>
        </section>

        {/* ── Related Articles ── */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-[#0D1220]">Related Articles</h2>
              <div className="h-px flex-1 bg-[#C8C3BA]/40" />
              <Link to="/intel" className="text-sm text-[#2563FF] font-medium hover:underline">
                See all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a) => (
                <ArticleCard
                  key={a.slug}
                  href={a.external_url || `/intel/${a.slug}`}
                  title={a.title}
                  excerpt={a.excerpt}
                  category={a.category}
                  coverImageUrl={a.cover_image_url}
                  readTime={a.read_time}
                  publishedAt={a.published_at}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
