# Huzaif Ferooz: 3D Portfolio

Next.js 14 · Tailwind CSS · Framer Motion · React Three Fiber · Lenis smooth scroll

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Deploy on Vercel: push to GitHub and import the repo (no config needed).

## Edit before you publish

All copy lives in `lib/data.ts`:

- `SITE.email`: currently `hello@example.com`. Replace with your real address.
- `SITE.avatar`: put a photo in `/public` (e.g. `/avatar.jpg`) and set the path to replace the illustrated portrait.
- `ZELTA_MEDIA[].src`: add real logo, thumbnail and banner images to replace the placeholder gallery tiles.
- Scrimmed phone mock-up, ShockShield diagram and ROM terminal are illustrative placeholders. Swap in real screenshots or diagrams when you have them.

## Structure

- `components/three/`: WebGL (particle background, hero phone, skills orbit). Loaded client-only.
- `components/visuals/`: the four project card visuals.
- `components/Projects.tsx`: pinned horizontal scroll with 3D-tilt cards.

## Performance notes

- Pixel ratio is capped (1.25 on mobile, 1.75 to 2 on desktop) and particle counts drop on mobile.
- Hero and skills canvases stop rendering when off-screen.
- On touch devices the hero phone auto-rotates instead of using drag controls, so page scrolling is never blocked.
- `prefers-reduced-motion` disables smooth scroll and pauses the background scene.
