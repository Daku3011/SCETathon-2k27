# SCETATHON — React platform starter

Minimal, responsive hackathon website and working Supabase-backed participant/admin flows. Inspired by the published previous-edition SCETATHON website (https://www.scetathon.com/). This is an **independent starter project**, not an official event deployment.

## What works
- Public home, challenges, about and showcase pages
- Email/password signup, login and sign out with Supabase Auth
- One team per participant; leader creates a team and adds registered teammates by email (max 5)
- Leader submits/updates a project (title, description, optional GitHub and demo URLs)
- Organizer dashboard: team count/list, submission review, challenge drafts/publishing, showcase publishing
- Row-level security on all tables; admins are granted only by trusted SQL changes
- Mobile responsive interface, empty states and setup messaging

## Setup
1. Install Node.js 20+.
2. `npm install`
3. Create a Supabase project at https://supabase.com.
4. In Supabase **SQL Editor**, run `supabase/schema.sql` once against a fresh project.
5. Copy `.env.example` to `.env`, then set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from Supabase Project Settings > API. **Do not use the service-role key.**
6. In Supabase Authentication > Providers, enable Email. Set Site URL and redirect URLs to your localhost/deployed domains. Confirm email verification settings as appropriate.
7. `npm run dev` and open the shown localhost URL.
8. Sign up an organizer, then use the SQL Editor to grant the role: `update public.profiles set role='admin' where email='your-organizer-email@example.com';` Sign out and sign in again to refresh permissions.
9. `npm run build` for production; deploy `dist/` to Vercel and set the two environment variables there. Configure Vercel SPA fallback rewrite to `index.html` (provided in `vercel.json`).

## Important operational notes
- Event dates, prizes, problem statements, and new-edition registration status are **not confirmed**; editable placeholders are in `src/lib.ts` and organizer-created challenges are stored in Supabase.
- The previous site lists Sarvajanik College of Engineering & Technology (constituent college of Sarvajanik University), Surat, two rounds, a 24-hour finale, 8 problems, and 3–5 members per team. These are shown as historical facts, not guaranteed future-edition rules.
- Public project cards only show organizer-approved (`published`) submissions. Admin-only controls are enforced by database policies, not just hidden UI.
- This starter uses project URLs rather than binary uploads; adding PDF/image uploads requires a dedicated Supabase Storage bucket, upload validation and storage policies.
- Before accepting actual event registrations, implement confirmed registration windows, eligibility and 3-person minimum enforcement, participant consent/privacy policy, email verification and rate limits, and a freeze/deadline mechanism for submissions. Consider audit logs, backups, accessibility testing and moderation.
- The team invite flow currently adds an already-registered account directly; for a production event, add an invitation/acceptance workflow.
- The initial SQL is designed for a fresh Supabase project. Review migration conflicts before applying to an existing database.

## Project layout
- `src/main.tsx` — React pages and functionality
- `src/style.css` — minimal responsive design system
- `src/lib.ts` — Supabase setup and event content
- `supabase/schema.sql` — tables, functions, RLS
- `.env.example` — required environment variables

## Temporary public Vercel demo

Vercel uses the Vite preset, `npm ci`, `npm run build`, and `dist`. SPA rewrites are configured in vercel.json. `.env.production` explicitly enables demo mode, disabling the Supabase client and hiding account forms. To enable real accounts later, configure and secure Supabase using the instructions above, then explicitly set `VITE_DEMO_MODE=false` in the Vercel environment and rebuild. Never put a service-role key in Vite variables.
