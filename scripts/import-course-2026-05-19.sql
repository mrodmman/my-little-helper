DELETE FROM module_assets;
DELETE FROM lessons;
DELETE FROM modules;
DELETE FROM assets;

-- modules
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-0-start-here-command-center', 0, 'Start Here', 'Command Center & Guided Path', 'Figure out where you are, what to ignore, and what to build first.', NULL, 'Compass', 1, '2026-05-19 02:00:00');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-1a-tools-stack-setup', 1, 'Module 1a', 'Tools, Stack & Setup', 'Get online, look professional, pay almost nothing.', NULL, 'Wrench', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-1b-pick-your-path', 2, 'Module 1b', 'Pick Your Path', 'Choose the income path that fits your life before you build the wrong machine.', NULL, 'Route', 1, '2026-05-19 02:00:00');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-2-the-funnel-system', 3, 'Module 2', 'The Funnel System', 'Build the three-page funnel that turns clicks into leads.', NULL, 'GitBranch', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-3-the-email-system', 4, 'Module 3', 'The Email System', 'Welcome, nurture and convert — on autopilot.', NULL, 'Mail', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-4-the-automation-system', 5, 'Module 4', 'The Automation System', 'Wire your stack together so it runs without you.', NULL, 'Workflow', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-5-the-traffic-system', 6, 'Module 5', 'The Traffic System', 'Get real eyeballs — organic first, paid second.', NULL, 'TrendingUp', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-6-the-content-system', 7, 'Module 6', 'The Content System', 'Never run out of ideas, hooks or posts again.', NULL, 'Video', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-7-dm-lead-close', 8, 'Module 7', 'DM → Lead → Close', 'Turn DMs into leads without sounding salesy.', NULL, 'MessageSquare', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-8-the-offer-vault', 9, 'Module 8', 'The Offer Vault', 'Pick offers that actually pay, stack them properly.', NULL, 'Tag', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-9-the-promotion-system', 10, 'Module 9', 'The Promotion System', 'Run promotions that move your list to buy.', NULL, 'Megaphone', 1, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO modules (id, idx, title, subtitle, tagline, image_key, icon_name, visible, created_at) VALUES ('module-10-build-paths', 11, 'Module 10', 'Build Paths', 'Pick your path. Build the next 90 days.', NULL, 'Map', 1, '2026-05-07 01:41:46');

-- lessons
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-0-start-here-command-center', 0, 'Welcome to the Command Center', 'This is the orientation layer for The Kraken Vault.

The Vault is not meant to be consumed like a Netflix series. It is a build system. You are not here to collect more information. You are here to leave with assets that exist in the real world:

* a domain
* a professional email
* a working funnel
* an email list
* a tracking hub
* a content system
* an offer stack
* a promotion plan
* a 90-day execution path

The goal is not to watch everything. The goal is to build the right thing in the right order.

**Rule:** if a lesson does not apply to your current path, do not feel guilty skipping it. The Vault is built like a tool room. You do not need every tool on day one. You need the next tool.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-0-start-here-command-center', 1, 'The Kraken Vault Phase Map', 'Think of the Vault in four phases:

## Phase 1 — Foundation
Start Here, Module 1a, and Module 1b. You get your base stack, your path, and your operating rules.

## Phase 2 — Infrastructure
Modules 2, 3, and 4. You build the funnel, email system, and automation hub.

## Phase 3 — Attention & Conversations
Modules 5, 6, and 7. You create traffic, content, and DM conversations that feed the system.

## Phase 4 — Monetization & Scale
Modules 8, 9, and 10. You choose offers, run promotions, and decide whether to keep promoting, build your own product, or add services.

This is the clean sequence:

**Foundation → Funnel → Email → Automation → Traffic → Content → DM → Offer → Promotion → 90-Day Build Path**

If you ever feel lost, come back to this map.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-0-start-here-command-center', 2, 'Pick Your Starting Situation', 'Choose the situation that sounds most like you right now.

## Situation A — “I have no audience and no system.”
Start here:
1. Module 1a — Tools, Stack & Setup
2. Module 1b — Pick Your Path
3. Module 2 — Funnel System
4. Module 3 — Email System
5. Module 5 — Traffic System
6. Module 6 — Content System

Your first goal: get a simple funnel live and start posting consistently.

## Situation B — “I already have a business or skill.”
Start here:
1. Module 1b — Pick Your Path
2. Module 2 — Funnel System
3. Module 3 — Email System
4. Module 7 — DM → Lead → Close
5. Module 8 — Offer Vault
6. Module 9 — Promotion System

Your first goal: turn your existing skill/business into a lead capture and follow-up system.

## Situation C — “I want affiliate income.”
Start here:
1. Module 1a — Tools, Stack & Setup
2. Module 1b — Pick Your Path
3. Module 8 — Offer Vault
4. Module 2 — Funnel System
5. Module 3 — Email System
6. Module 6 — Content System
7. Module 9 — Promotion System

Your first goal: pick one offer stack and build assets around it.

## Situation D — “I want automation and systems.”
Start here:
1. Module 1a — Tools, Stack & Setup
2. Module 2 — Funnel System
3. Module 4 — Automation System
4. Module 6 — Content System
5. Module 10 — Build Paths

Your first goal: build one working automation you can show, use, or package.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-0-start-here-command-center', 3, 'The First 7 Days — Minimum Viable Vault Sprint', 'If you want the fastest possible start, do this sprint.

## Day 1
Read this Start Here module. Decide your path. Do not research five different business models.

## Day 2
Complete Module 1a basics: domain, professional email, Cloudflare, GitHub, AI tools, and email platform.

## Day 3
Use Module 2 to generate your simple funnel shell. Get something live, even if it is ugly.

## Day 4
Create your lead magnet in Canva. Keep it small: checklist, cheat sheet, mini guide, or prompt pack.

## Day 5
Use Module 3 to connect email capture and write the first version of your welcome sequence.

## Day 6
Use Module 4 to create your Business Hub and log your first test lead.

## Day 7
Use Module 5 or 6 to post your first content that points to your opt-in page.

End of sprint goal: you have a live system, not just notes.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-0-start-here-command-center', 4, 'Reality Check — This Is Not Passive Up Front', 'The internet loves to sell “passive income” because it sounds painless.

Here is the honest version:

**Nothing is passive at the beginning.**

The passive part only comes after you build assets that keep working:

* content people can find later
* a funnel that collects leads
* an email sequence that follows up automatically
* affiliate links or offers placed inside useful resources
* automations that move data without you touching it

Your first month may feel slow. Your first posts may get ignored. Your first emails may not sell. That does not mean the system is broken. It means you are in the build phase.

Most people quit before the machine has enough parts connected to do anything.

Do not judge the Vault by how much money you made after reading. Judge it by what exists after you execute.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-0-start-here-command-center', 5, 'How to Use the Vault Without Getting Overwhelmed', 'Use this operating rule:

**One path. One offer. One funnel. One traffic source. One weekly review.**

Do not try to build every possible version of this system at once.

## Your weekly review
Every Sunday, open your Business Hub and answer:

1. Did I publish content this week?
2. Did I send or schedule an email?
3. Did I get leads?
4. Did I have conversations?
5. Did I promote one clear offer?
6. What broke?
7. What gets fixed next week?

This turns the Vault from a course into an operating system.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1b-pick-your-path', 0, 'Why This Module Exists', 'Most beginners do not fail because they picked the “wrong” tool.

They fail because they try to build five different businesses at once.

Affiliate content one week. Dropshipping the next. Local lead gen after that. Then AI apps. Then digital products. Then a new course. Then nothing.

Module 1b forces the decision:

**What machine are you building first?**

You can expand later. But for the next 30–90 days, you need one primary path.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1b-pick-your-path', 1, 'The Four Vault Paths', '## Path 1 — Affiliate Operator
You promote useful products, tools, software, or deals and earn commissions. Best if you like content, recommendations, reviews, tutorials, and comparison posts.

## Path 2 — Business Growth Operator
You already have a skill, business, or service and want the Vault to create leads, follow-up, and client acquisition.

## Path 3 — Automation / Systems Builder
You build workflows, templates, scripts, dashboards, and systems that save people time. This can become services, digital products, or SaaS-style tools.

## Path 4 — Creator / Product Builder
You use content to build an audience, then sell your own templates, mini-products, guides, tools, or courses.

None of these paths are permanent. This is only your starting lane.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1b-pick-your-path', 2, 'Path Picker — Choose Your First 90 Days', 'Answer these honestly.

## If you need the simplest first dollar
Choose **Affiliate Operator**.

You can start with products/tools you already know, build content around them, and use the Offer Vault to evaluate what is worth promoting.

## If you already have a valuable skill
Choose **Business Growth Operator**.

Your fastest money is probably not affiliate commissions. It is packaging your existing skill into a service and using the Vault to generate leads.

## If you like tech, workflows, and solving messy problems
Choose **Automation / Systems Builder**.

Your first asset might be an n8n workflow pack, Google Sheets dashboard, Cloudflare mini-app, or automation setup service.

## If you like teaching and packaging what you learn
Choose **Creator / Product Builder**.

Your first product should be small: $17–$47, specific, and based on a real problem you solved.

**Decision rule:** choose the path that matches what you can actually do for the next 90 days, not the one that sounds coolest.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1b-pick-your-path', 3, 'The Four Levels of Affiliate/System Operators', 'Use this to understand where you are, not to judge yourself.

## Level 1 — Link Dropper
You post content and place links, hoping someone clicks. This is where most people start. It is weak by itself but useful for learning.

## Level 2 — Trust Builder
You build an email list, audience, or community. People start recognizing your name. Your recommendations convert because there is a relationship.

## Level 3 — System Operator
You add bridge pages, bonuses, automations, tracking, segmentation, and follow-up. You are no longer just recommending. You are building the customer journey.

## Level 4 — Authority Partner
Companies, creators, clients, or brands reach out to you. You can negotiate custom bonuses, higher commissions, sponsorships, or paid reviews because you control attention and trust.

The Vault’s job is to move you from Level 1 toward Level 3. Level 4 comes later as a byproduct.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1b-pick-your-path', 4, 'Shiny Object Detox — The Operator Rulebook', 'Shiny Object Syndrome is not just buying too many courses.

It is the habit of escaping the boring middle by starting over.

Use this rulebook for the next 30 days:

* No new business model unless it directly supports your chosen path
* No new paid tool unless it replaces something or solves a current bottleneck
* No new course unless it helps you finish the system you already started
* No redesigning your site until the current version has traffic
* No changing niches because one post flopped
* No “research days” that do not end with an asset published

## The 30-minute detox audit
Open a note or spreadsheet and list:

1. Tools you pay for
2. Courses/resources you bought but never finished
3. Business ideas you started but abandoned
4. Tabs/bookmarks/videos you keep saving “for later”
5. The one path you are choosing for the next 90 days

Then write this sentence:

**For the next 90 days, I am building: [chosen path] using [one funnel] and [one traffic source].**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1b-pick-your-path', 5, 'Your Path-Based Module Order', '## Affiliate Operator Order
1. Module 1a — Tools, Stack & Setup
2. Module 1b — Pick Your Path
3. Module 8 — Offer Vault
4. Module 2 — Funnel System
5. Module 3 — Email System
6. Module 6 — Content System
7. Module 5 — Traffic System
8. Module 9 — Promotion System
9. Module 10 — Build Paths

## Business Growth Operator Order
1. Module 1a
2. Module 1b
3. Module 2
4. Module 3
5. Module 7
6. Module 6
7. Module 9
8. Module 10

## Automation / Systems Builder Order
1. Module 1a
2. Module 2
3. Module 4
4. Module 6
5. Module 7
6. Module 8
7. Module 10

## Creator / Product Builder Order
1. Module 1a
2. Module 1b
3. Module 6
4. Module 2
5. Module 3
6. Module 7
7. Module 9
8. Module 10

You can still read everything eventually. This is only the order that prevents overwhelm.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1b-pick-your-path', 6, 'Module 1b Action Checklist', '* [ ] I chose one primary path for the next 90 days
* [ ] I wrote my 90-day commitment sentence
* [ ] I picked one traffic source to start with
* [ ] I picked one offer type or monetization direction
* [ ] I completed the shiny object audit
* [ ] I wrote down the module order I am following
* [ ] I bookmarked the Start Here module so I can return when I feel scattered

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 0, 'Module Map — Why This Matters', '## Why this module matters
This is where you stop looking like a random person online and start setting up a real operating base: domain, professional email, Cloudflare, GitHub, Canva, AI tools, n8n, and email platform.

## Quick win
By the end, you should have a professional email and the core accounts needed to build the rest of the system.

## What this unlocks next
Once your base stack exists, you can build the funnel in Module 2 without stopping every five minutes to create another account.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 0, 'Module Map — Why This Matters', '## Why this module matters
Traffic without a funnel is wasted attention. This module gives your content and DMs somewhere to send people.

## Quick win
Get a simple opt-in page and thank-you page live. Ugly and live beats perfect and imaginary.

## What this unlocks next
Once the funnel exists, Module 3 connects the email system so visitors can become subscribers.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 0, 'Module Map — Why This Matters', '## Why this module matters
An email list turns one-time visitors into people you can follow up with. This is where your business stops depending only on algorithms.

## Quick win
Get one welcome sequence written and tested. Even a rough sequence is better than silence after someone opts in.

## What this unlocks next
Once your email system works, Module 4 adds tracking, alerts, and automation so the business becomes easier to monitor.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 0, 'Module Map — Why This Matters', '## Why this module matters
Manual work kills momentum. This module makes the system log leads, alert you, and organize activity without you checking everything manually.

## Quick win
Submit a test lead and watch it hit your sheet and phone. That moment proves the machine is alive.

## What this unlocks next
Once the machine tracks activity, Module 5 and Module 6 focus on sending the right traffic and content into it.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-5-the-traffic-system', 0, 'Module Map — Why This Matters', '## Why this module matters
A funnel with no traffic is a machine sitting in the garage. This module gets the right eyeballs moving toward your system.

## Quick win
Pick one platform and publish your first batch. Do not try to dominate every platform at once.

## What this unlocks next
Traffic creates data. Module 6 turns that traffic effort into a repeatable content machine instead of random posting.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 0, 'Module Map — Why This Matters', '## Why this module matters
Content is the front door. This module stops you from waking up every day wondering what to post.

## Quick win
Build your content matrix and first 30-day calendar. Once the matrix exists, ideas are generated instead of guessed.

## What this unlocks next
Content creates comments, replies, and DMs. Module 7 shows you how to turn those conversations into leads and sales without acting weird.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 0, 'Module Map — Why This Matters', '## Why this module matters
The money is usually closer to the conversation than the content. DMs help you understand what people actually need and guide them to the right next step.

## Quick win
Save three message templates in your own voice and use them in real conversations.

## What this unlocks next
Once you can have real conversations, Module 8 helps you choose offers worth recommending.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 0, 'Module Map — Why This Matters', '## Why this module matters
The system needs fuel. This module helps you choose offers that fit your audience, your stage, and your ethics.

## Quick win
Run one offer through the 10-minute evaluation system before promoting it.

## What this unlocks next
Once the offer is chosen, Module 9 gives you the promotion campaign structure to sell it properly.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-9-the-promotion-system', 0, 'Module Map — Why This Matters', '## Why this module matters
Posting randomly is not a promotion. This module turns content, email, and DMs into a coordinated campaign.

## Quick win
Choose one offer and one promotion flow. Do not promote five things at once.

## What this unlocks next
Once you run a campaign, Module 10 helps you decide whether to scale affiliate offers, build your own product, or package services.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 0, 'Module Map — Why This Matters', '## Why this module matters
This is where the Vault becomes a 90-day operating plan instead of a course you finished.

## Quick win
Choose Path A or Path B and write the next 90 days on a calendar.

## What this unlocks next
You leave with a build direction: promote better, create your own product, package a service, or combine paths over time.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 1, 'You Made It Here', 'If you''ve worked through every module in The Kraken Vault, here''s what exists right now:

You have a domain. A professional email. A free tool stack that most people pay hundreds of dollars a month for. A live funnel collecting email subscribers. An automated welcome sequence that runs 24/7. A tracking system that reports your metrics automatically. A content machine with 30 days of planned posts. An offer you''ve evaluated properly. A promotion plan you''ve already run or are ready to run.

That''s a real business infrastructure. Not a course you watched and didn''t implement. Not a bunch of notes in a folder. A live system that does things whether you''re working or not.

Module 10 is where we take everything you''ve built and map it to the next 90 days — specifically along one of two build paths.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 2, 'The Two Paths at Scale', '---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 3, 'Path A: Build Your Own System or Product', '**What this means:** You transition from promoting other people''s offers to creating your own — your own course, your own digital product, your own SaaS tool, your own service package, your own templates.

This is the highest long-term leverage move. When you sell someone else''s product, you earn a commission. When you sell your own product, you earn everything. You also control the pricing, the customer experience, the affiliate program (now you''re the one paying commissions to others), and the brand.

**Signs you''re ready for Path A:**

* You''ve been promoting affiliate offers for at least 60 days and have a real sense of what your audience responds to  
* You have an email list of at least 100–200 engaged subscribers  
* People ask you the same questions repeatedly — those repeated questions are your product  
* You have a skill or process that you''ve built and refined that others would genuinely benefit from

**What to build first:**

Don''t build a 10-module course as your first product. Build something small, specific, and immediately useful. The product you''re most qualified to create right now is the thing you just learned that you wish you''d known earlier.

**Product idea framework:**

Take the most common question you get from your audience. Take your honest answer to that question. Package the answer in a format that can be used without you present.

Examples based on paths in this course:

* You mastered the Cloudflare \+ GitHub deployment process → "The 30-Minute Deal Site Setup Guide" (a step-by-step PDF \+ video walkthrough) — $17–27  
* You built a working n8n automation system → "The Affiliate Automation Starter Pack" (5 pre-built n8n workflows \+ setup video) — $37–47  
* You got your first B2B client using the DM framework → "The Local Business DM Playbook" (templates \+ the framework) — $27–47  
* You have 6 months of Amazon affiliate data → "My First 6 Months Amazon Affiliate — What Actually Happened" (transparent income report \+ what I''d do differently) — lead magnet or $7–17

**Pricing for your first product:**

Your first product should be priced between $17 and $47. This is the impulse purchase range — low enough to buy without much deliberation, high enough to attract buyers who are serious rather than freebie-seekers.

Don''t start at $197 or $297. Build a buying relationship with your audience through a low-priced entry product first. Once they''ve bought from you and gotten real value, they''re significantly more likely to buy your next, higher-priced offer.

---

### **Launching Your First Product — The Step-by-Step**

**Step 1: Define the product exactly** Write one sentence: "This product helps \[specific person\] achieve \[specific result\] by \[specific mechanism\]."

If you can''t write that sentence cleanly, the product isn''t defined enough yet.

**Step 2: Validate before you create** Before spending 40 hours building something, make sure people will pay for it.

Validation method: Write a short email to your list describing the product and asking "would you be interested in this? Reply and let me know." If more than 5–10% of your list replies positively, it''s worth building. If you get one reply, reconsider the angle.

Faster validation: Post a piece of content describing the outcome of the product (not the product itself). See how it performs. Strong engagement \= real interest.

**Step 3: Build the minimum viable version** Not the perfect version. The version that delivers the core result. You can improve it after the first sales. The first version of this course was probably not what you''re reading now — it got better with feedback and experience.

Tools for building digital products:

* PDF guide: Canva → export as PDF  
* Video course: record with Loom (free) or OBS (free), host on Gumroad or ThriveCart  
* Template pack: Google Sheets/Docs templates shared via Google Drive  
* App or tool: the Cloudflare \+ GitHub stack you already know

**Step 4: Set up your sales page** Use your Cloudflare Pages skills from Module 2\. Or use DashNex.

**Affiliate note:** 👉 [**DashNex for selling your own products — \[YOUR DASHNEX AFFILIATE LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

The sales page needs:

* A headline that states the result the buyer gets  
* 3–5 bullet points of what''s included  
* Social proof (even one genuine testimonial from a beta tester)  
* The price and a buy button  
* A FAQ section addressing the top 3 objections  
* A money-back guarantee (even a simple "if you buy and genuinely find no value, email me within 7 days and I''ll refund you" — this removes buying friction dramatically)

**Step 5: Set up payment processing**

* **Gumroad** (free to start, takes 10% \+ $0.50 per sale): easiest setup, great for early products  
* **Stripe \+ your own checkout**: lower fees, more control, slightly more technical setup  
* **ThriveCart** (one-time fee \~$495): full featured, excellent if you''re building long-term

**Affiliate note:** 👉 [**Gumroad — start selling your first product today**](https://gumroad.com/)

**Step 6: Launch to your list first** Your email subscribers are your warmest possible audience. Before you do any public promotion, send your list a "founding member" offer — the product at a discounted price (or with a bonus) available for 48–72 hours because they were there from the beginning.

This rewards your early subscribers, generates your first sales, and gets you early feedback before you promote publicly.

**Step 7: Add an affiliate program (eventually)** Once your product is proven and you have happy buyers, set up an affiliate program and let your buyers promote for you in exchange for a commission. This is how you turn customers into your salesforce.

Tools for running your own affiliate program:

* Gumroad has built-in affiliate functionality  
* Rewardful (\~$49/month) — integrates with Stripe  
* ThriveCart includes affiliate management

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 4, 'Path B: Resell and Promote Offers Properly', '**What this means:** You build the audience, the funnel, the email list, and the promotion machine — and you fill it with other people''s proven products rather than creating your own. You''re the media company, not the product company.

This is a completely legitimate and potentially very profitable long-term model. Some of the largest affiliate marketing businesses in the world have never created a single product. They''re audience builders and promotion specialists.

**Signs Path B is right for you:**

* You love the content, audience, and promotion side but don''t want to deal with product creation, customer support, or product development  
* You want to stay leaner — fewer moving parts, less overhead  
* You prefer to test multiple offer categories and niches rather than going deep on one  
* Your income goal for the next 12 months is achievable with affiliate commissions alone

**The professional affiliate operator model:**

This is what separates a hobbyist affiliate from a professional one. Hobbyists post links and hope. Professionals build assets.

Your assets:

1. An email list that grows consistently  
2. A deal site or content hub with SEO value  
3. A Telegram channel with subscribers  
4. A YouTube channel with tutorials that generate passive traffic  
5. An automation system that distributes content and tracks performance

Each of these assets generates traffic to your affiliate offers independently. The email list works while your content isn''t going out. The deal site works while you sleep. The YouTube tutorials keep generating views years after you made them.

**The offer rotation strategy:**

Professional affiliates don''t stick to one offer forever. They rotate based on what''s performing, what their audience needs at different stages, and what new products come to market.

Your offer rotation schedule:

* Always on: Amazon affiliate (deal site \+ deal content — evergreen)  
* Quarterly rotation: One major digital product or course promotion per quarter  
* Ongoing: SaaS tool affiliates (these run all the time through tutorial content)  
* Seasonal: Any offer with strong seasonal demand (tax tools in January, fitness products in January, back-to-school, Black Friday)

**Building your media business:**

At scale, Path B looks like this:

* Your deal site is an SEO asset generating 10,000+ visits/month  
* Your email list has 2,000+ subscribers getting weekly deal digests and monthly promotions  
* Your Telegram channel has 500–1,000 deal subscribers  
* Your TikTok/Instagram generates 50–100 new opt-ins per week organically  
* Your automation stack runs all of it with 3–5 hours of your actual time per week

At that point, you can:

* Sell the whole operation (content businesses sell for 24–36x monthly revenue)  
* License your system to others (teaching what you built — which is exactly what The Kraken Vault is)  
* Add Path A on top by creating products for your established audience

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 5, 'The 90-Day Roadmap — Path A', '**Days 1–30: Validate and Build**

* Pick your first product based on the question framework above  
* Validate with your list before building  
* Build the minimum viable version  
* Set up sales page and payment processing  
* Price test with founding member offer to your list

**Days 31–60: Promote and Refine**

* Collect feedback from first buyers  
* Improve the product based on feedback  
* Run your first full promotion campaign using the Module 9 framework  
* Set up a basic affiliate program and recruit 2–3 affiliates from your happy buyers

**Days 61–90: Scale and Add**

* Analyze what content and promotion channels drove the most sales  
* Double down on what worked  
* Start planning your second product (typically a higher-priced expansion of the first)  
* Explore paid traffic to proven funnel \+ product combination

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 6, 'The 90-Day Roadmap — Path B', '**Days 1–30: Systematize What You Have**

* Ensure all four automation workflows from Module 4 are running  
* Consistency check: are you posting content on schedule?  
* List growth rate: are you adding subscribers every week?  
* Identify your top 3 performing offers so far

**Days 31–60: Add the Deal Site Layer**

* Deal site fully built and automated (Module 2 supplementary guide)  
* Price watch list with 50+ products active  
* Telegram channel launched and growing  
* First SaaS tutorial content published on YouTube

**Days 61–90: The Audience Growth Push**

* Start putting $5–10/day behind your best-performing organic content (Meta ads, Module 5\)  
* Target: 2x your current weekly opt-in rate  
* Add one new affiliate offer per month from the Offer Vault  
* Set up your quarterly digital product promotion campaign

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 7, 'The LLC Conversation — Now It''s Time', 'Remember in Module 1a when we said skip the LLC for now? If you''ve made it here and you''re generating consistent income — it''s time to revisit.

**When to form an LLC:**

* You''re making $500+/month consistently  
* You''re entering into contracts with clients  
* You want to open a dedicated business bank account  
* You''re dealing with inventory or physical products

**How to form one:**

* LegalZoom or ZenBusiness: \~$50–150 \+ your state''s filing fee  
* Many states can be done entirely online in under an hour  
* Talk to a CPA or accountant once you''re profitable — the tax structure matters and the right guidance pays for itself

**What to do with your business once it''s formed:**

* Open a dedicated business checking account (keeps your finances clean for taxes)  
* Separate your business expenses from personal from day one  
* Set aside 25–30% of every dollar earned for taxes (self-employment taxes are real — don''t get surprised)  
* Talk to an accountant about what''s deductible: your domain, your hosting, your tools, your home office percentage, your phone if it''s used for business, your courses

This is not tax advice — it''s a flag that these conversations matter once you''re making real money, and the earlier you get organized, the less painful tax season is.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 8, 'Module 10 Action Checklist', '**Path A:**

* \[ \] First product defined (one sentence: who it''s for, what result, what mechanism)  
* \[ \] Validated with your list before building  
* \[ \] Minimum viable version built  
* \[ \] Sales page live  
* \[ \] Payment processing set up  
* \[ \] Founding member launch email sent to list  
* \[ \] First sales made and feedback collected

**Path B:**

* \[ \] All 4 automation workflows running without errors  
* \[ \] Content posting on consistent schedule  
* \[ \] Deal site live and automated  
* \[ \] Telegram channel launched  
* \[ \] First SaaS tutorial content published  
* \[ \] Paid traffic testing started

**Both paths:**

* \[ \] 90-day roadmap written and dated  
* \[ \] Weekly review scheduled (30 minutes every Sunday — check numbers, plan next week)  
* \[ \] LLC formation evaluated (if income is consistent)  
* \[ \] Accountant or CPA consultation booked (if earning consistently)

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 9, 'The End of the Beginning', 'You''ve now gone through the complete Kraken Vault system.

You started where most people start — skeptical, overwhelmed, tired of being lied to by ads that promised everything and delivered nothing. You made it through ten modules of actual how-to, with every step spelled out, every tool listed, every affiliate opportunity called out transparently.

But here''s the truth about where you are right now: information is not the same as execution. You can know everything in this course and still make nothing if the files just sit in a folder on your computer.

The people who make money from systems like this are not the smartest ones. They''re not the ones with the best niche or the prettiest website. They''re the ones who started, kept going when the early results were small, and didn''t quit when the algorithm had a bad week or the first promotion flopped.

Every person who built something real online went through the same early stretch — posting content nobody saw, sending emails nobody opened, running promotions that made $12. The ones who kept going are the ones you see now making it look effortless.

It was never effortless. It was just consistent.

You''ve got the system now. The rest is showing up.

---

*The Kraken Vault — Crack the Code to Generating Income Online* *Modules 9 and 10 of 10 — Course Complete*

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 10, 'Appendix A: Affiliate Disclosure Template', 'Required by FTC guidelines for all promotional content. Use this or a variation of it anywhere you include affiliate links:

*"This \[post / email / video / page\] contains affiliate links. If you click a link and make a purchase, I may earn a commission at no additional cost to you. I only recommend products and tools I genuinely believe in and either use myself or have thoroughly evaluated. Your trust means more to me than any commission."*

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 11, 'Appendix B: Your Full Affiliate Opportunity Reference', 'Every affiliate program mentioned throughout The Kraken Vault:

| Tool | What it is | Commission | Your link |
| ----- | ----- | ----- | ----- |
| Namecheap | Domain registrar | Up to 20% | \[YOUR LINK\] |
| Google Workspace | Professional email \+ Google suite | 10% first year | \[YOUR LINK\] |
| Canva Pro | Design tool | Up to $36/referral | \[YOUR LINK\] |
| MailerLite | Email marketing platform | 30% recurring | \[YOUR LINK\] |
| EmailOctopus | Email marketing platform | 20% recurring | \[YOUR LINK\] |
| DashNex | Website/funnel builder | Your rate | \[YOUR LINK\] |
| Render | n8n cloud hosting | Credit per referral | \[YOUR LINK\] |
| Anytime Mailbox | Virtual business address | 20% recurring | \[YOUR LINK\] |
| Submagic | Video caption tool | 20% recurring | \[YOUR LINK\] |
| Helium 10 | Amazon seller tools | 25% recurring | \[YOUR LINK\] |
| Calendly | Meeting scheduling | Referral credit | \[YOUR LINK\] |
| Gumroad | Digital product selling | None (recommend anyway) | \[YOUR LINK\] |

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-10-build-paths', 12, 'Appendix C: The Quick Start Path — For People Who Want to Move Faster', 'If you''ve read all 10 modules and want the shortest path to your first dollar, here''s the sequence stripped down to essentials:

**Day 1:** Buy domain, set up Cloudflare, create GitHub account, sign up for MailerLite

**Day 2:** Sign up for Amazon Associates. Create your opt-in page using the AI prompt from Module 2\.

**Day 3:** Write your 5-email welcome sequence using the AI prompt from Module 3\. Connect your opt-in form to MailerLite.

**Day 4:** Create your lead magnet PDF in Canva. Upload it. Link it in Email 1\.

**Day 5:** Create your TikTok account. Post your first video using a hook from Module 5''s hook library. Put your opt-in page link in your bio.

**Day 6:** Post your second video. Import Workflow 1 from Module 4 (subscriber logger). Check your n8n dashboard.

**Day 7:** Post your third video. Check if you have subscribers. If yes: you have a functioning system.

**Day 8–30:** Keep posting. 5 videos per week. Rotate through the four content buckets. Watch your subscriber count. Make your first Amazon affiliate link placement.

**Day 31:** Run your first email-to-offer campaign using the Module 9 Flow A structure.

That''s it. No LLC. No perfect website. No 10,000 followers. Just a system, started, running.

---

*The Kraken Vault — Course Complete* *krakenvault.com*');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 1, 'Before You Read Anything Else', 'Let me tell you exactly what this is and what it isn''t.

This is not a course that''s going to hype you up for 45 minutes and then tell you that the "real system" is locked behind a $497 upgrade. You already know that game. You''ve probably already paid for it at least once. That''s exactly why The Kraken Vault exists.

I''m Matt. I''ve spent 17-plus years managing grocery stores for a living — early mornings, late nights, dealing with everything that comes with running a physical retail operation while watching people online claim they made $10,000 in a week posting from their couch. Some of them are full of it. But some of them aren''t. And after years of clicking on the wrong ads and wasting weekends going down rabbit holes, I finally figured out what the ones who actually make money are doing differently.

They have a system. And they stuck with it.

That''s what this is. A system. Built for people who are tired, busy, skeptical, and don''t have thousands of dollars to throw at courses that tell you to "just be consistent" without ever explaining what that actually means.

Every tool in this module is free or nearly free. Every step is written so that if you''ve never done any of this before, you can still follow it. If you already know some of this stuff, there''s a skip-ahead guide at the top of each section.

Let''s get into it.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 2, ' Already Have Some of This?', 'Check what you''ve already got and jump ahead:

* **Already have a domain?** Skip to Section 2 — Professional Email  
* **Already have a domain and professional email?** Skip to Section 3 — The Free Tool Stack  
* **Just want the AI breakdown?** Jump to Section 4  
* **Ready to sign up for an email platform?** Jump to Section 5

If you''re starting from zero, read everything in order. Don''t skip. Each piece connects to the next.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 3, 'Section 1: Your Domain — Your Address on the Internet', '### **What a domain actually is (and why you need one)**

Your domain is your address online. It''s the thing people type into a browser to find you — like `yourbusiness.com`. Without one, you don''t have a home base. You''re just renting space on someone else''s platform, and they can shut you down, change the rules, or cut your reach any time they want.

A domain costs between $8 and $15 a year. That''s the single cheapest professional move you can make.

### **What to look for in a domain name**

Before you go buy one, think about this for five minutes. A good domain name is:

* **Short** — the fewer letters the better. Nobody types a 40-character URL.  
* **Easy to spell** — if you have to explain how to spell it, it''s the wrong name.  
* **Memorable** — say it out loud. Would someone remember it the next day?  
* **Relevant** — ideally hints at what you do or who you''re talking to.

You don''t need it to be perfect. Done beats perfect every time. If your first choice is taken, add a word, swap `.com` for `.co`, or rethink the angle. Don''t spend more than 20 minutes on this.

**Examples of good domain thinking:**

* Targeting deal hunters? Something like `weeklydealhub.com` or `snapdeals.co`  
* Building a personal brand? `yourname.com` or `yournamebuilds.com`  
* Local business marketing services? `[yourcity]leads.com`

### **How to buy your domain — step by step**

There are dozens of domain registrars out there. I recommend **Namecheap** for beginners. It''s cheap (obviously), the interface is clean, they include free WHOIS privacy protection (which hides your personal info from public record — other registrars charge for this), and they don''t pull bait-and-switch renewal pricing.

**Affiliate note:** If you use the link below to sign up with Namecheap, I earn a small commission at no extra cost to you. It''s one of the ways The Kraken Vault stays running. I only recommend tools I actually use or would use. 👉 [**Get your domain on Namecheap — \[YOUR NAMECHEAP AFFILIATE LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

**Step 1:** Go to [namecheap.com](https://namecheap.com/) (or use the affiliate link above)

**Step 2:** Type your domain idea into the search bar at the top of the page and press Enter

**Step 3:** Look at the results. If your `.com` is available, great — grab it. If not, Namecheap will show you alternatives. A `.com` is still the gold standard, but `.co` and `.io` are increasingly common and totally acceptable.

**Step 4:** Click "Add to Cart" on the domain you want

**Step 5:** On the cart page, you''ll see upsell offers for things like hosting and SSL certificates. You don''t need these from Namecheap. Skip them. We''re using Cloudflare for all of that (it''s free).

**Step 6:** Create your Namecheap account using your real email address. Use a strong password and save it somewhere safe — a password manager like Bitwarden (free) works great.

**Step 7:** Check out. You can pay with a card or PayPal. The domain is yours for one year. Set a calendar reminder 11 months from now to renew it.

**That''s it.** You now own a piece of the internet.

---

**Cloudflare Registrar — the at-cost alternative**

Once you set up Cloudflare (Section 3), you can actually transfer your domain there and renew it at cost — meaning no markup, just the raw wholesale price ICANN charges. For a `.com` that''s about $9.15/year instead of the typical $12–14. Not a huge deal, but worth knowing. We''ll cover this in the Cloudflare setup.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 4, 'Section 2: Professional Email — Stop Using Gmail for Business', '### **Why this matters more than you think**

If you''re promoting anything, selling anything, or reaching out to anyone as a business, your email address is the first thing people see. `crackincome@gmail.com` tells people you''re a hobbyist. `matt@krakenvault.com` tells people you''re a professional.

The good news: you can get a professional email address on your custom domain for free with Zoho Mail, or for about $6/month with Google Workspace (formerly G Suite). We''ll cover both.

### **Option A: Zoho Mail — Free (Recommended for Beginners)**

Zoho offers a genuinely free plan for up to one custom email address. No credit card required. It''s not as polished as Gmail but it works fine and it costs nothing.

**Step 1:** Go to [zoho.com/mail](https://zoho.com/mail) and click "Get Started" under the Forever Free plan

**Step 2:** Click "Sign up with custom domain" and enter the domain you just bought (e.g., `krakenvault.com`)

**Step 3:** Create your Zoho account — use your personal email to sign up, then you''ll create your business email (e.g., `matt@krakenvault.com`) inside the account

**Step 4:** Zoho will ask you to verify that you own your domain. This is where it gets slightly technical, but don''t panic — it just involves adding a small piece of text (called a TXT record) to your domain''s DNS settings. Here''s how:

* Zoho will give you a code that looks something like: `zoho-verification=abc123def456`  
* Open a new browser tab and go to your Namecheap account  
* Go to your domain list and click "Manage" next to your domain  
* Click the "Advanced DNS" tab  
* Click "Add New Record"  
* Set Record Type to "TXT Record"  
* Set Host to "@"  
* Paste the Zoho verification code into the Value field  
* Click the checkmark to save  
* Go back to Zoho and click "Verify"

It can take a few minutes for the verification to process. If it doesn''t work immediately, wait 5 minutes and try again.

**Step 5:** Once verified, Zoho will walk you through setting up your MX records — these are what tell the internet to route emails to your domain through Zoho. Follow Zoho''s instructions exactly. You''ll add 3–4 more records to your Namecheap DNS settings using the same "Advanced DNS" tab.

**Step 6:** Create your email address — something like `hello@yourdomain.com`, `matt@yourdomain.com`, or `support@yourdomain.com`. Whatever feels right for your brand.

**Step 7:** Log into your new Zoho inbox and send yourself a test email from your personal account to confirm everything is working.

Done. You now have a professional business email address.

---

### **Option B: Google Workspace — \~$6/Month (If You Live in Google Products)**

If you use Google Docs, Google Drive, and Google Calendar constantly anyway, Google Workspace might be worth the $6/month. You get Gmail with your custom domain, plus the full Google productivity suite with shared drives and better collaboration tools.

**Affiliate note:** Google Workspace has a referral program. You can get 10% off your first year through this link, and I earn a small credit when you sign up: 👉 [**Google Workspace — \[YOUR GOOGLE WORKSPACE REFERRAL LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

**Step 1:** Go to [workspace.google.com](https://workspace.google.com/) and click "Get Started"

**Step 2:** Enter your domain name when prompted (e.g., `krakenvault.com`)

**Step 3:** Follow the setup wizard — it''s more guided than Zoho and Google walks you through the DNS verification step by step

**Step 4:** Add billing and select the Business Starter plan ($6/month per user — you only need one user to start)

**Step 5:** Google will give you a verification code to add to your domain DNS settings — same process as Zoho above (Namecheap → Advanced DNS → Add TXT Record)

**Step 6:** Once verified, you can create your Gmail-powered custom email address

The main honest tradeoff: Zoho is free but lighter. Google Workspace is $72/year but feels exactly like Gmail and plugs into everything Google. If budget is tight, start with Zoho. You can always switch.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 5, 'Section 3: The Free Tool Stack — Everything You Need, Almost Nothing You Pay For', 'Here''s every tool you need to run a real online business operation. I''m going to tell you exactly what each one does, why it''s on the list, and how to get it.

### **Cloudflare — Your Free Website Host, Domain Protector, and Speed Layer**

**What it is:** Cloudflare is one of the most powerful free tools on the internet and almost nobody outside of tech circles talks about it. It''s a content delivery network, a DNS manager, a website host (via Cloudflare Pages), a serverless backend (via Cloudflare Workers), and a database (via Cloudflare D1) — all in one, all free at the starter level.

**What you''ll use it for:** Hosting your website or deal site for free, routing your domain, protecting your site, and later in this course, running automations and backend logic without paying for a server.

**How to sign up:**

**Step 1:** Go to [cloudflare.com](https://cloudflare.com/) and click "Sign Up"

**Step 2:** Create an account with your new professional email address

**Step 3:** Click "Add a Site" and enter your domain name

**Step 4:** Cloudflare will scan your existing DNS records — this takes about a minute

**Step 5:** Select the Free plan (it''s the first option and it''s genuinely excellent — you don''t need to upgrade)

**Step 6:** Cloudflare will give you two nameserver addresses (they look something like `aria.ns.cloudflare.com`). You need to copy these.

**Step 7:** Go back to your Namecheap account → Manage your domain → click "Domain" tab → find "Nameservers" → switch from "Namecheap BasicDNS" to "Custom DNS" → paste both Cloudflare nameservers in

**Step 8:** Save the changes in Namecheap, then go back to Cloudflare and click "Done, check nameservers"

This process can take anywhere from 5 minutes to 24 hours to fully propagate. Cloudflare will email you when it''s active. While you wait, move on to the next tool.

Cloudflare''s free tier is so powerful we''re going to use it throughout this entire course — for your funnel, your deal site, your automations, and more. We''ll go deep on it in Module 2\.

---

### **GitHub — Free Code Storage and Website Deployment**

**What it is:** GitHub is where your website code lives. Think of it like Google Drive but specifically for website files. You don''t need to know how to code to use it in this course — we''re going to use AI to write the code for us. GitHub just stores it and connects it to Cloudflare so your site goes live.

**How to sign up:**

**Step 1:** Go to [github.com](https://github.com/) and click "Sign up"

**Step 2:** Create an account — use your professional email

**Step 3:** Choose the Free plan (it gives you unlimited public and private repositories)

**Step 4:** Verify your email address when GitHub sends you the confirmation

That''s it for now. We''ll use GitHub properly when we build your funnel in Module 2\.

---

### **Canva — Free Design Tool for Everything Visual**

**What it is:** Canva is a drag-and-drop design tool that lets you create social media posts, thumbnails, lead magnets, ad graphics, email headers, and more — no design experience needed. The free version is genuinely powerful and covers everything a beginner needs.

**How to sign up:**

**Step 1:** Go to [canva.com](https://canva.com/) and click "Sign up for free"

**Step 2:** Sign up with your Google account or your professional email

**Step 3:** When it asks what you''ll use Canva for, select "Personal" or "Small Business" — doesn''t matter much at this stage

The free version gives you access to thousands of templates, millions of images, and all the core design tools. Canva Pro ($13/month or \~$120/year) adds access to premium templates, a background remover, and a Brand Kit. You don''t need it to start. If you find yourself wanting those features later, it''s worth it.

**Affiliate note:** If you decide to upgrade to Canva Pro, you can get a 30-day free trial through this link: 👉 [**Try Canva Pro Free for 30 Days — \[YOUR CANVA AFFILIATE LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

---

### **n8n — Free Automation Without the Monthly Fee**

**What it is:** n8n is an automation tool — think of it like Zapier or Make, except you can run it yourself for free instead of paying $50–200/month for a subscription. It connects apps together and automates tasks so you don''t have to do them manually.

For example: someone fills out your opt-in form → n8n automatically adds them to your email list → sends you a notification → logs their details in a spreadsheet. All without you touching anything.

**The honest heads-up:** n8n has a bit more of a learning curve than Zapier. We cover it in depth in Module 4 — Automation. For now, just get the account.

**Option A: n8n.io Cloud — Free Trial, Then \~$20/Month**

**Step 1:** Go to [n8n.io](https://n8n.io/) and click "Start for free"

**Step 2:** Sign up with your email — you get a 14-day free trial of the cloud version

After the trial, n8n Cloud costs money. Which brings us to the better option for this course:

**Option B: Host n8n Yourself for Free or Near-Free (Recommended)**

This is the move. You can run n8n completely free on your own computer (good for learning and testing) or for almost nothing on a service called Render.

**Running n8n locally (free, on your computer):**

This is great for learning n8n without spending anything. The catch is it only works when your computer is on. Good for testing, not for running live automations 24/7.

**Step 1:** Go to [docs.n8n.io](https://docs.n8n.io/) and follow the "npm" installation guide **Step 2:** You''ll need Node.js installed first — go to [nodejs.org](https://nodejs.org/) and download the LTS version **Step 3:** Once Node.js is installed, open your computer''s terminal (search "Terminal" on Mac or "Command Prompt" on Windows) and type: `npm install n8n -g` and press Enter **Step 4:** Once installed, type `n8n` and press Enter. Open a browser and go to `http://localhost:5678` — that''s your n8n dashboard

**Running n8n on Render (near-free, runs 24/7):**

Render is a cloud platform that can host n8n for about $7/month — or free if your workflows don''t run constantly.

**Affiliate note:** Render has a referral program. Sign up through the link below and get credit toward your first month: 👉 [**Host n8n on Render — \[YOUR RENDER AFFILIATE LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

**Step 1:** Go to [render.com](https://render.com/) and create a free account **Step 2:** Search for n8n''s official Render deployment template — go to [n8n.io/n8n-on-render](https://docs.n8n.io/hosting/installation/server-setups/render/) and follow the one-click deploy guide **Step 3:** Render will ask you to connect your GitHub account to store the deployment — connect it **Step 4:** Deploy the service — Render will build and start n8n automatically **Step 5:** Once it''s live, Render gives you a URL (something like `your-n8n.onrender.com`) — that''s your n8n dashboard, accessible from anywhere

We go deep on n8n in Module 4\. For now, just know where it lives.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 6, 'Section 4: The AI Breakdown — The Real Talk', 'This is the section I wish someone had written for me two years ago. There are so many AI tools right now that it''s genuinely confusing to know which one to use for what. Here''s the honest breakdown.

### **The Big Players and What They''re Actually Good At**

---

**Google AI Studio \+ Gemini — The Free Workhorse**

**What it is:** Google AI Studio is Google''s developer-facing AI platform where you can build AI-powered apps for free using their Gemini models. It''s separate from the regular Gemini chat interface (gemini.google.com) but uses the same underlying technology.

**Why it matters for you:** Google AI Studio has one of the most generous free tiers of any serious AI platform. You can build real apps, generate content, and run complex tasks completely free — with high usage limits. For building tools and automations, this is often the first place to go.

**Best for:**

* Building AI-powered apps and tools (this is what we use in the YouTube channel for building apps that deploy to Cloudflare)  
* Long documents — Gemini handles huge amounts of text at once  
* Google product integration (Docs, Sheets, Gmail)  
* Free high-volume usage

**Weaknesses:**

* Can feel less "human" in creative writing compared to Claude  
* Slightly weaker at nuanced reasoning than Claude Opus

**How to access:**

* Regular Gemini chat: [gemini.google.com](https://gemini.google.com/) — free with a Google account  
* Google AI Studio (for building): [aistudio.google.com](https://aistudio.google.com/) — free with a Google account

---

**ChatGPT — The Household Name**

**What it is:** OpenAI''s ChatGPT is the one that started the mainstream AI conversation. GPT-4o (the current model) is genuinely excellent across most tasks.

**Best for:**

* Writing and creative content — still very strong here  
* Brainstorming — great at generating lots of ideas fast  
* General research and summarizing  
* Image generation (DALL-E is built in)  
* The widest range of GPT-powered plugins and integrations

**Weaknesses:**

* Free tier (GPT-4o) has usage limits that reset every few hours — you''ll hit them if you use it heavily  
* Sometimes confidently wrong (all AIs do this, but ChatGPT is infamous for it — always verify facts)  
* $20/month for ChatGPT Plus if you want consistent access

**How to access:**

* [chatgpt.com](https://chatgpt.com/) — free account gives you GPT-4o with usage limits

---

**Claude — The Reasoning and Writing Specialist**

**What it is:** Claude is made by Anthropic and is widely considered the best AI for tasks that require careful thinking, nuanced writing, long-form content, and understanding complex instructions. If you''ve read anything in this course and thought "this actually sounds like a real person wrote it" — that''s Claude.

**Best for:**

* Writing long, high-quality content (emails, course lessons, sales copy)  
* Complex reasoning and step-by-step problem solving  
* Following detailed, multi-part instructions without losing track  
* Coding — especially for beginners, because Claude explains what the code does  
* Reading and analyzing long documents

**Weaknesses:**

* No image generation  
* Free tier limits are real — you''ll hit them on heavy days  
* Claude.ai Pro is $20/month if you want consistent high-volume access

**How to access:**

* [claude.ai](https://claude.ai/) — free account gives you access to Claude Sonnet

---

**The Token Bounce Strategy — How to Use All of Them Free**

Here''s the system. Each AI has a free tier that resets daily or gives you a certain number of messages before it slows down or cuts you off. Instead of hitting one wall and stopping, you rotate.

Here''s the rotation:

1. **Start your session on Claude** — best for writing, reasoning, and following complex instructions. Use it for your main tasks first thing.

2. **When Claude slows down, switch to ChatGPT** — pick up where you left off. ChatGPT''s free tier also resets daily.

3. **For building and high-volume generation, use Google AI Studio** — the limits here are much higher and it''s completely free for the Gemini 1.5 Pro model at typical usage levels.

4. **Gemini (regular chat) as your fourth wheel** — good for quick lookups, summarizing, and anything Google-Workspace-adjacent.

**Pro tips for the bounce:**

* Copy your conversation context before switching. Paste it at the start of your next AI session with "Here''s what we''ve been working on:" so the new AI knows where you are.  
* Each AI has different strengths, so sometimes switching actually gives you a better answer, not just a continued one.  
* Keep a running text doc of your best prompts so you''re not rewriting the same instructions every time you start a new session.

**When to actually pay for one:**

Once you''re generating income and using AI daily, pay for Claude Pro or ChatGPT Plus — whichever one you use more. At $20/month each, paying for one is worth it. Paying for both is optional. Most people find one they prefer and stick with it.

If you''re building apps and tools, the first paid upgrade should be Claude Pro or Google AI Studio''s paid tier — both give you significantly higher limits for the kind of complex, multi-step tasks that come up when building real systems.

**The honest recommendation:** If you can only pay for one, start with Claude Pro. The quality and instruction-following on complex tasks is worth it when you''re building something real.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 7, 'Section 5: Email Marketing — Sign Up Now, Use Later', 'You''re going to need an email platform. We''re not setting up your email sequences today — that''s Module 3\. But you need the account now because some platforms require approval and setup time, and you don''t want to be held up when you''re ready to launch.

You have two solid free options:

### **MailerLite — Best Balance of Features and Free Tier**

MailerLite gives you up to 1,000 subscribers and 12,000 emails per month completely free. The interface is clean, it supports automation, landing pages, and pop-ups on the free plan, and the deliverability (meaning your emails actually land in the inbox instead of spam) is excellent.

**Affiliate note:** MailerLite has an affiliate program. If you sign up through the link below, I earn a commission at no extra cost to you: 👉 [**Sign up for MailerLite Free — \[YOUR MAILERLITE AFFILIATE LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

**Step 1:** Go to [mailerlite.com](https://mailerlite.com/) and click "Get started for free"

**Step 2:** Sign up with your professional email address (the one you just set up in Section 2\)

**Step 3:** Fill out your account details — MailerLite will ask about your business and what you''re sending. Be honest and accurate here. Email platforms take compliance seriously and accounts that seem sketchy get flagged.

**Step 4:** MailerLite requires account approval before you can send. This usually takes a few hours to a day. They''ll email you when you''re approved.

**Step 5:** Once approved, poke around the dashboard. Don''t set anything up yet — we do that in Module 3\.

---

### **EmailOctopus — The Simplest Free Option**

EmailOctopus is even simpler than MailerLite with a slightly larger free tier (2,500 subscribers, 10,000 emails/month). If you want the absolute minimum friction to get started, this is it.

**Affiliate note:** 👉 [**Sign up for EmailOctopus Free — \[YOUR EMAILOCTOPUS AFFILIATE LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

**Step 1:** Go to [emailoctopus.com](https://emailoctopus.com/) and click "Start for free" **Step 2:** Create an account with your professional email **Step 3:** No approval process needed — you can use it immediately

**Which one should you pick?**

If you want more automation features from day one: **MailerLite.** If you want the fastest, simplest setup and a larger free subscriber limit: **EmailOctopus.**

Either works. Pick one and don''t overthink it. You can always switch later — exporting and importing your list takes about 10 minutes.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 8, 'Section 6: The LLC Question — And Why You Don''t Need One Yet', 'Let me just answer this directly because it comes up constantly.

**You do not need to form an LLC to start making money online.**

An LLC (Limited Liability Company) is a legal business structure that separates your personal finances from your business finances and gives you some liability protection. It''s a legitimate thing and eventually you may want one. But it''s not what''s holding you back right now, and setting one up costs money and creates paperwork before you''ve made your first dollar.

Here''s the honest truth: most people who ask about forming an LLC before they''ve made any money are procrastinating. The LLC question feels productive because it''s something concrete you can research and do. But it delays the actual work.

**Do this instead:**

* Use your personal bank account to start — keep track of what comes in and what goes out  
* Get a simple free spreadsheet going to track income and expenses (we cover this in Module 4\)  
* Focus everything on making your first $500 before worrying about legal structure

**When you should actually look into an LLC:**

* When you''re making consistent income (a few hundred a month or more)  
* When you start dealing with clients, contracts, or larger transactions  
* When you want to open a dedicated business bank account (many banks require an LLC for a business account)

At that point, talk to an accountant or use a service like LegalZoom or ZenBusiness. But that''s a Module 10 conversation, not a Module 1 one.

---

**The one exception — retail arbitrage:** If you plan to buy products from retailers or wholesalers for resale, look into getting a **reseller''s permit** (also called a resale certificate or seller''s permit). This is different from an LLC — it''s a state-issued permit that lets you buy goods for resale without paying sales tax on them. It''s usually free to get through your state''s department of revenue or tax board and can save you real money if you''re buying inventory.

Search "\[your state\] reseller permit" to find your state''s specific process. It takes about 15–30 minutes to apply online in most states.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 9, 'Section 7: Your Module 1a Action Checklist', 'Go through this top to bottom. Every item checked is a real step toward having a professional, functional online business presence.

**Domain:**

* \[ \] Chose a domain name  
* \[ \] Purchased domain on Namecheap (or your preferred registrar)  
* \[ \] Calendar reminder set for renewal in 11 months

**Professional Email:**

* \[ \] Set up Zoho Mail (free) or Google Workspace (\~$6/month)  
* \[ \] Verified domain ownership in DNS settings  
* \[ \] Added MX records to DNS settings  
* \[ \] Sent a test email — confirmed it works

**Cloudflare:**

* \[ \] Created Cloudflare account  
* \[ \] Added domain to Cloudflare  
* \[ \] Updated nameservers in Namecheap to point to Cloudflare  
* \[ \] Received Cloudflare confirmation email that the site is active

**GitHub:**

* \[ \] Created GitHub account with professional email

**Canva:**

* \[ \] Created Canva account

**n8n:**

* \[ \] Decided on local install or Render hosting  
* \[ \] n8n is running and accessible

**AI Tools:**

* \[ \] Have a Google account (for AI Studio and Gemini)  
* \[ \] Created ChatGPT account at chatgpt.com  
* \[ \] Created Claude account at claude.ai  
* \[ \] Bookmarked aistudio.google.com

**Email Platform:**

* \[ \] Signed up for MailerLite or EmailOctopus with professional email  
* \[ \] Account approved and accessible

**Legal:**

* \[ \] Noted the LLC decision (revisit in Module 10\)  
* \[ \] Looked up your state''s reseller permit if considering arbitrage

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-1a-tools-stack-setup', 10, 'What''s Next', 'You''ve got the foundation. You have a domain. You have a professional email. You have a free stack of tools that most people pay hundreds of dollars a month for. And you understand the AI landscape well enough to work it instead of getting played by it.

**Module 1b is next: Pick Your Path.**

This is where you choose the income model that actually fits your life — not some guru''s fantasy lifestyle. We''ll go through every option with honest pros, cons, and what it realistically takes to get started. By the end of Module 1b you''ll have one clear direction and a roadmap for the modules that apply to your specific path.

See you there.

---

*The Kraken Vault — Crack the Code to Generating Income Online* *Module 1a of 10*

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 1, 'Build a Professional "App-Style" Funnel for Free', 'Most tools want to charge you $97–$297/month for funnel software. We''re going to build a full-stack application on Cloudflare for free. You get pro-level speed and reliability without the "guru" tax.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 2, 'Fast-Track — Already Have Some of This?', '* **Already have a GitHub repo and Cloudflare Pages set up?** Skip to Section 5 — The Build Prompt
* **Have a live site but no funnel structure?** Skip to Section 6 — Niche Templates
* **Just want the AI prompt to build the app shell?** Jump to Section 5

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 3, 'What a Funnel Actually Is (And Why You Need One)', 'Before we build anything, let''s make sure we agree on what a funnel is. Most people think it''s just a website. It isn''t. A website is a digital brochure; it''s a distraction machine with menus and "About Us" pages.

A funnel is a pathway. It''s a series of pages designed to move a stranger through a specific sequence:

* **Awareness:** They see your content.
* **Interest:** They land on a page offering a specific solution for free.
* **Trust:** They give you their email, get the solution, and meet you.
* **Action:** They are presented with an offer to solve their problem permanently.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 4, 'Section 1: Understanding the Three-Page Funnel', 'Every funnel in this course uses three core pages. Think of this as the "Kraken Standard."

### **Page 1: The Opt-In Page (The "Squeeze")**

* **What it does:** Converts visitors into email subscribers by offering a "Lead Magnet."
* **Key Rule:** No navigation menu. If they can click "Home" or "About," they won''t give you their email. One goal, one button.

### **Page 2: The Bridge Page (The "Handshake")**

* **What it does:** Sits between the opt-in and the offer. This is where you transition from "Freebie Giver" to "Trusted Advisor."
* **Why it matters:** People don''t buy from links; they buy from people. This page introduces you and your story.

### **Page 3: The Offer Page**

* **What it does:** Presents the final destination.
* For affiliate offers, this is usually a redirect to the vendor''s sales page. For your own services, this is your sales page.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 5, 'Section 2: The "App vs. Website" Concept', 'In Module 1a, we set up your domain. Now, instead of just hosting a "page," we are deploying a Codebase.

**Why an App?**

* **Speed:** Apps built with React/Vite load in milliseconds.
* **Backends:** Your app can have a "Worker" (a brain) that handles data, databases, and security.
* **Professionalism:** This is the tech stack used by actual software companies, not just "internet marketers."

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 6, 'Section 3: Getting Your Code From AI', 'We''re going to use AI to build the "House" (the App). In Module 3, we will install the "Plumbing" (the email form).

**Step 1:** Open your AI (Claude 3.5 Sonnet is highly recommended).

**Step 2:** Copy the **GitHub to CF Prompt** (attached to this lesson as a downloadable prompt).

**Step 3:** Fill in the `[SITE DEFINITION]` section with the niche-specific details from Section 5 of this module.

**Step 4: The Download:** Once the AI writes the code, ask it: *"Please provide the complete project as a downloadable ZIP file."*

**Step 5: The Extraction:** Download the ZIP and "Extract" (unzip) it on your computer.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 7, 'Section 4: Moving to GitHub & Cloudflare (The Launch)', '### **Step 1: Create Your GitHub Repository**

* Go to [github.com](https://github.com/) and create a new **Public** repository named `kraken-funnel`.
* Click the link "uploading an existing file."
* Drag and Drop every file and folder from your extracted ZIP into the GitHub window. Click **Commit Changes**.

### **Step 2: Launch the Frontend (The "Body")**

* Log into Cloudflare → **Workers & Pages** → **Create Application**.
* Click the link at the very bottom: *"Looking to deploy Pages? Get started."*
* Connect your GitHub repo.
* **Build Settings:** Cloudflare will detect this is a Vite project.
  * Framework Preset: **Vite**
  * Build Command: `npm run build`
  * Output Directory: `dist`
* Click **Save and Deploy**. Your site is now being built.

### **Step 3: Launch the Worker (The "Brain")**

* Go back to **Workers & Pages** → **Create Application**.
* This time, click **"Continue with GitHub"** (under Create a Worker).
* Select the same `kraken-funnel` repo.
* Click **Deploy**. Now your site has a backend to handle logic.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 8, 'Section 5: The Funnel Build Prompt (Niche Specifics)', 'When you use the Master Prompt, make sure your `[SITE DEFINITION]` includes these requirements for your specific path:

**For all paths, tell the AI:**
*"Include a Home page with a clear placeholder for an email opt-in form. Include a Thank You page that explains the free gift is on the way."*

**Specific niche instructions to add:**

* **Path 1 (Amazon Deal Hunter):** *"Style the site like a modern deal-finding hub. Use ''Hot Deals'' and ''Price Drop'' language. Color scheme: Navy and Orange."*
* **Path 2 (Digital Affiliate):** *"Focus on authority. Use a minimalist design with bold typography. The headline should be about ''The Hidden Strategy'' or ''The Kraken System''."*
* **Path 6 (B2B Local Marketing):** *"A professional agency-style landing page. Use a ''Free Digital Audit'' as the main offer. Use trust-building blues and grays."*

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 9, 'Section 6: Making Your Lead Magnet', 'The "Lead Magnet" is why they give you their email. Here is exactly how to make one in 30 minutes.

**The Strategy:** Solve one small, specific problem.

**Step 1:** Open Canva. Search for "Checklist" or "Report" templates.

**Step 2:** Use AI to write the content. *"Write 5 tips for [Your Niche] that most people get wrong."*

**Step 3:** Design it and export as a PDF.

**Step 4:** Upload the PDF to a public Google Drive link. We will use this link in Module 3 to deliver the gift.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 10, 'Section 7: The Paid Alternative — DashNex', 'If the GitHub/Cloudflare process feels too technical, there is a shortcut. **DashNex** is a website and funnel builder with a one-time fee. No monthly Shopify-style subscriptions. It''s drag-and-drop, no code required.

**The Tradeoff:** You pay upfront to save the time of the technical setup. Both end up in the same place: a live funnel collecting emails.

👉 Check out **DashNex** — [YOUR DASHNEX AFFILIATE LINK]

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 11, 'Section 8: Testing Your Funnel', 'Before you send a single visitor to your site, you must test it.

* **Load Speed:** Visit your site on your phone. It should be instant.
* **Mobile Design:** Ensure the buttons aren''t too small and text isn''t cut off.
* **The Forms:** In Module 3, we will connect the form "plumbing." Once that''s done, you''ll come back here and sign up yourself to make sure it works.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-2-the-funnel-system', 12, 'Section 9: Module 2 Action Checklist', '* AI Prompted for the full-stack App shell.
* ZIP Downloaded and extracted on your computer.
* Files Uploaded to a new GitHub repo.
* Cloudflare Pages Launched (The "Body").
* Cloudflare Worker Launched (The "Brain").
* Custom Domain Connected to the Pages project.
* Lead Magnet Created in Canva and uploaded to Google Drive.

---

**What''s Next:** Your funnel "House" is built. Module 3: The Email System is where we install the "Plumbing."');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 1, 'Set It Up Once, Let It Sell While You Sleep', 'Social media platforms change their algorithm and your reach drops 80% overnight. TikTok could get banned. Instagram can throttle your links. YouTube can demonetize you without warning.

**Your email list is the only thing no platform can take from you.**

When someone gives you their email, you have a direct line to their inbox. Across most industries, email generates between **$36 and $45 for every $1 spent** on it.

In Module 2, we built the "House" (your App). In this module, we are installing the "Plumbing."

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 2, 'Fast-Track — Already Have Some of This?', '* **Already have MailerLite or EmailOctopus verified?** Skip to Section 2 — The "Plumbing" (AI Injection)
* **Already have your form live on your site?** Skip to Section 3 — The Welcome Sequence
* **Just want the AI prompts to write your emails?** Jump to Section 4

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 3, 'Section 1: Platform Setup — MailerLite or EmailOctopus', 'You signed up for one of these in Module 1a. Now we configure them for the "Kraken" workflow.

### **The Deliverability "Must-Do" (Domain Verification)**

Before you send a single email, you must tell Gmail and Outlook that you are a "real" business.

* In MailerLite/EmailOctopus, go to **Settings → Domains**.
* Follow the steps to **Authenticate your Domain**.
* They will give you 2-3 records (CNAME or TXT). Go to your **Cloudflare Dashboard → DNS → Add Record** and paste them in.

Without this, your emails go straight to the Spam folder. **Do not skip this.**

### **The Physical Address**

Anti-spam laws (CAN-SPAM) require a physical address at the bottom of every email. If you don''t want to use your home address, use a P.O. Box or a service like Anytime Mailbox.

👉 Get a virtual business address — [YOUR ANYTIME MAILBOX AFFILIATE LINK]

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 4, 'Section 2: The "Plumbing" (The AI Snippet Injection)', 'In Module 2, your AI built a professional app with a "placeholder" for a form. Now we are going to swap that placeholder for a real, working form from your email provider.

**Step 1: Get Your Code**

* Log into MailerLite or EmailOctopus.
* Go to **Forms → Embedded Forms**.
* Create a simple form (just Email and First Name).
* Copy the HTML/JavaScript code snippet they give you.

**Step 2: Give the AI the "Map"**

* Go back to your AI (Claude or ChatGPT).
* Upload the ZIP file of your project (the same one you downloaded in Module 2).
* Use the **Email Form Injection Prompt** attached to this lesson — paste your form snippet where indicated.

**Step 3: The GitHub "Surgery"**

The AI will tell you which file to change (usually `src/pages/Home.jsx` or `index.html`) and give you a block of code.

* Go to your GitHub repo in your browser.
* Navigate to that file and click the **Pencil Icon (Edit)**.
* Delete everything in the file and paste the new code from the AI.
* Click **Commit Changes**.

**Step 4: The Auto-Update**

Because GitHub is connected to Cloudflare, Cloudflare will see the change and automatically update your live website. Wait 60 seconds, refresh your site, and your form is now live!

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 5, 'Section 3: Your Welcome Sequence — The First Impression', 'The "Welcome Sequence" is the series of emails someone gets immediately after they join your list. We use a 5-email structure:

* **Email 1 (Immediate):** Deliver the Lead Magnet. Give them the Google Drive link to the PDF you made in Module 2. Ask them one question: *"What is your biggest frustration with [Topic]?"*
* **Email 2 (Day 1):** The Real Story. Tell them who you are. People connect with struggles, not just successes.
* **Email 3 (Day 2):** The Teaching Email. Deliver pure value. Tell them something "insider" about your niche. **No pitch in this email.**
* **Email 4 (Day 3):** Social Proof / Results. Show that the system works. Soft-link to your offer.
* **Email 5 (Day 5):** The Direct Pitch. This is where you tell them to buy the course, the tool, or the service.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 6, 'Section 4: The Email Writing Prompt Pack', 'Use this prompt to have the AI write your entire sequence in your voice.

**AI Prompt:**

> *"Write a 5-email welcome sequence for my brand [Brand Name]. I help [Target Audience] achieve [Goal]. My story is [Brief Story about your background]. My lead magnet is [Lead Magnet Name]. The offer I eventually want to promote is [Offer Name].*
>
> *Email 1: Deliver lead magnet.*
> *Email 2: Tell my story.*
> *Email 3: Teach one tip about [Topic].*
> *Email 4: Show proof of [Result].*
> *Email 5: Direct pitch for [Offer].*
>
> *Write in a conversational, no-BS tone. Short paragraphs. Direct and honest."*

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 7, 'Section 5: Deliverability — Staying Out of Spam', '* **Don''t use spam words:** Avoid putting "FREE," "CASH," or "GUARANTEED" in all caps in your subject lines.
* **Ask for a reply:** In your first email, ask them to reply. When they reply, Gmail sees you as a "friend" and ensures your future emails go to the Primary inbox.
* **Consistency:** Send at least one "Broadcast" email a week (news, tips, or deals) so they don''t forget who you are.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-3-the-email-system', 8, 'Section 6: Module 3 Action Checklist', '* Domain Authenticated in MailerLite/EmailOctopus and Cloudflare DNS.
* Physical Address added to your email sender profile.
* Embed Code Snippet retrieved from your email provider.
* AI "Surgery" Completed: Uploaded ZIP to AI and updated the file on GitHub.
* Form Tested: Signed up on your own site and confirmed your email arrived in the list.
* Welcome Sequence Written and scheduled to fire automatically.

---

**What''s Next:** Module 4: The Automation System is where we build your "Dashboard."');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 1, 'Remove the Manual Work and Create Real Leverage', 'Here''s the reality: if you have to manually check three different apps to see if your business is growing, you don''t have a business — you have a chore.

The people making real money aren''t working harder; they''ve built systems that do the repetitive work for them. When someone opts into your funnel at 3:00 AM, an automation should:

1. Deliver the lead magnet (Module 3).
2. Log the lead in a master spreadsheet.
3. Ping your phone so you wake up to "Good News."

We are going to build this using **Google Apps Script**. It lives inside Google Sheets, it''s free forever, and it''s fast.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 2, 'Fast-Track — Already Know Automation?', '* **Already have a tracking spreadsheet?** Skip to Section 3 — Telegram Notifications
* **Just want the code to log leads?** Jump to Section 2
* **Want to scale to complex workflows?** Skip to Section 4 — The n8n Path

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 3, 'Section 1: Your Master Tracking System — The Business Hub', 'Before we automate, we need a "Destination." We are going to create your **Business Hub**.

**Step 1:** Create a new Google Sheet named **"The Kraken Business Hub."**

**Step 2:** Create these 4 tabs at the bottom:

* **Leads:** `Date | Email | First Name | Source`
* **Sales:** `Date | Offer | Commission | Status`
* **Content:** `Post Date | Platform | Topic | Link`
* **Bills:** `Service | Amount | Due Date | Status`

This is now your "Single Source of Truth." If it isn''t in the Hub, it didn''t happen.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 4, 'Section 2: The Google Sheets Logger (The "AI Bridge")', 'We need to tell your website to send data to your Google Sheet. Use the **Google Sheets + Telegram Automation Prompt** attached to this lesson.

**Step 1: The AI Instruction**

* Go to your AI (Claude or ChatGPT).
* Upload your project ZIP file (the one from Module 2).
* Paste the attached prompt.

**Step 2: Deploying the Script**

The AI will give you a block of code and these steps:

* In your Google Sheet, go to **Extensions → Apps Script**.
* Delete any code there and paste the AI''s code.
* Click the **Deploy** button (Blue) → **New Deployment**.
* Select Type: **Web App**.
* Execute as: **Me**.
* Who has access: **Anyone**. (This allows your website to send the data.)
* Copy the **Web App URL** it gives you.

**Step 3: Plugging it into your App**

Go back to your AI and say: *"Here is my Google Web App URL: [PASTE URL]. Please update the file in my project that handles the form submission so it also sends the data to this URL."*

The AI will tell you which file to update (usually `src/pages/Home.jsx`). Go to your GitHub repo, edit that file, paste the new code, and **Commit Changes**.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 5, 'Section 3: Telegram Notifications (The Success Ping)', 'We want your phone to notify you the second you get a lead.

**Step 1: Create the Bot**

* Open Telegram and search for **@BotFather**.
* Type `/newbot` and follow the steps to get your **API Token**.
* Search for **@userinfobot** and click start to get your **Chat ID**.

**Step 2: Add the "Ping" to your Script**

Go to your AI and say: *"I want to add a Telegram notification to my Google Apps Script. Here is my Bot Token: [TOKEN] and my Chat ID: [ID]. Please update the script so it sends me a message saying ''New Lead: [Email]!'' every time the script runs."*

Take the updated code, go back to your Google Sheet → Apps Script, replace the old code, and **Deploy** again.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 6, 'Section 4: Advanced Automation — The n8n Path', 'If you eventually want to do complex things (like "When I get a sale on Amazon, automatically post a ''Thank You'' to my Telegram Channel"), you will graduate to **n8n**.

n8n is a visual "drag-and-drop" automation tool.

* **The Free Way:** Run it on your own computer (it only works when your computer is on).
* **The Pro Way:** Host it on **Render** for about $7/month.

We recommend staying with the Google Apps Script method for your first 90 days. It is free, it never goes offline, and it handles everything a beginner needs.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 7, 'Section 5: The Automation Mindset', 'Not everything should be automated.

**Automate when:**

* It''s a boring data-entry task (logging leads).
* It needs to happen instantly (notifications).
* It''s a "checking" task (price drop alerts).

**Don''t automate when:**

* It requires a "human touch" (responding to DMs).
* It''s a relationship-building task (talking to your first 10 customers).

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-4-the-automation-system', 8, 'Section 6: Module 4 Action Checklist', '* Business Hub Spreadsheet created with the 4 tabs.
* ZIP File Uploaded to AI to generate your Google Apps Script.
* Apps Script Deployed as a Web App and URL saved.
* GitHub Updated: Form logic updated by AI to send data to your Sheet.
* Telegram Bot Created and connected to your script.
* The Test: Sign up on your site and confirm your Sheet updates and your phone pings.

---

**What''s Next:** Module 5: The Traffic System is where we learn how to get the right eyeballs on your funnel using TikTok, Reels, and Shorts.');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-5-the-traffic-system', 1, 'Fast-Track', '* **Already posting content consistently?** Skip to Section 3 — Optimizing What You Post  
* **Ready for paid traffic?** Jump to Section 4 — The Beginner Ad Framework  
* **Just want the posting strategy?** Jump to Section 2

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-5-the-traffic-system', 2, 'The Only Traffic Truth That Matters', 'Traffic is not the goal. The right traffic is the goal.

A million views from people who have zero interest in what you offer is worth less than 200 views from people who are actively looking for what you have. Before you think about how to get more traffic, get clear on who you''re trying to reach.

Write this down:

**My ideal subscriber is someone who:** *(example: is currently working a full-time job and looking to build a side income online, has probably tried a thing or two that didn''t work, is skeptical of hype but still hopeful, and has between 5 and 15 hours a week to commit)*

Every piece of content you create should be designed for that person. Not for the algorithm. Not for views in general. For them.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-5-the-traffic-system', 3, 'Section 1: Organic Traffic — The Foundation', 'Organic traffic is any traffic that comes to you without paid advertising. It''s built through content, consistency, and understanding what your specific platform rewards.

We''re focusing on three platforms: TikTok, Instagram Reels, and YouTube Shorts. All three run on short-form vertical video. Content you create for one platform can be repurposed for the other two with minimal extra effort.

---

### **The Platform Breakdown — Pick One to Start**

**TikTok — Highest reach potential, lowest barrier**

TikTok''s algorithm is the most democratic of any social platform. A brand new account with zero followers can post a video and get 100,000 views if the content resonates. The algorithm pushes content to new audiences based on engagement signals, not follower count. This is why you see people with 47 followers who have a video with 2 million views.

Best for: Deal content, product reviews, personal finance and side income content, how-to tutorials, "watch me build this" content

Weakness: Shelf life of content is short — most views happen in the first 48 hours. The deal you post today is irrelevant next week.

**Instagram Reels — Best for building a personal brand alongside content**

Reels don''t get the raw reach that TikTok does, but Instagram has a more stable, slightly older demographic that converts better for certain offers (especially digital products and services). Profile traffic is also higher — people who like a Reel are more likely to click to your profile and follow than on TikTok.

Best for: Personal brand building, digital product promotion, service offers, before/after content

Weakness: Reach for new accounts is more limited. Takes longer to build momentum.

**YouTube Shorts — The SEO play**

YouTube Shorts benefit from YouTube''s massive search infrastructure. A Short about "how to find Amazon affiliate deals without owning the products" can show up in search results weeks and months after you posted it. Long shelf life, compound traffic over time.

Best for: Tutorial content, how-to content, anything that answers a specific question someone might search for

Weakness: Monetization and direct conversion are harder — you''re one extra click away from a profile visit compared to TikTok and Instagram.

**The recommendation:** Start with TikTok for reach and deal content. Post the same video to Instagram Reels. When you have a library of 20+ videos, start repurposing the best ones as YouTube Shorts. That''s your three-platform strategy from one piece of content.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-5-the-traffic-system', 4, 'Section 2: The Posting Strategy — What, When, and Why', '### **What to Post**

Your content falls into four buckets. Rotate through all four rather than posting the same type every time.

**Bucket 1: Educate (40% of your content)**

Teach your audience something specific and useful. This is the trust-building bucket. People follow you because you help them understand something they didn''t before.

Examples:

* "The 3 Amazon categories with the highest affiliate commissions — and the one most people chase that pays almost nothing"  
* "Why your email open rates are low — and the two changes that fix it fast"  
* "What actually happens when you click an Amazon affiliate link"  
* "The difference between a good online business and a fancy hobby"

**Bucket 2: Expose (25% of your content)**

Challenge a common belief, call out a misleading tactic, or show what''s actually happening behind the curtain. This content gets shared because people want others to see it.

Examples:

* "The truth about those ''$10k a month from my laptop'' ads"  
* "Why most TikTok affiliate gurus don''t actually make money from TikTok"  
* "The reason every MLM sounds exactly the same (and what to look for)"  
* "Amazon dropped their affiliate commissions in 2020 and most people still don''t know"

This is where your lived experience — years of working and being marketed at — becomes content gold. You''ve seen through the hype. Talk about it.

**Bucket 3: Convert (20% of your content)**

Direct promotion of your funnel, your lead magnet, your offer, or your email list. These don''t have to feel like ads — the best converting content tells a story that naturally ends at the thing you''re promoting.

Examples:

* "I put together a free guide to the 5 Amazon categories that actually pay. Link in bio."  
* "If you''re tired of guessing what actually works online, I send a weekly breakdown of what I''m seeing. Free to join — link in bio."  
* "Before you sign up for another course, run it through this 3-question test. I explained it in my free guide — link in bio."

**Bucket 4: Proof (15% of your content)**

Show results. Your own numbers, subscriber milestones, a commission screenshot, a testimonial from someone who used your advice. Proof content builds credibility fast because it''s concrete.

Keep proof content honest — don''t inflate numbers and don''t make claims that aren''t supported. The people you want to attract are skeptical. A modest real result beats an exaggerated one every time.

---

### **When to Post**

**TikTok:** 1–2 times per day when building momentum, then 4–5 times per week to maintain. Consistency matters more than volume. Posting once a day every day beats posting 5 times one week and nothing the next.

**Instagram Reels:** 4–5 times per week. Repost your TikToks here (remove the TikTok watermark first — download your TikTok from a service like SnapTik or TikMate before uploading to Instagram).

**YouTube Shorts:** 3–4 times per week once you''re repurposing existing content.

**Best times (general starting point — adjust based on your analytics):**

* 7–9am: People scrolling before work  
* 12–1pm: Lunch break scroll  
* 7–10pm: Evening entertainment time

After 30 days of posting, check your platform analytics to see when your specific audience is most active and adjust from there.

---

### **The Batch Content Approach**

Don''t make content daily. Batch it.

**How batching works:**

Block 2–3 hours once or twice a week. In that block, film everything you''re going to post for the next 3–7 days. Then spend 30–60 minutes editing (or outsource this when you can afford to). Schedule or save the content. Done until next batch session.

**Why this works:** Daily content creation is exhausting and inconsistent. You''ll eventually miss a day, feel guilty, miss another, and eventually stop. Batching creates a buffer — you always have content ready even when life gets in the way.

**The batch session structure:**

1. Write your hooks for each video (just the opening line) — 15 minutes  
2. Film all videos back to back — 60–90 minutes  
3. Quick review and delete obvious duds — 15 minutes  
4. Light editing or hand off to editing tool — 30 minutes  
5. Add captions, hashtags, and descriptions — 30 minutes

**Editing tools:**

* CapCut (free, mobile and desktop) — best for TikTok-style content with auto-captions  
* Canva video editor (free) — good for simple cuts and text overlays  
* Submagic (paid, \~$20/month) — auto-captions with good formatting

**Affiliate note:** CapCut is free. If you want a dedicated caption/editing tool: 👉 [**Try Submagic — \[YOUR SUBMAGIC AFFILIATE LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-5-the-traffic-system', 5, 'Section 3: Hook Formulas — The First 3 Seconds Decide Everything', 'On TikTok and Reels, if your first three seconds don''t stop the scroll, the video is dead. The algorithm measures completion rate — how many people watched to the end. If your hook fails, nobody watches, completion rate tanks, and the algorithm buries the video.

The hook is the first thing your viewer sees and hears. It goes in two places: what you say in the first 3 seconds on camera, and the text on screen at the start of the video.

### **The 50+ Hook Library**

**Curiosity hooks (make them need to know):**

1. "The reason your Amazon affiliate account is about to get closed"  
2. "Nobody talks about this Amazon commission category"  
3. "I almost gave up on week 3 — here''s what changed"  
4. "The thing they don''t tell you about making money with TikTok"  
5. "This is what your competitor''s funnel actually looks like"  
6. "I checked 100 TikTok ''income'' accounts. Here''s what I found."  
7. "There are only 4 ways to make money online. Most people try the wrong one."  
8. "Why the $297 course you''re considering probably won''t work"  
9. "The one thing Amazon affiliates with $10k months do differently"  
10. "Your email list isn''t growing because of this"

**Pain-first hooks (start with their frustration):** 11\. "If you''ve clicked on 10 ''make money online'' ads and gotten nowhere, this is why" 12\. "Tired of posting every day with nothing to show for it?" 13\. "Working 50 hours a week and still can''t get ahead?" 14\. "You''re not failing at this. The system you bought into is." 15\. "If your side hustle is starting to feel like a second job, watch this" 16\. "Every course I bought gave me information. None of them gave me a system." 17\. "The reason you know exactly what to do but still don''t do it" 18\. "You don''t need more information. You need to stop starting over." 19\. "Broke and burnt out — what actually changed for me" 20\. "If one more person tells me to ''just be consistent'' I''m going to lose my mind"

**Contrarian hooks (challenge what they believe):** 21\. "You don''t need a big following to make money online" 22\. "Stop building an audience before you have an offer" 23\. "Passive income isn''t passive. Here''s what it actually is." 24\. "Your niche doesn''t matter as much as you think" 25\. "The best Amazon affiliate products to promote are NOT the most popular ones" 26\. "More content is not the answer" 27\. "You don''t need a website to start making affiliate income" 28\. "Stop waiting until you have more followers" 29\. "The free tools are better than the paid ones. I''ll prove it." 30\. "Email is not dead. Everyone who says that doesn''t have a list."

**Proof and result hooks:** 31\. "Here''s what $47 in Amazon affiliate commissions actually looks like (real screenshot)" 32\. "I went from 0 to 200 subscribers in 30 days doing this" 33\. "The three content changes that doubled my opt-in rate" 34\. "What happened when I posted every day for 30 days (honest)" 35\. "My deal site generated X clicks this month — here''s how"

**Story hooks:** 36\. "Three years ago I almost signed up for an MLM. Here''s what stopped me." 37\. "I spent $500 on a course that told me to ''follow my passion.'' Never again." 38\. "My first affiliate commission was $2.17. I almost quit." 39\. "I work in retail management. This is what I built on my days off." 40\. "The ad I clicked that finally told me the truth"

**How-to hooks:** 41\. "How to make your first Amazon affiliate commission without buying anything" 42\. "How to get a professional business email for free" 43\. "How to set up a deal site in a weekend using free tools" 44\. "How I automate my online business for $7 a month" 45\. "How to tell if an online course is worth buying in 60 seconds"

**List hooks:** 46\. "5 Amazon niches that consistently pay 8–10% commission" 47\. "3 reasons your funnel isn''t converting (and none of them are your copy)" 48\. "7 signs the ''business opportunity'' you''re looking at is an MLM" 49\. "4 free tools that do what $200/month software does" 50\. "The 2 things every successful affiliate marketer has that beginners skip"

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-5-the-traffic-system', 6, 'Section 4: The Beginner Paid Ad Framework', 'Paid ads are a later-stage tool — not a beginner''s first move. Here''s the honest rule:

**Don''t run paid ads until your funnel converts organically.**

If 100 people visit your opt-in page and none of them opt in, paying to send more people there just accelerates your losses. Paid ads amplify what''s already working. Fix the funnel first (Module 2), build the email system (Module 3), get some organic proof that people are interested — then consider ads.

**When you''re ready, start with Meta (Facebook/Instagram) ads because:**

* Most detailed targeting options of any platform  
* You can start with as little as $5/day  
* Visual creative performs in a familiar format  
* Massive inventory of audiences to test

---

### **The Three-Part Ad Structure**

Every ad you run — no matter the platform — needs these three things working together:

**1\. The Hook (stops the scroll)** Same principles as your organic content hooks. On video ads, the first 3 seconds are everything. On image ads, the headline and visual work as the hook.

**2\. The Message (builds the case)** What''s the offer and why should they care? Be specific. "Free guide to the 5 highest-paying Amazon affiliate categories" beats "free guide to making money online" every time.

**3\. The Offer (tells them what to do)** One action. One click. "Download the free guide." Not "follow me, and visit my site, and check out my course." One thing.

---

### **Ad Types for Beginners**

**Lead Generation Ad — Most Beginner-Friendly**

Goal: get email addresses. The ad shows a simple value proposition, someone clicks "Get Free Guide," a pre-filled Facebook form appears with their name and email already there (Meta pulls it from their profile), they hit submit, they''re on your list.

You never need a website for this type of ad. Meta handles the whole transaction.

Setup:

* Facebook Ads Manager → Create → Campaign objective: Leads  
* Ad type: Instant Forms  
* Target audience: start broad (your country, age 25–55, no specific interests) — let Meta''s algorithm find converters  
* Budget: $5–10/day to start  
* Run for 7 days without changing anything — let Meta optimize  
* After 7 days, check your cost per lead. Under $3 is excellent for this type of offer. $3–8 is acceptable. Over $8, the creative or the offer needs work.

**Content Promotion Ad — Boost What''s Working Organically**

Goal: get more eyeballs on content that''s already proven. Take your best-performing organic TikTok or Reel and put $5–10/day behind it to extend the reach.

This is lower risk than a cold ad because the content already has proof — real engagement, real comments, real shares. You''re just buying more of the same audience.

---

### **The Cheap Lead Strategy**

The goal is to build your email list profitably — meaning each subscriber you acquire eventually earns back more than you paid to acquire them.

**The math that makes paid ads viable:**

If you spend $5/lead to acquire subscribers, and your email sequence converts 3% of subscribers to a $150 commission affiliate sale:

* 100 subscribers × $5 \= $500 spent  
* 100 subscribers × 3% conversion \= 3 sales  
* 3 sales × $150 commission \= $450 earned  
* Net: \-$50

Not profitable yet — but close. Improve the conversion sequence, increase the offer commission, or lower the lead cost and it flips. This is the optimization game.

Most beginners panic at their first ad spend without a sale and shut it off too early. Give any campaign at least 50 leads before you judge it. The first 20 are the algorithm learning who to show it to.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-5-the-traffic-system', 7, 'Module 5 Action Checklist', '**Platform setup:**

* \[ \] TikTok account created for your brand  
* \[ \] Instagram account created/optimized  
* \[ \] YouTube channel created (for Shorts repurposing)  
* \[ \] Bio links set to your opt-in page on all platforms

**Content:**

* \[ \] First batch session completed (minimum 5 videos)  
* \[ \] Videos posted on TikTok (and cross-posted to Reels)  
* \[ \] Posting schedule committed to (days of week and approximate times)  
* \[ \] Hook library bookmarked for reference during batch sessions

**Paid ads (when ready):**

* \[ \] Facebook Business Manager account created  
* \[ \] Pixel installed on your Cloudflare Pages funnel  
* \[ \] First lead generation campaign set up ($5–10/day budget)

---

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 1, 'Fast-Track', '* **Already have a content routine?** Skip to Section 3 — The 30-Day Calendar  
* **Just want the AI prompts?** Jump to Section 4 — The Content Writing Prompt Pack

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 2, 'The System Behind Every Consistent Creator', 'Consistent creators don''t have more ideas than you. They have a system that generates ideas before they need them so they''re never starting from blank.

Here''s the system:

**1\. The Idea Bank** — a running list of content ideas captured whenever they occur to you. The ideas don''t come when you''re sitting down trying to think of them. They come in the shower, during your drive, at work when someone says something that makes you think. You need somewhere to put them immediately. A note on your phone, a Google Keep note, a tab in your business hub spreadsheet. When it''s time to batch content, you pull from this bank instead of trying to generate ideas on the spot.

**2\. The Content Matrix** — a simple grid that combines your four content buckets (educate, expose, convert, prove) with your main topic areas. The intersections give you content angles without having to invent something from scratch every time.

**3\. The 30-Day Calendar** — a pre-planned schedule that you fill in from your idea bank using the content matrix. You know on January 15th you''re posting an "expose" video about your Amazon niche topic. You don''t have to decide what to post that day — it''s already decided.

**4\. The AI Prompt Pack** — when the idea bank runs low or you need variations on a theme, you use AI to generate angles, hooks, and scripts in minutes.

Let''s build all four.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 3, 'Section 1: The Content Matrix', 'Your content matrix is a simple table. Rows are content buckets. Columns are your topic pillars — the main subjects you talk about.

**Example for Path 1 (Amazon affiliate \+ online income):**

|  | Amazon deals | Affiliate marketing | Free tools/automation | Online income mindset |
| ----- | ----- | ----- | ----- | ----- |
| **Educate** | Which Amazon categories pay most | How affiliate tracking works | How to set up a deal site for free | Why consistency beats hustle |
| **Expose** | Products with fake reviews | Commission cuts Amazon made | Why Zapier is overpriced | MLM red flags |
| **Convert** | Link to deal site \+ email | Link to free affiliate guide | Link to free tool stack guide | Link to Kraken Vault |
| **Prove** | Commission screenshot | Subscriber count milestone | Automation running on its own | Deal site traffic stats |

Every cell in that matrix is a content piece. For a 4×4 matrix that''s 16 content angles. Multiply each angle by 5 different hooks from your hook library and you have 80 pieces of content from one 20-minute planning session.

**Build your own matrix:**

Open a Google Sheet or grab a piece of paper. Write your four content buckets down the left side. Across the top, write your 3–4 main topic pillars. Fill in the intersections with one specific angle each. Don''t overthink — quick and rough is fine. You can refine later.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 4, 'Section 2: The Idea Bank — How to Never Run Out', '**Set up your idea bank right now.** Create a note on your phone called "Content Ideas" or create a tab in your business hub spreadsheet called "Idea Bank" with these columns: `Idea | Hook | Bucket | Status`

**Where ideas come from:**

**From your own experience:** Every moment of frustration, confusion, or discovery in your online business journey is content. The thing you figured out this week that you didn''t know last week — that''s a video. The question someone asked you that you had to think about — that''s a video. The ad you clicked that turned out to be nothing — that''s a video.

**From your audience:** Read your comments. Read DMs. Read email replies. The questions people ask you are the questions hundreds of others have and aren''t asking. When someone asks you something, write the answer as a piece of content and post it.

**From competitor content:** Scroll your niche on TikTok and Instagram — not to copy, but to see what''s performing. What are people responding to? What questions are in the comments? What''s being said that you disagree with? All content angles.

**From Reddit and Facebook Groups:** Go to subreddits and Facebook Groups where your target audience hangs out. Read what they''re asking and complaining about. These are real problems from real people — far more reliable than trying to imagine what they care about.

Communities to look at:

* r/Affiliatemarketing  
* r/sidehustle  
* r/Entrepreneur  
* r/AmazonAssociates  
* Facebook Groups related to your niche

**From your email replies:** In Email 1 of your welcome sequence (Module 3), you ask subscribers a question: "What''s your biggest frustration with \[topic\]?" The answers they send back are pure content gold. Screenshot the theme (never the person) and make the video.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 5, 'Section 3: The 30-Day Content Calendar', 'Here''s a pre-built 30-day calendar framework for Path 1 (Amazon affiliate and online income). Adapt it to your path by swapping the topics while keeping the bucket rotation.

**Week 1 — Establish Trust**

| Day | Platform | Bucket | Topic |
| ----- | ----- | ----- | ----- |
| Mon | TikTok \+ Reels | Educate | Amazon affiliate overview — what it is, how commissions work |
| Tue | TikTok | Expose | The commission categories they cut and why it matters |
| Wed | TikTok \+ Reels | Educate | How to review products you don''t own |
| Thu | TikTok | Prove | Your deal site stats or first commission screenshot |
| Fri | TikTok \+ Reels | Convert | Link to lead magnet — the free guide |
| Sat | TikTok | Story | Your why — why you built this, what you were tired of |
| Sun | Rest or repurpose to YouTube Shorts |  |  |

**Week 2 — Build Depth**

| Day | Platform | Bucket | Topic |
| ----- | ----- | ----- | ----- |
| Mon | TikTok \+ Reels | Educate | The green screen review technique step by step |
| Tue | TikTok | Expose | Why most deal sites fail (and what yours does differently) |
| Wed | TikTok \+ Reels | Educate | How to find price drops on Amazon |
| Thu | TikTok | Prove | Subscriber milestone or deal engagement stats |
| Fri | TikTok \+ Reels | Convert | Link to deal site directly |
| Sat | TikTok | Educate | The free tool stack for your whole business |
| Sun | Repurpose best video as YouTube Short |  |  |

**Weeks 3 and 4:** Repeat the pattern with different specific topics from your content matrix. Rotate through all four buckets. Keep about 40% educate, 25% expose, 20% convert, 15% prove.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 6, 'Section 4: The Content Writing Prompt Pack', '### **Prompt 1: Video Script Generator**

Write a short-form video script (60-90 seconds when spoken at a normal pace) 

for TikTok/Instagram Reels.

Details:

\- My niche/topic: \[YOUR TOPIC\]

\- Content bucket: \[Educate / Expose / Convert / Prove\]

\- Specific angle: \[THE SPECIFIC THING THIS VIDEO IS ABOUT\]

\- My audience: \[WHO THEY ARE\]

\- My tone: \[casual and direct / conversational / no-BS\]

Hook: Start with this hook or create a better version: \[YOUR HOOK IDEA\]

Structure:

1\. Hook (first 3 seconds — stop the scroll)

2\. Brief context (5-10 seconds — why this matters to them)

3\. Main content (30-50 seconds — the actual value or story)

4\. CTA (last 10 seconds — one clear action for them to take)

Format the output as:

\[ON SCREEN TEXT\]: what appears as text overlay

\[SPOKEN\]: what I say out loud

Keep the spoken language conversational — like I''m talking to a friend, 

not presenting to a conference room. Short sentences. Real words.

---

### **Prompt 2: Caption and Hashtag Generator**

Write a TikTok/Instagram caption and hashtag set for a video about \[YOUR VIDEO TOPIC\].

My audience: \[WHO THEY ARE\]

My tone: \[YOUR TONE\]

My call to action: \[WHAT I WANT THEM TO DO — e.g., "click the link in my bio"\]

Requirements:

\- Caption should be 2-4 lines max — something that adds context or curiosity 

  without explaining the whole video

\- End with a question or CTA

\- Include 10-15 hashtags — mix of large (1M+ posts), medium (100K-1M), 

  and small/niche (under 100K)

\- Don''t use spammy or irrelevant hashtags

Format:

\[CAPTION\]

\[HASHTAGS\]

---

### **Prompt 3: 30-Day Content Calendar Builder**

Build me a 30-day content calendar for my online business.

My niche: \[YOUR NICHE\]

My paths/topics: \[YOUR 3-4 MAIN TOPIC PILLARS\]

My primary platform: \[TIKTOK / INSTAGRAM / YOUTUBE\]

Posting frequency: \[HOW MANY TIMES PER WEEK\]

Content buckets to rotate through:

\- Educate (40%): teach something specific and useful

\- Expose (25%): challenge a belief, call out misinformation

\- Convert (20%): promote my funnel or offer

\- Prove (15%): show results, milestones, evidence

For each day include:

\- Day number and day of week

\- Content bucket

\- Specific topic/angle

\- Suggested hook (one sentence)

Make the topics specific, not generic. Instead of "tips for making money online" 

suggest "3 Amazon product categories that pay 8% commission (most people promote the 1% ones)."

Output as a table.

---

### **Prompt 4: Content Repurposing Generator**

I have a piece of content and I want to repurpose it across multiple formats.

Original content: \[PASTE YOUR SCRIPT, BLOG POST, EMAIL, OR SUMMARY\]

Original format: \[VIDEO / EMAIL / BLOG POST\]

Please create the following repurposed versions:

1\. A TikTok/Reels hook and script (60 seconds)

2\. An email version (conversational, 200-300 words, for my subscriber list)

3\. A tweet/X thread (5-7 tweets)

4\. A carousel concept for Instagram (5-7 slides — just the text for each slide)

Keep my core message and any specific examples intact. 

Adapt the format and length for each platform.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 7, 'Section 5: Content Kraken Integration', 'Your Content Kraken app (which you''ve built) fits into this system as your content workspace — the place where ideas move from the idea bank to drafted scripts to scheduled posts.

**How to position Content Kraken inside The Kraken Vault:**

Every student who reaches Module 6 should get access to Content Kraken as part of the vault. It''s the practical tool that makes the system in this module actually usable day to day — rather than managing scripts in Google Docs and calendars in Sheets and ideas on sticky notes.

When you write the Content Kraken onboarding section, tie it directly to the matrix and calendar from this module:

* Idea bank \= Content Kraken "Ideas" section  
* Content matrix \= Content Kraken content categories  
* 30-day calendar \= Content Kraken scheduling view  
* Batch session \= a Content Kraken workflow starting from ideas → scripts → scheduled

This positions Content Kraken not as a bonus but as the execution layer the whole module is designed for.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-6-the-content-system', 8, 'Module 6 Action Checklist', '* \[ \] Content matrix built (4 buckets × 3–4 topic pillars)  
* \[ \] Idea bank created (phone note or spreadsheet tab)  
* \[ \] 10 ideas added to idea bank immediately after creating it  
* \[ \] 30-day content calendar built (use the AI prompt or the template above)  
* \[ \] First batch session completed using the calendar as your guide  
* \[ \] AI prompt pack bookmarked for future use  
* \[ \] Content Kraken set up and calendar imported (when available)

---

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 1, 'Fast-Track', '* **Already doing outreach?** Skip to Section 3 — Objection Handling  
* **Just want the message templates?** Jump to Section 2

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 2, 'Why DMs Are Still the Highest-Converting Channel', 'Email converts better than social. But DMs convert better than email.

Here''s why: an email lands in an inbox with 200 others. A DM lands in a conversation thread — it''s personal, it''s direct, and it''s expected to get a human reply. The intimacy of a DM conversation, done right, builds more trust in five messages than five emails do.

This module covers two scenarios:

**Inbound DMs** — someone messages you because they saw your content, your deal, or your profile. They came to you. This is the best case.

**Outbound DMs** — you initiate contact. For B2B (Path 6\) and for building relationships in your niche, this is a key skill.

In both cases, the approach is the same: start a genuine conversation, understand what they need, and only move toward an offer when there''s a real fit.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 3, 'Section 1: The DM Flow Framework', 'Every DM conversation that moves toward a sale follows this four-step path. Some conversations move through all four steps in one thread. Others develop over days or weeks. The pace follows the person, not your timeline.

### **Step 1: Engage**

Start with something real. If they DM you first, respond to what they actually said — don''t immediately redirect to your offer. If you''re reaching out first, reference something specific about them (their content, their comment, their situation).

What kills DM conversions: "Hey\! I saw your profile and think you''d be interested in..."

What works: actually engaging with who they are and what they said.

**Inbound example** (they commented "where do I start?" on your deal content):

"Great question — where are you at right now? Have you done any affiliate stuff before or is this totally new territory for you?"

**Outbound example** (reaching out to a local business owner for B2B):

"Hey \[name\] — I follow \[business name\] and noticed you''ve been posting more consistently lately. The \[specific recent post\] got good engagement. Are you managing that yourself or do you have help with it?"

---

### **Step 2: Qualify**

Before you invest time in a conversation, find out if there''s actually a fit. Not everyone who''s curious is ready to take action. That''s fine — but you don''t want to spend 45 minutes in a DM conversation with someone who was just browsing.

Qualifying questions feel like natural conversation, not an interview:

For affiliate/online income audiences:

* "What''s your main goal right now — building something as a side income or eventually going full time?"  
* "Have you tried anything in this space before? What happened with that?"  
* "How much time are you realistically able to put into this right now?"

For B2B local marketing outreach:

* "Is getting more customers online on your radar for this year?"  
* "Are you currently doing anything with email or paid ads, or is it all organic right now?"  
* "What''s the biggest bottleneck for you on the marketing side?"

Listen to the answers. If their situation genuinely matches what you offer, keep going. If it doesn''t, be honest — "Honestly, based on what you''re describing, I''m not sure what I do would be the best fit. You might be better off starting with \[something else\]."

Being willing to say "I''m not sure I''m the right person for you" is counterintuitive but it builds enormous trust. And sometimes the person who wasn''t a fit in month 1 comes back in month 3 ready to go.

---

### **Step 3: Position**

Once you know there''s a real fit, position your offer as the specific solution to the specific problem they just told you about. This is not a pitch — it''s a connection.

The difference:

**Pitch:** "I have this great affiliate marketing guide that covers everything from domains to automations to email sequences. It''s really comprehensive and I think you''d love it."

**Position:** "Based on what you''re describing — you''ve tried a few things but nothing connected because you''re missing the system that ties it all together — that''s exactly the gap I built The Kraken Vault to fill. It''s specifically for people who have some experience but feel like they''re missing the how-to-connect-it-all piece."

See the difference? The second one speaks to what THEY just told you, not a feature list of your product.

---

### **Step 4: Close**

Not every DM close looks the same. Match the close to the conversation.

**Soft close** (when they''re warm but not ready to buy yet):

"I''ll send you the link — no pressure at all. Check it out when you have a few minutes and if it feels right, great. If not, I''m happy to just keep the conversation going."

**Direct close** (when they''ve clearly indicated they''re ready):

"Sounds like this is exactly what you''re looking for. Here''s the link — \[link\]. Grab it while \[discount/bonus is active / you have the time / the moment is right\]."

**Call/consult close** (for higher-ticket offers like B2B services):

"This would probably be easier to walk through in a quick call — 20–30 minutes and I can show you exactly what I''d do for your situation. Are you open to that?"

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 4, 'Section 2: Message Templates', 'These are starting points, not scripts to copy word for word. Your goal is to sound like yourself. Adapt these to your voice and the specific situation.

---

### **Template Set 1: Inbound — They Commented on Your Deal Content**

**They commented:** "How do I get started with this?"

**Your DM:**

"Hey \[name\] — happy to point you in the right direction. Can I ask where you''re at right now? Are you completely new to affiliate stuff or have you dabbled before?"

**If they say completely new:**

"Perfect starting point honestly — it''s easier to build the right habits from scratch than to unlearn the wrong ones. I actually put together a free guide that walks through the first steps. Want me to drop the link? No catch — just a PDF."

**If they say they''ve tried things before:**

"Okay so you''re past the ''what is this'' phase — you just need the system that connects it all. That''s a different problem and honestly an easier fix. What specifically hasn''t clicked yet?"

---

### **Template Set 2: Inbound — They Asked About a Specific Tool or Method**

**They asked:** "Do you actually make money from this or is it just content?"

**Your DM:**

"Fair question — I know that''s what everyone says. I''m not going to throw fake income screenshots at you because I think that''s obnoxious. What I can tell you is \[your honest answer — a real number, a real timeframe, a real metric\]. It''s not ''quit your job tomorrow'' money but it''s real and it keeps compounding. What made you ask?"

---

### **Template Set 3: Outbound — B2B Local Business Cold Outreach**

**First message (never pitch in message 1):**

"Hey \[name\] — noticed \[business name\] in \[city\] — looks like you''ve been \[specific observation about their online presence\]. Been following along. Are you handling the \[social / digital / marketing\] side yourself?"

**If they respond positively:**

"Nice — how''s it going? Are you getting good traction from it or more just keeping the lights on so to speak?"

**After they share their situation:**

"Got it. Sounds like the main gap is \[their specific problem\]. That''s actually really common for \[their business type\] — the \[organic posts / email / whatever they mentioned\] takes forever to compound. Are you open to a quick conversation about what a faster approach might look like for your situation?"

---

### **Template Set 4: DM → Email Transition**

When the conversation is going well but you want to move them into your email system:

"I actually have a \[free guide / email series / resource\] that covers exactly what we''ve been talking about — it would give you the full picture rather than me trying to explain it all in DMs. Can I grab your email and send it over?"

---

### **Template Set 5: DM → Call Transition (for B2B)**

"I could try to explain all of this in here but honestly it would take forever and I''d rather just show you. Would you be open to a 20-minute call? I can screen-share and walk you through exactly what I''d do for \[their business specifically\]."

Use Calendly (free tier available) for booking calls — it lets people pick a time from your availability without the back-and-forth.

**Affiliate note:** 👉 [**Set up your free Calendly booking link — \[YOUR CALENDLY AFFILIATE LINK\]**](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 5, 'Section 3: Objection Handling', 'Objections are not rejections. An objection means they''re interested enough to engage with reasons not to. Here''s how to handle the most common ones:

---

**"I''ve tried stuff like this before and it didn''t work."**

Don''t argue with their experience. Validate it.

"That''s genuinely the most common thing I hear — and it''s usually not because the person didn''t try hard enough. It''s because the thing they tried was either misrepresented or didn''t give them the complete picture. Can I ask what you tried? Because that actually tells me a lot about what would be different this time."

---

**"I don''t have time right now."**

"Totally fair — I''m not trying to add to your plate. Can I ask though — is it that you literally have no extra hours, or more that you don''t want to spend time on something that might not pan out? Because those are two different problems."

If it''s a genuine time issue:

"That makes sense. What does your schedule look like in the next 4–6 weeks — is there a point where you''d have a bit more bandwidth? I''m not in any rush."

---

**"I can''t afford it right now."**

"That''s real — I''m not going to push you on that. Can I ask what ''afford it'' looks like? Because sometimes people mean ''not a priority'' and sometimes they mean literally cash constrained right now. No judgment either way — it just changes what I''d suggest."

If genuinely cash constrained:

"Understood. There''s actually a lot you can do with the free parts — the funnel, the tools, the organic content — before spending anything. You don''t need the paid stuff to get started. Want me to point you at where to begin without spending?"

---

**"I need to think about it."**

This usually means one of: they''re not sold, they''re not sure, or they''re waiting for a reason to say yes.

"Of course — take your time. Can I ask what specifically you''re thinking through? Sometimes talking it out helps, and if there''s a specific concern I might be able to address it."

---

**"Is this going to work for me specifically?"**

"I can''t promise results because that depends on you — and I''d be lying if I said otherwise. What I can tell you is \[what the system does, specifically\]. Whether that translates to results depends on \[what''s actually required — time, consistency, following the steps\]. Does your situation align with that?"

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 6, 'Section 4: The Non-Salesy DM Strategy — The Meta Principle', 'Here''s the thing nobody writes in their DM template guides: the best DM strategy is to stop thinking about closing and start thinking about connecting.

People can feel when someone is listening versus when someone is waiting for their turn to pitch. They can feel when someone actually gives a damn about their situation versus when someone is running them through a script.

The counterintuitive truth: the less you try to sell in DMs, the more you sell.

Your actual goal in a DM conversation is to understand the person''s situation well enough that if there''s a genuine fit, they see it themselves. You''re a guide, not a closer. You''re helping them figure out if your offer makes sense for them — not convincing them it does.

This is also why qualifying matters so much. When you''re willing to say "I don''t think this is right for you right now," the people you DO say "I think this could really help" to actually believe you.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 7, 'Module 7 Action Checklist', '* \[ \] DM flow framework printed or saved for reference  
* \[ \] Template sets adapted to your voice and saved  
* \[ \] Objection responses saved for reference  
* \[ \] Calendly free account set up and booking link created (for B2B)  
* \[ \] Idea bank updated with content angles from DM conversations (questions people ask you are content)

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-7-dm-lead-close', 8, 'What''s Next', 'You''ve built the full front end of your system:

* Foundation and path chosen (Modules 1a \+ 1b)  
* Funnel live and collecting leads (Module 2\)  
* Email system running automated sequences (Module 3\)  
* Automation tracking and notifying (Module 4\)  
* Traffic strategy executing (Module 5\)  
* Content machine producing consistently (Module 6\)  
* Conversations converting (Module 7\)

Now it''s time to fill the system with the right offers — things worth promoting, things that will actually convert for your audience, evaluated against a framework that filters out the garbage.

**Module 8: The Offer Vault** — the full written guide to finding, evaluating, and plugging in offers across every path, with real examples, commission breakdowns, and the complete promotion plug-in guide for each.

See you there.

---

*The Kraken Vault — Crack the Code to Generating Income Online* *Modules 5, 6, and 7 of 10*

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 1, 'Fast-Track — Already Know What You''re Promoting?', '* # **Have an offer picked and just need the plug-in guide? Jump to Section 4**

* # **Want to find new offers? Start at Section 2 — Where to Find Offers**

* # **Just want the evaluation checklist? Jump to Section 3**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 2, 'What This Module Actually Is', '**Every other module in The Kraken Vault built the machine. The funnel, the emails, the automation, the content, the DM system — that''s the infrastructure. It''s real and it works.**

**But a machine with nothing in it doesn''t produce anything.**

**This module is the fuel. It''s the answer to "okay, but what exactly do I promote?" — answered specifically, honestly, and with enough detail that you can pick something and go, not spend three more weeks researching.**

**Here''s what separates this module from what you''d find in a typical affiliate marketing course:**

**Most courses give you a list of platforms and tell you to "find something in your niche." That''s not useful. You don''t need a list of marketplaces. You need to know which specific types of offers work at which stage of your business, how to tell a good offer from a garbage one before you spend time promoting it, and exactly how to connect each offer type to the system you''ve already built.**

**That''s what this module delivers.**

**By the end you''ll have:**

* # **A clear offer for each stage of your business (low-ticket entry offer, mid-ticket core offer, recurring SaaS offers)**

* # **An evaluation system you can run any offer through in under 10 minutes**

* # **A sourcing guide for each offer category so you always know where to look**

* # **Real offer examples with honest breakdowns of what they pay and how they convert**

* # **The complete plug-in guide for each offer type — funnel strategy, email angle, content angle, DM strategy, and how it connects to your specific setup**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 3, 'Section 1: The Offer Stack — How a Real Business is Built', '**Before we look at specific offers, you need to understand how offers layer together. A single affiliate offer is not a business. A stack of complementary offers that serve your audience at different stages — that''s a business.**

**The three-tier offer stack:**

---

### **Tier 1: The Entry Offer (Low friction, high volume)**

**Price range: Free to $47 Purpose: Get people into your world and start a buying relationship**

**Your entry offer is the thing with the lowest barrier. For most people in this course, that means:**

* # **Your free lead magnet (the thing that gets them on your list)**

* # **A low-ticket affiliate product under $47**

* # **A free trial of a SaaS tool you''re affiliated with**

* # **Amazon deals (effectively free to the buyer — you earn on what they buy anyway)**

**The entry offer doesn''t make you rich. It identifies the people who are actually willing to take action — the ones who will later buy your core offers.**

---

### **Tier 2: The Core Offer (Main revenue driver)**

**Price range: $47–$297 Purpose: This is where you make real money**

**Your core offer is the thing that solves the main problem your audience has. This is typically a digital course, a comprehensive guide, a software tool with a meaningful subscription, or your own product (Path A in Module 10).**

**For affiliate marketers, this tier typically delivers the bulk of commission income — high enough to matter, accessible enough that your audience can buy without too much deliberation.**

---

### **Tier 3: The Recurring Offer (Long-term compound income)**

**Price range: $9–$99/month Purpose: Monthly income that grows without extra work**

**SaaS tools and membership communities that pay you a recurring monthly commission are the most valuable type of affiliate income in terms of lifetime value. Refer 30 people to a $29/month tool at 30% commission and you''re earning $261/month from that one promotion — every month, indefinitely, without doing anything more.**

**The goal over time is to build a portfolio of recurring offers that generates a floor of predictable monthly income regardless of whether you run an active promotion that month.**

---

**What the full stack looks like in practice:**

| Tier | Example | Your earnings |
| ----- | ----- | ----- |
| **Entry** | **Amazon affiliate deal (buyer gets a $35 product)** | **$1.05–3.50 one time** |
| **Entry** | **Free MailerLite trial (they sign up, start free)** | **$0 now, recurring later when they upgrade** |
| **Core** | **Beginner affiliate marketing course ($197)** | **$98–148 one time** |
| **Core** | **DashNex website builder (one-time fee)** | **$50–150 one time** |
| **Recurring** | **MailerLite paid plan ($15–30/month)** | **$4.50–9/month per person** |
| **Recurring** | **Helium 10 Amazon tools ($37–99/month)** | **$9–25/month per person** |
| **Recurring** | **n8n Render hosting (\~$7/month)** | **Referral credit per person** |

**Build toward having one active offer in each tier at all times. The entry offers bring people in. The core offers generate real income. The recurring offers compound quietly in the background.**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 4, 'Section 2: Where to Find Offers — The Sourcing Guide', '### **Amazon Associates — Your First and Always-On Offer**

**What it is: Amazon''s affiliate program. You get a unique link for any Amazon product. When someone clicks your link and buys anything from Amazon within 24 hours, you earn a commission on the entire cart — not just the product you linked.**

**How to sign up:**

**Step 1: Go to [affiliate-program.amazon.com](https://affiliate-program.amazon.com/)**

**Step 2: Sign in with your existing Amazon account or create one**

**Step 3: Fill out your profile — website URL (use your domain, even if it''s just your opt-in page right now), how you plan to drive traffic, your niche**

**Step 4: Read and agree to the operating agreement — actually read the key parts:**

* # **You must disclose your affiliate relationship on any page or content containing Amazon links**

* # **You cannot use Amazon affiliate links in emails (this is a frequently violated rule — link to your website or deal site from emails, then put the Amazon links on the site)**

* # **You must make at least 3 qualifying sales within your first 180 days or the account closes (you can reapply)**

**Step 5: Once approved, go to your Associates dashboard → "Product Linking" → "Link Builder" to generate your first affiliate links**

**The Amazon commission rate table (as of course publication — verify current rates at affiliate-program.amazon.com):**

| Category | Commission Rate |
| ----- | ----- |
| **Amazon Games** | **20%** |
| **Luxury Beauty, Luxury Stores Beauty** | **10%** |
| **Digital Music, Physical Music, Handmade** | **5%** |
| **Physical Books, Kitchen, Automotive** | **4.5%** |
| **Amazon Echo, Fire TV, Kindle** | **4%** |
| **Toys, Furniture, Home, Pet Products** | **3%** |
| **Computers, PC Components** | **2.5%** |
| **Televisions, Digital Video Games** | **2%** |
| **Grocery, Health/Personal Care** | **1%** |
| **Gift Cards, Wireless Service Plans** | **0%** |

**The categories worth focusing on: Luxury Beauty (10%), Handmade (5%), Books and Kitchen (4.5%). The categories to avoid for affiliate income: Gift Cards, Grocery, and TVs (too low to matter unless volume is massive).**

**How to get your first Amazon affiliate links:**

**Step 1: Log into your Associates account**

**Step 2: Go to any Amazon product page while logged into Associates — you''ll see a grey toolbar at the top of Amazon called the "SiteStripe"**

**Step 3: On any product page, click "Text" in the SiteStripe to get a short affiliate link for that specific product**

**Step 4: Copy that link — it''s your affiliate link for that product**

**Step 5: Use your link in your content (NOT directly in emails — put it on your deal site or a link-in-bio page instead)**

---

### **Digistore24 — Digital Products and Courses**

**What it is: One of the largest digital product marketplaces. Courses, ebooks, software, coaching programs, and membership sites across hundreds of niches. Commission rates typically 40–75%.**

**How to sign up:**

**Step 1: Go to [digistore24.com](https://www.digistore24.com/)**

**Step 2: Click "Register" → select "Affiliate" as your account type**

**Step 3: Fill in your personal and payment details (they pay via PayPal, bank transfer, or check)**

**Step 4: Verify your email**

**Step 5: Log into your dashboard → click "Marketplace" to browse offers**

**How to find good offers in Digistore''s marketplace:**

**Step 1: In the Marketplace, filter by your niche category**

**Step 2: Sort by "Earnings per Referral" — this tells you the average amount affiliates earn per sale (accounts for upsells and average order value)**

**Step 3: Look at the "Cancellation Rate" — lower is better. A high cancellation rate means buyers are refunding, which means either the product doesn''t deliver or it was misrepresented. Avoid anything above 15–20% cancellation.**

**Step 4: Check the "Conversion Rate" — this is how many visitors to the sales page actually buy. Above 1% is decent. Above 3% is strong.**

**Step 5: Look at the vendor''s support score and whether they provide affiliate materials (email swipes, banners, social content). Vendors who support their affiliates properly usually have better products.**

**Step 6: Before promoting anything, either buy it yourself, request a review copy from the vendor, or spend time deeply researching what''s inside. You''re putting your name behind this product with your audience. Promoting garbage once costs you trust that took months to build.**

---

### **ClickBank — The Original Digital Marketplace**

**What it is: The original and still one of the largest digital affiliate marketplaces. ClickBank has a reputation problem — there''s a lot of low-quality stuff on there — but there are also legitimate, high-converting products if you know how to filter.**

**How to sign up:**

**Step 1: Go to [clickbank.com](https://clickbank.com/) and click "Sign Up"**

**Step 2: Fill in your account information → complete signup**

**Step 3: Go to the Marketplace to browse products**

**How to filter for quality on ClickBank:**

**ClickBank uses a metric called "Gravity" — a score that represents how many affiliates have made a sale in the past 12 weeks, weighted by recency. High gravity means many affiliates are actively making sales. But gravity alone doesn''t tell you if it''s a good product.**

**Filters to apply:**

* # **Gravity: 20–100 is a sweet spot. Very high gravity (200+) means heavy competition. Very low gravity means either new or poor converting.**

* # **Average $/sale: what you actually earn per transaction after refunds**

* # **Initial $/conversion vs rebill: "rebill" means there''s a subscription component — recurring commission**

* # **Refund rate: ClickBank doesn''t display this directly but you can infer from Gravity vs. earnings — if a product has high gravity but low average earnings, refunds are eating the commissions**

**The ClickBank categories worth focusing on:**

* # **Health and fitness (massive demand, strong recurring products)**

* # **Make money online / e-business (your niche — be very selective here, lots of hype)**

* # **Home and garden**

* # **Sports (golf, fishing, fitness niches within sports)**

**The categories to avoid: anything that makes claims that sound too good to be true (they usually are and they''ll get you associated with garbage), anything in the weight loss space that makes extreme claims.**

---

### **ThriveCart — Higher Quality, Direct Relationship**

**What it is: ThriveCart is a shopping cart platform that many premium course creators and digital product sellers use. Many of them run affiliate programs through ThriveCart directly rather than through a marketplace.**

**This means to find ThriveCart affiliates, you typically need to:**

* # **Have a relationship with the creator**

* # **Apply directly through their affiliate application**

* # **Be referred by someone already in their affiliate program**

**How to get into ThriveCart affiliate programs:**

* # **Buy products you love that are built on ThriveCart and email the creator to ask about their affiliate program**

* # **Follow creators in your niche who you''d genuinely recommend and build a relationship with them first**

* # **Look for affiliate program application pages on the sales pages of products you buy**

---

### **Gumroad and Other Creator Platforms**

**Many individual creators sell their products on Gumroad, Lemon Squeezy, or their own Shopify/WordPress stores and run their own affiliate programs outside of marketplaces.**

**How to find these:**

* # **Browse creators in your niche on Twitter/X and YouTube — many mention their affiliate programs in their bios or pinned posts**

* # **Look for the word "Affiliates" in the footer of any product website you visit**

* # **Search "\[your niche\] affiliate program" on Google — many creators have standalone affiliate pages**

---

### **SaaS Affiliate Programs — The Recurring Income Layer**

**These are the programs where you earn a percentage of the monthly subscription fee every month someone you referred stays subscribed. Build a portfolio of 3–5 of these and you create a floor of predictable monthly income.**

**The programs to sign up for immediately (all free to join):**

**MailerLite Partner Program**

* # **Commission: 30% recurring for the life of the customer**

* # **Cookie duration: 90 days**

* # **Sign up: [mailerlite.com/affiliate-program](https://mailerlite.com/affiliate-program)**

* # **What to promote: Sign up for free, upgrade when you hit limits. Your tutorial content from Module 6 is perfect for this.**

**EmailOctopus Affiliate Program**

* # **Commission: 20% recurring**

* # **Sign up: Available in your EmailOctopus account under "Referrals"**

* # **What to promote: The simplest email setup — great for absolute beginners who want fewer features**

**Canva Affiliate Program**

* # **Commission: Up to $36 per Canva Pro subscriber referred**

* # **Sign up: Through Impact (the affiliate network Canva uses) — search "Canva affiliate program" to find the current application link**

* # **What to promote: Canva Pro free trial — any design-related content**

**Render Affiliate Program**

* # **Commission: Referral credits toward your own hosting**

* # **Sign up: In your Render dashboard under "Referrals"**

* # **What to promote: Your n8n on Render setup guide from Module 4**

**Helium 10 Affiliate Program**

* # **Commission: 25% recurring monthly**

* # **Helium 10 plans: $37–$197/month**

* # **Your earnings per referral: $9.25–$49.25/month per person, every month**

* # **Sign up: [helium10.com/affiliate](https://helium10.com/affiliate)**

* # **What to promote: Any Amazon seller content — deal content, arbitrage content, FBA content**

**DashNex Affiliate Program**

**👉 [Your DashNex affiliate opportunity — \[YOUR DASHNEX AFFILIATE LINK\]](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)**

* # **Commission: Your current rate**

* # **What to promote: The no-monthly-fee angle for anyone who wants a funnel or store builder without the Shopify subscription**

**Namecheap Affiliate Program**

* # **Commission: 20% of the first purchase**

* # **Sign up: [namecheap.com/affiliates](https://www.namecheap.com/affiliates/)**

* # **What to promote: The first thing anyone building online needs — your domain setup tutorial is the natural home for this**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 5, 'Section 3: The Offer Evaluation System — 10-Minute Vetting Process', '**Before you spend a single hour promoting any offer, run it through this system. This is the difference between professional affiliate marketing and gambling.**

---

### **Check 1: The Demand Test**

**The question: Do people already want this?**

**How to check:**

* # **Search the product name or the problem it solves on Google — are there other affiliates promoting it? People discussing it in forums? YouTube videos about it? Existing demand is proof the market is real.**

* # **Search the problem on Reddit (not the product) — are people actively complaining about this problem and asking for solutions?**

* # **Check Amazon (even for non-physical products) — are there books in this topic category? Books in a niche confirm the niche is real.**

* # **Check the product''s own social proof — testimonials, case studies, user counts. Real products have real users.**

**Pass criteria: You can find clear evidence that people actively seek solutions to the problem this product addresses.**

**Fail criteria: The product is a solution looking for a problem. The only people talking about it are affiliates.**

---

### **Check 2: The Simplicity Test**

**The question: Can I explain what this does in one sentence to a stranger?**

**Say this out loud: "This is a \[product type\] that helps \[specific person\] achieve \[specific result\] by \[specific mechanism\]."**

**Example that passes: "This is an email marketing platform that helps small business owners build and email their subscriber list automatically."**

**Example that fails: "This is a comprehensive system that leverages cutting-edge strategies to optimize your online presence and unlock the full potential of your digital marketing ecosystem."**

**If you can''t explain it simply, your audience won''t understand it either. And if they don''t understand it, they won''t buy it.**

**Pass criteria: One clear sentence. Understandable by someone with no background in the topic.**

**Fail criteria: Requires multiple paragraphs of explanation. Heavy on vague language, light on specific outcomes.**

---

### **Check 3: The Profitability Test**

**The question: Does the math work for your situation?**

**The calculation:**

**(Traffic to offer) × (Conversion rate) × (Commission per sale) \= Monthly earnings**

# 

**Example:**

**500 monthly visitors to your offer**

**× 2% conversion rate**

**× $75 commission**

**\= $750/month**

# 

**Now ask: is that realistic traffic number achievable with your current content and list? Is the 2% conversion rate consistent with what the vendor claims or what other affiliates report?**

**For recurring offers:**

**(New referrals per month) × (Commission per referral) × (Average months subscribed) \= Lifetime value per referral**

# 

**Example:**

**5 new MailerLite signups per month**

**× $5/month average commission (30% of $17/month plan)**

**× 18 months average subscription**

**\= $90 lifetime value per referral**

**× 5 referrals/month**

**\= $450/month in 18 months from this one program**

# 

**Pass criteria: The math produces a meaningful number at realistic traffic levels. The commission per sale is high enough that a reasonable conversion rate creates real income.**

**Fail criteria: You need thousands of clicks to make $20. The commission structure makes the math only work at volumes you''re years away from.**

---

### **Check 4: The Fit Test**

**The question: Does this offer serve your specific audience at their current stage?**

**This is the check most beginners skip — and it''s why they promote things that don''t convert even when the offer itself is good.**

**A beginner audience is not ready for a $497 advanced tool. An advanced audience will roll their eyes at a $17 beginner guide. The offer has to match where your audience actually is.**

**Ask:**

* # **Is my audience likely at the stage where this product is the right next step?**

* # **Does buying this product require knowledge or resources my audience doesn''t have?**

* # **Is the price point appropriate for my audience''s current financial situation?**

* # **Would buying this product immediately benefit someone who just opted into my list?**

**Pass criteria: A significant portion of your current audience would benefit from this product right now, at their current stage.**

**Fail criteria: The product is perfect — but for a different audience, or an audience that''s further along than yours.**

---

### **Check 5: The Integrity Test**

**The question: Can I promote this honestly?**

**This is the check that determines whether you keep your audience''s trust long-term.**

**Ask:**

* # **Have I personally used this, or researched it thoroughly enough to represent it accurately?**

* # **Are the claims on the sales page truthful? (If the vendor claims their subscribers "earn an average of $5,000/month in passive income," that''s a red flag unless they have legitimate data to back it.)**

* # **Would I recommend this to someone I care about, knowing what I know about it?**

* # **Is the refund policy fair and honored?**

* # **If this product disappoints my subscriber, will they blame the product or me?**

**Pass criteria: You can promote this with complete honesty about what it does and what it doesn''t do. You''d be comfortable telling your best friend to buy it.**

**Fail criteria: You''re finding yourself writing around certain claims. The reviews you''re finding outside of the vendor''s site are mostly negative. The offer requires hype to make it sound compelling.**

---

### **The 10-Minute Evaluation Sheet**

**Use this before every new offer. Copy it to a Google Doc or your Business Hub spreadsheet:**

**Offer: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Price: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Commission: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Platform: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Date evaluated: \_\_\_\_\_\_\_\_\_\_\_\_\_\_**

# 

**DEMAND TEST**

**Evidence of existing demand: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Reddit discussion? Y / N**

**Other affiliates promoting? Y / N**

**Result: PASS / FAIL**

# 

**SIMPLICITY TEST**

**One sentence description: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

**Would a stranger understand it? Y / N**

**Result: PASS / FAIL**

# 

**PROFITABILITY TEST**

**Estimated monthly traffic I can send: \_\_\_**

**Realistic conversion rate: \_\_\_ %**

**Commission per sale: $\_\_\_**

**Estimated monthly earnings: $\_\_\_**

**For recurring: lifetime value per referral: $\_\_\_**

**Result: PASS / FAIL**

# 

**FIT TEST**

**Does this serve my audience at their current stage? Y / N**

**Price appropriate for my audience? Y / N**

**Would they benefit from it today? Y / N**

**Result: PASS / FAIL**

# 

**INTEGRITY TEST**

**Have I used or thoroughly researched this? Y / N**

**Claims are accurate and verifiable? Y / N**

**I''d recommend this to a close friend? Y / N**

**Result: PASS / FAIL**

# 

**OVERALL: PROMOTE / HOLD / REJECT**

**Notes: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

# 

**Any offer that fails two or more checks gets rejected immediately. One fail gets a closer look and a decision. All passes — promote it.**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 6, 'Section 4: Real Offer Examples — 8 Fully Broken Down', '**These are real offer types with realistic commission structures and honest assessments of what it takes to convert them. This is the section you come back to whenever you''re picking your next offer.**

---

### **Offer 1: Amazon Associates — Kitchen Gadget Deals**

**Type: Physical product affiliate Commission: 4.5% (Kitchen category) Example product: A well-reviewed immersion blender at $45 Your commission per sale: \~$2 This is a volume play — not a per-sale play**

**Why this works for beginners: Zero barrier to entry. No approval process beyond Amazon Associates. Content is easy to create because you''re not making up benefits — you''re reporting what 12,000 reviewers already said. The deal site angle (Module 2\) means this earns passively through SEO over time.**

**Realistic earnings scenario: Your deal site gets 300 visitors/month. 15% click through to Amazon. Amazon converts at their average of \~10–13% of clickers to buyers. Average order value: $45. 300 × 15% × 12% × 4.5% \= \~$2.43/day \= \~$73/month from 300 visitors.**

**That sounds small — but your deal site''s traffic compounds with SEO. 300 becomes 600, then 1,200. And buyers buy multiple items. The 24-hour cookie means you earn on everything in their cart.**

**Funnel strategy: Deal site (Module 2\) as the hub. Opt-in page collects emails. Weekly deal digest email drives traffic back to site. TikTok deal alerts drive cold traffic to bio link → site.**

**Email angle: Weekly deal digest. Subject line formula: "5 Amazon finds under $30 this week (the one in spot \#3 usually sells out by Thursday)." Pure value, no pitch — the affiliate links are in the deals themselves.**

**Content angle: Green screen product review. "This blender has 47,000 reviews — here''s the top complaint and whether it matters." No product required. Just the Amazon listing and your commentary.**

**DM strategy: Low DM involvement for Amazon deals — the system runs itself. DMs are for answering subscriber questions about specific products or deals.**

**Affiliate link placement: Never in emails. On your deal site, on a link-in-bio landing page, in your bio-linked content.**

---

### **Offer 2: MailerLite — Recurring Email Platform Affiliate**

**Type: SaaS, recurring commission Commission: 30% of monthly subscription MailerLite plans: Free (up to 1,000 subscribers), then $9–$19/month for most users Your commission range: $2.70–$5.70/month per referred paying user Cookie duration: 90 days**

**Why this works: Every single person who goes through your funnel needs an email platform. You''re already recommending it in Module 3\. Converting your own course students into MailerLite signups through your affiliate link is the most natural affiliate tie-in in the course.**

**The compounding math: 50 referred paying users × $4/month average commission \= $200/month recurring. 100 referred users \= $400/month recurring. This grows as more people follow your content and sign up for their own email platforms.**

**Realistic conversion expectation: Of everyone who downloads your lead magnet and needs email marketing help, 20–30% will sign up for an email platform. Of those, 60–70% will use MailerLite if you show them how in your content. This is the highest natural conversion rate of any offer in this module because the need and the timing are perfectly aligned.**

**Funnel strategy: Tutorial funnel. Opt-in for a free guide called "How to Set Up Your Email System From Scratch (Free Tools Included)." The guide and follow-up sequence teach email setup using MailerLite. Every tutorial step includes your affiliate link.**

**Email angle: Tool tip series. "This week: how to set up your first automated welcome sequence in MailerLite." Five educational emails, one email with the affiliate link framed as "here''s where to start if you haven''t signed up yet."**

**Content angle: Tutorial videos. "How I set up my email welcome sequence in 30 minutes (free tool)." MailerLite dashboard walkthroughs. "MailerLite vs EmailOctopus — which one is right for you?" (covers both affiliate links.)**

**DM strategy: When someone asks "what email platform do you use?" in your comments or DMs — "I use MailerLite. Happy to send you the setup guide I put together if you want it." → send your tutorial lead magnet → affiliate link is embedded throughout.**

---

### **Offer 3: Helium 10 — Amazon Seller Tools (Recurring)**

**Type: SaaS, recurring commission Commission: 25% recurring monthly Helium 10 plans: Starter $37/month, Platinum $99/month, Diamond $197/month Your commission: $9.25–$49.25/month per user, every month**

**Why this works: Anyone pursuing Path 1 (Amazon affiliate deals) or Path 5 (retail arbitrage) eventually wants proper Amazon research tools. Helium 10 is the industry standard. By the time someone is 60 days into their Amazon affiliate or arbitrage journey, they''re ready for a tool like this.**

**This is a mid-journey offer, not a day-one offer. Don''t pitch it to brand new subscribers. Position it as the tool you graduate to once you''ve validated that Amazon is your path.**

**Funnel strategy: A dedicated "level up your Amazon game" funnel. After someone has been on your list for 30–60 days and has engaged with your Amazon content. Bridge page: "You''ve been building your Amazon affiliate business for a while now — here''s the tool that serious Amazon affiliates and sellers use to find opportunities faster."**

**Email angle: "The tool I started using when I got serious about Amazon (and what it showed me immediately)." Story-based email about the first thing you searched in Helium 10 and what you discovered. Honest and specific.**

**Content angle: "I ran Amazon keyword research on \[popular deal product category\] and here''s what I found." Show the Helium 10 interface on screen. "This is why I stopped guessing what to promote on Amazon."**

**DM strategy: When someone in your audience mentions they''re doing Amazon seriously — "Have you looked at Helium 10 yet? It changed how I approach the whole thing. They have a free trial — I can send you a link."**

---

### **Offer 4: A Beginner Digital Marketing Course on Digistore24**

**Type: Digital course, one-time commission Typical commission: 50–60% of sale price Typical course price range: $37–$197 Your earnings per sale: $18.50–$118**

**Important note on selecting this type of offer: Do not pick a specific course and name it here as a permanent recommendation — course quality changes, vendors go out of business, and offers come and go. Instead, here is the selection criteria for picking the right one from Digistore24''s marketplace:**

**How to select a solid beginner digital marketing course on Digistore24:**

1. # **Go to Digistore24 Marketplace → filter "Online Marketing" category**

2. # **Sort by "Earnings per Referral" — look for $30–$80 in this range for beginner courses**

3. # **Cancellation rate below 10%**

4. # **Conversion rate above 2%**

5. # **The vendor has affiliate resources: email swipes, social content, banner ads**

6. # **Watch the sales video yourself — does it make realistic claims? Does it explain what''s inside clearly? Or is it 20 minutes of lifestyle footage and vague promises?**

7. # **If the sales page makes income claims, look for the disclaimer disclosing average results. If there''s no disclaimer, that''s a red flag.**

8. # **Check Google for "\[Course Name\] review" — read 5+ independent reviews before promoting**

**The offer you choose in this category should be something you''d buy yourself at that price.**

**Funnel strategy: Bridge page funnel. Your lead magnet speaks to the same beginner problem the course solves. Welcome sequence teaches and builds trust over 5 emails. Email 5 is the soft pitch. Conversion campaign (Module 9 Flow A) once a quarter with the course as the feature offer.**

**Email angle: "The course I wish existed when I started." Story email about your own beginning, what you tried, what you wish you''d had — and the closest thing to it that actually exists.**

**Content angle: "Before you spend money on a course, check these 5 things." Makes you look trustworthy. Ends with: "The one course that passed all 5 of my checks is \[course name\]."**

**DM strategy: Qualify first. "Are they at the beginning of their online business journey?" If yes → "The resource I keep pointing beginners to is \[course\] — want me to tell you what''s in it before you decide?"**

---

### **Offer 5: DashNex — Website and Funnel Builder (One-Time Fee)**

**👉 [Your DashNex affiliate link — \[YOUR DASHNEX AFFILIATE LINK\]](https://claude.ai/chat/f3c03159-5572-4285-9c1f-fa9f116b8cf4)**

**Type: Software tool, one-time purchase Commission: Your current affiliate rate Key selling point: One-time fee vs. Shopify ($39+/month), Kajabi ($119+/month), Clickfunnels ($97+/month)**

**Why this converts: The pain point is real and universal — people are tired of paying monthly fees for tools they''re barely using. DashNex solves a problem your audience has directly stated: "I want to build a funnel or store without another subscription."**

**The conversion window is high right after Module 2, when students have just learned how to build a funnel and are evaluating whether to go the free Cloudflare route or pay once for a simpler builder.**

**The honest angle: Don''t oversell. Be clear about what DashNex does well (simplicity, one-time fee, good for beginners who don''t want to touch code) and where the Cloudflare \+ GitHub route might be better (more flexibility, genuinely free, better for deal sites and custom builds). Letting people self-select the right option for them builds trust — and the people who need the simpler option convert better because they weren''t pushed.**

**Funnel strategy: Positioned as an alternative within Module 2 of the course (already done), plus a standalone comparison funnel: "Free vs. Paid Funnel Builders — What''s Actually Worth It?" lead magnet → welcome sequence → DashNex pitch to the people who said they want simplicity.**

**Email angle: "The $X I spent instead of paying $97/month forever." Calculate the break-even point — how many months of Clickfunnels does DashNex cost? If DashNex is a one-time fee that equals 2 months of a competitor, the math is obvious.**

**Content angle: Side-by-side comparison video. Build the same simple funnel in DashNex and in Cloudflare Pages. Show the time difference, the skill level required, and the cost difference. "Here''s who each one is right for."**

**DM strategy: When someone says they want to build a funnel but doesn''t want to deal with code — "Have you looked at DashNex? It''s what I use when I want to move fast without touching GitHub. One-time fee, drag and drop. Here''s my link."**

---

### **Offer 6: White Label Soap / Personal Care (Barz of Soap Model)**

**Type: White label physical product (for Path 4 students) Your margin: 60–80% at scale, depending on volume and supplier This is a Path 4 offer — for students who chose white label physical products as their path**

**The supplier side: Barz of Soap is an example of a white label personal care supplier. The model: they make it, you brand it, you sell it as your own. Similar suppliers exist for:**

* # **Skincare and cosmetics (beauty is one of the strongest white label markets)**

* # **Coffee and tea**

* # **Supplements (requires more regulatory awareness — research this carefully before entering)**

* # **Candles and home fragrance**

* # **Pet products**

**Finding white label suppliers:**

* # **Faire (faire.com) — a wholesale marketplace with white label options**

* # **Alibaba — international manufacturers, often with white label minimum order quantities starting at 100–500 units**

* # **Search "\[your product\] white label supplier" or "\[product\] private label manufacturer"**

* # **Trade shows in your industry category (COSMOPROF for beauty, for example)**

**Evaluating a white label supplier:**

1. # **Request samples before placing any order — you''re putting your name on this product**

2. # **Ask about minimum order quantities (MOQ) — lower is better to start**

3. # **Ask about their labeling process — do they handle it or do you?**

4. # **Ask about lead times — how long from order to delivery**

5. # **Check whether they have any certifications relevant to your product (FDA registration for food/supplements, cruelty-free certification for cosmetics, etc.)**

6. # **Get a formal quote in writing before committing**

**Funnel strategy: Brand story landing page. Your product page is not just a store — it''s the story of why you created your brand and who it''s for. "I created \[Brand Name\] because \[the problem you were tired of / the gap you saw in the market\]." DashNex or Shopify for the store.**

**Email angle: The launch sequence. "We''re launching in \[X days\]" → "The story behind \[Brand Name\]" → "Here''s the first product — and why we made it this way" → "Now open — founding customer offer." Build anticipation before launch, not just after.**

**Content angle: The "I built my own brand" series. Starting from sourcing, showing the sample, designing the label in Canva, receiving the first shipment, packaging the first orders. This is the most shareable category of content in e-commerce because it makes entrepreneurship real and accessible.**

**DM strategy: "We just launched — want to try a sample?" Low barrier opening for brand DMs. People who try the product become your best content and your best affiliate candidates (build your own affiliate program after launch).**

---

### **Offer 7: Your Own Automation Templates / n8n Workflow Pack**

**Type: Your own digital product (Path A) Price range: $27–$67 Your margin: 100% (minus payment processing fees of \~3%)**

**Why this belongs in the Offer Vault: By the time you complete Module 4 of The Kraken Vault, you''ve built real automation workflows. The n8n workflows, Google Apps Scripts, and Cloudflare Workers you built while going through this course are things that would take someone else days or weeks to figure out and build from scratch. That knowledge and those built assets have real value.**

**Your automation template pack could include:**

* # **The 5 core n8n workflows from Module 4 (importable JSON files)**

* # **The Google Apps Scripts from Module 4 (copy-paste ready)**

* # **A setup video walkthrough for each workflow (recorded with Loom — free)**

* # **A "customize this for your business" guide**

**This is the easiest first product to create because you built it while doing this course. The work is already done. You''re just packaging and documenting it.**

**Validation test: Post one piece of content showing your automation stack running. Count the "how do you do that?" comments. If you get more than 10, you have a product.**

**Funnel strategy: Automation-focused lead magnet (e.g., "The Free n8n Workflow That Notifies You Every Time Someone Joins Your Email List") → welcome sequence teaching automation concepts → pitch the full template pack.**

**Email angle: "The 5 automations I run that would take most people 20 hours to build from scratch — and I''m selling the whole pack for $47." Direct and specific.**

**Content angle: Screen recording of your automation system running in real time. Show the Telegram notification arriving, the Google Sheet updating, the email firing. "Here''s my entire automation setup running — and I packaged the whole thing."**

**DM strategy: "I just packaged my automation setup into a template pack — \[X\] people have asked me how I built it. Want to see what''s in it?" → link to sales page.**

---

### **Offer 8: B2B Local Marketing Retainer (Service Offer)**

**Type: Your own service (Path 6\) Price range: $300–$2,500/month depending on scope Your margin: 85–95% (your time is the main cost)**

**This isn''t an affiliate offer — it''s your own service. It belongs in the Offer Vault because it''s the highest-ticket offer available to you and needs its own plug-in guide.**

**Packaging your service:**

**Don''t sell "social media management." Sell a specific outcome with a specific scope.**

**Package examples:**

**The Visibility Package — $297/month:**

* # **12 pieces of social content per month (3 per week)**

* # **Branded graphics in Canva**

* # **Captions and hashtags**

* # **Posted on 2 platforms**

* # **Monthly performance report**

**The Lead Machine Package — $597/month:**

* # **Everything in Visibility**

* # **Email list setup and monthly newsletter**

* # **Basic lead capture form on their website**

* # **Monthly list growth report**

**The Full System Package — $1,200+/month:**

* # **Everything in Lead Machine**

* # **Paid ad management ($300+ ad spend not included)**

* # **n8n automation for lead capture and follow-up**

* # **Weekly performance calls**

* # **Monthly strategy adjustments**

**The automation angle that makes you different: Every competitor selling local marketing services delivers manually. You deliver the same outputs with automation behind the scenes — which means you can handle more clients at the same time, respond faster (automation fires immediately, not when you wake up), and deliver data that manually-operated agencies don''t bother collecting.**

**Your n8n setup from Module 4 is the engine. For each client:**

* # **New lead form submission → automatic SMS/email notification to the business owner → logged to their Google Sheet**

* # **New Google review → automatic Telegram alert to the owner**

* # **Social posting scheduled → auto-posted via social scheduling tool**

* # **Weekly performance data → pulled and formatted automatically into a report**

**Funnel strategy: Local business audit funnel. Lead magnet: "Free 5-Minute Social Media Audit for \[City\] Businesses." Opt-in page targeting local business owners. Lead magnet delivers the audit framework. Bridge page offers a free audit call with you. Discovery call → proposal → retainer.**

**Email angle: Outreach sequence (Module 7 DM templates adapted for email). Email 1: specific observation about their business. Email 2: one free insight or tip. Email 3: offer the audit.**

**Content angle: Case study content. "I ran a free social audit on 10 \[city\] restaurants — here''s what I found." (This positions you as the expert and generates inbound interest from business owners watching.) "Here''s what a local business''s social media looks like after 30 days of proper management." Before and after metrics.**

**DM strategy: Covered in Module 7 in full. For B2B specifically: 10 targeted outreach DMs per week, referral conversations with existing clients, and LinkedIn outreach if you''re targeting slightly larger businesses.**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 7, 'Section 5: Building Your Personal Offer Vault', '**Your offer vault is a living document — not a one-time decision. You add offers, test them, retire the ones that don''t convert for your audience, and replace them with better ones.**

**Set up your vault in your Business Hub spreadsheet (Module 4):**

**Create a new tab called "Offer Vault" with these columns:**

| Column | What goes here |
| ----- | ----- |
| **Offer Name** | **Product or program name** |
| **Type** | **Amazon / Digital / SaaS / Physical / Service** |
| **Commission** | **% or flat amount** |
| **Tier** | **Entry / Core / Recurring** |
| **Platform** | **Where you signed up** |
| **Affiliate Link** | **Your specific link** |
| **Evaluation Score** | **Passed all 5 checks?** |
| **Date Added** | **When you started promoting** |
| **Date Retired** | **When you stopped (and why)** |
| **Total Earned** | **Track lifetime earnings from this offer** |
| **Notes** | **Anything relevant** |

**Start with 3–5 offers from this module. Add one new offer per month maximum while you''re building. Promoting too many offers simultaneously dilutes your focus and confuses your audience.**

**The starter vault for most paths:**

| Tier | Offer | Why |
| ----- | ----- | ----- |
| **Entry** | **Amazon Associates** | **Always-on, zero barrier** |
| **Entry** | **MailerLite free trial** | **Natural fit for anyone learning email marketing** |
| **Core** | **One beginner digital course (Digistore24)** | **50%+ commission, teaches what your audience needs** |
| **Core** | **DashNex** | **One-time fee appeal, natural fit for funnel module** |
| **Recurring** | **MailerLite paid plan** | **Earn when free users upgrade** |
| **Recurring** | **Helium 10** | **Converts Amazon audience when they get serious** |

**That''s your starting portfolio. Six offers, covering all three tiers, requiring minimal promotional work because they all tie naturally into your content and course material.**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 8, 'Section 6: The Offer Evolution — How Your Vault Changes Over Time', '**Months 1–3: You promote offers from other people''s platforms. Amazon, Digistore, SaaS affiliate programs. Learn what your audience responds to. Build the list. Make your first commissions.**

**Months 4–6: You have enough audience data to know what your people actually want. You create your first simple digital product — a template pack, a workflow bundle, a quick-start guide — priced at $17–47. Your own product goes into the Core tier of your vault.**

**Months 7–12: Your own product is proven. You build an affiliate program for it (Gumroad or Rewardful) and recruit the affiliates who are now doing what you were doing at month 1\. You add a higher-ticket offer to your vault — your own service, a cohort, or a premium bundle.**

**Year 2+: You''re now on both sides of the affiliate relationship — promoting other people''s products AND having affiliates promote yours. The media business (Path B) and the product business (Path A) have merged into one operation.**

**This is the full arc. Module 8 is the beginning of it.**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 9, 'Module 8 Action Checklist', '**Offer sourcing:**

* # **\[ \] Amazon Associates account active (or applied — 3 qualifying sales required for PA-API)**

* # **\[ \] Digistore24 account created and marketplace explored**

* # **\[ \] ClickBank account created**

* # **\[ \] MailerLite affiliate program signed up**

* # **\[ \] EmailOctopus referral program signed up**

* # **\[ \] Helium 10 affiliate program signed up**

* # **\[ \] Canva affiliate program signed up (via Impact)**

* # **\[ \] Namecheap affiliate program signed up**

* # **\[ \] DashNex affiliate program signed up**

* # **\[ \] Render referral program signed up**

**Offer evaluation:**

* # **\[ \] 10-minute evaluation sheet copied to your Business Hub spreadsheet**

* # **\[ \] At least one offer run through all 5 evaluation checks**

* # **\[ \] Offer passes all 5 checks before promoting begins**

**Offer vault setup:**

* # **\[ \] "Offer Vault" tab created in Business Hub**

* # **\[ \] Starter portfolio (3–5 offers) listed with commission rates and affiliate links**

* # **\[ \] Tier assignment (Entry / Core / Recurring) done for each offer**

**First promotion:**

* # **\[ \] One offer selected for first active promotion campaign**

* # **\[ \] Module 9 promotion flow selected (Flow A, B, or C)**

* # **\[ \] Campaign planning started**

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-8-the-offer-vault', 10, 'What''s Next', '**You have your offers. You have your system. You have your audience. Module 9 is where you run your first full promotion — from content seeding through email campaign through close — and turn everything you''ve built into actual revenue.**

**After Module 9, Module 10 maps your next 90 days and asks the question that determines what kind of online business you''re actually building: are you promoting other people''s offers professionally, or are you building toward your own?**

**Both are valid. Both are covered. Let''s go.**

---

***The Kraken Vault — Crack the Code to Generating Income Online*** ***Module 8 of 10***

# 

# 

# 

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-9-the-promotion-system', 1, 'Fast-Track', '* **Have an offer and just need the campaign structure?** Skip to Section 2  
* **Want the plug-in guide for a specific offer type?** Jump to Section 3

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-9-the-promotion-system', 2, 'What This Module Is For', 'Module 8 gave you the offers. Module 9 gives you the system to promote them.

Everything you''ve built in Modules 2 through 7 — your funnel, your email sequences, your content machine, your DM conversations — is the infrastructure. This module is the playbook for running it against a specific offer, from day one of promotion to the close.

One thing to internalize before we go further: **you do not need a huge audience to run a successful promotion.**

A list of 200 genuinely engaged subscribers who trust you can generate $500–2,000+ from a well-run promotion campaign. A list of 5,000 subscribers who barely know who you are might generate less. Relationship quality beats quantity every time.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-9-the-promotion-system', 3, 'Section 1: The Three Promotion Flows', 'Every offer you run goes through one of three promotion flows depending on how the traffic comes in.

---

### **Flow A: Content → Funnel → Email → Offer**

**Best for:** Organic traffic builds, deals, and any offer where education is part of the conversion process.

**The sequence:**

**Week 1–2: Content seeding** Post 4–6 pieces of content that speak to the problem your offer solves. No pitch yet — just value. You''re warming the audience before they know anything is coming.

For example, if you''re promoting a beginner affiliate marketing course:

* Video 1: "Why most people fail in their first 90 days of affiliate marketing"  
* Video 2: "The 3 things I wish I knew before I started"  
* Video 3: "What a real beginner affiliate business looks like month by month"  
* Video 4: "The free tool stack that runs the whole thing"

**Days 1–7: Email nurture sequence** Anyone who opted in through these pieces of content enters your nurture sequence (Module 3). They get value emails. Still no direct pitch — you''re building the relationship.

**Day 8: The announcement email** Introduce the offer to your list. Tell them why you''re recommending it, what it does specifically, and what they get when they buy through your link (including any bonus you''re adding). Include the link.

**Days 9–10: Content pitch** One or two pieces of content that directly mention the offer. You can reference the email ("I sent something to my list yesterday about this") — this cross-platform touchpoint increases conversions because it creates the feeling that this offer is everywhere at once.

**Day 11: The FAQ email** Address the four or five most common objections and questions. Keep it conversational.

**Day 12: The reminder (if there''s a deadline)** Short. Direct. Remind them the offer closes or the bonus expires.

**Day 13 (deadline day): Last call email** Sent in the morning. Very short. "Today''s the last day. Here''s the link. Here''s what you get." That''s it.

**Total timeline: 13 days.** **Typical result for a healthy list:** 2–5% of your list converts. On 300 subscribers, that''s 6–15 sales.

---

### **Flow B: Ads → Lead → Email → Offer**

**Best for:** When you have a proven offer and a proven funnel and you''re ready to scale using paid traffic.

**The sequence:**

**Set up phase (days 1–3):**

* Offer is selected and your affiliate link is ready  
* Lead magnet directly related to the offer topic is live  
* Email sequence set up with a 5-day welcome sequence leading to the offer pitch (Module 3 structure)  
* Ad creative prepared (hook \+ message \+ offer — Module 5 framework)

**Day 1: Launch the ad** $5–10/day Meta lead generation ad. Target broad — let Meta''s algorithm find converters.

**Days 1–7: Let it run without touching it** The instinct to optimize immediately kills campaigns. The algorithm needs 50+ conversions to exit the learning phase. Let it run.

**Day 7: Review metrics**

* Cost per lead: target under $5 for an email opt-in  
* Landing page conversion rate: target above 30%  
* Email open rate on welcome sequence: target above 40%  
* Offer click rate from emails: target above 10%

If cost per lead is over $8, the issue is usually the ad creative or the targeting. Test a new hook while keeping everything else the same.

**Day 14: Scale what''s working** If your numbers are within target ranges, increase the budget by 20–30%. Don''t double it — gradual scaling preserves algorithm performance.

**Ongoing:** Keep running the sequence. This is now a machine — leads come in, sequence runs, some percentage buy. Your job is to monitor and optimize, not intervene daily.

---

### **Flow C: DM → Conversion**

**Best for:** Higher-ticket offers, B2B services, anything where a personal conversation makes the difference between a sale and no sale.

**The sequence:**

**Phase 1: Identify warm leads** People who have recently:

* Commented on your content with questions or engagement  
* DM''d you asking about something related to your offer  
* Replied to one of your emails  
* Engaged with your profile multiple times

These are warm leads. They''ve already raised their hand in some way.

**Phase 2: Open the conversation** Using the DM framework from Module 7\. Engage → Qualify → Position → Close.

Do not DM everyone who liked a post. Focus only on people who showed genuine interest through their behavior (commented a question, saved the post, visited your profile, sent a message).

**Phase 3: Move to email or call** For most offers, after 3–5 messages you either get a "yes" or you transition them to your email list or a booked call. Don''t try to run an entire sales process over Instagram DMs for a complex offer.

**Realistic volume:** For B2B services at $500–2,000/month, reaching out to 40–50 warm leads per month and converting 1–3 into clients is a realistic target. At $1,000/month average, that''s $1,000–3,000 in new monthly recurring revenue.

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-9-the-promotion-system', 4, 'Section 2: The Promotion Campaign Checklist', 'Run through this before every promotion campaign, regardless of which flow you''re using.

**Offer readiness:**

* \[ \] I know exactly what the offer is and what the buyer gets  
* \[ \] I have my affiliate link (or direct sales link)  
* \[ \] I have tested the link — it works and tracks correctly  
* \[ \] I know the commission rate and payout structure  
* \[ \] I know if there''s a refund window that affects my commission  
* \[ \] I have my bonus ready (optional but recommended — something you add on top to make buying through your link more valuable)

**Audience readiness:**

* \[ \] I have run at least 4 pieces of content warming up the topic before pitching  
* \[ \] My email list has received value-only emails in the past 2 weeks (not just promotions)  
* \[ \] I know my list size and can estimate expected conversion range

**Technical readiness:**

* \[ \] Tracking is in my Offer Testing Tracker spreadsheet (Module 4\)  
* \[ \] My email campaign is built and scheduled in MailerLite/EmailOctopus  
* \[ \] Any lead generation ads are set up and ready to launch (Flow B only)  
* \[ \] My Telegram channel post about the offer is drafted (if applicable)

**Legal and ethical:**

* \[ \] I have disclosed my affiliate relationship in all promotional content (required by FTC guidelines — a simple "this contains affiliate links" or "I earn a commission if you purchase" is sufficient)  
* \[ \] The claims I''m making about the offer are accurate and verifiable  
* \[ \] The urgency I''m using (if any) is real — not manufactured fake scarcity

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-9-the-promotion-system', 5, 'Section 3: Case-Style Promotion Breakdowns', 'Here''s how each offer type from the Offer Vault (Module 8\) gets promoted using the flows above.

---

### **Promoting Amazon Affiliate Deals — Flow A (ongoing, not campaign-based)**

Amazon affiliate promotion is different from course or software promotion — it''s continuous rather than periodic. You''re not running a 13-day campaign. You''re publishing deal content consistently and your system routes people to deals automatically.

**The ongoing promotion system:**

1. Price drop alert fires (automated — Module 4\)  
2. You post a 60-second deal video on TikTok \+ Reels  
3. The link in your bio routes to your deal site  
4. Your deal site shows the deal with your affiliate link  
5. Weekly deal digest email goes to your list (curated content email — Module 3 template)  
6. Your Telegram channel posts the deal automatically (n8n workflow — Module 4\)

Your goal: be the person your audience thinks of first when they''re about to buy something on Amazon. That happens through consistent, specific, trustworthy deal content — not through one viral video.

**The affiliate link placement hierarchy:**

* Best: directly in a product from your deal site (your site gets SEO credit and you collect the email)  
* Second: link in bio pointing to your deal site  
* Third: direct affiliate link in bio (loses the email collection opportunity but simpler)

---

### **Promoting a Digital Course — Flow A**

**Pre-promotion content (1 week before):**

* Day 1: "The biggest mistake I see beginners make in \[topic\]" (pain-first)  
* Day 3: "What I learned after \[time\] doing \[topic\]" (credibility)  
* Day 5: "The thing that finally made \[topic\] click for me" (bridge to course)  
* Day 6: Email: "I''ve been getting a lot of questions about \[topic\] lately..."

**Launch week emails:**

* Day 7: The announcement — "Here''s the resource I keep pointing people to"  
* Day 9: The case study — specific result from using the method the course teaches  
* Day 11: The FAQ — your honest answers to "is this worth it?" "is this for beginners?" etc.  
* Day 12 (if deadline): The reminder  
* Day 13 (deadline): Last call

**Your bonus stack (what makes buying through your link worth it):** Pick one or two things you can offer that the course creator can''t:

* A private community or group chat access  
* A one-hour Q\&A call with you (high value, low cost if you do it in a group format)  
* A template or spreadsheet relevant to the course topic  
* A complementary guide (like the free guide you already created in Module 2\)

---

### **Promoting a SaaS Tool — Flow A \+ ongoing content**

Software tool promotions work differently from course promotions because the primary content is tutorial-based rather than story-based.

**Tutorial content strategy:**

* Post 3–5 tutorial videos showing how to do specific things with the tool  
* Each tutorial ends with "you can try \[tool\] free through the link in my bio"  
* The tutorials keep generating views and affiliate signups long after you posted them

**Email promotion for SaaS:** Tool tip series — one email per week teaching one useful thing you can do with the tool. After 4 teaching emails, send one "and if you haven''t tried it yet, here''s the free trial link" email.

**Why this converts:** Your subscriber has received 4 emails of genuine value about this tool. They''ve seen it work in your tutorials. By email 5, the affiliate link doesn''t feel like a pitch — it feels like a natural next step.

---

### **Promoting Your B2B Service — Flow C (DM \+ Content)**

Promoting a service is more direct than promoting an affiliate product because you ARE the product.

**Content strategy for service promotion:**

* Case study content: "I helped \[type of business\] go from \[before\] to \[after\] in \[timeframe\]"  
* Process content: "Here''s exactly what I do in the first 30 days with a new client"  
* Behind-the-scenes content: "What my week actually looks like running \[service\] for \[number\] clients"

**Outreach sequence:**

* Identify 10 target businesses per week  
* Message 1: observation or compliment (no pitch)  
* Message 2 (if they reply): engage with their situation  
* Message 3: qualify and position  
* Message 4: call to action (booked call or proposal)

---');
INSERT INTO lessons (module_id, idx, title, content) VALUES ('module-9-the-promotion-system', 6, 'Module 9 Action Checklist', '* \[ \] First promotion campaign planned with flow type selected  
* \[ \] Pre-promotion content calendar created and content drafted  
* \[ \] Email campaign built in MailerLite/EmailOctopus  
* \[ \] Offer tracked in the Offer Testing Tracker (Module 4\)  
* \[ \] Bonus prepared (if applicable)  
* \[ \] FTC disclosure added to all promotional content  
* \[ \] Post-campaign review scheduled (7 days after campaign closes)

---

---');

-- assets
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('video-welcome', 'video', 'Welcome — how to use The Vault', 'Quick tour of guided mode, Fast Track and asset downloads.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', NULL, NULL, NULL, NULL, NULL, '3:12', '["onboarding"]', NULL, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('prompt-cold-dm', 'prompt', 'Cold DM opener (no-pitch)', 'Drop in their handle + niche. Designed to start a real convo.', NULL, 'Hey {{name}} — saw your post about {{topic}}. Genuinely curious: what''s the biggest bottleneck you''re hitting with {{outcome}} right now? No pitch, just nerding out on this stuff.', NULL, NULL, NULL, NULL, NULL, '["dms","outreach"]', NULL, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('file-funnel-checklist', 'file', '3-page funnel checklist', 'Every element your landing → offer → thank-you pages need.', '/assets/downloads/funnel-checklist.pdf', NULL, 'funnel-checklist.pdf', '180 KB', 'PDF', NULL, NULL, '["funnel","templates"]', NULL, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('link-tool-stack', 'link', 'Free tool stack (Notion)', 'Live list of every free tool referenced in the course.', 'https://www.notion.so/', NULL, NULL, NULL, NULL, 'Notion', NULL, '["tools"]', NULL, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('file-prompt-module-2-funnel-shell', 'file', 'Module 2 — Funnel shell build prompt', 'Drop into Claude/ChatGPT to generate the full Cloudflare-ready React + Vite funnel app.', '/prompts/module-2-funnel-shell.md', NULL, 'module-2-funnel-shell.md', NULL, 'Prompt', NULL, NULL, '["prompt","module-2","funnel"]', NULL, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('file-prompt-module-3-email-injection', 'file', 'Module 3 — Email form injection prompt', 'Tells the AI exactly which file to edit to swap the placeholder form for your MailerLite / EmailOctopus embed.', '/prompts/module-3-email-form-injection.md', NULL, 'module-3-email-form-injection.md', NULL, 'Prompt', NULL, NULL, '["prompt","module-3","email"]', NULL, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('file-prompt-module-4-sheets-telegram', 'file', 'Module 4 — Google Sheets + Telegram automation prompt', 'Generates the Apps Script webhook + Telegram ping and wires it into your funnel.', '/prompts/module-4-sheets-telegram.md', NULL, 'module-4-sheets-telegram.md', NULL, 'Prompt', NULL, NULL, '["prompt","module-4","automation"]', NULL, '2026-05-07 01:41:46');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('file-start-here-path-picker', 'file', 'Start Here — Path Picker Worksheet', 'One-page worksheet to choose the right Vault path and module order.', '/assets/downloads/start-here-path-picker.pdf', NULL, 'start-here-path-picker.pdf', '120 KB', 'PDF', NULL, NULL, '["onboarding","paths"]', NULL, '2026-05-19 02:00:00');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('file-shiny-object-detox-audit', 'file', 'Shiny Object Detox Audit', 'Quick audit for tools, subscriptions, half-built projects, and distractions.', '/assets/downloads/shiny-object-detox-audit.pdf', NULL, 'shiny-object-detox-audit.pdf', '140 KB', 'PDF', NULL, NULL, '["mindset","focus","onboarding"]', NULL, '2026-05-19 02:00:00');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('file-affiliate-levels-cheatsheet', 'file', 'Affiliate/System Operator Levels Cheat Sheet', 'The four levels: Link Dropper, Trust Builder, System Operator, Authority Partner.', '/assets/downloads/operator-levels-cheatsheet.pdf', NULL, 'operator-levels-cheatsheet.pdf', '110 KB', 'PDF', NULL, NULL, '["affiliate","strategy"]', NULL, '2026-05-19 02:00:00');
INSERT OR REPLACE INTO assets (id, type, title, description, url, body, filename, size, format, source, duration, tags, image_key, created_at) VALUES ('file-90-day-operator-roadmap', 'file', '90-Day Operator Roadmap', 'Plan the next 90 days based on your chosen path and weekly review rhythm.', '/assets/downloads/90-day-operator-roadmap.pdf', NULL, '90-day-operator-roadmap.pdf', '160 KB', 'PDF', NULL, NULL, '["roadmap","execution"]', NULL, '2026-05-19 02:00:00');

-- module_assets
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-2-the-funnel-system', 'file-prompt-module-2-funnel-shell', 5);
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-2-the-funnel-system', 'file-funnel-checklist', 8);
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-3-the-email-system', 'file-prompt-module-3-email-injection', 3);
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-4-the-automation-system', 'file-prompt-module-4-sheets-telegram', 3);
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-0-start-here-command-center', 'video-welcome', 0);
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-0-start-here-command-center', 'file-start-here-path-picker', 2);
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-1b-pick-your-path', 'file-shiny-object-detox-audit', 4);
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-1b-pick-your-path', 'file-affiliate-levels-cheatsheet', 3);
INSERT OR IGNORE INTO module_assets (module_id, asset_id, lesson_idx) VALUES ('module-10-build-paths', 'file-90-day-operator-roadmap', 1);
