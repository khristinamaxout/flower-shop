import { images } from './images.js';
import { loadProducts, saveProducts as persistProducts } from './store.js';

const b = images.bouquets;

export const defaultProducts = [
  {
    id: 'p1', name: 'Тихое утро', price: 3200, oldPrice: null,
    tagline: 'Мягкий свет и нежные оттенки',
    description: 'Пионовидные розы, эвкалипт, матовая упаковка',
    emotional: 'Когда хочется сказать «я рядом» без лишних слов.',
    size: 'Средний · ~45 см', composition: 'Розы, эвкалипт, зелень',
    image: b.b01, alt: 'Букет «Тихое утро» — Flora Atelier, Саратов',
    category: 'bouquets', tags: ['loved', 'mom', 'no-reason'], recipient: ['loved', 'mom'], occasion: ['no-reason', 'thanks'],
    budget: 3500, badge: 'hit', bestseller: true, seasonal: false, available: true, addOns: true,
    collections: ['bestseller', 'no-reason'],
  },
  {
    id: 'p2', name: 'Сад после дождя', price: 4500, oldPrice: null,
    tagline: 'Свежесть и глубина зелени',
    description: 'Полевые цветы, сезонная зелень, крафт',
    emotional: 'Как прогулка по саду — спокойно и красиво.',
    size: 'Большой · ~55 см', composition: 'Хризантемы, зелень, полевые цветы',
    image: b.b02, alt: 'Букет «Сад после дождя»',
    category: 'bouquets', tags: ['friend', 'mom', 'thanks'], recipient: ['friend', 'mom'], occasion: ['thanks', 'no-reason'],
    budget: 5000, badge: 'hit', bestseller: true, seasonal: false, available: true, addOns: true,
    collections: ['bestseller'],
  },
  {
    id: 'p3', name: 'Нежность', price: 2800, oldPrice: null,
    tagline: 'Пастель и тишина',
    description: 'Розы нежно-розового оттенка, лён, лента',
    emotional: 'Для тех, кому хочется подарить тепло.',
    size: 'Средний · ~40 см', composition: 'Розы, лён, декоративная зелень',
    image: b.b03, alt: 'Букет «Нежность»',
    category: 'bouquets', tags: ['loved', 'mom', 'date'], recipient: ['loved', 'mom'], occasion: ['date', 'no-reason'],
    budget: 3000, badge: 'favorite', bestseller: true, seasonal: false, available: true, addOns: true,
    collections: ['bestseller', 'no-reason'],
  },
  {
    id: 'p4', name: 'Летний вечер', price: 3600, oldPrice: 4200,
    tagline: 'Тёплый свет заката',
    description: 'Лаванда, хризантемы, крафт-упаковка',
    emotional: 'Когда хочется подарить атмосферу лета.',
    size: 'Средний · ~45 см', composition: 'Лаванда, хризантемы, зелень',
    image: b.b04, alt: 'Букет «Летний вечер»',
    category: 'bouquets', tags: ['friend', 'holiday', 'no-reason'], recipient: ['friend'], occasion: ['holiday', 'no-reason'],
    budget: 4000, badge: 'seasonal', bestseller: true, seasonal: true, available: true, addOns: true,
    collections: ['bestseller', 'special'],
  },
  {
    id: 'p5', name: 'Время признаний', price: 5200, oldPrice: null,
    tagline: 'Когда чувства не терпят полумер',
    description: '51 роза, лента, премиальная упаковка',
    emotional: 'Сказать главное — без слов.',
    size: 'Большой · ~60 см', composition: 'Розы, лента, декоративная зелень',
    image: b.b05, alt: 'Букет «Время признаний»',
    category: 'bouquets', tags: ['loved', 'anniversary', 'date'], recipient: ['loved'], occasion: ['anniversary', 'date'],
    budget: 5500, badge: 'hit', bestseller: true, seasonal: false, available: true, addOns: true,
    collections: ['bestseller', 'special'],
  },
  {
    id: 'p6', name: 'Просто так', price: 2500, oldPrice: null,
    tagline: 'Лучший повод — без повода',
    description: 'Сезонные цветы, полевые акценты',
    emotional: 'Иногда «просто так» — лучший повод.',
    size: 'Средний · ~40 см', composition: 'Сезонные цветы, зелень',
    image: b.b06, alt: 'Букет «Просто так»',
    category: 'bouquets', tags: ['friend', 'self', 'no-reason'], recipient: ['friend', 'self'], occasion: ['no-reason'],
    budget: 3000, badge: 'favorite', bestseller: true, seasonal: false, available: true, addOns: true,
    collections: ['bestseller', 'no-reason'],
  },
  {
    id: 'p7', name: 'Белый сад', price: 4800, oldPrice: null,
    tagline: 'Чистота и элегантность',
    description: 'Белые розы, эвкалипт, минимализм',
    emotional: 'Сдержанная красота для особенного момента.',
    size: 'Большой · ~50 см', composition: 'Белые розы, эвкалипт',
    image: b.b07, alt: 'Букет «Белый сад»',
    category: 'bouquets', tags: ['loved', 'anniversary', 'holiday'], recipient: ['loved'], occasion: ['anniversary', 'holiday'],
    budget: 5000, badge: 'new', bestseller: false, seasonal: false, available: true, addOns: true,
    collections: ['new', 'special'],
  },
  {
    id: 'p8', name: 'Тёплый свет', price: 3400, oldPrice: null,
    tagline: 'Уют и мягкие оттенки',
    description: 'Кремовые розы, пастельная зелень',
    emotional: 'Как тёплый свет в окне — уютно и красиво.',
    size: 'Средний · ~45 см', composition: 'Кремовые розы, зелень',
    image: b.b08, alt: 'Букет «Тёплый свет»',
    category: 'bouquets', tags: ['mom', 'friend', 'thanks'], recipient: ['mom', 'friend'], occasion: ['thanks', 'birthday'],
    budget: 3500, badge: null, bestseller: false, seasonal: false, available: true, addOns: true,
    collections: ['no-reason'],
  },
  {
    id: 'p9', name: 'Первое свидание', price: 3900, oldPrice: null,
    tagline: 'Нервничать можно, букет — нет',
    description: 'Нежные розы, зелень, лаконичная упаковка',
    emotional: 'Первый шаг — с правильным жестом.',
    size: 'Средний · ~42 см', composition: 'Розы, зелень, крафт',
    image: b.b09, alt: 'Букет «Первое свидание»',
    category: 'bouquets', tags: ['loved', 'date'], recipient: ['loved'], occasion: ['date'],
    budget: 4000, badge: 'new', bestseller: false, seasonal: false, available: true, addOns: true,
    collections: ['new', 'special'],
  },
  {
    id: 'p10', name: 'Для неё', price: 4200, oldPrice: null,
    tagline: 'Когда хочется удивить',
    description: 'Авторский микс, матовая бумага',
    emotional: 'Для человека, которого хочется поразить.',
    size: 'Средний · ~48 см', composition: 'Розы, сезонные цветы, зелень',
    image: b.b10, alt: 'Букет «Для неё»',
    category: 'bouquets', tags: ['loved', 'birthday', 'holiday'], recipient: ['loved'], occasion: ['birthday', 'holiday'],
    budget: 4500, badge: 'hit', bestseller: true, seasonal: false, available: true, addOns: true,
    collections: ['bestseller', 'special'],
  },
  {
    id: 'p11', name: 'Для мамы', price: 3100, oldPrice: null,
    tagline: 'Тепло, которое чувствуется',
    description: 'Нежные тона, зелень, лента',
    emotional: 'Сказать «люблю» — красиво и искренне.',
    size: 'Средний · ~42 см', composition: 'Хризантемы, розы, зелень',
    image: b.b11, alt: 'Букет «Для мамы»',
    category: 'bouquets', tags: ['mom', 'thanks', 'holiday'], recipient: ['mom'], occasion: ['thanks', 'holiday', 'birthday'],
    budget: 3500, badge: 'favorite', bestseller: true, seasonal: false, available: true, addOns: true,
    collections: ['bestseller'],
  },
  {
    id: 'p12', name: 'Большое счастье', price: 8500, oldPrice: null,
    tagline: 'Когда повод — по-настоящему большой',
    description: 'Премиальная композиция в шляпной коробке',
    emotional: 'Подарок, который запомнят.',
    size: 'XL · коробка 40 см', composition: 'Розы, эвкалипт, премиальная упаковка',
    image: b.b12, alt: 'Композиция «Большое счастье»',
    category: 'compositions', tags: ['loved', 'anniversary', 'birthday'], recipient: ['loved'], occasion: ['anniversary', 'birthday'],
    budget: 9000, badge: 'hit', bestseller: true, seasonal: false, available: true, addOns: false,
    collections: ['bestseller', 'special', 'gift'],
  },
  {
    id: 'p13', name: 'Утренний свет', price: 2900, oldPrice: null,
    tagline: 'Свежий старт дня',
    description: 'Светлые розы, зелень, крафт',
    emotional: 'Начать день с красоты.',
    size: 'Средний · ~40 см', composition: 'Розы, зелень',
    image: b.b01, alt: 'Букет «Утренний свет»',
    category: 'bouquets', tags: ['colleague', 'thanks'], recipient: ['colleague'], occasion: ['thanks'],
    budget: 3000, badge: 'new', bestseller: false, seasonal: true, available: true, addOns: true,
    collections: ['new'],
  },
  {
    id: 'p14', name: 'Пыльная роза', price: 4700, oldPrice: null,
    tagline: 'Приглушённая роскошь',
    description: 'Розы пыльно-розового оттенка, лента',
    emotional: 'Когда хочется сказать больше, чем в сообщении.',
    size: 'Большой · ~50 см', composition: 'Розы, декоративная зелень',
    image: b.b03, alt: 'Букет «Пыльная роза»',
    category: 'bouquets', tags: ['loved', 'date', 'anniversary'], recipient: ['loved'], occasion: ['date', 'anniversary'],
    budget: 5000, badge: 'seasonal', bestseller: false, seasonal: true, available: true, addOns: true,
    collections: ['special'],
  },
  {
    id: 'p15', name: 'Секрет сада', price: 5500, oldPrice: null,
    tagline: 'Авторская композиция',
    description: 'Композиция в коробке, сезонные цветы',
    emotional: 'Как секрет, который хочется открыть.',
    size: 'Большой · коробка 35 см', composition: 'Сезонные цветы, зелень, коробка',
    image: images.categories.compositions, alt: 'Композиция «Секрет сада»',
    category: 'compositions', tags: ['loved', 'holiday'], recipient: ['loved'], occasion: ['holiday', 'birthday'],
    budget: 6000, badge: 'new', bestseller: false, seasonal: false, available: true, addOns: true,
    collections: ['new', 'gift'],
  },
  {
    id: 'p16', name: 'Монстера в кашпо', price: 3800, oldPrice: null,
    tagline: 'Зелень, которая остаётся',
    description: 'Монстера в керамическом кашпо',
    emotional: 'Подарок, который будет радовать месяцами.',
    size: 'Растение · кашпо 18 см', composition: 'Монстера, керамика, декоративный мох',
    image: images.plants, alt: 'Комнатное растение — монстера',
    category: 'potted', tags: ['colleague', 'mom', 'thanks'], recipient: ['colleague', 'mom'], occasion: ['thanks', 'no-reason'],
    budget: 4000, badge: null, bestseller: false, seasonal: false, available: true, addOns: false,
    collections: ['home'],
  },
];

export let products = loadProducts(defaultProducts);

export function reloadProducts() {
  products = loadProducts(defaultProducts);
  return products;
}

export function saveAllProducts(list) {
  products = list;
  persistProducts(list);
}

function active() {
  return products.filter((p) => p.available !== false);
}

export function filterByGiftFinder({ recipient, occasion, budget }) {
  return active().filter((p) => {
    const r = !recipient || p.tags.includes(recipient);
    const o = !occasion || p.tags.includes(occasion);
    const b = !budget || p.price <= budget;
    return r && o && b;
  });
}

export function filterByScenario(tags) {
  return active().filter((p) => p.tags.some((t) => tags.includes(t)));
}

export function filterByBudget(max) {
  return active().filter((p) => p.price <= max);
}

export function filterByCollection(collectionId) {
  return active().filter((p) => p.collections?.includes(collectionId));
}

export function getSeasonalProducts() {
  return active().filter((p) => p.seasonal);
}

export function getBestsellers(limit = 8) {
  return active().filter((p) => p.bestseller).slice(0, limit);
}

export function getByCategory(categoryId) {
  return active().filter((p) => p.category === categoryId);
}

export function getProductById(id) {
  return active().find((p) => p.id === id);
}

export const badgeLabels = {
  hit: 'Хит',
  new: 'Новинка',
  seasonal: 'Сезонное',
  favorite: 'Любимый',
};
