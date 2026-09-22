/**
 * Подключение сайта к базе данных Supabase.
 *
 * Значения берутся в Supabase: Project Settings → API Keys.
 * Полная инструкция — в файле ADMIN.md.
 *
 * Publishable key можно спокойно хранить в коде: он даёт только право читать
 * каталог — именно так сайт показывает товары посетителям. Изменять товары
 * и цены разрешено лишь тому, кто вошёл в админку по паролю; это проверяет
 * сама база правилами RLS.
 *
 * Ключ sb_secret_... — полная противоположность, он секретный.
 * Его здесь быть не должно никогда.
 */

const PROJECT_URL = 'https://vzkmomzuszvocamjbxpq.supabase.co';

/** Publishable key — в старых проектах назывался anon public. */
const PUBLISHABLE_KEY = 'sb_publishable_jszbcKurzFP3ofMZzvryKw_VCs8MgsW';

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || PROJECT_URL).replace(/\/$/, '');
export const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || PUBLISHABLE_KEY;

export const PHOTO_BUCKET = 'product-photos';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY);
