import { ExternalLink } from "lucide-react";

interface OfferCardProps {
  category: string;
  title: string;
  useCase: string;
  stage: string;
}

export function OfferCard({ category, title, useCase, stage }: OfferCardProps) {
  return (
    <article className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-primary">{category}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
          {stage}
        </span>
      </div>
      <div>
        <h4 className="text-base font-semibold tracking-tight">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1.5">{useCase}</p>
      </div>
      <button className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity shadow-glow">
        Open Offer <ExternalLink className="h-4 w-4" />
      </button>
    </article>
  );
}
