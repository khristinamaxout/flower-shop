# Flora Atelier — Цветочный магазин в Саратове

Премиальный конверсионный сайт для цветочного магазина с доставкой по Саратову.

## Запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173`

## Сборка

```bash
npm run build
npm run preview
```

## Структура

```
src/
├── components/     # UI-секции (Header, Hero, GiftFinder и др.)
├── data/           # Mock-каталог (products.js, catalog.js)
├── styles/         # CSS design system
├── utils/          # Анимации, заказ, модалки
└── main.js         # Точка входа
```

## Изображения

Фото встроены в код (`src/data/image-data.js`) и **не зависят от интернета**.

Заменить на свои фото:
1. Положите JPG-файлы в `src/assets/images/` (те же имена: `hero.jpg`, `bouquet-01.jpg` …)
2. Выполните: `npm run images`

Перегенерация заглушек: `npm run images`

## Подключение реального каталога

Замените функции в `src/data/products.js` на API-запросы:

- `products` — массив товаров
- `filterByGiftFinder()` — фильтрация для gift finder
- `filterByScenario()` — фильтрация по сценариям
- `getByCategory()` — товары по категории

Функция заказа в `src/utils/order.js` → `initiateOrder()` — подключите к корзине или CRM.

## SEO

- Title, meta description, H1/H2
- LocalBusiness schema (Florist) в `index.html`
- Alt-тексты для изображений
- Семантическая разметка

## Брендинг

Название **Flora Atelier** — placeholder. Замените в:
- `index.html` (title, schema)
- `src/data/catalog.js` (siteConfig)
- `src/components/Header.js`, `Footer.js`
