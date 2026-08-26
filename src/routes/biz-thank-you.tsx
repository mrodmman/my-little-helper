import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, BookOpen, Mail } from "lucide-react";

export const Route = createFileRoute("/biz-thank-you")({ component: BizThankYouPage });

function BizThankYouPage() {
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
          Your customer leak audit is <span className="text-primary">ready now.</span>
        </h1>

        <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Open it below — we're also sending a copy to your inbox so you can come back to it any
          time.
        </p>

        {/* Primary CTA — instant access */}
        <a
          href="/playbook/business-owner-growth-playbook.html"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-md bg-primary text-primary-foreground px-8 py-4 text-base font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
        >
          <BookOpen className="h-5 w-5" />
          Open Your Customer Leak Audit
          <ArrowRight className="h-5 w-5" />
        </a>

        {/* Email backup note */}
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 shrink-0" />
          <span>Also sent to your inbox — check promotions if you don't see it.</span>
        </div>

        {/* Work with me upsell */}
        <div className="mt-12 rounded-lg border border-border bg-surface p-6 text-left">
          <h2 className="font-display uppercase text-xl font-black tracking-tight text-foreground">
            Want it built for you?
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            The audit shows you where customers may be slipping away. If you'd rather have the full
            lead system designed, deployed, and connected for your business — that's the Work With
            Me engagement.
          </p>
          <Link
            to="/kraken"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-sm font-black uppercase tracking-wider shadow-glow hover:brightness-110 transition"
          >
            Work With Me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
