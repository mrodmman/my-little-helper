import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';

export const Route = createFileRoute('/api/subscribe-biz')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const env = getEnv();
        let body: { email?: string; first_name?: string };
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const email = body.email?.trim();
        const firstName = body.first_name?.trim();
        if (!email) {
          return new Response(JSON.stringify({ error: 'email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const greeting = firstName ? `Hi ${firstName},` : 'Hi,';
        const kitUrl = 'https://keyboardkraken.kbkcompanies.com/ai-lead-kit';

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
            to: email,
            subject: 'Your AI Lead System Starter Kit',
            html: `<p>${greeting}</p>
<p>Here's your AI Lead System Starter Kit — a practical workflow for building and deploying a real lead capture system that alerts you the moment someone fills out your form.</p>
<p><a href="${kitUrl}" style="display:inline-block;background:#1a5cff;color:#fff;padding:12px 24px;border-radius:6px;font-weight:700;text-decoration:none;">Open the Starter Kit</a></p>
<p>The kit includes 3 copy-paste AI prompts, a Telegram alert setup guide, and a full deployment walkthrough using GitHub and Cloudflare.</p>
<p>Any questions — just reply to this email.</p>
<p>— Matt @ Keyboard Kraken</p>`,
          }),
        });

        if (!res.ok) {
          const detail = await res.text().catch(() => '(unreadable)');
          console.error(`subscribe-biz email failed for ${email}: ${res.status} ${detail}`);
          return new Response(JSON.stringify({ error: 'Failed to send email' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
