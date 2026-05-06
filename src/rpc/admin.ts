/**
 * Admin authentication server functions.
 */
"use server";

import { createServerFn } from "@tanstack/react-start";
import { getEnv } from "@/lib/env";
import { getAdminSession, setAdminSession, clearAdminSession } from "@/lib/session";

export const checkAdminAuth = createServerFn().handler(async () => {
  const env = await getEnv();
  const session = getAdminSession();
  return { authenticated: session === env.ADMIN_SECRET };
});

export const adminLogin = createServerFn()
  .validator((password: string) => password)
  .handler(async ({ data: password }) => {
    const env = await getEnv();
    if (password !== env.ADMIN_SECRET) {
      return { ok: false, error: "Incorrect password" };
    }
    setAdminSession(env.ADMIN_SECRET);
    return { ok: true };
  });

export const adminLogout = createServerFn().handler(async () => {
  clearAdminSession();
  return { ok: true };
});
