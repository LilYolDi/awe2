-- ==========================================
-- Y-FETISH
-- database.sql
-- ==========================================

create extension if not exists "pgcrypto";

create table if not exists public.profiles (

    id uuid primary key default gen_random_uuid(),

    title text not null,

    description text not null,

    age integer not null,

    gender text not null,

    country text not null,

    city text not null,

    goal text not null,

    telegram text not null,

    photos text[] default '{}',

    vip boolean default false,

    views integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()

);

create index if not exists idx_profiles_created
on public.profiles(created_at desc);

create index if not exists idx_profiles_country
on public.profiles(country);

create index if not exists idx_profiles_city
on public.profiles(city);

create index if not exists idx_profiles_gender
on public.profiles(gender);

create index if not exists idx_profiles_goal
on public.profiles(goal);

alter table public.profiles enable row level security;

create policy "Anyone can view profiles"
on public.profiles
for select
using (true);

create policy "Anyone can insert profiles"
on public.profiles
for insert
with check (true);

create policy "Anyone can update profiles"
on public.profiles
for update
using (true);

create or replace function update_updated_at_column()
returns trigger
language plpgsql
as
$$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists update_profiles_updated_at
on public.profiles;

create trigger update_profiles_updated_at

before update

on public.profiles

for each row

execute function update_updated_at_column();