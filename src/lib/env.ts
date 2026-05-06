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
}

type WorkersModule = {
  getRequestContext?: () => { env: Env };
  env?: Env;
};

// Cached promise — avoids re-importing on every call while staying off the
// module-level critical path (no top-level await that could break the bundle).
let _modulePromise: Promise<WorkersModule | null> | undefined;

function loadWorkersModule(): Promise<WorkersModule | null> {
  if (!_modulePromise) {
    _modulePromise = import("cloudflare:workers")
      .then((m) => m as WorkersModule)
      .catch(() => null);
  }
  return _modulePromise;
}

export async function getEnv(): Promise<Env> {
  let mod: WorkersModule | null = null;
  try {
    mod = await loadWorkersModule();
  } catch {
    // import failed — fall through to proxy
  }

  // Some CF Workers builds expose env directly on the module
  if (mod?.env) return mod.env;

  // Standard approach: per-request context
  if (mod?.getRequestContext) {
    try {
      return mod.getRequestContext().env as Env;
    } catch {
      // getRequestContext() is only valid inside a request handler;
      // outside that scope we fall through to the proxy.
    }
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
