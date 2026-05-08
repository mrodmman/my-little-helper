import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";

export const Route = createFileRoute("/thank-you")({ component: ThankYouPage });

const NEXT = [
  "Day 1 lands in your inbox right now",
  "Over the next few weeks I'll send you the full system breakdown",
  "No hype, just the actual build",
];

function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16 md:py-24">
      <div className="mx-auto max-w-2xl w-full text-center">
        {/* Big checkmark */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
          <div className="relative h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-glow">
            <CheckCircle2 className="h-10 w-10 text-primary-foreground" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="font-display uppercase text-4xl md:text-5xl font-black tracking-tight leading-[1] text-white">
          You're in. <span className="text-primary">Check your inbox now.</span>
        </h1>

        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Your 7-Day Jumpstart is on its way. Subject line:{" "}
          <span className="text-foreground/90">"Your jumpstart starts today"</span> — not there in
          2 minutes? Check promotions or spam.
        </p>

        {/* What happens next */}
        <div className="mt-10 rounded-lg border border-[#1f1f1f] bg-surface p-6 text-left">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-8 w-8 rounded-md bg-primary/15 text-primary flex items-center justify-center">
              <Mail className="h-4 w-4" />
            </div>
            <div className="font-display uppercase text-sm font-black tracking-[0.18em] text-white">
              What happens next
            </div>
          </div>
          <ul className="space-y-3">
            {NEXT.map((n) => (
              <li key={n} className="flex items-start gap-2.5 text-sm text-foreground/85">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                {n}
              </li>
            ))}
          </ul>
        </div>

        {/* Soft pitch */}
        <div className="mt-16 pt-12 border-t border-[#1a1a1a] text-left">
          <h2 className="font-display uppercase text-2xl md:text-3xl font-black tracking-tight text-white">
            Want to <span className="text-primary">skip ahead?</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            The Kraken Vault is the full machine. Everything connected. Built for people who are
            done starting over.
          </p>
          <Link
            to="/offer"
            className="mt-5 inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4"
          >
            Take a look <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
