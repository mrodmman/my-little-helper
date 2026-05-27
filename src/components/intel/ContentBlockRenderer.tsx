/**
 * Renders an array of structured ContentBlock objects into React UI.
 * Field-name shims: the JSON export uses snake_case / alternate names in
 * several places. Every case reads both the canonical TS field AND the JSON
 * variant so the renderer works with either shape.
 */
import { Info, Lightbulb, AlertTriangle, CheckCircle2, ExternalLink, ChevronRight } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import type { ContentBlock } from "@/rpc/intel";
import { cn } from "@/lib/utils";
function isPlaceholderImageUrl(value: string) {
  const upper = value.toUpperCase();
  return upper.startsWith("REPLACE_WITH_") || upper.includes("_URL");
}

function normalizeImageUrl(rawUrl?: string | null) {
  if (!rawUrl) return "";
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  if (isPlaceholderImageUrl(trimmed)) return "";
  if (!trimmed.startsWith("/api/cdn/")) return trimmed;

  const prefix = "/api/cdn/";
  const tail = trimmed.slice(prefix.length);
  let decoded = tail;
  for (let i = 0; i < 3; i += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    } catch {
      break;
    }
  }
  return `${prefix}${encodeURIComponent(decoded)}`;
}

interface ContentBlockRendererProps {
  blocks: ContentBlock[];
}
export function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <p className="text-[#888] italic text-sm py-8 text-center">
        No content blocks found for this article.
      </p>
    );
  }
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => <BlockSwitch key={i} block={block} />)}
    </div>
  );
}
function BlockSwitch({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="text-[#2D3748] leading-relaxed text-[1.05rem]">{block.text}</p>;
    case "heading":
      return <h2 className="text-2xl font-bold text-[#0D1220] mt-8 mb-3 leading-tight">{block.text}</h2>;
    case "subheading":
      return <h3 className="text-lg font-semibold text-[#0D1220] mt-6 mb-2">{block.text}</h3>;
    case "divider":
      return <hr className="border-[#C8C3BA]/60 my-6" />;
    case "image": {
      const raw = block as typeof block & { src?: string; image_url?: string };
      const imgSrc = normalizeImageUrl(block.url ?? raw.src ?? raw.image_url ?? "");
      if (!imgSrc) return null;
      return (
        <figure className="rounded-xl overflow-hidden border border-[#C8C3BA]/50">
          <img src={imgSrc} alt={block.alt ?? ""} className="w-full object-cover" />
          {block.caption && (
            <figcaption className="text-xs text-[#556070] text-center py-2 bg-[#F4F6FA]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
    case "callout":
      return <CalloutBlock block={block} />;
    case "bullet_list":
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#2D3748]">
              <ChevronRight className="h-4 w-4 text-[#2563FF] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{typeof item === "string" ? item : JSON.stringify(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "numbered_steps":
      return (
        <ol className="space-y-4">
          {block.items.map((item, i) => {
            const isObj = typeof item === "object" && item !== null;
            const title = isObj ? String((item as { title?: unknown }).title ?? "") : "";
            const text = isObj
              ? String((item as { text?: unknown }).text ?? "")
              : typeof item === "string" ? item : "";
            return (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-[#2563FF] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 pt-0.5">
                  {title && <div className="font-semibold text-[#0D1220] text-sm mb-1">{title}</div>}
                  {text && <p className="text-[#2D3748] leading-relaxed text-sm">{text}</p>}
                  {!title && !text && <span className="text-[#2D3748]">{String(item)}</span>}
                </div>
              </li>
            );
          })}
        </ol>
      );
    case "comparison_cards": {
      const rawBlock = block as typeof block & { label?: string };
      return (
        <div className="space-y-3">
          {rawBlock.label && (
            <p className="text-xs font-bold uppercase tracking-wider text-[#556070]">{rawBlock.label}</p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            {block.cards.map((card, i) => {
              const raw = card as typeof card & { highlighted?: boolean; badge?: string };
              const highlighted = raw.highlighted === true || card.variant === "pro";
              const badge = raw.badge;
              return (
                <div key={i} className={cn(
                  "rounded-xl border p-4",
                  highlighted ? "bg-[#EEF3FF] border-[#2563FF]/30"
                    : card.variant === "con" ? "bg-red-50 border-red-200"
                    : "bg-[#F4F6FA] border-[#C8C3BA]/50",
                )}>
                  <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                    <div className={cn("font-semibold text-sm",
                      highlighted ? "text-[#2563FF]"
                        : card.variant === "con" ? "text-red-700"
                        : "text-[#0D1220]",
                    )}>
                      {card.title}
                    </div>
                    {badge && (
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        highlighted ? "bg-[#2563FF] text-white" : "bg-[#C8C3BA]/40 text-[#556070]",
                      )}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#2D3748]">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0 opacity-60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    case "tool_box": {
      const raw = block as typeof block & { tool_name?: string; cta_url?: string; cta_text?: string; note?: string };
      const toolName = block.toolName ?? raw.tool_name ?? "Tool";
      const url = block.url ?? raw.cta_url;
      const ctaText = raw.cta_text ?? "Visit site";
      return (
        <div className="rounded-xl bg-[#F4F6FA] border border-[#C8C3BA]/60 p-4 flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#2563FF]/10 border border-[#2563FF]/20 flex items-center justify-center shrink-0">
            <ExternalLink className="h-4 w-4 text-[#2563FF]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[#0D1220] text-sm">{toolName}</div>
            <p className="text-[#556070] text-sm mt-0.5">{block.description ?? ""}</p>
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#2563FF] text-sm font-medium mt-2 hover:underline">
                {ctaText}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {raw.note && <p className="text-[10px] text-[#888] mt-2 leading-relaxed">{raw.note}</p>}
          </div>
        </div>
      );
    }
    case "cta_box": {
      const raw = block as typeof block & { heading?: string; text?: string; button_text?: string; button_url?: string };
      return (
        <div className="rounded-xl bg-[#2563FF]/5 border-2 border-[#2563FF]/20 p-5 text-center">
          <div className="font-bold text-[#0D1220] text-lg mb-1">
            {block.headline ?? raw.heading ?? "Learn more"}
          </div>
          <p className="text-[#556070] text-sm mb-4">
            {block.description ?? raw.text ?? ""}
          </p>
          <a href={block.buttonUrl ?? raw.button_url ?? "#"}
            className="inline-flex items-center gap-2 bg-[#2563FF] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1D50D9] transition-colors">
            {block.buttonText ?? raw.button_text ?? "Continue"}
          </a>
        </div>
      );
    }
    case "code_block":
      return (
        <div className="rounded-xl bg-[#0D1220] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <span className="text-[#556070] text-xs font-mono">{block.language ?? "code"}</span>
            <CopyButton text={block.code} size="sm" label="Copy code" />
          </div>
          <pre className="p-4 overflow-x-auto text-sm">
            <code className="text-[#E2E8F0] font-mono leading-relaxed">{block.code}</code>
          </pre>
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-[#2563FF] pl-4 py-1">
          <p className="text-[#2D3748] italic text-[1.05rem] leading-relaxed">"{block.text}"</p>
          {block.author && <cite className="text-[#556070] text-sm not-italic mt-1 block">— {block.author}</cite>}
        </blockquote>
      );
    default:
      return null;
  }
}
function CalloutBlock({ block }: { block: Extract<ContentBlock, { type: "callout" }> }) {
  const raw = block as typeof block & { style?: "info" | "warning" | "tip" | "success" };
  const variant = block.variant ?? raw.style ?? "info";
  const configs = {
    info: { icon: Info, bg: "bg-blue-50", border: "border-blue-200", icon_color: "text-blue-500", text_color: "text-blue-900" },
    warning: { icon: AlertTriangle, bg: "bg-amber-50", border: "border-amber-200", icon_color: "text-amber-500", text_color: "text-amber-900" },
    tip: { icon: Lightbulb, bg: "bg-emerald-50", border: "border-emerald-200", icon_color: "text-emerald-500", text_color: "text-emerald-900" },
    success: { icon: CheckCircle2, bg: "bg-green-50", border: "border-green-200", icon_color: "text-green-600", text_color: "text-green-900" },
  };
  const { icon: Icon, bg, border, icon_color, text_color } = configs[variant] ?? configs.info;
  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-4", bg, border)}>
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", icon_color)} />
      <p className={cn("text-sm leading-relaxed", text_color)}>{block.text}</p>
    </div>
  );
}
