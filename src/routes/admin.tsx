/**
 * Admin layout — wraps all /admin/* routes.
 * Checks admin session; shows login form if not authenticated.
 */
import { createFileRoute, Link, Outlet, useRouter } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { LayoutDashboard, BookOpen, Package, LogOut, Settings } from "lucide-react";
import { checkAdminAuth, adminLogin, adminLogout } from "@/server/admin";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  loader: async () => {
    const { authenticated } = await checkAdminAuth().catch(() => ({ authenticated: false }));
    return { authenticated };
  },
});

function AdminLayout() {
  const { authenticated } = Route.useLoaderData();

  if (!authenticated) {
    return <LoginGate />;
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col">
      {/* Admin topbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              ← Public site
            </Link>
            <span className="text-muted-foreground/40">|</span>
            <div className="flex items-center gap-1.5">
              <Settings className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Admin</span>
            </div>
          </div>
          <AdminLogoutButton />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar nav */}
        <nav className="hidden md:flex flex-col gap-1 w-52 shrink-0 border-r border-border bg-surface/30 p-4">
          {[
            { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
            { to: "/admin/modules", label: "Modules", icon: BookOpen },
            { to: "/admin/assets", label: "Assets", icon: Package },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/admin" }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all"
              activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden border-b border-border bg-surface/30 px-4 flex gap-1 py-2">
          {[
            { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
            { to: "/admin/modules", label: "Modules", icon: BookOpen },
            { to: "/admin/assets", label: "Assets", icon: Package },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === "/admin" }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </div>

        <main className="flex-1 min-w-0 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AdminLogoutButton() {
  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      await adminLogout().catch(() => null);
      router.invalidate();
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
    >
      <LogOut className="h-3.5 w-3.5" />
      Log out
    </button>
  );
}

function LoginGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await adminLogin({ data: password }).catch(() => ({ ok: false, error: "Error" }));
      if (result.ok) {
        router.invalidate();
      } else {
        setError(result.error ?? "Incorrect password");
        setPassword("");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm glass-card rounded-3xl p-8 border-glow">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-primary/20 border border-primary/40 items-center justify-center mb-4">
            <Settings className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your admin password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-pw" className="text-xs uppercase tracking-wider text-muted-foreground block mb-1.5">
              Password
            </label>
            <input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface/60 border border-border rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
              placeholder="••••••••"
              autoFocus
              required
            />
          </div>

          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={isPending || !password}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 disabled:opacity-50 transition-opacity"
          >
            {isPending ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
