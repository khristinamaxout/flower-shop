# Как открыть сайт на телефоне

## Ссылка

**https://khristinamaxout.github.io/flower-shop/**

---

## Если сайт не открывается (404 или белый экран)

### Шаг 1 — включить GitHub Pages (один раз)

1. Откройте: https://github.com/khristinamaxout/flower-shop/settings/pages
2. **Build and deployment** → **Source**: выберите **Deploy from a branch**
3. **Branch**: `gh-pages` → папка **`/ (root)`** → **Save**

### Шаг 2 — дождаться деплоя

1. Откройте: https://github.com/khristinamaxout/flower-shop/actions
2. Workflow **Publish site** должен быть зелёным ✓
3. Если красный — нажмите **Run workflow**

### Шаг 3 — открыть на телефоне

Через 2–3 минуты откройте в браузере:

**https://khristinamaxout.github.io/flower-shop/**

---

## Локальная проверка на компьютере

```powershell
cd "c:\Users\User\Desktop\Мой бизнес\Сайты\Цветочный магазин"
npm install
npm run dev
```

Откроется http://localhost:5173

---

Для телефона используйте **GitHub Pages** (ссылка выше).
