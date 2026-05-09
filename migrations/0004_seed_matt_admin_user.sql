-- Seed admin-capable user for vault login
-- Email: matt@kbkcompanies.com
-- Password: M9640940

INSERT INTO users (id, email, password_hash, first_name, role, created_at)
VALUES (
  'user-matt-kbkcompanies',
  'matt@kbkcompanies.com',
  '04db79e427f9b0189373320b00b260aa:4040104117f10be8811cef6674a971162320dd76ff9866d5453d6d52862fbfe4',
  'Matt',
  'admin',
  CAST(strftime('%s','now') AS INTEGER)
)
ON CONFLICT(email) DO UPDATE SET
  password_hash = excluded.password_hash,
  first_name = excluded.first_name,
  role = excluded.role;
