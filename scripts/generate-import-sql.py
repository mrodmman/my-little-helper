#!/usr/bin/env python3
"""Generate SQL import file for Cloudflare D1 from course JSON export."""

import json
import sys

JSON_PATH = "/root/.claude/uploads/0d7f11eb-e981-4ec6-a068-507ac6b76060/f4cd74f5-krakenvaultimportenhanced20260519.json"
SQL_PATH = "/home/user/my-little-helper/scripts/import-course-2026-05-19.sql"


def esc(value):
    """Escape a value for use in a SQL string literal (single-quote safe)."""
    if value is None:
        return "NULL"
    if isinstance(value, bool):
        return "1" if value else "0"
    if isinstance(value, int):
        return str(value)
    if isinstance(value, float):
        return str(value)
    if isinstance(value, list):
        # Serialize lists (e.g. tags) as a JSON string
        serialized = json.dumps(value, separators=(",", ":"))
        return "'" + serialized.replace("'", "''") + "'"
    # String: already a JSON string representation of tags? pass through as-is after escaping
    s = str(value)
    return "'" + s.replace("'", "''") + "'"


def val(v):
    """Return SQL literal for any value, handling already-serialized JSON strings for tags."""
    return esc(v)


def main():
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    modules = data.get("modules", [])
    lessons = data.get("lessons", [])
    assets = data.get("assets", [])
    module_assets = data.get("moduleAssets", [])

    lines = []

    # --- Deletes ---
    lines.append("DELETE FROM module_assets;")
    lines.append("DELETE FROM lessons;")
    lines.append("DELETE FROM modules;")
    lines.append("DELETE FROM assets;")
    lines.append("")

    # --- Modules ---
    lines.append("-- modules")
    for m in modules:
        cols = ["id", "idx", "title", "subtitle", "tagline", "image_key", "icon_name", "visible", "created_at"]
        values = ", ".join(val(m.get(c)) for c in cols)
        lines.append(
            f"INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ({values});"
        )
    lines.append("")

    # --- Lessons (no id — AUTOINCREMENT) ---
    lines.append("-- lessons")
    for l in lessons:
        cols = ["module_id", "idx", "title", "content"]
        values = ", ".join(val(l.get(c)) for c in cols)
        lines.append(
            f"INSERT INTO lessons (module_id, idx, title, content) VALUES ({values});"
        )
    lines.append("")

    # --- Assets ---
    lines.append("-- assets")
    asset_cols = ["id", "type", "title", "description", "url", "body", "filename", "size", "format", "source", "duration", "tags", "image_key", "created_at"]
    for a in assets:
        # tags may already be a JSON string in the export — keep it as-is (it's a string, not a list)
        values = ", ".join(val(a.get(c)) for c in asset_cols)
        lines.append(
            f"INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ({values});"
        )
    lines.append("")

    # --- Module Assets (only module_id, asset_id, lesson_idx) ---
    lines.append("-- module_assets")
    for ma in module_assets:
        module_id = val(ma.get("module_id"))
        asset_id = val(ma.get("asset_id"))
        lesson_idx = val(ma.get("lesson_idx"))
        lines.append(
            f"INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ({module_id}, {asset_id}, {lesson_idx});"
        )
    lines.append("")

    sql_output = "\n".join(lines)

    with open(SQL_PATH, "w", encoding="utf-8") as f:
        f.write(sql_output)

    print(f"Written {len(lines)} lines to {SQL_PATH}")


if __name__ == "__main__":
    main()
