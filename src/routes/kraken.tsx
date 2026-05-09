import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/kraken")({ component: KrakenPage });

function KrakenPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    }).catch(() => null);
    setStatus(res?.ok ? "sent" : "error");
  };

  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">Keyboard Kraken</h1>
        <p className="mt-4 text-muted-foreground">Build systems that grow your business, audience, and income.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/funnel" className="rounded-md bg-primary text-primary-foreground px-6 py-3 font-semibold">Get the free guide</Link>
          <Link to="/offer" className="rounded-md border border-border px-6 py-3 font-semibold">Explore the Vault</Link>
          <button onClick={() => setOpen(true)} className="rounded-md border border-border px-6 py-3 font-semibold">Work With Me</button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <form onSubmit={submit} className="w-full max-w-md rounded-xl bg-background border border-border p-6 space-y-3">
            <h2 className="text-xl font-bold">Work With Me</h2>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border border-border rounded px-3 py-2 bg-surface" />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-border rounded px-3 py-2 bg-surface" />
            <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" className="w-full border border-border rounded px-3 py-2 bg-surface" />
            <div className="flex gap-2">
              <button type="submit" className="rounded bg-primary text-primary-foreground px-4 py-2" disabled={status === "sending"}>Send</button>
              <button type="button" className="rounded border border-border px-4 py-2" onClick={() => setOpen(false)}>Close</button>
            </div>
            {status === "sent" && <p className="text-sm text-green-500">Thanks — message sent.</p>}
            {status === "error" && <p className="text-sm text-red-500">Could not send. Try again.</p>}
          </form>
        </div>
      )}
    </main>
  );
}
