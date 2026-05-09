import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/offer")({ component: OfferPage });

const POINTS = [
  "Step-by-step system order so you know exactly what to do next",
  "Done-for-you funnel and email assets you can adapt quickly",
  "Automation layer to reduce manual busywork and keep momentum",
  "Built for both beginners and people restarting after burnout",
];

function OfferPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-16 pb-12 md:pt-24 border-b border-border">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            The Kraken Vault
          </div>
          <h1 className="mt-6 font-display uppercase text-4xl md:text-6xl font-black tracking-tight leading-[0.95] text-foreground">
            Build your growth machine with one connected path.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Whether you came from the free guide or landed here first, this is where the complete
            system lives: offer setup, funnel flow, email nurture, and automation execution.
          </p>
          <a
            href="mailto:matt@krakenvault.com?subject=Kraken%20Vault%20Access"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Get Access <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-sm text-muted-foreground">Stripe checkout coming soon.</p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-4xl grid gap-4">
          {POINTS.map((point) => (
            <div key={point} className="rounded-lg border border-border bg-surface p-4 flex items-start gap-3">
              <Check className="h-5 w-5 mt-0.5 text-primary shrink-0" />
              <p className="text-foreground/90">{point}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
