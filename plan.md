# Plan — Cinematic video hero (Luma Labs style)

**Created:** 2026-05-26
**Status:** Spec ready. Content production + implementation will happen in a separate session.
**Reference:** `https://lumalabs.ai/` — full-bleed background MP4 with overlay headline + single CTA.

---

## 1 · Why this matters

The current Tunefield hero is a dark teal section with a static `hero-spheres.png` on the right and the 3D matrix layered on top. It reads well at desktop sizes, but it's *static energy* — a marketing-template aesthetic, not a "fundamentally different product" aesthetic.

Luma's hero works because:

- **Full-bleed video** says "we *do* this, we don't *describe* this." For Tunefield, the equivalent is: don't describe the matrix, show it moving / show a DJ navigating it / show the actual experience.
- **Single big idea** — one headline, one CTA. The hero isn't carrying the rest of the value prop; it's setting tone.
- **Cinematic depth of field** — motion blur, shallow focus, warm lighting. Everything else on screen feels flat by comparison.
- **The video is the product** in Luma's case (they make AI video) — there's an implicit demo. We can do the same: the video IS the matrix exploration experience.

---

## 2 · What we're building

### Visual

A full-viewport-height (or `min-h-[700px]`) hero section with:

- **A muted, autoplaying, looping background video** filling the entire section, `object-fit: cover`
- **A dark overlay gradient** (vertical or radial) so the text on top stays legible
- **The existing nav** sits over the video at top
- **Centered or left-aligned overlay text** — same brand voice ("Tired of managing lists?" / "5-dimensional music universe")
- **Single primary CTA**: `Download free V1 →` (rounded pill, cream-on-teal or pink, same brand language)
- **Secondary CTA**: `Join V2 waitlist` (smaller, link-style)

Optional/recommended details:

- **Stats ticker** — keep the rotating `> 1,247 tracks analyzed in 38 seconds` line; it's good and adds proof
- **Trust badge row** at bottom edge — `100% OFFLINE · OPEN SOURCE · MAC / WINDOWS / LINUX · UNDER 1% OF YOUR USB STICK`
- **Scroll cue** at the very bottom — small arrow or "scroll" text, fades out as user starts scrolling

### Audio

**No audio.** Muted is required for browser autoplay. The video must work without sound. If you want sound for marketing one-pagers (Twitter, etc), re-export with audio for those contexts only.

---

## 3 · Content options — pick one (or remix)

This is the creative decision. All three are credible.

### Option A — "DJ in the field" (live action, the warmest)

Real DJ footage:

- Close-up: hands on a CDJ or controller, finger crossfader gesture, knob twist
- Cuts to: laptop screen showing track titles scrolling (THIS is what we're fighting)
- Cuts to: hands moving over a vinyl jacket / USB stick
- Wide: silhouette of a DJ behind decks with crowd lights bleeding through
- All shot with shallow DOF (low aperture: f/1.4-2.8), warm tungsten light

**Pros:** Maximum emotional pull. DJ-to-DJ recognition. Doesn't depend on the app being built.
**Cons:** Needs filming gear or stock footage with the right vibe. Cost: a few hundred euros in stock + edit time, OR a half-day shoot if you have a friend with a camera.
**Stock libraries that have this:** Artgrid, Filmsupply, Pond5, Mixkit (free). Search terms: "DJ controller close up", "DJ hands cdj", "vinyl turntable warm", "club lights silhouette".

### Option B — "The matrix, in motion" (the most distinctive)

Screen-recorded gameplay-style footage of the Tunefield app:

- 3D matrix slowly rotating, camera dollying through it
- Spheres glowing, edges connecting, occasional "click to play" highlight
- Cut to: Camelot wheel filter being toggled, spheres rearranging
- Cut to: a sphere expanding to album cover art, audio scrubber visible
- Cut to: catalog table view, scrolling smoothly through 200+ tracks
- Cut to: matrix again, this time from a different angle, "High Vis" mode kicking in (pink glow on selected, others fading)
- All composited with subtle drop shadows, recorded at 60fps for smoothness

**Pros:** Inseparable from the product. Demonstrates the matrix concept in 6 seconds without a word. People will share it.
**Cons:** Requires the app to be polished enough to look beautiful on camera (album art loaded, populated catalog, etc). Recording + editing takes a few hours.

### Option C — "Abstract / generative" (the most artistic, lowest content cost)

Pre-rendered Three.js sequence or generative art:

- Particles forming the matrix structure, edges drawing themselves
- Slowly orbiting camera
- Colours pulsing in Camelot palette
- Optional: warp/zoom motion making it feel like flying through

**Pros:** Total control, no filming, no app polish needed. Can be generated with Three.js + Cannon physics, or even with Midjourney/Runway AI generation.
**Cons:** Risks looking like every other "Three.js portfolio site." Easy to make it forgettable.

### My recommendation

**Option B for the win, with A as backup if matrix recording quality isn't there yet.** Use the matrix in motion as the primary visual. People landing from a hacker news thread or a tweet will get the entire product thesis in 4 seconds of footage. If the app isn't visually ready, do A — DJ b-roll never goes out of style and you can re-shoot the matrix version for V2.

If you have time + budget: shoot both, intercut them in the edit. Open with two seconds of DJ hands, dissolve into the matrix, end with a sphere lighting up to album art. That's the entire pitch in 10 seconds.

---

## 4 · Production checklist

### If Option A (live action)

- [ ] Source stock footage OR plan a half-day shoot
- [ ] Shot list:
  - [ ] Hands on CDJ/controller, close-up, slow gestures (2 shots)
  - [ ] Laptop screen with track list scrolling (1 shot — this is "the problem")
  - [ ] Vinyl/USB still life with shallow DOF (1 shot)
  - [ ] Silhouette wide of DJ behind decks (1 shot)
- [ ] Colour grade to warm teal + amber tones (brand-aligned)
- [ ] Cut down to **10-15 seconds**, looping seamlessly (last frame ~= first frame)
- [ ] Export: see § 5

### If Option B (matrix screen recording)

- [ ] Load the V1 app with a curated demo catalog — ~200 tracks, all with album art, mood/key/genre tagged
- [ ] Set the matrix to its prettiest defaults (Sphere+cover style, Mood colour, edges = Safe mix)
- [ ] Record with QuickTime or OBS at 1920×1080 60fps
- [ ] Shot list / camera moves:
  - [ ] Slow dolly through the matrix cloud (5 sec)
  - [ ] Pull back to reveal the full structure (3 sec)
  - [ ] Cut to Camelot wheel toggle, spheres rearranging (3 sec)
  - [ ] Click a sphere → cover art expands, audio scrubber appears (3 sec)
  - [ ] Toggle High Vis, non-compatible spheres fade (3 sec)
- [ ] Edit in DaVinci Resolve / Premiere — match cuts on beat if there's a beat
- [ ] Add subtle drop shadow / vignette to make UI elements pop
- [ ] No text overlays on the video itself (text lives in HTML)
- [ ] Export: see § 5

### If Option C (generative)

- [ ] Three.js scene matching the Tunefield matrix aesthetic
- [ ] Render at 1920×1080 60fps for 12 seconds
- [ ] Slow camera orbit, particles drift in/out, edges pulse with pink glow
- [ ] Export PNG sequence → ffmpeg encode

---

## 5 · Encoding spec

Two outputs, both essential:

### Primary: H.264 MP4 (universal compat)

```bash
ffmpeg -i source.mov \
  -c:v libx264 -preset slow -crf 23 \
  -profile:v high -level 4.2 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \
  hero.mp4
```

- **No audio track** (`-an` strips it; saves bytes and removes the "muted" attribute requirement edge case)
- `+faststart` puts MOOV atom at the start so playback can begin before full download
- **Target file size: under 3 MB.** If the source is 4 sec at 1080p with good compression, you'll land at 1.5-2.5 MB easily. If it's over 5 MB, reduce duration or drop to 1280×720.
- 720p is acceptable for the loop — browsers upscale and the eye won't notice when text is on top.

### Secondary: VP9/WebM (better compression, ~30% smaller, modern browsers)

```bash
ffmpeg -i source.mov \
  -c:v libvpx-vp9 -crf 32 -b:v 0 \
  -row-mt 1 \
  -an \
  hero.webm
```

Then use both with `<source>` fallback in HTML (see § 6).

### Poster image

```bash
ffmpeg -i hero.mp4 -ss 00:00:00.5 -vframes 1 -q:v 2 hero-poster.jpg
```

This is the **single most important detail.** Shows immediately while video loads. If your video is 2 MB and the user has 1 MB/s on mobile, they wait 2 seconds without it — and that's 2 seconds of dark teal void. A 50 KB JPEG poster fills the gap.

### Mobile variant (optional but recommended)

Re-export at 1280×720 with a slightly tighter crop, target 800 KB-1.2 MB. Serve via `media` query in HTML5 video.

---

## 6 · Code changes — where + how

The hero lives at `src/routes/index.tsx`, in the `Hero()` function around line 95. Here's the patch shape.

### File layout

```
tunefield-site/
├── public/
│   ├── hero.mp4              ← new (primary video, H.264)
│   ├── hero.webm             ← new (VP9 fallback)
│   ├── hero-mobile.mp4       ← new (smaller mobile crop)
│   └── hero-poster.jpg       ← new (instant first-paint image)
```

Why `public/` (not `src/assets/`):
- Public files are served at their literal path (`/hero.mp4`), no Vite bundling
- Vite would try to inline or hash small images but won't touch video — public/ is the right place
- The URL stays `/hero.mp4` so CDN cache, social cards, etc all work without hashed filenames

### React component patch

Replace the entire `<div className="absolute inset-0 ... aria-hidden>` block (currently containing `<LazyMatrix>` + gradient overlay) with:

```tsx
{/* Background video — full bleed, hidden behind nav + foreground content */}
<div className="absolute inset-0 overflow-hidden" aria-hidden>
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    poster="/hero-poster.jpg"
    // #t=0.001 forces Safari to render the first frame instead of staying on poster
  >
    <source src="/hero.webm" type="video/webm" />
    <source src="/hero.mp4#t=0.001" type="video/mp4" />
  </video>
  {/* Multi-stop gradient so headline + CTAs stay legible regardless of frame */}
  <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/70 to-teal-deep/30 md:via-teal-deep/55 md:to-transparent pointer-events-none" />
  <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/80 via-transparent to-teal-deep/40 pointer-events-none" />
</div>
```

Key attributes (all required):

- **`autoPlay muted playsInline`** — the triumvirate for autoplay-without-user-gesture across Chrome / Safari / iOS. Drop any one and autoplay breaks on mobile.
- **`loop`** — obvious, but easy to forget.
- **`preload="auto"`** — starts download before user interaction. Vercel/CDN handles range requests.
- **`poster="/hero-poster.jpg"`** — instant first paint.
- **`#t=0.001`** — Safari-specific trick. Without it, Safari shows the poster forever on iOS until the user interacts.

### Reduced motion

Wrap the video in a `usePrefersReducedMotion` check (we already have this hook pattern in `LazyMatrix.tsx`):

```tsx
const reduced = usePrefersReducedMotion();
// ... in JSX
{reduced ? (
  <img
    src="/hero-poster.jpg"
    alt=""
    aria-hidden
    className="absolute inset-0 w-full h-full object-cover"
  />
) : (
  <video ... />
)}
```

Users with `prefers-reduced-motion: reduce` get the still poster. This is an accessibility requirement, not a nice-to-have.

### Mobile variant via `<source media>`

Inside the `<video>`:

```tsx
<source src="/hero-mobile.webm" type="video/webm" media="(max-width: 768px)" />
<source src="/hero.webm" type="video/webm" media="(min-width: 769px)" />
<source src="/hero-mobile.mp4#t=0.001" type="video/mp4" media="(max-width: 768px)" />
<source src="/hero.mp4#t=0.001" type="video/mp4" media="(min-width: 769px)" />
```

### Keep the 3D matrix? — DECISION

Two options once the video lands:

**A. Replace the 3D matrix entirely** — video does the visual work. Simpler, smaller bundle. The matrix component still ships, just isn't on the homepage hero (still featured in the Matrix carousel section further down).

**B. Layer them** — video in background, matrix as foreground translucent overlay (`opacity-40 mix-blend-screen`). Risk: visual chaos. Reward: maximum "wow" if it works.

Default: **A.** Cleaner. Decide at integration time.

---

## 7 · Performance budget

| Asset | Target size | Strategy |
|---|---|---|
| hero.mp4 | < 3 MB | H.264, CRF 23, 4-12 sec loop |
| hero.webm | < 2 MB | VP9, CRF 32 |
| hero-mobile.mp4 | < 1.2 MB | 720p, tighter crop |
| hero-poster.jpg | < 80 KB | mozjpeg / Squoosh, 85% quality |
| Total above-the-fold transfer | < 4 MB | acceptable for a marketing site |

Lighthouse Performance score after this change: should stay ≥ 90 on desktop, ≥ 75 on mobile. If it drops, the culprit is probably preload="auto" — switch to "metadata" and accept a 200ms-1s delayed start.

---

## 8 · Accessibility

- [ ] `<video aria-hidden="true">` if purely decorative (which it is — no information content)
- [ ] `prefers-reduced-motion` honored (poster image fallback)
- [ ] All text overlay meets WCAG AA contrast against worst-case video frame (test against a bright frame, not just average)
- [ ] If you ever add audio: closed captions become required

---

## 9 · Step-by-step build sequence (next session)

1. **Decide content path** (A, B, or C from § 3)
2. **Produce / source the video** per § 4
3. **Encode** per § 5 — produces hero.mp4, hero.webm, hero-mobile.mp4, hero-poster.jpg
4. **Drop files into `public/`** in tunefield-site repo
5. **Patch `src/routes/index.tsx`** Hero component per § 6
6. **`bun run dev`** → verify hero renders + autoplay works in Chrome, Safari, mobile Safari
7. **Test reduced motion** — system settings → Accessibility → Reduce Motion → ON, reload page, should see poster image instead of video
8. **Test Lighthouse** — `bun run build && bun run preview` then run Lighthouse against the preview build
9. **Commit + push** — Vercel auto-deploys
10. **Final verification on the live site** at `tunefield.dj` or whatever the production URL is by then

---

## 10 · Open questions / decisions deferred

1. **Content path** — A live action / B matrix recording / C generative — pick during the next session
2. **Music in the video** — no audio in the loop itself (autoplay constraint), but worth considering a 30-second silent loop and a 30-second "with music" variant for social media reposts
3. **CTA hierarchy** — keep "Download free V1" as primary, or pivot to "Join V2 waitlist" if the V1 download isn't ready by then? Decide based on V1 release state
4. **Headline copy** — keep "Tired of managing lists?" or swap to something more declarative? Worth A/B testing later; for now keep the existing hero copy
5. **3D matrix in the hero** — see § 6 "Keep the 3D matrix?" — defaults to "no" but reconsider once video lands

---

## 11 · Reference — exact spec from Luma's hero (for parity check)

Pulled live from `https://lumalabs.ai/` on 2026-05-26:

| Property | Luma's value |
|---|---|
| `<video>` element | yes, single instance |
| `autoplay` | yes (HTML attribute) |
| `loop` | yes |
| `muted` | yes |
| `playsInline` | yes |
| `poster` | not set (relies on instant playback) |
| Source URL | `https://static.cdn-luma.com/files/sanity/{uuid}.mp4#t=0.001` |
| Resolution | 1920×1080 |
| Codec | H.264 MP4 |
| Hash trick | `#t=0.001` for Safari first-frame |
| Duration | ~10-12 seconds, seamless loop |
| Content | AI-generated cinematic of hands grabbing product (their own product output) |

We'll do better than Luma by adding a `poster` (they skip it; we won't).

---

## 12 · Hand-off checklist for the next Claude session

When resuming, paste:

```
I'm continuing the Tunefield video hero build. Read plan.md in
/Users/markburnett/DevPro/tunefield-site/, then [insert what you want].
```

Substitute the second sentence:

- *"...then walk me through producing the matrix screen recording (Option B). I have the V1 app running with a populated catalog."*
- *"...then encode and integrate the video files I've placed at hero.mp4 and hero-poster.jpg in /tmp/."*
- *"...then write the patched Hero component code based on § 6, and run dev to verify."*

The next session will know: video files go in `public/`, patch goes in `src/routes/index.tsx`, video element shape is in § 6, reduced-motion fallback is mandatory, mobile variant is recommended.

---

**End of plan.**
