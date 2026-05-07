/**
 * POST /api/upload
 * Accepts a multipart form with a "file" field.
 * Stores the file in R2 and returns { key, url }.
 *
 * Optional form fields:
 *   - prefix: string  e.g. "modules/" or "assets/"
 */
import { createFileRoute } from "@tanstack/react-router";
import { getEnv } from "@/lib/env";
import { getAdminSession } from "@/lib/session";

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let env;
        try {
          env = await getEnv();
        } catch {
          return new Response(JSON.stringify({ error: "Server configuration error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        const adminSession = getAdminSession();
        if (!adminSession || adminSession !== env.ADMIN_SECRET) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        let formData: FormData;
        try {
          formData = await request.formData();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid form data" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const file = formData.get("file");
        if (!file || !(file instanceof File)) {
          return new Response(JSON.stringify({ error: "No file provided" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const prefix = (formData.get("prefix") as string | null) ?? "uploads/";
        const ext = file.name.split(".").pop() ?? "bin";
        const key = `${prefix}${crypto.randomUUID()}.${ext}`;

        await env.R2_BUCKET.put(key, await file.arrayBuffer(), {
          httpMetadata: { contentType: file.type || "application/octet-stream" },
        });

        return new Response(JSON.stringify({ key, url: `/api/cdn/${encodeURIComponent(key)}` }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
