# Как открыть сайт на телефоне

## Быстро (2 минуты) — ваш Netlify

Сайт был пустым, потому что загружена **неправильная** папка `dist`. Сейчас на компьютере уже лежит **исправленная** сборка.

1. Откройте в браузере: **https://app.netlify.com** → ваш сайт **idyllic-melomakarona**
2. Вкладка **Deploys** (Деплои)
3. Перетащите в область «Drag and drop» папку:

   `c:\Users\User\Desktop\Мой бизнес\Сайты\Цветочный магазин\dist`

4. Подождите 30 секунд → **Open production deploy**

Ссылка останется: **https://idyllic-melomakarona-f46eb3.netlify.app**

---

## Навсегда — Netlify + GitHub (автообновление)

1. **https://app.netlify.com** → **Add new site** → **Import an existing project**
2. **GitHub** → репозиторий **flower-shop**
3. Netlify сам подставит настройки из `netlify.toml` → **Deploy**
4. Каждый push в GitHub будет обновлять сайт

---

## Альтернатива — GitHub Pages

1. Репозиторий должен быть **Public** (Настройки → Visibility)
2. **Settings** → **Pages** → Source: **GitHub Actions**
3. Ссылка: **https://khristinamaxout.github.io/flower-shop/**

---

## Пересобрать dist перед загрузкой

```powershell
cd "c:\Users\User\Desktop\Мой бизнес\Сайты\Цветочный магазин"
npm run build:netlify
```

Потом снова перетащите папку `dist` на Netlify.
