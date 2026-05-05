/**
 * Cloudflare Workers environment access.
 *
 * `cloudflare:workers` is a built-in module available in the CF Workers runtime.
 * @cloudflare/vite-plugin proxies it during local dev (`wrangler dev`).
 *
 * Types are provided by @cloudflare/workers-types (devDependency).
 */

export interface Env {
  DB: D1Database;
  R2_BUCKET: R2Bucket;
  ADMIN_SECRET: string;
}

export function getEnv(): Env {
  // Try the cloudflare:workers module (available in CF Workers runtime + vite-plugin dev proxy)
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { getRequestContext } = require("cloudflare:workers");
    return getRequestContext().env as Env;
  } catch {
    // Not in a Workers environment — return a proxy that fails loudly on access
  }

  return new Proxy({} as Env, {
    get(_, key: string) {
      throw new Error(
        `Cloudflare binding "${key}" is not available outside a Cloudflare Worker. ` +
          "Run via `wrangler dev` or deploy to Cloudflare to access D1/R2 bindings.",
      );
    },
  });
}
