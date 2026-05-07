/**
 * Server functions for user progress tracking.
 * Progress is keyed by session_id (from cookie) + module_id + lesson_idx.
 */
"use server";

import { createServerFn } from "@tanstack/react-start";
import { getEnv } from "@/lib/env";
import { getOrCreateSessionId, getSessionId } from "@/lib/session";

export type ProgressRow = {
  session_id: string;
  module_id: string;
  lesson_idx: number;
  completed_at: string;
};

export type ModuleProgressSummary = {
  module_id: string;
  completed: number;
  total: number;
};

/**
 * Load full progress for the current session across all modules.
 * Also sets the session cookie if not present.
 * Returns: { rows, sessionId }
 */
export const loadAllProgress = createServerFn().handler(async () => {
  const env = getEnv();
  const sessionId = getOrCreateSessionId();

  const { results } = await env.DB.prepare(
    "SELECT module_id, lesson_idx, completed_at FROM user_progress WHERE session_id = ?",
  )
    .bind(sessionId)
    .all<Pick<ProgressRow, "module_id" | "lesson_idx" | "completed_at">>();

  return { rows: results, sessionId };
});

/**
 * Load progress for a single module.
 */
export const loadModuleProgress = createServerFn()
  .inputValidator((moduleId: string) => moduleId)
  .handler(async ({ data: moduleId }) => {
    const env = getEnv();
    const sessionId = getOrCreateSessionId();

    const { results } = await env.DB.prepare(
      "SELECT lesson_idx, completed_at FROM user_progress WHERE session_id = ? AND module_id = ?",
    )
      .bind(sessionId, moduleId)
      .all<Pick<ProgressRow, "lesson_idx" | "completed_at">>();

    return { completedIndexes: results.map((r) => r.lesson_idx), sessionId };
  });

/**
 * Mark a lesson complete (idempotent).
 */
export const markLessonComplete = createServerFn()
  .inputValidator((data: { module_id: string; lesson_idx: number }) => data)
  .handler(async ({ data }) => {
    const env = getEnv();
    const sessionId = getOrCreateSessionId();

    await env.DB.prepare(
      "INSERT OR IGNORE INTO user_progress (session_id, module_id, lesson_idx) VALUES (?, ?, ?)",
    )
      .bind(sessionId, data.module_id, data.lesson_idx)
      .run();

    return { ok: true };
  });

/**
 * Mark a lesson incomplete.
 */
export const markLessonIncomplete = createServerFn()
  .inputValidator((data: { module_id: string; lesson_idx: number }) => data)
  .handler(async ({ data }) => {
    const env = getEnv();
    const sessionId = getSessionId();
    if (!sessionId) return { ok: true };

    await env.DB.prepare(
      "DELETE FROM user_progress WHERE session_id = ? AND module_id = ? AND lesson_idx = ?",
    )
      .bind(sessionId, data.module_id, data.lesson_idx)
      .run();

    return { ok: true };
  });

/**
 * Reset all progress for the current session's module.
 */
export const resetModuleProgress = createServerFn()
  .inputValidator((moduleId: string) => moduleId)
  .handler(async ({ data: moduleId }) => {
    const env = getEnv();
    const sessionId = getSessionId();
    if (!sessionId) return { ok: true };

    await env.DB.prepare(
      "DELETE FROM user_progress WHERE session_id = ? AND module_id = ?",
    )
      .bind(sessionId, moduleId)
      .run();

    return { ok: true };
  });

/**
 * Reset ALL progress for the current session.
 */
export const resetAllProgress = createServerFn().handler(async () => {
  const env = getEnv();
  const sessionId = getSessionId();
  if (!sessionId) return { ok: true };

  await env.DB.prepare("DELETE FROM user_progress WHERE session_id = ?")
    .bind(sessionId)
    .run();

  return { ok: true };
});

/**
 * Per-module progress summary (used on the home page module grid).
 * Returns { module_id, completed, total } for each module.
 */
export const loadProgressSummary = createServerFn().handler(async () => {
  const env = getEnv();
  const sessionId = getOrCreateSessionId();

  // Completed counts per module
  const { results: completed } = await env.DB.prepare(
    `SELECT module_id, COUNT(*) as completed
     FROM user_progress WHERE session_id = ?
     GROUP BY module_id`,
  )
    .bind(sessionId)
    .all<{ module_id: string; completed: number }>();

  // Total lessons per module
  const { results: totals } = await env.DB.prepare(
    "SELECT module_id, COUNT(*) as total FROM lessons GROUP BY module_id",
  ).all<{ module_id: string; total: number }>();

  const totalMap = new Map(totals.map((r) => [r.module_id, r.total]));
  const completedMap = new Map(completed.map((r) => [r.module_id, r.completed]));

  // Global stats
  const totalLessons = totals.reduce((s, r) => s + r.total, 0);
  const completedLessons = completed.reduce((s, r) => s + r.completed, 0);

  const moduleSummaries: ModuleProgressSummary[] = totals.map((t) => ({
    module_id: t.module_id,
    completed: completedMap.get(t.module_id) ?? 0,
    total: totalMap.get(t.module_id) ?? 0,
  }));

  return {
    moduleSummaries,
    totalLessons,
    completedLessons,
    sessionId,
  };
});
