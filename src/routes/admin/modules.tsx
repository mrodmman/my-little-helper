/**
 * Admin — Modules manager.
 * List all modules with drag-and-drop reorder, edit, toggle visibility, delete.
 * Click a module to edit its lessons.
 */
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useTransition, useRef } from "react";
import {
  Eye, EyeOff, Trash2, GripVertical, Edit2, Check, X, ChevronRight, Image,
} from "lucide-react";
import {
  getAllModulesAdmin, updateModule, reorderModules, deleteModule, updateModuleImageKey,
} from "@/rpc/modules";
import { exportCourseJson, importCourseJson } from "@/rpc/modules";
import type { DbModule } from "@/rpc/modules";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/modules")({
  component: ModulesManager,
  loader: async () => {
    const modules = await getAllModulesAdmin().catch(() => []);
    return { modules };
  },
});

function ModulesManager() {
  const { modules: initialModules } = Route.useLoaderData();
  const router = useRouter();
  const [modules, setModules] = useState<DbModule[]>(initialModules);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<DbModule>>({});
  const [, startTransition] = useTransition();
  const [saving, setSaving] = useState<string | null>(null);
  const [importError, setImportError] = useState("");

  // ---- Drag-and-drop state ----
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
    const next = [...modules];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setModules(next);
    startTransition(async () => {
      await reorderModules({ data: next.map((m) => m.id) }).catch(console.error);
    });
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  // ---- Edit ----
  const startEdit = (m: DbModule) => {
    setEditingId(m.id);
    setEditDraft({ title: m.title, subtitle: m.subtitle, tagline: m.tagline });
  };
  const cancelEdit = () => { setEditingId(null); setEditDraft({}); };
  const saveEdit = (m: DbModule) => {
    setSaving(m.id);
    const updated = { ...m, ...editDraft };
    setModules((prev) => prev.map((x) => (x.id === m.id ? updated : x)));
    setEditingId(null);
    startTransition(async () => {
      await updateModule({ data: { id: m.id, ...editDraft } }).catch(console.error);
      setSaving(null);
    });
  };

  // ---- Toggle visibility ----
  const toggleVisible = (m: DbModule) => {
    const next = m.visible ? 0 : 1;
    setModules((prev) => prev.map((x) => (x.id === m.id ? { ...x, visible: next } : x)));
    startTransition(async () => {
      await updateModule({ data: { id: m.id, visible: next } }).catch(console.error);
    });
  };

  // ---- Delete ----
  const handleDelete = (m: DbModule) => {
    if (!confirm(`Delete "${m.title}: ${m.subtitle}"? This will also delete all its lessons.`)) return;
    setModules((prev) => prev.filter((x) => x.id !== m.id));
    startTransition(async () => {
      await deleteModule({ data: m.id }).catch(console.error);
    });
  };

  // ---- Image upload ----
  const handleImageUpload = async (m: DbModule, file: File) => {
    const form = new FormData();
    form.append("file", file);
    form.append("prefix", "modules/");
    const res = await fetch("/api/upload", { method: "POST", body: form });
    if (!res.ok) { alert("Upload failed"); return; }
    const { key } = await res.json() as { key: string };
    setModules((prev) => prev.map((x) => (x.id === m.id ? { ...x, image_key: key } : x)));
    await updateModuleImageKey({ data: { module_id: m.id, image_key: key } }).catch(console.error);
  };

  // ---- JSON Export ----
  const handleExport = () => {
    startTransition(async () => {
      const data = await exportCourseJson().catch(() => null);
      if (!data) { alert("Export failed"); return; }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `kraken-vault-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  // ---- JSON Import ----
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (!data.modules || !data.lessons) throw new Error("Invalid format");
        if (!confirm("This REPLACES all modules, lessons, assets, and module-asset links in D1. Continue?")) return;
        startTransition(async () => {
          await importCourseJson({ data }).catch((err) => setImportError(String(err)));
          router.invalidate();
        });
      } catch (err) {
        setImportError(String(err));
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Modules</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Drag to reorder · edit metadata + image · toggle visibility</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-2 text-xs font-medium transition-all"
          >
            Export JSON
          </button>
          <label className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-2 text-xs font-medium transition-all cursor-pointer">
            Import JSON (Replaces ALL modules/lessons/assets)
            <input type="file" accept=".json" onChange={handleImport} className="sr-only" />
          </label>
        </div>
      </div>

      {importError && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs text-destructive">
          {importError}
        </div>
      )}

      <div className="space-y-2">
        {modules.map((m, i) => (
          <div
            key={m.id}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={handleDrop}
            className={cn(
              "glass-card rounded-2xl border border-border transition-all",
              !m.visible && "opacity-60",
            )}
          >
            {editingId === m.id ? (
              <div className="p-4 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Title</label>
                    <input
                      value={editDraft.title ?? m.title}
                      onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))}
                      className="w-full bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Subtitle</label>
                    <input
                      value={editDraft.subtitle ?? m.subtitle}
                      onChange={(e) => setEditDraft((d) => ({ ...d, subtitle: e.target.value }))}
                      className="w-full bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Tagline</label>
                  <input
                    value={editDraft.tagline ?? m.tagline}
                    onChange={(e) => setEditDraft((d) => ({ ...d, tagline: e.target.value }))}
                    className="w-full bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => saveEdit(m)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary/20 border border-primary/40 text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary/30 transition-colors"
                  >
                    <Check className="h-3.5 w-3.5" /> Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface/60 px-3 py-1.5 text-xs font-medium hover:bg-surface-elevated transition-colors"
                  >
                    <X className="h-3.5 w-3.5" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4">
                <div className="cursor-grab text-muted-foreground/50 hover:text-muted-foreground shrink-0">
                  <GripVertical className="h-5 w-5" />
                </div>

                {/* Module image preview */}
                <div className="relative h-12 w-16 rounded-lg overflow-hidden shrink-0 bg-surface-elevated border border-border">
                  {m.image_key ? (
                    <img
                      src={`/api/cdn/${encodeURIComponent(m.image_key)}`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <Image className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Image className="h-4 w-4 text-foreground" />
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload(m, f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-wider text-primary font-semibold">{m.title}</div>
                  <div className="text-sm font-semibold truncate">{m.subtitle}</div>
                  <div className="text-xs text-muted-foreground truncate">{m.tagline}</div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {saving === m.id && (
                    <span className="text-[10px] text-muted-foreground animate-pulse">saving…</span>
                  )}
                  <Link
                    to="/admin/modules/$moduleId"
                    params={{ moduleId: m.id }}
                    className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated flex items-center justify-center transition-colors"
                    title="Edit lessons"
                  >
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  <button
                    onClick={() => startEdit(m)}
                    className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated flex items-center justify-center transition-colors"
                    title="Edit metadata"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => toggleVisible(m)}
                    className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated flex items-center justify-center transition-colors"
                    title={m.visible ? "Hide from public" : "Show to public"}
                  >
                    {m.visible ? (
                      <Eye className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(m)}
                    className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-destructive/20 hover:border-destructive/40 flex items-center justify-center transition-colors"
                    title="Delete module"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {modules.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No modules found. Run the seed script to populate D1.
        </div>
      )}
    </div>
  );
}
