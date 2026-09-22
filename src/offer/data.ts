/**
 * Моковые данные оффера (по макету Figma «Цифровой оффер», узел 188-21317).
 * Все даты — относительно демо-«сегодня» 2 сентября 2026.
 */

export const DEMO = {
  today: new Date(2026, 8, 2),
  deadline: new Date(2026, 8, 5),
  acceptedOn: new Date(2026, 8, 3),
  /** Раньше этой даты выйти нельзя — столько нужно на оформление. */
  minStart: new Date(2026, 8, 15),
  wishFrom: new Date(2026, 9, 6),
  wishTo: new Date(2026, 9, 17),
  startDate: new Date(2026, 9, 12),
  parkingDue: new Date(2026, 9, 8),
};

export type OfferKind = "structured" | "pdf";

export const candidate = { firstName: "Елена", fullName: "Елена Иванова" };

export const positions: Record<OfferKind, { title: string; department: string }> = {
  structured: {
    title: "Ведущего аналитика",
    department: "Дирекция управления персоналом и цифровизации HR",
  },
  /** В макете PDF-сценария баннер тот же; сам PDF в макете — для другой позиции (плейсхолдер). */
  pdf: {
    title: "Ведущего аналитика",
    department: "Дирекция управления персоналом и цифровизации HR",
  },
};

export const recruiter = {
  name: "Святослав Месниченко",
  note: "Твой рекрутер, ему ты можешь задать все вопросы по условиям",
  href: "#recruiter",
};

export const salary = {
  total: "103 456 ₽",
  totalCaption: "Ежемесячный совокупный доход до вычета налогов",
  bonus: { value: "15%", caption: "Целевой квартальный бонус" },
  breakdownTitle: "Из чего складывается твоя заработная плата",
  /** Значения — как в макете (узел 188-29752); в сумму 103 456 они не сходятся. */
  parts: [
    { value: "64 108 ₽", caption: "фиксированный\nоклад" },
    { value: "15 700 ₽", caption: "надбавка\nза объем работ" },
    { value: "15 700 ₽", caption: "гарант новичка", note: "на первые 3 месяца работы" },
  ],
  coefficients: [
    { value: "0,03", caption: "северная\nнадбавка" },
    { value: "1,5", caption: "региональный\nкоэффициент" },
  ],
};

export type ConditionIcon =
  | "pin"
  | "suitcase"
  | "clock"
  | "airplane"
  | "coins"
  | "user"
  | "document"
  | "calendar";

export type Condition = { label: string; value: string; icon?: ConditionIcon };

export const conditions: Condition[] = [
  { label: "Город и место работы", value: "Москва, Метрополис, Ленинградское ш., 16А", icon: "pin" },
  { label: "Формат работы", value: "Гибрид, 2 дня из дома", icon: "suitcase" },
  { label: "График", value: "9:00–18:00, в пятницу до 16:45, обед 45 минут", icon: "clock" },
  { label: "Отпуск", value: "31 день (28 основной + 3 дня за ненормированный график)", icon: "airplane" },
  { label: "Бонус", value: "15% целевой квартальный бонус", icon: "coins" },
  { label: "Занятость", value: "Основное место работы", icon: "user" },
  { label: "Тип договора", value: "Бессрочный", icon: "document" },
  { label: "Испытательный срок", value: "3 месяца", icon: "calendar" },
  {
    label: "Цели\nна испытательный срок",
    value:
      "Провести аудит UX-долга в модуле отпусков, подготовить редизайн формы заявки и запустить его на пилотную группу, собрать первые метрики.",
  },
  {
    label: "Что предстоит делать",
    value:
      "Проектирование интерфейсов внутренней HR-платформы OTP Space для 7 000 сотрудников: исследования, прототипы, дизайн-система, работа с аналитиками и разработкой. Ведение модулей отпусков, адаптации и цифрового оффера. Участие в планировании релизов, защита решений перед бизнес-заказчиком. Поддержка и развитие библиотеки компонентов в Figma, документация паттернов, ревью макетов коллег.",
  },
];

export type Benefit = { title: string; caption: string; image: string };

export const benefits: Benefit[] = [
  { title: "ДМС со стоматологией", caption: "С первого дня работы", image: "b-dms" },
  { title: "Фитнес", caption: "Компенсация абонемента", image: "b-fitness" },
  { title: "Мобильная связь", caption: "Корпоративный тариф", image: "b-mobile" },
  { title: "Страхование", caption: "С первого дня работы", image: "b-insurance" },
  { title: "Зарплатная карта", caption: "Премиальное обслуживание", image: "b-card" },
];

export const culture = {
  title: "Тебя ждёт в ОТП",
  subtitle: "Это есть у всех в банке — с первого дня и без условий",
  big: [
    { key: "flex", title: "Гибкое начало\nи окончание дня", caption: "По согласованию с руководителем —\nбез отпрашиваний" },
    { key: "coins", title: "ОТП Коины", caption: "Собирай и трать на что угодно: от мерча до day-off" },
    { key: "credit", title: "Кредиты\nи депозиты для своих", caption: "Льготные условия — сможешь выгодно что-нибудь купить" },
  ],
  wide: [
    { key: "bestbenefits", title: "BestBenefits", caption: "Скидки на путешествия, технику,\nспорт и другие полезности", image: "c-bestbenefits" },
    { key: "academy", title: "IT Academy", caption: "Прокачаешься\nпо soft и hard skills", image: "c-lightning" },
  ],
  small: [
    { key: "sport", title: "Сообщества ЗОЖ", caption: "Cycling, running и другие —\nмы за здоровый образ жизни", image: "c-pingpong" },
    { key: "welcome", title: "Welcome pack", caption: "Стильный и полезный мерч\nв первый день", image: "c-bag" },
    { key: "style", title: "Свободный стиль", caption: "Вместо пиджака дадим тебе комфортное и яркое худи", image: "c-hoodie" },
  ],
};

export const legal = "Принятие оффера не является подписанием трудового договора";

const MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const WEEKDAYS = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

/** «5 сентября» */
export function fmtDay(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

/** «понедельник, 12 октября» */
export function fmtWeekdayDay(date: Date): string {
  return `${WEEKDAYS[date.getDay()]}, ${fmtDay(date)}`;
}

/** «6–17 октября» или «28 сентября – 3 октября» */
export function fmtRange(from: Date, to: Date): string {
  if (from.getMonth() === to.getMonth()) return `${from.getDate()}–${to.getDate()} ${MONTHS[to.getMonth()]}`;
  return `${fmtDay(from)} – ${fmtDay(to)}`;
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / 86_400_000);
}

export function daysWord(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "день";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "дня";
  return "дней";
}

export function asset(name: string, ext = "webp"): string {
  return `${import.meta.env.BASE_URL}offer/${name}.${ext}`;
}
