import json

with open('src/data/course.json', 'r') as f:
    data = json.load(f)

# 1. Rename Module 1
data[0]['title'] = 'Module 1: Foundation & Your Path'

# Fix Module 1 sections
mod1 = data[0]
sections = mod1['sections']

# Fix Fast Track references
for s in sections:
    if s['title'] == 'Fast-Track \u2014 Already Have Some of This?':
        s['content'] = s['content'].replace('Section 2 \u2014 Professional Email', 'Section 2 \u2014 Domain + Email')
        s['content'] = s['content'].replace('Section 3 \u2014 The Free Tool Stack', 'Section 2 \u2014 The Free Tool Stack')
        s['content'] = s['content'].replace('Just want the AI breakdown? Jump to Section 4', '')
        s['content'] = s['content'].replace('Ready to sign up for an email platform? Jump to Section 5', 'Ready to sign up for an email platform? Jump to Section 3')

    # Fix checklist title
    if 'Your Module 1' in s['title']:
        s['title'] = s['title'].replace('Module 1a', 'Module 1')

    # Fix "What's Next" section
    if s['title'] == "What's Next":
        s['content'] = """You've got the foundation. You have a domain. You have a professional email. You have a free stack of tools that most people pay hundreds of dollars a month for.

Now you need to pick your path \u2014 the income model that actually fits your life, not some guru's fantasy lifestyle. The last section laid out every option with honest pros, cons, and what it realistically takes to get started. By now you should have one clear direction and a roadmap for the modules that apply to your specific path.

See you in Module 2.

---

*The Kraken Vault \u2014 Crack the Code to Generating Income Online* *Module 1 of 10*

---"""

# Add 'Pick Your Path' section before the checklist
path_section = {
    "title": "Section 4: Pick Your Path \u2014 Choose Your Income Model",
    "content": """Before you go deeper into the course, you need a direction. The Kraken Vault covers multiple ways to generate income online, and not every module applies to every path. Pick the one that fits your situation best.

---

### Path A: The Deal Path (Amazon Affiliate + TikTok Shop)

**Best for:** People who want to start fast without creating their own products. You find deals, post content about them, and earn commissions when people buy.

**Income potential:** $200\u2013$2,000+/month at scale. First commission possible in days.

**Key modules:** 2 (funnel), 3 (email), 5 (traffic), 6 (content), 8 (offers)

---

### Path B: The Digital Affiliate Path (Courses + SaaS)

**Best for:** People who want to promote higher-ticket digital products and earn recurring commissions from software subscriptions.

**Income potential:** $500\u2013$5,000+/month at scale. First commission in weeks.

**Key modules:** 2 (funnel), 3 (email), 5 (traffic), 6 (content), 7 (DMs), 8 (offers)

---

### Path C: The Product Path (White Label / Physical Goods)

**Best for:** People who want to build their own brand selling physical products made by someone else under their label.

**Income potential:** $500\u2013$10,000+/month at scale. First sale in 4\u20138 weeks.

**Key modules:** 2 (funnel), 3 (email), 5 (traffic), 6 (content), 7 (DMs), 8 (offers)

---

### Path D: The Service Path (B2B Local Marketing)

**Best for:** People who want to sell services (social media management, marketing) to local businesses for monthly retainers.

**Income potential:** $1,000\u2013$5,000+/month per client. First client in weeks.

**Key modules:** 2 (funnel), 3 (email), 5 (traffic), 6 (content), 7 (DMs), 8 (offers)

---

### Path E: The Creator Path (Build Your Own Products)

**Best for:** People who want to create and sell their own digital products (courses, templates, software).

**Income potential:** Unlimited. First product launch in 4\u20138 weeks.

**Key modules:** All modules, plus Module 10 for the build-your-own roadmap.

---

**Not sure which path is right for you?** Start with Path A (The Deal Path) \u2014 it has the lowest barrier to entry and the fastest path to your first dollar. You can always switch or add another path later."""
}

# Insert path section before the checklist
for i, s in enumerate(sections):
    if 'Your Module 1' in s['title'] or 'Action Checklist' in s['title']:
        sections.insert(i, path_section)
        break

# 2. Fix all Module 1a/1b references across ENTIRE course
for mod in data:
    for s in mod.get('sections', []):
        if 'content' in s:
            s['content'] = s['content'].replace('(Modules 1a + 1b)', '(Module 1)')
            s['content'] = s['content'].replace('Module 1a', 'Module 1')
            s['content'] = s['content'].replace('Module 1b', 'Module 1')
            s['content'] = s['content'].replace('In Module 1a', 'In Module 1')

# 3. Add affiliate link markers
for mod in data:
    for s in mod.get('sections', []):
        if 'content' in s:
            c = s['content']
            c = c.replace('[YOUR NAMECHEAP AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 Namecheap')
            c = c.replace('[YOUR GOOGLE WORKSPACE REFERRAL LINK]', 'AFFILIATE LINK NEEDED \u2192 Google Workspace')
            c = c.replace('[YOUR CANVA AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 Canva Pro')
            c = c.replace('[YOUR RENDER AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 Render')
            c = c.replace('[YOUR MAILERLITE AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 MailerLite')
            c = c.replace('[YOUR EMAILOCTOPUS AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 EmailOctopus')
            c = c.replace('[YOUR SUBMAGIC AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 Submagic')
            c = c.replace('[YOUR CALENDLY AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 Calendly')
            c = c.replace('[YOUR DASHNEX AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 DashNex')
            c = c.replace('[YOUR ANYTIME MAILBOX AFFILIATE LINK]', 'AFFILIATE LINK NEEDED \u2192 Anytime Mailbox')
            c = c.replace('[YOUR LINK]', 'AFFILIATE LINK NEEDED')
            c = c.replace('YOUR DASHNEX AFFILIATE LINK', 'AFFILIATE LINK NEEDED \u2192 DashNex')
            s['content'] = c

# 4. Fix Content Kraken section in Module 6
for mod in data:
    if 'Content System' in mod.get('title', ''):
        for s in mod.get('sections', []):
            if 'Content Kraken Integration' in s.get('title', ''):
                s['content'] = """Content Kraken is a tool I built that handles multi-platform posting, scheduling, and link management. It posts to 9+ social platforms at once, schedules content in advance, and keeps your affiliate links organized in one place.

**How Content Kraken fits into this system:**

It's the practical execution layer for everything in this module \u2014 rather than managing scripts in Google Docs and calendars in Sheets and ideas on sticky notes, Content Kraken gives you:

* **Idea Bank** \u2192 Content Kraken "Ideas" section  
* **Content Matrix** \u2192 Content Kraken content categories  
* **30-Day Calendar** \u2192 Content Kraken scheduling view  
* **Batch Session** \u2192 Content Kraken workflow from ideas \u2192 scripts \u2192 scheduled

**You don't build this yourself.** Content Kraken is a tool I've already built and offer as part of the vault. It's designed to remove the friction between having the system and actually executing it.

Want access to Content Kraken? [AFFILIATE LINK NEEDED \u2192 Content Kraken Signup]

---"""
                break

# Also fix the checklist reference
for mod in data:
    if 'Content System' in mod.get('title', ''):
        for s in mod.get('sections', []):
            if 'Action Checklist' in s.get('title', ''):
                s['content'] = s['content'].replace('Content Kraken set up and calendar imported (when available)', 'Sign up for Content Kraken to manage your posting across platforms')
                break

# 5. Fix krakenvault.com blooper in Module 10
for s in data[-1].get('sections', []):
    if 'content' in s:
        s['content'] = s['content'].replace('*The Kraken Vault \u2014 Course Complete* *krakenvault.com*', '')
        s['content'] = s['content'].replace('*The Kraken Vault \u2014 Course Complete* *krakenvault.com*', '')

# Also fix the end of the last section
for s in data[-1].get('sections', []):
    if 'Quick Start' in s.get('title', ''):
        s['content'] = s['content'].rstrip() + '\n\n---'
        break

# 6. Remove Rick Roll welcome video and broken notion.so link from assets
import os
assets_path = 'src/data/assets.ts'
with open(assets_path, 'r') as f:
    assets_content = f.read()

# Remove the Rick Roll video entry
import re
# Replace the welcome video with a placeholder
assets_content = assets_content.replace(
    '''    id: "video-welcome",
    type: "video",
    title: "Welcome \u2014 how to use The Vault",
    description: "Quick tour of guided mode, Fast Track and asset downloads.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3:12",
    tags: ["onboarding"],
  },''',
    '''    id: "video-welcome",
    type: "video",
    title: "Welcome \u2014 how to use The Vault",
    description: "Quick tour of guided mode, Fast Track and asset downloads.",
    url: "[ADD WELCOME VIDEO URL HERE]",
    duration: "TBD",
    tags: ["onboarding"],
  },'''
)

# Fix notion.so link to be a placeholder
assets_content = assets_content.replace(
    '''    url: "https://www.notion.so/",
    source: "Notion",
    tags: ["tools"],''',
    '''    url: "[ADD TOOL STACK NOTION LINK HERE]",
    source: "Notion",
    tags: ["tools"],'''
)

with open(assets_path, 'w') as f:
    f.write(assets_content)

# 7. Fix courseMeta.ts - remove "1a"
meta_path = 'src/data/courseMeta.ts'
with open(meta_path, 'r') as f:
    meta_content = f.read()

meta_content = meta_content.replace('"Module 1a"', '"Module 1"')

with open(meta_path, 'w') as f:
    f.write(meta_content)

print("All fixes applied successfully!")
print("- Module 1 renamed and restructured with Pick Your Path section")
print("- All Module 1a/1b references removed")
print("- Affiliate link markers added throughout")
print("- Content Kraken framing fixed")
print("- krakenvault.com blooper removed")
print("- Rick Roll video and broken notion.so link flagged")
print("- courseMeta.ts updated")