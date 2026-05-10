import { createFileRoute } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Trash2, ShieldCheck, User } from "lucide-react";
import { listUsers, updateUserRole, deleteUser } from "@/rpc/admin";
import type { AdminUser } from "@/rpc/admin";

export const Route = createFileRoute("/admin/users")({
  component: UsersManager,
  loader: async () => {
    const users = await listUsers().catch(() => []);
    return { users };
  },
});

const ROLES = ["member", "admin"];

function fmt(ts: number | null) {
  if (!ts) return "—";
  return new Date(ts * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function UsersManager() {
  const { users: initial } = Route.useLoaderData();
  const [users, setUsers] = useState<AdminUser[]>(initial);
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.first_name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = (user: AdminUser, role: string) => {
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, role } : u));
    startTransition(async () => {
      await updateUserRole({ data: { id: user.id, role } }).catch(console.error);
    });
  };

  const handleDelete = (user: AdminUser) => {
    if (!confirm(`Delete ${user.email}? This removes their account and all sessions.`)) return;
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    startTransition(async () => {
      await deleteUser({ data: user.id }).catch(console.error);
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{users.length} registered account{users.length !== 1 ? "s" : ""}</p>
        </div>
        <input
          type="search"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 bg-surface/60 border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-sm">
          {search ? "No users match that search." : "No users yet."}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((user) => (
            <div key={user.id} className="glass-card rounded-2xl border border-border p-4 flex items-center gap-4">
              {/* Avatar */}
              <div className="h-9 w-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                {user.role === "admin"
                  ? <ShieldCheck className="h-4 w-4 text-primary" />
                  : <User className="h-4 w-4 text-muted-foreground" />}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">
                  {user.first_name ?? <span className="text-muted-foreground italic">No name</span>}
                </div>
                <div className="text-xs text-muted-foreground truncate">{user.email}</div>
              </div>

              {/* Dates */}
              <div className="hidden sm:flex flex-col items-end text-xs text-muted-foreground shrink-0">
                <span>Joined {fmt(user.created_at)}</span>
                <span>Last login {fmt(user.last_login)}</span>
              </div>

              {/* Role selector */}
              <select
                value={user.role ?? "member"}
                onChange={(e) => handleRoleChange(user, e.target.value)}
                className="text-xs border border-border bg-surface/60 rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary/50 transition-all shrink-0"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                ))}
              </select>

              {/* Delete */}
              <button
                onClick={() => handleDelete(user)}
                className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-destructive/20 hover:border-destructive/40 flex items-center justify-center transition-colors shrink-0"
                title="Delete user"
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
