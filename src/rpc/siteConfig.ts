"use server";

import { createServerFn } from "@tanstack/react-start";
import { getEnv } from "@/lib/env";

type SiteConfig = {
  intel_hero_image_url: string | null;
};

export const getSiteConfig = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const row = await env.DB.prepare(
      "SELECT intel_hero_image_url FROM site_config WHERE id = 1",
    ).first<SiteConfig>();
    return row ?? { intel_hero_image_url: null };
  } catch {
    return { intel_hero_image_url: null };
  }
});

export const updateSiteConfig = createServerFn({ method: "POST" })
  .inputValidator((data: Partial<SiteConfig>) => data)
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      const now = new Date().toISOString();
      await env.DB.prepare(
        `INSERT INTO site_config (id, intel_hero_image_url, updated_at)
         VALUES (1, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           intel_hero_image_url = excluded.intel_hero_image_url,
           updated_at = excluded.updated_at`,
      )
        .bind(data.intel_hero_image_url ?? null, now)
        .run();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });
