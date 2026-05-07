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
<head><meta charset="UTF-8"><title>Unsubscribed</title></head>
<body style="font-family:sans-serif;max-width:480px;margin:80px auto;text-align:center;">
  <p>You've been unsubscribed.</p>
</body>
</html>`,
          { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
        );
      },
    },
  },
});
