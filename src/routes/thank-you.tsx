import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/thank-you")({ component: ThankYouPage });

function ThankYouPage() {
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
          Your jumpstart guide is <span className="text-primary">on its way.</span>
        </h1>

        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Check your inbox for the first email. If you do not see it in a couple minutes, check
          promotions or spam.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/jumpstart-guide.html"
            className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Open the 7-Day Guide <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/begin"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-black uppercase tracking-wider hover:bg-surface-elevated transition"
          >
            Back to Start
          </Link>
        </div>

        <div className="mt-10 rounded-lg border border-border bg-surface p-6 text-left">
          <h2 className="font-display uppercase text-xl font-black tracking-tight text-foreground">
            Next step: The Kraken Vault
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The guide gives you momentum. The Vault gives you the full build path — funnel, email,
            automation, and execution in one place.
          </p>
          <Link
            to="/offer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Explore the Vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
