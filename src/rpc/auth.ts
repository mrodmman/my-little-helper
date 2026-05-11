"use server";

import { createServerFn } from "@tanstack/react-start";
import { getCookies } from "@tanstack/react-start/server";
import { getEnv } from "@/lib/env";
import { getSessionUser, AUTH_COOKIE } from "@/lib/auth";

// Returns the logged-in user for the current request, or null if not authenticated.
// Safe to call from beforeLoad — runs server-side via RPC when navigating on the client.
export const getAuthUser = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const cookies = getCookies();
    const sessionId = cookies[AUTH_COOKIE];
    if (!sessionId) return null;
    const env = getEnv();
    return getSessionUser(sessionId, env);
  } catch {
    return null;
  }
});

export const updateProfile = createServerFn()
  .inputValidator((d: { first_name: string }) => d)
  .handler(async ({ data }) => {
    try {
      const cookies = getCookies();
      const sessionId = cookies[AUTH_COOKIE];
      if (!sessionId) return { ok: false, error: "Not authenticated" };
      const env = getEnv();
      const user = await getSessionUser(sessionId, env);
      if (!user) return { ok: false, error: "Not authenticated" };
      await env.DB.prepare(`UPDATE users SET first_name = ? WHERE id = ?`)
        .bind(data.first_name.trim() || null, user.id).run();
      return { ok: true };
    } catch {
      return { ok: false, error: "Server error" };
    }
  });
