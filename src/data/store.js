/**
 * Product persistence — localStorage with backend-ready architecture.
 */
const STORAGE_KEY = 'flora_atelier_products_v1';

export function loadProducts(defaults) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaults);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : structuredClone(defaults);
  } catch {
    return structuredClone(defaults);
  }
}

export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  window.dispatchEvent(new CustomEvent('products-updated'));
}

export function resetProducts() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('products-updated'));
}

export function generateProductId(products) {
  const nums = products
    .map((p) => parseInt(String(p.id).replace(/\D/g, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `p${next}`;
}

export const categoryOptions = [
  { id: 'bouquets', label: 'Букеты' },
  { id: 'compositions', label: 'Композиции' },
  { id: 'single', label: 'Цветы поштучно' },
  { id: 'balloons', label: 'Шары' },
  { id: 'potted', label: 'Растения' },
  { id: 'toys', label: 'Игрушки' },
  { id: 'souvenirs', label: 'Сувениры' },
  { id: 'paintings', label: 'Картины' },
];

export const badgeOptions = [
  { id: '', label: 'Без badge' },
  { id: 'bestseller', label: 'Часто заказывают' },
  { id: 'seasonal', label: 'Сезон' },
  { id: 'bundle', label: 'Набор' },
];

export const imageOptions = [
  'bouquet-01.webp',
  'bouquet-02.webp',
  'bouquet-03.webp',
  'bouquet-04.webp',
  'bouquet-05.webp',
  'bouquet-06.webp',
  'bouquet-07.webp',
  'bouquet-08.webp',
  'composition-01.webp',
  'single-01.webp',
  'balloons-01.webp',
  'plants.webp',
  'toy-01.webp',
  'souvenir-01.webp',
  'painting-01.webp',
  'gift-box.webp',
  'flowers-detail.webp',
];
