import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
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

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-surface" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl -z-10" />

      <div className="w-full max-w-md">
        <Link to="/" className="block text-center text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground mb-8">
          ← The Kraken Vault
        </Link>

        <div className="glass-card border-glow rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            {mode === "signin" ? "Welcome back" : "Join the crew"}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "signin" ? "Sign in to your vault" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Pick up exactly where you left off."
              : "Free to start. Modules, Fast Track, and assets unlock instantly."}
          </p>

          <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Matt Kraken"
                  className="w-full rounded-xl bg-surface/60 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
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
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-surface/60 border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all"
                />
              </div>
            </div>

            {mode === "signin" && (
              <div className="flex items-center justify-between text-xs">
                <label className="inline-flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="rounded border-border" /> Remember me
                </label>
                <button type="button" className="text-primary hover:underline">Forgot password?</button>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground py-3 text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity"
            >
              {mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> or <div className="flex-1 h-px bg-border" />
          </div>

          <button
            type="button"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated py-3 text-sm font-medium transition-colors"
          >
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "signin" ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          UI preview only — backend not connected yet.
        </p>
      </div>
    </div>
  );
}
