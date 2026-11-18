# Signal Press — Design Report

**Project:** SCETATHON 2.0 · 28–29 January 2027
**Report date:** 18 November 2026
**Status:** Implemented across the site; verified with `npm run typecheck` and `npm run build`.

---

## 1. Direction

| | |
|---|---|
| **Name** | Signal Press — Midnight Edition |
| **Tone** | Editorial / Swiss print, one dominant direction |
| **Thesis** | A hackathon site as a printed broadsheet: warm ink, condensed display type, hairline rules, tabular figures, and a single acid signal color. The energy comes from typography and grid, not glow. |
| **Differentiation anchor** | A numbered masthead + registration-mark metadata, oversized Anton headlines, a fixed grain layer, and hairline grids that make every page read like a printed issue. |
| **DFII** | 13 / 15 — Impact 5, Fit 5, Feasibility 5, Performance 4, Consistency risk 1 |

### Before → after

| Dimension | Before | After |
|---|---|---|
| Aesthetic | Neon cyber terminal: near-black + lime glow + rotating wheel | Editorial print: warm charcoal + cream type + condensation + rules |
| Display type | Archivo Black, wide heavy | Anton, condensed poster |
| Body type | DM Sans | Space Grotesk Variable |
| Mono | Space Mono (Google) | JetBrains Mono Variable (local package) |
| Corners | Mixed rounded + 16px splash card | Square, 0–2px throughout |
| Depth | Drop shadows, neon drop-shadow glows | Hairlines, tinted panels, flat grain |
| Navigation | Sticky dark bar, pill CTA | Two-tier masthead with edition strip, square markers |
| Hero | Full-bleed headline over radial grid | Front page: running head, numbered label, figure plate, stat footline |
| Buttons | Lime fill, rounded hover shifts | Coral solid / outline / ghost, square, mono, single hover swap |
| Theme | Dark + unused ThemeToggle | Dark default + working light "paper" edition |

---

## 2. Typography

| Role | Family | Source | Rationale |
|---|---|---|---|
| Display | **Anton** | Google Fonts `<link>` in `app/layout.tsx` | Condensed grotesk gives poster presence at huge sizes without the wide "AI hero" look |
| Body | **Space Grotesk Variable** | `@fontsource-variable/space-grotesk` (local) | Technical but human; replaces DM Sans with a more distinctive voice |
| Mono | **JetBrains Mono Variable** | `@fontsource-variable/jetbrains-mono` (local) | Tabular by default; used for all labels, metadata and numbers |

Rules:
- Headings: uppercase, `tracking-tight`, `leading-[0.8–0.9]`.
- Body: `max-w-[48ch]`–`62ch`, 1.55 line height, `text-wrap: pretty`.
- Every number uses `.tnum` (`font-variant-numeric: tabular-nums`).
- Micro labels are mono, 10–11px, `tracking-[0.14em–0.2em]`, uppercase.

---

## 3. Color system

All colors are CSS variables in `styles/tokens.css`. Tailwind maps them through `rgb(var(--x-rgb) / <alpha-value>)`, so opacity modifiers (`text-paper/70`, `bg-ink/95`) still work.

| Token | Dark (default) | Light edition | Role |
|---|---|---|---|
| `--ink` / `--ink-rgb` | `#10110E` | `#F1ECDD` | Base surface (dark) / text (light) |
| `--surface` | `#1B1D17` | `#FFFFFF` | Raised panels, figure plates |
| `--paper` / `--paper-rgb` | `#F1ECDD` | `#10110E` | Primary text (dark) / base (light) |
| `--muted` | `#9A978A` | `#5E5C53` | Secondary text |
| `--line` | `rgba(241,236,221,.18)` | `rgba(16,17,14,.20)` | Hairline rules, borders |
| `--lime` | `#D2EC4A` | `#6F8A05` | Signal / live marker |
| `--coral` | `#FF5A36` | `#C23A1B` | Primary action / emphasis |
| `--lilac` | `#BDB5EE` | `#554CA0` | Tertiary accent |

Legacy Tailwind names (`ink`, `paper`, `lime`, `coral`, `lilac`, `signal`, `accent`, `orange`) are preserved as aliases so the ~70 files that use them keep working. Legacy hardcoded hexes in components were bulk-mapped to these tokens in a single mechanical pass; artwork SVGs and the OG image keep their own literal palette intentionally.

**60 / 30 / 10:** ~60% ink/charcoal surfaces, ~30% cream text and panels, ~10% lime + coral signals.

---

## 4. Layout & texture

- **Container:** `w-[min(100%-34px,1400px)]` with `md:` variant — unchanged, now applied consistently.
- **Grid:** `.sheet-grid` draws a 64px engineering grid masked from left to right on hero and chapter headers.
- **Grain:** `.paper-grain` is a fixed, pointer-events-none SVG turbulence layer at 5% opacity, mounted once in `components/Shell.tsx`.
- **Rules:** `.rule` / `.rule-b` hairlines replace arbitrarily stacked `border-white/10` values.
- **Asymmetry:** hero uses a `1.2fr / 0.8fr` split with the figure plate offset and sticky; stats sit in a hairline-separated band.
- **Corners:** square everywhere; only the registration mark rotates.

---

## 5. Component language

New primitives in `components/ui/primitives.tsx` follow shadcn/ui conventions without adding dependencies:

- `cn(...)` — tiny class joiner (no `clsx`/`tailwind-merge` dependency).
- `Button` — `solid | outline | ghost`, `sm | md`, optional `href`.
- `Badge` — square bordered tag.
- `SectionLabel` — registration mark + index + kicker.

Applied to: masthead, mobile menu, hero CTAs, registration notice dialog, and all page headers.

Radix is kept for Dialog and Accordion; no new component library was introduced.

---

## 6. Motion philosophy

| Motion | Role |
|---|---|
| Staggered hero rows | One strong entrance (0.55s, 90ms stagger, custom ease) |
| Typewriter ticker | Continuous live signal; preserved from previous design |
| Terminal blink | Cursor on the ticker only |
| Hover swaps | Color/border only — no layout-shifting scale on text |
| Reduced motion | All animation disabled via `prefers-reduced-motion`; view-transition theme toggle falls back to instant |

---

## 7. Accessibility

- Skip link, semantic `header` / `main` / `footer`, `aria-current` on active nav, `aria-expanded` / `aria-controls` on the menu.
- Dialog retains `Dialog.Title` and `aria-describedby`.
- Focus rings changed from lime to coral for contrast on both editions.
- Touch targets are at least 44px (`min-h-11`, `size-11`).
- `prefers-reduced-motion` respected; theme toggle respects the same preference.

---

## 8. Files changed

| File | Change |
|---|---|
| `styles/tokens.css` | Rewritten: dark/light token sets, new type stacks |
| `styles/globals.css` | Rewritten: base, print utilities, theme switch, preserved animations |
| `tailwind.config.cjs` | Semantic colors via CSS vars with alpha support |
| `app/layout.tsx` | Local variable fonts + Anton; new theme-color |
| `components/Shell.tsx` | Grain layer, `min-h-dvh` |
| `components/shell/SiteHeader.tsx` | Two-tier masthead, square nav markers, theme switch |
| `components/shell/SiteFooter.tsx` | Colophon + ghost wordmark |
| `components/shell/PageHeader.tsx` | Chapter opener with kicker and grid |
| `components/identity/Wordmark.tsx` | Registration mark replaces circular ring |
| `components/home/Hero.tsx` | Front-page composition, figure plate, stat band |
| `components/registration/RegistrationStatus.tsx` | Notice dialog restyled, primitives used |
| `components/ui/primitives.tsx` | **New** — cn, Button, Badge, SectionLabel |
| `app/**`, `components/**` | Mechanical hex → semantic token remap (23 files) |

---

## 9. Verification

```
npm run typecheck   ✓
npm run build       ✓  (17 static routes generated)
```

Visual QA across 375 / 768 / 1024 / 1440px and the light edition is recommended before publishing.

---

## 10. Extending the system

- Add new colors as CSS variables in both `:root, .dark` and `.light`, then register them in `tailwind.config.cjs` using the `<alpha-value>` form.
- New components should import from `components/ui/primitives` instead of re-declaring button/badge styles.
- Do not reintroduce raw hex values in components — use tokens so both editions stay in sync.
- The artwork in `components/identity/SignalWheel.tsx` and `components/ui/SVGs.tsx` intentionally keeps literal colors; recolor only with a deliberate illustration update.
