/**
 * Admin dashboard — overview stats and quick links.
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Package, Users, TrendingUp, ArrowRight } from "lucide-react";
import { getAllModulesAdmin, getAllAssets } from "@/rpc/modules";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
  loader: async () => {
    const [modules, assets] = await Promise.all([
      getAllModulesAdmin().catch(() => []),
      getAllAssets().catch(() => []),
    ]);
    const totalLessons = 0; // Queried per-module; skip for dashboard speed
    return { moduleCount: modules.length, assetCount: assets.length, totalLessons };
  },
});

function AdminDashboard() {
  const { moduleCount, assetCount } = Route.useLoaderData();

  const cards = [
    {
      label: "Modules",
      value: moduleCount,
      icon: BookOpen,
      to: "/admin/modules",
      description: "Manage module metadata, order & visibility",
    },
    {
      label: "Assets",
      value: assetCount,
      icon: Package,
      to: "/admin/assets",
      description: "Videos, prompts, files and links",
    },
    {
      label: "Progress",
      value: "D1",
      icon: TrendingUp,
      to: "/vault",
      description: "Stored in Cloudflare D1 by session",
    },
    {
      label: "Users",
      value: "Anon",
      icon: Users,
      to: "/vault",
      description: "Cookie-based sessions, no login required",
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your course content, assets, and settings.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="glass-card glass-card-hover rounded-2xl p-5 group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-2xl font-bold">{c.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">{c.label}</div>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{c.description}</p>
          </Link>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            to="/admin/modules"
            className="flex items-center gap-3 rounded-xl bg-surface/60 border border-border p-4 hover:border-primary/40 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-primary shrink-0" />
            <div>
              <div className="text-sm font-medium">Manage Modules</div>
              <div className="text-xs text-muted-foreground">Reorder, edit, toggle visibility</div>
            </div>
          </Link>
          <Link
            to="/admin/assets"
            className="flex items-center gap-3 rounded-xl bg-surface/60 border border-border p-4 hover:border-primary/40 transition-colors"
          >
            <Package className="h-5 w-5 text-primary shrink-0" />
            <div>
              <div className="text-sm font-medium">Asset Vault</div>
              <div className="text-xs text-muted-foreground">Videos, prompts, files, links</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Setup Checklist</h2>
        <ul className="space-y-2 text-sm">
          {[
            "Create D1 database: bunx wrangler d1 create kraken-vault-db",
            "Run migration: bunx wrangler d1 execute kraken-vault-db --file=migrations/0001_init.sql",
            "Seed data: bun scripts/seed.ts → bunx wrangler d1 execute kraken-vault-db --file=scripts/seed.sql",
            "Create R2 bucket: bunx wrangler r2 bucket create kraken-vault-assets",
            "Set ADMIN_SECRET in wrangler.jsonc vars",
            "Deploy: npm run build && npx wrangler deploy --config dist/server/wrangler.json",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full border border-border flex items-center justify-center text-[10px] text-muted-foreground font-semibold">
                {i + 1}
              </span>
              <code className="text-xs text-muted-foreground leading-relaxed">{step}</code>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
