import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Mail, Sparkles } from "lucide-react";

export const Route = createFileRoute("/thank-you")({ component: ThankYouPage });

function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20 flex items-center">
      <div className="mx-auto max-w-2xl w-full text-center">
        {/* Success visual */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl animate-pulse" />
          <div className="relative h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-primary mb-4">
          <Sparkles className="h-3.5 w-3.5" /> You're in
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          The system is on its way.{" "}
          <span className="text-gradient">Now keep the momentum.</span>
        </h1>

        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
          Your quickstart guide is landing in your inbox right now. While you wait — there's one
          more piece that turns this from theory into something you actually launch.
        </p>

        {/* Inbox hint card */}
        <div className="glass-card border-glow rounded-2xl p-5 mt-8 max-w-md mx-auto text-left">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">Check your inbox</div>
              <p className="text-xs text-muted-foreground mt-1">
                Subject line: <span className="text-foreground/90">"Your Kraken system is ready"</span>.
                Not there in 2 minutes? Peek in promotions or spam.
              </p>
            </div>
          </div>
        </div>

        {/* Next step */}
        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-3">
            Next step → unlock the full vault
          </p>
          <Link
            to="/offer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-glow hover:opacity-95 transition-opacity"
          >
            Continue to your next step <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-5">
            <Link
              to="/"
              className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
