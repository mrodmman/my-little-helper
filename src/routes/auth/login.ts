/**
 * POST /auth/login
 * Verifies credentials, creates a session, and returns the redirect destination.
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { verifyPassword, createUserSession, sessionCookieHeader, ensureAuthSchema } from '@/lib/auth';

export const Route = createFileRoute('/auth/login')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();
        await ensureAuthSchema(env);

        let body: { email?: string; password?: string };
        try {
          body = await request.json();
        } catch {
          return json({ ok: false, error: 'Invalid request' }, 400);
        }

        const email = body.email?.trim().toLowerCase();
        const password = body.password;

        if (!email || !password) {
          return json({ ok: false, error: 'Email and password are required' }, 400);
        }

        const user = await env.DB.prepare(
          'SELECT id, email, password_hash, first_name, role FROM users WHERE email = ?',
        )
          .bind(email)
          .first<{
            id: string;
            email: string;
            password_hash: string;
            first_name: string | null;
            role: string;
          }>();

        if (!user || !(await verifyPassword(password, user.password_hash))) {
          return json({ ok: false, error: 'Invalid email or password' }, 401);
        }

        await env.DB.prepare('UPDATE users SET last_login = ? WHERE id = ?')
          .bind(Math.floor(Date.now() / 1000), user.id)
          .run();

        const sessionId = await createUserSession(user.id, env);

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
