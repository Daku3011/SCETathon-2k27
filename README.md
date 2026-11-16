# SCETATHON 2.0 (2027)

A premier, high-performance event platform for **SCETATHON 2.0** at Sarvajanik College of Engineering & Technology (SCET), Surat, taking place on **28–29 January 2027**.

Built with Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, and Radix UI. Features an ivory/navy/blue poster-derived palette, light/dark theme with circular clip-path transition, 3D interactive wireframe knot, and reusable `TbaReveal` gates.

---

## Quickstart

```bash
# Install dependencies
npm install

# Run type check
npm run typecheck

# Start development server
npm run dev

# Create optimized production build
npm run build

# Start production server
npm start
```

Local dev server runs at `http://localhost:3000`.

---

## Supabase Configuration & Registration Gating

Participant registration remains **strictly disabled** until Supabase environment variables are configured. If either variable is missing, the registration UI safely displays the live countdown to **28 Jan 2027, 11:00 AM IST** along with a preview form.

### 1. Environment Variables

Create `.env.local` with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 2. Commented SQL Schema (`registrations` Table)

Execute the following DDL in your Supabase SQL Editor once the registration portal goes live:

```sql
-- =============================================================================
-- SCETATHON 2.0 Registration Schema
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create registrations table
create table public.registrations (
  id uuid primary key default uuid_generate_v4(),
  team_name text not null,
  lead_name text not null,
  lead_email text not null,
  lead_phone text not null,
  college text not null,
  track text not null,
  team_size integer not null check (team_size between 3 and 5),
  status text not null default 'pending' check (status in ('pending', 'approved', 'waitlist', 'rejected')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.registrations enable row level security;

-- Policy: Allow anonymous users to submit registrations
create policy "Allow anonymous registrations insert"
  on public.registrations
  for insert
  to anon
  with check (true);

-- Policy: Restrict reading registrations to authenticated admin staff only
create policy "Restrict reading registrations to admins"
  on public.registrations
  for select
  to authenticated
  using (true);

-- Create index on lead_email to prevent accidental duplicate squad leads
create unique index idx_registrations_lead_email on public.registrations (lower(trim(lead_email)));
```

---

## Feature Flags (`data/event.ts`)

| Flag | Default | Description |
|---|---|---|
| `showResults` | `false` | When `false`, hides the Results link from the navigation & footer, and `/results` renders a graceful "Coming Soon" card. |
| `showWinners` | `false` | When `false`, hides the Winners link from the navigation & footer, and `/winners` renders a graceful "Coming Soon" card with confetti celebration disabled. |
| `resultsOpen` | `false` | Secondary guard for team qualification results. |
| `winnersOpen` | `false` | Secondary guard for final podium reveals. |

---

## Design Tokens & Theme System

The design system is based on the official SCETATHON 2.0 poster:

- **Tokens**:
  - `--ivory`: `#F6F1E7`
  - `--navy-950`: `#0A1230`
  - `--navy-800`: `#14224F`
  - `--blue-500`: `#2F5BFF`
  - `--blue-300`: `#7FA0FF`
  - `--ink`: `#0E1630`
- **Themes**:
  - **Light Theme**: Ivory background (`#F6F1E7`), surface white/ivory tint, navy text (`#0A1230`), blue-500 accent (`#2F5BFF`), navy borders @ 12%.
  - **Dark Theme**: Deep navy background (`#0A1230`), navy-800 surface @ 65%, ivory text (`#F6F1E7`), blue-300 accent (`#7FA0FF`), ivory borders @ 12%.
- **Transition**: View Transitions API with circular clip-path reveal radiating from toggle button coordinate with cross-fade fallback.
- **Anti-FOUC**: Inline script in `app/layout.tsx` applies the stored theme preference before first paint.

---

## Reusable `<TbaReveal />` Component

Located at `components/ui/TbaReveal.tsx`:
- Masks round details, deadlines, and prize totals behind a blurred "To be announced" badge.
- Keyboard accessible (`Enter` / `Space` toggling), `aria-expanded` compliant.
- Smooth spring-based un-blur revealing: *"The organizers will publish round details here."*
