import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useRef, useState, useTransition } from "react";
import { ArrowLeft, Camera, CheckCircle2, Crown, Mail, User, Bell, Shield, RotateCcw, LogOut } from "lucide-react";
import { resetAllProgress } from "@/rpc/progress";
import { getAuthUser, updateProfile } from "@/rpc/auth";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  loader: async () => {
    const user = await getAuthUser().catch(() => null);
    if (!user) throw redirect({ to: "/login" });
    return { user };
  },
  head: () => ({
    meta: [
      { title: "Your profile — Kraken Vault" },
      { name: "description", content: "Edit your Kraken Vault profile." },
    ],
  }),
});

function ProfilePage() {
  const { user } = Route.useLoaderData();

  const [avatar, setAvatar] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(user.first_name ?? "");
  const [saving, setSaving] = useState(false);
  const [saveOk, setSaveOk] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [, startTransition] = useTransition();

  const handleSave = () => {
    setSaving(true);
    setSaveOk(false);
    startTransition(async () => {
      const result = await updateProfile({ data: { first_name: name } }).catch(() => ({ ok: false }));
      setSaving(false);
      if (result.ok) setSaveOk(true);
    });
  };

  const handleSignOut = () => {
    fetch("/auth/logout", { method: "POST" }).finally(() => {
      window.location.href = "/";
    });
  };

  const handleResetProgress = () => {
    if (!confirm("Reset ALL your progress? This cannot be undone.")) return;
    startTransition(async () => {
      await resetAllProgress().catch(() => null);
      setResetDone(true);
    });
  };

  const initials = name.trim()
    ? name.trim().split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : user.email.slice(0, 2).toUpperCase();

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
              { icon: Crown, label: "Subscription" },
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
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-destructive transition-colors"
            >
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
                    : initials}
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
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setAvatar(URL.createObjectURL(f));
                  }}
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
                  onChange={(e) => { setName(e.target.value); setSaveOk(false); }}
                  placeholder="Your name"
                  className="w-full bg-transparent focus:outline-none text-sm"
                />
              </Field>
              <Field label="Email" icon={Mail}>
                <input
                  value={user.email}
                  readOnly
                  className="w-full bg-transparent focus:outline-none text-sm text-muted-foreground cursor-default"
                />
              </Field>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              Role: <span className="capitalize font-medium text-foreground">{user.role ?? "member"}</span>
            </div>

            <div className="mt-6 flex justify-end items-center gap-3">
              {saveOk && (
                <span className="flex items-center gap-1.5 text-xs text-primary">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Saved
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-gradient-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-glow hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </section>

          {/* Subscription card */}
          <section className="glass-card rounded-3xl p-6 md:p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" /> Subscription
                </h2>
                <p className="text-sm text-muted-foreground mt-1">Your current access level.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary/15 border border-primary/30 px-3 py-1 text-xs font-semibold text-primary capitalize">
                <CheckCircle2 className="h-3.5 w-3.5" /> {user.role ?? "member"}
              </span>
            </div>

            <div className="mt-6 p-4 rounded-2xl border border-border bg-surface/40 text-sm text-muted-foreground">
              Billing management coming soon. Reach out to{" "}
              <a href="mailto:support@krakenvault.com" className="text-primary hover:underline">support@krakenvault.com</a>{" "}
              for plan changes.
            </div>
          </section>

          {/* Progress reset */}
          <section className="glass-card rounded-3xl p-6 md:p-8 border border-destructive/20">
            <h2 className="text-lg font-bold tracking-tight mb-1 flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              Reset Progress
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Clear all lesson completion data. This can't be undone.
            </p>
            {resetDone ? (
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="h-4 w-4" /> Progress reset. Start fresh!
              </div>
            ) : (
              <button
                onClick={handleResetProgress}
                className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 hover:bg-destructive/20 text-destructive px-4 py-2.5 text-sm font-medium transition-colors"
              >
                <RotateCcw className="h-4 w-4" /> Reset my progress
              </button>
            )}
          </section>
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
