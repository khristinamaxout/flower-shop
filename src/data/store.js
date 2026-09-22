/**
 * Локальный кэш каталога.
 *
 * Источник правды — база Supabase. Кэш нужен только чтобы сайт показал
 * настоящий каталог мгновенно при загрузке и не опустел, если сеть
 * недоступна. Он обновляется при каждом успешном ответе сервера.
 */
const CACHE_KEY = 'flora_atelier_catalog_cache_v2';

export function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

export function writeCache(products) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(products));
  } catch {
    /* Кэш не критичен: переполненное хранилище не должно ломать сайт. */
  }
}

export function clearCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    /* см. выше */
  }
}

/** Подбирает свободный идентификатор вида p17 для нового товара. */
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
  { id: 'potted', label: 'Комнатные растения' },
  { id: 'toys', label: 'Игрушки' },
  { id: 'souvenirs', label: 'Сувениры' },
  { id: 'paintings', label: 'Картины' },
];

export const badgeOptions = [
  { id: '', label: 'Без метки' },
  { id: 'hit', label: 'Хит' },
  { id: 'new', label: 'Новинка' },
  { id: 'seasonal', label: 'Сезонное' },
  { id: 'favorite', label: 'Любимый' },
];

/** Коллекции, в которые товар может попасть на главной странице. */
export const collectionOptions = [
  { id: 'bestseller', label: 'Выбирают чаще всего' },
  { id: 'new', label: 'Новая коллекция' },
  { id: 'no-reason', label: 'Цветы просто так' },
  { id: 'special', label: 'Для особенного случая' },
  { id: 'gift', label: 'Подарки' },
  { id: 'home', label: 'Для дома' },
];

/** Кому подойдёт товар — используется подборщиком подарка. */
export const recipientOptions = [
  { id: 'loved', label: 'Любимой' },
  { id: 'mom', label: 'Маме' },
  { id: 'friend', label: 'Подруге' },
  { id: 'colleague', label: 'Коллеге' },
  { id: 'man', label: 'Мужчине' },
  { id: 'self', label: 'Себе' },
];

/** Повод — тоже используется подборщиком подарка. */
export const occasionOptions = [
  { id: 'birthday', label: 'День рождения' },
  { id: 'date', label: 'Свидание' },
  { id: 'holiday', label: 'Праздник' },
  { id: 'thanks', label: 'Благодарность' },
  { id: 'anniversary', label: 'Годовщина' },
  { id: 'no-reason', label: 'Без повода' },
];

export { imageOptions } from './image-options.js';
