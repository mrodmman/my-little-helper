/**
 * Custom Cloudflare Worker entry.
 *
 * Extends TanStack Start's built-in server-entry with a `scheduled` export
 * for the daily drip-email cron trigger.
 */
import serverEntry from '@tanstack/react-start/server-entry';
import { handleDripCron } from './lib/drip';
import type { Env } from './lib/env';

export default {
  ...serverEntry,
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext) {
    await handleDripCron(env);
  },
};
