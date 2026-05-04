import { Link } from "@tanstack/react-router";
import { Rocket, ChevronRight, Clock } from "lucide-react";

export function FastTrackSection() {
  return (
    <section id="fast-track" className="scroll-mt-20">
      <div className="relative rounded-3xl overflow-hidden border-glow glass-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 mb-4">
              <Rocket className="h-3.5 w-3.5" /> Fast Track · Shortcut
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Overwhelmed? <span className="text-gradient">Take the shortcut.</span>
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              A mini-course of bite-sized tiles. Open one at a time, take action, build momentum.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> Designed to get you moving today
            </div>
          </div>
          <Link
            to="/fast-track"
            className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 transition-opacity shrink-0"
          >
            Open Fast Track <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
