-- Lernstand-Datenbank für den Lerncode (Supabase, Postgres).
-- Einmalig im Supabase-Projekt unter „SQL Editor“ ausführen. Erneutes Ausführen ist unschädlich.
--
-- Sicherheit:
-- - Die Tabelle ist für den Browser gesperrt (Row Level Security ohne Regeln, keine Rechte für anon).
-- - Zugriff nur über die vier Funktionen unten. Sie verlangen den vollständigen Lerncode;
--   Auflisten oder Durchsuchen fremder Lernstände ist nicht möglich.
-- - Gespeichert wird nur ein SHA-256-Hash des Codes, nie der Code selbst.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.lernstand (
  code_hash  text        not null,
  key        text        not null,
  data       jsonb       not null,
  updated_at timestamptz not null default now(),
  primary key (code_hash, key)
);

alter table public.lernstand enable row level security;
revoke all on public.lernstand from anon, authenticated;

-- Prüft den Code (16 Zeichen aus dem Lerncode-Alphabet) und liefert seinen Hash.
create or replace function public.lernstand_hash(p_code text)
returns text
language plpgsql immutable
set search_path = ''
as $$
begin
  if p_code is null or p_code !~ '^[A-HJKMNP-TV-Z2-9]{16}$' then
    raise exception 'ungültiger Lerncode' using errcode = '22023';
  end if;
  return encode(extensions.digest(p_code, 'sha256'), 'hex');
end;
$$;

-- Erlaubte Schlüssel: je Trainer einer plus „meta“.
create or replace function public.lernstand_key(p_key text)
returns text
language plpgsql immutable
set search_path = ''
as $$
begin
  if p_key is null or p_key not in ('meta', 'progress-lk', 'progress-zf', 'progress-bt') then
    raise exception 'ungültiger Schlüssel' using errcode = '22023';
  end if;
  return p_key;
end;
$$;

create or replace function public.lernstand_get(p_code text, p_key text)
returns jsonb
language sql stable security definer
set search_path = ''
as $$
  select data from public.lernstand
  where code_hash = public.lernstand_hash(p_code) and key = public.lernstand_key(p_key);
$$;

create or replace function public.lernstand_set(p_code text, p_key text, p_data jsonb)
returns void
language plpgsql security definer
set search_path = ''
as $$
begin
  if p_data is null or octet_length(p_data::text) > 512000 then
    raise exception 'Lernstand fehlt oder ist zu groß' using errcode = '22023';
  end if;
  insert into public.lernstand (code_hash, key, data, updated_at)
  values (public.lernstand_hash(p_code), public.lernstand_key(p_key), p_data, now())
  on conflict (code_hash, key) do update set data = excluded.data, updated_at = now();
end;
$$;

create or replace function public.lernstand_exists(p_code text)
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (select 1 from public.lernstand where code_hash = public.lernstand_hash(p_code));
$$;

create or replace function public.lernstand_delete(p_code text)
returns void
language sql security definer
set search_path = ''
as $$
  delete from public.lernstand where code_hash = public.lernstand_hash(p_code);
$$;

-- Nur die vier Funktionen sind von außen aufrufbar.
revoke all on function public.lernstand_hash(text), public.lernstand_key(text) from public, anon, authenticated;
grant execute on function public.lernstand_hash(text), public.lernstand_key(text) to postgres;
revoke all on function public.lernstand_get(text, text), public.lernstand_set(text, text, jsonb),
  public.lernstand_exists(text), public.lernstand_delete(text) from public;
grant execute on function public.lernstand_get(text, text), public.lernstand_set(text, text, jsonb),
  public.lernstand_exists(text), public.lernstand_delete(text) to anon;

-- Aufräumen: Lernstände, die ein Jahr nicht genutzt wurden, löschen (optional, mit pg_cron):
-- select cron.schedule('lernstand-aufraeumen', '17 3 * * 0',
--   $$delete from public.lernstand where code_hash in (
--       select code_hash from public.lernstand group by code_hash having max(updated_at) < now() - interval '1 year')$$);
