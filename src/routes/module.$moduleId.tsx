import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronDown, BookOpen, CheckCircle2, Circle, Zap, Sparkles } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { MODULES, getModule, type Section } from "@/data/courseMeta";
import { LessonRenderer } from "@/components/vault/LessonRenderer";
import { AssetList } from "@/components/vault/AssetList";
import { getLessonAssets } from "@/data/assets";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/module/$moduleId")({
  component: ModulePage,
  loader: ({ params }) => {
    const mod = getModule(params.moduleId);
    if (!mod) throw notFound();
    return { moduleId: params.moduleId };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-3xl font-bold mb-3">Module not found</h1>
        <Link to="/" className="text-primary hover:underline">Back to The Vault</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-2xl font-bold mb-3">Something broke</h1>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  head: ({ loaderData }) => {
    const m = loaderData ? getModule(loaderData.moduleId) : undefined;
    return {
      meta: [
        { title: m ? `${m.title}: ${m.subtitle} — Kraken Vault` : "Module — Kraken Vault" },
        { name: "description", content: m?.tagline ?? "" },
      ],
    };
  },
});

function ModulePage() {
  const { moduleId } = Route.useLoaderData();
  const mod = getModule(moduleId)!;
  const Icon = mod.icon;

  const lessons = useMemo(
    () => mod.sections.filter((s: Section) => s.content.trim().length > 0),
    [mod],
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const active = lessons[activeIdx];

  // Persist progress per module in localStorage
  const storageKey = `vault:progress:${mod.id}`;
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [lessonsOpen, setLessonsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch { /* noop */ }
  }, [storageKey]);

  const toggleComplete = (i: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  };

  const progress = lessons.length ? Math.round((completed.size / lessons.length) * 100) : 0;
  const prevMod = MODULES[mod.index - 1];
  const nextMod = MODULES[mod.index + 1];

  // View mode: "guided" = step-by-step, "full" = power user (everything expanded)
  const modeKey = "vault:viewMode";
  const [mode, setMode] = useState<"guided" | "full">("guided");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(modeKey);
      if (saved === "guided" || saved === "full") setMode(saved);
    } catch { /* noop */ }
  }, []);
  const setModePersist = (m: "guided" | "full") => {
    setMode(m);
    try { localStorage.setItem(modeKey, m); } catch { /* noop */ }
  };

  // Scroll to top on lesson switch
  useEffect(() => {
    document.getElementById("lesson-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeIdx]);

  return (
    <div className="min-h-screen text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> The Vault
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground hidden sm:block">
            {mod.title} · {progress}% complete
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <img src={mod.image} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
            {mod.title}
          </div>
          <div className="flex items-start gap-5">
            <div className="hidden md:flex h-16 w-16 rounded-2xl bg-gradient-primary/20 border border-primary/40 items-center justify-center shadow-glow shrink-0">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                <span className="text-gradient">{mod.subtitle}</span>
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">{mod.tagline}</p>

              {/* Progress */}
              <div className="mt-6 max-w-md">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>{completed.size} of {lessons.length} lessons complete</span>
                  <span className="text-foreground font-medium">{progress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fast Track bail-out */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link
          to="/fast-track"
          className="group flex flex-wrap items-center gap-4 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4 hover:border-primary/60 transition-all"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">Feeling overwhelmed? Take the Fast Track.</div>
            <div className="text-xs text-muted-foreground">Skip ahead to the 6-tile shortcut and get results going faster.</div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Bail to Fast Track <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>

      {/* Body */}
      <main id="lesson-top" className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-[300px_1fr] gap-10">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="glass-card rounded-2xl p-3">
            <button
              onClick={() => setLessonsOpen((v) => !v)}
              className="w-full px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors"
              aria-expanded={lessonsOpen}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="flex-1 text-left">Lessons</span>
              <span className="normal-case tracking-normal text-muted-foreground/70">
                {activeIdx + 1}/{lessons.length}
              </span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", lessonsOpen && "rotate-180")} />
            </button>
            {lessonsOpen && (
              <ol className="space-y-1 mt-1">
                {lessons.map((s: Section, i: number) => {
                  const isActive = i === activeIdx;
                  const isDone = completed.has(i);
                  return (
                    <li key={s.title}>
                      <button
                        onClick={() => setActiveIdx(i)}
                        className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                          isActive
                            ? "bg-gradient-primary/15 border border-primary/30 text-foreground"
                            : "border border-transparent hover:bg-surface/60 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="mt-0.5 shrink-0">
                          {isDone
                            ? <CheckCircle2 className="h-4 w-4 text-primary" />
                            : <Circle className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground/50"}`} />}
                        </span>
                        <span className="flex-1 min-w-0">
                          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                            Lesson {String(i + 1).padStart(2, "0")}
                          </div>
                          <div className="leading-snug">{s.title}</div>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </aside>

        {/* Lesson content */}
        <article className="min-w-0">
          {active && (
            <div className="glass-card rounded-3xl p-6 md:p-10 border-glow">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div className="text-xs uppercase tracking-[0.25em] text-primary">
                  Lesson {String(activeIdx + 1).padStart(2, "0")} of {lessons.length}
                </div>
                {/* Guided / Power user toggle */}
                <div className="inline-flex items-center rounded-xl border border-border bg-surface/60 p-1 text-xs">
                  <button
                    onClick={() => setModePersist("guided")}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all",
                      mode === "guided"
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Guided
                  </button>
                  <button
                    onClick={() => setModePersist("full")}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all",
                      mode === "full"
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Zap className="h-3.5 w-3.5" /> Show me everything
                  </button>
                </div>
              </div>
              {/* Fast Track shortcut — above the title */}
              <div className="mt-4 mb-4 flex justify-center">
                <Link
                  to="/fast-track"
                  className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-gradient-primary/10 hover:bg-gradient-primary/20 px-4 py-2 text-xs font-semibold text-primary transition-all"
                >
                  <Zap className="h-3.5 w-3.5" />
                  Show me the Fast Track instead
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{active.title}</h2>

              {mode === "guided" && (
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  One step at a time. Check off as you go — the next step appears when you're ready.
                </p>
              )}

              <div className="mt-6">
                <LessonRenderer
                  lessonKey={`vault:lesson:${mod.id}:${activeIdx}`}
                  content={active.content}
                  mode={mode}
                  onCompleteAll={() => {
                    if (!completed.has(activeIdx)) toggleComplete(activeIdx);
                  }}
                />
              </div>

              <AssetList assets={getLessonAssets(mod.id, activeIdx)} />

              {progress === 100 && (
                <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/10 p-4">
                  <div className="text-sm font-semibold mb-3">Module complete. Keep your momentum.</div>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border border-border bg-surface/60 hover:bg-surface-elevated"
                    >
                      <ArrowLeft className="h-4 w-4" /> Back to The Vault
                    </Link>
                    {nextMod && (
                      <Link
                        to="/module/$moduleId"
                        params={{ moduleId: nextMod.id }}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-gradient-primary text-primary-foreground shadow-glow"
                      >
                        Next Module <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              )}

              {/* Lesson footer actions */}
              <div className="mt-10 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => toggleComplete(activeIdx)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${
                    completed.has(activeIdx)
                      ? "bg-primary/15 border-primary/40 text-primary"
                      : "bg-surface/60 border-border hover:border-primary/40"
                  }`}
                >
                  {completed.has(activeIdx)
                    ? <><CheckCircle2 className="h-4 w-4" /> Lesson complete</>
                    : <><Circle className="h-4 w-4" /> Mark as complete</>}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    disabled={activeIdx === 0}
                    onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border border-border bg-surface/60 hover:bg-surface-elevated disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <button
                    disabled={activeIdx === lessons.length - 1}
                    onClick={() => {
                      if (!completed.has(activeIdx)) toggleComplete(activeIdx);
                      setActiveIdx((i) => Math.min(lessons.length - 1, i + 1));
                    }}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-gradient-primary text-primary-foreground shadow-glow disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next Lesson <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Module nav */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {prevMod ? (
              <Link
                to="/module/$moduleId"
                params={{ moduleId: prevMod.id }}
                className="glass-card glass-card-hover rounded-2xl p-5 group"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-2">
                  <ChevronLeft className="h-3 w-3" /> Previous module
                </div>
                <div className="font-semibold">{prevMod.title}: {prevMod.subtitle}</div>
              </Link>
            ) : <div />}
            {nextMod && (
              <Link
                to="/module/$moduleId"
                params={{ moduleId: nextMod.id }}
                className="glass-card glass-card-hover rounded-2xl p-5 group sm:text-right"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 flex items-center gap-2 sm:justify-end">
                  Next module <ChevronRight className="h-3 w-3" />
                </div>
                <div className="font-semibold">{nextMod.title}: {nextMod.subtitle}</div>
              </Link>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
