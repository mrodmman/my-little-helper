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

export default {
  fetch: fetchHandler,

  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext) {
    await handleDripCron(env);
  },
};
