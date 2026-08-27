# Как открыть сайт на телефоне

## ⚠️ Почему белый экран

На Netlify должны быть пути `./assets/...`  
Если в `index.html` написано `/flower-shop/assets/...` — это **неправильная** сборка, сайт будет белым.

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

## GitHub Pages

https://khristinamaxout.github.io/flower-shop/  
(репозиторий Public + Settings → Pages → GitHub Actions)
