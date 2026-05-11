/**
 * Cloudflare Workers environment access.
 *
 * Uses cloudflare:workers getRequestContext() to access D1/R2 bindings.
 * The @cloudflare/vite-plugin externalises this module at build time.
 */

export interface Env {
  DB: D1Database;
  R2_BUCKET: R2Bucket;
  ADMIN_SECRET: string;
  RESEND_API_KEY: string;
  SESSION_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
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

  // Outside CF Workers / no active request — return a proxy that fails loudly
  // on property access so callers get a meaningful error message.
  return new Proxy({} as Env, {
    get(_: unknown, key: string) {
      throw new Error(
        `Cloudflare binding "${key}" is not available. ` +
          "Run via `wrangler dev` or deploy to Cloudflare Workers.",
      );
    },
  });
}
