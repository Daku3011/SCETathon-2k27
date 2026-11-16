# SCETATHON 2.0 — Design system

## Audit and retained material

The repository is an existing Next.js App Router site with public routes for the homepage, about, guidelines, evaluation, gallery, problems, sponsors, timeline, results, winners, privacy and terms. It uses Next.js 15, React 19, Tailwind 3, Radix Dialog/Accordion, Framer Motion, locally bundled fonts, and a Next.js Vercel deployment. The route map, accessible Radix primitives, sitemap/robots/OG metadata, mailto contact path, campus map, event wordmark, SCET campus image and working archive assets are retained. No auth, database, submission or admin backend exists in this project, so none were introduced.

The prior live site was reviewed only to verify host context and the organizer email. All dated 2026 deadlines, rounds, challenge briefs, winners/results claims, team sizes, themes, judging weights, prize values, sponsor claims, participant counters, and countdown/sample reservation behaviors have been removed. The exact requested 2027 dates and campus location remain in `data/event.ts`; hours, team size, eligibility, schedule, challenge records, sponsors, results and registration are explicitly unpublished. The public registration link remains disabled until organizers provide an approved destination. The existing event email and map destination remain configurable in the same central object.

## Identity and tokens

- Paper `--paper: #F5EFE2`; raised paper `--paper-tint: #ECE5D6`.
- Ink `--ink: #182239`; technical indigo `--indigo: #172C67`; geru `--geru: #963E29`.
- Supporting rule and muted text colors are defined beside those semantic tokens in `styles/globals.css`.
- Space Grotesk (bundled variable font) is the display face; Arial is the body fallback; JetBrains Mono (bundled variable font) marks technical labels and metadata. No remote font requests.
- Desktop content uses a 12-column editorial rhythm expressed as 7:5 hero and 5:7 narrative grids, a 1320px maximum reading width, and consistent rule-based section divisions. Layout collapses to a single column on small screens.
- Primary controls have 44–48px minimum targets and visible focus rings. Warm paper and deep ink/indigo carry the primary contrast; geru is used sparingly for labels and emphasis.

## Motifs and motion

Mandana-inspired nested diamonds and small botanical marks are combined with an original schematic chip, pins, grid, circuit traces and terminal nodes in `components/sections/Hero.tsx`. No devotional imagery, stock photography, canvas, WebGL, gradient glow or looped animation is used. A single circuit stroke draws once on initial view. Global reduced-motion rules remove nonessential animation and smooth scrolling.

## Component sources

- Existing Next.js layout and custom editorial sections: local implementation, using project assets and semantic tokens.
- Accessible menu/dialog and FAQ accordion: existing Radix UI primitives in `components/Shell.tsx` and `components/sections/HomeSections.tsx`.
- Challenge explorer: existing local component retained but gated behind the centralized publication flag; no third-party blocks or new dependencies were installed.
- No external component registry code was integrated.

## Route and state behavior

The shared `Shell` provides skip navigation, persistent header, responsive dialog navigation and institutional footer on every public route. Existing public routes remain available. TBA states are plain, readable and never blurred or click-to-reveal. Challenge data, judging details and sponsor names render only after explicit organizer publication. Results and winners remain closed until their existing publication flags are enabled. Registration is a clear non-interactive “opening soon” state unless both `registrationOpen` and an approved external form URL are set.

## Visual QA notes

Updated homepage first screen prioritizes event name, host, date, location and registration state. Mobile layout stacks the hero, reduces the line illustration and keeps date and participation status visible without horizontal overflow. The shared design remains applicable to all current routes; verify the project preview at 360px, 390px, 768px, 1024px and desktop before launch. Organizer approval remains required for challenges, rules, eligibility, judging, sponsor marks, registration destination, schedule timings and published results.
