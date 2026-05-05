import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { signUp, resendVerification, getCurrentUser } from "@/server/auth";
import { AuthField } from "./login";

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

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  validateSearch: (s: Record<string, unknown>) => ({
    resend: typeof s.resend === "string" ? s.resend : undefined,
  }),
  loader: async ({ context: _ }) => {
    const user = await getCurrentUser().catch(() => null);
    if (user) throw redirect({ to: "/" });
    return null;
  },
  head: () => ({ meta: [{ title: "Create account — Kraken Vault" }] }),
});

function SignupPage() {
  const search = Route.useSearch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(search.resend ?? "");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [resendDone, setResendDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  // "resend" mode — the user came from the login error, just resend verification
  const isResendMode = !!search.resend && !done;

  const handleResend = () => {
    startTransition(async () => {
      await resendVerification({ data: email }).catch(() => null);
      setResendDone(true);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const result = await signUp({ data: { name, email, password } }).catch((err) => ({
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

  if (done || resendDone) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-sm text-center glass-card rounded-3xl p-10 border-glow space-y-4">
          <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-xl font-bold">Check your inbox</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We sent a verification link to <strong className="text-foreground">{email}</strong>.
            Click the link in the email to activate your account.
          </p>
          <p className="text-xs text-muted-foreground">The link expires in 24 hours.</p>
          <Link to="/login" className="inline-block text-sm text-primary hover:underline mt-2">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  if (isResendMode) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <img src={logoBg} alt="Kraken Vault" className="h-14 w-14 rounded-full mx-auto mb-4 ring-1 ring-primary/40" />
            <h1 className="text-2xl font-bold tracking-tight">Resend verification</h1>
            <p className="text-sm text-muted-foreground mt-1">
              We'll send a new link to <strong className="text-foreground">{email}</strong>
            </p>
          </div>
          <div className="glass-card rounded-3xl p-8 border-glow space-y-4">
            <button onClick={handleResend} disabled={isPending}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 disabled:opacity-50 transition-opacity">
              {isPending ? "Sending…" : "Resend verification email"}
            </button>
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/signup" className="text-primary hover:underline">Use a different email</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <img src={logoBg} alt="Kraken Vault" className="h-14 w-14 rounded-full mx-auto mb-4 ring-1 ring-primary/40" />
          <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Get access to all 10 modules</p>
        </div>

        <div className="glass-card rounded-3xl p-8 border-glow space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthField label="Full name" htmlFor="name">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="name" type="text" value={name} required autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                placeholder="Your name"
              />
            </AuthField>

            <AuthField label="Email" htmlFor="signup-email">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="signup-email" type="email" value={email} required autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                placeholder="you@example.com"
              />
            </AuthField>

            <AuthField label="Password" htmlFor="signup-password">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="signup-password" type={showPw ? "text" : "password"} value={password} required autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                placeholder="At least 8 characters"
              />
              <button type="button" onClick={() => setShowPw((v) => !v)} tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </AuthField>

            {error && (
              <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
                {error}
              </div>
            )}

            <button type="submit" disabled={isPending}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 disabled:opacity-50 transition-opacity">
              {isPending ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            By signing up you agree to our terms. We'll email you a verification link.
          </p>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
