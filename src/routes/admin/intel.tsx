/**
 * Admin — Kraken Intel & Starter Vault manager.
 * Tabs: Articles | Starter Drops | Import Package
 */
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useRef, useState, useTransition } from "react";
import {
  BookOpen, Package, Upload, Plus, Trash2, Edit2, Copy,
  Eye, EyeOff, Check, X, ExternalLink, ChevronDown, ChevronUp,
  AlertCircle, CheckCircle2,
} from "lucide-react";
import {
  getAllArticlesAdmin, getAllStarterDropsAdmin,
  getArticleByIdAdmin, getStarterDropByIdAdmin,
  upsertArticle, deleteArticle, duplicateArticle,
  upsertStarterDrop, deleteStarterDrop, duplicateStarterDrop,
  importIntelPackage,
} from "@/rpc/intel";
import type { DbIntelArticle, DbStarterDrop, ImportPackage, ContentBlock } from "@/rpc/intel";
import { cn } from "@/lib/utils";

// ── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/admin/intel")({
  component: IntelAdmin,
  loader: async () => {
    const [articles, drops] = await Promise.all([
      getAllArticlesAdmin().catch(() => []),
      getAllStarterDropsAdmin().catch(() => []),
    ]);
    return { articles, drops };
  },
});

// ── Tab types ─────────────────────────────────────────────────────────────────

type Tab = "articles" | "drops" | "import";

// ── Main component ────────────────────────────────────────────────────────────

function IntelAdmin() {
  const { articles: initialArticles, drops: initialDrops } = Route.useLoaderData();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("articles");
  const [articles, setArticles] = useState(initialArticles);
  const [drops, setDrops] = useState(initialDrops);

  const refresh = async () => {
    const [a, d] = await Promise.all([
      getAllArticlesAdmin().catch(() => articles),
      getAllStarterDropsAdmin().catch(() => drops),
    ]);
    setArticles(a);
    setDrops(d);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Kraken Intel</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage articles, starter drops, and bulk imports.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface/60 border border-border rounded-xl p-1 w-fit">
        {(
          [
            { id: "articles" as Tab, label: "Articles", icon: BookOpen, count: articles.length },
            { id: "drops" as Tab, label: "Starter Drops", icon: Package, count: drops.length },
            { id: "import" as Tab, label: "Import Package", icon: Upload, count: null },
          ] as const
        ).map(({ id, label, icon: Icon, count }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              tab === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-surface",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
            {count !== null && (
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  tab === id ? "bg-white/20" : "bg-border/60",
                )}
              >
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tab === "articles" && (
        <ArticlesTab articles={articles} onRefresh={refresh} />
      )}
      {tab === "drops" && (
        <DropsTab drops={drops} onRefresh={refresh} />
      )}
      {tab === "import" && (
        <ImportTab onImported={refresh} />
      )}
    </div>
  );
}

// ── Articles Tab ──────────────────────────────────────────────────────────────

function ArticlesTab({ articles, onRefresh }: { articles: DbIntelArticle[]; onRefresh: () => void }) {
  const [editing, setEditing] = useState<DbIntelArticle | null>(null);
  const [creating, setCreating] = useState(false);
  const [loadingEditId, setLoadingEditId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleDelete = (a: DbIntelArticle) => {
    if (!confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteArticle({ data: a.id }).catch(console.error);
      onRefresh();
    });
  };

  const handleDuplicate = (a: DbIntelArticle) => {
    startTransition(async () => {
      await duplicateArticle({ data: a.id }).catch(console.error);
      onRefresh();
    });
  };

  const handleEdit = (a: DbIntelArticle) => {
    startTransition(async () => {
      const full = await getArticleByIdAdmin({ data: a.id }).catch(() => null);
      setEditing(full ?? a);
    });
  };

  const handleTogglePublish = (a: DbIntelArticle) => {
    startTransition(async () => {
      await upsertArticle({ data: { ...a, published: a.published ? 0 : 1 } }).catch(console.error);
      onRefresh();
    });
  };

  if (editing || creating) {
    return (
      <ArticleEditor
        article={editing ?? undefined}
        onSave={async (data) => {
          await upsertArticle({ data }).catch(console.error);
          setEditing(null);
          setCreating(false);
          onRefresh();
        }}
        onCancel={() => { setEditing(null); setCreating(false); }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{articles.length} article{articles.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Article
        </button>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No articles yet. Create one or use Import Package.
        </div>
      ) : (
        <div className="space-y-2">
          {articles.map((a) => (
            <div
              key={a.id}
              className="glass-card rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-foreground line-clamp-1">
                    {a.title}
                  </span>
                  {!!a.featured && (
                    <span className="text-[10px] bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full font-bold uppercase">
                      Featured
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase border",
                      a.published
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-muted text-muted-foreground border-border",
                    )}
                  >
                    {a.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                  <span>{a.category}</span>
                  {a.read_time && <span>· {a.read_time}</span>}
                  <span>· /{a.slug}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={`/intel/${encodeURIComponent(a.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
                  title="Preview"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={() => handleTogglePublish(a)}
                  className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
                  title={a.published ? "Unpublish" : "Publish"}
                >
                  {a.published ? (
                    <Eye className="h-3.5 w-3.5" />
                  ) : (
                    <EyeOff className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  onClick={() => handleDuplicate(a)}
                  className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
                  title="Duplicate"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={async () => {
                    setLoadingEditId(a.id);
                    try {
                      const full = await getArticleByIdAdmin({ data: a.id });
                      setEditing(full ?? a);
                    } catch {
                      setEditing(a);
                    } finally {
                      setLoadingEditId(null);
                    }
                  }}
                  disabled={loadingEditId === a.id}
                  className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                  title="Edit"
                >
                  {loadingEditId === a.id
                    ? <span className="h-3.5 w-3.5 inline-block animate-spin border-2 border-current border-t-transparent rounded-full" />
                    : <Edit2 className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => handleDelete(a)}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Shared image uploader ─────────────────────────────────────────────────────

async function uploadImageToR2(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  form.append("prefix", "intel/");
  const res = await fetch("/api/upload", { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  const { url } = await res.json() as { url: string; key: string };
  return url;
}

function ImageUploadField({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToR2(file);
      onChange(url);
    } catch {
      alert("Upload failed — check your admin session.");
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls + " flex-1"}
        placeholder="https://... or upload →"
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-surface-elevated disabled:opacity-50 transition-all"
      >
        <Upload className="h-3.5 w-3.5" />
        {uploading ? "Uploading…" : "Upload"}
      </button>
      {value && (
        <img src={value} alt="preview" className="h-10 w-10 rounded-md object-cover border border-border shrink-0" />
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

function isImageFieldKey(key: string) {
  const normalized = key.toLowerCase();
  return (
    normalized === "url" ||
    normalized === "image" ||
    normalized === "image_url" ||
    normalized === "cover_image_url" ||
    normalized.endsWith("_image") ||
    normalized.endsWith("_image_url")
  );
}

function isProbablyImageValue(value: unknown) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return true;
  return (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/") ||
    /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/.test(trimmed)
  );
}

function ContentBlocksImageManager({
  rawJson,
  onChange,
}: {
  rawJson: string;
  onChange: (nextJson: string) => void;
}) {
  let parseError = "";
  let blocks: Array<Record<string, unknown>> = [];
  try {
    const parsed = JSON.parse(rawJson || "[]") as unknown;
    if (Array.isArray(parsed)) {
      blocks = parsed.map((item) => (item && typeof item === "object" ? { ...item as Record<string, unknown> } : {}));
    } else {
      parseError = "Content blocks JSON must be an array.";
    }
  } catch {
    parseError = "Invalid JSON. Fix JSON first to manage image fields.";
  }

  const updateField = (blockIndex: number, key: string, nextValue: string) => {
    const nextBlocks = blocks.map((b, i) => (i === blockIndex ? { ...b, [key]: nextValue } : b));
    onChange(JSON.stringify(nextBlocks, null, 2));
  };

  if (parseError) {
    return (
      <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
        {parseError}
      </div>
    );
  }

  const candidates = blocks.flatMap((block, blockIndex) =>
    Object.entries(block)
      .filter(([key, value]) => isImageFieldKey(key) && isProbablyImageValue(value))
      .map(([key, value]) => ({
        blockIndex,
        blockType: String(block.type ?? "unknown"),
        key,
        value: typeof value === "string" ? value : "",
      })),
  );

  if (candidates.length === 0) {
    return (
      <div className="text-xs text-muted-foreground bg-surface/50 rounded-lg p-3 border border-border">
        No image fields detected in JSON blocks yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {candidates.map((item) => (
        <div key={`${item.blockIndex}:${item.key}`} className="rounded-lg border border-border bg-surface/30 p-3 space-y-2">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Block #{item.blockIndex + 1} ({item.blockType}) · {item.key}
          </div>
          <ImageUploadField
            value={item.value}
            onChange={(url) => updateField(item.blockIndex, item.key, url)}
          />
        </div>
      ))}
    </div>
  );
}

// ── Article Editor ────────────────────────────────────────────────────────────

function ArticleEditor({
  article,
  onSave,
  onCancel,
}: {
  article?: DbIntelArticle;
  onSave: (data: Partial<DbIntelArticle> & { slug: string; title: string; id?: string }) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState({
    id: article?.id,
    slug: article?.slug ?? "",
    title: article?.title ?? "",
    excerpt: article?.excerpt ?? "",
    category: article?.category ?? "",
    tags: article?.tags ?? "[]",
    cover_image_url: article?.cover_image_url ?? "",
    read_time: article?.read_time ?? "",
    published_at: article?.published_at ?? "",
    featured: article?.featured ?? 0,
    published: article?.published ?? 0,
    related_starter_drop_slug: article?.related_starter_drop_slug ?? "",
    fast_route_tool_name: article?.fast_route_tool_name ?? "",
    fast_route_description: article?.fast_route_description ?? "",
    fast_route_affiliate_url: article?.fast_route_affiliate_url ?? "",
    fast_route_button_text: article?.fast_route_button_text ?? "",
    content_blocks: article?.content_blocks ?? "[]",
  });

  const [jsonMode, setJsonMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string | number) => setDraft((d) => ({ ...d, [k]: v }));

  const handleSave = async () => {
    if (!draft.slug || !draft.title) {
      alert("Slug and title are required.");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        ...draft,
        cover_image_url: draft.cover_image_url || null,
        related_starter_drop_slug: draft.related_starter_drop_slug || null,
        fast_route_tool_name: draft.fast_route_tool_name || null,
        fast_route_description: draft.fast_route_description || null,
        fast_route_affiliate_url: draft.fast_route_affiliate_url || null,
        fast_route_button_text: draft.fast_route_button_text || null,
        published_at: draft.published_at || null,
      } as Partial<DbIntelArticle> & { slug: string; title: string });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{article ? "Edit Article" : "New Article"}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *">
          <input value={draft.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Article title" />
        </Field>
        <Field label="Slug *">
          <input value={draft.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} placeholder="my-article-slug" />
        </Field>
        <Field label="Category">
          <input value={draft.category} onChange={(e) => set("category", e.target.value)} className={inputCls} placeholder="Build Systems" />
        </Field>
        <Field label="Read Time">
          <input value={draft.read_time} onChange={(e) => set("read_time", e.target.value)} className={inputCls} placeholder="5 min read" />
        </Field>
        <Field label="Cover Image">
          <ImageUploadField value={draft.cover_image_url ?? ""} onChange={(url) => set("cover_image_url", url)} />
        </Field>
        <Field label="Published At">
          <input type="datetime-local" value={draft.published_at ?? ""} onChange={(e) => set("published_at", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Tags (JSON array)">
          <input value={draft.tags} onChange={(e) => set("tags", e.target.value)} className={inputCls} placeholder='["tag1","tag2"]' />
        </Field>
        <Field label="Related Starter Drop Slug">
          <input value={draft.related_starter_drop_slug ?? ""} onChange={(e) => set("related_starter_drop_slug", e.target.value)} className={inputCls} placeholder="free-starter-funnel-build-kit" />
        </Field>
      </div>

      <Field label="Excerpt">
        <textarea value={draft.excerpt} onChange={(e) => set("excerpt", e.target.value)} className={cn(inputCls, "h-20 resize-y")} placeholder="Short description shown in article lists" />
      </Field>

      {/* Fast Route */}
      <div className="rounded-xl bg-surface/50 border border-border p-4 space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fast Route (Affiliate)</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Tool Name">
            <input value={draft.fast_route_tool_name ?? ""} onChange={(e) => set("fast_route_tool_name", e.target.value)} className={inputCls} placeholder="Framer" />
          </Field>
          <Field label="Affiliate URL">
            <input value={draft.fast_route_affiliate_url ?? ""} onChange={(e) => set("fast_route_affiliate_url", e.target.value)} className={inputCls} placeholder="https://..." />
          </Field>
          <Field label="Button Text">
            <input value={draft.fast_route_button_text ?? ""} onChange={(e) => set("fast_route_button_text", e.target.value)} className={inputCls} placeholder="Try It Free" />
          </Field>
          <Field label="Description">
            <input value={draft.fast_route_description ?? ""} onChange={(e) => set("fast_route_description", e.target.value)} className={inputCls} placeholder="Short one-line description" />
          </Field>
        </div>
      </div>

      {/* Content Blocks */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Content Blocks (JSON)
          </label>
          <button
            onClick={() => setJsonMode((v) => !v)}
            className="text-xs text-primary hover:underline"
          >
            {jsonMode ? "Collapse" : "Edit JSON"}
          </button>
        </div>
        {jsonMode && (
          <textarea
            value={draft.content_blocks}
            onChange={(e) => set("content_blocks", e.target.value)}
            className={cn(inputCls, "h-64 resize-y font-mono text-xs")}
            placeholder='[{"type":"paragraph","text":"..."}]'
          />
        )}
        <div className="pt-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Image Fields in JSON Blocks
          </div>
          <ContentBlocksImageManager
            rawJson={draft.content_blocks}
            onChange={(nextJson) => set("content_blocks", nextJson)}
          />
        </div>
        {!jsonMode && (
          <div className="text-xs text-muted-foreground bg-surface/50 rounded-lg p-3 border border-border">
            {(() => {
              try {
                const blocks = JSON.parse(draft.content_blocks || "[]") as Array<{ type: string }>;
                return `${blocks.length} block${blocks.length !== 1 ? "s" : ""} — click "Edit JSON" to modify`;
              } catch {
                return "Invalid JSON — click Edit JSON to fix";
              }
            })()}
          </div>
        )}
      </div>

      {/* Flags */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!draft.featured}
            onChange={(e) => set("featured", e.target.checked ? 1 : 0)}
            className="rounded border-border"
          />
          <span className="text-sm">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!!draft.published}
            onChange={(e) => set("published", e.target.checked ? 1 : 0)}
            className="rounded border-border"
          />
          <span className="text-sm">Published</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          <Check className="h-4 w-4" />
          {saving ? "Saving…" : "Save Article"}
        </button>
        <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Drops Tab ─────────────────────────────────────────────────────────────────

function DropsTab({ drops, onRefresh }: { drops: DbStarterDrop[]; onRefresh: () => void }) {
  const [editing, setEditing] = useState<DbStarterDrop | null>(null);
  const [creating, setCreating] = useState(false);
  const [, startTransition] = useTransition();

  const handleDelete = (d: DbStarterDrop) => {
    if (!confirm(`Delete "${d.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteStarterDrop({ data: d.id }).catch(console.error);
      onRefresh();
    });
  };

  const handleDuplicate = (d: DbStarterDrop) => {
    startTransition(async () => {
      await duplicateStarterDrop({ data: d.id }).catch(console.error);
      onRefresh();
    });
  };

  const handleTogglePublish = (d: DbStarterDrop) => {
    startTransition(async () => {
      await upsertStarterDrop({ data: { ...d, published: d.published ? 0 : 1 } }).catch(console.error);
      onRefresh();
    });
  };

  if (editing || creating) {
    return (
      <DropEditor
        drop={editing ?? undefined}
        onSave={async (data) => {
          await upsertStarterDrop({ data }).catch(console.error);
          setEditing(null);
          setCreating(false);
          onRefresh();
        }}
        onCancel={() => { setEditing(null); setCreating(false); }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{drops.length} drop{drops.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setCreating(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Starter Drop
        </button>
      </div>

      {drops.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No starter drops yet. Create one or use Import Package.
        </div>
      ) : (
        <div className="space-y-2">
          {drops.map((d) => (
            <div key={d.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm text-foreground line-clamp-1">{d.title}</span>
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase border",
                      d.published
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-muted text-muted-foreground border-border",
                    )}
                  >
                    {d.published ? "Published" : "Draft"}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                  <span>{d.category}</span>
                  <span>· {d.difficulty}</span>
                  {d.estimated_build_time && <span>· {d.estimated_build_time}</span>}
                  <span>· /{d.slug}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <a
                  href={`/starter-vault/${d.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
                  title="Preview"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button onClick={() => handleTogglePublish(d)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors" title={d.published ? "Unpublish" : "Publish"}>
                  {d.published ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => handleDuplicate(d)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors" title="Duplicate">
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => setEditing(d)} className="p-1.5 rounded-lg hover:bg-surface text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button onClick={() => handleDelete(d)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" title="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Drop Editor ───────────────────────────────────────────────────────────────

function DropEditor({
  drop,
  onSave,
  onCancel,
}: {
  drop?: DbStarterDrop;
  onSave: (data: Partial<DbStarterDrop> & { slug: string; title: string; id?: string }) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState({
    id: drop?.id,
    slug: drop?.slug ?? "",
    title: drop?.title ?? "",
    excerpt: drop?.excerpt ?? "",
    category: drop?.category ?? "",
    cover_image_url: drop?.cover_image_url ?? "",
    difficulty: drop?.difficulty ?? "Beginner",
    estimated_build_time: drop?.estimated_build_time ?? "",
    tools_used: drop?.tools_used ?? "[]",
    published: drop?.published ?? 0,
    related_article_slug: drop?.related_article_slug ?? "",
    what_this_builds: drop?.what_this_builds ?? "[]",
    what_you_get: drop?.what_you_get ?? "[]",
    build_prompt: drop?.build_prompt ?? "",
    file_tree: drop?.file_tree ?? "",
    setup_steps: drop?.setup_steps ?? "[]",
    edit_map: drop?.edit_map ?? "[]",
    troubleshooting: drop?.troubleshooting ?? "[]",
    upgrade_note: drop?.upgrade_note ?? "",
  });
  const [saving, setSaving] = useState(false);

  const set = (k: string, v: string | number) => setDraft((d) => ({ ...d, [k]: v }));

  const handleSave = async () => {
    if (!draft.slug || !draft.title) {
      alert("Slug and title are required.");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        ...draft,
        cover_image_url: draft.cover_image_url || null,
        related_article_slug: draft.related_article_slug || null,
        upgrade_note: draft.upgrade_note || null,
      } as Partial<DbStarterDrop> & { slug: string; title: string });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{drop ? "Edit Starter Drop" : "New Starter Drop"}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Title *">
          <input value={draft.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Free Starter Funnel Build Kit" />
        </Field>
        <Field label="Slug *">
          <input value={draft.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} placeholder="free-starter-funnel-build-kit" />
        </Field>
        <Field label="Category">
          <input value={draft.category} onChange={(e) => set("category", e.target.value)} className={inputCls} placeholder="Funnels" />
        </Field>
        <Field label="Difficulty">
          <select value={draft.difficulty} onChange={(e) => set("difficulty", e.target.value)} className={inputCls}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </Field>
        <Field label="Est. Build Time">
          <input value={draft.estimated_build_time} onChange={(e) => set("estimated_build_time", e.target.value)} className={inputCls} placeholder="1–2 hours" />
        </Field>
        <Field label="Cover Image">
          <ImageUploadField value={draft.cover_image_url ?? ""} onChange={(url) => set("cover_image_url", url)} />
        </Field>
        <Field label="Tools Used (JSON array)">
          <input value={draft.tools_used} onChange={(e) => set("tools_used", e.target.value)} className={inputCls} placeholder='["Carrd","ConvertKit"]' />
        </Field>
        <Field label="Related Article Slug">
          <input value={draft.related_article_slug ?? ""} onChange={(e) => set("related_article_slug", e.target.value)} className={inputCls} placeholder="how-to-build-funnel-website" />
        </Field>
      </div>

      <Field label="Excerpt">
        <textarea value={draft.excerpt} onChange={(e) => set("excerpt", e.target.value)} className={cn(inputCls, "h-16 resize-y")} placeholder="Short description" />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="What This Builds (JSON array of strings)">
          <textarea value={draft.what_this_builds} onChange={(e) => set("what_this_builds", e.target.value)} className={cn(inputCls, "h-24 font-mono text-xs resize-y")} />
        </Field>
        <Field label="What You Get (JSON array of strings)">
          <textarea value={draft.what_you_get} onChange={(e) => set("what_you_get", e.target.value)} className={cn(inputCls, "h-24 font-mono text-xs resize-y")} />
        </Field>
      </div>

      <Field label="Build Prompt">
        <textarea value={draft.build_prompt} onChange={(e) => set("build_prompt", e.target.value)} className={cn(inputCls, "h-40 resize-y font-mono text-xs")} placeholder="You are a..." />
      </Field>

      <Field label="File Tree">
        <textarea value={draft.file_tree} onChange={(e) => set("file_tree", e.target.value)} className={cn(inputCls, "h-28 resize-y font-mono text-xs")} placeholder="project/&#10;├── index.html&#10;└── styles.css" />
      </Field>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Setup Steps (JSON array)">
          <textarea value={draft.setup_steps} onChange={(e) => set("setup_steps", e.target.value)} className={cn(inputCls, "h-28 font-mono text-xs resize-y")} />
        </Field>
        <Field label="Edit Map (JSON [{file, description}])">
          <textarea value={draft.edit_map} onChange={(e) => set("edit_map", e.target.value)} className={cn(inputCls, "h-28 font-mono text-xs resize-y")} />
        </Field>
        <Field label="Troubleshooting (JSON [{problem, solution}])">
          <textarea value={draft.troubleshooting} onChange={(e) => set("troubleshooting", e.target.value)} className={cn(inputCls, "h-28 font-mono text-xs resize-y")} />
        </Field>
      </div>

      <Field label="Upgrade Note (optional)">
        <textarea value={draft.upgrade_note ?? ""} onChange={(e) => set("upgrade_note", e.target.value)} className={cn(inputCls, "h-16 resize-y")} placeholder="Once you have X, consider upgrading to..." />
      </Field>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={!!draft.published} onChange={(e) => set("published", e.target.checked ? 1 : 0)} className="rounded border-border" />
        <span className="text-sm">Published</span>
      </label>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          <Check className="h-4 w-4" />
          {saving ? "Saving…" : "Save Drop"}
        </button>
        <button onClick={onCancel} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Import Tab ────────────────────────────────────────────────────────────────

// ── Image slot detection for Import tab ──────────────────────────────────────

type ImageSlot = {
  id: string;
  label: string;
  description: string;
  currentUrl: string;
};

function detectImageSlots(pkg: ImportPackage): ImageSlot[] {
  const slots: ImageSlot[] = [];

  if (pkg.article) {
    slots.push({
      id: "article-cover",
      label: "Article cover / thumbnail",
      description: "Shown on the article card grid and at the top of the article page.",
      currentUrl: pkg.article.cover_image_url ?? "",
    });

    let blocks: ContentBlock[] = [];
    try {
      const raw = pkg.article.content_blocks;
      blocks = typeof raw === "string" ? JSON.parse(raw) as ContentBlock[] : (raw as ContentBlock[] ?? []);
    } catch { /* ignore */ }

    blocks.forEach((block, idx) => {
      if (block.type === "image") {
        const imgBlock = block as { type: "image"; url: string; alt?: string; caption?: string };
        slots.push({
          id: `article-image-${idx}`,
          label: `Article — image block ${idx + 1}`,
          description: imgBlock.alt ? `Alt: "${imgBlock.alt}"` : `Block at position ${idx + 1} in content_blocks`,
          currentUrl: imgBlock.url ?? "",
        });
      }
    });
  }

  if (pkg.starterDrop) {
    slots.push({
      id: "drop-cover",
      label: "Starter drop cover / thumbnail",
      description: "Shown on the starter drop card and at the top of the drop page.",
      currentUrl: pkg.starterDrop.cover_image_url ?? "",
    });
  }

  return slots;
}

function applyImageSlot(pkg: ImportPackage, slotId: string, url: string): ImportPackage {
  if (slotId === "article-cover") {
    return { ...pkg, article: { ...pkg.article!, cover_image_url: url } };
  }
  if (slotId === "drop-cover") {
    return { ...pkg, starterDrop: { ...pkg.starterDrop!, cover_image_url: url } };
  }
  if (slotId.startsWith("article-image-")) {
    const idx = parseInt(slotId.replace("article-image-", ""), 10);
    const raw = pkg.article?.content_blocks;
    let blocks: ContentBlock[] = [];
    try {
      blocks = typeof raw === "string" ? JSON.parse(raw) as ContentBlock[] : (raw as ContentBlock[] ?? []);
    } catch { /* ignore */ }
    const newBlocks = blocks.map((b, i) =>
      i === idx ? { ...b, url } : b,
    );
    return { ...pkg, article: { ...pkg.article!, content_blocks: JSON.stringify(newBlocks) } };
  }
  return pkg;
}

// ── Import tab ────────────────────────────────────────────────────────────────

function ImportTab({ onImported }: { onImported: () => void }) {
  const [raw, setRaw] = useState("");
  const [parsed, setParsed] = useState<ImportPackage | null>(null);
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([]);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [parseError, setParseError] = useState("");
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleParse = () => {
    setParseError("");
    setParsed(null);
    setImageSlots([]);
    setResult(null);
    try {
      const obj = JSON.parse(raw) as ImportPackage;
      if (!obj.article && !obj.starterDrop) {
        setParseError('JSON must have at least "article" or "starterDrop" key.');
        return;
      }
      // ── Normalize array fields to JSON strings before RPC transport ──────────
      // The ImportPackage TS types declare content_blocks and tags as `string`,
      // but imported JSON has them as arrays. Stringify them here so they survive
      // serialization to the server function unchanged.
      if (obj.article) {
        const a = obj.article as Record<string, unknown>;
        if (Array.isArray(a.content_blocks)) {
          a.content_blocks = JSON.stringify(a.content_blocks);
        }
        if (Array.isArray(a.tags)) {
          a.tags = JSON.stringify(a.tags);
        }
      }
      if (obj.starterDrop) {
        const d = obj.starterDrop as Record<string, unknown>;
        for (const key of ["tools_used", "what_this_builds", "what_you_get", "setup_steps", "edit_map", "troubleshooting"]) {
          if (Array.isArray(d[key])) {
            d[key] = JSON.stringify(d[key]);
          }
        }
      }
      // ────────────────────────────────────────────────────────────────────────
      setParsed(obj);
      setImageSlots(detectImageSlots(obj));
    } catch (e) {
      setParseError(`Invalid JSON: ${String(e)}`);
    }
  };

  const handleSlotUpload = async (slotId: string, file: File) => {
    setUploadingSlot(slotId);
    try {
      const url = await uploadImageToR2(file);
      setParsed((prev) => {
        if (!prev) return prev;
        const next = applyImageSlot(prev, slotId, url);
        setImageSlots(detectImageSlots(next));
        return next;
      });
    } catch {
      alert("Upload failed — check your admin session.");
    } finally {
      setUploadingSlot(null);
      const input = fileRefs.current[slotId];
      if (input) input.value = "";
    }
  };

  const handleImport = async () => {
    if (!parsed) return;
    setImporting(true);
    try {
      const res = await importIntelPackage({ data: parsed });
      if (res.ok) {
        setResult({ ok: true, message: "Imported successfully!" });
        setRaw("");
        setParsed(null);
        setImageSlots([]);
        onImported();
      } else {
        setResult({ ok: false, message: res.error ?? "Import failed." });
      }
    } finally {
      setImporting(false);
    }
  };

  const reset = () => { setRaw(""); setParsed(null); setImageSlots([]); setParseError(""); setResult(null); };

  return (
    <div className="space-y-5 max-w-3xl">
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="font-bold text-lg">Import Intel Package</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Paste a JSON payload containing an article, a starter drop, or both.
            After validating, upload images for each detected slot before importing.
          </p>
        </div>

        {/* Example format */}
        <details className="rounded-xl bg-surface/50 border border-border overflow-hidden">
          <summary className="px-4 py-3 text-sm font-medium cursor-pointer hover:bg-surface transition-colors select-none">
            View expected JSON format
          </summary>
          <pre className="p-4 text-xs font-mono text-muted-foreground overflow-x-auto">
{`{
  "article": {
    "title": "How To Build Your First Funnel",
    "slug": "how-to-build-your-first-funnel",
    "excerpt": "Short description...",
    "category": "Build Systems",
    "tags": ["funnel", "free tools"],
    "cover_image_url": null,
    "read_time": "8 min read",
    "content_blocks": [
      { "type": "heading", "text": "Why You Don't Need Paid Tools" },
      { "type": "image", "url": "", "alt": "Funnel diagram" },
      { "type": "paragraph", "text": "..." }
    ]
  },
  "starterDrop": {
    "title": "Free Starter Funnel Build Kit",
    "slug": "free-starter-funnel-build-kit",
    "cover_image_url": null,
    "category": "Funnels",
    "difficulty": "Beginner"
  }
}`}
          </pre>
        </details>

        {/* Textarea */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Paste JSON
          </label>
          <textarea
            value={raw}
            onChange={(e) => { setRaw(e.target.value); setParseError(""); setParsed(null); setImageSlots([]); setResult(null); }}
            className={cn(inputCls, "h-48 font-mono text-xs resize-y")}
            placeholder='{ "article": { ... }, "starterDrop": { ... } }'
          />
        </div>

        {parseError && (
          <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/5 border border-destructive/20 rounded-lg p-3">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            {parseError}
          </div>
        )}

        {result && (
          <div className={cn(
            "flex items-start gap-2 text-sm rounded-lg p-3 border",
            result.ok
              ? "text-emerald-700 bg-emerald-50 border-emerald-200"
              : "text-destructive bg-destructive/5 border-destructive/20",
          )}>
            {result.ok
              ? <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              : <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />}
            {result.message}
          </div>
        )}

        {/* Parsed summary */}
        {parsed && !result && (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 space-y-1.5">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              ✓ Valid JSON
            </div>
            {parsed.article && (
              <div className="text-sm text-emerald-800">
                📄 Article: <strong>{parsed.article.title}</strong> · /{parsed.article.slug}
              </div>
            )}
            {parsed.starterDrop && (
              <div className="text-sm text-emerald-800">
                📦 Starter Drop: <strong>{parsed.starterDrop.title}</strong> · /{parsed.starterDrop.slug}
              </div>
            )}
          </div>
        )}

        {/* ── Image slots ─────────────────────────────────────────────────── */}
        {imageSlots.length > 0 && !result && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Images ({imageSlots.length})
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <p className="text-xs text-muted-foreground">
              Upload an image for each slot below. Slots with no image will be left blank — you can add them later via the article editor.
            </p>
            <div className="space-y-2">
              {imageSlots.map((slot) => {
                const isUploading = uploadingSlot === slot.id;
                const hasImage = !!slot.currentUrl;
                return (
                  <div
                    key={slot.id}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-3"
                  >
                    {/* Preview or placeholder */}
                    <div className="shrink-0 h-14 w-14 rounded-lg border border-border bg-surface overflow-hidden flex items-center justify-center">
                      {hasImage
                        ? <img src={slot.currentUrl} alt="" className="h-full w-full object-cover" />
                        : <Upload className="h-5 w-5 text-muted-foreground/40" />
                      }
                    </div>

                    {/* Labels */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">{slot.label}</div>
                      <div className="text-xs text-muted-foreground truncate mt-0.5">{slot.description}</div>
                      {hasImage && (
                        <div className="text-[10px] text-emerald-600 mt-0.5 truncate">✓ {slot.currentUrl}</div>
                      )}
                    </div>

                    {/* Upload button */}
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileRefs.current[slot.id]?.click()}
                      className={cn(
                        "shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-all",
                        hasImage
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
                        isUploading && "opacity-60 cursor-not-allowed",
                      )}
                    >
                      <Upload className="h-3.5 w-3.5" />
                      {isUploading ? "Uploading…" : hasImage ? "Replace" : "Upload"}
                    </button>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => { fileRefs.current[slot.id] = el; }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleSlotUpload(slot.id, file);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {!parsed ? (
            <button
              onClick={handleParse}
              disabled={!raw.trim()}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40"
            >
              Validate JSON
            </button>
          ) : !result ? (
            <button
              onClick={handleImport}
              disabled={importing}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              <Upload className="h-4 w-4" />
              {importing ? "Importing…" : "Import Package"}
            </button>
          ) : null}
          {(parsed || raw) && (
            <button onClick={reset} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="glass-card rounded-2xl p-5 space-y-3">
        <h3 className="font-semibold text-sm">How to generate import packages with Claude</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Ask Claude to write an article on any topic in the Kraken Intel format. Paste this prompt:
        </p>
        <pre className="bg-surface/60 border border-border rounded-lg p-3 text-xs font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
{`Write a Kraken Intel article about [TOPIC].
Output a valid JSON import package with this exact structure:
{ "article": { ... }, "starterDrop": { ... } }

The article should:
- Teach concepts, systems, and strategies (not gate content)
- Have a compelling title and excerpt
- Use content_blocks with types: heading, subheading, paragraph, bullet_list,
  numbered_steps, callout, cta_box, divider, comparison_cards, image
- For image blocks use: { "type": "image", "url": "", "alt": "description" }
  (leave url empty — you will upload images after import)

The starterDrop should:
- Provide a complete build prompt
- Include a file tree, setup steps, edit map, and troubleshooting guide`}
        </pre>
      </div>
    </div>
  );
}

// ── Shared helpers ────────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/50 transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
