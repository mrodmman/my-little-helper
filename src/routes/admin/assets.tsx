/**
 * Admin — Asset Vault manager.
 * Add/edit/delete assets (videos, prompts, files, links).
 * Image upload to R2, JSON import/export.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Plus, Trash2, Check, X, Edit2, Video, FileText, Link2, Zap } from "lucide-react";
import { getAllAssets, upsertAsset, deleteAsset } from "@/server/modules";
import type { DbAsset } from "@/server/modules";
import { cn } from "@/lib/utils";

const TYPE_ICONS = {
  video: Video,
  prompt: Zap,
  file: FileText,
  link: Link2,
} as const;

const TYPE_COLORS = {
  video: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  prompt: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  file: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  link: "text-amber-400 bg-amber-400/10 border-amber-400/30",
} as const;

const EMPTY_DRAFT: Partial<DbAsset> & { id: string } = {
  id: "", type: "link", title: "", description: "", url: "", body: "",
  filename: "", size: "", format: "", source: "", duration: "", tags: "[]",
};

export const Route = createFileRoute("/admin/assets")({
  component: AssetsManager,
  loader: async () => {
    const assets = await getAllAssets().catch(() => []);
    return { assets };
  },
});

function AssetsManager() {
  const { assets: initialAssets } = Route.useLoaderData();
  const [assets, setAssets] = useState<DbAsset[]>(initialAssets);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<typeof EMPTY_DRAFT>({ ...EMPTY_DRAFT });
  const [filterType, setFilterType] = useState<string>("all");
  const [, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);

  const filtered = filterType === "all" ? assets : assets.filter((a) => a.type === filterType);

  const startNew = () => {
    setEditingId("new");
    setDraft({ ...EMPTY_DRAFT, id: `asset-${Date.now()}` });
  };

  const startEdit = (a: DbAsset) => {
    setEditingId(a.id);
    setDraft({ ...a });
  };

  const cancelEdit = () => { setEditingId(null); };

  const save = () => {
    if (!draft.id?.trim() || !draft.title?.trim()) return;
    setSaving(true);
    const isNew = editingId === "new";

    startTransition(async () => {
      await upsertAsset({ data: draft as DbAsset }).catch(console.error);
      if (isNew) {
        setAssets((prev) => [...prev, draft as DbAsset]);
      } else {
        setAssets((prev) => prev.map((a) => (a.id === draft.id ? (draft as DbAsset) : a)));
      }
      setSaving(false);
      setEditingId(null);
    });
  };

  const handleDelete = (a: DbAsset) => {
    if (!confirm(`Delete asset "${a.title}"?`)) return;
    setAssets((prev) => prev.filter((x) => x.id !== a.id));
    startTransition(async () => {
      await deleteAsset({ data: a.id }).catch(console.error);
    });
  };

  const setDraftField = (field: keyof DbAsset, value: string) => {
    setDraft((d) => ({ ...d, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Asset Vault</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Videos, prompts, files and links</p>
        </div>
        <button
          onClick={startNew}
          disabled={editingId === "new"}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary/15 border border-primary/40 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/25 disabled:opacity-50 transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Asset
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {["all", "video", "prompt", "file", "link"].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all border",
              filterType === t
                ? "bg-primary/15 border-primary/40 text-primary"
                : "border-border bg-surface/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {t === "all" ? "All" : (
              <>
                {(() => { const I = TYPE_ICONS[t as keyof typeof TYPE_ICONS]; return <I className="h-3 w-3" />; })()}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </>
            )}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} asset{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* New asset form */}
      {editingId === "new" && (
        <AssetEditForm
          draft={draft}
          onChange={setDraftField}
          onSave={save}
          onCancel={cancelEdit}
          saving={saving}
          isNew
        />
      )}

      {/* Asset list */}
      <div className="space-y-2">
        {filtered.map((a) => (
          <div key={a.id} className="glass-card rounded-2xl border border-border overflow-hidden">
            {editingId === a.id ? (
              <AssetEditForm
                draft={draft}
                onChange={setDraftField}
                onSave={save}
                onCancel={cancelEdit}
                saving={saving}
              />
            ) : (
              <div className="flex items-start gap-3 p-4">
                <div className={cn(
                  "h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5",
                  TYPE_COLORS[a.type],
                )}>
                  {(() => { const I = TYPE_ICONS[a.type]; return <I className="h-4 w-4" />; })()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{a.type}</span>
                    <span className="text-[10px] text-muted-foreground/60 font-mono">{a.id}</span>
                  </div>
                  <div className="text-sm font-medium mt-0.5">{a.title}</div>
                  {a.description && (
                    <div className="text-xs text-muted-foreground truncate mt-0.5">{a.description}</div>
                  )}
                  {a.url && (
                    <div className="text-xs text-primary/70 truncate mt-0.5">{a.url}</div>
                  )}
                  {a.tags && a.tags !== "[]" && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {(JSON.parse(a.tags) as string[]).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-surface-elevated border border-border text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => startEdit(a)}
                    className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated flex items-center justify-center transition-colors"
                    title="Edit asset"
                  >
                    <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleDelete(a)}
                    className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-destructive/20 hover:border-destructive/40 flex items-center justify-center transition-colors"
                    title="Delete asset"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && editingId !== "new" && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          {filterType === "all" ? "No assets found. Click "Add Asset" to create one." : `No ${filterType} assets.`}
        </div>
      )}
    </div>
  );
}

function AssetEditForm({
  draft, onChange, onSave, onCancel, saving, isNew,
}: {
  draft: Partial<DbAsset> & { id: string };
  onChange: (field: keyof DbAsset, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  isNew?: boolean;
}) {
  const showUrl = draft.type === "video" || draft.type === "file" || draft.type === "link";
  const showBody = draft.type === "prompt";
  const showFileFields = draft.type === "file";
  const showVideoFields = draft.type === "video";
  const showLinkFields = draft.type === "link";

  const field = (
    label: string,
    key: keyof DbAsset,
    placeholder?: string,
    textarea?: boolean,
  ) => (
    <div>
      <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={(draft[key] as string) ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
          rows={6}
          className="w-full bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:border-primary/50 transition-all resize-y"
          placeholder={placeholder}
        />
      ) : (
        <input
          value={(draft[key] as string) ?? ""}
          onChange={(e) => onChange(key, e.target.value)}
          className="w-full bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
          placeholder={placeholder}
        />
      )}
    </div>
  );

  return (
    <div className="p-4 space-y-3 bg-surface/40">
      <div className="grid sm:grid-cols-2 gap-3">
        {field("Asset ID", "id", "unique-id-slug")}
        <div>
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-1">Type</label>
          <select
            value={draft.type ?? "link"}
            onChange={(e) => onChange("type", e.target.value)}
            className="w-full bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
          >
            <option value="video">Video</option>
            <option value="prompt">Prompt</option>
            <option value="file">File</option>
            <option value="link">Link</option>
          </select>
        </div>
      </div>

      {field("Title", "title", "Asset title")}
      {field("Description", "description", "Short description")}

      {showUrl && field("URL", "url", "https://…")}
      {showBody && field("Prompt Body", "body", "Your copyable prompt text…", true)}

      {showFileFields && (
        <div className="grid sm:grid-cols-3 gap-3">
          {field("Filename", "filename", "file.pdf")}
          {field("Size", "size", "1.2 MB")}
          {field("Format", "format", "PDF")}
        </div>
      )}

      {showVideoFields && field("Duration", "duration", "4:21")}
      {showLinkFields && field("Source", "source", "Notion")}

      {field("Tags (comma-separated)", "tags", '["tag1","tag2"]')}

      <div className="flex items-center gap-2">
        <button
          onClick={onSave}
          disabled={saving || !draft.id?.trim() || !draft.title?.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-primary/20 border border-primary/40 text-primary px-3 py-1.5 text-xs font-medium hover:bg-primary/30 disabled:opacity-50 transition-colors"
        >
          <Check className="h-3.5 w-3.5" /> {saving ? "Saving…" : isNew ? "Create Asset" : "Save Asset"}
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
