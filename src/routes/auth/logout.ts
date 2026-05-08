/**
 * GET /auth/logout
 * Deletes the session from D1, clears the auth cookie, and redirects to /funnel.
 */
import { createFileRoute } from '@tanstack/react-router';
import { getEnv } from '@/lib/env';
import { getSessionIdFromRequest, clearSessionCookieHeader } from '@/lib/auth';

export const Route = createFileRoute('/auth/logout')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const sessionId = getSessionIdFromRequest(request);
        if (sessionId) {
          try {
            const env = getEnv();
            await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(sessionId).run();
          } catch {
            // best-effort — still clear the cookie
          }
        }

        return new Response(null, {
          status: 302,
          headers: {
            Location: '/funnel',
            'Set-Cookie': clearSessionCookieHeader(),
          },
        });
      },
    },
  },
});
