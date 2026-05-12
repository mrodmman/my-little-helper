# Booking Follow-up Fixes

## Consolidated updates

- Updated booking page primary background image to `https://i.ibb.co/g1GKLtj/file-51.jpg`.
- Added resilient image fallback chain:
  1. primary: `file-51.jpg`
  2. secondary: `file-50.jpg`
  3. local fallback: `/images/booking-bg.jpg`
- Increased booking hero image visibility on mobile by reducing gradient darkness and raising image opacity.
- Aligned booking page with shared site theme tokens (`bg-background`, `text-foreground`, `border-border`, `bg-surface`, `text-muted-foreground`).
- Improved admin availability save UX:
  - Added explicit saving state label (`Saving...`).
  - Disabled save action while request is in progress.
  - Added explicit success and error feedback messaging.

## Follow-up required

- Ensure a real static image exists at `public/images/booking-bg.jpg` in production builds; this repo currently does not contain that file.
