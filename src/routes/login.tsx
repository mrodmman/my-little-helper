import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import { getAuthUser } from "@/rpc/auth";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const user = await getAuthUser();
    if (user) throw redirect({ to: "/vault" });
  },
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — Kraken Vault" },
      { name: "description", content: "Sign in to The Kraken Vault to access your modules, Fast Track, and asset library." },
    ],
  }),
});

function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const endpoint = mode === "signin" ? "/auth/login" : "/auth/register";
      const body =
        mode === "signin"
          ? { email, password }
          : { email, password, first_name: firstName };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = (await res.json()) as { ok: boolean; error?: string; redirect?: string };
      if (data.ok && data.redirect) {
        window.location.href = data.redirect;
      } else {
        setError(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-surface" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl -z-10" />

      <div className="w-full max-w-md">
        <Link to="/kraken" className="block text-center text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground mb-8">
          ← The Kraken Vault
        </Link>

        <div className="glass-card border-glow rounded-3xl p-8 md:p-10">
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "signin" ? "Sign in to your vault" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Pick up exactly where you left off."
              : "Modules, Fast Track, and assets unlock instantly."}
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            {mode === "signup" && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Matt Kraken"
                    className="w-full rounded-xl bg-surface/60 border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full rounded-xl bg-surface/60 border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-surface/60 border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground py-3 text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading
                ? mode === "signin" ? "Signing in…" : "Creating account…"
                : mode === "signin" ? "Sign in" : "Create account"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
