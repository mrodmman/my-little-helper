/**
 * Server functions for Kraken Intel articles and Starter Vault drops.
 * All functions read from / write to Cloudflare D1.
 */
"use server";

import { createServerFn } from "@tanstack/react-start";
import { getEnv } from "@/lib/env";

// ── Types ────────────────────────────────────────────────────────────────────

export type DbIntelArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string; // JSON array string
  cover_image_url: string | null;
  read_time: string;
  published_at: string | null;
  featured: number; // 0 | 1
  published: number; // 0 | 1
  related_starter_drop_slug: string | null;
  fast_route_tool_name: string | null;
  fast_route_description: string | null;
  fast_route_affiliate_url: string | null;
  fast_route_button_text: string | null;
  external_url: string | null; // when set, card links here instead of /intel/$slug
  content_blocks: string; // JSON array string
  created_at: string;
  updated_at: string;
};

export type DbStarterDrop = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image_url: string | null;
  difficulty: string;
  estimated_build_time: string;
  tools_used: string; // JSON array string
  published: number; // 0 | 1
  related_article_slug: string | null;
  what_this_builds: string; // JSON array string
  what_you_get: string; // JSON array string
  build_prompt: string;
  file_tree: string;
  setup_steps: string; // JSON array string
  edit_map: string; // JSON array of {file, description}
  troubleshooting: string; // JSON array of {problem, solution}
  upgrade_note: string | null;
  created_at: string;
  updated_at: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "image"; url: string; alt?: string; caption?: string }
  | { type: "callout"; text: string; variant?: "info" | "warning" | "tip" | "success" }
  | { type: "bullet_list"; items: string[] }
  | { type: "numbered_steps"; items: string[] }
  | {
      type: "comparison_cards";
      cards: Array<{ title: string; items: string[]; variant?: "pro" | "con" | "neutral" }>;
    }
  | { type: "tool_box"; toolName: string; description: string; url?: string }
  | {
      type: "cta_box";
      headline: string;
      description: string;
      buttonText: string;
      buttonUrl: string;
    }
  | { type: "code_block"; language?: string; code: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "divider" };

export type ImportPackage = {
  article?: Partial<DbIntelArticle> & { slug: string; title: string };
  starterDrop?: Partial<DbStarterDrop> & { slug: string; title: string };
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalizeSlug(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/%2f/gi, "/")
    .replace(/[^a-z0-9\s/_-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/\/+/, "/")
    .replace(/\//g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function genId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ── Public read functions ─────────────────────────────────────────────────────

export const getPublishedArticles = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const { results } = await env.DB.prepare(
      `SELECT id, slug, title, excerpt, category, tags, cover_image_url,
              read_time, published_at, featured, related_starter_drop_slug, external_url
       FROM intel_articles
       WHERE published = 1
       ORDER BY featured DESC, published_at DESC`,
    ).all<Pick<DbIntelArticle,
      "id" | "slug" | "title" | "excerpt" | "category" | "tags" |
      "cover_image_url" | "read_time" | "published_at" | "featured" | "related_starter_drop_slug" | "external_url"
    >>();
    return results;
  } catch {
    return [];
  }
});

export const getArticleBySlug = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const env = await getEnv();
      const decodedSlug = (() => {
        try {
          return decodeURIComponent(slug);
        } catch {
          return slug;
        }
      })();
      const candidateSlugs = Array.from(new Set([slug, decodedSlug, normalizeSlug(slug)]));
      for (const candidate of candidateSlugs) {
        const row = await env.DB.prepare(
          "SELECT * FROM intel_articles WHERE slug = ? AND published = 1",
        )
          .bind(candidate)
          .first<DbIntelArticle>();
        if (row) return row;
      }
      // Fallback: tolerate historical slug drift (spacing/case/encoding differences)
      const { results } = await env.DB.prepare(
        "SELECT * FROM intel_articles WHERE published = 1",
      ).all<DbIntelArticle>();
      const wanted = normalizeSlug(decodedSlug);
      return results.find((row) => normalizeSlug(row.slug) === wanted) ?? null;
    } catch {
      return null;
    }
  });

export const getPublishedStarterDrops = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const { results } = await env.DB.prepare(
      `SELECT id, slug, title, excerpt, category, cover_image_url,
              difficulty, estimated_build_time, tools_used,
              related_article_slug
       FROM starter_drops
       WHERE published = 1
       ORDER BY created_at DESC`,
    ).all<
      Pick<
        DbStarterDrop,
        | "id"
        | "slug"
        | "title"
        | "excerpt"
        | "category"
        | "cover_image_url"
        | "difficulty"
        | "estimated_build_time"
        | "tools_used"
        | "related_article_slug"
      >
    >();
    return results;
  } catch {
    return [];
  }
});

export const getStarterDropBySlug = createServerFn()
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const env = await getEnv();
      const row = await env.DB.prepare(
        "SELECT * FROM starter_drops WHERE slug = ? AND published = 1",
      )
        .bind(slug)
        .first<DbStarterDrop>();
      return row ?? null;
    } catch {
      return null;
    }
  });

// ── Admin read functions ──────────────────────────────────────────────────────

export const getAllArticlesAdmin = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const { results } = await env.DB.prepare(
      `SELECT id, slug, title, excerpt, category, tags, cover_image_url,
              read_time, published_at, featured, published,
              related_starter_drop_slug, external_url
       FROM intel_articles ORDER BY created_at DESC`,
    ).all<DbIntelArticle>();
    return results;
  } catch {
    return [];
  }
});

export const getArticleByIdAdmin = createServerFn()
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      return (
        (await env.DB.prepare("SELECT * FROM intel_articles WHERE id = ?")
          .bind(id)
          .first<DbIntelArticle>()) ?? null
      );
    } catch {
      return null;
    }
  });

export const getAllStarterDropsAdmin = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const { results } = await env.DB.prepare(
      `SELECT id, slug, title, excerpt, category, cover_image_url,
              difficulty, estimated_build_time, tools_used,
              published, related_article_slug
       FROM starter_drops ORDER BY created_at DESC`,
    ).all<DbStarterDrop>();
    return results;
  } catch {
    return [];
  }
});

export const getStarterDropByIdAdmin = createServerFn()
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      return (
        (await env.DB.prepare("SELECT * FROM starter_drops WHERE id = ?")
          .bind(id)
          .first<DbStarterDrop>()) ?? null
      );
    } catch {
      return null;
    }
  });

// ── Admin write: articles ─────────────────────────────────────────────────────

export const upsertArticle = createServerFn({ method: "POST" })
  .inputValidator(
    (data: Partial<DbIntelArticle> & { id?: string; slug: string; title: string }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      const id = data.id || genId("article");
      const now = new Date().toISOString();
      await env.DB.prepare(
        `INSERT INTO intel_articles
           (id, slug, title, excerpt, category, tags, cover_image_url,
            read_time, published_at, featured, published,
            related_starter_drop_slug,
            fast_route_tool_name, fast_route_description,
            fast_route_affiliate_url, fast_route_button_text,
            external_url, content_blocks, created_at, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
         ON CONFLICT(id) DO UPDATE SET
           slug=excluded.slug, title=excluded.title, excerpt=excluded.excerpt,
           category=excluded.category, tags=excluded.tags,
           cover_image_url=excluded.cover_image_url, read_time=excluded.read_time,
           published_at=excluded.published_at, featured=excluded.featured,
           published=excluded.published,
           related_starter_drop_slug=excluded.related_starter_drop_slug,
           fast_route_tool_name=excluded.fast_route_tool_name,
           fast_route_description=excluded.fast_route_description,
           fast_route_affiliate_url=excluded.fast_route_affiliate_url,
           fast_route_button_text=excluded.fast_route_button_text,
           external_url=excluded.external_url,
           content_blocks=excluded.content_blocks, updated_at=excluded.updated_at`,
      )
        .bind(
          id,
          normalizeSlug(data.slug),
          data.title,
          data.excerpt ?? "",
          data.category ?? "",
          data.tags ?? "[]",
          data.cover_image_url ?? null,
          data.read_time ?? "",
          data.published_at ?? null,
          data.featured ?? 0,
          data.published ?? 0,
          data.related_starter_drop_slug ?? null,
          data.fast_route_tool_name ?? null,
          data.fast_route_description ?? null,
          data.fast_route_affiliate_url ?? null,
          data.fast_route_button_text ?? null,
          data.external_url ?? null,
          data.content_blocks ?? "[]",
          now,
          now,
        )
        .run();
      return { ok: true, id };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare("DELETE FROM intel_articles WHERE id = ?").bind(id).run();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });

export const duplicateArticle = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      const src = await env.DB.prepare("SELECT * FROM intel_articles WHERE id = ?")
        .bind(id)
        .first<DbIntelArticle>();
      if (!src) return { ok: false, error: "Not found" };
      const newId = genId("article");
      const newSlug = `${src.slug}-copy-${Date.now()}`;
      const now = new Date().toISOString();
      await env.DB.prepare(
        `INSERT INTO intel_articles
           (id, slug, title, excerpt, category, tags, cover_image_url,
            read_time, published_at, featured, published,
            related_starter_drop_slug,
            fast_route_tool_name, fast_route_description,
            fast_route_affiliate_url, fast_route_button_text,
            external_url, content_blocks, created_at, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      )
        .bind(
          newId,
          normalizeSlug(newSlug),
          `${src.title} (copy)`,
          src.excerpt,
          src.category,
          src.tags,
          src.cover_image_url,
          src.read_time,
          null,
          0,
          0,
          src.related_starter_drop_slug,
          src.fast_route_tool_name, src.fast_route_description,
          src.fast_route_affiliate_url, src.fast_route_button_text,
          src.external_url ?? null,
          src.content_blocks, now, now,
        )
        .run();
      return { ok: true, id: newId };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });

// ── Admin write: starter drops ────────────────────────────────────────────────

export const upsertStarterDrop = createServerFn({ method: "POST" })
  .inputValidator(
    (data: Partial<DbStarterDrop> & { id?: string; slug: string; title: string }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      const id = data.id || genId("drop");
      const now = new Date().toISOString();
      await env.DB.prepare(
        `INSERT INTO starter_drops
           (id, slug, title, excerpt, category, cover_image_url, difficulty,
            estimated_build_time, tools_used, published, related_article_slug,
            what_this_builds, what_you_get, build_prompt, file_tree,
            setup_steps, edit_map, troubleshooting, upgrade_note,
            created_at, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
         ON CONFLICT(id) DO UPDATE SET
           slug=excluded.slug, title=excluded.title, excerpt=excluded.excerpt,
           category=excluded.category, cover_image_url=excluded.cover_image_url,
           difficulty=excluded.difficulty, estimated_build_time=excluded.estimated_build_time,
           tools_used=excluded.tools_used, published=excluded.published,
           related_article_slug=excluded.related_article_slug,
           what_this_builds=excluded.what_this_builds, what_you_get=excluded.what_you_get,
           build_prompt=excluded.build_prompt, file_tree=excluded.file_tree,
           setup_steps=excluded.setup_steps, edit_map=excluded.edit_map,
           troubleshooting=excluded.troubleshooting, upgrade_note=excluded.upgrade_note,
           updated_at=excluded.updated_at`,
      )
        .bind(
          id,
          data.slug,
          data.title,
          data.excerpt ?? "",
          data.category ?? "",
          data.cover_image_url ?? null,
          data.difficulty ?? "Beginner",
          data.estimated_build_time ?? "",
          data.tools_used ?? "[]",
          data.published ?? 0,
          data.related_article_slug ?? null,
          data.what_this_builds ?? "[]",
          data.what_you_get ?? "[]",
          data.build_prompt ?? "",
          data.file_tree ?? "",
          data.setup_steps ?? "[]",
          data.edit_map ?? "[]",
          data.troubleshooting ?? "[]",
          data.upgrade_note ?? null,
          now,
          now,
        )
        .run();
      return { ok: true, id };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });

export const deleteStarterDrop = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare("DELETE FROM starter_drops WHERE id = ?").bind(id).run();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });

export const duplicateStarterDrop = createServerFn({ method: "POST" })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      const src = await env.DB.prepare("SELECT * FROM starter_drops WHERE id = ?")
        .bind(id)
        .first<DbStarterDrop>();
      if (!src) return { ok: false, error: "Not found" };
      const newId = genId("drop");
      const newSlug = `${src.slug}-copy-${Date.now()}`;
      const now = new Date().toISOString();
      await env.DB.prepare(
        `INSERT INTO starter_drops
           (id, slug, title, excerpt, category, cover_image_url, difficulty,
            estimated_build_time, tools_used, published, related_article_slug,
            what_this_builds, what_you_get, build_prompt, file_tree,
            setup_steps, edit_map, troubleshooting, upgrade_note,
            created_at, updated_at)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      )
        .bind(
          newId,
          normalizeSlug(newSlug),
          `${src.title} (copy)`,
          src.excerpt,
          src.category,
          src.cover_image_url,
          src.difficulty,
          src.estimated_build_time,
          src.tools_used,
          0,
          src.related_article_slug,
          src.what_this_builds,
          src.what_you_get,
          src.build_prompt,
          src.file_tree,
          src.setup_steps,
          src.edit_map,
          src.troubleshooting,
          src.upgrade_note,
          now,
          now,
        )
        .run();
      return { ok: true, id: newId };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });

// ── Import package (article + optional starter drop) ─────────────────────────

export const importIntelPackage = createServerFn({ method: "POST" })
  .inputValidator((pkg: ImportPackage) => pkg)
  .handler(async ({ data: pkg }) => {
    try {
      const env = await getEnv();
      const results: { articles?: string; drops?: string } = {};

      if (pkg.article) {
        const a = pkg.article;
        // Check if slug exists
        const existing = await env.DB.prepare("SELECT id FROM intel_articles WHERE slug = ?")
          .bind(a.slug)
          .first<{ id: string }>();
        const id = existing?.id || genId("article");
        const now = new Date().toISOString();
        await env.DB.prepare(
          `INSERT INTO intel_articles
             (id, slug, title, excerpt, category, tags, cover_image_url,
              read_time, published_at, featured, published,
              related_starter_drop_slug,
              fast_route_tool_name, fast_route_description,
              fast_route_affiliate_url, fast_route_button_text,
              external_url, content_blocks, created_at, updated_at)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
           ON CONFLICT(id) DO UPDATE SET
             slug=excluded.slug, title=excluded.title, excerpt=excluded.excerpt,
             category=excluded.category, tags=excluded.tags,
             cover_image_url=excluded.cover_image_url, read_time=excluded.read_time,
             published_at=excluded.published_at, featured=excluded.featured,
             published=excluded.published,
             related_starter_drop_slug=excluded.related_starter_drop_slug,
             fast_route_tool_name=excluded.fast_route_tool_name,
             fast_route_description=excluded.fast_route_description,
             fast_route_affiliate_url=excluded.fast_route_affiliate_url,
             fast_route_button_text=excluded.fast_route_button_text,
             external_url=excluded.external_url,
             content_blocks=excluded.content_blocks, updated_at=excluded.updated_at`,
        )
          .bind(
            id,
            normalizeSlug(a.slug),
            a.title,
            a.excerpt ?? "",
            a.category ?? "",
            typeof a.tags === "string" ? a.tags : JSON.stringify(a.tags ?? []),
            a.cover_image_url ?? null,
            a.read_time ?? "",
            a.published_at ?? new Date().toISOString(),
            a.featured ?? 0,
            a.published ?? 1,
            a.related_starter_drop_slug ?? null,
            a.fast_route_tool_name ?? null, a.fast_route_description ?? null,
            a.fast_route_affiliate_url ?? null, a.fast_route_button_text ?? null,
            a.external_url ?? null,
            typeof a.content_blocks === "string" ? a.content_blocks : JSON.stringify(a.content_blocks ?? []),
            now, now,
          )
          .run();
        results.articles = id;
      }

      if (pkg.starterDrop) {
        const d = pkg.starterDrop;
        const existing = await env.DB.prepare("SELECT id FROM starter_drops WHERE slug = ?")
          .bind(d.slug)
          .first<{ id: string }>();
        const id = existing?.id || genId("drop");
        const now = new Date().toISOString();
        await env.DB.prepare(
          `INSERT INTO starter_drops
             (id, slug, title, excerpt, category, cover_image_url, difficulty,
              estimated_build_time, tools_used, published, related_article_slug,
              what_this_builds, what_you_get, build_prompt, file_tree,
              setup_steps, edit_map, troubleshooting, upgrade_note,
              created_at, updated_at)
           VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
           ON CONFLICT(id) DO UPDATE SET
             slug=excluded.slug, title=excluded.title, excerpt=excluded.excerpt,
             category=excluded.category, cover_image_url=excluded.cover_image_url,
             difficulty=excluded.difficulty, estimated_build_time=excluded.estimated_build_time,
             tools_used=excluded.tools_used, published=excluded.published,
             related_article_slug=excluded.related_article_slug,
             what_this_builds=excluded.what_this_builds, what_you_get=excluded.what_you_get,
             build_prompt=excluded.build_prompt, file_tree=excluded.file_tree,
             setup_steps=excluded.setup_steps, edit_map=excluded.edit_map,
             troubleshooting=excluded.troubleshooting, upgrade_note=excluded.upgrade_note,
             updated_at=excluded.updated_at`,
        )
          .bind(
            id,
            d.slug,
            d.title,
            d.excerpt ?? "",
            d.category ?? "",
            d.cover_image_url ?? null,
            d.difficulty ?? "Beginner",
            d.estimated_build_time ?? "",
            typeof d.tools_used === "string" ? d.tools_used : JSON.stringify(d.tools_used ?? []),
            d.published ?? 1,
            d.related_article_slug ?? null,
            typeof d.what_this_builds === "string"
              ? d.what_this_builds
              : JSON.stringify(d.what_this_builds ?? []),
            typeof d.what_you_get === "string"
              ? d.what_you_get
              : JSON.stringify(d.what_you_get ?? []),
            d.build_prompt ?? "",
            d.file_tree ?? "",
            typeof d.setup_steps === "string" ? d.setup_steps : JSON.stringify(d.setup_steps ?? []),
            typeof d.edit_map === "string" ? d.edit_map : JSON.stringify(d.edit_map ?? []),
            typeof d.troubleshooting === "string"
              ? d.troubleshooting
              : JSON.stringify(d.troubleshooting ?? []),
            d.upgrade_note ?? null,
            now,
            now,
          )
          .run();
        results.drops = id;
      }

      return { ok: true, results };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  });
