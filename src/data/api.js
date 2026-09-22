/**
 * Запись данных — только для админки.
 *
 * Здесь подключается официальный клиент Supabase: он нужен для входа по паролю
 * и загрузки файлов в хранилище. Чтение вынесено в public-api.js, чтобы
 * публичный сайт не тащил эту библиотеку.
 */
import { getSupabase } from './supabase.js';
import { PHOTO_BUCKET } from './supabase-config.js';
import { productToRow, rowToProduct } from './product-mapper.js';

const PRODUCTS_TABLE = 'products';
const SETTINGS_TABLE = 'settings';
const DELIVERY_KEY = 'delivery';

export { fetchProducts, fetchDelivery } from './public-api.js';

export async function upsertProduct(product) {
  const db = requireClient();
  const { data, error } = await db
    .from(PRODUCTS_TABLE)
    .upsert(productToRow(product), { onConflict: 'id' })
    .select()
    .single();
  if (error) throw new Error(describe(error));
  return rowToProduct(data);
}

export async function deleteProduct(id) {
  const db = requireClient();
  const { error } = await db.from(PRODUCTS_TABLE).delete().eq('id', id);
  if (error) throw new Error(describe(error));
}

export async function saveDelivery(delivery) {
  const db = requireClient();
  const { error } = await db
    .from(SETTINGS_TABLE)
    .upsert({ key: DELIVERY_KEY, value: delivery }, { onConflict: 'key' });
  if (error) throw new Error(describe(error));
}

/** Заливает фотографию в хранилище и возвращает постоянную публичную ссылку. */
export async function uploadPhoto(file) {
  const db = requireClient();

  const extension = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  const { error } = await db.storage
    .from(PHOTO_BUCKET)
    .upload(path, file, { cacheControl: '31536000', upsert: false });
  if (error) throw new Error(describe(error));

  const { data } = db.storage.from(PHOTO_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Переносит встроенный каталог в пустую базу — нужно при первой настройке. */
export async function seedProducts(products) {
  const db = requireClient();
  const rows = products.map((p, index) => productToRow({ ...p, sortOrder: index }));
  const { error } = await db.from(PRODUCTS_TABLE).upsert(rows, { onConflict: 'id' });
  if (error) throw new Error(describe(error));
  return rows.length;
}

/**
 * Возвращает каталог к исходному виду: стирает всё, что есть, и заливает
 * встроенный набор заново. Нужно после показов, чтобы убрать чужие правки.
 */
export async function resetCatalog(products) {
  const db = requireClient();
  // neq по первичному ключу — способ выбрать все строки: пустых id не бывает.
  const { error } = await db.from(PRODUCTS_TABLE).delete().neq('id', '');
  if (error) throw new Error(describe(error));
  return seedProducts(products);
}

function requireClient() {
  const db = getSupabase();
  if (!db) throw new Error('Supabase не настроен — заполните src/data/supabase-config.js');
  return db;
}

/** Переводит технические ошибки Supabase в понятные заказчице сообщения. */
function describe(error) {
  const message = error.message || 'Неизвестная ошибка';
  if (message.includes('row-level security') || error.code === '42501') {
    return 'Нет прав на изменение. Выйдите и войдите в панель заново.';
  }
  if (message.includes('duplicate key')) {
    return 'Товар с таким идентификатором уже существует.';
  }
  if (message.includes('Failed to fetch') || message.includes('NetworkError')) {
    return 'Нет связи с сервером. Проверьте интернет.';
  }
  if (message.includes('exceeded the maximum allowed size')) {
    return 'Файл слишком большой для хранилища.';
  }
  return message;
}
