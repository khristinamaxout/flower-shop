import {
  saveAllProducts,
  reloadProducts,
  badgeLabels,
} from '../data/products.js';
import {
  categoryOptions,
  badgeOptions,
  imageOptions,
  generateProductId,
  resetProducts,
} from '../data/store.js';
import { formatPrice } from '../utils/order.js';

const base = import.meta.env.BASE_URL;
let products = reloadProducts();
let editingId = null;

function imageUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('http') || filename.startsWith('/')) return filename;
  return `${base}references/items/${filename}`;
}

function resolveImage(product) {
  const src = product.image || '';
  if (src.includes('/references/items/')) {
    const name = src.split('/references/items/').pop();
    return imageUrl(name);
  }
  if (src.includes('/images/')) {
    const name = src.split('/images/').pop();
    return imageUrl(name);
  }
  return src;
}

function filenameFromProduct(product) {
  const src = product.image || '';
  const match = src.match(/(?:references\/items|images)\/([^/?#]+)/);
  return match ? match[1] : 'pink-01.webp';
}

function showToast(message) {
  let toast = document.querySelector('.admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'admin-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

function renderStats() {
  const active = products.filter((p) => p.available !== false).length;
  const bestsellers = products.filter((p) => p.bestseller).length;
  const seasonal = products.filter((p) => p.seasonal).length;

  return `
    <div class="admin__stats">
      <div class="stat-card"><div class="stat-card__label">Всего</div><div class="stat-card__value">${products.length}</div></div>
      <div class="stat-card"><div class="stat-card__label">Активных</div><div class="stat-card__value">${active}</div></div>
      <div class="stat-card"><div class="stat-card__label">Хиты</div><div class="stat-card__value">${bestsellers}</div></div>
      <div class="stat-card"><div class="stat-card__label">Сезон</div><div class="stat-card__value">${seasonal}</div></div>
    </div>
  `;
}

function renderTable() {
  return `
    <table class="products-table">
      <thead>
        <tr>
          <th>Фото</th>
          <th>Название</th>
          <th>Категория</th>
          <th>Цена</th>
          <th>Статус</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${products
          .map((p) => {
            const cat = categoryOptions.find((c) => c.id === p.category)?.label || p.category;
            const status = p.available === false ? '<span class="badge-pill badge-pill--off">Скрыт</span>' : '<span class="badge-pill">Активен</span>';
            const badge = p.badge ? `<span class="badge-pill">${badgeLabels[p.badge] || p.badge}</span>` : '';
            return `
              <tr>
                <td><img class="products-table__thumb" src="${resolveImage(p)}" alt=""></td>
                <td>
                  <div class="products-table__name">${p.name}</div>
                  ${badge}
                </td>
                <td>${cat}</td>
                <td class="products-table__price">${formatPrice(p.price)}${p.oldPrice ? ` <s>${formatPrice(p.oldPrice)}</s>` : ''}</td>
                <td>${status}</td>
                <td>
                  <button class="btn btn--secondary btn--sm" data-edit="${p.id}">Изменить</button>
                  <button class="btn btn--danger btn--sm" data-delete="${p.id}">Удалить</button>
                </td>
              </tr>
            `;
          })
          .join('')}
      </tbody>
    </table>
  `;
}

function renderForm(product = null) {
  const p = product || {
    name: '',
    price: '',
    oldPrice: '',
    description: '',
    emotional: '',
    category: 'bouquets',
    badge: '',
    image: 'bouquet-01.webp',
    bestseller: false,
    seasonal: false,
    available: true,
    addOns: true,
  };

  const imageFile = product ? filenameFromProduct(product) : p.image;

  return `
    <form class="admin-form" id="product-form">
      <h2 class="admin-form__title">${editingId ? 'Редактировать товар' : 'Добавить товар'}</h2>
      <div class="form-grid">
        <div class="form-field">
          <label for="name">Название</label>
          <input id="name" name="name" required value="${p.name || ''}">
        </div>
        <div class="form-field">
          <label for="category">Категория</label>
          <select id="category" name="category">
            ${categoryOptions.map((c) => `<option value="${c.id}" ${p.category === c.id ? 'selected' : ''}>${c.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label for="price">Цена (₽)</label>
          <input id="price" name="price" type="number" min="0" required value="${p.price ?? ''}">
        </div>
        <div class="form-field">
          <label for="oldPrice">Старая цена (₽)</label>
          <input id="oldPrice" name="oldPrice" type="number" min="0" value="${p.oldPrice ?? ''}">
        </div>
        <div class="form-field form-grid__full">
          <label for="tagline">Короткое описание</label>
          <input id="tagline" name="tagline" value="${p.tagline || ''}">
        </div>
        <div class="form-field form-grid__full">
          <label for="description">Полное описание</label>
          <textarea id="description" name="description">${p.description || ''}</textarea>
        </div>
        <div class="form-field form-grid__full">
          <label for="emotional">Эмоциональный текст</label>
          <textarea id="emotional" name="emotional">${p.emotional || ''}</textarea>
        </div>
        <div class="form-field">
          <label for="size">Размер</label>
          <input id="size" name="size" value="${p.size || ''}" placeholder="Средний · ~45 см">
        </div>
        <div class="form-field">
          <label for="composition">Состав</label>
          <input id="composition" name="composition" value="${p.composition || ''}" placeholder="Розы, эвкалипт, зелень">
        </div>
        <div class="form-field">
          <label for="image">Фотография</label>
          <select id="image" name="image">
            ${imageOptions.map((img) => `<option value="${img}" ${imageFile === img ? 'selected' : ''}>${img}</option>`).join('')}
          </select>
        </div>
        <div class="form-field">
          <label for="badge">Метка</label>
          <select id="badge" name="badge">
            ${badgeOptions.map((b) => `<option value="${b.id}" ${(p.badge || '') === b.id ? 'selected' : ''}>${b.label}</option>`).join('')}
          </select>
        </div>
        <div class="form-field form-grid__full form-checks">
          <label><input type="checkbox" name="seasonal" ${p.seasonal ? 'checked' : ''}> Сезонный</label>
          <label><input type="checkbox" name="available" ${p.available !== false ? 'checked' : ''}> Показывать на сайте</label>
          <label><input type="checkbox" name="addOns" ${p.addOns ? 'checked' : ''}> Доп. товары</label>
        </div>
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn--primary">${editingId ? 'Сохранить' : 'Добавить'}</button>
        ${editingId ? '<button type="button" class="btn btn--secondary" id="cancel-edit">Отмена</button>' : ''}
      </div>
    </form>
  `;
}

function render() {
  const app = document.getElementById('admin-app');
  app.innerHTML = `
    <div class="admin">
      <header class="admin__header">
        <h1 class="admin__title">Flora Atelier — админ</h1>
        <div class="admin__actions">
          <a href="${base}" class="btn btn--secondary">← На сайт</a>
          <button class="btn btn--secondary" id="reset-data">Сбросить данные</button>
          <button class="btn btn--primary" id="add-new">+ Товар</button>
        </div>
      </header>
      <main class="admin__main">
        ${renderStats()}
        ${renderTable()}
        ${renderForm(editingId ? products.find((p) => p.id === editingId) : null)}
      </main>
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  document.getElementById('add-new')?.addEventListener('click', () => {
    editingId = null;
    render();
    document.getElementById('product-form')?.scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('cancel-edit')?.addEventListener('click', () => {
    editingId = null;
    render();
  });

  document.getElementById('reset-data')?.addEventListener('click', () => {
    if (confirm('Вернуть каталог к исходным данным?')) {
      resetProducts();
      products = reloadProducts();
      editingId = null;
      render();
      showToast('Данные сброшены');
    }
  });

  document.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.addEventListener('click', () => {
      editingId = btn.dataset.edit;
      render();
      document.getElementById('product-form')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!confirm('Удалить этот товар?')) return;
      products = products.filter((p) => p.id !== btn.dataset.delete);
      saveAllProducts(products);
      if (editingId === btn.dataset.delete) editingId = null;
      render();
      showToast('Товар удалён');
    });
  });

  document.getElementById('product-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const imageName = fd.get('image');
    const payload = {
      name: fd.get('name').trim(),
      price: Number(fd.get('price')),
      oldPrice: fd.get('oldPrice') ? Number(fd.get('oldPrice')) : null,
      tagline: fd.get('tagline').trim(),
      description: fd.get('description').trim(),
      emotional: fd.get('emotional').trim(),
      size: fd.get('size').trim(),
      composition: fd.get('composition').trim(),
      category: fd.get('category'),
      badge: fd.get('badge') || null,
      image: imageUrl(imageName),
      alt: `${fd.get('name')} — Flora Atelier`,
      bestseller: fd.get('badge') === 'hit',
      seasonal: fd.get('seasonal') === 'on',
      available: fd.get('available') === 'on',
      addOns: fd.get('addOns') === 'on',
      tags: [],
      recipient: [],
      occasion: [],
      budget: Number(fd.get('price')),
    };

    if (editingId) {
      products = products.map((p) => (p.id === editingId ? { ...p, ...payload } : p));
      showToast('Товар обновлён');
    } else {
      products = [
        ...products,
        {
          id: generateProductId(products),
          ...payload,
        },
      ];
      showToast('Товар добавлен');
    }

    saveAllProducts(products);
    editingId = null;
    render();
  });
}

render();
