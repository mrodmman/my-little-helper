# Cloudflare deployment notes

If Cloudflare shows:

- `Failed: root directory not found`

this is a **Cloudflare project setting issue**, not an application code/build issue.

## Fix in Cloudflare dashboard

1. Open your Cloudflare project.
2. Go to **Settings → Builds & deployments**.
3. Set **Root directory** to `/` (repository root), or leave it empty.
4. Save and retry deploy.

## Correct build settings for this repo

- Build command: `npm run build`
- Build output directory (Pages static assets): `dist/client`

## SSR / Worker note

This app is TanStack Start with a Worker server entry (`wrangler.jsonc` points `main` to `@tanstack/react-start/server-entry`).
If you want full SSR, deploy as a Worker flow instead of static-only Pages.
