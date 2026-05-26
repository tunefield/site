import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
  Glasses,
  ShoppingBag,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LazyMatrix } from "@/components/LazyMatrix";
import type { MatrixStage } from "@/components/MatrixCanvas";
import { motion, useInView, useMotionValue, animate, AnimatePresence, useSpring, useTransform } from "framer-motion";

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

function useHeroPrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// Cinematic looping headline. Phrases cycle: "ARE YOU READY?" -> "NEXT GENERATION"
// -> "MUSIC EXPLORATION" -> "IS HERE." (climactic pink). Each phrase enters scale+blur->sharp
// and exits with a tiny scale-up + blur-out before the next one slams in.
const HEADLINE_PHRASES: { text: string; pink?: boolean; holdMs: number }[] = [
  { text: "ARE YOU READY?", holdMs: 1600 },
  { text: "NEXT GENERATION", holdMs: 1600 },
  { text: "MUSIC EXPLORATION", holdMs: 1700 },
  { text: "IS HERE.", pink: true, holdMs: 2200 },
];

function HeadlineSequence({ reduced }: { reduced: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(
      () => setI((v) => (v + 1) % HEADLINE_PHRASES.length),
      HEADLINE_PHRASES[i].holdMs,
    );
    return () => clearTimeout(id);
  }, [i, reduced]);
  // Reduced motion: show the climactic phrase statically.
  const phrase = reduced ? HEADLINE_PHRASES[HEADLINE_PHRASES.length - 1] : HEADLINE_PHRASES[i];
  return (
    <div
      className="relative hero-headline leading-[1] h-[1.05em] md:h-[1em]"
      aria-label="Are you ready? Next generation music exploration is here."
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={phrase.text}
          aria-hidden
          className={`absolute inset-0 font-bold tracking-tight whitespace-nowrap ${
            phrase.pink ? "text-pink" : "text-cream"
          }`}
          initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.06, filter: "blur(12px)" }}
          transition={{ duration: 0.45, ease: [0.2, 0.6, 0.2, 1] }}
        >
          {phrase.text}
          {phrase.pink && (
            <motion.span
              className="absolute -inset-x-2 inset-y-0 -z-10 rounded-2xl bg-pink/30 blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            />
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Typewriter subhead with the pink underline kicking in as the key phrase types out.
const SUBHEAD_TEXT =
  "Teleport into a 5-dimensional music universe, defined by you. Every track is a star — positioned by BPM, key, mood, energy, loudness, danceability. Free, offline, instant.";
const SUBHEAD_HIGHLIGHT = "5-dimensional music universe";
const SUBHEAD_HIGHLIGHT_START = SUBHEAD_TEXT.indexOf(SUBHEAD_HIGHLIGHT);
const SUBHEAD_HIGHLIGHT_END = SUBHEAD_HIGHLIGHT_START + SUBHEAD_HIGHLIGHT.length;

function TypewriterSubhead({ reduced }: { reduced: boolean }) {
  const [count, setCount] = useState(reduced ? SUBHEAD_TEXT.length : 0);
  useEffect(() => {
    if (reduced) return;
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setCount((c) => {
          if (c >= SUBHEAD_TEXT.length) {
            clearInterval(id);
            return c;
          }
          return c + 2;
        });
      }, 16);
      return () => clearInterval(id);
    }, 1400);
    return () => clearTimeout(start);
  }, [reduced]);
  const before = SUBHEAD_TEXT.slice(0, Math.min(count, SUBHEAD_HIGHLIGHT_START));
  const universe = SUBHEAD_TEXT.slice(SUBHEAD_HIGHLIGHT_START, Math.min(count, SUBHEAD_HIGHLIGHT_END));
  const after = SUBHEAD_TEXT.slice(SUBHEAD_HIGHLIGHT_END, count);
  const showingUniverse = count >= SUBHEAD_HIGHLIGHT_START;
  const universeComplete = count >= SUBHEAD_HIGHLIGHT_END;
  const stillTyping = !reduced && count < SUBHEAD_TEXT.length;
  return (
    <p className="mt-8 text-cream/85 prose-lede">
      {before}
      {showingUniverse && (
        <span className={universeComplete ? "pink-underline" : ""}>{universe}</span>
      )}
      {after}
      {stillTyping && (
        <span className="inline-block w-[2px] h-[1em] -mb-[2px] bg-cream/70 ml-0.5 align-middle animate-pulse" />
      )}
    </p>
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
  const reducedMotion = useHeroPrefersReducedMotion();
  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % STATS.length), 4000);
    return () => clearInterval(id);
  }, []);

  // Mouse-tracking parallax. Cursor pos -> normalized [-1, +1] across viewport,
  // springs damp the lag so the text feels like it floats over the video plane.
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mxSpring = useSpring(mxRaw, { stiffness: 80, damping: 20, mass: 0.6 });
  const mySpring = useSpring(myRaw, { stiffness: 80, damping: 20, mass: 0.6 });
  const parallaxX = useTransform(mxSpring, [-1, 1], [-10, 10]);
  const parallaxY = useTransform(mySpring, [-1, 1], [-6, 6]);
  useEffect(() => {
    if (reducedMotion) return;
    const handler = (e: MouseEvent) => {
      mxRaw.set((e.clientX / window.innerWidth - 0.5) * 2);
      myRaw.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [reducedMotion, mxRaw, myRaw]);

  const trustBadges = [
    "100% offline",
    "Open source",
    "Mac / Windows / Linux",
    "Under 1% of your USB stick",
  ];

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-teal-deep text-cream pt-32 pb-24 md:pt-40 md:pb-32 min-h-[720px] md:min-h-[820px]"
    >
      {/* Full-bleed cinematic background: muted looping video (or static poster if user prefers reduced motion). */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {reducedMotion ? (
          <img
            src="/hero-poster.jpg"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero-poster.jpg"
          >
            <source src="/hero-mobile.mp4#t=0.001" type="video/mp4" media="(max-width: 768px)" />
            <source src="/hero.mp4#t=0.001" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/80 to-teal-deep/30 md:via-teal-deep/65 md:to-teal-deep/10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-teal-deep/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-teal-deep to-transparent pointer-events-none" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-12 gap-8">
        <motion.div
          className="md:col-span-8 pointer-events-none [&_a]:pointer-events-auto"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            5-Dimensional music visualisation
          </motion.p>
          <div className="mt-6">
            <HeadlineSequence reduced={reducedMotion} />
          </div>
          <TypewriterSubhead reduced={reducedMotion} />
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
            <motion.a
              href="#download"
              className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-cream border border-cream/20 transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(180deg, #11A5B3, #0E8D99)" }}
              animate={
                reducedMotion
                  ? undefined
                  : {
                      scale: [1, 1.025, 1],
                      boxShadow: [
                        "0 0 0px 0px rgba(245,179,209,0)",
                        "0 0 24px 4px rgba(245,179,209,0.35)",
                        "0 0 0px 0px rgba(245,179,209,0)",
                      ],
                    }
              }
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="absolute -inset-2 -z-10 rounded-full bg-pink/0 group-hover:bg-pink/25 blur-xl transition-all duration-300" />
              Download free V1
              <ArrowRight className="h-4 w-4" />
            </motion.a>
            <a
              href="#waitlist"
              className="dashed-anim inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium text-pink hover:text-charcoal hover:bg-pink/90 transition-colors border border-transparent"
            >
              Join V2 waitlist
            </a>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/60">
            {trustBadges.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + i * 0.12, duration: 0.45, ease: "easeOut" }}
              >
                {b}
                {i < trustBadges.length - 1 && (
                  <span className="ml-6 text-cream/30">·</span>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
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
        inside a five-dimensional universe of your own library, so what mixes with
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
  const v1Cards = FEATURES;
  const v2Cards = [
    {
      icon: Layers,
      title: "Texture channel",
      body: "A sixth visual dimension. Every sphere gains a surface — matte, glossy, fibrous, crystalline, granular — driven by any metric you pick. Roughness becomes meaning.",
      v2: true,
    },
    {
      icon: Glasses,
      title: "VR mode",
      body: "WebXR-powered. Stand inside your library. Mixable tracks orbit you. Look at one to play it. Reach out to mix it.",
      v2: true,
    },
    {
      icon: ShoppingBag,
      title: "Distributor integrations",
      body: "Browse Beatport, Juno, Bandcamp, Traxsource without leaving Tunefield. Buy tracks that land straight into your catalog. Affiliate-funded — V1 stays free forever.",
      v2: true,
    },
  ];
  return (
    <Section id="features" dark>
      <h2 className="max-w-3xl text-4xl md:text-6xl font-display font-bold">
        Nine things,{" "}
        <span className="relative inline-block">
          done well.
          <span className="absolute left-0 -bottom-2 h-[6px] w-full bg-pink rounded-full" />
        </span>
      </h2>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {v1Cards.slice(0, 4).map((c) => (
          <FeatureCard key={c.title} {...c} />
        ))}
        <div className="hidden lg:block" />
        {v1Cards.slice(4, 6).map((c) => (
          <FeatureCard key={c.title} {...c} />
        ))}
        <div className="hidden lg:block" />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {v2Cards.map((c) => (
          <FeatureCard key={c.title} {...c} featured />
        ))}
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
  const stages = useMemo(
    () =>
      [
        { key: "position" as MatrixStage, label: "Position", caption: "X / Y / Z is any metric you pick." },
        { key: "color" as MatrixStage, label: "Color", caption: "Mood, key, genre — painted across the field." },
        { key: "edges" as MatrixStage, label: "Edges", caption: "What mixes with what, drawn between stars." },
        { key: "highvis" as MatrixStage, label: "High Vis", caption: "The closest star is your next mix." },
      ],
    [],
  );
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pauseTimer = useRef<number | null>(null);

  const jump = (i: number) => {
    setIdx(i);
    setPaused(true);
    if (pauseTimer.current) window.clearTimeout(pauseTimer.current);
    pauseTimer.current = window.setTimeout(() => setPaused(false), 12000);
  };

  useEffect(() => {
    if (paused || hover) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % stages.length), 4000);
    return () => window.clearInterval(id);
  }, [paused, hover, stages.length]);

  useEffect(() => {
    setProgress(0);
    if (paused || hover) return;
    const start = Date.now();
    const id = window.setInterval(() => {
      const e = ((Date.now() - start) / 4000) * 100;
      setProgress(Math.min(100, e));
    }, 60);
    return () => window.clearInterval(id);
  }, [idx, paused, hover]);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") jump((idx + 1) % stages.length);
      else if (e.key === "ArrowLeft") jump((idx - 1 + stages.length) % stages.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, idx, stages.length]);

  return (
    <section id="matrix" ref={ref} className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow">The 5D Neural Matrix</p>
        <h2 className="mt-4 max-w-4xl text-3xl md:text-5xl font-display font-bold text-charcoal">
          Five dimensions. One universe.{" "}
          <span className="pink-underline text-charcoal">Your library.</span>
        </h2>
        <div
          className="mt-10 flex flex-col-reverse md:grid md:grid-cols-10 gap-6"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="md:col-span-3 flex flex-col gap-1.5">
            {stages.map((s, i) => (
              <button
                key={s.key}
                onClick={() => jump(i)}
                className={`text-left p-4 rounded-xl border-l-2 transition-colors ${
                  i === idx
                    ? "border-pink bg-cream-warm"
                    : "border-transparent hover:bg-cream-warm/60"
                }`}
              >
                <div
                  className={`font-display text-lg ${
                    i === idx ? "font-bold text-charcoal" : "text-charcoal/55"
                  }`}
                >
                  {s.label}
                </div>
                <div
                  className={`text-sm mt-1 ${
                    i === idx ? "text-charcoal/75" : "text-charcoal/40"
                  }`}
                >
                  {s.caption}
                </div>
              </button>
            ))}
            <div className="p-4 rounded-xl border-l-2 border-transparent opacity-70 cursor-not-allowed">
              <div className="flex items-center gap-2">
                <div className="font-display text-lg text-charcoal/50">Texture</div>
                <span className="text-[10px] font-mono uppercase tracking-widest bg-pink text-charcoal px-2 py-0.5 rounded-full">
                  V2
                </span>
              </div>
              <div className="text-sm mt-1 text-charcoal/40">
                Surface material per sphere — ships with V2.
              </div>
            </div>
            <div className="mt-3 h-1 w-full bg-charcoal/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-pink"
                style={{ width: `${progress}%`, transition: "width 80ms linear" }}
              />
            </div>
          </div>
          <div
            className="md:col-span-7 relative rounded-3xl overflow-hidden bg-teal-deep"
            style={{ height: "clamp(360px, 56vw, 640px)" }}
          >
            <LazyMatrix count={90} showTooltip={false} stage={stages[idx].key} />
          </div>
        </div>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
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
  const [showPlus, setShowPlus] = useState(false);
  const [upgraded, setUpgraded] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, 5, { duration: 1.6, ease: "easeOut" });
    const unsub = mv.on("change", (v) => setVal(Math.round(v)));
    const t1 = setTimeout(() => setShowPlus(true), 1600 + 600);
    const t2 = setTimeout(() => {
      setUpgraded(true);
      setVal(6);
    }, 1600 + 600 + 700);
    return () => {
      controls.stop();
      unsub();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [inView, mv]);
  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className="relative font-display font-bold text-pink leading-none" style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}>
        <motion.span
          key={upgraded ? "six" : "count"}
          initial={upgraded ? { scale: 0.7, opacity: 0 } : false}
          animate={upgraded ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="inline-block"
        >
          {val}
        </motion.span>
        {showPlus && !upgraded && (
          <motion.span
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, -10, -30, -50], scale: [0.6, 1, 1, 1.1] }}
            transition={{ duration: 0.7, times: [0, 0.3, 0.7, 1] }}
            className="absolute left-full top-0 ml-2 text-pink"
            style={{ fontSize: "0.35em" }}
          >
            +1
          </motion.span>
        )}
      </div>
      <p className="mt-4 max-w-xl text-cream/75 text-lg">
        Five dimensions today. Six when V2 ships.
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
  const plans = [
    {
      name: "Free",
      price: "€0",
      period: "forever",
      features:
        "Everything in V1: analysis, catalog, 5D matrix, repair, import. Open source.",
      cta: "Download free V1",
      ctaHref: "#download",
      soon: false,
      featured: false,
      ctaStyle: "primary" as const,
    },
    {
      name: "Pro",
      price: "€79",
      period: "one-time, lifetime license",
      features:
        "Everything in Free + VR mode + texture channel (6th dimension) + distributor browsing + cloud sync + native exports (Rekordbox XML / Traktor NML / M3U8).",
      cta: "Pre-order Pro for €59 →",
      ctaHref: "#waitlist",
      soon: true,
      featured: true,
      ctaStyle: "sheen" as const,
    },
    {
      name: "Studio",
      price: "€10/mo",
      period: "or €100/yr",
      features:
        "For DJ schools + agencies. Multi-user libraries, team sharing, teaching mode, priority support.",
      cta: "Notify me when Studio launches →",
      ctaHref: "#waitlist",
      soon: true,
      featured: false,
      ctaStyle: "pink-outline" as const,
    },
  ];
  return (
    <Section id="pricing">
      <p className="eyebrow">Pricing</p>
      <h2 className="mt-6 max-w-3xl text-4xl md:text-6xl font-display font-bold">
        Free forever, with room to grow.
      </h2>
      <div className="mt-14 grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-3xl p-8 flex flex-col border transition-transform ${
              p.featured
                ? "bg-teal-deep text-cream border-teal-deep md:scale-[1.03] md:-translate-y-1 shadow-[0_30px_80px_-30px_rgba(17,165,179,0.6)]"
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
            <p
              className={`mt-6 flex-1 ${
                p.featured ? "text-cream/80" : "text-charcoal/75"
              } leading-relaxed`}
            >
              {p.features}
            </p>
            <a
              href={p.ctaHref}
              className={`mt-8 inline-flex justify-center items-center rounded-full px-5 py-3 font-medium transition-colors ${
                p.ctaStyle === "sheen"
                  ? "btn-sheen bg-pink text-charcoal hover:bg-pink/90"
                  : p.ctaStyle === "pink-outline"
                    ? "border-2 border-pink text-pink hover:bg-pink hover:text-charcoal"
                    : "bg-teal text-cream hover:bg-teal/90"
              }`}
            >
              {p.cta}
            </a>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-charcoal/60 max-w-2xl">
        No subscriptions on Free or Pro. No data harvesting. V1 stays free forever —
        that's a promise, not a marketing line.
      </p>
    </Section>
  );
}

function About() {
  return (
    <Section>
      <p className="eyebrow">Who's behind this</p>
      <div className="mt-10 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-4">
          <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-teal/30 via-pink/20 to-teal-deep/20 border border-charcoal/10 flex items-center justify-center">
            <div className="font-display text-7xl text-teal-deep/30 font-bold">MB</div>
          </div>
        </div>
        <div className="md:col-span-8">
          <p className="text-2xl md:text-3xl font-display leading-snug text-charcoal">
            Tunefield is a concept by <span className="text-teal">Mark Burnett</span>. He
            started DJing at 13. Three and a half decades on, what he's learned is this:
            the magic happens in the unexpected connections — when a room shifts because
            two tracks no one saw together get mixed. Lists hide those connections. Space
            reveals them. He worked with Claude Code to build the tool that finally makes
            them visible. Tunefield exists in service of diversity, exploration, and
            connection through music.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Ableton Certified Trainer", "34 years DJing", "Event Programmer"].map((chip) => (
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
    "Mixed In Key does keys well. We do keys plus mood, energy, LUFS, danceability, valence, vocals, timbre, and a 5D spatial map — and we're free.",
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
            Fly through your music. Five dimensions, defined by you. Six in V2.
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
