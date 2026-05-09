import type { Env } from './env';

export const AUTH_COOKIE = 'kv_session';
const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export interface AuthUser {
  id: string;
  email: string;
  first_name: string | null;
  role: string;
}

async function addColumnIfMissing(env: Env, table: string, columnDef: string): Promise<void> {
  try {
    await env.DB.prepare(`ALTER TABLE ${table} ADD COLUMN ${columnDef}`).run();
  } catch {
    // ignore if column already exists or table shape differs
  }
}

// Best-effort schema guard for environments that were provisioned before auth migrations.
export async function ensureAuthSchema(env: Env): Promise<void> {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name TEXT,
      role TEXT DEFAULT 'member',
      created_at INTEGER,
      last_login INTEGER
    )`,
  ).run();

  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at INTEGER,
      expires_at INTEGER
    )`,
  ).run();

  await addColumnIfMissing(env, 'users', 'first_name TEXT');
  await addColumnIfMissing(env, 'users', "role TEXT DEFAULT 'member'");
  await addColumnIfMissing(env, 'users', 'created_at INTEGER');
  await addColumnIfMissing(env, 'users', 'last_login INTEGER');
  await addColumnIfMissing(env, 'sessions', 'created_at INTEGER');
  await addColumnIfMissing(env, 'sessions', 'expires_at INTEGER');
}

// Returns a Set-Cookie header value that sets the auth cookie
export function sessionCookieHeader(sessionId: string): string {
  return `${AUTH_COOKIE}=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
}

// Returns a Set-Cookie header value that clears the auth cookie
export function clearSessionCookieHeader(): string {
  return `${AUTH_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

// Reads the auth session ID from a raw Request's Cookie header
export function getSessionIdFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;
  const match = cookieHeader.split(';').find((c) => c.trim().startsWith(`${AUTH_COOKIE}=`));
  return match ? match.trim().slice(AUTH_COOKIE.length + 1) : null;
}

// Hashes a password using PBKDF2 (Web Crypto API, no external deps)
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    keyMaterial,
    256,
  );
  const toHex = (buf: Uint8Array) =>
    Array.from(buf)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  return `${toHex(salt)}:${toHex(new Uint8Array(hash))}`;
}

// Verifies a password against a stored PBKDF2 hash
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(':');
  if (!saltHex || !hashHex) return false;
  const salt = Uint8Array.from(saltHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits'],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' },
    keyMaterial,
    256,
  );
  const candidate = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return candidate === hashHex;
}

// Creates a session row in D1 and returns the session ID
export async function createUserSession(userId: string, env: Env): Promise<string> {
  const sessionId = crypto.randomUUID();
  const nowSec = Math.floor(Date.now() / 1000);
  await env.DB.prepare(
    'INSERT INTO sessions (id, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)',
  )
    .bind(sessionId, userId, nowSec, nowSec + SESSION_MAX_AGE)
    .run();
  return sessionId;
}

// Looks up a session and returns the associated user, or null if invalid/expired
export async function getSessionUser(sessionId: string, env: Env): Promise<AuthUser | null> {
  const nowSec = Math.floor(Date.now() / 1000);
  const row = await env.DB.prepare(
    `SELECT u.id, u.email, u.first_name, u.role
     FROM sessions s JOIN users u ON s.user_id = u.id
     WHERE s.id = ? AND s.expires_at > ?`,
  )
    .bind(sessionId, nowSec)
    .first<AuthUser>();
  return row ?? null;
}
