import { ArrowRight, type LucideIcon } from "lucide-react";

interface SystemCardProps {
  image: string;
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  status: "New" | "In Progress" | "Completed" | "Locked";
}

const statusStyles: Record<SystemCardProps["status"], string> = {
  New: "bg-primary/15 text-primary border-primary/30",
  "In Progress": "bg-accent/15 text-accent-foreground border-accent/40",
  Completed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  Locked: "bg-muted text-muted-foreground border-border",
};

export function SystemCard({ image, icon: Icon, title, description, progress, status }: SystemCardProps) {
  return (
    <article className="glass-card glass-card-hover border-glow rounded-2xl overflow-hidden group flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute top-4 left-4 h-10 w-10 rounded-xl bg-background/60 backdrop-blur border border-border flex items-center justify-center shadow-glow">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className={`absolute top-4 right-4 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border ${statusStyles[status]}`}>
          {status}
        </span>
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{description}</p>
        </div>

        <div className="mt-auto space-y-3">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span className="text-foreground font-medium">{progress}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated hover:border-primary/40 transition-all py-2.5 text-sm font-medium group/btn">
            View System
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
