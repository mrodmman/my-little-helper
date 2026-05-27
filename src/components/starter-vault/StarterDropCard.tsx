/**
 * StarterDropCard — used in the Starter Vault hub grid.
 */
import { useNavigate } from "@tanstack/react-router";
import { Clock, Wrench, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarterDropCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImageUrl?: string | null;
  difficulty?: string;
  estimatedBuildTime?: string;
  toolsUsed?: string | string[];
  featured?: boolean;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  Advanced: "bg-red-50 text-red-700 border-red-200",
};

export function StarterDropCard({
  title,
  slug,
  excerpt,
  category,
  coverImageUrl,
  difficulty = "Beginner",
  estimatedBuildTime,
  toolsUsed,
}: StarterDropCardProps) {
  const navigate = useNavigate();
  const tools: string[] = (() => {
    if (Array.isArray(toolsUsed)) return toolsUsed;
    if (typeof toolsUsed !== "string") return [];
    try {
      return JSON.parse(toolsUsed || "[]") as string[];
    } catch {
      return [];
    }
  })();

  const normalizedCoverImageUrl = normalizeImageUrl(coverImageUrl);

  const diffColor = DIFFICULTY_COLORS[difficulty] ?? "bg-gray-50 text-gray-600 border-gray-200";

  return (
    <button
      type="button"
      onClick={() => navigate({ to: "/starter-vault/$slug", params: { slug } })}
      className="group flex w-full text-left flex-col rounded-2xl bg-white border border-[#C8C3BA]/50 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover */}
      <div className="relative aspect-video bg-gradient-to-br from-[#EEF2F7] to-[#E8EDF5] overflow-hidden">
        {normalizedCoverImageUrl ? (
          <img
            src={normalizedCoverImageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="text-4xl font-black text-[#2563FF]/10 leading-none mb-2">
                {title.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#2563FF]/30">
                Starter Kit
              </div>
            </div>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0D1220] text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border border-[#C8C3BA]/60">
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Difficulty + time */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full border", diffColor)}
          >
            {difficulty}
          </span>
          {estimatedBuildTime && (
            <span className="flex items-center gap-1 text-[11px] text-[#888]">
              <Clock className="h-3 w-3" />
              {estimatedBuildTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-[#0D1220] text-base leading-snug group-hover:text-[#2563FF] transition-colors mb-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-[#556070] text-sm leading-relaxed flex-1 line-clamp-3 mb-4">{excerpt}</p>

        {/* Tools */}
        {tools.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            <Wrench className="h-3 w-3 text-[#888]" />
            {tools.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium bg-[#F4F6FA] text-[#556070] px-2 py-0.5 rounded-full border border-[#C8C3BA]/50"
              >
                {t}
              </span>
            ))}
            {tools.length > 3 && (
              <span className="text-[10px] text-[#888]">+{tools.length - 3} more</span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#F0ECE6]">
          <span className="text-xs text-[#888]">Free build kit</span>
          <span className="flex items-center gap-1 text-[#2563FF] text-xs font-semibold group-hover:gap-2 transition-all">
            Get Kit
            <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}
