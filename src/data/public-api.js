/**
 * Чтение каталога для публичного сайта.
 *
 * Здесь намеренно нет библиотеки Supabase: посетителю нужно только прочитать
 * две таблицы, а это обычные GET-запросы. SDK весит ~64 КБ в сжатом виде и
 * подключается лишь в админке, где действительно нужны вход и загрузка файлов.
 */
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, isSupabaseConfigured } from './supabase-config.js';
import { rowToProduct } from './product-mapper.js';

const TIMEOUT_MS = 8000;

async function get(path) {
  if (!isSupabaseConfigured) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn('[Flora] Не удалось получить данные с сервера:', error.message);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchProducts() {
  const rows = await get('products?select=*&order=sort_order.asc,created_at.asc');
  return rows ? rows.map(rowToProduct) : null;
}

export async function fetchDelivery() {
  const rows = await get('settings?select=value&key=eq.delivery&limit=1');
  return rows?.[0]?.value || null;
}
