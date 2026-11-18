# AGENTS.md

## Stack & commands
- Next.js 16 App Router + React 19, TypeScript (strict), Tailwind 3, Framer Motion / GSAP / Lenis / Radix. npm only (`package-lock.json`).
- Scripts: `npm run dev`, `npm run build`, `npm start`, `npm run typecheck`. **No lint or test script** — `npm test` / `npm run lint` do not exist, and there is no test config. `npm run typecheck` (`tsc --noEmit`) is the only verification gate; follow with `npm run build`.
- Playwright is installed as a devDependency but no suite/config exists — don't assume tests can be run.

## Layout & entrypoints
- `@/*` maps to the repo root (`./*`), not `src/`.
- `app/layout.tsx` wraps every route in `components/Shell.tsx`: `PageTransitionProvider` → `SplashOverlay` (once per session) → `NetflixNavTransition` → `SiteHeader` / `SiteFooter`. Routes are `app/*/page.tsx`.
- Most event copy, dates, nav arrays, committee/FAQ data and publish flags live in `data/event.ts` — edit there, not inline in components. Challenge statements are in `data/problems.ts`.

## Publish / gating flags (`data/event.ts`)
- `showResults`, `showWinners`, `resultsOpen`, `winnersOpen`, `registrationOpen` all default `false`.
- `publicationFlags` and `isPublishedRoute()` gate `/results`, `/winners` and their `app/sitemap.ts` entries; `components/sections/Inner.tsx` renders "Coming Soon" cards. Flip flags in `data/event.ts` to publish.

## Registration & Supabase
- Live registration requires all three: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (in `.env.local`), `event.registrationOpen`, and a non-empty `event.form`. All are currently off, so `RegistrationStatus` shows a "registration not live" dialog.
- `lib/supabase.ts` is a stub — `submitRegistration()` is a no-op that only returns success. The `registrations` SQL schema is in `README.md`.

## Design system — parts of README.md are stale
- Current direction is "Signal Press": dark editorial print, documented in `DESIGN.md`. Real tokens are `ink` / `paper` / `lime` / `coral` / `lilac` / `signal` (`styles/tokens.css`, `tailwind.config.cjs`), **not** the ivory/navy/blue palette described in README. README also claims an anti-FOUC script in layout; there is none.
- Tailwind colors map through `rgb(var(--x-rgb) / <alpha-value>)`. Add colors to both `:root, .dark` and `.light` in `tokens.css` and register them in `tailwind.config.cjs`; don't reintroduce raw hex in components (artwork SVGs / `app/opengraph-image.tsx` are intentional exceptions).
- `hooks/useTheme.ts` persists `scet_theme` and toggles `.light`/`.dark` + `data-theme` on `<html>` via View Transitions clip-path (reduced-motion fallback). Keep class, attribute and storage in sync. `.light` swaps `ink`/`paper` values so existing `bg-ink text-paper` classes invert correctly.
- CSS entry is `styles/globals.css` (imports `tokens.css`) and defines `.sheet-grid`, `.paper-grain`, `.kicker`, `.rule`, `.tnum`. Fonts: Anton via Google `<link>`; Space Grotesk + JetBrains Mono via `@fontsource-variable` imports in `app/layout.tsx`, mapped to `--font-d/-b/-m`.
- Use `cn`, `Button`, `Badge`, `SectionLabel` from `components/ui/primitives.tsx` for new UI instead of re-declaring button/badge styles.

## Deploy / quirks
- `next.config.mjs`: `devIndicators: false` and `experimental.cpus: 2` (caps build parallelism — don't remove without reason).
- `vercel.json`: `npm ci` + `npm run build`; redirects `/challenges`→`/problems`, `/showcase`→`/gallery`, `/auth`→`/`.
- `.gitignore` excludes `.agent/*` and `.env*.local`.

## Commits
- Conventional commits (`feat:`, `fix:`, `chore:`). AI commits MUST include `Co-Authored-By: <model name> <email>`.
