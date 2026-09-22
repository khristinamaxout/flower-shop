import { fetchDelivery, saveDelivery } from '../data/api.js';
import { deliveryInfo } from '../data/catalog.js';
import { esc, toast, withBusy } from './ui.js';

const MAX_ITEMS = 6;

let root = null;
let items = [];

export async function mountDelivery(container) {
  root = container;
  root.innerHTML = '<p class="admin-loading">Загружаем условия доставки…</p>';

  const remote = (await fetchDelivery()) || deliveryInfo;
  items = (remote.items || []).map((item) => ({ ...item }));
  render(remote);
}

function render(data) {
  root.innerHTML = `
    <form class="admin-form" id="delivery-form">
      <h2 class="admin-form__title">Доставка</h2>
      <p class="admin-note">
        Этот текст посетители видят в блоке «Доставка» на главной странице.
      </p>

      <div class="form-grid">
        <div class="form-field">
          <label for="headline">Заголовок</label>
          <input id="headline" name="headline" required value="${esc(data.headline)}" placeholder="Доставим сегодня.">
        </div>
        <div class="form-field">
          <label for="subline">Подзаголовок</label>
          <input id="subline" name="subline" value="${esc(data.subline)}" placeholder="Доставка по Саратову">
        </div>
      </div>

      <fieldset class="delivery-items">
        <legend class="checklist__title">Условия</legend>
        <div id="items">${items.map(renderItem).join('')}</div>
        <button type="button" class="btn btn--secondary btn--sm" id="add-item">+ Добавить условие</button>
      </fieldset>

      <div class="form-actions">
        <button type="submit" class="btn btn--primary" id="save-delivery">Сохранить</button>
      </div>
    </form>
  `;
  bind();
}

function renderItem(item, index) {
  return `
    <div class="delivery-item" data-index="${index}">
      <div class="form-field">
        <label>Коротко</label>
        <input name="label" value="${esc(item.label)}" placeholder="От 2 часов" required>
      </div>
      <div class="form-field">
        <label>Пояснение</label>
        <input name="text" value="${esc(item.text)}" placeholder="Стандартная доставка по городу — 2–4 часа" required>
      </div>
      <button type="button" class="btn btn--danger btn--sm delivery-item__remove" data-remove="${index}" title="Удалить условие">×</button>
    </div>
  `;
}

function bind() {
  document.getElementById('add-item')?.addEventListener('click', () => {
    if (items.length >= MAX_ITEMS) {
      toast(`Больше ${MAX_ITEMS} условий блок не вместит`, 'error');
      return;
    }
    collectItems();
    items.push({ label: '', text: '' });
    redrawItems();
  });

  root.querySelectorAll('[data-remove]').forEach((btn) =>
    btn.addEventListener('click', () => {
      collectItems();
      items.splice(Number(btn.dataset.remove), 1);
      redrawItems();
    })
  );

  document.getElementById('delivery-form')?.addEventListener('submit', handleSubmit);
}

/** Переносит введённое в DOM обратно в состояние перед перерисовкой списка. */
function collectItems() {
  items = [...root.querySelectorAll('.delivery-item')].map((row) => ({
    label: row.querySelector('[name="label"]').value,
    text: row.querySelector('[name="text"]').value,
  }));
}

function redrawItems() {
  const holder = document.getElementById('items');
  if (!holder) return;
  holder.innerHTML = items.map(renderItem).join('');
  root.querySelectorAll('[data-remove]').forEach((btn) =>
    btn.addEventListener('click', () => {
      collectItems();
      items.splice(Number(btn.dataset.remove), 1);
      redrawItems();
    })
  );
}

async function handleSubmit(e) {
  e.preventDefault();
  collectItems();

  const cleaned = items.filter((item) => item.label.trim() && item.text.trim());
  if (!cleaned.length) {
    toast('Оставьте хотя бы одно условие доставки', 'error');
    return;
  }

  const payload = {
    headline: document.getElementById('headline').value.trim(),
    subline: document.getElementById('subline').value.trim(),
    items: cleaned.map((item) => ({ label: item.label.trim(), text: item.text.trim() })),
  };

  await withBusy(document.getElementById('save-delivery'), 'Сохраняем…', async () => {
    try {
      await saveDelivery(payload);
      items = payload.items;
      toast('Условия доставки обновлены');
    } catch (error) {
      toast(error.message, 'error');
    }
  });
}
