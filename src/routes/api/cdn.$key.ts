/**
 * GET /api/cdn/:key
 * Proxies objects from R2 with long-lived cache headers.
 */
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getEnv } from "@/lib/env";

export const APIRoute = createAPIFileRoute("/api/cdn/$key")({
  GET: async ({ params }) => {
    const { key } = params;
    if (!key) {
      return new Response("Not found", { status: 404 });
    }

    let object: R2ObjectBody | null = null;
    try {
      const env = await getEnv();
      object = await env.R2_BUCKET.get(decodeURIComponent(key));
    } catch {
      return new Response("Not found", { status: 404 });
    }

    if (!object) {
      return new Response("Not found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("ETag", object.httpEtag);

    return new Response(object.body, { headers });
  },
});
