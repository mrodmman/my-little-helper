/**
 * Session management — UUID stored in a long-lived cookie.
 * No login required; session is used to track lesson progress anonymously.
 */

import { getCookies, setCookie } from "@tanstack/react-start/server";

const COOKIE_NAME = "vault_session";
const MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

/**
 * Returns the current session ID from the cookie, creating one if it doesn't exist.
 * Must be called from a server function or loader (i.e. on the server side).
 */
export function getOrCreateSessionId(): string {
  try {
    const cookies = getCookies();
    const existing = cookies[COOKIE_NAME];
    if (existing && /^[0-9a-f-]{36}$/.test(existing)) return existing;

    const id = crypto.randomUUID();
    try {
      setCookie(COOKIE_NAME, id, {
        path: "/",
        maxAge: MAX_AGE,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
    } catch {
      // setCookie failed (no active response context) — return the id anyway
    }
    return id;
  } catch {
    // getCookies failed outside a CF Workers request context
    return crypto.randomUUID();
  }
}

/**
 * Returns the current session ID from the cookie, or null if not set.
 */
export function getSessionId(): string | null {
  try {
    const cookies = getCookies();
    const val = cookies[COOKIE_NAME];
    return val && /^[0-9a-f-]{36}$/.test(val) ? val : null;
  } catch {
    return null;
  }
}

/** Admin session cookie */
const ADMIN_COOKIE = "vault_admin";

export function getAdminSession(): string | null {
  try {
    const cookies = getCookies();
    return cookies[ADMIN_COOKIE] ?? null;
  } catch {
    return null;
  }
}

export function setAdminSession(secret: string) {
  try {
    setCookie(ADMIN_COOKIE, secret, {
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch {
    // no active response context
  }
}

export function clearAdminSession() {
  try {
    setCookie(ADMIN_COOKIE, "", { path: "/", maxAge: 0, httpOnly: true, sameSite: "strict" });
  } catch {
    // no active response context
  }
}
