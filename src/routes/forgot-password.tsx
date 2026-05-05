import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { requestPasswordReset } from "@/server/auth";
import { AuthField } from "./login";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
  head: () => ({ meta: [{ title: "Forgot password — Kraken Vault" }] }),
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await requestPasswordReset({ data: email }).catch(() => null);
      setDone(true); // always show success to avoid email enumeration
    });
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-sm text-center glass-card rounded-3xl p-10 border-glow space-y-4">
          <CheckCircle2 className="h-12 w-12 text-primary mx-auto" />
          <h1 className="text-xl font-bold">Check your inbox</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            If an account exists for <strong className="text-foreground">{email}</strong>, we sent a
            password reset link. The link expires in 1 hour.
          </p>
          <Link to="/login" className="inline-block text-sm text-primary hover:underline mt-2">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Forgot your password?</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border-glow space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthField label="Email" htmlFor="forgot-email">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="forgot-email" type="email" value={email} required autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface/60 border border-border rounded-xl pl-10 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                placeholder="you@example.com"
              />
            </AuthField>

            <button type="submit" disabled={isPending}
              className="w-full bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 disabled:opacity-50 transition-opacity">
              {isPending ? "Sending…" : "Send reset link"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="text-primary hover:underline">Back to sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
