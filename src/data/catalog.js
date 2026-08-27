import { images } from './images.js';

export const categories = [
  {
    id: 'bouquets',
    name: 'Букеты',
    slug: 'bukety',
    image: images.categories.bouquets,
    alt: 'Авторские букеты с доставкой в Саратове',
  },
  {
    id: 'compositions',
    name: 'Цветочные композиции',
    slug: 'kompozitsii',
    image: images.categories.compositions,
    alt: 'Цветочные композиции в коробках и корзинах',
  },
  {
    id: 'single',
    name: 'Цветы поштучно',
    slug: 'po-shtuchno',
    image: images.categories.single,
    alt: 'Свежие цветы поштучно',
  },
  {
    id: 'balloons',
    name: 'Шары',
    slug: 'shary',
    image: images.categories.balloons,
    alt: 'Воздушные шары для подарка',
  },
  {
    id: 'potted',
    name: 'Цветы в горшках',
    slug: 'v-gorshkah',
    image: images.categories.potted,
    alt: 'Комнатные растения и цветы в горшках',
  },
  {
    id: 'toys',
    name: 'Игрушки',
    slug: 'igrushki',
    image: images.categories.toys,
    alt: 'Мягкие игрушки к букету',
  },
  {
    id: 'souvenirs',
    name: 'Сувениры',
    slug: 'suveniry',
    image: images.categories.souvenirs,
    alt: 'Сувениры и открытки к цветам',
  },
  {
    id: 'paintings',
    name: 'Картины',
    slug: 'kartiny',
    image: images.categories.paintings,
    alt: 'Декоративные картины в подарок',
  },
];

export const giftFinderOptions = {
  recipient: [
    { id: 'loved', label: 'Любимой' },
    { id: 'mom', label: 'Маме' },
    { id: 'friend', label: 'Подруге' },
    { id: 'colleague', label: 'Коллеге' },
    { id: 'man', label: 'Мужчине' },
    { id: 'self', label: 'Себе' },
  ],
  occasion: [
    { id: 'birthday', label: 'День рождения' },
    { id: 'date', label: 'Свидание' },
    { id: 'holiday', label: 'Праздник' },
    { id: 'thanks', label: 'Благодарность' },
    { id: 'anniversary', label: 'Годовщина' },
    { id: 'no-reason', label: 'Без повода' },
  ],
  budget: [
    { id: '2000', label: 'до 2 000 ₽', max: 2000 },
    { id: '3000', label: 'до 3 000 ₽', max: 3000 },
    { id: '5000', label: 'до 5 000 ₽', max: 5000 },
    { id: '10000', label: 'до 10 000 ₽', max: 10000 },
    { id: 'custom', label: 'Индивидуальный', max: Infinity },
  ],
};

export const scenarios = [
  {
    id: 'loved',
    title: 'Для любимой',
    image: images.scenarios.loved,
    alt: 'Романтический букет для любимой',
    tags: ['loved', 'date', 'no-reason'],
  },
  {
    id: 'mom',
    title: 'Для мамы',
    image: images.scenarios.mom,
    alt: 'Нежный букет для мамы',
    tags: ['mom', 'holiday', 'thanks'],
  },
  {
    id: 'birthday',
    title: 'На день рождения',
    image: images.scenarios.birthday,
    alt: 'Яркий букет на день рождения',
    tags: ['birthday', 'holiday'],
  },
  {
    id: 'date',
    title: 'На свидание',
    image: images.scenarios.date,
    alt: 'Букет для романтического свидания',
    tags: ['date', 'loved'],
  },
  {
    id: 'colleague',
    title: 'Коллеге',
    image: images.scenarios.colleague,
    alt: 'Стильная композиция для коллеги',
    tags: ['colleague', 'thanks'],
  },
  {
    id: 'surprise',
    title: 'Просто порадовать',
    image: images.scenarios.surprise,
    alt: 'Букет без повода — просто порадовать',
    tags: ['no-reason', 'self', 'friend'],
  },
  {
    id: 'thanks-scenario',
    title: 'Сказать «спасибо»',
    image: images.scenarios.thanks,
    alt: 'Букет благодарности',
    tags: ['thanks', 'colleague', 'friend'],
  },
  {
    id: 'amaze',
    title: 'Удивить',
    image: images.scenarios.amaze,
    alt: 'Яркий сюрприз-букет',
    tags: ['holiday', 'birthday', 'loved', 'no-reason'],
  },
];

export const budgetTiers = [
  { id: '2000', label: 'до 2 000 ₽', max: 2000 },
  { id: '3000', label: 'до 3 000 ₽', max: 3000 },
  { id: '5000', label: 'до 5 000 ₽', max: 5000 },
  { id: '10000', label: 'до 10 000 ₽', max: 10000 },
];

export const addOnOptions = [
  { id: 'balloon', name: 'Шар', price: 500, image: images.categories.balloons },
  { id: 'toy', name: 'Игрушка', price: 890, image: images.categories.toys },
  { id: 'card', name: 'Открытка', price: 350, image: images.categories.souvenirs },
  { id: 'souvenir', name: 'Сувенир', price: 650, image: images.categories.souvenirs },
];

export const seasonalCollection = {
  id: 'late-summer',
  title: 'Сейчас в цвету',
  subtitle: 'Подсолнухи, ромашки и яркая зелень — коллекция позднего лета уже в ателье',
  image: images.bouquets.spring,
  alt: 'Сезонная коллекция позднего лета — Flora Atelier',
  cta: 'Смотреть коллекцию',
  tags: ['seasonal', 'holiday', 'birthday', 'no-reason'],
};

export const whyUsItems = [
  {
    title: 'Свежие цветы',
    description: 'Работаем с проверенными поставщиками. Каждый цветок проходит отбор.',
  },
  {
    title: 'Сборка перед заказом',
    description: 'Букеты собираются непосредственно перед отправкой, а не заранее.',
  },
  {
    title: 'Доставка по Саратову',
    description: 'Привезём в удобное время — домой, в офис или ресторан.',
  },
  {
    title: 'Помощь флориста',
    description: 'Подскажем, что выбрать, и соберём композицию под ваш запрос.',
  },
  {
    title: 'Индивидуальные композиции',
    description: 'Создаём уникальные букеты и подарочные наборы под любой повод.',
  },
  {
    title: 'Подарочная упаковка',
    description: 'Крафт, матовая бумага и ленты — каждый букет упакован как подарок.',
  },
];

export const reviewAggregate = {
  rating: 4.9,
  count: 186,
};

export const reviews = [
  {
    id: 1,
    name: 'Анна К.',
    text: 'Заказывала букет маме на юбилей — собрали именно то, что я описала по телефону. Доставили аккуратно, мама была в восторге.',
    date: 'Март 2026',
    rating: 5,
  },
  {
    id: 2,
    name: 'Дмитрий В.',
    text: 'Первый раз заказывал цветы онлайн — переживал, что не попаду. Флорист помог подобрать, всё приехало свежее и красиво упаковано.',
    date: 'Февраль 2026',
    rating: 5,
  },
  {
    id: 3,
    name: 'Елена М.',
    text: 'Беру здесь букеты регулярно. Нравится, что каждый раз композиция выглядит по-новому — не шаблон, а настоящая работа.',
    date: 'Январь 2026',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ольга С.',
    text: 'Срочно нужны были цветы к вечеру — успели за два часа. Качество на высоте, цена адекватная. Рекомендую.',
    date: 'Декабрь 2025',
    rating: 5,
  },
];

export const galleryWorks = images.gallery.map((src, i) => ({
  id: i + 1,
  image: src,
  alt: [
    'Авторский букет с розами и эвкалиптом',
    'Цветочная композиция в шляпной коробке',
    'Нежный букет пастельных оттенков',
    'Красные розы в матовой упаковке',
    'Праздничная композиция с сезонными цветами',
    'Минималистичный букет для дома',
    'Весенний букет с полевыми цветами',
    'Букет с подарочным набором',
  ][i],
  size: i % 3 === 0 ? 'large' : i % 3 === 1 ? 'medium' : 'small',
}));

export const deliveryInfo = {
  areas: 'Доставляем по всему Саратову: Центральный, Заводской, Кировский, Октябрьский, Ленинский, Фрунзенский и пригород в радиусе 15 км.',
  timing: 'Стандартная доставка — в течение 2–4 часов. Точное время согласуем при оформлении.',
  cost: 'Бесплатно при заказе от 3 000 ₽. При меньшей сумме — 300 ₽ по городу.',
  express: 'Срочная доставка за 60–90 минут — от 500 ₽, при наличии свободного курьера.',
  howTo: 'Выберите букет на сайте, нажмите «Заказать» или позвоните нам. Уточним адрес, время и пожелания к открытке.',
};

export const siteConfig = {
  name: 'Flora Atelier',
  phone: '+7 (8452) 555-012',
  phoneLink: 'tel:+78452555012',
  whatsapp: 'https://wa.me/78452555012',
  telegram: 'https://t.me/flora_atelier',
  vk: 'https://vk.com/flora_atelier',
  address: 'г. Саратов, ул. Московская, 42',
  hours: 'Ежедневно с 9:00 до 21:00',
  deliveryNote: 'Доставка по Саратову за 2–4 часа · Срочно — от 60 мин',
};
