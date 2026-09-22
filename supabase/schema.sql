-- ============================================================
--  Flora Atelier — структура базы для админ-панели
--  Выполнить один раз: Supabase → SQL Editor → вставить → Run
-- ============================================================

-- ---------- Таблица товаров ----------
create table if not exists public.products (
  id          text primary key,
  name        text        not null,
  price       integer     not null default 0,
  old_price   integer,
  tagline     text        default '',
  description text        default '',
  emotional   text        default '',
  size        text        default '',
  composition text        default '',
  image       text        default '',
  alt         text        default '',
  category    text        not null default 'bouquets',
  badge       text,
  tags        text[]      default '{}',
  recipient   text[]      default '{}',
  occasion    text[]      default '{}',
  collections text[]      default '{}',
  budget      integer     default 0,
  bestseller  boolean     default false,
  seasonal    boolean     default false,
  available   boolean     default true,
  add_ons     boolean     default true,
  sort_order  integer     default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ---------- Таблица настроек (доставка и прочее) ----------
create table if not exists public.settings (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz default now()
);

-- ---------- Автоматическое обновление updated_at ----------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch on public.products;
create trigger products_touch
  before update on public.products
  for each row execute function public.touch_updated_at();

drop trigger if exists settings_touch on public.settings;
create trigger settings_touch
  before update on public.settings
  for each row execute function public.touch_updated_at();

-- ---------- Права доступа ----------
-- Каталог виден всем, изменять его может только вошедший в админку.
alter table public.products enable row level security;
alter table public.settings enable row level security;

-- Каталог читают все посетители.
drop policy if exists "products_public_read" on public.products;
create policy "products_public_read"
  on public.products for select
  using (true);

-- Менять каталог может только тот, кто вошёл в админку.
drop policy if exists "products_admin_write" on public.products;
create policy "products_admin_write"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "settings_public_read" on public.settings;
create policy "settings_public_read"
  on public.settings for select
  using (true);

drop policy if exists "settings_admin_write" on public.settings;
create policy "settings_admin_write"
  on public.settings for all
  to authenticated
  using (true)
  with check (true);

-- ---------- Хранилище фотографий ----------
insert into storage.buckets (id, name, public)
values ('product-photos', 'product-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "photos_public_read" on storage.objects;
create policy "photos_public_read"
  on storage.objects for select
  using (bucket_id = 'product-photos');

drop policy if exists "photos_admin_insert" on storage.objects;
create policy "photos_admin_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-photos');

drop policy if exists "photos_admin_delete" on storage.objects;
create policy "photos_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-photos');

-- ---------- Значения доставки по умолчанию ----------
insert into public.settings (key, value)
values (
  'delivery',
  '{
    "headline": "Доставим сегодня.",
    "subline": "Доставка по Саратову",
    "items": [
      { "label": "Сегодня",           "text": "Принимаем заказы ежедневно с 9:00 до 21:00" },
      { "label": "От 2 часов",        "text": "Стандартная доставка по городу — 2–4 часа" },
      { "label": "Бережная доставка", "text": "Курьер бережно доставит букет по адресу" },
      { "label": "Открытка",          "text": "Можно добавить открытку с вашим текстом" }
    ]
  }'::jsonb
)
on conflict (key) do nothing;
