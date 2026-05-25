/**
 * FastRouteBox — reusable affiliate/tool shortcut component.
 * Appears in article sidebars and optionally inline.
 */
import { Zap, ExternalLink } from "lucide-react";

interface FastRouteBoxProps {
  toolName: string;
  description: string;
  affiliateUrl: string;
  buttonText?: string;
  disclosureText?: string;
  headingOverride?: string;
}

export function FastRouteBox({
  toolName,
  description,
  affiliateUrl,
  buttonText = "Try It Free",
  disclosureText = "Some links may be affiliate links. You pay the same; I may earn a small commission.",
  headingOverride,
}: FastRouteBoxProps) {
  return (
    <div className="rounded-xl bg-[#F4F6FA] border border-[#C8C3BA]/60 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-lg bg-[#2563FF]/10 border border-[#2563FF]/20 flex items-center justify-center">
          <Zap className="h-3.5 w-3.5 text-[#2563FF]" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#556070]">
          {headingOverride ?? "Fast Route"}
        </span>
      </div>

      <div className="font-semibold text-[#0D1220] text-sm mb-1">{toolName}</div>
      <p className="text-[#556070] text-xs leading-relaxed mb-3">{description}</p>

      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex items-center justify-center gap-2 w-full bg-[#2563FF] text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-[#1D50D9] transition-colors"
      >
        {buttonText}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>

      <p className="text-[10px] text-[#888] mt-2 leading-relaxed">
        {disclosureText}
      </p>
    </div>
  );
}
