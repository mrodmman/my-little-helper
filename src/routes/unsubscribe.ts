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

        // Redirect to the React-rendered confirmation page so the client
        // router picks it up correctly whether navigating fresh or in-app.
        const dest = new URL('/unsubscribed', url.origin);
        if (email) dest.searchParams.set('email', email);
        return Response.redirect(dest.toString(), 302);
      },
    },
  },
});
