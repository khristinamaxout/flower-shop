import {
  categoryOptions,
  badgeOptions,
  collectionOptions,
  recipientOptions,
  occasionOptions,
  imageOptions,
  generateProductId,
} from '../data/store.js';
import { defaultProducts, badgeLabels } from '../data/products.js';
import {
  fetchProducts,
  upsertProduct,
  deleteProduct,
  uploadPhoto,
  seedProducts,
  resetCatalog,
} from '../data/api.js';
import { DEMO_MODE } from './demo-config.js';
import { formatPrice } from '../utils/order.js';
import { esc, toast, withBusy, confirmAction } from './ui.js';
import { compressPhoto, validatePhoto, formatBytes } from './image-tools.js';

const stockBase = `${import.meta.env.BASE_URL}references/items/`;

const state = {
  products: [],
  editingId: null,
  search: '',
  category: 'all',
  /** Выбранный, но ещё не загруженный на сервер файл. */
  pendingFile: null,
  previewUrl: '',
  stockOpen: false,
};

let root = null;

export async function mountProducts(container) {
  root = container;
  root.innerHTML = '<p class="admin-loading">Загружаем каталог…</p>';
  await refresh();
}

async function refresh() {
  const list = await fetchProducts();
  state.products = list || [];
  render();
}

/* ---------------------------------------------------------------- отрисовка */

function render() {
  if (!root) return;

  if (!state.products.length) {
    root.innerHTML = renderEmpty();
    bindEmpty();
    return;
  }

  root.innerHTML = `
    ${renderStats()}
    ${renderToolbar()}
    ${renderTable()}
    ${renderForm()}
  `;
  bind();
}

function renderEmpty() {
  return `
    <div class="empty-state">
      <h2 class="empty-state__title">Каталог пока пуст</h2>
      <p class="empty-state__text">
        Можно перенести в базу готовые ${defaultProducts.length} позиций с сайта
        и дальше править их здесь, или начать с чистого листа.
      </p>
      <div class="empty-state__actions">
        <button class="btn btn--primary" id="seed">Перенести готовый каталог</button>
        <button class="btn btn--secondary" id="start-blank">Добавить первый товар</button>
      </div>
    </div>
  `;
}

function renderStats() {
  const visible = state.products.filter((p) => p.available !== false).length;
  const hidden = state.products.length - visible;
  const prices = state.products.map((p) => p.price).filter(Boolean);
  const average = prices.length
    ? Math.round(prices.reduce((sum, n) => sum + n, 0) / prices.length)
    : 0;

  const cards = [
    ['Всего товаров', state.products.length],
    ['Показываются', visible],
    ['Скрыты', hidden],
    ['Средняя цена', formatPrice(average)],
  ];

  return `
    <div class="admin__stats">
      ${cards
        .map(
          ([label, value]) => `
        <div class="stat-card">
          <div class="stat-card__label">${label}</div>
          <div class="stat-card__value">${esc(value)}</div>
        </div>`
        )
        .join('')}
    </div>
  `;
}

function renderToolbar() {
  return `
    <div class="toolbar">
      <input
        type="search"
        id="search"
        class="toolbar__search"
        placeholder="Поиск по названию"
        value="${esc(state.search)}"
      >
      <select id="filter-category" class="toolbar__select">
        <option value="all">Все категории</option>
        ${categoryOptions
          .map(
            (c) =>
              `<option value="${c.id}" ${state.category === c.id ? 'selected' : ''}>${esc(c.label)}</option>`
          )
          .join('')}
      </select>
      ${DEMO_MODE ? '<button class="btn btn--secondary" id="reset-catalog">Восстановить каталог</button>' : ''}
      <button class="btn btn--primary" id="add-new">+ Добавить товар</button>
    </div>
  `;
}

function visibleProducts() {
  const query = state.search.trim().toLowerCase();
  return state.products.filter((p) => {
    const byCategory = state.category === 'all' || p.category === state.category;
    const byQuery = !query || p.name.toLowerCase().includes(query);
    return byCategory && byQuery;
  });
}

function renderTable() {
  const rows = visibleProducts();

  if (!rows.length) {
    return '<p class="admin-note">По этому запросу ничего не нашлось.</p>';
  }

  return `
    <table class="products-table">
      <thead>
        <tr>
          <th>Фото</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Цена</th>
          <th>На сайте</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${rows.map(renderRow).join('')}
      </tbody>
    </table>
  `;
}

function renderRow(p) {
  const category = categoryOptions.find((c) => c.id === p.category)?.label || p.category;
  const badge = p.badge
    ? `<span class="badge-pill">${esc(badgeLabels[p.badge] || p.badge)}</span>`
    : '';
  const shown = p.available !== false;

  return `
    <tr${shown ? '' : ' class="is-hidden-row"'}>
      <td><img class="products-table__thumb" src="${esc(p.image)}" alt="" loading="lazy"></td>
      <td>
        <div class="products-table__name">${esc(p.name)}</div>
        ${badge}
      </td>
      <td>${esc(category)}</td>
      <td class="products-table__price">
        ${formatPrice(p.price)}
        ${p.oldPrice ? `<s>${formatPrice(p.oldPrice)}</s>` : ''}
      </td>
      <td>
        <button
          class="toggle ${shown ? 'toggle--on' : ''}"
          data-toggle="${esc(p.id)}"
          title="${shown ? 'Скрыть с сайта' : 'Показать на сайте'}"
          aria-pressed="${shown}"
        ><span class="toggle__knob"></span></button>
      </td>
      <td class="products-table__actions">
        <button class="btn btn--secondary btn--sm" data-edit="${esc(p.id)}">Изменить</button>
        <button class="btn btn--danger btn--sm" data-delete="${esc(p.id)}">Удалить</button>
      </td>
    </tr>
  `;
}

const blankProduct = {
  name: '',
  price: '',
  oldPrice: '',
  tagline: '',
  description: '',
  emotional: '',
  size: '',
  composition: '',
  category: 'bouquets',
  badge: '',
  image: '',
  seasonal: false,
  available: true,
  addOns: true,
  collections: [],
  recipient: [],
  occasion: [],
};

function renderForm() {
  const editing = state.editingId
    ? state.products.find((p) => p.id === state.editingId)
    : null;
  const p = editing || blankProduct;
  const photo = state.previewUrl || p.image;

  return `
    <form class="admin-form" id="product-form">
      <h2 class="admin-form__title">
        ${editing ? `Редактируем «${esc(p.name)}»` : 'Новый товар'}
      </h2>

      ${renderPhotoField(photo)}

      <div class="form-grid">
        <div class="form-field">
          <label for="name">Название</label>
          <input id="name" name="name" required value="${esc(p.name)}" placeholder="Тихое утро">
        </div>
        <div class="form-field">
          <label for="category">Категория</label>
          <select id="category" name="category">
            ${categoryOptions
              .map(
                (c) =>
                  `<option value="${c.id}" ${p.category === c.id ? 'selected' : ''}>${esc(c.label)}</option>`
              )
              .join('')}
          </select>
        </div>
        <div class="form-field">
          <label for="price">Цена, ₽</label>
          <input id="price" name="price" type="number" min="0" step="50" required value="${esc(p.price)}">
        </div>
        <div class="form-field">
          <label for="oldPrice">Цена до скидки, ₽ <span class="hint">необязательно</span></label>
          <input id="oldPrice" name="oldPrice" type="number" min="0" step="50" value="${esc(p.oldPrice ?? '')}">
        </div>

        <div class="form-field form-grid__full">
          <label for="tagline">Подпись под названием</label>
          <input id="tagline" name="tagline" value="${esc(p.tagline)}" placeholder="Мягкий свет и нежные оттенки">
        </div>
        <div class="form-field form-grid__full">
          <label for="description">Из чего собран букет</label>
          <textarea id="description" name="description" placeholder="Пионовидные розы, эвкалипт, матовая упаковка">${esc(p.description)}</textarea>
        </div>
        <div class="form-field form-grid__full">
          <label for="emotional">Текст о настроении <span class="hint">показывается в карточке товара</span></label>
          <textarea id="emotional" name="emotional" placeholder="Когда хочется сказать «я рядом» без лишних слов.">${esc(p.emotional)}</textarea>
        </div>

        <div class="form-field">
          <label for="size">Размер</label>
          <input id="size" name="size" value="${esc(p.size)}" placeholder="Средний · ~45 см">
        </div>
        <div class="form-field">
          <label for="composition">Состав</label>
          <input id="composition" name="composition" value="${esc(p.composition)}" placeholder="Розы, эвкалипт, зелень">
        </div>
        <div class="form-field">
          <label for="badge">Метка на карточке</label>
          <select id="badge" name="badge">
            ${badgeOptions
              .map(
                (b) =>
                  `<option value="${b.id}" ${(p.badge || '') === b.id ? 'selected' : ''}>${esc(b.label)}</option>`
              )
              .join('')}
          </select>
        </div>
      </div>

      ${renderChecklist('Разделы на главной', 'collections', collectionOptions, p.collections)}
      ${renderChecklist('Кому подойдёт', 'recipient', recipientOptions, p.recipient)}
      ${renderChecklist('К какому поводу', 'occasion', occasionOptions, p.occasion)}

      <div class="form-checks">
        <label><input type="checkbox" name="available" ${p.available !== false ? 'checked' : ''}> Показывать на сайте</label>
        <label><input type="checkbox" name="seasonal" ${p.seasonal ? 'checked' : ''}> Сезонный товар</label>
        <label><input type="checkbox" name="addOns" ${p.addOns !== false ? 'checked' : ''}> Предлагать дополнения к заказу</label>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn--primary" id="save-product">
          ${editing ? 'Сохранить изменения' : 'Добавить товар'}
        </button>
        ${editing ? '<button type="button" class="btn btn--secondary" id="cancel-edit">Отмена</button>' : ''}
      </div>
    </form>
  `;
}

function renderPhotoField(photo) {
  return `
    <div class="photo-field">
      <div class="photo-drop" id="photo-drop" tabindex="0" role="button" aria-label="Загрузить фотографию">
        ${
          photo
            ? `<img class="photo-drop__img" src="${esc(photo)}" alt="Текущая фотография товара">`
            : '<span class="photo-drop__placeholder">Фото пока нет</span>'
        }
        <span class="photo-drop__overlay">Перетащите фото сюда</span>
      </div>
      <div class="photo-field__side">
        <label class="btn btn--primary photo-field__upload">
          Выбрать фото с устройства
          <input type="file" id="photo-input" accept="image/jpeg,image/png,image/webp,image/avif" hidden>
        </label>
        <button type="button" class="btn btn--secondary" id="toggle-stock">
          ${state.stockOpen ? 'Скрыть готовые фото' : 'Взять из готовых'}
        </button>
        <p class="photo-field__hint" id="photo-status">
          JPG, PNG или WebP. Большие снимки уменьшаются автоматически.
        </p>
      </div>
      ${state.stockOpen ? renderStockGrid() : ''}
    </div>
  `;
}

function renderStockGrid() {
  return `
    <div class="stock-grid">
      ${imageOptions
        .map(
          (file) => `
        <button type="button" class="stock-grid__item" data-stock="${esc(file)}" title="${esc(file)}">
          <img src="${esc(stockBase + file)}" alt="" loading="lazy">
        </button>`
        )
        .join('')}
    </div>
  `;
}

function renderChecklist(title, name, options, selected = []) {
  const chosen = new Set(selected || []);
  return `
    <fieldset class="checklist">
      <legend class="checklist__title">${esc(title)}</legend>
      <div class="checklist__options">
        ${options
          .map(
            (o) => `
          <label class="chip">
            <input type="checkbox" name="${name}" value="${esc(o.id)}" ${chosen.has(o.id) ? 'checked' : ''}>
            <span>${esc(o.label)}</span>
          </label>`
          )
          .join('')}
      </div>
    </fieldset>
  `;
}

/* -------------------------------------------------------------- обработчики */

function bindEmpty() {
  document.getElementById('seed')?.addEventListener('click', async (e) => {
    await withBusy(e.currentTarget, 'Переносим…', async () => {
      try {
        const count = await seedProducts(defaultProducts);
        await refresh();
        toast(`Перенесли ${count} позиций`);
      } catch (error) {
        toast(error.message, 'error');
      }
    });
  });

  document.getElementById('start-blank')?.addEventListener('click', () => {
    state.products = [];
    state.editingId = null;
    root.innerHTML = renderForm();
    bind();
  });
}

function bind() {
  document.getElementById('search')?.addEventListener('input', (e) => {
    state.search = e.target.value;
    rerenderTableOnly();
  });

  document.getElementById('filter-category')?.addEventListener('change', (e) => {
    state.category = e.target.value;
    rerenderTableOnly();
  });

  document.getElementById('add-new')?.addEventListener('click', () => {
    startEditing(null);
  });

  document.getElementById('reset-catalog')?.addEventListener('click', async (e) => {
    if (!confirmAction('Вернуть каталог к исходным товарам? Все правки и добавленные товары будут стёрты.')) return;

    await withBusy(e.currentTarget, 'Восстанавливаем…', async () => {
      try {
        const count = await resetCatalog(defaultProducts);
        state.editingId = null;
        releasePreview();
        await refresh();
        toast(`Каталог восстановлен: ${count} позиций`);
      } catch (error) {
        toast(error.message, 'error');
      }
    });
  });

  document.getElementById('cancel-edit')?.addEventListener('click', () => {
    startEditing(null);
  });

  root.querySelectorAll('[data-edit]').forEach((btn) =>
    btn.addEventListener('click', () => startEditing(btn.dataset.edit))
  );

  root.querySelectorAll('[data-delete]').forEach((btn) =>
    btn.addEventListener('click', () => handleDelete(btn.dataset.delete))
  );

  root.querySelectorAll('[data-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => handleToggle(btn.dataset.toggle))
  );

  bindPhotoField();

  document.getElementById('product-form')?.addEventListener('submit', handleSubmit);
}

/** Перерисовывает только таблицу — чтобы поиск не сбрасывал фокус и форму. */
function rerenderTableOnly() {
  const current = root.querySelector('.products-table') || root.querySelector('.admin-note');
  if (!current) return;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderTable();
  current.replaceWith(wrapper.firstElementChild);

  root.querySelectorAll('[data-edit]').forEach((btn) =>
    btn.addEventListener('click', () => startEditing(btn.dataset.edit))
  );
  root.querySelectorAll('[data-delete]').forEach((btn) =>
    btn.addEventListener('click', () => handleDelete(btn.dataset.delete))
  );
  root.querySelectorAll('[data-toggle]').forEach((btn) =>
    btn.addEventListener('click', () => handleToggle(btn.dataset.toggle))
  );
}

function startEditing(id) {
  state.editingId = id;
  releasePreview();
  state.stockOpen = false;
  render();
  document.getElementById('product-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function releasePreview() {
  if (state.previewUrl.startsWith('blob:')) URL.revokeObjectURL(state.previewUrl);
  state.previewUrl = '';
  state.pendingFile = null;
}

function bindPhotoField() {
  const input = document.getElementById('photo-input');
  const drop = document.getElementById('photo-drop');

  input?.addEventListener('change', () => {
    if (input.files?.[0]) acceptPhoto(input.files[0]);
  });

  drop?.addEventListener('click', () => input?.click());
  drop?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input?.click();
    }
  });

  ['dragenter', 'dragover'].forEach((type) =>
    drop?.addEventListener(type, (e) => {
      e.preventDefault();
      drop.classList.add('is-dragging');
    })
  );

  ['dragleave', 'drop'].forEach((type) =>
    drop?.addEventListener(type, (e) => {
      e.preventDefault();
      drop.classList.remove('is-dragging');
    })
  );

  drop?.addEventListener('drop', (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (file) acceptPhoto(file);
  });

  document.getElementById('toggle-stock')?.addEventListener('click', () => {
    state.stockOpen = !state.stockOpen;
    redrawPhotoField();
  });

  root.querySelectorAll('[data-stock]').forEach((btn) =>
    btn.addEventListener('click', () => {
      releasePreview();
      state.previewUrl = stockBase + btn.dataset.stock;
      state.stockOpen = false;
      redrawPhotoField();
    })
  );
}

/** Обновляет блок с фото, не трогая уже заполненные поля формы. */
function redrawPhotoField() {
  const form = document.getElementById('product-form');
  const field = form?.querySelector('.photo-field');
  if (!field) return;

  const editing = state.editingId
    ? state.products.find((p) => p.id === state.editingId)
    : null;
  const photo = state.previewUrl || editing?.image || '';

  const wrapper = document.createElement('div');
  wrapper.innerHTML = renderPhotoField(photo);
  field.replaceWith(wrapper.firstElementChild);
  bindPhotoField();
}

function acceptPhoto(file) {
  const problem = validatePhoto(file);
  if (problem) {
    toast(problem, 'error');
    return;
  }

  releasePreview();
  state.pendingFile = file;
  state.previewUrl = URL.createObjectURL(file);
  state.stockOpen = false;
  redrawPhotoField();

  const status = document.getElementById('photo-status');
  if (status) status.textContent = `${file.name} · ${formatBytes(file.size)} — загрузится при сохранении`;
}

async function handleToggle(id) {
  const product = state.products.find((p) => p.id === id);
  if (!product) return;

  const updated = { ...product, available: product.available === false };
  try {
    await upsertProduct(updated);
    state.products = state.products.map((p) => (p.id === id ? updated : p));
    render();
    toast(updated.available ? 'Товар снова на сайте' : 'Товар скрыт с сайта');
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function handleDelete(id) {
  const product = state.products.find((p) => p.id === id);
  if (!product) return;
  if (!confirmAction(`Удалить «${product.name}» навсегда?`)) return;

  try {
    await deleteProduct(id);
    state.products = state.products.filter((p) => p.id !== id);
    if (state.editingId === id) state.editingId = null;
    render();
    toast('Товар удалён');
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const fd = new FormData(form);
  const name = fd.get('name').trim();
  const price = Number(fd.get('price'));

  const editing = state.editingId
    ? state.products.find((p) => p.id === state.editingId)
    : null;

  let image = state.previewUrl || editing?.image || '';
  if (!image && !state.pendingFile) {
    toast('Добавьте фотографию товара', 'error');
    return;
  }

  await withBusy(document.getElementById('save-product'), 'Сохраняем…', async () => {
    try {
      if (state.pendingFile) {
        const prepared = await compressPhoto(state.pendingFile);
        image = await uploadPhoto(prepared);
      }

      const payload = {
        id: editing ? editing.id : generateProductId(state.products),
        name,
        price,
        oldPrice: fd.get('oldPrice') ? Number(fd.get('oldPrice')) : null,
        tagline: fd.get('tagline').trim(),
        description: fd.get('description').trim(),
        emotional: fd.get('emotional').trim(),
        size: fd.get('size').trim(),
        composition: fd.get('composition').trim(),
        category: fd.get('category'),
        badge: fd.get('badge') || null,
        image,
        alt: `${name} — Flora Atelier`,
        collections: fd.getAll('collections'),
        recipient: fd.getAll('recipient'),
        occasion: fd.getAll('occasion'),
        // Подборщик подарка ищет по общему списку тегов.
        tags: [...new Set([...fd.getAll('recipient'), ...fd.getAll('occasion')])],
        budget: price,
        bestseller: fd.getAll('collections').includes('bestseller'),
        seasonal: fd.get('seasonal') === 'on',
        available: fd.get('available') === 'on',
        addOns: fd.get('addOns') === 'on',
        sortOrder: editing?.sortOrder ?? state.products.length,
      };

      const saved = await upsertProduct(payload);

      state.products = editing
        ? state.products.map((p) => (p.id === saved.id ? saved : p))
        : [...state.products, saved];

      state.editingId = null;
      releasePreview();
      render();
      toast(editing ? 'Изменения сохранены' : 'Товар добавлен');
    } catch (error) {
      toast(error.message, 'error');
    }
  });
}
