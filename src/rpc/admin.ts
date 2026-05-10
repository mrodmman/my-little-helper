/**
 * Admin authentication + user management server functions.
 */
"use server";

import { createServerFn } from "@tanstack/react-start";
import { getEnv } from "@/lib/env";
import { getAdminSession, setAdminSession, clearAdminSession } from "@/lib/session";

export const checkAdminAuth = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const session = getAdminSession();
    return { authenticated: session === env.ADMIN_SECRET };
  } catch {
    return { authenticated: false };
  }
});

export const adminLogin = createServerFn()
  .inputValidator((password: string) => password)
  .handler(async ({ data: password }) => {
    try {
      const env = await getEnv();
      if (password !== env.ADMIN_SECRET) {
        return { ok: false, error: "Incorrect password" };
      }
      setAdminSession(env.ADMIN_SECRET);
      return { ok: true };
    } catch {
      return { ok: false, error: "Server error" };
    }
  });

export const adminLogout = createServerFn().handler(async () => {
  try {
    clearAdminSession();
  } catch {
    // silently fail
  }
  return { ok: true };
});

// ── User management ────────────────────────────────────────────────────────────

export type AdminUser = {
  id: string;
  email: string;
  first_name: string | null;
  role: string;
  created_at: number | null;
  last_login: number | null;
};

export const listUsers = createServerFn().handler(async () => {
  const env = await getEnv();
  const result = await env.DB.prepare(
    `SELECT id, email, first_name, role, created_at, last_login
     FROM users ORDER BY created_at DESC`
  ).all<AdminUser>();
  return result.results ?? [];
});

export const updateUserRole = createServerFn()
  .inputValidator((d: { id: string; role: string }) => d)
  .handler(async ({ data }) => {
    const env = await getEnv();
    await env.DB.prepare(`UPDATE users SET role = ? WHERE id = ?`)
      .bind(data.role, data.id).run();
    return { ok: true };
  });

export const deleteUser = createServerFn()
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    const env = await getEnv();
    await env.DB.prepare(`DELETE FROM sessions WHERE user_id = ?`).bind(id).run();
    await env.DB.prepare(`DELETE FROM users WHERE id = ?`).bind(id).run();
    return { ok: true };
  });

