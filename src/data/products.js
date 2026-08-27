import { images } from './images.js';

/**
 * Product catalog — mock data with filter tags for gift finder & scenarios.
 * Replace with API calls when backend is connected.
 */

export const products = [
  {
    id: 'p1',
    name: 'Ателье №7',
    price: 4200,
    description: 'Розы, эвкалипт, матовая упаковка',
    image: images.bouquets.atelier,
    alt: 'Букет Ателье №7 — розы с эвкалиптом',
    category: 'bouquets',
    tags: ['loved', 'date', 'birthday', 'no-reason'],
    bestseller: true,
  },
  {
    id: 'p2',
    name: 'Утро в саду',
    price: 2800,
    description: 'Пионовидные розы, зелень, лён',
    image: images.bouquets.morning,
    alt: 'Букет Утро в саду — нежные пастельные тона',
    category: 'bouquets',
    tags: ['mom', 'friend', 'thanks', 'no-reason'],
    bestseller: true,
  },
  {
    id: 'p3',
    name: 'Графит',
    price: 5500,
    description: 'Антуриумы, монстера, минимализм',
    image: images.categories.compositions,
    alt: 'Композиция Графит — современный стиль',
    category: 'compositions',
    tags: ['colleague', 'man', 'thanks'],
    bestseller: true,
  },
  {
    id: 'p4',
    name: 'Саратовский вечер',
    price: 3600,
    description: 'Хризантемы, лаванда, крафт',
    image: images.bouquets.evening,
    alt: 'Букет Саратовский вечер',
    category: 'bouquets',
    tags: ['mom', 'friend', 'holiday'],
    bestseller: true,
  },
  {
    id: 'p5',
    name: 'Красная линия',
    price: 4800,
    description: '51 красная роза, лента, коробка',
    image: images.bouquets.redLine,
    alt: 'Букет Красная линия — 51 красная роза',
    category: 'bouquets',
    tags: ['loved', 'date', 'birthday', 'holiday'],
    bestseller: true,
  },
  {
    id: 'p6',
    name: 'Поляна',
    price: 1900,
    description: 'Полевые цветы, сезонная зелень',
    image: images.bouquets.meadow,
    alt: 'Букет Поляна — полевые цветы',
    category: 'bouquets',
    tags: ['friend', 'self', 'no-reason', 'thanks'],
    bestseller: true,
  },
  {
    id: 'p7',
    name: 'Monochrome',
    price: 6200,
    description: 'Белые орхидеи в керамике',
    image: images.categories.potted,
    alt: 'Композиция Monochrome — белые орхидеи',
    category: 'potted',
    tags: ['colleague', 'man', 'holiday', 'thanks'],
    bestseller: true,
  },
  {
    id: 'p8',
    name: 'Celebration',
    price: 8500,
    description: 'Букет + шары + открытка',
    image: images.bouquets.celebration,
    alt: 'Подарочный набор Celebration',
    category: 'compositions',
    tags: ['birthday', 'holiday', 'loved'],
    bestseller: true,
  },
  {
    id: 'p9',
    name: 'Одна роза Premium',
    price: 890,
    description: 'Эквадорская роза 70 см',
    image: images.categories.single,
    alt: 'Эквадорская роза Premium поштучно',
    category: 'single',
    tags: ['date', 'loved', 'no-reason'],
    bestseller: false,
  },
  {
    id: 'p10',
    name: 'Набор «Нежность»',
    price: 3200,
    description: 'Букет + мягкая игрушка + открытка',
    image: images.categories.toys,
    alt: 'Подарочный набор Нежность',
    category: 'compositions',
    tags: ['mom', 'friend', 'birthday'],
    bestseller: false,
  },
  {
    id: 'p11',
    name: 'Шары «Золотой час»',
    price: 1500,
    description: '3 фольгированных шара, лента',
    image: images.categories.balloons,
    alt: 'Набор шаров Золотой час',
    category: 'balloons',
    tags: ['birthday', 'holiday'],
    bestseller: false,
  },
  {
    id: 'p12',
    name: 'Открытка авторская',
    price: 350,
    description: 'Ручная каллиграфия, конверт',
    image: images.categories.souvenirs,
    alt: 'Авторская открытка ручной работы',
    category: 'souvenirs',
    tags: ['thanks', 'birthday', 'holiday'],
    bestseller: false,
  },
];

export function filterByGiftFinder({ recipient, occasion, budget }) {
  return products.filter((product) => {
    const matchesRecipient = !recipient || product.tags.includes(recipient);
    const matchesOccasion = !occasion || product.tags.includes(occasion);
    const matchesBudget = !budget || product.price <= budget;
    return matchesRecipient && matchesOccasion && matchesBudget;
  });
}

export function filterByScenario(scenarioTags) {
  return products.filter((product) =>
    product.tags.some((tag) => scenarioTags.includes(tag))
  );
}

export function getBestsellers(limit = 8) {
  return products.filter((p) => p.bestseller).slice(0, limit);
}

export function getByCategory(categoryId) {
  return products.filter((p) => p.category === categoryId);
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}
