/**
 * Admin — User management.
 * List all users, toggle admin role, delete.
 */
import { createFileRoute } from "@tanstack/react-router";
import { useState, useTransition } from "react";
import { Trash2, Shield, User, CheckCircle2, Clock, Mail } from "lucide-react";
import { listUsers, updateUserRole, deleteUser } from "@/server/auth";
import type { SafeUser } from "@/server/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/users")({
  component: UsersManager,
  loader: async () => {
    const users = await listUsers().catch(() => []);
    return { users };
  },
});

function UsersManager() {
  const { users: initialUsers } = Route.useLoaderData();
  const [users, setUsers] = useState<SafeUser[]>(initialUsers);
  const [, startTransition] = useTransition();

  const toggleRole = (u: SafeUser) => {
    const next = u.role === "admin" ? "member" : "admin";
    setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role: next } : x)));
    startTransition(async () => {
      await updateUserRole({ data: { id: u.id, role: next } }).catch(console.error);
    });
  };

  const handleDelete = (u: SafeUser) => {
    if (!confirm(`Delete user ${u.email}? This also removes all their progress data.`)) return;
    setUsers((prev) => prev.filter((x) => x.id !== u.id));
    startTransition(async () => {
      await deleteUser({ data: u.id }).catch(console.error);
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {users.length} registered user{users.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.id} className="glass-card rounded-2xl border border-border p-4 flex items-center gap-4">
            {/* Avatar */}
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
              u.role === "admin"
                ? "bg-primary/20 border border-primary/40 text-primary"
                : "bg-surface-elevated border border-border text-muted-foreground",
            )}>
              {u.name ? u.name[0].toUpperCase() : <User className="h-4 w-4" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">{u.name || "(no name)"}</span>
                {u.role === "admin" && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-primary bg-primary/10 border border-primary/30 rounded-full px-2 py-0.5">
                    <Shield className="h-2.5 w-2.5" /> Admin
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" /> {u.email}
                </span>
                <span className={cn(
                  "flex items-center gap-1 text-xs",
                  u.email_verified ? "text-emerald-400" : "text-amber-400",
                )}>
                  {u.email_verified
                    ? <><CheckCircle2 className="h-3 w-3" /> Verified</>
                    : <><Clock className="h-3 w-3" /> Unverified</>}
                </span>
                <span className="text-xs text-muted-foreground">
                  Joined {new Date(u.created_at).toLocaleDateString()}
                </span>
                {u.last_login && (
                  <span className="text-xs text-muted-foreground">
                    Last login {new Date(u.last_login).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => toggleRole(u)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-colors",
                  u.role === "admin"
                    ? "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
                    : "border-border bg-surface/60 text-muted-foreground hover:text-foreground hover:bg-surface-elevated",
                )}
                title={u.role === "admin" ? "Remove admin" : "Make admin"}
              >
                <Shield className="h-3.5 w-3.5" />
                {u.role === "admin" ? "Remove admin" : "Make admin"}
              </button>
              <button
                onClick={() => handleDelete(u)}
                className="h-8 w-8 rounded-lg border border-border bg-surface/60 hover:bg-destructive/20 hover:border-destructive/40 flex items-center justify-center transition-colors"
                title="Delete user"
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No users yet. Users appear here after signing up.
        </div>
      )}
    </div>
  );
}
