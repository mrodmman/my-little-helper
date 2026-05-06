/**
 * Admin — Lesson editor for a specific module.
 * Add/edit/delete lessons, drag-and-drop reorder, image uploader for module image.
 */
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useTransition, useRef } from "react";
import {
  ArrowLeft, GripVertical, Plus, Trash2, Check, X, Edit2, Image, ChevronDown, ChevronUp,
} from "lucide-react";
import {
  getModuleWithLessons, upsertLesson, deleteLesson, reorderLessons, updateModuleImageKey,
} from "@/rpc/modules";
import type { DbLesson } from "@/rpc/modules";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/modules/$moduleId")({
  component: LessonEditor,
  loader: async ({ params }) => {
    const data = await getModuleWithLessons({ data: params.moduleId }).catch(() => null);
    if (!data) throw notFound();
    return data;
  },
  notFoundComponent: () => (
    <div className="text-center py-12">
      <p className="text-muted-foreground">Module not found.</p>
      <Link to="/admin/modules" className="text-primary hover:underline mt-2 block">← Back to modules</Link>
    </div>
  ),
});

type DraftLesson = DbLesson & { isNew?: boolean };

function LessonEditor() {
  const { module: mod, lessons: initialLessons } = Route.useLoaderData();
  const [lessons, setLessons] = useState<DraftLesson[]>(initialLessons);
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);

  // Drag-and-drop
  const dragIdx = useRef<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);

  const handleDragStart = (i: number) => { dragIdx.current = i; };
  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    dragOverIdx.current = i;
  };
  const handleDrop = () => {
    const from = dragIdx.current;
    const to = dragOverIdx.current;
    if (from === null || to === null || from === to) return;
    const next = [...lessons];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setLessons(next);
    startTransition(async () => {
      await reorderLessons({ data: next.map((l) => l.id) }).catch(console.error);
    });
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  // Start editing an existing lesson
  const startEdit = (l: DbLesson) => {
    setEditingId(l.id);
    setEditTitle(l.title);
    setEditContent(l.content);
  };

  // Start adding a new lesson
  const startNew = () => {
    setEditingId("new");
    setEditTitle("");
    setEditContent("");
  };

  const cancelEdit = () => { setEditingId(null); };

  const saveLesson = () => {
    if (!editTitle.trim()) return;
    setSaving(true);
    const isNew = editingId === "new";
    const nextIdx = isNew ? lessons.length : lessons.find((l) => l.id === editingId)?.idx ?? 0;

    startTransition(async () => {
      const savedId = await upsertLesson({
        data: {
          id: isNew ? undefined : (editingId as number),
          module_id: mod.id,
          idx: nextIdx,
          title: editTitle,
          content: editContent,
        },
      }).catch(() => null);

      if (savedId) {
        if (isNew) {
          setLessons((prev) => [
            ...prev,
            { id: savedId, module_id: mod.id, idx: nextIdx, title: editTitle, content: editContent },
          ]);
        } else {
          setLessons((prev) =>
            prev.map((l) =>
              l.id === editingId ? { ...l, title: editTitle, content: editContent } : l,
            ),
          );
        }
      }
      setSaving(false);
      setEditingId(null);
    });
  };

  const handleDelete = (l: DbLesson) => {
    if (!confirm(`Delete lesson "${l.title}"?`)) return;
    setLessons((prev) => prev.filter((x) => x.id !== l.id));
    startTransition(async () => {
      await deleteLesson({ data: l.id }).catch(console.error);
    });
  };

  // Image upload for module
  const handleImageUpload = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("prefix", "modules/");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) { alert("Upload failed"); return; }
    const { key } = await res.json() as { key: string };
    await updateModuleImageKey({ data: { module_id: mod.id, image_key: key } }).catch(console.error);
    alert(`Image uploaded! Key: ${key}`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link
          to="/admin/modules"
          className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Modules
        </Link>
        <div className="flex-1">
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">{mod.title}</div>
          <h1 className="text-xl font-bold tracking-tight">{mod.subtitle}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{mod.tagline}</p>
        </div>
      </div>

      {/* Module image upload */}
      <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
        <div className="relative h-20 w-28 rounded-xl overflow-hidden bg-surface-elevated border border-border shrink-0">
          {mod.image_key ? (
            <img src={`/api/cdn/${encodeURIComponent(mod.image_key)}`} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-muted-foreground/50">
              <Image className="h-6 w-6" />
            </div>
          )}
        </div>
        <div>
          <div className="text-sm font-medium mb-1">Module Image</div>
          <p className="text-xs text-muted-foreground mb-2">
            {mod.image_key ? `Key: ${mod.image_key}` : "No image — using SVG gradient"}
          </p>
          <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors">
            <Image className="h-3.5 w-3.5" />
            {mod.image_key ? "Replace image" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload(f);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      </div>

      {/* Lessons list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Lessons ({lessons.length})
          </h2>
          <button
            onClick={startNew}
            disabled={editingId === "new"}
            className="inline-flex items-center gap-1.5 rounded-xl bg-primary/15 border border-primary/40 text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary/25 disabled:opacity-50 transition-colors"
          >
            <Plus className="h-3.5 w-3.5" /> Add Lesson
          </button>
        </div>

        <div className="space-y-2">
          {/* New lesson form */}
          {editingId === "new" && (
            <LessonEditForm
              title={editTitle}
              content={editContent}
              onTitleChange={setEditTitle}
              onContentChange={setEditContent}
              onSave={saveLesson}
              onCancel={cancelEdit}
              saving={saving}
              isNew
            />
          )}

          {lessons.map((l, i) => (
            <div
              key={l.id}
              draggable={editingId !== l.id}
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={handleDrop}
              className="glass-card rounded-2xl border border-border overflow-hidden"
            >
              {editingId === l.id ? (
                <LessonEditForm
                  title={editTitle}
                  content={editContent}
                  onTitleChange={setEditTitle}
                  onContentChange={setEditContent}
                  onSave={saveLesson}
                  onCancel={cancelEdit}
                  saving={saving}
                />
              ) : (
                <div className="flex items-start gap-3 p-4">
                  <div className="cursor-grab text-muted-foreground/50 hover:text-muted-foreground mt-0.5 shrink-0">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
                      Lesson {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="text-sm font-medium">{l.title}</div>
                    {expandedId === l.id && (
                      <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap bg-surface/40 rounded-xl p-3 max-h-48 overflow-auto">
                        {l.content.slice(0, 800)}{l.content.length > 800 ? "…" : ""}
                      </pre>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setExpandedId(expandedId === l.id ? null : l.id)}
                      className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated flex items-center justify-center transition-colors"
                      title="Preview content"
                    >
                      {expandedId === l.id
                        ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                        : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
                    </button>
                    <button
                      onClick={() => startEdit(l)}
                      className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated flex items-center justify-center transition-colors"
                      title="Edit lesson"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => handleDelete(l)}
                      className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-destructive/20 hover:border-destructive/40 flex items-center justify-center transition-colors"
                      title="Delete lesson"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {lessons.length === 0 && editingId !== "new" && (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No lessons yet. Click "Add Lesson" to create the first one.
          </div>
        )}
      </div>
    </div>
  );
}

function LessonEditForm({
  title, content, onTitleChange, onContentChange, onSave, onCancel, saving, isNew,
}: {
  title: string;
  content: string;
  onTitleChange: (v: string) => void;
  onContentChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isNew?: boolean;
}) {
  return (
    <div className="p-4 space-y-3 bg-surface/40">
      <div>
        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
          {isNew ? "New Lesson Title" : "Lesson Title"}
        </label>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
          placeholder="e.g. Set up your landing page"
          autoFocus
        />
      </div>
      <div>
        <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">
          Content (Markdown)
        </label>
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          rows={12}
          className="w-full bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary/50 transition-all resize-y"
          placeholder="Write lesson content in markdown…"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          disabled={saving || !title.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary/20 border border-primary/40 text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary/30 disabled:opacity-50 transition-colors"
        >
          <Check className="h-3.5 w-3.5" /> {saving ? "Saving…" : "Save Lesson"}
        </button>
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium hover:bg-surface-elevated transition-colors"
        >
          <X className="h-3.5 w-3.5" /> Cancel
        </button>
      </div>
    </div>
  );
}
