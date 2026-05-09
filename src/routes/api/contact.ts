import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();
        let body: { name?: string; email?: string; message?: string };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const name = body.name?.trim();
        const email = body.email?.trim();
        const message = body.message?.trim();
        if (!name || !email || !message) {
          return new Response(JSON.stringify({ error: 'name, email, and message are required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Kraken Vault Contact <onboarding@resend.dev>',
            to: ['matt@krakenvault.com'],
            subject: `New Work With Me message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            reply_to: email,
          }),
        });

        if (!response.ok) {
          const detail = await response.text();
          return new Response(JSON.stringify({ error: 'Failed to send message', detail }), { status: 502, headers: { 'Content-Type': 'application/json' } });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      },
    },
  },
});
