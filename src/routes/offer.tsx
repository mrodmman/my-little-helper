import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/offer")({ component: OfferPage });

function OfferPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">The Kraken Vault</h1>
        <p className="mt-4 text-lg text-muted-foreground">Whether you're coming from the free guide or landing here first, this is the full system: funnel, email, content, automation, and monetization in one path.</p>
        <div className="mt-8 rounded-xl border border-border bg-surface p-6">
          <h2 className="text-2xl font-bold">What you get</h2>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Step-by-step modules from setup to revenue</li>
            <li>Fast Track for quick execution days</li>
            <li>Templates, prompts, and practical checklists</li>
          </ul>
        </div>
        <a href="mailto:matt@krakenvault.com?subject=Kraken%20Vault%20Access" className="mt-8 inline-flex rounded-md bg-primary text-primary-foreground px-6 py-3 font-semibold">Get Access</a>
        <p className="mt-2 text-xs text-muted-foreground">Stripe checkout coming soon.</p>
      </div>
    </main>
  );
}
