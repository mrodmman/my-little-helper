/**
 * GET /unsubscribe?email=xxx
 * Sets the subscriber's status to 'unsubscribed' and returns a confirmation page.
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';

export const Route = createFileRoute('/unsubscribe')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const email = url.searchParams.get('email');

        if (email) {
          try {
            const env = getEnv();
            await env.DB.prepare(
              `UPDATE drip_subscribers SET status = 'unsubscribed' WHERE email = ?`,
            )
              .bind(email)
              .run();
          } catch {
            // best-effort; still show the confirmation page
          }
        }

        return new Response(
          `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Unsubscribed — Kraken Vault</title>
  <style>
    body { font-family: sans-serif; background: #0a0a0a; color: #e5e5e5; max-width: 480px; margin: 80px auto; padding: 0 24px; text-align: center; }
    h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
    p { color: #a3a3a3; line-height: 1.6; }
    a { color: #22d3ee; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>You've been unsubscribed.</h1>
  <p>You won't receive any more emails from Kraken Vault.</p>
  <p style="margin-top:2rem"><a href="/">← Back to home</a></p>
</body>
</html>`,
          { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
        );
      },
    },
  },
});
