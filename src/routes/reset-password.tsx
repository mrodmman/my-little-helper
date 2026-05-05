import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { validateResetToken, resetPassword } from "@/server/auth";
import { AuthField } from "./login";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : "",
  }),
  loader: async ({ search }) => {
    if (!search.token) throw redirect({ to: "/login" });
    const { valid } = await validateResetToken({ data: search.token }).catch(() => ({ valid: false }));
    return { valid, token: search.token };
  },
  head: () => ({ meta: [{ title: "Reset password — Kraken Vault" }] }),
});

function ResetPasswordPage() {
  const { valid, token } = Route.useLoaderData();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-sm text-center glass-card rounded-3xl p-10 border-glow space-y-4">
          <h1 className="text-xl font-bold">Link expired</h1>
          <p className="text-sm text-muted-foreground">This reset link is invalid or has expired.</p>
          <Link to="/forgot-password" className="inline-block text-sm text-primary hover:underline">
            Request a new link
          </Link>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-sm text-center glass-card rounded-3xl p-10 border-glow space-y-4">
          <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-xl font-bold">Password updated</h1>
          <p className="text-sm text-muted-foreground">You can now sign in with your new password.</p>
          <Link to="/login" className="inline-block text-sm text-primary hover:underline">
            Sign in →
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords don't match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    startTransition(async () => {
      const result = await resetPassword({ data: { token, password } }).catch((err) => ({
        ok: false as const,
        error: String(err),
      }));
      if (result.ok) {
        setDone(true);
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Choose a new password</h1>
          <p className="text-sm text-muted-foreground mt-1">At least 8 characters</p>
        </div>

        <div className="glass-card rounded-3xl p-8 border-glow space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthField label="New password" htmlFor="new-password">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="new-password" type={showPw ? "text" : "password"} value={password} required autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPw((v) => !v)} tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </AuthField>

            <AuthField label="Confirm password" htmlFor="confirm-password">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="confirm-password" type={showPw ? "text" : "password"} value={confirm} required autoComplete="new-password"
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                placeholder="••••••••"
              />
            </AuthField>

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
                {error}
              </div>
            )}

            <button type="submit" disabled={isPending}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 disabled:opacity-50 transition-opacity">
              {isPending ? "Updating…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
