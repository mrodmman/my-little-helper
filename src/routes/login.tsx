import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { logIn, getCurrentUser } from "@/server/auth";

const toDataUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;
const logoBg = toDataUri(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'>
  <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
    <stop offset='0%' stop-color='#60a5fa'/><stop offset='100%' stop-color='#8b5cf6'/>
  </linearGradient></defs>
  <rect width='80' height='80' rx='40' fill='#0b1220'/>
  <circle cx='40' cy='40' r='31' fill='none' stroke='url(#g)' stroke-width='4'/>
  <path d='M24 54V26h8l8 10 8-10h8v28h-8V38l-8 9-8-9v16z' fill='url(#g)'/>
</svg>`);

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  loader: async () => {
    const user = await getCurrentUser().catch(() => null);
    if (user) throw redirect({ to: "/" });
    return null;
  },
  head: () => ({ meta: [{ title: "Sign in — Kraken Vault" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [needsVerify, setNeedsVerify] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNeedsVerify(false);
    startTransition(async () => {
      const result = await logIn({ data: { email, password } }).catch((err) => ({
        ok: false as const,
        error: String(err),
        needsVerify: false,
        email,
        role: undefined,
      }));
      if (result.ok) {
        navigate({ to: "/" });
      } else {
        setError(result.error ?? "Something went wrong.");
        if (result.needsVerify) setNeedsVerify(true);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <img src={logoBg} alt="Kraken Vault" className="h-14 w-14 rounded-full mx-auto mb-4 ring-1 ring-primary/40" />
          <h1 className="text-2xl font-bold tracking-tight">Sign in to The Vault</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your email and password below</p>
        </div>

        <div className="glass-card rounded-3xl p-8 border-glow space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthField label="Email" htmlFor="email">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="email" type="email" value={email} required autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                placeholder="you@example.com"
              />
            </AuthField>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Password</span>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password" type={showPw ? "text" : "password"} value={password} required autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-xs text-destructive leading-relaxed">
                {error}
                {needsVerify && (
                  <button type="button" className="block mt-1 text-primary hover:underline"
                    onClick={() => navigate({ to: "/signup" })}>
                    Resend verification email →
                  </button>
                )}
              </div>
            )}

            <button type="submit" disabled={isPending}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 disabled:opacity-50 transition-opacity">
              {isPending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function AuthField({
  label, htmlFor, children,
}: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-xs uppercase tracking-wider text-muted-foreground block mb-1.5">
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}
