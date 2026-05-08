import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/jumpstart")({
  component: JumpstartPage,
});

const DAYS = [
  {
    n: 1,
    title: "Pick Your Niche and Angle",
    bullets: [
      'Decide who you\'re talking to (be specific, not "everyone")',
      'Write one sentence: "I help [person] do [thing] using [method]"',
      "Pick one platform to start on — just one",
    ],
  },
  {
    n: 2,
    title: "Set Up Your Free Tool Stack",
    bullets: [
      "Resend for email (free tier)",
      "Cloudflare Pages for your site (free)",
      "One affiliate program — Amazon Associates or TikTok Shop",
    ],
  },
  {
    n: 3,
    title: "Create Your First Piece of Content",
    bullets: [
      "Pick one product you actually use",
      "Record or write one honest review — no script needed",
      "Post it. Done. First rep complete.",
    ],
  },
  {
    n: 4,
    title: "Build a Simple Landing Page",
    bullets: [
      "One headline, one form, one button",
      "Use the Kraken Vault funnel template",
      "Connect it to your Resend account",
    ],
  },
  {
    n: 5,
    title: "Write Your Welcome Email",
    bullets: [
      "Subject: deliver what you promised",
      "Body: 3 paragraphs — who you are, what they'll get, what comes next",
      "Send a test to yourself",
    ],
  },
  {
    n: 6,
    title: "Find and Stack Your Offers",
    bullets: [
      "Pick 2-3 affiliate products that match your niche",
      "Add links to your content and landing page",
      "Make sure every piece of content has somewhere to go",
    ],
  },
  {
    n: 7,
    title: "Go Live and Track Day 1",
    bullets: [
      "Post your content",
      "Share your landing page link in one place",
      "Check your Resend dashboard — first subscriber incoming",
    ],
  },
];

function JumpstartPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-6 pt-16 pb-10 md:pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            Free Resource · Kraken Vault
          </div>
          <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
            Your <span className="text-primary">7-Day Affiliate</span> Jumpstart
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            One action per day. 45 minutes max. By day 7 you&apos;ll have the foundation of a real
            affiliate system running.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            This isn&apos;t theory. Each day is one specific move. Do the thing, close the laptop, go
            live your life. The system builds while you&apos;re not looking.
          </p>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-4xl gap-4">
          {DAYS.map((day) => (
            <div
              key={day.n}
              className="grid gap-5 rounded-lg border border-[#1f1f1f] bg-surface p-6 md:grid-cols-[auto_1fr] md:gap-7 md:p-7"
            >
              <div className="flex items-center gap-3 md:min-w-[110px] md:flex-col md:items-start md:gap-1">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  Day
                </div>
                <div className="font-display text-5xl font-black leading-none text-primary md:text-6xl">
                  {day.n}
                </div>
              </div>
              <div className="md:border-l md:border-[#1f1f1f] md:pl-7">
                <h2 className="font-display text-xl font-black uppercase tracking-tight text-white md:text-2xl">
                  {day.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {day.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-foreground/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-4xl rounded-lg border border-[#1f1f1f] bg-surface p-8 shadow-glow md:p-12">
          <h2 className="font-display text-3xl font-black uppercase leading-[1] tracking-tight text-white md:text-4xl">
            That&apos;s the foundation. <span className="text-primary">The Vault builds the full machine.</span>
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            The Kraken Vault takes everything you just set up and turns it into a complete
            connected system — automation, traffic, offers, DMs, promotion. One path. No
            guesswork.
          </p>
          <Link
            to="/offer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3.5 text-sm font-black uppercase tracking-wider text-primary-foreground shadow-glow transition hover:brightness-110"
          >
            See what&apos;s inside the Vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
