CREATE TABLE IF NOT EXISTS drip_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  sequence_step INTEGER DEFAULT 0,
  next_send_at INTEGER,
  subscribed_at INTEGER,
  status TEXT DEFAULT 'active'
);
