#!/usr/bin/env python3
"""Generate module cover SVG images for The Kraken Vault."""
import os

MODULES = [
    {"num": "1", "title": "Foundation & Your Path", "tagline": "Get online, look professional, pay almost nothing.", "from": "#0b1020", "to": "#1f2a44", "accent": "#60a5fa", "icon": "🔧"},
    {"num": "2", "title": "The Funnel System", "tagline": "Build the three-page funnel that turns clicks into leads.", "from": "#0f172a", "to": "#1e3a8a", "accent": "#8b5cf6", "icon": "🌉"},
    {"num": "3", "title": "The Email System", "tagline": "Welcome, nurture and convert — on autopilot.", "from": "#1f2937", "to": "#0f766e", "accent": "#2dd4bf", "icon": "✉️"},
    {"num": "4", "title": "The Automation System", "tagline": "Wire your stack together so it runs without you.", "from": "#111827", "to": "#334155", "accent": "#93c5fd", "icon": "⚙️"},
    {"num": "5", "title": "The Traffic System", "tagline": "Get real eyeballs — organic first, paid second.", "from": "#0b1020", "to": "#1f2a44", "accent": "#38bdf8", "icon": "📈"},
    {"num": "6", "title": "The Content System", "tagline": "Never run out of ideas, hooks or posts again.", "from": "#0f172a", "to": "#1e3a8a", "accent": "#38bdf8", "icon": "🎬"},
    {"num": "7", "title": "DM → Lead → Close", "tagline": "Turn DMs into leads without sounding salesy.", "from": "#1e1b4b", "to": "#312e81", "accent": "#a78bfa", "icon": "💬"},
    {"num": "8", "title": "The Offer Vault", "tagline": "Pick offers that actually pay, stack them properly.", "from": "#172554", "to": "#312e81", "accent": "#c4b5fd", "icon": "🏷️"},
    {"num": "9", "title": "The Promotion System", "tagline": "Run promotions that move your list to buy.", "from": "#1e1b4b", "to": "#4c1d95", "accent": "#c084fc", "icon": "📣"},
    {"num": "10", "title": "Build Paths", "tagline": "Pick your path. Build the next 90 days.", "from": "#0b1020", "to": "#1f2a44", "accent": "#8b5cf6", "icon": "🗺️"},
]

def make_svg(m):
    accent_hex = m["accent"]
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{m['from']}" />
      <stop offset="100%" stop-color="{m['to']}" />
    </linearGradient>
    <radialGradient id="glow" cx="75%" cy="15%" r="70%">
      <stop offset="0%" stop-color="{accent_hex}" stop-opacity="0.35" />
      <stop offset="100%" stop-color="{accent_hex}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="text-glow" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="{accent_hex}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)" />
  <rect width="1200" height="675" fill="url(#glow)" />
  <g stroke="{accent_hex}" stroke-opacity="0.12" fill="none">
    <rect x="80" y="60" width="1040" height="555" rx="24" stroke-width="1.5" />
    <path d="M80 200h1040M80 340h1040M80 480h1040" stroke-width="0.5" />
  </g>
  <g stroke="{accent_hex}" stroke-opacity="0.08" stroke-width="0.5">
    <line x1="400" y1="60" x2="400" y2="615" />
    <line x1="800" y1="60" x2="800" y2="615" />
  </g>
  <text x="120" y="160" font-family="system-ui, sans-serif" font-size="180" font-weight="800" fill="#ffffff" opacity="0.04">0{m['num']}</text>
  <text x="120" y="320" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="url(#text-glow)">Module {m['num']}</text>
  <text x="120" y="390" font-family="system-ui, sans-serif" font-size="64" font-weight="800" fill="#ffffff">{m['title']}</text>
  <text x="120" y="460" font-family="system-ui, sans-serif" font-size="22" fill="#94a3b8">{m['tagline']}</text>
  <text x="1040" y="580" font-family="system-ui, sans-serif" font-size="64">{m['icon']}</text>
  <text x="120" y="560" font-family="system-ui, sans-serif" font-size="16" fill="#64748b" letter-spacing="4">THE KRAKEN VAULT</text>
  <line x1="120" y1="575" x2="320" y2="575" stroke="{accent_hex}" stroke-width="1.5" stroke-opacity="0.4" />
</svg>'''

out_dir = "/tmp/my-little-helper/public/images/modules"
os.makedirs(out_dir, exist_ok=True)

for m in MODULES:
    svg = make_svg(m)
    filename = f"module-{m['num']}.svg"
    filepath = os.path.join(out_dir, filename)
    with open(filepath, 'w') as f:
        f.write(svg)
    print(f"Created {filename}")

print(f"\nAll {len(MODULES)} module covers created in {out_dir}")