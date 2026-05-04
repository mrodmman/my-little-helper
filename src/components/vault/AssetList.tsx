import { useState } from "react";
import {
  Play, Copy, Check, Download, ExternalLink, FileText, Link2, Sparkles,
} from "lucide-react";
import type { Asset } from "@/data/assets";
import { cn } from "@/lib/utils";

export function AssetList({ assets, title = "Resources for this lesson" }: { assets: Asset[]; title?: string }) {
  if (!assets.length) return null;
  return (
    <section className="mt-10 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{title}</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {assets.map((a) => <AssetCard key={a.id} asset={a} />)}
      </div>
    </section>
  );
}

function AssetCard({ asset }: { asset: Asset }) {
  switch (asset.type) {
    case "video": return <VideoCard asset={asset} />;
    case "prompt": return <PromptCard asset={asset} />;
    case "file": return <FileCard asset={asset} />;
    case "link": return <LinkCard asset={asset} />;
  }
}

function Shell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("glass-card rounded-2xl border border-border/60 p-5", className)}>
      {children}
    </div>
  );
}

function Header({ icon: Icon, label, title, right }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; title: string; right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 mb-3">
      <div className="h-9 w-9 rounded-xl bg-gradient-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="font-semibold leading-snug truncate">{title}</div>
      </div>
      {right}
    </div>
  );
}

function VideoCard({ asset }: { asset: Extract<Asset, { type: "video" }> }) {
  const [open, setOpen] = useState(false);
  return (
    <Shell>
      <Header icon={Play} label={`Video${asset.duration ? ` · ${asset.duration}` : ""}`} title={asset.title} />
      {asset.description && <p className="text-sm text-muted-foreground mb-3">{asset.description}</p>}
      {open ? (
        <div className="aspect-video rounded-xl overflow-hidden border border-border">
          <iframe
            src={asset.url}
            title={asset.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="w-full aspect-video rounded-xl border border-border bg-surface/40 hover:bg-surface-elevated flex items-center justify-center gap-2 text-sm font-semibold transition-colors"
        >
          <Play className="h-4 w-4 text-primary" /> Play video
        </button>
      )}
    </Shell>
  );
}

function PromptCard({ asset }: { asset: Extract<Asset, { type: "prompt" }> }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(asset.body); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* noop */ }
  };
  return (
    <Shell>
      <Header
        icon={FileText}
        label="Prompt / Script"
        title={asset.title}
        right={
          <button
            onClick={copy}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold border transition-colors",
              copied ? "border-primary/40 bg-primary/15 text-primary" : "border-border bg-surface/60 hover:border-primary/40",
            )}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        }
      />
      {asset.description && <p className="text-sm text-muted-foreground mb-3">{asset.description}</p>}
      <pre className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap rounded-xl border border-border bg-background/60 p-4 font-mono text-foreground/90">
{asset.body}
      </pre>
    </Shell>
  );
}

function FileCard({ asset }: { asset: Extract<Asset, { type: "file" }> }) {
  return (
    <Shell>
      <Header
        icon={Download}
        label={`File${asset.format ? ` · ${asset.format}` : ""}${asset.size ? ` · ${asset.size}` : ""}`}
        title={asset.title}
      />
      {asset.description && <p className="text-sm text-muted-foreground mb-3">{asset.description}</p>}
      <a
        href={asset.url}
        download={asset.filename}
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold bg-gradient-primary text-primary-foreground shadow-glow"
      >
        <Download className="h-4 w-4" /> Download
      </a>
    </Shell>
  );
}

function LinkCard({ asset }: { asset: Extract<Asset, { type: "link" }> }) {
  return (
    <Shell>
      <Header icon={Link2} label={asset.source ? `Link · ${asset.source}` : "Link"} title={asset.title} />
      {asset.description && <p className="text-sm text-muted-foreground mb-3">{asset.description}</p>}
      <a
        href={asset.url}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border border-border bg-surface/60 hover:border-primary/40 transition-colors"
      >
        <ExternalLink className="h-4 w-4" /> Open
      </a>
    </Shell>
  );
}
