import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/funnel")({ component: FunnelPage });

function FunnelPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-primary">Free training</p>
        <h1 className="text-4xl font-bold mt-2">Steal the Kraken 3-Step Income System</h1>
        <p className="mt-3 text-muted-foreground">Get the quickstart + checklists and then continue to your next step.</p>

        <form
          className="mt-8 grid gap-3 max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim()) return;
            navigate({ to: "/thank-you", search: { email, name } as never });
          }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First name"
            className="rounded-xl border border-border bg-surface/60 px-4 py-3"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Best email"
            className="rounded-xl border border-border bg-surface/60 px-4 py-3"
          />
          <button className="rounded-xl bg-primary text-primary-foreground px-4 py-3 font-semibold">Get Instant Access</button>
        </form>

        <div className="mt-8 text-sm text-muted-foreground">Already inside? <Link to="/login" className="text-primary">Sign in</Link></div>
      </div>
    </main>
  );
}
