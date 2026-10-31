export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const company = {
  name: "СК «Терек»",
  legal: "ООО СК «Терек»",
  project: "ЖК «Новый Терек»",
  city: "г. Шелковская",
  phone: "+7 968 888-89-82",
  phoneHref: "tel:+79688888982",
  whatsapp: "79688888982",
  instagram: "new.terek",
  instagramUrl: "https://instagram.com/new.terek",
  objectAddress: "366100, Чеченская Республика, г. Шелковская, ул. Шаповалова, д. 15 Б",
  officeAddress:
    "366108, Чеченская Республика, Шелковской район, г. Шелковская, ул. Грейдерная, д. 20, корп. 2, пом. 1",
  hours: "Пн–Пт, 9:00–18:00",
  daysOff: "Сб и Вс — выходные",
  fullLegal: "Общество с ограниченной ответственностью СК «Терек»",
  inn: "2011005780",
  ogrn: "1242000009129",
  legalAddress:
    "366108, Чеченская Республика, Шелковской р-н, г. Шелковская, ул. Грейдерная, д. 20, корп. 2, помещ. 1",
  email: "ck.terek@yandex.ru",
};

export const permit = {
  number: "20-RU20515318-08-2025",
  date: "23.04.2025",
  issuer: "Администрация Шелковского муниципального района Чеченской Республики",
};

export const legalUpdated = "31.10.2026";

export const prices = {
  cash: 50000,
  installment: 53000,
  growth: 5000,
  months: 72,
  minDownPerM2: 3000,
};

export function waLink(text: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function rub(n: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " ₽";
}

export type Plan = {
  id: string;
  rooms: 1 | 2 | 3;
  title: string;
  area: number;
  image: string;
  parts: { name: string; area?: number }[];
};

export const plans: Plan[] = [
  {
    id: "1k-44",
    rooms: 1,
    title: "1-комнатная",
    area: 44.1,
    image: `${BASE}/images/plan-1k-44.webp`,
    parts: [
      { name: "Гостиная", area: 18.1 },
      { name: "Кухня", area: 12.8 },
      { name: "Коридор", area: 4.8 },
      { name: "Ванная", area: 4.6 },
      { name: "Балкон", area: 3.4 },
    ],
  },
  {
    id: "2k-49",
    rooms: 2,
    title: "2-комнатная",
    area: 49.2,
    image: `${BASE}/images/plan-2k-49.webp`,
    parts: [
      { name: "Гостиная", area: 14.4 },
      { name: "Спальня", area: 12.7 },
      { name: "Кухня", area: 9.9 },
      { name: "Коридор", area: 6.1 },
      { name: "Ванная", area: 3.4 },
      { name: "Балкон", area: 2.5 },
    ],
  },
  {
    id: "2k-60",
    rooms: 2,
    title: "2-комнатная",
    area: 59.8,
    image: `${BASE}/images/plan-2k-60.webp`,
    parts: [
      { name: "Гостиная", area: 17.5 },
      { name: "Спальня", area: 13.8 },
      { name: "Кухня", area: 12.7 },
      { name: "Коридор", area: 5.0 },
      { name: "Ванная", area: 3.8 },
      { name: "Балкон", area: 4.0 },
      { name: "Второй балкон" },
    ],
  },
  {
    id: "3k-72",
    rooms: 3,
    title: "3-комнатная",
    area: 72.1,
    image: `${BASE}/images/plan-3k-72.webp`,
    parts: [
      { name: "Гостиная", area: 14.9 },
      { name: "Спальня", area: 13.6 },
      { name: "Спальня", area: 12.1 },
      { name: "Кухня", area: 11.5 },
      { name: "Коридор", area: 9.9 },
      { name: "Ванная", area: 3.8 },
      { name: "Балкон", area: 3.2 },
      { name: "Балкон", area: 3.0 },
    ],
  },
];

export const gallery = [
  { src: `${BASE}/images/aerial-top.webp`, alt: "Генплан ЖК «Новый Терек» с высоты: дома, дворы, спортплощадки" },
  { src: `${BASE}/images/facade-2.webp`, alt: "Фасад дома: светлый кирпич с тёмными вставками" },
  { src: `${BASE}/images/aerial-angle.webp`, alt: "Вид на квартал и внутренние дворы" },
  { src: `${BASE}/images/facade-5.webp`, alt: "Фасад девятиэтажного блока" },
  { src: `${BASE}/images/aerial-side.webp`, alt: "Квартал вдоль улицы с парковкой и аллеей" },
  { src: `${BASE}/images/facade-3.webp`, alt: "Фасад с балконами" },
  { src: `${BASE}/images/facade-6.webp`, alt: "Протяжённый фасад с балконами" },
  { src: `${BASE}/images/facade-1.webp`, alt: "Фасад семиэтажного блока" },
  { src: `${BASE}/images/facade-4.webp`, alt: "Фасад: ритм окон и балконов" },
];

export const faq = [
  {
    q: "Когда сдача дома?",
    a: "Дом на этапе завершения строительства. Сдача — IV квартал 2026 года.",
  },
  {
    q: "В каком состоянии передаются квартиры?",
    a: "В черновой отделке с перегородками. Окна — ПВХ, входные двери — железные. Можно сразу делать ремонт под себя.",
  },
  {
    q: "Как работает исламская рассрочка?",
    a: "Стоимость в рассрочку — 53 000 ₽ за м², срок до 72 месяцев. Первоначальный взнос от 3 000 ₽ за м², есть вариант без взноса. Условия зависят от дома — точные варианты подскажет отдел продаж.",
  },
  {
    q: "Можно ли использовать материнский капитал?",
    a: "Да, материнский капитал можно направить на покупку квартиры.",
  },
  {
    q: "Почему цена отличается на разных этажах?",
    a: "Стоимость квадратного метра зависит от этажа. Стартовая цена при оплате наличными — 50 000 ₽ за м². Точную цену конкретной квартиры уточняйте у менеджера.",
  },
  {
    q: "Есть ли квартиры в рассрочку в доме, который сдаётся в этом году?",
    a: "В доме со сдачей в конце года остались квартиры только за наличный расчёт. Про варианты в рассрочку спросите в отделе продаж.",
  },
];
