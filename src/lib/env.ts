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

type CloudflareWorkersModule = {
  env?: Env;
  getRequestContext?: () => { env: Env };
};

const cloudflareWorkersModule: CloudflareWorkersModule | null = await import("cloudflare:workers")
  .then((mod) => mod as CloudflareWorkersModule)
  .catch(() => null);

export function getEnv(): Env {
  if (cloudflareWorkersModule?.env) {
    return cloudflareWorkersModule.env;
  }

  if (cloudflareWorkersModule?.getRequestContext) {
    return cloudflareWorkersModule.getRequestContext().env as Env;
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
