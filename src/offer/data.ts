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
};

export type OfferKind = "structured" | "pdf";

export const candidate = { firstName: "Елена", fullName: "Елена Иванова" };

export const positions: Record<
  OfferKind,
  { title: string; department: string }
> = {
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
  phone: "+7 (808) 999-33-22",
  email: "s.mesnichenko@otpbank.ru",
  telegram: "@mesnich",
};

export const salary = {
  total: "103 456 ₽",
  totalCaption:
    "Ежемесячный доход, согласно условиям\nТрудового договора с учётом надбавок и компенсаций",
  /** По умолчанию зарплата — один оклад, формулы нет; полная подпись — в сценарии #formula. */
  plainCaption: "Ежемесячный оклад,\nсогласно условиям Трудового договора",
  /**
   * Плитка премии и формула её расчёта — во всех сценариях.
   * 64 108 × 3 × 15 % × (0,03 + 1,5) ≈ 44 138 — по тем же коэффициентам, что и в основной формуле.
   */
  bonusDetailed: {
    amount: "44 138 ₽",
    caption: "Квартальная\nпремия, 15%",
    formulaTitle: "Как считается квартальная премия",
    parts: [
      { value: "64 108 ₽", caption: "фиксированный\nоклад" },
      { value: "3", caption: "месяца\nв квартале" },
      { value: "15%", caption: "размер\nпремии" },
    ],
    note: "Премия выплачивается раз в квартал отдельно от ежемесячного дохода. Фактическая выплата зависит от достигнутых результатов.",
  },
  breakdownTitle: "Из чего складывается твоя заработная плата",
  taxNote: "Все суммы указаны до вычета налогов",
  /** Значения — как в макете (узел 188-29752); в сумму 103 456 они не сходятся. */
  parts: [
    { value: "64 108 ₽", caption: "фиксированный\nоклад" },
    {
      value: "15 700 ₽",
      caption: "гарант новичка",
      note: "на первые 3 месяца работы",
    },
  ],
  coefficients: [
    { value: "0,03", caption: "северная\nнадбавка" },
    { value: "1,5", caption: "региональный\nкоэффициент" },
  ],
};

export type ConditionIcon =
  "pin" | "suitcase" | "clock" | "airplane" | "user" | "document" | "calendar";

export type Condition = { label: string; icon?: ConditionIcon } & (
  { value: string; items?: never } | { items: string[]; value?: never }
);

export const conditions: Condition[] = [
  {
    label: "Город и место работы",
    value: "Москва, Метрополис, Ленинградское ш., 16А",
    icon: "pin",
  },
  { label: "Формат работы", value: "Гибрид, 2 дня из дома", icon: "suitcase" },
  {
    label: "График",
    value: "9:00–18:00, в пятницу до 16:45, обед 45 минут",
    icon: "clock",
  },
  {
    label: "Отпуск",
    value: "31 день (28 основной + 3 дня за ненормированный график)",
    icon: "airplane",
  },
  { label: "Занятость", value: "Основное место работы", icon: "user" },
  { label: "Испытательный срок", value: "3 месяца", icon: "calendar" },
  {
    label: "Цели\nна испытательный срок",
    items: [
      "Провести аудит UX-долга в модуле отпусков",
      "Подготовить редизайн формы заявки и запустить его на пилотную группу",
      "Собрать первые метрики",
    ],
  },
  {
    label: "Что предстоит делать",
    items: [
      "Проектирование интерфейсов внутренней HR-платформы OTP Space для 7 000 сотрудников: исследования, прототипы, дизайн-система, работа с аналитиками и разработкой",
      "Ведение модулей отпусков, адаптации и цифрового оффера",
      "Участие в планировании релизов, защита решений перед бизнес-заказчиком",
      "Поддержка и развитие библиотеки компонентов в Figma, документация паттернов, ревью макетов коллег",
    ],
  },
];

/** «Тебя ждёт в ОТП» (Figma 325-39395): три больших карточки фиксированы, малые — из пакета (см. package.ts). */
export const culture = {
  title: "Тебя ждёт в ОТП",
  subtitle: "Это есть у всех в банке — с первого дня и без условий",
  big: [
    {
      key: "coins",
      title: "ОТП Коины",
      caption: "Собирай и трать на что угодно: от мерча до day-off",
      image: "c-big-coins",
    },
    {
      key: "credit",
      title: "Кредиты\nи депозиты для своих",
      caption: "Льготные условия — сможешь выгодно что-нибудь купить",
      image: "c-big-credit",
    },
    {
      key: "bb",
      title: "BestBenefits",
      caption: "Скидки на сервисы и товары\nв разных категориях",
      image: "c-big-bb",
    },
  ],
};

/** Регалии банка под баннером (Figma 355-123184). Источник — в скобках мелким; у двух фактов его нет. */
export type FactIcon = "trophy" | "bank" | "planet" | "flash" | "users";
/**
 * Регалии банка под баннером. `text` — V1 (одним абзацем 14 medium),
 * `headline`/`detail` — V2 (Figma 355-123184: заголовок 16 medium, пояснение 12, источник 10).
 */
export const facts: Array<{
  icon: FactIcon;
  text: string;
  headline: string;
  detail?: string;
  source?: string;
}> = [
  {
    icon: "trophy",
    text: "В топ-5\nлучших работодателей\nРоссии в категории «Банки»",
    headline: "Топ-5",
    detail: "лучших работодателей\nРоссии в категории «Банки»",
    source: "HH.ru, 2025",
  },
  {
    icon: "bank",
    text: "В топ-20\nкрупнейших банков\nРоссии по активам",
    headline: "Топ-20",
    detail: "крупнейших банков\nРоссии по активам",
    source: "Frank RG, 2026",
  },
  {
    icon: "planet",
    text: "10-е место в мире в категории «Большие банки»",
    headline: "10-е место",
    detail: "в мире в категории\n«Большие банки»",
    source: "OTP Group, Forbes World's Top Performing Banks, 2026",
  },
  {
    icon: "flash",
    text: "30+ лет\nна российском рынке",
    headline: "30+ лет\nна российском рынке",
  },
  {
    icon: "users",
    text: "Более\n2 миллионов клиентов",
    headline: "Более\n2 миллионов клиентов",
  },
];

export const legal =
  "Принятие оффера не является подписанием трудового договора";

const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
const WEEKDAYS = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

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
  if (from.getMonth() === to.getMonth())
    return `${from.getDate()}–${to.getDate()} ${MONTHS[to.getMonth()]}`;
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
