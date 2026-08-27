# Как открыть сайт на телефоне

## ⚠️ Почему белый экран

На Netlify **нет папки assets** — JS/CSS не загружаются (404).

Частые причины:
- загрузили только `index.html`, без папки `assets/`
- загрузили папку `dist` целиком, а не **содержимое** dist
- загрузили весь проект вместо **`flower-shop-site.zip`**

В `index.html` должны быть пути **`./assets/...`** (не `/flower-shop/assets/`).

---

## Правильная загрузка (1 минута)

На компьютере уже создан архив:

**`c:\Users\User\Desktop\Мой бизнес\Сайты\Цветочный магазин\flower-shop-site.zip`**

1. **https://app.netlify.com** → сайт **idyllic-melomakarona** → **Deploys**
2. Перетащите файл **`flower-shop-site.zip`** (не папку dist, не весь проект!)
3. Дождитесь **Published** → откройте сайт

**Ссылка:** https://idyllic-melomakarona-f46eb3.netlify.app

---

## Пересобрать архив (если нужно снова)

```powershell
cd "c:\Users\User\Desktop\Мой бизнес\Сайты\Цветочный магазин"
npm run pack:netlify
```

Появится новый `flower-shop-site.zip` — загрузите его на Netlify.

---

## Автодеплой через GitHub

Netlify → **Import from Git** → **flower-shop** → Deploy  
(настройки уже в `netlify.toml`, соберёт правильную версию сам)

---

## GitHub Pages (рекомендуется)

**Ссылка:** https://khristinamaxout.github.io/flower-shop/

### Автодеплой (уже настроен)

При push в `main` GitHub Actions собирает и публикует сайт (`.github/workflows/deploy-pages.yml`).

### Один раз включить Pages (если сайт 404)

1. Откройте: https://github.com/khristinamaxout/flower-shop/settings/pages
2. **Build and deployment** → Source: **GitHub Actions**
3. Подождите 1–2 мин — деплой запустится автоматически после push

Или вручную: **Actions** → **Deploy to GitHub Pages** → **Run workflow**

---
