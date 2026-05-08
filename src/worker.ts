/**
 * Custom Cloudflare Worker entry.
 *
 * Wraps the TanStack Start fetch handler so we can add the `scheduled`
 * export for the daily drip-email cron trigger.
 */
import { createStartHandler, defaultStreamingHandler } from '@tanstack/react-start/server';
import { getRouterManifest } from '@tanstack/react-start/router-manifest';
import { getRouter } from './router';
import { handleDripCron } from './lib/drip';
import type { Env } from './lib/env';

const fetchHandler = createStartHandler({
  createRouter: getRouter,
  getRouterManifest,
})(defaultStreamingHandler);

function normalizeRequestUrl(request: Request): Request {
  try {
    void new URL(request.url);
    return request;
  } catch {
    const fallback = `https://invalid.local${request.url.startsWith('/') ? request.url : `/${request.url}`}`;
    return new Request(fallback, request);
  }
}

export default {
  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {
    try {
      return await fetchHandler(normalizeRequestUrl(request), env, ctx);
    } catch (error) {
      if (error instanceof TypeError && /Invalid URL string/i.test(error.message)) {
        return new Response('Invalid request URL', { status: 400 });
      }

      throw error;
    }
  },

  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext) {
    await handleDripCron(env);
  },
};
