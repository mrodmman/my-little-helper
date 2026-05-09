import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/thank-you")({ component: ThankYouPage });

function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black">Your Jumpstart Guide is on its way.</h1>
        <p className="mt-4 text-muted-foreground">Check your inbox in the next few minutes. If you don't see it, check Promotions or Spam.</p>
        <p className="mt-8 text-lg">Next step: explore the full Kraken Vault system.</p>
        <Link to="/offer" className="mt-6 inline-flex rounded-md bg-primary text-primary-foreground px-6 py-3 font-semibold">Explore the Vault</Link>
      </div>
    </main>
  );
}
