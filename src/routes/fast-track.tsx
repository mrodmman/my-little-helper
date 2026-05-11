import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { getAuthUser } from "@/rpc/auth";
import { useState } from "react";
import { ArrowLeft, Rocket, CheckCircle2, ChevronRight, ChevronDown } from "lucide-react";
import { FAST_TRACK, type FastTrackTile } from "@/data/fastTrack";
import { MODULES } from "@/data/courseMeta";

export const Route = createFileRoute("/fast-track")({
  beforeLoad: async () => {
    const user = await getAuthUser();
    if (!user) throw redirect({ to: "/login" });
    return { user };
  },
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

// ─── Platform config (shared with Calendar30) ─────────────────────────────────

const P = {
  tiktok: {
    label: "TikTok Shop",
    dot: "bg-pink-500",
    pill: "text-pink-400 border-pink-500/30 bg-pink-500/10",
  },
  amazon: {
    label: "Amazon",
    dot: "bg-amber-400",
    pill: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  bonus: {
    label: "Bonus",
    dot: "bg-emerald-400",
    pill: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
} as const;
type Platform = keyof typeof P;

// ─── 30-day calendar data ─────────────────────────────────────────────────────
// Each day: tiktok strategy index, amazon strategy index, bonus { platform, index }
// TikTok: 12 strategies (indices 0–11)  Amazon: 15 strategies (indices 0–14)

type DayDef = {
  t: number; // TikTok strategy index
  a: number; // Amazon strategy index
  b: { platform: "tiktok" | "amazon"; idx: number }; // bonus slot
};

const DAYS_DEF: DayDef[] = [
  // Week 1 — Foundation (1-7)
  { t: 0,  a: 5,  b: { platform: "amazon",  idx: 9  } }, // 1
  { t: 2,  a: 3,  b: { platform: "tiktok",  idx: 10 } }, // 2
  { t: 8,  a: 2,  b: { platform: "tiktok",  idx: 9  } }, // 3
  { t: 1,  a: 10, b: { platform: "amazon",  idx: 11 } }, // 4
  { t: 7,  a: 14, b: { platform: "tiktok",  idx: 3  } }, // 5
  { t: 6,  a: 12, b: { platform: "amazon",  idx: 13 } }, // 6
  { t: 4,  a: 7,  b: { platform: "tiktok",  idx: 11 } }, // 7
  // Week 2 — Momentum (8-14)
  { t: 5,  a: 0,  b: { platform: "amazon",  idx: 1  } }, // 8
  { t: 10, a: 4,  b: { platform: "tiktok",  idx: 8  } }, // 9
  { t: 9,  a: 6,  b: { platform: "amazon",  idx: 2  } }, // 10
  { t: 11, a: 8,  b: { platform: "tiktok",  idx: 0  } }, // 11
  { t: 3,  a: 11, b: { platform: "amazon",  idx: 10 } }, // 12
  { t: 1,  a: 12, b: { platform: "tiktok",  idx: 6  } }, // 13
  { t: 7,  a: 13, b: { platform: "amazon",  idx: 14 } }, // 14
  // Week 3 — Double Down (15-21)
  { t: 2,  a: 5,  b: { platform: "tiktok",  idx: 4  } }, // 15
  { t: 8,  a: 3,  b: { platform: "amazon",  idx: 9  } }, // 16
  { t: 0,  a: 0,  b: { platform: "tiktok",  idx: 11 } }, // 17
  { t: 6,  a: 2,  b: { platform: "amazon",  idx: 7  } }, // 18
  { t: 10, a: 14, b: { platform: "tiktok",  idx: 9  } }, // 19
  { t: 4,  a: 11, b: { platform: "amazon",  idx: 12 } }, // 20
  { t: 1,  a: 6,  b: { platform: "tiktok",  idx: 7  } }, // 21
  // Week 4 — Scale Up (22-28)
  { t: 5,  a: 13, b: { platform: "amazon",  idx: 4  } }, // 22
  { t: 3,  a: 1,  b: { platform: "tiktok",  idx: 2  } }, // 23
  { t: 11, a: 10, b: { platform: "amazon",  idx: 8  } }, // 24
  { t: 9,  a: 7,  b: { platform: "tiktok",  idx: 0  } }, // 25
  { t: 7,  a: 5,  b: { platform: "amazon",  idx: 11 } }, // 26
  { t: 2,  a: 12, b: { platform: "tiktok",  idx: 10 } }, // 27
  { t: 8,  a: 0,  b: { platform: "amazon",  idx: 13 } }, // 28
  // Finish Strong (29-30)
  { t: 6,  a: 14, b: { platform: "tiktok",  idx: 4  } }, // 29
  { t: 11, a: 2,  b: { platform: "amazon",  idx: 9  } }, // 30
];

const WEEK_LABELS = [
  { start: 1,  end: 7,  label: "Week 1",  sub: "Foundation"  },
  { start: 8,  end: 14, label: "Week 2",  sub: "Momentum"    },
  { start: 15, end: 21, label: "Week 3",  sub: "Double Down" },
  { start: 22, end: 28, label: "Week 4",  sub: "Scale Up"    },
  { start: 29, end: 30, label: "Days 29–30", sub: "Finish Strong" },
];

// ─── Calendar30 component ─────────────────────────────────────────────────────

function Calendar30() {
  const tiktokTile = FAST_TRACK.find((t) => t.id === "tiktok-shop");
  const amazonTile = FAST_TRACK.find((t) => t.id === "amazon-curation");
  const tStrategies = tiktokTile?.items ?? [];
  const aStrategies = amazonTile?.items ?? [];

  return (
    <div className="mt-5 space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {(Object.entries(P) as [Platform, typeof P[Platform]][]).map(([key, cfg]) => (
          <span key={key} className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        ))}
        <span className="text-xs text-muted-foreground">· Bonus = extra play, either platform</span>
      </div>

      {/* Weekly blocks */}
      {WEEK_LABELS.map((week) => {
        const weekDays = DAYS_DEF.slice(week.start - 1, week.end);
        return (
          <div key={week.label}>
            {/* Week header */}
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                {week.label}
              </span>
              <span className="text-xs text-muted-foreground">{week.sub}</span>
            </div>

            {/* Day cards row (horizontal scroll) */}
            <div className="overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6 pb-1">
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${weekDays.length}, minmax(160px, 1fr))`,
                  minWidth: `${weekDays.length * 168}px`,
                }}
              >
                {weekDays.map((def, i) => {
                  const dayNum = week.start + i;
                  const tStrat = tStrategies[def.t];
                  const aStrat = aStrategies[def.a];
                  const bStrat =
                    def.b.platform === "tiktok"
                      ? tStrategies[def.b.idx]
                      : aStrategies[def.b.idx];

                  return (
                    <DayCard
                      key={dayNum}
                      dayNum={dayNum}
                      slots={[
                        { platform: "tiktok", title: tStrat?.title ?? "—" },
                        { platform: "amazon", title: aStrat?.title ?? "—" },
                        { platform: "bonus", title: bStrat?.title ?? "—" },
                      ]}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Footer tip */}
      <div className="rounded-xl border border-border bg-surface/40 px-4 py-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Tip:</span> Batch-record every 3 days, then schedule daily posts. Track what got clicks or saves — reuse those winners in weeks 3 and 4.
      </div>
    </div>
  );
}

function DayCard({
  dayNum,
  slots,
}: {
  dayNum: number;
  slots: { platform: Platform; title: string }[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="glass-card rounded-xl border border-border overflow-hidden flex flex-col hover:border-primary/40 transition-colors"
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((o) => !o)}
        className="flex items-center gap-2 px-3 pt-2.5 pb-2 text-left w-full"
        aria-expanded={expanded}
      >
        <span className="text-xl font-bold leading-none text-foreground tabular-nums w-7 shrink-0">
          {dayNum}
        </span>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {slots.map((s) => (
            <span
              key={s.platform}
              className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] border rounded-full px-2 py-0.5 truncate ${P[s.platform].pill}`}
            >
              <span className={`h-1 w-1 rounded-full shrink-0 ${P[s.platform].dot}`} />
              <span className="truncate">{s.title}</span>
            </span>
          ))}
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform ${expanded ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {/* Expanded: show strategy bodies */}
      {expanded && (
        <div className="border-t border-border/60 divide-y divide-border/40">
          {slots.map((s) => {
            const tiktokTile = FAST_TRACK.find((t) => t.id === "tiktok-shop");
            const amazonTile = FAST_TRACK.find((t) => t.id === "amazon-curation");
            const items =
              s.platform === "tiktok" || s.platform === "bonus"
                ? [...(tiktokTile?.items ?? []), ...(amazonTile?.items ?? [])]
                : amazonTile?.items ?? [];
            const match =
              s.platform === "amazon"
                ? amazonTile?.items?.find((it) => it.title === s.title)
                : [...(tiktokTile?.items ?? []), ...(amazonTile?.items ?? [])].find(
                    (it) => it.title === s.title,
                  );

            return (
              <div key={s.platform} className="px-3 py-2">
                <div className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] border rounded-full px-2 py-0.5 mb-1.5 ${P[s.platform].pill}`}>
                  <span className={`h-1 w-1 rounded-full ${P[s.platform].dot}`} />
                  {P[s.platform].label}
                </div>
                <div className="text-[11px] font-semibold text-foreground mb-1">{s.title}</div>
                {match?.body && (
                  <div className="text-[10px] text-muted-foreground leading-[1.5]">{match.body}</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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
          <Link to="/vault" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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

// ─── Tile ─────────────────────────────────────────────────────────────────────

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

          {/* 30-day calendar — replaces bullets for this tile */}
          {tile.calendar30 && <Calendar30 />}

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

// ─── SubItem ──────────────────────────────────────────────────────────────────

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
