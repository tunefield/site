import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  Layers,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LazyMatrix } from "@/components/LazyMatrix";
import { motion, useInView, useScroll, useMotionValue, animate } from "framer-motion";

export const Route = createFileRoute("/")({
  component: TunefieldLanding,
});

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2 ${className}`}>
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
  const STATS = [
    "> scanning library...",
    "> 1,247 tracks analyzed in 38 seconds",
    "> 89 harmonic neighbors found for \"Strobe (Deadmau5)\"",
    "> 0 cloud requests · 100% local",
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % STATS.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-teal-deep text-cream pt-32 pb-24 md:pt-40 md:pb-32"
    >
      <div
        className="absolute inset-0 md:inset-y-0 md:right-0 md:left-1/3"
        aria-hidden
      >
        <LazyMatrix count={80} />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/85 to-transparent md:via-teal-deep/70 md:to-transparent pointer-events-none" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-7 pointer-events-none [&_a]:pointer-events-auto">
          <p className="eyebrow">5-Dimensional music visualisation</p>
          <h1 className="mt-6 hero-headline text-cream">
            <span className="font-normal">Tired of managing</span>
            <br />
            <span className="font-bold text-pink">lists?</span>
          </h1>
          <p className="mt-8 text-cream/85 prose-lede">
            Teleport into a <span className="pink-underline text-charcoal">5-dimensional music universe</span>,
            defined by you. Every track is a star — positioned by BPM, key, mood,
            energy, loudness, danceability. Free, offline, instant.
          </p>
          <div className="mt-6 font-mono text-[12px] text-cream/60 h-5 overflow-hidden">
            <motion.div
              key={tick}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {STATS[tick]}
            </motion.div>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#download"
              className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-cream border border-cream/20 transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(180deg, #11A5B3, #0E8D99)" }}
            >
              <span className="absolute -inset-2 -z-10 rounded-full bg-pink/0 group-hover:bg-pink/25 blur-xl transition-all duration-300" />
              Download free V1
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#waitlist"
              className="dashed-anim inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-pink hover:text-charcoal hover:bg-pink/90 transition-colors border border-transparent"
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
    title: "5D Neural Matrix",
    body: "Every track is a star in a 5-dimensional universe — X, Y, Z, color, size. Fly through it. Click to play. Texture lands in V2.",
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
  const cards = [
    ...FEATURES,
    {
      icon: Layers,
      title: "Texture channel",
      body: "A sixth visual dimension. Every sphere gains a surface — matte, glossy, fibrous, crystalline, granular — driven by any metric you pick. Roughness becomes meaning.",
      v2: true,
    },
  ];
  return (
    <Section id="features" dark>
      <h2 className="max-w-3xl text-4xl md:text-6xl font-display font-bold">
        Seven things,{" "}
        <span className="relative inline-block">
          done well.
          <span className="absolute left-0 -bottom-2 h-[6px] w-full bg-pink rounded-full" />
        </span>
      </h2>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.slice(0, 4).map((c) => (
          <FeatureCard key={c.title} {...c} />
        ))}
        <div className="hidden lg:block" />
        {cards.slice(4, 6).map((c) => (
          <FeatureCard key={c.title} {...c} />
        ))}
        <div className="hidden lg:block" />
        <div className="lg:col-span-4 flex justify-center">
          <div className="w-full lg:w-1/3">
            <FeatureCard {...cards[6]} featured />
          </div>
        </div>
      </div>
    </Section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  v2,
  featured,
}: {
  icon: typeof Activity;
  title: string;
  body: string;
  v2?: boolean;
  featured?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`relative group bg-teal-deep p-8 md:p-10 flex flex-col gap-4 rounded-2xl border ${
        featured ? "border-pink/40" : "border-cream/10"
      } hover:shadow-[0_20px_60px_-20px_rgba(17,165,179,0.5)] transition-shadow`}
    >
      {v2 && (
        <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest bg-pink text-charcoal px-2 py-0.5 rounded-full">
          V2
        </span>
      )}
      <Icon
        className="h-7 w-7 text-teal transition-transform group-hover:scale-110 group-hover:rotate-6"
        strokeWidth={1.5}
      />
      <h3 className="font-display font-semibold text-cream text-xl">{title}</h3>
      <p className="text-cream/70 leading-relaxed">{body}</p>
    </motion.div>
  );
}

function MatrixSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stages = [
    { range: [0, 0.25], caption: "Position — X / Y / Z is any metric you pick." },
    { range: [0.25, 0.5], caption: "Color — mood, key, genre, painted across the field." },
    { range: [0.5, 0.75], caption: "Edges — what mixes with what, drawn between stars." },
    { range: [0.75, 1.0], caption: "High Vis — the closest star is your next mix." },
  ];
  const [stage, setStage] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = stages.findIndex(({ range }) => v >= range[0] && v < range[1]);
      setStage(idx === -1 ? stages.length - 1 : idx);
    });
  }, [scrollYProgress]);
  return (
    <section id="matrix" ref={ref} className="relative bg-cream" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pt-24 w-full">
          <p className="eyebrow">The 5D Neural Matrix</p>
          <h2 className="mt-4 max-w-4xl text-3xl md:text-5xl font-display font-bold text-charcoal">
            Five dimensions. One universe.{" "}
            <span className="pink-underline text-charcoal">Your library.</span>
          </h2>
        </div>
        <div className="relative flex-1 mt-6 mx-4 md:mx-8 rounded-3xl overflow-hidden bg-teal-deep">
          <LazyMatrix count={90} showTooltip={false} />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-gradient-to-t from-teal-deep via-teal-deep/70 to-transparent">
            <motion.p
              key={stage}
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45 }}
              className="font-display font-semibold text-cream text-2xl md:text-3xl max-w-3xl"
            >
              {stages[stage].caption}
            </motion.p>
            <div className="mt-4 flex gap-1.5">
              {stages.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i <= stage ? "bg-pink" : "bg-cream/15"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-3 gap-8">
          {[
            ["X / Y / Z", "Three spatial axes — pick any metric for each"],
            ["Color + size", "Two more dimensions: paint by mood, scale by energy"],
            ["Texture (V2)", "The sixth dimension — surface material per sphere"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-mono text-sm text-teal">{k}</div>
              <p className="mt-2 text-charcoal/75">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DimensionCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, 6, { duration: 1.6, ease: "easeOut" });
    const unsub = mv.on("change", (v) => setVal(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, mv]);
  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="font-display font-bold text-pink leading-none" style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}>
        {val}
      </div>
      <p className="mt-4 max-w-xl text-cream/75 text-lg">
        Six dimensions of musical meaning. One sphere at a time.
      </p>
    </div>
  );
}

function V2Vision() {
  return (
    <Section dark>
      <p className="eyebrow">Coming in V2</p>
      <h2 className="mt-6 max-w-4xl text-4xl md:text-6xl font-display font-bold text-cream">
        You are the current node. The music universe is around you.
      </h2>
      <div className="mt-16">
        <DimensionCounter />
      </div>
      <div className="mt-16 grid md:grid-cols-3 gap-10">
        <div className="border-l-2 border-pink pl-6">
          <div className="font-mono text-xs uppercase tracking-widest text-pink mb-2">VR mode</div>
          <p className="text-cream/85 text-lg leading-relaxed">
            WebXR-powered. Stand inside your library. Mixable tracks orbit you. Look at one
            to play it. Reach out to mix it.
          </p>
        </div>
        <div className="border-l-2 border-teal pl-6">
          <div className="font-mono text-xs uppercase tracking-widest text-teal mb-2">Texture channel</div>
          <p className="text-cream/85 text-lg leading-relaxed">
            Six visual dimensions instead of five. Every sphere gains a surface material —
            roughness, glow, pattern, crystalline structure — driven by any metric you
            choose. The matrix stops being abstract and starts feeling tactile.
          </p>
        </div>
        <div className="border-l-2 border-cream/40 pl-6">
          <div className="font-mono text-xs uppercase tracking-widest text-cream/70 mb-2">Distributor integration</div>
          <p className="text-cream/85 text-lg leading-relaxed">
            Browse Beatport, Bandcamp, Traxsource without leaving Tunefield. Buy straight
            into your catalog. Affiliate-funded so V1 stays free forever.
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
  const [tier, setTier] = useState<"solo" | "studio" | "enterprise">("solo");
  const allPlans = [
    {
      name: "Free",
      audience: "solo",
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
      audience: "solo",
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
      audience: "studio",
      price: "€15/mo",
      period: "or €150/yr",
      features:
        "For DJ schools + agencies. Multi-user libraries, team sharing, teaching mode.",
      cta: "Notify me",
      ctaHref: "#waitlist",
      soon: true,
      featured: false,
    },
    {
      name: "Studio+",
      audience: "studio",
      price: "€39/mo",
      period: "unlimited seats",
      features: "Unlimited team seats, shared crates, role-based access, SSO.",
      cta: "Notify me",
      ctaHref: "#waitlist",
      soon: true,
      featured: false,
    },
    {
      name: "Enterprise",
      audience: "enterprise",
      price: "Custom",
      period: "white-glove",
      features: "Festivals, broadcasters, libraries. Self-hosted option, custom analysis pipeline.",
      cta: "Contact us",
      ctaHref: "mailto:hello@tunefield.app",
      soon: true,
      featured: false,
    },
  ];
  const plans = allPlans.filter((p) => p.audience === tier || (tier === "solo" && p.audience === "solo"));
  return (
    <Section id="pricing">
      <p className="eyebrow">Pricing</p>
      <h2 className="mt-6 max-w-3xl text-4xl md:text-6xl font-display font-bold">
        Free forever, with room to grow.
      </h2>
      <div className="mt-10 inline-flex p-1 rounded-full bg-cream-warm border border-charcoal/10">
        {(["solo", "studio", "enterprise"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
              tier === t ? "bg-teal text-cream" : "text-charcoal/70 hover:text-charcoal"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <motion.div
            key={p.name}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
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
                  ? "btn-sheen bg-pink text-charcoal hover:bg-pink/90"
                  : "bg-teal text-cream hover:bg-teal/90"
              }`}
            >
              {p.cta}
            </a>
          </motion.div>
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
          <div className="mt-6 flex flex-wrap gap-2">
            {["Ableton Certified Trainer", "20 years DJing", "Based in Germany 🇩🇪"].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center text-sm bg-cream-warm text-charcoal border-l-2 border-teal pl-3 pr-4 py-1.5 rounded-r-md"
              >
                {chip}
              </span>
            ))}
          </div>
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
  const count = 1247;
  return (
    <section id="waitlist" className="relative overflow-hidden bg-teal-deep text-cream py-24 md:py-32">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <LazyMatrix count={70} showTooltip={false} />
      </div>
      <div className="absolute inset-0 bg-teal-deep/30 pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
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
          className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto items-stretch"
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
            className="flex-1 bg-transparent text-cream text-lg px-2 py-4 border-b-2 border-teal placeholder:text-cream/40 focus:outline-none focus:border-pink transition-colors"
            style={{ minHeight: 60 }}
          />
          <button
            type="submit"
            className="group rounded-full bg-pink text-charcoal font-medium px-7 py-4 hover:bg-pink/90 transition-colors inline-flex items-center justify-center gap-2"
          >
            {submitted ? "You're in ✓" : (<>Join the waitlist <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
          </button>
        </form>
        <div className="mt-10 max-w-md mx-auto">
          <div className="flex items-center gap-3 text-cream/80 text-sm font-mono">
            <div className="flex-1 h-1.5 bg-cream/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${Math.min(100, (count / 2000) * 100)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-teal"
              />
            </div>
            <span>{count.toLocaleString()} DJs on the waitlist</span>
          </div>
        </div>
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
      <div className="mx-auto max-w-7xl px-6 mb-8 font-mono text-xs text-charcoal/40">
        // the field is listening
      </div>
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-10">
        <div>
          <Wordmark />
          <p className="mt-4 text-sm text-charcoal/70 max-w-xs">
            Fly through your music. Six dimensions, defined by you.
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
