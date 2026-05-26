/**
 * ArticleCard — used in the Kraken Intel hub grid.
 */
import { Clock, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImageUrl?: string | null;
  readTime?: string;
  publishedAt?: string | null;
  featured?: boolean;
  large?: boolean;
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  category,
  coverImageUrl,
  readTime,
  publishedAt,
  featured,
  large = false,
}: ArticleCardProps) {
  const navigate = useNavigate();
  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/intel/$slug", params: { slug } })}
      className={cn(
        "group flex w-full text-left flex-col rounded-2xl bg-white border border-[#C8C3BA]/50 overflow-hidden",
        "shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
        large && "sm:flex-row",
      )}
    >
      {/* Cover Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-[#EEF2F7] to-[#E8EDF5]",
          large ? "sm:w-2/5 aspect-video sm:aspect-auto" : "aspect-video",
        )}
      >
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-black text-[#2563FF]/10 text-center px-4 leading-none">
              {title.slice(0, 2).toUpperCase()}
            </div>
          </div>
        )}
        {featured && (
          <div className="absolute top-3 right-3 bg-[#2563FF] text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Star className="h-2.5 w-2.5 fill-current" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-col flex-1 p-5", large && "sm:p-6")}>
        {/* Category pill */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center bg-[#2563FF]/8 text-[#2563FF] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#2563FF]/15">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-bold text-[#0D1220] leading-snug group-hover:text-[#2563FF] transition-colors mb-2",
            large ? "text-xl sm:text-2xl" : "text-base",
          )}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#556070] text-sm leading-relaxed flex-1 line-clamp-3 mb-4">{excerpt}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3 text-xs text-[#888]">
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readTime}
              </span>
            )}
            {date && <span>{date}</span>}
          </div>
          <span className="flex items-center gap-1 text-[#2563FF] text-xs font-semibold group-hover:gap-2 transition-all">
            Read
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}
