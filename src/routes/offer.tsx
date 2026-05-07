import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/offer")({ component: OfferPage });

function OfferPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Recommended next step</p>
        <h1 className="text-4xl font-bold mt-2">Join The Kraken Vault</h1>
        <p className="mt-3 text-muted-foreground">Everything from tools → funnel → email → automation in one place.</p>
        <div className="mt-8 flex gap-3">
          <Link to="/login" className="rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold">Sign up / Sign in</Link>
          <Link to="/" className="rounded-xl border border-border px-5 py-3 font-semibold">Preview Vault</Link>
        </div>
      </div>
    </main>
  );
}
