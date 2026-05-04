import { useEffect, useMemo, useState } from "react";
import { ChevronDown, CheckCircle2, Circle, Lock } from "lucide-react";
import { Prose } from "./Prose";
import { cn } from "@/lib/utils";

type Step = { id: string; body: string; label: string };
type Section = { id: string; title: string; intro: string; steps: Step[] };
type Parsed = { intro: string; sections: Section[] };

function slug(s: string, i: number) {
  return (s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `s-${i}`).slice(0, 60);
}

/**
 * Parse a lesson's markdown into:
 *   - intro:        markdown before the first ### heading
 *   - sections:     each ### heading becomes a collapsible
 *   - steps:        within a section, paragraphs starting with **Step N:** become
 *                   a progressive checklist (one revealed at a time).
 */
function parseLesson(md: string): Parsed {
  const parts = md.split(/^###\s+/m);
  const intro = parts[0].trim();
  const sections: Section[] = parts.slice(1).map((part, i) => {
    const nl = part.indexOf("\n");
    const titleRaw = (nl === -1 ? part : part.slice(0, nl)).trim();
    const body = (nl === -1 ? "" : part.slice(nl + 1)).trim();
    const title = titleRaw.replace(/^\*+|\*+$/g, "").trim();

    // Split body on **Step N:** boundaries
    const stepRe = /(?=^\*\*Step\s+\d+[:.]?\*\*)/im;
    const blocks = body.split(stepRe);
    const head = blocks[0].trim();
    const stepBlocks = blocks.slice(1);

    if (stepBlocks.length === 0) {
      return { id: slug(title, i), title, intro: head, steps: [] };
    }

    const steps: Step[] = stepBlocks.map((b, j) => {
      const m = b.match(/^\*\*(Step\s+\d+[:.]?)\*\*\s*/i);
      const label = m ? m[1].replace(/[:.]$/, "") : `Step ${j + 1}`;
      const body = b.replace(/^\*\*Step\s+\d+[:.]?\*\*\s*/i, "").trim();
      return { id: `step-${j + 1}`, label, body };
    });

    return { id: slug(title, i), title, intro: head, steps };
  });

  return { intro, sections };
}

export function LessonRenderer({
  lessonKey,
  content,
  mode,
  onCompleteAll,
}: {
  lessonKey: string;       // unique storage key per lesson
  content: string;
  mode: "guided" | "full";
  onCompleteAll?: () => void;
}) {
  const parsed = useMemo(() => parseLesson(content), [content]);

  if (mode === "full" || parsed.sections.length === 0) {
    return <Prose>{content}</Prose>;
  }

  return (
    <div className="space-y-4">
      {parsed.intro && <Prose>{parsed.intro}</Prose>}
      {parsed.sections.map((s, i) => (
        <SectionBlock
          key={s.id}
          section={s}
          storageKey={`${lessonKey}:${s.id}`}
          defaultOpen={i === 0}
          onCompleteAll={
            i === parsed.sections.length - 1 ? onCompleteAll : undefined
          }
        />
      ))}
    </div>
  );
}

function SectionBlock({
  section,
  storageKey,
  defaultOpen,
  onCompleteAll,
}: {
  section: Section;
  storageKey: string;
  defaultOpen: boolean;
  onCompleteAll?: () => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setDone(new Set(JSON.parse(raw)));
    } catch { /* noop */ }
  }, [storageKey]);

  const persist = (next: Set<string>) => {
    try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch { /* noop */ }
  };

  const toggle = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      persist(next);
      if (
        onCompleteAll &&
        section.steps.length > 0 &&
        section.steps.every((s) => next.has(s.id))
      ) onCompleteAll();
      return next;
    });
  };

  const total = section.steps.length;
  const completed = section.steps.filter((s) => done.has(s.id)).length;
  // Progressive reveal: show steps up to and including the first not-done one
  const firstUndoneIdx = section.steps.findIndex((s) => !done.has(s.id));
  const revealUpTo = firstUndoneIdx === -1 ? total - 1 : firstUndoneIdx;

  return (
    <div className="glass-card rounded-2xl border border-border/60 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 md:p-5 text-left hover:bg-surface/40 transition-colors"
      >
        {total > 0 ? (
          <span
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors",
              completed === total
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-surface/60 border-border text-muted-foreground",
            )}
          >
            {completed === total
              ? <CheckCircle2 className="h-4 w-4" />
              : <span className="text-xs font-semibold">{total}</span>}
          </span>
        ) : (
          <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary">
            Read
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold leading-snug">{section.title}</div>
          {total > 0 && (
            <div className="text-xs text-muted-foreground mt-0.5">
              {completed} of {total} steps · {Math.round((completed / total) * 100)}%
            </div>
          )}
        </div>
        <ChevronDown
          className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="px-4 md:px-6 pb-6 pt-1 border-t border-border/50">
          {section.intro && (
            <div className="pt-2">
              <Prose>{section.intro}</Prose>
            </div>
          )}

          {total > 0 && (
            <ol className="mt-4 space-y-3">
              {section.steps.map((step, i) => {
                const isDone = done.has(step.id);
                const isLocked = i > revealUpTo;
                const isActive = i === revealUpTo && !isDone;

                if (isLocked) {
                  return (
                    <li
                      key={step.id}
                      className="rounded-xl border border-dashed border-border/60 bg-surface/20 p-4 flex items-center gap-3 text-muted-foreground"
                    >
                      <Lock className="h-4 w-4 shrink-0" />
                      <span className="text-sm">
                        {step.label} — unlocks after you finish the previous step
                      </span>
                    </li>
                  );
                }

                return (
                  <li
                    key={step.id}
                    className={cn(
                      "rounded-xl border p-4 md:p-5 transition-all",
                      isDone
                        ? "border-primary/30 bg-primary/5"
                        : isActive
                          ? "border-primary/40 bg-surface/60 shadow-glow"
                          : "border-border bg-surface/40",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggle(step.id)}
                        aria-label={isDone ? "Mark step incomplete" : "Mark step complete"}
                        className="mt-0.5 shrink-0"
                      >
                        {isDone
                          ? <CheckCircle2 className="h-5 w-5 text-primary" />
                          : <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mb-1">
                          {step.label}
                        </div>
                        <Prose>{step.body}</Prose>
                        {isActive && (
                          <button
                            onClick={() => toggle(step.id)}
                            className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold bg-gradient-primary text-primary-foreground shadow-glow"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Done — show next step
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
