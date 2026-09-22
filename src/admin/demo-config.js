/**
 * Демонстрационный режим.
 *
 * Сайт показывается владельцам цветочных магазинов, поэтому вход в панель
 * сделан в один клик: набирать почту и пароль при живом показе неудобно.
 *
 * Доступ ниже должен существовать в Supabase:
 * Authentication → Users → Add user, с включённой галочкой Auto Confirm User.
 *
 * Когда сайт будет сдаваться конкретному магазину, поставьте DEMO_MODE в false
 * и удалите демо-пользователя в Supabase — останется обычный вход по паролю.
 */
export const DEMO_MODE = true;

export const DEMO_ACCOUNT = {
  email: 'demo@flora-atelier.ru',
  password: 'flora-demo-2026',
};
