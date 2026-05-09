-- Seed vault login user
-- Email: matt@kbkcompanies.com
-- Password: M9640940

INSERT INTO users (id, email, password_hash)
VALUES (
  'user-matt-kbkcompanies',
  'matt@kbkcompanies.com',
  '04db79e427f9b0189373320b00b260aa:4040104117f10be8811cef6674a971162320dd76ff9866d5453d6d52862fbfe4'
)
ON CONFLICT(email) DO UPDATE SET
  password_hash = excluded.password_hash;
