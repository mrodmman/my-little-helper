import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Rocket, CheckCircle2, ChevronRight, ChevronDown } from "lucide-react";
import { FAST_TRACK, type FastTrackTile } from "@/data/fastTrack";
import { MODULES } from "@/data/courseMeta";

export const Route = createFileRoute("/fast-track")({
  component: FastTrackPage,
  head: () => ({
    meta: [
      { title: "Fast Track — The Kraken Vault" },
      { name: "description", content: "The shortcut path. Bite-sized tiles, simple actions, momentum today — without the overwhelm." },
      { property: "og:title", content: "Fast Track — The Kraken Vault" },
      { property: "og:description", content: "The shortcut path. Bite-sized tiles, simple actions, momentum today." },
    ],
  }),
});

function FastTrackPage() {
  const firstModule = MODULES[0];
  const [open, setOpen] = useState<Record<string, boolean>>(() => ({
    [FAST_TRACK[0].id]: true,
  }));

  const toggle = (id: string) =>
    setOpen((s) => ({ ...s, [id]: !s[id] }));

  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> The Vault
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:block">
            Fast Track
          </div>
        </div>
      </header>

      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 mb-6">
            <Rocket className="h-3.5 w-3.5" /> Fast Track · Shortcut Path
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Skip the overwhelm. <span className="text-gradient">Ship today.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Open a tile, take the action, close it, move on. No theory — just the next move.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        <div className="space-y-4">
          {FAST_TRACK.map((tile) => (
            <Tile
              key={tile.id}
              tile={tile}
              isOpen={!!open[tile.id]}
              onToggle={() => toggle(tile.id)}
            />
          ))}
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

function Tile({
  tile,
  isOpen,
  onToggle,
}: {
  tile: FastTrackTile;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = tile.icon;
  return (
    <article
      id={tile.id}
      className="glass-card rounded-2xl overflow-hidden border border-border transition-colors hover:border-primary/40 scroll-mt-24"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
      >
        <div className="h-12 w-12 rounded-xl bg-gradient-primary/20 border border-primary/40 flex items-center justify-center shadow-glow shrink-0">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {tile.emoji}
          </div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight truncate">
            {tile.title}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
            {tile.tagline}
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-5 md:px-6 pb-6 pt-1 border-t border-border/60">
          {tile.intro && (
            <p className="text-sm text-muted-foreground mt-4 whitespace-pre-line">{tile.intro}</p>
          )}

          {tile.bullets && (
            <ul className="mt-4 space-y-2">
              {tile.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {tile.items && (
            <div className="mt-4 space-y-2">
              {tile.items.map((item) => (
                <SubItem key={item.title} title={item.title} body={item.body} bullets={item.bullets} />
              ))}
            </div>
          )}

          {tile.closer && (
            <div className="mt-5 text-sm font-medium text-primary">
              👉 {tile.closer}
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function SubItem({
  title,
  body,
  bullets,
}: {
  title: string;
  body?: string;
  bullets?: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-surface/40 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-3 text-left hover:bg-surface-elevated transition-colors"
      >
        <div className="flex-1 text-sm font-semibold">{title}</div>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${
            open ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-3 pb-3 pt-1 text-sm text-muted-foreground space-y-2">
          {body && <p>{body}</p>}
          {bullets && (
            <ul className="space-y-1.5">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
