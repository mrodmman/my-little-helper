import { Link } from "@tanstack/react-router";
import { Rocket, Clock, ChevronRight } from "lucide-react";
import { FAST_TRACK } from "@/data/fastTrack";

export function FastTrackSection() {
  return (
    <section id="fast-track" className="scroll-mt-20">
      <div className="relative rounded-3xl overflow-hidden border-glow glass-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 mb-4">
                <Rocket className="h-3.5 w-3.5" /> Fast Track · Shortcut
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Overwhelmed? <span className="text-gradient">Take the shortcut.</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                A mini-course in 6 tiles. Get your first result in an afternoon — then come back for the full vault.
              </p>
            </div>
            <Link
              to="/fast-track"
              className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-5 py-3 shadow-glow hover:opacity-95 transition-opacity shrink-0"
            >
              Open Fast Track <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FAST_TRACK.map((t) => {
              const Icon = t.icon;
              return (
                <Link
                  key={t.id}
                  to="/fast-track"
                  hash={t.id}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated hover:border-primary/40 transition-all p-3"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Step {String(t.step).padStart(2, "0")} · {t.time}
                    </div>
                    <div className="text-sm font-semibold truncate">{t.title}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> Total time: ≈ 2.5 hrs · No fluff
          </div>
        </div>
      </div>
    </section>
  );
}
