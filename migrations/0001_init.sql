-- Kraken Vault — D1 schema

CREATE TABLE IF NOT EXISTS modules (
  id          TEXT    PRIMARY KEY,
  idx         INTEGER NOT NULL,
  title       TEXT    NOT NULL,
  subtitle    TEXT    NOT NULL,
  tagline     TEXT    NOT NULL DEFAULT '',
  image_key   TEXT,                          -- R2 object key; NULL = use SVG gradient
  icon_name   TEXT    NOT NULL DEFAULT 'BookOpen',
  visible     INTEGER NOT NULL DEFAULT 1,    -- 0 = hidden from public
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lessons (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  module_id   TEXT    NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  idx         INTEGER NOT NULL,
  title       TEXT    NOT NULL,
  content     TEXT    NOT NULL DEFAULT '',   -- Markdown
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_lessons_module ON lessons(module_id, idx);

CREATE TABLE IF NOT EXISTS assets (
  id          TEXT    PRIMARY KEY,
  type        TEXT    NOT NULL CHECK(type IN ('video','prompt','file','link')),
  title       TEXT    NOT NULL,
  description TEXT,
  url         TEXT,
  body        TEXT,                          -- prompt body text
  filename    TEXT,
  size        TEXT,
  format      TEXT,
  source      TEXT,
  duration    TEXT,
  tags        TEXT    NOT NULL DEFAULT '[]', -- JSON array
  image_key   TEXT,                          -- R2 preview image key
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS module_assets (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  module_id   TEXT    NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  asset_id    TEXT    NOT NULL REFERENCES assets(id) ON DELETE CASCADE,
  lesson_idx  INTEGER,                       -- NULL = module-level; number = specific lesson
  UNIQUE(module_id, asset_id, lesson_idx)
);

CREATE TABLE IF NOT EXISTS user_progress (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id   TEXT    NOT NULL,
  module_id    TEXT    NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  lesson_idx   INTEGER NOT NULL,
  completed_at TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE(session_id, module_id, lesson_idx)
);

CREATE INDEX IF NOT EXISTS idx_progress_session ON user_progress(session_id);
CREATE INDEX IF NOT EXISTS idx_progress_module  ON user_progress(module_id);
