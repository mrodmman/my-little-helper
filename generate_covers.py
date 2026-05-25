#!/usr/bin/env python3
"""Generate kraken/vault themed module cover SVG images."""

MODULES = [
    {
        "num": "1", "title": "Foundation & Your Path",
        "tagline": "Get online, look professional, pay almost nothing.",
        "from": "#0a1628", "to": "#1a2a4a", "accent": "#60a5fa",
        "item": "🔧 compass_and_tools",
        "bg_element": "anchor"
    },
    {
        "num": "2", "title": "The Funnel System",
        "tagline": "Turn clicks into leads with a 3-page funnel.",
        "from": "#0d1b2a", "to": "#1b2838", "accent": "#8b5cf6",
        "item": "🌉 bridge_arch",
        "bg_element": "portal"
    },
    {
        "num": "3", "title": "The Email System",
        "tagline": "Welcome, nurture and convert on autopilot.",
        "from": "#0a1a1a", "to": "#0d3d3d", "accent": "#2dd4bf",
        "item": "✉️ message_in_bottle",
        "bg_element": "waves"
    },
    {
        "num": "4", "title": "The Automation System",
        "tagline": "Wire your stack together so it runs without you.",
        "from": "#0f1722", "to": "#1e293b", "accent": "#93c5fd",
        "item": "⚙️ gear_mechanism",
        "bg_element": "circuit"
    },
    {
        "num": "5", "title": "The Traffic System",
        "tagline": "Get real eyeballs organic first, paid second.",
        "from": "#0a1628", "to": "#0f2847", "accent": "#38bdf8",
        "item": "📈 growth_chart",
        "bg_element": "waves_up"
    },
    {
        "num": "6", "title": "The Content System",
        "tagline": "Never run out of ideas, hooks or posts again.",
        "from": "#0a0f1e", "to": "#1a2744", "accent": "#38bdf8",
        "item": "🎬 clapper_board",
        "bg_element": "spotlight"
    },
    {
        "num": "7", "title": "DM → Lead → Close",
        "tagline": "Turn conversations into customers.",
        "from": "#1a0a2e", "to": "#2d1b69", "accent": "#a78bfa",
        "item": "💬 speech_bubbles",
        "bg_element": "tentacles_right"
    },
    {
        "num": "8", "title": "The Offer Vault",
        "tagline": "Pick offers that pay, stack them properly.",
        "from": "#0f0a1a", "to": "#2a1a4e", "accent": "#c4b5fd",
        "item": "🏷️ treasure_chest",
        "bg_element": "vault_door"
    },
    {
        "num": "9", "title": "The Promotion System",
        "tagline": "Run promotions that move your list to buy.",
        "from": "#1a0a2e", "to": "#3b1a6e", "accent": "#c084fc",
        "item": "📣 megaphone",
        "bg_element": "sound_waves"
    },
    {
        "num": "10", "title": "Build Paths",
        "tagline": "Pick your path. Build the next 90 days.",
        "from": "#0b1020", "to": "#1f2a44", "accent": "#8b5cf6",
        "item": "🗺️ treasure_map",
        "bg_element": "map_compass"
    },
]

def make_svg(m):
    accent = m["accent"]
    f, t = m["from"], m["to"]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{f}" />
      <stop offset="100%" stop-color="{t}" />
    </linearGradient>
    <radialGradient id="glow" cx="75%" cy="10%" r="65%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="{accent}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="accent-line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0" />
      <stop offset="50%" stop-color="{accent}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="{accent}" stop-opacity="0" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="675" fill="url(#bg)" />
  <rect width="1200" height="675" fill="url(#glow)" />

  <!-- Grid pattern (like a treasure map grid or vault floor) -->
  <g stroke="{accent}" stroke-opacity="0.06" stroke-width="0.5">
    <line x1="0" y1="0" x2="0" y2="675" />
    <line x1="100" y1="0" x2="100" y2="675" />
    <line x1="200" y1="0" x2="200" y2="675" />
    <line x1="300" y1="0" x2="300" y2="675" />
    <line x1="400" y1="0" x2="400" y2="675" />
    <line x1="500" y1="0" x2="500" y2="675" />
    <line x1="600" y1="0" x2="600" y2="675" />
    <line x1="700" y1="0" x2="700" y2="675" />
    <line x1="800" y1="0" x2="800" y2="675" />
    <line x1="900" y1="0" x2="900" y2="675" />
    <line x1="1000" y1="0" x2="1000" y2="675" />
    <line x1="1100" y1="0" x2="1100" y2="675" />
    <line x1="1200" y1="0" x2="1200" y2="675" />
    <line x1="0" y1="0" x2="1200" y2="0" />
    <line x1="0" y1="100" x2="1200" y2="100" />
    <line x1="0" y1="200" x2="1200" y2="200" />
    <line x1="0" y1="300" x2="1200" y2="300" />
    <line x1="0" y1="400" x2="1200" y2="400" />
    <line x1="0" y1="500" x2="1200" y2="500" />
    <line x1="0" y1="600" x2="1200" y2="600" />
  </g>

  <!-- Kraken tentacles coming from bottom-right -->
  <g fill="none" stroke="{accent}" stroke-opacity="0.15" stroke-linecap="round">
    <!-- Large tentacle 1 -->
    <path d="M950 675 Q920 550 940 450 Q960 350 900 280 Q850 220 880 170" stroke-width="18" />
    <path d="M880 170 Q890 150 870 130" stroke-width="12" />
    <!-- Large tentacle 2 -->
    <path d="M1050 675 Q1080 500 1040 380 Q1000 260 1060 190" stroke-width="14" />
    <path d="M1060 190 Q1070 170 1050 150" stroke-width="10" />
    <!-- Medium tentacle -->
    <path d="M1100 675 Q1160 520 1120 400 Q1080 320 1140 250" stroke-width="10" />
    <!-- Suction cups on tentacle 1 -->
    <circle cx="930" cy="520" r="3" fill="{accent}" fill-opacity="0.2" />
    <circle cx="940" cy="460" r="3" fill="{accent}" fill-opacity="0.2" />
    <circle cx="930" cy="390" r="3" fill="{accent}" fill-opacity="0.2" />
    <circle cx="910" cy="320" r="3" fill="{accent}" fill-opacity="0.2" />
    <circle cx="890" cy="250" r="3" fill="{accent}" fill-opacity="0.2" />
    <circle cx="882" cy="190" r="3" fill="{accent}" fill-opacity="0.2" />
  </g>

  <!-- Small tentacles from left -->
  <g fill="none" stroke="{accent}" stroke-opacity="0.08" stroke-linecap="round">
    <path d="M50 675 Q80 500 60 400 Q40 300 100 200" stroke-width="8" />
    <path d="M150 675 Q120 550 140 450 Q160 350 120 250" stroke-width="6" />
  </g>

  <!-- Accent divider line -->
  <rect x="80" y="520" width="400" height="2" rx="1" fill="url(#accent-line)" />

  <!-- Module number (large, faint watermark) -->
  <text x="1100" y="180" font-family="system-ui, sans-serif" font-size="120" font-weight="800"
        fill="{accent}" fill-opacity="0.08" text-anchor="end">M{m['num'].zfill(2)}</text>

  <!-- Module label -->
  <text x="80" y="280" font-family="system-ui, sans-serif" font-size="20" font-weight="600"
        fill="{accent}" letter-spacing="6" text-transform="uppercase">MODULE {m['num']}</text>

  <!-- Title -->
  <text x="80" y="350" font-family="system-ui, sans-serif" font-size="48" font-weight="800"
        fill="#ffffff">{m['title']}</text>

  <!-- Tagline -->
  <text x="80" y="410" font-family="system-ui, sans-serif" font-size="18"
        fill="#94a3b8">{m['tagline']}</text>

  <!-- Emoji icon, large, bottom-right area -->
  <text x="1040" y="500" font-family="system-ui, sans-serif" font-size="80"
        fill-opacity="0.6">{m['item'].split()[0]}</text>

  <!-- Kraken Vault watermark -->
  <text x="80" y="560" font-family="system-ui, sans-serif" font-size="11"
        fill="#475569" letter-spacing="4">KRAKEN VAULT</text>
</svg>'''

import os
out_dir = "/tmp/my-little-helper/public/images/modules"
os.makedirs(out_dir, exist_ok=True)

for m in MODULES:
    svg = make_svg(m)
    fp = os.path.join(out_dir, f"module-{m['num']}.svg")
    with open(fp, 'w') as f:
        f.write(svg)
    print(f"✅ module-{m['num']}.svg")

print(f"\nAll {len(MODULES)} kraken-themed covers created")