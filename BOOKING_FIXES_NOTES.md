# Booking Follow-up Fixes

## Consolidated updates

- Updated booking page background image to `https://i.ibb.co/g1GKLtj/file-51.jpg`.
- Preserved resilient fallback behavior to `/images/booking-bg.jpg` when the remote background image fails.
- Aligned booking page with shared site theme tokens (`bg-background`, `text-foreground`, `border-border`, `bg-surface`, `text-muted-foreground`).
- Improved admin availability save UX:
  - Added explicit saving state label (`Saving...`).
  - Disabled save action while request is in progress.
  - Added explicit success and error feedback messaging.
