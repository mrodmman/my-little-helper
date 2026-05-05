-- Users and auth tokens (run after 0001_init.sql)

CREATE TABLE IF NOT EXISTS users (
  id            TEXT    PRIMARY KEY,          -- UUID
  email         TEXT    NOT NULL UNIQUE,
  name          TEXT    NOT NULL DEFAULT '',
  password_hash TEXT    NOT NULL,
  email_verified INTEGER NOT NULL DEFAULT 0,  -- 0 = pending, 1 = verified
  role          TEXT    NOT NULL DEFAULT 'member', -- 'member' | 'admin'
  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  last_login    TEXT
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS auth_tokens (
  id         TEXT    PRIMARY KEY,             -- UUID
  user_id    TEXT    NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type       TEXT    NOT NULL CHECK(type IN ('session','email_verify','password_reset')),
  token      TEXT    NOT NULL UNIQUE,         -- UUID used in cookie / email link
  expires_at TEXT    NOT NULL,
  used       INTEGER NOT NULL DEFAULT 0,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tokens_token   ON auth_tokens(token);
CREATE INDEX IF NOT EXISTS idx_tokens_user    ON auth_tokens(user_id);
