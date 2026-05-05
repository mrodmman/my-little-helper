import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowLeft, Camera, CheckCircle2, CreditCard, Crown, Mail, User, Bell, Shield, LogOut } from "lucide-react";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Your profile — Kraken Vault" },
      { name: "description", content: "Edit your Kraken Vault profile, avatar, and subscription." },
    ],
  }),
});

function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("Matt Kraken");
  const [email, setEmail] = useState("matt@krakenvault.com");
  const [bio, setBio] = useState("Building a system that actually works. Grocery store manager turned online operator.");

  const onPick = (f: File | undefined) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatar(url);
  };

  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> The Vault
          </Link>
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Profile</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 grid lg:grid-cols-[260px_1fr] gap-10">
        {/* Side nav */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="glass-card rounded-2xl p-2 text-sm">
            {[
              { icon: User, label: "Profile", active: true },
              { icon: CreditCard, label: "Subscription" },
              { icon: Bell, label: "Notifications" },
              { icon: Shield, label: "Security" },
            ].map((i) => (
              <button
                key={i.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  i.active
                    ? "bg-gradient-primary/15 border border-primary/30 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/60 border border-transparent"
                }`}
              >
                <i.icon className="h-4 w-4" /> {i.label}
              </button>
            ))}
            <div className="border-t border-border my-2" />
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        <div className="space-y-8 min-w-0">
          {/* Profile card */}
          <section className="glass-card border-glow rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold tracking-tight">Profile</h2>
            <p className="text-sm text-muted-foreground mt-1">How you show up across The Vault.</p>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-gradient-primary/30 border border-primary/40 overflow-hidden flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                  {avatar
                    ? <img src={avatar} alt="" className="h-full w-full object-cover" />
                    : name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center shadow-glow hover:opacity-90 transition-opacity"
                  aria-label="Change avatar"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPick(e.target.files?.[0])}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="font-semibold text-foreground text-base">Profile picture</div>
                JPG, PNG or GIF. Square works best.
                <div className="mt-3 flex gap-2">
                  <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-1.5 text-xs">Upload new</button>
                  {avatar && (
                    <button onClick={() => setAvatar(null)} className="rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-1.5 text-xs">Remove</button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <Field label="Name" icon={User}>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </Field>
              <Field label="Email" icon={Mail}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </Field>
            </div>

            <div className="mt-4">
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Short bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full rounded-xl bg-surface/60 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button className="rounded-xl border border-border bg-surface/60 hover:bg-surface-elevated px-4 py-2.5 text-sm">Cancel</button>
              <button className="rounded-xl bg-gradient-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:opacity-90">Save changes</button>
            </div>
          </section>

          {/* Subscription card */}
          <section className="glass-card rounded-3xl p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" /> Subscription
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your plan and billing.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary/15 border border-primary/30 px-3 py-1 text-xs font-semibold text-primary">
                <CheckCircle2 className="h-3.5 w-3.5" /> Active
              </span>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-3">
              {[
                { name: "Free", price: "$0", note: "Module 1 + Fast Track preview" },
                { name: "Crew", price: "$19/mo", note: "All modules + asset vault", current: true },
                { name: "Captain", price: "$49/mo", note: "Crew + 1:1 office hours" },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`rounded-2xl border p-5 ${
                    p.current
                      ? "border-primary/50 bg-gradient-primary/10 shadow-glow"
                      : "border-border bg-surface/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{p.name}</div>
                    {p.current && <span className="text-[10px] uppercase tracking-wider text-primary">Current</span>}
                  </div>
                  <div className="mt-2 text-2xl font-bold">{p.price}</div>
                  <div className="text-xs text-muted-foreground mt-1">{p.note}</div>
                  {!p.current && (
                    <button className="mt-4 w-full rounded-lg border border-border hover:border-primary/50 py-2 text-xs font-semibold transition-colors">
                      Switch to {p.name}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="text-muted-foreground">
                Next charge <span className="text-foreground font-medium">June 5, 2026</span> · Visa •••• 4242
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-2 text-xs">Update payment</button>
                <button className="rounded-lg border border-border bg-surface/60 hover:bg-surface-elevated px-3 py-2 text-xs text-muted-foreground hover:text-destructive">Cancel plan</button>
              </div>
            </div>
          </section>

          <p className="text-center text-xs text-muted-foreground">
            UI preview only — backend not connected yet.
          </p>
        </div>
      </main>
    </div>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">{label}</label>
      <div className="flex items-center gap-2 rounded-xl bg-surface/60 border border-border px-3 py-2.5 focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/40 transition-all">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        {children}
      </div>
    </div>
  );
}
