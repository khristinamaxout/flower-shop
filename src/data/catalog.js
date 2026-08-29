import { images } from './images.js';

export const categories = [
  { id: 'bouquets', name: 'Букеты', image: images.categories.bouquets, alt: 'Авторские букеты с доставкой по Саратову', size: 'featured' },
  { id: 'compositions', name: 'Композиции', image: images.categories.compositions, alt: 'Цветочные композиции в коробках и корзинах', size: 'wide' },
  { id: 'single', name: 'Цветы поштучно', image: images.categories.single, alt: 'Свежие цветы поштучно', size: '' },
  { id: 'balloons', name: 'Шары', image: images.categories.balloons, alt: 'Воздушные шары к букету', size: 'tall' },
  { id: 'potted', name: 'Комнатные растения', image: images.categories.potted, alt: 'Комнатные растения в горшках', size: 'wide' },
  { id: 'toys', name: 'Игрушки', image: images.categories.toys, alt: 'Мягкие игрушки к букету', size: '' },
  { id: 'souvenirs', name: 'Сувениры', image: images.categories.souvenirs, alt: 'Сувениры и открытки', size: '' },
  { id: 'paintings', name: 'Картины', image: images.categories.paintings, alt: 'Декоративные картины в подарок', size: 'tall' },
];

export const collections = [
  {
    id: 'bestsellers',
    title: 'Выбирают чаще всего',
    subtitle: 'Проверенные букеты, которые заказывают снова и снова',
    image: images.collections.bestsellers,
    alt: 'Популярные букеты Flora Atelier',
    filter: 'bestseller',
  },
  {
    id: 'new',
    title: 'Новая коллекция',
    subtitle: 'Свежие композиции этого сезона',
    image: images.collections.new,
    alt: 'Новая коллекция букетов',
    filter: 'new',
  },
  {
    id: 'no-reason',
    title: 'Цветы просто так',
    subtitle: 'Когда хочется порадовать без повода',
    image: images.collections.noReason,
    alt: 'Букеты без повода',
    filter: 'no-reason',
  },
  {
    id: 'special',
    title: 'Для особенного случая',
    subtitle: 'Когда момент должен запомниться',
    image: images.collections.special,
    alt: 'Букеты для особенного случая',
    filter: 'special',
  },
  {
    id: 'gifts',
    title: 'Подарки',
    subtitle: 'Букет и всё, что делает подарок целым',
    image: images.collections.gifts,
    alt: 'Подарочные наборы с цветами',
    filter: 'gift',
  },
  {
    id: 'home',
    title: 'Для дома',
    subtitle: 'Растения и композиции, которые остаются с вами',
    image: images.collections.home,
    alt: 'Комнатные растения и композиции',
    filter: 'home',
  },
];

export const giftFinderOptions = {
  recipient: [
    { id: 'loved', label: 'Для любимой' },
    { id: 'mom', label: 'Для мамы' },
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
    { id: '3000', label: 'до 3 000 ₽', max: 3000 },
    { id: '5000', label: 'до 5 000 ₽', max: 5000 },
    { id: '8000', label: 'до 8 000 ₽', max: 8000 },
    { id: '12000', label: 'до 12 000 ₽', max: 12000 },
  ],
};

export const scenarios = [
  { id: 'love', title: 'Сказать люблю', phrase: 'Когда слов мало, а чувств — много', image: images.scenarios.love, alt: 'Романтический букет', tags: ['loved', 'date', 'anniversary'] },
  { id: 'celebrate', title: 'Поздравить', phrase: 'Пусть этот день станет особенным', image: images.scenarios.celebrate, alt: 'Букет на праздник', tags: ['birthday', 'holiday'] },
  { id: 'thanks', title: 'Поблагодарить', phrase: 'Тихое «спасибо», которое запомнят', image: images.scenarios.thanks, alt: 'Букет благодарности', tags: ['thanks', 'colleague', 'friend'] },
  { id: 'support', title: 'Поддержать', phrase: 'Рядом, даже когда вы далеко', image: images.scenarios.support, alt: 'Нежный букет поддержки', tags: ['mom', 'friend', 'thanks'] },
  { id: 'surprise', title: 'Удивить', phrase: 'Для человека, которого хочется поразить', image: images.scenarios.surprise, alt: 'Яркий сюрприз-букет', tags: ['loved', 'holiday', 'birthday'] },
  { id: 'joy', title: 'Просто порадовать', phrase: 'Иногда лучший повод — просто так', image: images.scenarios.joy, alt: 'Букет без повода', tags: ['no-reason', 'self', 'friend'] },
];

export const addOnOptions = [
  { id: 'card', name: 'Открытка', price: 350, image: images.extras.postcard },
  { id: 'balloon', name: 'Шар', price: 500, image: images.categories.balloons },
  { id: 'toy', name: 'Игрушка', price: 890, image: images.categories.toys },
  { id: 'candle', name: 'Свеча', price: 650, image: images.extras.candle },
  { id: 'sweets', name: 'Сладкий подарок', price: 750, image: images.extras.sweets },
  { id: 'souvenir', name: 'Сувенир', price: 550, image: images.categories.souvenirs },
];

export const giftCategories = [
  { id: 'toys', name: 'Игрушки', image: images.categories.toys, alt: 'Мягкая игрушка к букету' },
  { id: 'balloons', name: 'Шары', image: images.categories.balloons, alt: 'Воздушные шары к букету' },
  { id: 'cards', name: 'Открытки', image: images.extras.postcard, alt: 'Открытка с каллиграфическим текстом' },
  { id: 'souvenirs', name: 'Сувениры', image: images.categories.souvenirs, alt: 'Вино, сладости и свечи' },
  { id: 'paintings', name: 'Картины', image: images.categories.paintings, alt: 'Декоративные картины' },
  { id: 'sweets', name: 'Сладости', image: images.extras.sweets, alt: 'Сладкие подарки' },
];

export const reviewAggregate = { rating: 4.9, count: 214 };

export const reviews = [
  { id: 1, name: 'Марина К.', text: 'Букет оказался ещё красивее, чем на фотографии.', date: 'Август 2026', rating: 5 },
  { id: 2, name: 'Алексей П.', text: 'Заказывал маме — она была в восторге. Доставили аккуратно и вовремя.', date: 'Июль 2026', rating: 5 },
  { id: 3, name: 'Елена В.', text: 'Очень красивый магазин. Теперь знаю, где покупать цветы в Саратове.', date: 'Июнь 2026', rating: 5 },
  { id: 4, name: 'Ольга С.', text: 'Помогли подобрать букет по телефону — попали в самое сердце.', date: 'Май 2026', rating: 5 },
];

export const galleryWorks = images.gallery.map((src, i) => ({
  id: i + 1,
  image: src,
  alt: `Работа флористов Flora Atelier — композиция ${i + 1}`,
}));

export const deliveryInfo = {
  headline: 'Доставим сегодня.',
  subline: 'Доставка по Саратову',
  items: [
    { label: 'Сегодня', text: 'Принимаем заказы ежедневно с 9:00 до 21:00' },
    { label: 'От 2 часов', text: 'Стандартная доставка по городу — 2–4 часа' },
    { label: 'Бережная доставка', text: 'Курьер бережно доставит букет по адресу' },
    { label: 'Открытка', text: 'Можно добавить открытку с вашим текстом' },
  ],
};

export const siteConfig = {
  name: 'Flora Atelier',
  logoLine: 'Букет',
  tagline: 'Цветы, которые говорят за вас',
  phone: '+7 (8452) 00-00-00',
  phoneLink: 'tel:+78452000000',
  whatsapp: 'https://wa.me/78452000000',
  telegram: 'https://t.me/flora_atelier',
  vk: 'https://vk.com/flora_atelier',
  instagram: 'https://instagram.com/flora_atelier',
  address: 'г. Саратов',
  hours: 'Ежедневно с 9:00 до 21:00',
  deliveryNote: 'Доставка по Саратову · от 2 часов',
};
