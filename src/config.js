// ─── НАСТРОЙКА ОБЛАЧНОЙ БАЗЫ (Supabase) ───────────────────────────────
// Чтобы правки в админке были видны со всех устройств, сайт хранит данные
// в таблице Supabase. Шаги:
//
// 1. Зарегистрируйся на https://supabase.com и создай проект.
// 2. В панели проекта: Project Settings → API → скопируй
//    Project URL и anon public key (впиши их ниже).
// 3. Выполни этот SQL в Supabase (SQL Editor):
//
//    create table if not exists public.portfolio_data (
//      id integer primary key,
//      payload jsonb not null,
//      updated_at timestamptz default now()
//    );
//    alter table public.portfolio_data enable row level security;
//    create policy "public read" on public.portfolio_data for select using (true);
//    create policy "admin write" on public.portfolio_data for all
//      to authenticated using (true) with check (true);
//    insert into public.portfolio_data (id, payload)
//    values (1, '{"profile": {},"projects": []}'::jsonb)
//    on conflict (id) do nothing;
//
// 4. Включи Realtime для таблицы: Database → Replication → tick portfolio_data.
// 5. В Supabase: Authentication → Users → добавь свой email с паролем
//    (это вход в админку). Email впиши в SITE_ADMIN_EMAIL ниже (можно оставить
//    как есть и просто вводить email вручную при входе).

export const SUPABASE_URL = "https://qkcpprgiunublsfixpxi.supabase.co";
export const SUPABASE_ANON_KEY =
  "sb_publishable_yTuPpDxACLfsVj2qLao3lQ_DsW6K3Be";
export const SUPABASE_TABLE = "portfolio_data";
export const SUPABASE_ROW_ID = 1;
export const SITE_ADMIN_EMAIL = "admin@example.com";
// Публичный bucket для картинок работ (см. SQL в чате — Storage)
export const IMG_BUCKET = "portfolio-images";

export const supabaseConfigured = () =>
  !SUPABASE_URL.includes("YOUR-PROJECT") &&
  !SUPABASE_ANON_KEY.includes("YOUR-ANON");