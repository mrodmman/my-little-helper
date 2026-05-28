KRAKEN EMAIL — RESEND PUBLISH HELPERS

IMPORTANT: Rotate your Resend API key. The uploaded import.js had a live-looking key hardcoded in it. After rotating, use an environment variable instead of pasting the key into code.

Option A — publish the templates you already updated/imported:
1) Open terminal in this folder.
2) Set your key:
   PowerShell:
     $env:RESEND_API_KEY="re_your_new_key_here"
   Windows CMD:
     set RESEND_API_KEY=re_your_new_key_here
   Mac/Linux:
     export RESEND_API_KEY="re_your_new_key_here"
3) Run:
     node publish-all.js

Option B — update HTML and publish in one run:
1) Replace template.js with template.fixed.js if you want the footer fix.
2) Set RESEND_API_KEY as above.
3) Run:
     node import-and-publish.js

What was fixed/added:
- publish-all.js calls POST /templates/:id/publish for all 15 templates.
- import-and-publish.js updates each template, then publishes it immediately.
- template.fixed.js replaces the placeholder # unsubscribe link with {{{RESEND_UNSUBSCRIBE_URL}}} and changes View in browser to Visit site.

Notes:
- Resend's publish endpoint accepts either a template ID or alias.
- For Broadcasts/Automations, Resend handles unsubscribe automatically when {{{RESEND_UNSUBSCRIBE_URL}}} is included.
