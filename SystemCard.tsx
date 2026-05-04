import { Download, type LucideIcon } from "lucide-react";

interface AssetCardProps {
  icon: LucideIcon;
  title: string;
  type: string;
  count: number;
}

export function AssetCard({ icon: Icon, title, type, count }: AssetCardProps) {
  return (
    <article className="glass-card glass-card-hover rounded-2xl p-5 flex items-center gap-4 group">
      <div className="h-12 w-12 rounded-xl bg-gradient-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-glow">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{type}</div>
        <h4 className="font-medium truncate">{title}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">{count} files</p>
      </div>
      <button
        aria-label={`Download ${title}`}
        className="h-9 w-9 rounded-lg border border-border bg-surface/60 hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all flex items-center justify-center"
      >
        <Download className="h-4 w-4" />
      </button>
    </article>
  );
}
