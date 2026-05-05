import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { CheckCircle2, XCircle } from "lucide-react";
import { verifyEmail } from "@/server/auth";

export const Route = createFileRoute("/verify-email")({
  component: VerifyEmailPage,
  validateSearch: (s: Record<string, unknown>) => ({
    token: typeof s.token === "string" ? s.token : "",
  }),
  loader: async ({ search }) => {
    if (!search.token) throw redirect({ to: "/login" });
    const result = await verifyEmail({ data: search.token }).catch((err) => ({
      ok: false as const,
      error: String(err),
    }));
    return result;
  },
  head: () => ({ meta: [{ title: "Verify email — Kraken Vault" }] }),
});

function VerifyEmailPage() {
  const result = Route.useLoaderData();

  if (result.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-sm text-center glass-card rounded-3xl p-10 border-glow space-y-4">
          <CheckCircle2 className="h-14 w-14 text-primary mx-auto" />
          <h1 className="text-2xl font-bold">You're in! 🦑</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your email is verified and you're logged in. Welcome to The Kraken Vault.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-primary text-primary-foreground font-semibold rounded-xl px-6 py-3 shadow-glow hover:opacity-95 transition-opacity"
          >
            Enter The Vault →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-sm text-center glass-card rounded-3xl p-10 border-glow space-y-4">
        <XCircle className="h-14 w-14 text-destructive mx-auto" />
        <h1 className="text-xl font-bold">Link expired</h1>
        <p className="text-sm text-muted-foreground">
          {result.error ?? "This verification link is invalid or has expired."}
        </p>
        <Link to="/signup" className="inline-block text-sm text-primary hover:underline">
          Sign up again to get a new link
        </Link>
      </div>
    </div>
  );
}
