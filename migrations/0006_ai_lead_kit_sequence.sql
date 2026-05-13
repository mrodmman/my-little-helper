-- Add sequence_type to drip_subscribers and switch to composite unique key
-- so the same email can independently exist in multiple drip sequences.
-- Existing rows are assigned sequence_type = 'kraken_vault'.

PRAGMA defer_foreign_keys = ON;

CREATE TABLE drip_subscribers_v2 (
  id            TEXT    PRIMARY KEY,
  email         TEXT    NOT NULL,
  first_name    TEXT,
  sequence_type TEXT    NOT NULL DEFAULT 'kraken_vault',
  sequence_step INTEGER DEFAULT 0,
  next_send_at  INTEGER,
  subscribed_at INTEGER,
  status        TEXT    DEFAULT 'active',
  UNIQUE(email, sequence_type)
);

INSERT INTO drip_subscribers_v2
  (id, email, first_name, sequence_type, sequence_step, next_send_at, subscribed_at, status)
SELECT id, email, first_name, 'kraken_vault', sequence_step, next_send_at, subscribed_at, status
FROM drip_subscribers;

DROP TABLE drip_subscribers;
ALTER TABLE drip_subscribers_v2 RENAME TO drip_subscribers;

CREATE INDEX idx_drip_active ON drip_subscribers(status, next_send_at);
CREATE INDEX idx_drip_seq_active ON drip_subscribers(sequence_type, status, next_send_at);
