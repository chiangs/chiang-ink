# Stephen Chiang — Personal Site

Personal site and portfolio for Stephen Chiang,
Design Technologist and Product & Technology Leader.

Built with React Router v7 (framework mode),
Tailwind CSS v4, GSAP, MDX, and Workbox (via vite-plugin-pwa).

---

## Quick Start

```bash
git clone git@github.com:chiangs/chiang-ink.git
cd chiang-ink
npm install
npm run dev       # http://localhost:5173
```

All dependencies (GSAP, MDX, gray-matter, vite-plugin-pwa,
@vercel/react-router) are already in `package.json`.

## PWA Setup

`vite-plugin-pwa` is configured in `vite.config.ts`. It:
- Generates `sw.js` + `workbox-*.js` at build time with a precache manifest
- Auto-injects the SW registration script — no manual code in root.tsx needed
- Uses `manifest: false` so `public/manifest.json` is used as-is

Cache strategies:
- Built JS/CSS/HTML: precached at install (content-hash busting)
- `/images/**`: runtime `CacheFirst`, 30-day TTL, 60-entry cap
- Everything else: `NetworkFirst` with cache fallback

The hero portrait (`/images/portrait/stephen-chiang.jpg`) is also served via
`<link rel="preload" as="image">` in `home.tsx` to improve LCP.

## Font Setup

Space Grotesk and Manrope — both via Google Fonts.
Add to root.tsx links:

```tsx
{ rel: "preconnect", href: "https://fonts.googleapis.com" },
{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
{
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&family=Manrope:wght@400;500;600&display=swap"
}
```

No local font files needed — both fonts load from Google Fonts CDN.

## Site URL

The canonical domain is `https://www.chiang.ink`.
It is set as `SITE_URL` in `app/lib/constants.ts` —
no environment variable is needed.

## Deploy to Vercel

`react-router.config.ts` already uses the Vercel preset
(`vercelPreset()` from `@vercel/react-router/vite`, SSR on).
Auto-deploys on every push to main.

---

## Content

All content lives in /content as MDX files.
No CMS. No login. Just write and commit.

New article:    /content/writing/your-slug.mdx
New project:    /content/work/your-slug.mdx

Frontmatter fields are defined by `ArticleFrontmatter`
and `ProjectFrontmatter` in `app/types/content.ts`.

---

## Design Reference

See `.claude/DESIGN.md` for the full design system:
colors, typography, spacing, motion, components.
Feed DESIGN.md into every Claude conversation
when building new sections or components.
