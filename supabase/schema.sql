-- Run once in Supabase SQL Editor. Never expose a service-role key in frontend code.
create extension if not exists pgcrypto;
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null default '',
 email text not null default '',
 role text not null default 'participant' check (role in ('participant','admin')),
 created_at timestamptz not null default now()
);
create or replace function public.on_user_created() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,full_name,email) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',''),coalesce(new.email,'')) on conflict(id) do nothing; return new; end; $$;
drop trigger if exists auth_user_created on auth.users;
create trigger auth_user_created after insert on auth.users for each row execute function public.on_user_created();
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.profiles where id=auth.uid() and role='admin')$$;
create table if not exists public.teams (
 id uuid primary key default gen_random_uuid(), name text not null check(length(trim(name)) between 2 and 80), leader_id uuid not null references public.profiles(id), created_at timestamptz not null default now()
);
create table if not exists public.team_members (
 team_id uuid not null references public.teams(id) on delete cascade,
 user_id uuid not null unique references public.profiles(id) on delete cascade,
 joined_at timestamptz not null default now(),primary key(team_id,user_id)
);
create or replace function public.on_team_created() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.team_members(team_id,user_id) values(new.id,new.leader_id);return new;end;$$;
drop trigger if exists team_created on public.teams;
create trigger team_created after insert on public.teams for each row execute function public.on_team_created();
create or replace function public.is_team_member(p_team_id uuid) returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.team_members where team_id=p_team_id and user_id=auth.uid())$$;
create or replace function public.is_team_leader(p_team_id uuid) returns boolean language sql stable security definer set search_path=public as $$select exists(select 1 from public.teams where id=p_team_id and leader_id=auth.uid())$$;
create table if not exists public.challenges (
 id uuid primary key default gen_random_uuid(),title text not null,category text not null,description text not null,
 status text not null default 'Draft',published boolean not null default false,created_at timestamptz not null default now()
);
create table if not exists public.projects (
 id uuid primary key default gen_random_uuid(),team_id uuid not null unique references public.teams(id) on delete cascade,
 title text not null check(length(trim(title)) between 2 and 120),summary text not null check(length(trim(summary)) between 20 and 3000),
 repo_url text,demo_url text,published boolean not null default false,submitted_at timestamptz not null default now(),created_at timestamptz not null default now()
);
create index if not exists idx_projects_published on public.projects(published);
create index if not exists idx_challenges_published on public.challenges(published);
alter table public.profiles enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.challenges enable row level security;
alter table public.projects enable row level security;
create policy "profile select self admin or teammate" on public.profiles for select to authenticated using (id=auth.uid() or public.is_admin() or exists(select 1 from public.team_members m where m.user_id=profiles.id and public.is_team_member(m.team_id)));
create policy "teams select member or admin or public project" on public.teams for select to anon,authenticated using (public.is_admin() or public.is_team_member(id) or exists(select 1 from public.projects p where p.team_id=teams.id and p.published));
create policy "teams insert by leader" on public.teams for insert to authenticated with check (leader_id=auth.uid() and not exists(select 1 from public.team_members where user_id=auth.uid()));
create policy "team members select own team" on public.team_members for select to authenticated using (public.is_admin() or public.is_team_member(team_id));
create policy "challenges read published or admin" on public.challenges for select to anon,authenticated using (published or public.is_admin());
create policy "challenges admin insert" on public.challenges for insert to authenticated with check(public.is_admin());
create policy "challenges admin update" on public.challenges for update to authenticated using(public.is_admin()) with check(public.is_admin());
create policy "projects read own admin or published" on public.projects for select to anon,authenticated using(published or public.is_admin() or public.is_team_member(team_id));
create policy "projects insert leader" on public.projects for insert to authenticated with check(public.is_team_leader(team_id) and published=false);
create policy "projects update leader or admin" on public.projects for update to authenticated using(public.is_team_leader(team_id) or public.is_admin()) with check(public.is_admin() or (public.is_team_leader(team_id) and published=false));
-- Invite by email without revealing the full directory of registered users.
create or replace function public.add_team_member_by_email(p_team_id uuid,p_email text) returns void language plpgsql security definer set search_path=public as $$
declare target_id uuid; count_members integer;
begin
 if not public.is_team_leader(p_team_id) then raise exception 'Only the team leader can add members';end if;
 select count(*) into count_members from public.team_members where team_id=p_team_id;
 if count_members>=5 then raise exception 'Team is full (maximum 5 members)';end if;
 select id into target_id from public.profiles where lower(email)=lower(trim(p_email));
 if target_id is null then raise exception 'No registered user found for that email';end if;
 if exists(select 1 from public.team_members where user_id=target_id) then raise exception 'This user already belongs to a team';end if;
 insert into public.team_members(team_id,user_id) values(p_team_id,target_id);
end;$$;
revoke all on function public.add_team_member_by_email(uuid,text) from public;
grant execute on function public.add_team_member_by_email(uuid,text) to authenticated;
-- Manually assign admins using Supabase SQL Editor after a trusted organizer signs up:
-- update public.profiles set role='admin' where email='organizer@scet.ac.in';
