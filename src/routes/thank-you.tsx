import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/thank-you")({ component: ThankYouPage });

function ThankYouPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold">You’re in 🎉</h1>
        <p className="mt-3 text-muted-foreground">Check your inbox for your quickstart guide.</p>
        <Link to="/offer" className="inline-flex mt-8 rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold">Continue to Next Step</Link>
      </div>
    </main>
  );
}
