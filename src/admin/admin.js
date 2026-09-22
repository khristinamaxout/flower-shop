import './admin.css';
import { getSupabase, isSupabaseConfigured } from '../data/supabase.js';
import { mountProducts } from './products-view.js';
import { mountDelivery } from './delivery-view.js';
import { esc, toast, withBusy } from './ui.js';
import { DEMO_MODE, DEMO_ACCOUNT } from './demo-config.js';

const base = import.meta.env.BASE_URL;
const app = document.getElementById('admin-app');

const tabs = [
  { id: 'products', label: 'Товары', mount: mountProducts },
  { id: 'delivery', label: 'Доставка', mount: mountDelivery },
];

let activeTab = 'products';

/* ------------------------------------------------------------------ запуск */

async function start() {
  if (!isSupabaseConfigured) {
    renderSetupNotice();
    return;
  }

  const { data } = await getSupabase().auth.getSession();
  if (data.session) {
    renderPanel(data.session.user);
  } else {
    renderLogin();
  }

  getSupabase().auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') renderLogin();
  });
}

/* ------------------------------------------------------- экран без настройки */

function renderSetupNotice() {
  app.innerHTML = `
    <div class="login">
      <div class="login__card">
        <h1 class="login__title">Админка ещё не подключена</h1>
        <p class="login__text">
          Чтобы панель заработала, нужно один раз создать базу в Supabase
          и вписать два ключа в файл <code>src/data/supabase-config.js</code>.
        </p>
        <p class="login__text">
          Пошаговая инструкция лежит в файле <code>ADMIN.md</code> в папке проекта.
        </p>
        <a class="btn btn--secondary" href="${base}">← Вернуться на сайт</a>
      </div>
    </div>
  `;
}

/* ------------------------------------------------------------------- вход */

function renderLogin(message = '') {
  app.innerHTML = `
    <div class="login">
      <div class="login__card">
        <h1 class="login__title">Flora Atelier</h1>
        <p class="login__text">Панель управления сайтом</p>

        ${message ? `<p class="login__error">${esc(message)}</p>` : ''}

        ${
          DEMO_MODE
            ? `
          <button class="btn btn--primary btn--full" id="demo-login">Войти в демо-режиме</button>
          <p class="login__hint">
            Показательный вход без пароля — чтобы продемонстрировать,
            как владелец магазина управляет каталогом.
          </p>
          <button type="button" class="login__toggle" id="show-manual">
            Войти с обычным доступом
          </button>`
            : ''
        }

        <form id="login-form" class="login__form ${DEMO_MODE ? 'is-hidden' : ''}">
          <div class="form-field">
            <label for="email">Почта</label>
            <input id="email" name="email" type="email" autocomplete="username" required>
          </div>
          <div class="form-field">
            <label for="password">Пароль</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required>
          </div>
          <button type="submit" class="btn btn--secondary btn--full" id="login-submit">Войти</button>
        </form>

        <a class="login__back" href="${base}">← Вернуться на сайт</a>
      </div>
    </div>
  `;

  document.getElementById('login-form').addEventListener('submit', handleLogin);

  document.getElementById('demo-login')?.addEventListener('click', (e) =>
    signIn(DEMO_ACCOUNT.email, DEMO_ACCOUNT.password, e.currentTarget)
  );

  document.getElementById('show-manual')?.addEventListener('click', (e) => {
    document.getElementById('login-form').classList.remove('is-hidden');
    e.currentTarget.remove();
    document.getElementById('email').focus();
  });
}

function handleLogin(e) {
  e.preventDefault();
  return signIn(
    document.getElementById('email').value.trim(),
    document.getElementById('password').value,
    document.getElementById('login-submit')
  );
}

async function signIn(email, password, button) {
  await withBusy(button, 'Входим…', async () => {
    const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });

    if (error) {
      renderLogin(explainAuthError(error, email));
      return;
    }
    renderPanel(data.user);
  });
}

function explainAuthError(error, email) {
  if (!error.message.includes('Invalid login credentials')) return error.message;

  return email === DEMO_ACCOUNT.email
    ? 'Демо-доступ ещё не создан в Supabase — см. ADMIN.md, шаг 1.'
    : 'Неверная почта или пароль.';
}

/* ------------------------------------------------------------------ панель */

function renderPanel(user) {
  app.innerHTML = `
    <div class="admin">
      <header class="admin__header">
        <div>
          <h1 class="admin__title">Flora Atelier</h1>
          <p class="admin__user">${esc(user?.email || '')}</p>
        </div>
        <div class="admin__actions">
          <a href="${base}" class="btn btn--secondary" target="_blank" rel="noopener">Открыть сайт</a>
          <button class="btn btn--secondary" id="logout">Выйти</button>
        </div>
      </header>

      <nav class="admin__tabs" role="tablist">
        ${tabs
          .map(
            (tab) => `
          <button
            role="tab"
            class="admin__tab ${activeTab === tab.id ? 'is-active' : ''}"
            data-tab="${tab.id}"
            aria-selected="${activeTab === tab.id}"
          >${esc(tab.label)}</button>`
          )
          .join('')}
      </nav>

      <main class="admin__main" id="tab-content"></main>
    </div>
  `;

  document.getElementById('logout').addEventListener('click', async () => {
    await getSupabase().auth.signOut();
    toast('Вы вышли из панели');
  });

  app.querySelectorAll('[data-tab]').forEach((btn) =>
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      renderPanel(user);
    })
  );

  const content = document.getElementById('tab-content');
  const tab = tabs.find((t) => t.id === activeTab);
  tab.mount(content).catch((error) => {
    content.innerHTML = `<p class="admin-note admin-note--error">${esc(error.message)}</p>`;
  });
}

start();
