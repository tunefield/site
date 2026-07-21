import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/press")({
  component: PressPage,
  head: () => ({
    meta: [
      { title: "Tunefield — Press kit" },
      { name: "description", content: "Tunefield press kit — assets, facts, contact." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const ASSETS: { name: string; file: string; meta: string; kind: "img" | "video" }[] = [
  { name: "Logo mark (transparent)", file: "/press/logo-mark.png", meta: "PNG · transparent · 512px", kind: "img" },
  { name: "Logo on brand background", file: "/press/logo-teal.png", meta: "PNG · teal-deep · 180px", kind: "img" },
  { name: "Open Graph card", file: "/press/og-image.png", meta: "PNG · 1200×630", kind: "img" },
  { name: "Poster / still", file: "/press/hero-poster.jpg", meta: "JPG · 1920×1080", kind: "img" },
  { name: "Hero motion clip", file: "/press/hero.mp4", meta: "MP4 · 1920×1080 · ~15 MB", kind: "video" },
];

function DownloadBtn({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  return (
    <a
      href={href}
      download
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-colors ${
        primary ? "bg-teal text-cream hover:bg-teal/90" : "border-2 border-charcoal/20 text-charcoal hover:border-teal hover:text-teal"
      }`}
    >
      {label} <span className="text-pink">↓</span>
    </a>
  );
}

function PressPage() {
  return (
    <div className="min-h-screen bg-cream text-charcoal px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="font-display font-bold text-2xl tracking-tight text-charcoal">
          tunefield<span className="text-pink">.</span>
        </a>

        <h1 className="mt-10 font-display font-bold text-4xl md:text-5xl tracking-tight">
          Press kit
        </h1>
        <p className="mt-4 text-lg text-charcoal/70 leading-relaxed">
          Everything you need to write about Tunefield — the free, offline tool that turns a
          DJ's library into a navigable 3D field. Assets may be used freely in coverage of
          Tunefield. Please don't recolour the logo or the wordmark's pink dot.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <DownloadBtn href="/press/tunefield-press-kit.pdf" label="Press kit (PDF)" primary />
          <DownloadBtn href="/press/tunefield-press-kit.md" label="Press kit (Markdown)" />
        </div>

        <h2 className="mt-16 font-display font-bold text-2xl border-t-2 border-teal pt-8">
          Media assets
        </h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-5">
          {ASSETS.map((a) => (
            <div key={a.file} className="rounded-2xl border border-charcoal/10 bg-cream-warm overflow-hidden flex flex-col">
              <div className="aspect-video bg-teal-deep flex items-center justify-center overflow-hidden">
                {a.kind === "video" ? (
                  <video src={a.file} muted loop autoPlay playsInline className="w-full h-full object-cover" />
                ) : (
                  <img src={a.file} alt={a.name} className="max-w-[70%] max-h-[70%] object-contain" />
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="font-medium">{a.name}</p>
                <p className="mt-1 font-mono text-[11px] text-charcoal/50">{a.meta}</p>
                <a
                  href={a.file}
                  download
                  className="mt-3 inline-flex items-center gap-1 text-sm text-teal hover:underline"
                >
                  Download <span className="text-pink">↓</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display font-bold text-2xl border-t-2 border-teal pt-8">
          Brand
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {[
            ["Cream", "#ECE6D8"],
            ["Teal", "#11A5B3"],
            ["Pink", "#F5B3D1"],
            ["Charcoal", "#1A1A1A"],
          ].map(([name, hex]) => (
            <div key={hex} className="flex items-center gap-2 rounded-full border border-charcoal/10 pl-2 pr-4 py-1.5">
              <span className="h-5 w-5 rounded-full border border-charcoal/10" style={{ background: hex }} />
              <span className="text-sm">{name}</span>
              <span className="font-mono text-xs text-charcoal/50">{hex}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-charcoal/60">
          Wordmark: lowercase <strong>tunefield.</strong> with a pink full stop.
        </p>

        <h2 className="mt-16 font-display font-bold text-2xl border-t-2 border-teal pt-8">
          Contact
        </h2>
        <p className="mt-4 text-charcoal/75">
          Press &amp; general enquiries:{" "}
          <a href="mailto:mark@tunefield.app" className="text-teal underline">mark@tunefield.app</a>
          <br />
          Source: <a href="https://github.com/tunefield/app" className="text-teal underline" target="_blank" rel="noreferrer">github.com/tunefield/app</a>
        </p>
      </div>
    </div>
  );
}
