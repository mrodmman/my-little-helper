-- Add external_url to intel_articles
-- When set, article cards link directly to this URL instead of /intel/$slug
ALTER TABLE intel_articles ADD COLUMN external_url TEXT DEFAULT NULL;
