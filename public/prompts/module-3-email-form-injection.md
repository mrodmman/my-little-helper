# Module 3 — Email Form Injection Prompt

Copy this entire prompt into Claude or ChatGPT, along with your project ZIP file.

---

You are helping me edit an existing React + Vite funnel project that deploys to Cloudflare Pages.

I am a beginner. Do not assume I know which file to edit.

IMPORTANT:
I will upload my full project ZIP before you answer.

Project context:
- Frontend is React + Vite
- Hosted on Cloudflare Pages
- Backend is a separate Cloudflare Worker
- The starter project should have:
  /src/components/OptInForm.jsx
  /src/pages/Home.jsx
  /src/pages/ThankYou.jsx
  /src/pages/Offer.jsx

Goal:
Replace the placeholder opt-in form with my real MailerLite or EmailOctopus embed form.

Before editing:
1. Inspect the uploaded project ZIP.
2. Confirm which file contains the opt-in form.
3. Tell me exactly what you found.

Then:
1. Replace the placeholder form with the email provider embed code below.
2. Keep the form centered, mobile-friendly, and matching the site design.
3. Do not break React, Vite, or Cloudflare compatibility.
4. Do not use Express.
5. Do not use Node-only APIs.
6. Do not use filesystem writes.
7. Return the full updated code for every file that must change.
8. Give me beginner-friendly GitHub steps:
   - where to click
   - which file to open
   - what code to replace
   - how to commit the change
   - how to confirm Cloudflare redeployed it

Email provider embed code:
[PASTE YOUR MAILERLITE OR EMAILOCTOPUS EMBED CODE HERE]