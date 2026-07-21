import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/beta")({
  component: BetaPage,
  head: () => ({
    meta: [
      { title: "Apply for beta testing — Tunefield" },
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
    const s = document.createElement("script");
    s.src = "https://tally.so/widgets/embed.js";
    s.async = true;
    document.body.appendChild(s);
    return () => {
      s.remove();
    };
  }, []);

  if (TALLY_FORM_ID === "REPLACE_WITH_TALLY_FORM_ID") {
    return (
      <div className="rounded-2xl border border-cream/20 bg-cream/5 p-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cream/55">
          Beta form
        </p>
        <p className="mt-3 text-cream/70">
          The application form is being finalised. In the meantime, email{" "}
          <a href="mailto:hello@tunefield.app" className="underline hover:text-teal">
            hello@tunefield.app
          </a>{" "}
          to register your interest.
        </p>
      </div>
    );
  }

  const embedSrc = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&dynamicHeight=1`;
  return (
    <div className="rounded-2xl overflow-hidden bg-white">
      <iframe
        // src set directly so the form loads even if embed.js hasn't run yet;
        // data-tally-src lets embed.js take over for dynamic height once loaded.
        src={embedSrc}
        data-tally-src={embedSrc}
        loading="lazy"
        width="100%"
        height={700}
        title="Tunefield beta application"
        className="w-full block"
      />
    </div>
  );
}

function BetaPage() {
  return (
    <div className="min-h-screen bg-teal-deep text-cream flex flex-col items-center px-6 py-16 md:py-24">
      <a href="/" className="font-display font-bold text-3xl tracking-tight text-cream">
        tunefield<span className="text-pink">.</span>
      </a>

      <div className="mt-12 w-full max-w-xl">
        <h1 className="font-display font-bold text-4xl md:text-5xl tracking-tight">
          Apply for beta testing
        </h1>
        <p className="mt-5 text-lg text-cream/75 leading-relaxed">
          Tunefield turns your library into a navigable field — free, offline, built by a
          DJ. We're bringing a small group of DJs in early to help shape it before launch.
          Tell us about your setup and we'll be in touch.
        </p>

        <div className="mt-10">
          <TallyEmbed />
        </div>

        <p className="mt-8 font-mono text-[11px] leading-relaxed text-cream/45">
          We use what you submit only to contact you about the beta (and, if you opt in,
          the launch). We never sell your data and store the minimum needed. You can
          withdraw consent anytime at{" "}
          <a href="mailto:hello@tunefield.app" className="underline hover:text-teal">
            hello@tunefield.app
          </a>
          . Full privacy policy coming with launch.
        </p>
      </div>
    </div>
  );
}
