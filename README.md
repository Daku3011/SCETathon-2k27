# SCETATHON 2.0

A public event-information website for Sarvajanik College of Engineering & Technology (SCET), Surat. The event brief specifies 28–29 January 2027; confirm the date with organizers before launch. Schedule, registration, challenge briefs, eligibility, team size, judging, sponsors and awards are not published until organizers verify them. The project has no registration database, auth, submission service or admin area.

## Project structure

- `data/event.ts` is the central event configuration, including dates, host, venue, contact, map, registration URL and publication flags.
- `data/problems.ts` is intentionally empty until approved 2027 challenge briefs are supplied.
- `components/sections/` contains the public event sections and route content.
- `styles/globals.css` defines the semantic color tokens, responsive grid, typography and motif styling.
- `public/brand/` and `public/archive/` contain existing branding and local image assets.

## Run locally

Install dependencies with `npm ci`, run `npm run dev`, and open the development URL. Run `npm run build` to verify a production build. The site uses Next.js App Router, Tailwind CSS 3, Radix primitives and locally bundled fonts.

## Organizer launch checklist

1. Confirm 28–29 January 2027 and exact campus venue details.
2. Approve eligibility, team limits, code of conduct, challenge briefs and programme.
3. Confirm evaluation criteria, judging weights, awards and partner names/logos.
4. Provide an official registration URL, then set both `registrationOpen` and `form` in `data/event.ts`.
5. Enable challenge, schedule, judging, sponsor, results or winners publication only after content is approved.
6. Verify event contact details and image permissions.
7. Check every public route and the mobile menu at narrow and desktop viewport sizes before publishing.

The existing Vercel/Next.js deployment mode and route metadata are preserved. No backend or environment variables are required by this redesign.
