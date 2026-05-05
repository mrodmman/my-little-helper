/**
 * Session management — UUID stored in a long-lived cookie.
 * No login required; session is used to track lesson progress anonymously.
 */

import { parseCookies, setCookie } from "@tanstack/react-start/server";

const COOKIE_NAME = "vault_session";
const MAX_AGE = 60 * 60 * 24 * 365 * 2; // 2 years

/**
 * Returns the current session ID from the cookie, creating one if it doesn't exist.
 * Must be called from a server function or loader (i.e. on the server side).
 */
export function getOrCreateSessionId(): string {
  const cookies = parseCookies();
  const existing = cookies[COOKIE_NAME];
  if (existing && /^[0-9a-f-]{36}$/.test(existing)) return existing;

  const id = crypto.randomUUID();
  setCookie(COOKIE_NAME, id, {
    path: "/",
    maxAge: MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
  return id;
}

/**
 * Returns the current session ID from the cookie, or null if not set.
 */
export function getSessionId(): string | null {
  const cookies = parseCookies();
  const val = cookies[COOKIE_NAME];
  return val && /^[0-9a-f-]{36}$/.test(val) ? val : null;
}

/** Admin session cookie */
const ADMIN_COOKIE = "vault_admin";

export function getAdminSession(): string | null {
  const cookies = parseCookies();
  return cookies[ADMIN_COOKIE] ?? null;
}

export function setAdminSession(secret: string) {
  setCookie(ADMIN_COOKIE, secret, {
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

export function clearAdminSession() {
  setCookie(ADMIN_COOKIE, "", { path: "/", maxAge: 0, httpOnly: true, sameSite: "strict" });
}
