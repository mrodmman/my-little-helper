import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/unsubscribed')({
  component: UnsubscribedPage,
});

function UnsubscribedPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full bg-muted/40 blur-2xl" />
          <div className="relative h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-muted-foreground" strokeWidth={2} />
          </div>
        </div>

        <h1 className="font-display uppercase text-3xl font-black tracking-tight text-foreground">
          You&apos;re unsubscribed.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          You won&apos;t receive any more emails from Keyboard Kraken. No hard feelings.
        </p>

        <Link
          to="/kraken"
          className="mt-8 inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
