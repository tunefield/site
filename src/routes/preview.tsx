import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FullSite } from "./index";

export const Route = createFileRoute("/preview")({
  component: PreviewGate,
  head: () => ({
    meta: [
      { title: "tunefield. — Preview" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

// Change this to rotate the preview password, then redeploy.
const PREVIEW_PASSWORD = "tunefield.";
const STORAGE_KEY = "tf-preview-unlocked";

function PreviewGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

  if (unlocked) return <FullSite />;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PREVIEW_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-teal-deep text-cream flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display font-bold text-4xl tracking-tight">
          tunefield<span className="text-pink">.</span>
        </h1>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cream/55">
          Private preview
        </p>
        <form onSubmit={submit} className="mt-8">
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            aria-label="Preview password"
            className="w-full rounded-xl border-2 border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder-cream/40 focus:outline-none focus:border-teal transition-colors"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-xl bg-teal text-cream px-4 py-3 font-medium hover:bg-teal/90 transition-colors"
          >
            Unlock <span className="text-pink">→</span>
          </button>
          <p className="mt-3 h-5 text-sm text-pink">
            {error ? "Wrong password." : ""}
          </p>
        </form>
      </div>
    </div>
  );
}
