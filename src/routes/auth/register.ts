/**
 * POST /auth/register
 * Creates a new user account, opens a session, and returns the redirect destination.
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { hashPassword, createUserSession, sessionCookieHeader, ensureAuthSchema } from '@/lib/auth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute('/auth/register')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();
        await ensureAuthSchema(env);

        let body: { email?: string; password?: string; first_name?: string };
        try {
          body = await request.json();
        } catch {
          return json({ ok: false, error: 'Invalid request' }, 400);
        }

        const email = body.email?.trim().toLowerCase();
        const password = body.password;
        const firstName = body.first_name?.trim() || null;

        if (!email || !password) {
          return json({ ok: false, error: 'Email and password are required' }, 400);
        }
        if (!EMAIL_RE.test(email)) {
          return json({ ok: false, error: 'Please enter a valid email address' }, 400);
        }
        if (password.length < 8) {
          return json({ ok: false, error: 'Password must be at least 8 characters' }, 400);
        }

        const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?')
          .bind(email)
          .first();
        if (existing) {
          return json({ ok: false, error: 'An account with this email already exists' }, 409);
        }

        const id = crypto.randomUUID();
        const passwordHash = await hashPassword(password);
        const nowSec = Math.floor(Date.now() / 1000);

        await env.DB.prepare(
          'INSERT INTO users (id, email, password_hash, first_name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        )
          .bind(id, email, passwordHash, firstName, 'member', nowSec)
          .run();

        const sessionId = await createUserSession(id, env);

        return new Response(JSON.stringify({ ok: true, redirect: '/vault' }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': sessionCookieHeader(sessionId),
          },
        });
      },
    },
  },
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
