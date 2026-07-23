import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/beta")({
  component: BetaPage,
  head: () => ({
    meta: [
      { title: "tunefield. — Apply for beta testing" },
      { name: "description", content: "Apply to help beta test Tunefield." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

// ── Paste the Tally form ID here once the form is created ──────────────────
// In Tally: open the form → Share → Embed → copy the ID from the embed URL
// (https://tally.so/embed/XXXXXX?... → XXXXXX). Then redeploy.
const TALLY_FORM_ID = "LZqM2J";
// ───────────────────────────────────────────────────────────────────────────

function TallyEmbed() {
  useEffect(() => {
    if (TALLY_FORM_ID === "REPLACE_WITH_TALLY_FORM_ID") return;
    const w = window as unknown as { Tally?: { loadEmbeds: () => void } };
    const run = () => w.Tally?.loadEmbeds();
    if (w.Tally) {
      run();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://tally.so/widgets/embed.js"]',
    );
    if (existing) {
      existing.addEventListener("load", run);
      return () => existing.removeEventListener("load", run);
    }
    const s = document.createElement("script");
    s.src = "https://tally.so/widgets/embed.js";
    s.async = true;
    s.onload = run;
    document.body.appendChild(s);
  }, []);

  if (TALLY_FORM_ID === "REPLACE_WITH_TALLY_FORM_ID") {
    return (
      <div className="rounded-2xl border border-charcoal/15 bg-cream-warm p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-charcoal/55">
          Beta form
        </p>
        <p className="mt-3 text-charcoal/70">
          The application form is being finalised. In the meantime, email{" "}
          <a href="mailto:mark@tunefield.app" className="underline hover:text-teal">
            mark@tunefield.app
          </a>{" "}
          to register your interest.
        </p>
      </div>
    );
  }

  // transparentBackground=1 → the form has no background of its own and blends
  // into the cream page. (Tally form theme should use dark text + no/transparent
  // background so it reads on cream.)
  const embedSrc = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
  return (
    <iframe
      data-tally-src={embedSrc}
      loading="lazy"
      width="100%"
      height={320}
      title="Tunefield beta application"
      className="w-full block"
      style={{ border: 0 }}
    />
  );
}

function BetaPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal flex flex-col items-center px-6 py-16 md:py-24">
      <a href="/" className="font-display font-bold text-3xl tracking-tight text-charcoal">
        tunefield<span className="text-pink">.</span>
      </a>

      <div className="mt-12 w-full max-w-xl">
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-charcoal">
          Apply for beta testing
        </h1>
        <p className="mt-5 text-lg text-charcoal/70 leading-relaxed">
          Tunefield turns your library into a navigable field — free, offline, built by a
          DJ. We're bringing a small group of DJs in early to help shape it before launch.
          Tell us about your setup and we'll be in touch.
        </p>

        <div className="mt-10">
          <TallyEmbed />
        </div>

        <p className="mt-8 font-mono text-[11px] leading-relaxed text-charcoal/50">
          We use what you submit only to contact you about the beta (and, if you opt in,
          the launch). We never sell your data and store the minimum needed. You can
          withdraw consent anytime at{" "}
          <a href="mailto:mark@tunefield.app" className="underline hover:text-teal">
            mark@tunefield.app
          </a>
          . See our{" "}
          <a href="/legal/datenschutz" className="underline hover:text-teal">Datenschutzerklärung</a>{" "}
          and{" "}
          <a href="/legal/impressum" className="underline hover:text-teal">Impressum</a>.
        </p>
      </div>
    </div>
  );
}
