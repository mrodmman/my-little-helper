import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock, Rocket, CheckCircle2, ChevronRight } from "lucide-react";
import { FAST_TRACK } from "@/data/fastTrack";
import { MODULES } from "@/data/courseMeta";

export const Route = createFileRoute("/fast-track")({
  component: FastTrackPage,
  head: () => ({
    meta: [
      { title: "Fast Track — The Kraken Vault" },
      { name: "description", content: "The shortcut path. 6 tiles, one afternoon, your first dollar online — without the overwhelm." },
      { property: "og:title", content: "Fast Track — The Kraken Vault" },
      { property: "og:description", content: "The shortcut path. 6 tiles, one afternoon, your first dollar online." },
    ],
  }),
});

function FastTrackPage() {
  const totalTime = "≈ 2.5 hrs";
  const firstModule = MODULES[0];

  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> The Vault
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:block">
            Fast Track · {totalTime}
          </div>
        </div>
      </header>

      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 mb-6">
            <Rocket className="h-3.5 w-3.5" /> Fast Track · Shortcut Path
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Skip the overwhelm. <span className="text-gradient">Ship today.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            6 tiles. One afternoon. The minimum viable system to get your first results — then come back to the full vault when you're hungry for more.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" /> Total time: {totalTime}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FAST_TRACK.map((t) => {
            const Icon = t.icon;
            return (
              <article
                key={t.id}
                className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Step {String(t.step).padStart(2, "0")}
                </div>
                <div className="h-12 w-12 rounded-xl bg-gradient-primary/20 border border-primary/40 flex items-center justify-center shadow-glow mb-5">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">{t.title}</h2>
                <p className="text-sm text-muted-foreground mt-1.5">{t.tagline}</p>

                <ul className="mt-5 space-y-2">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {t.time}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-16 glass-card rounded-3xl p-8 md:p-12 text-center border-glow">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Done with the shortcut?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Now go deeper. The full vault has the playbooks, swipe files and systems that turn this into a real machine.
          </p>
          <Link
            to="/module/$moduleId"
            params={{ moduleId: firstModule.id }}
            className="mt-6 inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 transition-opacity"
          >
            Enter the full vault <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
