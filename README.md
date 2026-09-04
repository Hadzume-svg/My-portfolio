# David — Portfolio

Тёмный студийный портфолио-сайт с янтарным акцентом: UX/UI-дизайн, frontend, Telegram и Discord боты. Собран на **React + Vite**, мультиязычный (5 языков) и с собственной админ-панелью на **Supabase**.

![stack](https://img.shields.io/badge/React-18-61dafb) ![stack](https://img.shields.io/badge/Vite-5-646cff) ![stack](https://img.shields.io/badge/Supabase-3ecf8e)

---

## Возможности

- **5 языков** — русский, английский, польский, украинский, немецкий. Переключатель в шапке, выбор запоминается.
- **Онлайн-перевод контента** — названия и описания работ из админки переводятся автоматически (бесплатный MyMemory API + кэш).
- **Админ-панель** — вход по `/#admin` через Supabase Auth: редактирование профиля, работ, категорий, загрузка изображений.
- **Гибкие категории** — можно переименовывать и менять порядок категорий работ прямо из админки.
- **Избранные работы** — отдельная вкладка в секции работ.
- **Realtime** — правки в админке мгновенно видны всем посетителям.
- **Полная адаптивность** — 7 брейкпоинтов, от десктопа до самых узких телефонов.
- **Анимации появления** (IntersectionObserver), тёмная премиум-тема, шрифты Fraunces / JetBrains Mono / Inter.

---

## Стек

| Слой | Технология |
|------|-----------|
| UI | React 18 + Vite 5 |
| Стили | Чистый CSS (global.css), CSS-переменные |
| Backend | Supabase (Postgres + Auth + Storage + Realtime) |
| Перевод | Встроенный словарь + MyMemory API |
| Деплой | GitHub Pages (GitHub Actions) |

---

## Запуск локально

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173`.

Сборка для продакшена:

```bash
npm run build
```

Готовые файлы — в папке `dist/`.

---

## Как попасть в админку

1. Открой `/#admin` (через URL, без видимой ссылки на сайте).
2. Войди через свой email в Supabase Auth.
3. Внутри: редактируй профиль, работы, категории, загружай фото.

> Перед первым использованием настрой Supabase (см. ниже).

---

## Настройка Supabase

Данные и админка опираются на облачную базу. Секреты в коде — нет, только публичный `anon`-ключ (это нормально для браузерного клиента). Защиту обеспечивают RLS-политики.

1. Создай проект на [supabase.com](https://supabase.com).
2. В `Project Settings → API` возьми **Project URL** и **anon public key**, впиши их в `src/config.js`.
3. Выполни SQL (SQL Editor):

```sql
create table if not exists public.portfolio_data (
  id integer primary key,
  payload jsonb not null,
  updated_at timestamptz default now()
);
alter table public.portfolio_data enable row level security;
create policy "public read" on public.portfolio_data for select using (true);
create policy "admin write" on public.portfolio_data for all
  to authenticated using (true) with check (true);
insert into public.portfolio_data (id, payload)
values (1, '{"profile": {},"projects": []}'::jsonb)
on conflict (id) do nothing;
```

4. Включи **Realtime** для таблицы: `Database → Replication → portfolio_data`.
5. В **Authentication → Users** добавь свой email и пароль — это вход в админку.
6. Для загрузки картинок создай Storage-бакет `portfolio-images` с политикой записи для `authenticated`.

---

## Структура проекта

```
src/
├─ components/
│  ├─ AdminPanel.jsx   # админ-панель (логин, работы, профиль, категории)
│  ├─ Header.jsx       # шапка, логотип, переключатель языка
│  ├─ Hero.jsx         # первый экран
│  ├─ Services.jsx     # услуги и стек
│  ├─ Work.jsx         # секция работ + фильтры
│  ├─ About.jsx        # «обо мне»
│  ├─ Contact.jsx      # контакты
│  └─ Footer.jsx       # подвал
├─ data/               # дефолтные данные (profile, projects)
├─ i18n.js             # словарь 5 языков
├─ store.jsx           # контекст данных, реальtime, перевод
├─ lib/
│  ├─ backend.js       # Supabase: fetch/push/realtime/auth/upload
│  └─ translate.js     # бесплатный онлайн-перевод контента
├─ config.js           # ключи Supabase
└─ styles/global.css   # все стили и переменные темы
```

---

## Деплой на GitHub Pages

В репозитории уже есть GitHub Actions-воркфлоу (`.github/workflows/deploy.yml`). Он собирает проект и публикует `dist/` при каждом пуше в `main`.

1. В настройках репо: **Settings → Pages → Source: GitHub Actions**.
2. Пуш в `main` — сайт автоматически обновляется.

Админка работает через hash-роутинг (`/#admin`), поэтому на GitHub Pages всё открывается без 404.

---

## Лицензия / контакты

© 2026 **David — Portfolio**. Сделано в рамках личного бренда StackOne.
