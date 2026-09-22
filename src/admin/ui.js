/** Экранирование значений, попадающих в разметку админки. */
export function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let toastTimer = null;

export function toast(message, kind = 'ok') {
  let el = document.querySelector('.admin-toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'admin-toast';
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.remove('admin-toast--error');
  if (kind === 'error') el.classList.add('admin-toast--error');
  el.classList.add('is-visible');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3200);
}

/** Блокирует кнопку на время запроса, чтобы не отправить форму дважды. */
export async function withBusy(button, label, task) {
  if (!button) return task();
  const original = button.textContent;
  button.disabled = true;
  button.textContent = label;
  try {
    return await task();
  } finally {
    button.disabled = false;
    button.textContent = original;
  }
}

export function confirmAction(message) {
  return window.confirm(message);
}
