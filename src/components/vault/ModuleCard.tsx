import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";

interface ModuleCardProps {
  id: string;
  image: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  tagline: string;
  lessonCount: number;
  completedLessons?: number;
  totalLessons?: number;
}

export function ModuleCard({
  id, image, icon: Icon, title, subtitle, tagline, lessonCount,
  completedLessons = 0, totalLessons,
}: ModuleCardProps) {
  const total = totalLessons ?? lessonCount;
  const pct = total > 0 ? Math.round((completedLessons / total) * 100) : 0;
  const isComplete = pct >= 100;

  return (
    <Link
      to="/module/$moduleId"
      params={{ moduleId: id }}
      className="glass-card glass-card-hover border-glow rounded-2xl overflow-hidden group flex flex-col focus:outline-none focus:ring-2 focus:ring-primary/40"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-4 left-4 h-10 w-10 rounded-xl bg-background/60 backdrop-blur border border-border flex items-center justify-center shadow-glow">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-border bg-background/60 backdrop-blur text-muted-foreground">
          {lessonCount} lessons
        </span>
        <div className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
          {title}
        </div>
        {isComplete && (
          <div className="absolute bottom-3 right-4">
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-lg font-semibold tracking-tight leading-snug">{subtitle}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{tagline}</p>

        {/* Progress bar */}
        <div className="mt-1">
          <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
            <span>{completedLessons}/{total} lessons</span>
            {pct > 0 && <span className="text-primary font-medium">{pct}%</span>}
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-primary rounded-full transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-auto pt-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
          {isComplete ? "Review Module" : completedLessons > 0 ? "Continue" : "Open Module"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}
