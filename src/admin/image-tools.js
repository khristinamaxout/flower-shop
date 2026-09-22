/**
 * Подготовка фотографий перед загрузкой.
 *
 * Снимок с телефона весит 4–8 МБ, а карточке товара хватает стороны в 1600 px.
 * Ужимаем в браузере: и хранилище не забивается, и сайт грузится быстрее.
 */
const MAX_SIDE = 1600;
const QUALITY = 0.85;

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
const MAX_SOURCE_BYTES = 25 * 1024 * 1024;

export function validatePhoto(file) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Нужен файл JPG, PNG или WebP.';
  }
  if (file.size > MAX_SOURCE_BYTES) {
    return 'Файл больше 25 МБ — выберите фото поменьше.';
  }
  return null;
}

/** Формат, в котором браузер умеет кодировать: WebP компактнее, JPEG — запасной. */
function outputFormat() {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const supportsWebp = canvas.toDataURL('image/webp').startsWith('data:image/webp');
  return supportsWebp
    ? { type: 'image/webp', extension: 'webp' }
    : { type: 'image/jpeg', extension: 'jpg' };
}

export async function compressPhoto(file) {
  const bitmap = await loadBitmap(file);

  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const { type, extension } = outputFormat();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, QUALITY));
  if (!blob) throw new Error('Не удалось обработать изображение.');

  // Если сжатие не дало выигрыша, отправляем оригинал.
  if (blob.size >= file.size && scale === 1) return file;

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'photo';
  return new File([blob], `${baseName}.${extension}`, { type });
}

async function loadBitmap(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file);
    } catch {
      /* Старый Safari — падаем на <img> ниже. */
    }
  }

  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Файл повреждён или это не изображение.'));
      img.src = url;
    });
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}
