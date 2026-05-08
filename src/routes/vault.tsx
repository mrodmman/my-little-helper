import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { getAuthUser } from "@/rpc/auth";
import {
  Lock,
  Search,
  Plus,
  Copy,
  Eye,
  EyeOff,
  Shield,
  KeyRound,
  CreditCard,
  StickyNote,
  Globe,
  Github,
  Wallet,
  Mail,
  Server,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vault")({
  beforeLoad: async () => {
    const user = await getAuthUser();
    if (!user) throw redirect({ to: "/login" });
    return { user };
  },
  head: () => ({
    meta: [
      { title: "Vault — Secure Storage" },
      {
        name: "description",
        content: "End-to-end encrypted vault for passwords, keys, and secure notes.",
      },
      { property: "og:title", content: "Vault — Secure Storage" },
      {
        property: "og:description",
        content: "End-to-end encrypted vault for passwords, keys, and secure notes.",
      },
    ],
  }),
  component: VaultPage,
});

type Category = "all" | "logins" | "keys" | "cards" | "notes";

type VaultItem = {
  id: string;
  name: string;
  username: string;
  secret: string;
  category: Exclude<Category, "all">;
  icon: typeof Globe;
  updatedAt: string;
  strength: "weak" | "fair" | "strong";
  tag?: string;
};

const ITEMS: VaultItem[] = [
  { id: "1", name: "GitHub", username: "alex@dev.io", secret: "ghp_•••••••••••••••••••3a9F", category: "keys", icon: Github, updatedAt: "2d ago", strength: "strong", tag: "Production" },
  { id: "2", name: "Stripe Live Key", username: "sk_live", secret: "sk_live_••••••••••••••••H4tQ", category: "keys", icon: KeyRound, updatedAt: "5d ago", strength: "strong", tag: "Billing" },
  { id: "3", name: "Vercel", username: "alex@dev.io", secret: "••••••••••••••", category: "logins", icon: Globe, updatedAt: "1w ago", strength: "strong" },
  { id: "4", name: "Gmail Personal", username: "alex.k@gmail.com", secret: "••••••••", category: "logins", icon: Mail, updatedAt: "3w ago", strength: "fair" },
  { id: "5", name: "AWS Root", username: "root@org", secret: "••••••••••••••••", category: "logins", icon: Server, updatedAt: "1mo ago", strength: "strong", tag: "Critical" },
  { id: "6", name: "Visa ••4421", username: "Alex Karim", secret: "•••• •••• •••• 4421", category: "cards", icon: CreditCard, updatedAt: "6mo ago", strength: "strong" },
  { id: "7", name: "Recovery phrase", username: "Cold wallet", secret: "12 words ••••••", category: "notes", icon: Wallet, updatedAt: "2mo ago", strength: "strong", tag: "Offline" },
  { id: "8", name: "Old Twitter", username: "@alex", secret: "••••••", category: "logins", icon: Globe, updatedAt: "1y ago", strength: "weak" },
];

const CATEGORIES: { id: Category; label: string; icon: typeof Lock }[] = [
  { id: "all", label: "All items", icon: Shield },
  { id: "logins", label: "Logins", icon: Globe },
  { id: "keys", label: "API keys", icon: KeyRound },
  { id: "cards", label: "Cards", icon: CreditCard },
  { id: "notes", label: "Secure notes", icon: StickyNote },
];

function strengthColor(s: VaultItem["strength"]) {
  if (s === "strong") return "bg-vault-accent";
  if (s === "fair") return "bg-vault-warn";
  return "bg-vault-danger";
}

function VaultPage() {
  const [active, setActive] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(ITEMS[0].id);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const items = useMemo(() => {
    return ITEMS.filter((i) => active === "all" || i.category === active).filter(
      (i) =>
        i.name.toLowerCase().includes(query.toLowerCase()) ||
        i.username.toLowerCase().includes(query.toLowerCase()),
    );
  }, [active, query]);

  const selected = ITEMS.find((i) => i.id === selectedId) ?? items[0];

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div
      className="dark min-h-screen text-foreground font-sans"
      style={{
        background: "var(--gradient-vault), var(--color-background)",
      }}
    >
      {/* Top bar */}
      <header className="border-b border-vault-line/60 backdrop-blur-xl bg-background/40 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-vault-accent-soft border border-vault-accent/30 flex items-center justify-center">
              <Lock className="h-4 w-4 text-vault-accent" />
            </div>
            <div className="leading-tight">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                vault / personal
              </div>
              <div className="text-sm font-medium">Encrypted · synced</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-mono text-[10px] uppercase tracking-wider border-vault-accent/40 text-vault-accent">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-vault-accent animate-pulse" />
              Unlocked
            </Badge>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition">
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 lg:col-span-3 space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight mb-6">
            Your vault
            <span className="block text-sm font-normal text-muted-foreground mt-1">
              {ITEMS.length} items · zero-knowledge
            </span>
          </h1>
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const count = c.id === "all" ? ITEMS.length : ITEMS.filter((i) => i.category === c.id).length;
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={cn(
                  "w-full group flex items-center justify-between rounded-md px-3 py-2.5 text-sm transition border border-transparent",
                  isActive
                    ? "bg-vault-elevated border-vault-line text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-vault-elevated/50",
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className={cn("h-4 w-4", isActive && "text-vault-accent")} />
                  {c.label}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{count}</span>
              </button>
            );
          })}

          <div className="mt-8 rounded-lg border border-vault-line bg-vault-surface/60 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-vault-accent" />
              <span className="text-sm font-medium">Vault health</span>
            </div>
            <div className="text-3xl font-semibold font-mono">87<span className="text-muted-foreground text-base">/100</span></div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-vault-line overflow-hidden">
              <div className="h-full w-[87%] bg-vault-accent" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              1 weak password · 2 reused. Review to improve your score.
            </p>
          </div>
        </aside>

        {/* List */}
        <section className="col-span-12 lg:col-span-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vault…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 bg-vault-surface/60 border-vault-line h-10"
              />
            </div>
            <Button size="sm" className="h-10 bg-vault-accent text-background hover:bg-vault-accent/90">
              <Plus className="h-4 w-4 mr-1" /> New
            </Button>
          </div>

          <div className="rounded-xl border border-vault-line bg-vault-surface/40 overflow-hidden divide-y divide-vault-line">
            {items.map((item) => {
              const Icon = item.icon;
              const isSelected = selected?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setRevealed(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 px-4 py-3.5 text-left transition group",
                    isSelected ? "bg-vault-elevated" : "hover:bg-vault-elevated/60",
                  )}
                >
                  <div className="h-9 w-9 rounded-md bg-background/60 border border-vault-line flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{item.name}</span>
                      {item.tag && (
                        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-vault-line text-muted-foreground">
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground truncate font-mono">
                      {item.username}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={cn("h-1.5 w-1.5 rounded-full", strengthColor(item.strength))} />
                    <span className="text-xs text-muted-foreground font-mono w-14 text-right">
                      {item.updatedAt}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </button>
              );
            })}
            {items.length === 0 && (
              <div className="px-6 py-14 text-center text-sm text-muted-foreground">
                Nothing matches "{query}".
              </div>
            )}
          </div>
        </section>

        {/* Detail */}
        <section className="col-span-12 lg:col-span-4">
          {selected && (
            <div
              className="rounded-xl border border-vault-line bg-vault-surface p-6 sticky top-24"
              style={{ boxShadow: "var(--shadow-vault)" }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-vault-accent-soft border border-vault-accent/30 flex items-center justify-center">
                    <selected.icon className="h-5 w-5 text-vault-accent" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold leading-tight">{selected.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {selected.category} · updated {selected.updatedAt}
                    </div>
                  </div>
                </div>
                <span className={cn("h-2 w-2 rounded-full mt-2", strengthColor(selected.strength))} />
              </div>

              <div className="mt-6 space-y-4">
                <Field label="Username">
                  <span className="font-mono text-sm">{selected.username}</span>
                </Field>

                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
                    Secret
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-vault-line bg-background/40 px-3 py-2.5">
                    <span className="font-mono text-sm flex-1 truncate">
                      {revealed ? "k9$Lq2!nZ#0vF7@bH3rT" : selected.secret}
                    </span>
                    <button
                      onClick={() => setRevealed((r) => !r)}
                      className="p-1.5 rounded hover:bg-vault-elevated text-muted-foreground hover:text-foreground transition"
                    >
                      {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={copy}
                      className="p-1.5 rounded hover:bg-vault-elevated text-muted-foreground hover:text-foreground transition"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-vault-accent" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Field label="Strength">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1.5 w-6 rounded-full",
                            i <= (selected.strength === "strong" ? 5 : selected.strength === "fair" ? 3 : 1)
                              ? strengthColor(selected.strength)
                              : "bg-vault-line",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground capitalize font-mono">
                      {selected.strength}
                    </span>
                  </div>
                </Field>
              </div>

              <div className="mt-6 pt-6 border-t border-vault-line flex gap-2">
                <Button variant="outline" className="flex-1 border-vault-line bg-transparent hover:bg-vault-elevated">
                  Edit
                </Button>
                <Button variant="outline" className="flex-1 border-vault-line bg-transparent hover:bg-vault-elevated text-destructive hover:text-destructive">
                  Delete
                </Button>
              </div>

              <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
                <Lock className="h-3 w-3 mt-0.5 shrink-0" />
                Encrypted with AES-256 on your device. We never see your secrets.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
        {label}
      </div>
      {children}
    </div>
  );
}
