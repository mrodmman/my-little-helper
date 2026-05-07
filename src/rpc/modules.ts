/**
 * Server functions for modules and lessons.
 * All functions read from / write to Cloudflare D1.
 */
"use server";

import { createServerFn } from "@tanstack/react-start";
import { getEnv } from "@/lib/env";

// ---- Types ----

export type DbModule = {
  id: string;
  idx: number;
  title: string;
  subtitle: string;
  tagline: string;
  image_key: string | null;
  icon_name: string;
  visible: number;
};

export type DbLesson = {
  id: number;
  module_id: string;
  idx: number;
  title: string;
  content: string;
};

export type DbAsset = {
  id: string;
  type: "video" | "prompt" | "file" | "link";
  title: string;
  description: string | null;
  url: string | null;
  body: string | null;
  filename: string | null;
  size: string | null;
  format: string | null;
  source: string | null;
  duration: string | null;
  tags: string; // JSON
  image_key: string | null;
};

export type DbModuleAsset = {
  module_id: string;
  asset_id: string;
  lesson_idx: number | null;
};

// ---- Read functions ----

export const getModules = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const { results } = await env.DB.prepare(
      "SELECT * FROM modules WHERE visible = 1 ORDER BY idx ASC",
    ).all<DbModule>();
    return results;
  } catch {
    return null;
  }
});

export const getAllModulesAdmin = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const { results } = await env.DB.prepare(
      "SELECT * FROM modules ORDER BY idx ASC",
    ).all<DbModule>();
    return results;
  } catch {
    return null;
  }
});

export const getLessons = createServerFn()
  .inputValidator((moduleId: string) => moduleId)
  .handler(async ({ data: moduleId }) => {
    try {
      const env = await getEnv();
      const { results } = await env.DB.prepare(
        "SELECT * FROM lessons WHERE module_id = ? ORDER BY idx ASC",
      )
        .bind(moduleId)
        .all<DbLesson>();
      return results;
    } catch {
      return null;
    }
  });

export const getModuleWithLessons = createServerFn()
  .inputValidator((moduleId: string) => moduleId)
  .handler(async ({ data: moduleId }) => {
    try {
      const env = await getEnv();
      const [modRow, lessonsRes] = await Promise.all([
        env.DB.prepare("SELECT * FROM modules WHERE id = ?").bind(moduleId).first<DbModule>(),
        env.DB.prepare("SELECT * FROM lessons WHERE module_id = ? ORDER BY idx ASC")
          .bind(moduleId)
          .all<DbLesson>(),
      ]);
      if (!modRow) return null;
      return { module: modRow, lessons: lessonsRes.results };
    } catch {
      return null;
    }
  });

export const getAllAssets = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const { results } = await env.DB.prepare("SELECT * FROM assets ORDER BY rowid ASC").all<DbAsset>();
    return results;
  } catch {
    return null;
  }
});

export const getModuleAssets = createServerFn()
  .inputValidator((moduleId: string) => moduleId)
  .handler(async ({ data: moduleId }) => {
    try {
      const env = await getEnv();
      const { results } = await env.DB.prepare(
        `SELECT ma.*, a.* FROM module_assets ma
         JOIN assets a ON a.id = ma.asset_id
         WHERE ma.module_id = ?`,
      )
        .bind(moduleId)
        .all<DbModuleAsset & DbAsset>();
      return results;
    } catch {
      return null;
    }
  });

// ---- Admin write functions ----

export const updateModule = createServerFn()
  .inputValidator(
    (data: Partial<Omit<DbModule, "id">> & { id: string }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      const fields: string[] = [];
      const vals: unknown[] = [];
      if (data.title !== undefined)    { fields.push("title = ?");    vals.push(data.title); }
      if (data.subtitle !== undefined) { fields.push("subtitle = ?"); vals.push(data.subtitle); }
      if (data.tagline !== undefined)  { fields.push("tagline = ?");  vals.push(data.tagline); }
      if (data.visible !== undefined)  { fields.push("visible = ?");  vals.push(data.visible); }
      if (data.image_key !== undefined){ fields.push("image_key = ?");vals.push(data.image_key); }
      if (fields.length === 0) return;
      vals.push(data.id);
      await env.DB.prepare(`UPDATE modules SET ${fields.join(", ")} WHERE id = ?`)
        .bind(...vals)
        .run();
    } catch {
      // silently fail — caller can retry
    }
  });

export const reorderModules = createServerFn()
  .inputValidator((ids: string[]) => ids)
  .handler(async ({ data: ids }) => {
    try {
      const env = await getEnv();
      const stmts = ids.map((id, i) =>
        env.DB.prepare("UPDATE modules SET idx = ? WHERE id = ?").bind(i, id),
      );
      await env.DB.batch(stmts);
    } catch {
      // silently fail
    }
  });

export const deleteModule = createServerFn()
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare("DELETE FROM modules WHERE id = ?").bind(id).run();
    } catch {
      // silently fail
    }
  });

export const upsertLesson = createServerFn()
  .inputValidator(
    (data: { id?: number; module_id: string; idx: number; title: string; content: string }) =>
      data,
  )
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      if (data.id) {
        await env.DB.prepare(
          "UPDATE lessons SET title = ?, content = ?, idx = ? WHERE id = ?",
        )
          .bind(data.title, data.content, data.idx, data.id)
          .run();
        return data.id;
      }
      const result = await env.DB.prepare(
        "INSERT INTO lessons (module_id, idx, title, content) VALUES (?, ?, ?, ?)",
      )
        .bind(data.module_id, data.idx, data.title, data.content)
        .run();
      return result.meta.last_row_id as number;
    } catch {
      return null;
    }
  });

export const deleteLesson = createServerFn()
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare("DELETE FROM lessons WHERE id = ?").bind(id).run();
    } catch {
      // silently fail
    }
  });

export const reorderLessons = createServerFn()
  .inputValidator((ids: number[]) => ids)
  .handler(async ({ data: ids }) => {
    try {
      const env = await getEnv();
      const stmts = ids.map((id, i) =>
        env.DB.prepare("UPDATE lessons SET idx = ? WHERE id = ?").bind(i, id),
      );
      await env.DB.batch(stmts);
    } catch {
      // silently fail
    }
  });

export const upsertAsset = createServerFn()
  .inputValidator((data: Partial<DbAsset> & { id: string }) => data)
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare(
        `INSERT INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           type=excluded.type, title=excluded.title, description=excluded.description,
           url=excluded.url, body=excluded.body, filename=excluded.filename,
           size=excluded.size, format=excluded.format, source=excluded.source,
           duration=excluded.duration, tags=excluded.tags, image_key=excluded.image_key`,
      )
        .bind(
          data.id, data.type ?? "link", data.title ?? "", data.description ?? null,
          data.url ?? null, data.body ?? null, data.filename ?? null, data.size ?? null,
          data.format ?? null, data.source ?? null, data.duration ?? null,
          data.tags ?? "[]", data.image_key ?? null,
        )
        .run();
    } catch {
      // silently fail
    }
  });

export const deleteAsset = createServerFn()
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare("DELETE FROM assets WHERE id = ?").bind(id).run();
    } catch {
      // silently fail
    }
  });

export const upsertModuleAsset = createServerFn()
  .inputValidator(
    (data: { module_id: string; asset_id: string; lesson_idx: number | null }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare(
        "INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES (?, ?, ?)",
      )
        .bind(data.module_id, data.asset_id, data.lesson_idx)
        .run();
    } catch {
      // silently fail
    }
  });

export const deleteModuleAsset = createServerFn()
  .inputValidator((id: number) => id)
  .handler(async ({ data: id }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare("DELETE FROM module_assets WHERE id = ?").bind(id).run();
    } catch {
      // silently fail
    }
  });

// ---- JSON Import / Export ----

export const exportCourseJson = createServerFn().handler(async () => {
  try {
    const env = await getEnv();
    const [modsRes, lessonsRes, assetsRes, maRes] = await env.DB.batch([
      env.DB.prepare("SELECT * FROM modules ORDER BY idx ASC"),
      env.DB.prepare("SELECT * FROM lessons ORDER BY module_id ASC, idx ASC"),
      env.DB.prepare("SELECT * FROM assets ORDER BY rowid ASC"),
      env.DB.prepare("SELECT * FROM module_assets"),
    ]);
    return {
      modules: modsRes.results as DbModule[],
      lessons: lessonsRes.results as DbLesson[],
      assets: assetsRes.results as DbAsset[],
      moduleAssets: maRes.results as DbModuleAsset[],
    };
  } catch {
    return null;
  }
});

export const importCourseJson = createServerFn()
  .inputValidator(
    (data: {
      modules: DbModule[];
      lessons: DbLesson[];
      assets: DbAsset[];
      moduleAssets: DbModuleAsset[];
    }) => data,
  )
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      // Clear existing
      await env.DB.batch([
        env.DB.prepare("DELETE FROM module_assets"),
        env.DB.prepare("DELETE FROM lessons"),
        env.DB.prepare("DELETE FROM modules"),
        env.DB.prepare("DELETE FROM assets"),
      ]);

      const stmts = [
        ...data.modules.map((m) =>
          env.DB.prepare(
            "INSERT INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible) VALUES (?,?,?,?,?,?,?,?)",
          ).bind(m.id, m.idx, m.title, m.subtitle, m.tagline, m.image_key, m.icon_name, m.visible),
        ),
        ...data.lessons.map((l) =>
          env.DB.prepare(
            "INSERT INTO lessons (id, module_id, idx, title, content) VALUES (?,?,?,?,?)",
          ).bind(l.id, l.module_id, l.idx, l.title, l.content),
        ),
        ...data.assets.map((a) =>
          env.DB.prepare(
            "INSERT INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
          ).bind(a.id, a.type, a.title, a.description, a.url, a.body, a.filename, a.size, a.format, a.source, a.duration, a.tags, a.image_key),
        ),
        ...data.moduleAssets.map((ma) =>
          env.DB.prepare(
            "INSERT INTO module_assets (module_id, asset_id, lesson_idx) VALUES (?,?,?)",
          ).bind(ma.module_id, ma.asset_id, ma.lesson_idx),
        ),
      ];

      // D1 batch limit is 100 statements
      for (let i = 0; i < stmts.length; i += 100) {
        await env.DB.batch(stmts.slice(i, i + 100));
      }
      return { ok: true };
    } catch {
      return { ok: false };
    }
  });

export const updateModuleImageKey = createServerFn()
  .inputValidator((data: { module_id: string; image_key: string }) => data)
  .handler(async ({ data }) => {
    try {
      const env = await getEnv();
      await env.DB.prepare("UPDATE modules SET image_key = ? WHERE id = ?")
        .bind(data.image_key, data.module_id)
        .run();
    } catch {
      // silently fail
    }
  });
