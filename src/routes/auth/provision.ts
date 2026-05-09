/**
 * POST /auth/provision
 * Called by a payment processor webhook to create a Vault account for a new buyer.
 * Creates the user (if they don't exist) and sends a "set your password" email.
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { hashPassword, ensureAuthSchema } from '@/lib/auth';

export const Route = createFileRoute('/auth/provision')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();
        await ensureAuthSchema(env);

        let body: { email?: string; first_name?: string };
        try {
          body = await request.json();
        } catch {
          return json({ ok: false, error: 'Invalid request' }, 400);
        }

        const email = body.email?.trim().toLowerCase();
        const firstName = body.first_name?.trim() || null;

        if (!email) {
          return json({ ok: false, error: 'email is required' }, 400);
        }

        const existing = await env.DB.prepare('SELECT id FROM users WHERE email = ?')
          .bind(email)
          .first();
        if (existing) {
          return json({ ok: true, created: false });
        }

        // Temporary password — user will set their own via the login page
        const tempPassword = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
        const id = crypto.randomUUID();
        const passwordHash = await hashPassword(tempPassword);
        const nowSec = Math.floor(Date.now() / 1000);

        await env.DB.prepare(
          'INSERT INTO users (id, email, password_hash, first_name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        )
          .bind(id, email, passwordHash, firstName, 'member', nowSec)
          .run();

        // Send access email with temporary credentials
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Matt <matt@krakenvault.com>',
            to: email,
            subject: 'Your Kraken Vault access is ready',
            html: `<p>Hi${firstName ? ` ${firstName}` : ''},</p>
<p>Your Kraken Vault account has been created.</p>
<p>Sign in at <a href="https://krakenvault.com/login">krakenvault.com/login</a> using:</p>
<p><strong>Email:</strong> ${email}<br>
<strong>Temporary password:</strong> ${tempPassword}</p>
<p>Change your password after signing in.</p>
<p>— Matt</p>`,
          }),
        });

        return json({ ok: true, created: true });
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
