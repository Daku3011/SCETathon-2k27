# SCETATHON 2027

A public, frontend-only hackathon site for SCET, Surat. The 2027 schedule, rules, sponsor identities, judging weights and problem statements are editorial previews. The gallery credits the previous edition at https://www.scetathon.com/winners and https://www.scetathon.com/. No registration details are stored by this project.

## Setup

Use Node 24 and npm. Run `npm ci`, then `npm run dev`. Open http://localhost:3000. For production run `npm run build` followed by `npm start`. Fonts ship locally via next/font.

## Editing

- data/event.ts contains event details, contacts, schedule, prizes, sponsor placeholders, FAQ, judging weights, teams, archive captions and publication flags.
- data/problems.ts contains the eight editable challenge briefs.
- Use ISO 8601 timestamps including the timezone offset (+05:30). Provide round1, start and end together. Blank values display a pending schedule.
- Set form to an approved HTTPS registration URL to enable external registration. An empty value shows the closed-registration dialog.
- Set numeric rupee amounts for animated prize totals. Replace illustrative sponsor names and vector marks when partner assets are approved.
- Publish populated teams and winners lists with resultsOpen and winnersOpen. Winner photos should use local public paths. Gallery images live under public/archive.
- The About form opens the visitor’s mail client with a draft. It does not send or retain messages.

## Vercel deployment

Import the project directory using the Next.js preset and Node 24. Install with npm ci and build with npm run build. The deployment uses Next.js image optimization and routing. Existing Vite projects must switch their framework preset to Next.js and remove the dist output override. Set event.site to the public origin for sitemap and social cards.

## Launch checklist

- Approve the schedule, agenda, problem briefs, eligibility, judging weights and prizes.
- Confirm organizer names, partner branding, venue, contact details and form ownership.
- Check the approved external form on mobile before setting form.
- Check the registration dialog, phone menu, problem filters, FAQ search, keyboard focus and reduced motion.
- Verify sitemap.xml, robots.txt, opengraph-image and Event structured data after dates are published.
- Audit the final production deployment with mobile Lighthouse; targets are performance 90+, accessibility 95+ and SEO 100.
- Publish results and winners only after organizer approval.
