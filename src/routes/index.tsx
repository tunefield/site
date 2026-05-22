import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity,
  Boxes,
  Library,
  Tags,
  Wrench,
  Disc3,
  ArrowUpRight,
  ArrowRight,
  Github,
  Youtube,
  Instagram,
  Linkedin,
  Music2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroSpheres from "@/assets/hero-spheres.png";
import logo from "@/assets/tunefield-logo.png";

export const Route = createFileRoute("/")({
  component: TunefieldLanding,
});

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2 ${className}`}>
      <img src={logo} alt="" className="h-7 w-7" />
      <span className="font-display font-bold text-charcoal text-xl tracking-tight">
        tunefield<span className="text-teal">.</span>
      </span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["What it does", "#features"],
    ["The Matrix", "#matrix"],
    ["Pricing", "#pricing"],
    ["FAQ", "#faq"],
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-charcoal/10"
          : "bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Wordmark />
        <nav className="hidden md:flex items-center gap-8 text-sm text-charcoal/80">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-teal transition-colors">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/tunefield/app"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-charcoal/70 hover:text-teal"
          >
            <ArrowUpRight className="h-3.5 w-3.5" /> GitHub
          </a>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-1 rounded-full bg-teal text-cream px-4 py-2 text-sm font-medium hover:bg-teal/90 transition-colors"
          >
            Get on the V2 waitlist
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-teal-deep text-cream pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <div
        className="absolute inset-y-0 right-0 w-full md:w-2/3 pointer-events-none"
        aria-hidden
      >
        <img
          src={heroSpheres}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/80 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-7">
          <p className="eyebrow">6-Dimensional music visualisation</p>
          <h1 className="mt-6 font-display font-bold text-cream text-[clamp(2.75rem,7vw,6rem)]">
            Tired of managing<br />
            <span className="text-pink">lists?</span>
          </h1>
          <p className="mt-7 max-w-xl text-cream/80 text-lg md:text-xl leading-relaxed">
            Teleport into a 6-dimensional music universe, defined by you. Fly through
            your library — every track a star, positioned by BPM, key, mood, energy,
            loudness, and danceability. Free, offline, instant. By a DJ + Ableton
            Certified Trainer who got tired of scrolling.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-full bg-teal text-cream px-6 py-3 font-medium hover:bg-teal/90 transition-colors"
            >
              Download free V1
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-full border border-pink text-pink px-6 py-3 font-medium hover:bg-pink hover:text-charcoal transition-colors"
            >
              Join V2 waitlist
            </a>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/60">
            <li>100% offline</li>
            <li className="text-cream/30">·</li>
            <li>Open source</li>
            <li className="text-cream/30">·</li>
            <li>Mac / Windows / Linux</li>
            <li className="text-cream/30">·</li>
            <li>Under 1% of your USB stick</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Section({
  id,
  dark = false,
  children,
}: {
  id?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${dark ? "bg-teal-deep text-cream" : "bg-cream text-charcoal"} py-24 md:py-32`}
    >
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}

function Problem() {
  return (
    <Section>
      <p className="eyebrow">The working DJ's problem</p>
      <h2 className="mt-6 max-w-4xl text-4xl md:text-6xl font-display font-bold">
        Lists hide your music.{" "}
        <span className="text-teal">Space reveals it.</span>
      </h2>
      <p className="mt-8 max-w-2xl text-lg text-charcoal/75">
        Every DJ has 1,000+ tracks they paid for, half of which they've forgotten.
        Rekordbox, Serato, Traktor — all lists, all scrolling. Tunefield drops you
        inside a six-dimensional universe of your own library, so what mixes with
        what isn't hidden three pages down. It's right next to you.
      </p>
    </Section>
  );
}

const FEATURES = [
  {
    icon: Activity,
    title: "Audio analysis",
    body: "BPM, key (Camelot), LUFS loudness, mood, danceability, valence, vocals, timbre — every track, 60 seconds, fully local.",
  },
  {
    icon: Disc3,
    title: "Camelot wheel",
    body: "Filter by harmonically compatible keys with four compat modes and a directional energy filter.",
  },
  {
    icon: Boxes,
    title: "3D Neural Matrix",
    body: "Every track is a sphere positioned by metrics you pick. Edges connect what mixes. Click to fly + play.",
  },
  {
    icon: Library,
    title: "Multi-catalog",
    body: "Separate catalogs per crate, per gig, per project. Import from Rekordbox or Apple Music.",
  },
  {
    icon: Tags,
    title: "Tags + ratings + genre",
    body: "User-editable. Five-star colour-coded ratings. Custom tag system. Editable genre per track.",
  },
  {
    icon: Wrench,
    title: "Library repair",
    body: "Find broken paths, missing covers, missing genres, duplicates. Optional Discogs + AcoustID enrichment.",
  },
];

function Features() {
  return (
    <Section id="features" dark>
      <h2 className="max-w-3xl text-4xl md:text-6xl font-display font-bold">
        Six things,{" "}
        <span className="relative inline-block">
          done well.
          <span className="absolute left-0 -bottom-2 h-[6px] w-full bg-pink rounded-full" />
        </span>
      </h2>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10 rounded-2xl overflow-hidden">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="bg-teal-deep p-8 md:p-10 flex flex-col gap-4">
            <Icon className="h-7 w-7 text-teal" strokeWidth={1.5} />
            <h3 className="font-display font-semibold text-cream text-xl">{title}</h3>
            <p className="text-cream/70 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function MatrixSection() {
  return (
    <Section id="matrix">
      <p className="eyebrow">The 6D Neural Matrix</p>
      <h2 className="mt-6 max-w-4xl text-4xl md:text-6xl font-display font-bold">
        Six dimensions. One universe.{" "}
        <span className="text-teal">Your library.</span>
      </h2>
      <div className="mt-14 rounded-3xl overflow-hidden bg-teal-deep aspect-[16/9] relative">
        <MatrixVisualization />
      </div>
      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {[
          ["3 axes", "X / Y / Z — pick any metric for each spatial dimension"],
          ["Color + size", "Two more dimensions: paint by mood, scale by energy"],
          ["Time", "The 6th dimension — fly through, watch sets unfold"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="font-mono text-sm text-teal">{k}</div>
            <p className="mt-2 text-charcoal/75">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-lg text-charcoal/75">
        Plus "High Vis" mode — fade every track that isn't compatible with your current
        selection. Suddenly the next mix isn't a guess. It's the closest star.
      </p>
    </Section>
  );
}

function MatrixVisualization() {
  // decorative SVG stand-in for the screenshot
  const nodes = Array.from({ length: 60 }).map((_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const r = seed / 233280;
    const seed2 = ((i + 17) * 1103515245 + 12345) % 2147483647;
    const r2 = (seed2 % 1000) / 1000;
    return {
      cx: 6 + r * 88,
      cy: 8 + r2 * 84,
      r: 0.6 + ((i % 7) / 7) * 1.6,
      c: i % 3,
    };
  });
  const colors = ["#11A5B3", "#F5B3D1", "#ECE6D8"];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#11A5B3" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0E2A2A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="#0E2A2A" />
      <circle cx="50" cy="50" r="55" fill="url(#glow)" />
      {nodes.flatMap((n, i) =>
        nodes.slice(i + 1, i + 3).map((m, j) => {
          const dx = n.cx - m.cx;
          const dy = n.cy - m.cy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 22) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={n.cx}
              y1={n.cy}
              x2={m.cx}
              y2={m.cy}
              stroke="#11A5B3"
              strokeWidth="0.15"
              strokeOpacity="0.35"
            />
          );
        }),
      )}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill={colors[n.c]} fillOpacity="0.9" />
      ))}
    </svg>
  );
}

function V2Vision() {
  return (
    <Section dark>
      <p className="eyebrow">Coming in V2</p>
      <h2 className="mt-6 max-w-4xl text-4xl md:text-6xl font-display font-bold text-cream">
        You are the current node. The music universe is around you.
      </h2>
      <div className="mt-14 grid md:grid-cols-2 gap-10">
        <div className="border-l-2 border-pink pl-6">
          <p className="text-cream/85 text-lg leading-relaxed">
            VR mode. WebXR-powered. Stand inside your library. Mixable tracks orbit you.
            Look at one to play it. Reach out to mix it.
          </p>
        </div>
        <div className="border-l-2 border-teal pl-6">
          <p className="text-cream/85 text-lg leading-relaxed">
            Distributor integration. Browse Beatport, Bandcamp, Traxsource without leaving
            Tunefield. Buy tracks that land straight into your catalog. Affiliate-funded,
            so V1 stays free.
          </p>
        </div>
      </div>
      <a
        href="#waitlist"
        className="mt-12 inline-flex items-center gap-2 rounded-full bg-teal text-cream px-6 py-3 font-medium hover:bg-teal/90 transition-colors"
      >
        Get on the V2 waitlist <ArrowRight className="h-4 w-4" />
      </a>
    </Section>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "€0",
      period: "forever",
      features:
        "Everything in V1: analysis, catalog, 3D matrix, repair, import. Open source.",
      cta: "Download free V1",
      ctaHref: "#download",
      soon: false,
      featured: false,
    },
    {
      name: "Pro",
      price: "€79",
      period: "one-time, lifetime license",
      features:
        "Everything in Free + VR mode + distributor browsing + cloud sync + native exports (Rekordbox XML / Traktor NML / M3U8)",
      cta: "Pre-order Pro for €59 →",
      ctaHref: "#waitlist",
      soon: true,
      featured: true,
    },
    {
      name: "Studio",
      price: "€15/mo",
      period: "or €150/yr",
      features:
        "For DJ schools + agencies. Multi-user libraries, team sharing, teaching mode.",
      cta: "Notify me",
      ctaHref: "#waitlist",
      soon: true,
      featured: false,
    },
  ];
  return (
    <Section id="pricing">
      <p className="eyebrow">Pricing</p>
      <h2 className="mt-6 max-w-3xl text-4xl md:text-6xl font-display font-bold">
        Free forever, with room to grow.
      </h2>
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-3xl p-8 flex flex-col border ${
              p.featured
                ? "bg-teal-deep text-cream border-teal-deep"
                : "bg-cream-warm border-charcoal/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-2xl">{p.name}</h3>
              {p.soon && (
                <span className="text-[10px] font-mono uppercase tracking-widest bg-pink text-charcoal px-2 py-1 rounded-full">
                  Coming soon
                </span>
              )}
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display font-bold text-5xl">{p.price}</span>
            </div>
            <div className={`text-sm ${p.featured ? "text-cream/60" : "text-charcoal/60"}`}>
              {p.period}
            </div>
            <p className={`mt-6 ${p.featured ? "text-cream/80" : "text-charcoal/75"} leading-relaxed`}>
              {p.features}
            </p>
            <a
              href={p.ctaHref}
              className={`mt-8 inline-flex justify-center items-center rounded-full px-5 py-3 font-medium transition-colors ${
                p.featured
                  ? "bg-pink text-charcoal hover:bg-pink/90"
                  : "bg-teal text-cream hover:bg-teal/90"
              }`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-charcoal/60 max-w-2xl">
        No subscriptions. No data harvesting. V1 stays free forever — that's a promise, not
        a marketing line.
      </p>
    </Section>
  );
}

function About() {
  return (
    <Section>
      <p className="eyebrow">Who's building this</p>
      <div className="mt-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-4">
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-teal/30 via-pink/20 to-teal-deep/20 border border-charcoal/10 flex items-center justify-center">
            <div className="font-display text-7xl text-teal-deep/30 font-bold">MB</div>
          </div>
        </div>
        <div className="md:col-span-8">
          <p className="text-2xl md:text-3xl font-display leading-snug text-charcoal">
            Tunefield is built by <span className="text-teal">Mark Burnett</span> — a
            working DJ, producer, and Ableton Certified Trainer based in Germany.
            Tunefield exists because the tool he wanted didn't exist. He's been organising
            DJ libraries for 20 years; this is the workflow that finally clicks.
          </p>
          <p className="mt-6 text-sm text-charcoal/60 font-mono">
            Built solo. AGPL-v3 licensed. Co-developed with{" "}
            <a
              href="https://claude.com/claude-code"
              className="underline hover:text-teal"
              target="_blank"
              rel="noreferrer"
            >
              Claude Code
            </a>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}

const FAQS = [
  [
    "Is it really free?",
    "Yes. V1 is open-source under AGPL v3 and will stay free forever. V2 adds paid features but the V1 core stays untouched.",
  ],
  [
    "Does it replace Rekordbox / Serato / Traktor?",
    "No. It complements them. You analyse and explore in Tunefield, then export playlists in their native formats for performance.",
  ],
  [
    "Where does my data live?",
    "On your computer. Tunefield is 100% offline by default. Cloud sync in V2 is optional and explicit — your audio files never leave your machine.",
  ],
  ["What file formats?", "MP3, FLAC, WAV, AAC, M4A, OGG, AIFF."],
  [
    "Does it work on USB sticks?",
    "Yes. Point Tunefield at any folder — local drive, external drive, USB stick — and it scans the files in place without copying. App overhead is under 1% of any modern USB stick.",
  ],
  [
    "What's the difference between this and Mixed In Key?",
    "Mixed In Key does keys well. We do keys plus mood, energy, LUFS, danceability, valence, vocals, timbre, and a 3D spatial map — and we're free.",
  ],
];

function FAQ() {
  return (
    <Section id="faq">
      <p className="eyebrow">FAQ</p>
      <h2 className="mt-6 text-4xl md:text-5xl font-display font-bold max-w-3xl">
        Questions, answered.
      </h2>
      <div className="mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map(([q, a], i) => (
            <AccordionItem key={i} value={`q-${i}`} className="border-charcoal/15">
              <AccordionTrigger className="text-left font-display text-lg md:text-xl text-charcoal hover:text-teal">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-charcoal/75 text-base leading-relaxed">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="waitlist" className="bg-teal-deep text-cream py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-cream">
          Be first when V2 ships.
        </h2>
        <p className="mt-6 text-lg text-cream/70 max-w-2xl mx-auto">
          VR mode, distributor browsing, cloud sync. Pre-order opens 2 months before launch
          at €59 (€20 off lifetime). Waitlist subscribers get first access and a discount
          code.
        </p>
        {/* [TODO: paste Buttondown/ConvertKit embed code here] */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) setSubmitted(true);
          }}
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
        >
          <label htmlFor="waitlist-email" className="sr-only">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
            className="flex-1 rounded-full bg-cream text-charcoal px-6 py-4 placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-pink"
          />
          <button
            type="submit"
            className="rounded-full bg-pink text-charcoal font-medium px-6 py-4 hover:bg-pink/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            {submitted ? "You're in ✓" : "Join the waitlist →"}
          </button>
        </form>
        <p className="mt-4 text-sm text-cream/50">
          No spam. One email when V2 ships. Unsubscribe in one click.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-cream border-t border-charcoal/10 py-16">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-10">
        <div>
          <Wordmark />
          <p className="mt-4 text-sm text-charcoal/70 max-w-xs">
            See your library, not just scroll it.
          </p>
          <p className="mt-4 text-xs text-charcoal/50">© 2026 Mark Burnett. AGPL v3.</p>
        </div>
        <div>
          <div className="eyebrow !text-charcoal/50">Product</div>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            <li><a href="#download" className="hover:text-teal">Download</a></li>
            <li><a href="#" className="hover:text-teal">Documentation</a></li>
            <li><a href="https://github.com/tunefield/app" className="hover:text-teal">GitHub</a></li>
            <li><a href="#" className="hover:text-teal">Changelog</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow !text-charcoal/50">Connect</div>
          <div className="mt-4 flex flex-wrap gap-3 text-charcoal/70">
            {[Github, Music2, Disc3, Youtube, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full border border-charcoal/15 flex items-center justify-center hover:text-teal hover:border-teal transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <a
            href="mailto:hello@tunefield.app"
            className="mt-4 inline-block text-sm text-charcoal/80 hover:text-teal"
          >
            hello@tunefield.app
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-12 flex flex-wrap gap-x-6 gap-y-2 text-xs text-charcoal/50">
        <a href="/privacy" className="hover:text-teal">Privacy</a>
        <a href="/terms" className="hover:text-teal">Terms</a>
        <a href="#" className="hover:text-teal">Press kit</a>
      </div>
    </footer>
  );
}

function TunefieldLanding() {
  return (
    <div className="bg-cream min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Features />
        <MatrixSection />
        <V2Vision />
        <Pricing />
        <About />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
