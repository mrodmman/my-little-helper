-- Kraken Intel + Starter Vault — D1 tables

CREATE TABLE IF NOT EXISTS intel_articles (
  id                        TEXT    PRIMARY KEY,
  slug                      TEXT    UNIQUE NOT NULL,
  title                     TEXT    NOT NULL,
  excerpt                   TEXT    NOT NULL DEFAULT '',
  category                  TEXT    NOT NULL DEFAULT '',
  tags                      TEXT    NOT NULL DEFAULT '[]',   -- JSON array of strings
  cover_image_url           TEXT,
  read_time                 TEXT    NOT NULL DEFAULT '',
  published_at              TEXT,
  featured                  INTEGER NOT NULL DEFAULT 0,      -- boolean 0/1
  published                 INTEGER NOT NULL DEFAULT 0,      -- boolean 0/1
  related_starter_drop_slug TEXT,
  fast_route_tool_name      TEXT,
  fast_route_description    TEXT,
  fast_route_affiliate_url  TEXT,
  fast_route_button_text    TEXT,
  content_blocks            TEXT    NOT NULL DEFAULT '[]',   -- JSON array of ContentBlock
  created_at                TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at                TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS starter_drops (
  id                    TEXT    PRIMARY KEY,
  slug                  TEXT    UNIQUE NOT NULL,
  title                 TEXT    NOT NULL,
  excerpt               TEXT    NOT NULL DEFAULT '',
  category              TEXT    NOT NULL DEFAULT '',
  cover_image_url       TEXT,
  difficulty            TEXT    NOT NULL DEFAULT 'beginner',
  estimated_build_time  TEXT    NOT NULL DEFAULT '',
  tools_used            TEXT    NOT NULL DEFAULT '[]',   -- JSON array of strings
  published             INTEGER NOT NULL DEFAULT 0,
  related_article_slug  TEXT,
  what_this_builds      TEXT    NOT NULL DEFAULT '[]',   -- JSON array of strings
  what_you_get          TEXT    NOT NULL DEFAULT '[]',   -- JSON array of strings
  build_prompt          TEXT    NOT NULL DEFAULT '',
  file_tree             TEXT    NOT NULL DEFAULT '',
  setup_steps           TEXT    NOT NULL DEFAULT '[]',   -- JSON array of strings
  edit_map              TEXT    NOT NULL DEFAULT '[]',   -- JSON array of {file, description}
  troubleshooting       TEXT    NOT NULL DEFAULT '[]',   -- JSON array of {problem, solution}
  upgrade_note          TEXT,
  created_at            TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at            TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_intel_articles_slug     ON intel_articles(slug);
CREATE INDEX IF NOT EXISTS idx_intel_articles_pub      ON intel_articles(published, published_at);
CREATE INDEX IF NOT EXISTS idx_intel_articles_featured ON intel_articles(featured);
CREATE INDEX IF NOT EXISTS idx_starter_drops_slug      ON starter_drops(slug);
CREATE INDEX IF NOT EXISTS idx_starter_drops_pub       ON starter_drops(published);

-- ── Seed: sample article + starter drop ─────────────────────────────────────

INSERT OR IGNORE INTO intel_articles (
  id, slug, title, excerpt, category, tags,
  cover_image_url, read_time, published_at,
  featured, published,
  related_starter_drop_slug,
  fast_route_tool_name, fast_route_description,
  fast_route_affiliate_url, fast_route_button_text,
  content_blocks
) VALUES (
  'article-001',
  'how-to-build-your-first-funnel-website-for-free',
  'How To Build Your First Funnel Website For Free',
  'You don''t need Clickfunnels. You don''t need a $200/month subscription. You can build a high-converting funnel website for free — and own it completely. Here''s exactly how.',
  'Build Systems',
  '["funnel","website","free tools","beginner","no-code"]',
  NULL,
  '8 min read',
  datetime('now'),
  1, 1,
  'free-starter-funnel-build-kit',
  'Framer',
  'If you want the fastest no-code route, Framer lets you publish a beautiful funnel site in under an hour — no dev skills needed.',
  'https://framer.com',
  'Try Framer Free',
  '[
    {"type":"heading","text":"Why You Don''t Need to Pay for a Funnel Builder"},
    {"type":"paragraph","text":"Most funnel tools charge $97–$297/month for features you could build yourself for free in an afternoon. The real cost isn''t the tool — it''s not knowing where to start."},
    {"type":"paragraph","text":"This guide fixes that. By the end, you''ll have a working funnel site architecture and a free build kit you can clone today."},
    {"type":"divider"},
    {"type":"subheading","text":"What a Funnel Website Actually Needs"},
    {"type":"bullet_list","items":["A landing/opt-in page that captures email addresses","A thank-you / confirmation page","A simple offer or product page (optional at first)","A way to deliver your lead magnet (PDF, prompt pack, etc.)"]},
    {"type":"callout","text":"You do NOT need fancy animations, complex integrations, or a 10-page website. One focused page converts better than a cluttered site.","variant":"tip"},
    {"type":"divider"},
    {"type":"subheading","text":"The Free Tech Stack"},
    {"type":"comparison_cards","cards":[{"title":"Option A — Fully Free","items":["Carrd (free tier) for landing page","ConvertKit free plan for email capture","Google Drive for lead magnet delivery"],"variant":"pro"},{"title":"Option B — Fast + Professional","items":["Framer (free tier) for design","Resend or Mailchimp free tier","Notion or Google Docs for delivery"],"variant":"neutral"}]},
    {"type":"divider"},
    {"type":"subheading","text":"Step-by-Step: Build It in One Afternoon"},
    {"type":"numbered_steps","items":["Define your single promise — what does someone get when they give you their email?","Write your headline. Use this formula: [Specific Result] for [Specific Person] in [Timeframe]","Choose Carrd or Framer and pick a minimal one-page template","Add: headline, subheadline, 1 image or mockup, email form, and 1 clear CTA button","Connect your email tool (ConvertKit, Mailchimp, Resend)","Upload your lead magnet and link it from the thank-you page","Test the whole flow end-to-end before sharing"]},
    {"type":"callout","text":"The Starter Vault build kit below includes a ready-to-use prompt that generates all your landing page copy in minutes.","variant":"info"},
    {"type":"divider"},
    {"type":"subheading","text":"Common Mistakes That Kill Conversions"},
    {"type":"bullet_list","items":["Too many options on the page (one CTA only)","Vague headline — nobody knows what they''re getting","No social proof — add even one testimonial or result","Slow page load — keep images compressed","Broken email sequence — test it yourself first"]},
    {"type":"divider"},
    {"type":"cta_box","headline":"Want the Full Step-by-Step Build Kit?","description":"Grab the free Starter Vault version — includes the build prompt, file structure, setup steps, and an edit map so you know exactly what to change.","buttonText":"Get the Free Build Kit","buttonUrl":"/starter-vault/free-starter-funnel-build-kit"}
  ]'
);

INSERT OR IGNORE INTO starter_drops (
  id, slug, title, excerpt, category,
  cover_image_url, difficulty, estimated_build_time,
  tools_used, published, related_article_slug,
  what_this_builds, what_you_get,
  build_prompt, file_tree,
  setup_steps, edit_map, troubleshooting, upgrade_note
) VALUES (
  'drop-001',
  'free-starter-funnel-build-kit',
  'Free Starter Funnel Build Kit',
  'A complete starter system to build your first funnel website for free. Includes build prompt, copy framework, file structure, and setup steps.',
  'Funnels',
  NULL,
  'Beginner',
  '1–2 hours',
  '["Carrd","ConvertKit","Google Drive"]',
  1,
  'how-to-build-your-first-funnel-website-for-free',
  '["A fully working opt-in / landing page","A thank-you page after email signup","A simple lead magnet delivery system","An email capture connected to a free email tool"]',
  '["Complete build prompt to generate your landing page","Copy formula for your headline and CTA","File structure for a 2-page funnel","Step-by-step setup guide","Edit map — exactly what to change for your niche","Troubleshooting guide for common issues"]',
  'You are a conversion copywriter and funnel architect. Build me a minimal, high-converting opt-in funnel using Carrd (free tier) and ConvertKit (free tier).

The funnel has 2 pages:
1. Landing/opt-in page
2. Thank-you/confirmation page

For the landing page, generate:
- A benefit-driven headline using this formula: [Specific Result] for [Specific Person] in [Timeframe]
- A 1-sentence subheadline that handles the main objection
- 3 bullet points showing what they get
- A clear CTA button label
- Short footer with privacy note

For the thank-you page, generate:
- A confirmation headline
- Clear instructions for what to do next (check email / download link)
- One optional upsell or next step

My niche/offer: [INSERT YOUR NICHE AND LEAD MAGNET HERE]',
  'funnel/
├── index.html          # Landing page (Carrd export or custom)
├── thank-you.html      # Thank-you page
├── assets/
│   ├── lead-magnet.pdf # Your downloadable lead magnet
│   └── og-image.png    # Social share image (1200x630)
└── README.md           # Setup notes',
  '["Create a free account on Carrd.co","Choose a one-page template (''Landing Page'' category works well)","Replace the headline, subheadline, and bullet points using the build prompt above","Add a form block — connect it to ConvertKit (free) or Mailchimp","Set up your thank-you page redirect URL in the form settings","Upload your lead magnet to Google Drive and make it publicly viewable","Copy the Google Drive direct download link and add it to your thank-you page","Test the full flow: submit the form yourself and confirm the email arrives","Publish your Carrd site (free tier gives you a .carrd.co subdomain)"]',
  '[{"file":"index.html / Carrd editor","description":"Replace headline, subheadline, bullet points, and CTA text with your own copy from the build prompt"},{"file":"Form settings","description":"Connect to your email tool (ConvertKit / Mailchimp) and set the redirect URL to your thank-you page"},{"file":"thank-you.html / page 2","description":"Add your download link and a short message confirming the email is on the way"},{"file":"assets/lead-magnet.pdf","description":"Replace with your actual lead magnet file — PDF, prompt pack, swipe file, etc."}]',
  '[{"problem":"Form not submitting","solution":"Check that your ConvertKit API key is correct in Carrd form settings. Also make sure your ConvertKit account is not over the free tier limit (1,000 subscribers)."},{"problem":"Thank-you redirect not working","solution":"In Carrd form settings, set the ''Success URL'' to the full URL of your thank-you page, including https://"},{"problem":"Google Drive link requires sign-in","solution":"Open the file in Google Drive, click Share, set to ''Anyone with the link'', then use File > Download to get the direct link. Or use gdrivelinks.com to convert to a direct download URL."},{"problem":"Low opt-in rate","solution":"Test your headline. Run the build prompt again with a more specific niche or result. Add one line of social proof above the fold."}]',
  'Once your funnel is live and converting, consider upgrading to Framer (better design control) or a paid ConvertKit plan for automation sequences. The Kraken Intel article links to more advanced systems when you''re ready.'
);
