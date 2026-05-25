/**
 * Renders an array of structured ContentBlock objects into React UI.
 * This is the core content rendering system for Kraken Intel articles.
 */
import { Info, Lightbulb, AlertTriangle, CheckCircle2, ExternalLink, ChevronRight } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import type { ContentBlock } from "@/rpc/intel";
import { cn } from "@/lib/utils";

interface ContentBlockRendererProps {
  blocks: ContentBlock[];
}

export function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <BlockSwitch key={i} block={block} />
      ))}
    </div>
  );
}

function BlockSwitch({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[#2D3748] leading-relaxed text-[1.05rem]">
          {block.text}
        </p>
      );

    case "heading":
      return (
        <h2 className="text-2xl font-bold text-[#0D1220] mt-8 mb-3 leading-tight">
          {block.text}
        </h2>
      );

    case "subheading":
      return (
        <h3 className="text-lg font-semibold text-[#0D1220] mt-6 mb-2">
          {block.text}
        </h3>
      );

    case "divider":
      return <hr className="border-[#C8C3BA]/60 my-6" />;

    case "image":
      return (
        <figure className="rounded-xl overflow-hidden border border-[#C8C3BA]/50">
          <img
            src={block.url}
            alt={block.alt ?? ""}
            className="w-full object-cover"
          />
          {block.caption && (
            <figcaption className="text-xs text-[#556070] text-center py-2 bg-[#F4F6FA]">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return <CalloutBlock block={block} />;

    case "bullet_list":
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[#2D3748]">
              <ChevronRight className="h-4 w-4 text-[#2563FF] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "numbered_steps":
      return (
        <ol className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#2563FF] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span className="text-[#2D3748] leading-relaxed pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      );

    case "comparison_cards":
      return (
        <div className="grid sm:grid-cols-2 gap-4">
          {block.cards.map((card, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border p-4",
                card.variant === "pro"
                  ? "bg-emerald-50 border-emerald-200"
                  : card.variant === "con"
                    ? "bg-red-50 border-red-200"
                    : "bg-[#F4F6FA] border-[#C8C3BA]/50",
              )}
            >
              <div
                className={cn(
                  "font-semibold text-sm mb-3",
                  card.variant === "pro" ? "text-emerald-700" : card.variant === "con" ? "text-red-700" : "text-[#0D1220]",
                )}
              >
                {card.title}
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
          ))}
        </div>
      );

    case "tool_box":
      return (
        <div className="rounded-xl bg-[#F4F6FA] border border-[#C8C3BA]/60 p-4 flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-[#2563FF]/10 border border-[#2563FF]/20 flex items-center justify-center shrink-0">
            <ExternalLink className="h-4 w-4 text-[#2563FF]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[#0D1220] text-sm">{block.toolName}</div>
            <p className="text-[#556070] text-sm mt-0.5">{block.description}</p>
            {block.url && (
              <a
                href={block.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#2563FF] text-sm font-medium mt-2 hover:underline"
              >
                Visit site
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      );

    case "cta_box":
      return (
        <div className="rounded-xl bg-[#2563FF]/5 border-2 border-[#2563FF]/20 p-5 text-center">
          <div className="font-bold text-[#0D1220] text-lg mb-1">{block.headline}</div>
          <p className="text-[#556070] text-sm mb-4">{block.description}</p>
          <a
            href={block.buttonUrl}
            className="inline-flex items-center gap-2 bg-[#2563FF] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#1D50D9] transition-colors"
          >
            {block.buttonText}
          </a>
        </div>
      );

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
          <p className="text-[#2D3748] italic text-[1.05rem] leading-relaxed">
            "{block.text}"
          </p>
          {block.author && (
            <cite className="text-[#556070] text-sm not-italic mt-1 block">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    default:
      return null;
  }
}

function CalloutBlock({
  block,
}: {
  block: Extract<ContentBlock, { type: "callout" }>;
}) {
  const variant = block.variant ?? "info";
  const configs = {
    info: {
      icon: Info,
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon_color: "text-blue-500",
      text_color: "text-blue-900",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon_color: "text-amber-500",
      text_color: "text-amber-900",
    },
    tip: {
      icon: Lightbulb,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon_color: "text-emerald-500",
      text_color: "text-emerald-900",
    },
    success: {
      icon: CheckCircle2,
      bg: "bg-green-50",
      border: "border-green-200",
      icon_color: "text-green-600",
      text_color: "text-green-900",
    },
  };
  const { icon: Icon, bg, border, icon_color, text_color } = configs[variant];

  return (
    <div className={cn("flex items-start gap-3 rounded-xl border p-4", bg, border)}>
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", icon_color)} />
      <p className={cn("text-sm leading-relaxed", text_color)}>{block.text}</p>
    </div>
  );
}
