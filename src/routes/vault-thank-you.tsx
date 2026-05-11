import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/vault-thank-you")({ component: VaultThankYouPage });

function VaultThankYouPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl w-full text-center">
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
          <div className="relative h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-glow">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="font-display uppercase text-4xl md:text-5xl font-black tracking-tight leading-[1] text-foreground">
          You're in the <span className="text-primary">Vault.</span>
        </h1>

        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Check your inbox — your login credentials are on their way. If you don't see it in a
          couple minutes, check promotions or spam.
        </p>

        <div className="mt-10 rounded-lg border border-border bg-surface p-6 text-left">
          <h2 className="font-display uppercase text-xl font-black tracking-tight text-foreground">
            Ready to log in?
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Once you have your credentials, head to the login page and start building.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Go to Login <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
