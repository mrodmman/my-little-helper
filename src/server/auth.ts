"use server";

import { createServerFn } from "@tanstack/react-start";
import { parseCookies, setCookie } from "@tanstack/react-start/server";
import { getEnv } from "@/lib/env";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { sendEmail, verifyEmailTemplate, resetPasswordTemplate, welcomeTemplate } from "@/lib/email";

// ---- Types ----

export type DbUser = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  email_verified: number;
  role: "member" | "admin";
  created_at: string;
  last_login: string | null;
};

export type SafeUser = Omit<DbUser, "password_hash">;

// ---- Cookie helpers ----

const SESSION_COOKIE = "vault_auth";
const SESSION_DAYS = 30;

function setSessionCookie(token: string) {
  setCookie(SESSION_COOKIE, token, {
    path: "/",
    maxAge: 60 * 60 * 24 * SESSION_DAYS,
    httpOnly: true,
    sameSite: "lax",
    secure: true,
  });
}

function clearSessionCookie() {
  setCookie(SESSION_COOKIE, "", { path: "/", maxAge: 0, httpOnly: true, sameSite: "lax" });
}

function getSessionToken(): string | null {
  const cookies = parseCookies();
  const val = cookies[SESSION_COOKIE];
  return val && val.length > 10 ? val : null;
}

// ---- Core auth helpers (not server fns — used internally) ----

async function createSession(userId: string): Promise<string> {
  const env = getEnv();
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_DAYS).toISOString();
  await env.DB.prepare(
    "INSERT INTO auth_tokens (id, user_id, type, token, expires_at) VALUES (?, ?, 'session', ?, ?)",
  )
    .bind(crypto.randomUUID(), userId, token, expiresAt)
    .run();
  return token;
}

// ---- Server functions ----

/** Get the currently logged-in user, or null. */
export const getCurrentUser = createServerFn().handler(async (): Promise<SafeUser | null> => {
  const token = getSessionToken();
  if (!token) return null;

  const env = getEnv();
  const row = await env.DB.prepare(
    `SELECT u.id, u.email, u.name, u.email_verified, u.role, u.created_at, u.last_login
     FROM auth_tokens t
     JOIN users u ON u.id = t.user_id
     WHERE t.token = ? AND t.type = 'session' AND t.used = 0 AND t.expires_at > datetime('now')`,
  )
    .bind(token)
    .first<SafeUser>();

  return row ?? null;
});

/** Sign up — creates unverified user and sends verification email. */
export const signUp = createServerFn()
  .validator((data: { name: string; email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const env = getEnv();
    const email = data.email.trim().toLowerCase();

    // Validate
    if (!email || !email.includes("@")) return { ok: false, error: "Invalid email address." };
    if (data.password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };
    if (!data.name.trim()) return { ok: false, error: "Name is required." };

    // Check duplicate
    const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (existing) return { ok: false, error: "An account with that email already exists." };

    // Create user
    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(data.password);
    await env.DB.prepare(
      "INSERT INTO users (id, email, name, password_hash, email_verified, role) VALUES (?, ?, ?, ?, 0, 'member')",
    )
      .bind(userId, email, data.name.trim(), passwordHash)
      .run();

    // Create verify token (24h)
    const verifyToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
    await env.DB.prepare(
      "INSERT INTO auth_tokens (id, user_id, type, token, expires_at) VALUES (?, ?, 'email_verify', ?, ?)",
    )
      .bind(crypto.randomUUID(), userId, verifyToken, expiresAt)
      .run();

    // Send verification email
    const verifyUrl = `${env.APP_URL}/verify-email?token=${verifyToken}`;
    await sendEmail({
      to: email,
      subject: "Verify your Kraken Vault email",
      html: verifyEmailTemplate(data.name.trim(), verifyUrl),
    });

    return { ok: true };
  });

/** Verify email via token from the email link. */
export const verifyEmail = createServerFn()
  .validator((token: string) => token)
  .handler(async ({ data: token }) => {
    const env = getEnv();

    const row = await env.DB.prepare(
      `SELECT t.id, t.user_id, u.name, u.email
       FROM auth_tokens t JOIN users u ON u.id = t.user_id
       WHERE t.token = ? AND t.type = 'email_verify' AND t.used = 0 AND t.expires_at > datetime('now')`,
    )
      .bind(token)
      .first<{ id: string; user_id: string; name: string; email: string }>();

    if (!row) return { ok: false, error: "This link is invalid or has expired." };

    // Mark verified
    await env.DB.batch([
      env.DB.prepare("UPDATE users SET email_verified = 1 WHERE id = ?").bind(row.user_id),
      env.DB.prepare("UPDATE auth_tokens SET used = 1 WHERE id = ?").bind(row.id),
    ]);

    // Send welcome email
    await sendEmail({
      to: row.email,
      subject: "Welcome to The Kraken Vault 🦑",
      html: welcomeTemplate(row.name, env.APP_URL),
    }).catch(() => null); // non-fatal

    // Create session
    const sessionToken = await createSession(row.user_id);
    setSessionCookie(sessionToken);

    return { ok: true };
  });

/** Log in with email + password. */
export const logIn = createServerFn()
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const env = getEnv();
    const email = data.email.trim().toLowerCase();

    const user = await env.DB.prepare(
      "SELECT id, email, name, password_hash, email_verified, role FROM users WHERE email = ?",
    )
      .bind(email)
      .first<DbUser>();

    if (!user) return { ok: false, error: "Incorrect email or password." };

    const valid = await verifyPassword(data.password, user.password_hash);
    if (!valid) return { ok: false, error: "Incorrect email or password." };

    if (!user.email_verified) {
      return { ok: false, error: "Please verify your email first. Check your inbox for the verification link.", needsVerify: true, email };
    }

    // Update last_login
    await env.DB.prepare("UPDATE users SET last_login = datetime('now') WHERE id = ?")
      .bind(user.id)
      .run();

    const sessionToken = await createSession(user.id);
    setSessionCookie(sessionToken);

    return { ok: true, role: user.role };
  });

/** Log out — invalidates session. */
export const logOut = createServerFn().handler(async () => {
  const token = getSessionToken();
  if (token) {
    const env = getEnv();
    await env.DB.prepare("UPDATE auth_tokens SET used = 1 WHERE token = ? AND type = 'session'")
      .bind(token)
      .run()
      .catch(() => null);
  }
  clearSessionCookie();
  return { ok: true };
});

/** Send a password reset email. */
export const requestPasswordReset = createServerFn()
  .validator((email: string) => email)
  .handler(async ({ data: rawEmail }) => {
    const env = getEnv();
    const email = rawEmail.trim().toLowerCase();

    const user = await env.DB.prepare("SELECT id, name FROM users WHERE email = ?")
      .bind(email)
      .first<{ id: string; name: string }>();

    // Always return ok to avoid email enumeration
    if (!user) return { ok: true };

    const resetToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60).toISOString(); // 1h

    // Invalidate old reset tokens for this user
    await env.DB.prepare(
      "UPDATE auth_tokens SET used = 1 WHERE user_id = ? AND type = 'password_reset' AND used = 0",
    )
      .bind(user.id)
      .run();

    await env.DB.prepare(
      "INSERT INTO auth_tokens (id, user_id, type, token, expires_at) VALUES (?, ?, 'password_reset', ?, ?)",
    )
      .bind(crypto.randomUUID(), user.id, resetToken, expiresAt)
      .run();

    const resetUrl = `${env.APP_URL}/reset-password?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: "Reset your Kraken Vault password",
      html: resetPasswordTemplate(user.name, resetUrl),
    });

    return { ok: true };
  });

/** Validate a reset token (used to gate the reset form). */
export const validateResetToken = createServerFn()
  .validator((token: string) => token)
  .handler(async ({ data: token }) => {
    const env = getEnv();
    const row = await env.DB.prepare(
      "SELECT id FROM auth_tokens WHERE token = ? AND type = 'password_reset' AND used = 0 AND expires_at > datetime('now')",
    )
      .bind(token)
      .first<{ id: string }>();
    return { valid: !!row };
  });

/** Set a new password using a reset token. */
export const resetPassword = createServerFn()
  .validator((data: { token: string; password: string }) => data)
  .handler(async ({ data }) => {
    if (data.password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

    const env = getEnv();
    const row = await env.DB.prepare(
      `SELECT t.id, t.user_id FROM auth_tokens t
       WHERE t.token = ? AND t.type = 'password_reset' AND t.used = 0 AND t.expires_at > datetime('now')`,
    )
      .bind(data.token)
      .first<{ id: string; user_id: string }>();

    if (!row) return { ok: false, error: "This link is invalid or has expired." };

    const passwordHash = await hashPassword(data.password);

    await env.DB.batch([
      env.DB.prepare("UPDATE users SET password_hash = ? WHERE id = ?").bind(passwordHash, row.user_id),
      env.DB.prepare("UPDATE auth_tokens SET used = 1 WHERE id = ?").bind(row.id),
    ]);

    return { ok: true };
  });

/** Resend a verification email (if user hasn't verified yet). */
export const resendVerification = createServerFn()
  .validator((email: string) => email)
  .handler(async ({ data: rawEmail }) => {
    const env = getEnv();
    const email = rawEmail.trim().toLowerCase();

    const user = await env.DB.prepare(
      "SELECT id, name, email_verified FROM users WHERE email = ?",
    )
      .bind(email)
      .first<{ id: string; name: string; email_verified: number }>();

    if (!user || user.email_verified) return { ok: true }; // silent

    // Invalidate old verify tokens
    await env.DB.prepare(
      "UPDATE auth_tokens SET used = 1 WHERE user_id = ? AND type = 'email_verify' AND used = 0",
    )
      .bind(user.id)
      .run();

    const verifyToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();
    await env.DB.prepare(
      "INSERT INTO auth_tokens (id, user_id, type, token, expires_at) VALUES (?, ?, 'email_verify', ?, ?)",
    )
      .bind(crypto.randomUUID(), user.id, verifyToken, expiresAt)
      .run();

    const verifyUrl = `${env.APP_URL}/verify-email?token=${verifyToken}`;
    await sendEmail({
      to: email,
      subject: "Verify your Kraken Vault email",
      html: verifyEmailTemplate(user.name, verifyUrl),
    });

    return { ok: true };
  });

// ---- Admin user management ----

export const listUsers = createServerFn().handler(async () => {
  const env = getEnv();
  const { results } = await env.DB.prepare(
    "SELECT id, email, name, email_verified, role, created_at, last_login FROM users ORDER BY created_at DESC",
  ).all<SafeUser>();
  return results;
});

export const updateUserRole = createServerFn()
  .validator((data: { id: string; role: "member" | "admin" }) => data)
  .handler(async ({ data }) => {
    const env = getEnv();
    await env.DB.prepare("UPDATE users SET role = ? WHERE id = ?").bind(data.role, data.id).run();
    return { ok: true };
  });

export const deleteUser = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const env = getEnv();
    await env.DB.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
    return { ok: true };
  });
