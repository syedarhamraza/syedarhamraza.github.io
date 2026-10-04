# One Spend website

The landing page for [One Spend](https://play.google.com/store/apps/details?id=com.syedarhamraza.onespend), a subscription and spend tracker for Android styled after Samsung One UI. Live at **https://syedarhamraza.github.io**.

Next.js 16 (static export), Tailwind CSS v4, Motion, and GSAP ScrollTrigger with Lenis for the pinned scroll scenes. Dark-only, like the app. Every visual is a real app capture or a port of a real app widget.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

Pushing to `main` builds and deploys to GitHub Pages (`.github/workflows/pages.yml`).

## Updating screenshots and the privacy policy

`public/screens`, `public/brand` and `content/privacy-policy.md` are copies from the app repo. After changing the store captures, icon, feature graphic or policy there, refresh them and commit:

```bash
npm run sync -- ../one-spend
```

The script crops the status bar off each capture and converts it to WebP.

## Layout

- `app/`: the page, `/privacy` (rendered from `content/privacy-policy.md`), global tokens in `globals.css` that mirror the app's `OneUITheme`
- `components/`: one file per section; `bento/` holds the feature tiles, `ui/` the One UI switch and segmented pills
- `lib/site.ts`: copy and sample data (the app's fictional demo services, never real brands)

Rules the site follows: no em or en dashes in visible copy, one accent colour (`#5390F5`), radii 34 / 26 / 20, and `useReduced()` from `lib/useReduced.ts` instead of Motion's `useReducedMotion` (which mismatches during hydration).
