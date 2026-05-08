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

let cachedFetchHandler:
  | ReturnType<ReturnType<typeof createStartHandler>>
  | undefined;

function getFetchHandler() {
  if (!cachedFetchHandler) {
    cachedFetchHandler = createStartHandler({
      createRouter: getRouter,
      getRouterManifest,
    })(defaultStreamingHandler);
  }

  return cachedFetchHandler;
}

function normalizeRequestUrl(request: Request): Request {
  try {
    void new URL(request.url);
    return request;
  } catch {
    const normalizedPath = request.url.startsWith('/') ? request.url : `/${request.url}`;
    return new Request(`https://invalid.local${normalizedPath}`, request);
  }
}

function isInvalidUrlError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string' &&
    /Invalid URL string/i.test((error as { message: string }).message)
  );
}

export default {
  fetch: async (request: Request, env: Env, ctx: ExecutionContext) => {
    try {
      const fetchHandler = getFetchHandler();
      return await fetchHandler(normalizeRequestUrl(request), env, ctx);
    } catch (error) {
      if (isInvalidUrlError(error)) {
        return new Response('Invalid request URL', { status: 400 });
      }

      throw error;
    }
  },

  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext) {
    await handleDripCron(env);
  },
};
