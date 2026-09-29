import * as React from "react";

/**
 * «Пакет льгот» — настройка модератора: сегмент кандидата и набор льгот из каталога.
 * Хранится в localStorage, живёт поверх сценариев (сценарий меняет статус оффера, пакет — содержимое блоков).
 * Источник: таблица «Блок × Масс/ГО/ИТ» + список «Льготы и привилегии» (12 позиций).
 */
export type Segment = "mass" | "ho" | "it";

export const SEGMENTS: Array<{ id: Segment; label: string; hint: string }> = [
  { id: "mass", label: "Масс", hint: "массовые позиции" },
  { id: "ho", label: "ГО", hint: "головной офис" },
  { id: "it", label: "ИТ", hint: "ИТ-позиции" },
];

export type BenefitIcon =
  | "car"
  | "coins"
  | "card"
  | "pharmacy"
  | "users"
  | "checkup"
  | "percent"
  | "shield"
  | "insurance"
  | "heart"
  | "book";

export type CatalogBenefit = {
  id: string;
  title: string;
  caption: string;
  /** Иконка-заглушка, пока нет картинки `public/offer/b-<id>.webp`. */
  icon: BenefitIcon;
  /** Явный ключ картинки; по умолчанию ищется `b-<id>`. */
  image?: string;
};

export const BENEFIT_CATALOG: CatalogBenefit[] = [
  {
    id: "car",
    title: "Корпоративный автомобиль и личный водитель",
    caption: "Для рабочих поездок и встреч",
    icon: "car",
  },
  {
    id: "car-compensation",
    title: "Компенсация личного автомобиля",
    caption: "Топливо и обслуживание по нормам банка",
    icon: "coins",
  },
  {
    id: "parking",
    title: "Парковка",
    caption: "Открытая, закрытая или городская у офиса",
    icon: "card",
  },
  {
    id: "dms",
    title: "ДМС сотрудника",
    caption: "Уровень программы по грейду, с первого дня",
    icon: "pharmacy",
    image: "b-dms",
  },
  {
    id: "dms-family",
    title: "ДМС для родственников",
    caption: "Супруги и дети до 21 года — за счёт банка",
    icon: "users",
  },
  {
    id: "checkup",
    title: "Чек-ап за счёт банка",
    caption: "Ежегодное обследование",
    icon: "checkup",
  },
  {
    id: "dms-discount",
    title: "Скидка на ДМС для родственников",
    caption: "Корпоративные условия покупки",
    icon: "percent",
  },
  {
    id: "insurance-critical",
    title: "Страхование от критических заболеваний",
    caption: "Онкология и другие тяжёлые диагнозы",
    icon: "shield",
  },
  {
    id: "insurance-accident",
    title: "Страхование от несчастных случаев",
    caption: "С первого дня работы",
    icon: "insurance",
    image: "b-insurance",
  },
  {
    id: "fitness-alt",
    title: "Фитнес-клуб вместо ДМС",
    caption: "Оплата членства как альтернатива ДМС",
    icon: "heart",
  },
  {
    id: "fitness-club",
    title: "Фитнес или спортивный клуб",
    caption: "Оплата членства или занятий",
    icon: "heart",
    image: "b-fitness",
  },
  {
    id: "education",
    title: "Обучение сотрудников",
    caption: "Курсы, конференции и программы развития",
    icon: "book",
  },
];

export type BenefitsPackage = { segment: Segment; benefits: string[] };

export const DEFAULT_PACKAGE: BenefitsPackage = {
  segment: "ho",
  benefits: [
    "dms",
    "dms-family",
    "checkup",
    "insurance-accident",
    "fitness-club",
  ],
};

/** Как сегмент меняет блок «Тебя ждёт в ОТП» (таблица «Блок × сегмент»). */
export const CULTURE_BY_SEGMENT: Record<
  Segment,
  {
    flex: { title: string; caption: string };
    /** Вторая широкая карточка: обучение (ГО/ИТ) или зарплатная карта (Масс — обучения нет). */
    wide: { key: string; title: string; caption: string; image: string };
    welcomePack: boolean;
  }
> = {
  mass: {
    flex: {
      title: "Гибкий график",
      caption: "По согласованию с руководителем —\nбез отпрашиваний",
    },
    wide: {
      key: "card",
      title: "Зарплатная карта",
      caption: "Премиальное обслуживание\nс первого дня",
      image: "b-card",
    },
    welcomePack: false,
  },
  ho: {
    flex: {
      title: "Гибкое начало\nи окончание дня",
      caption: "По согласованию с руководителем —\nбез отпрашиваний",
    },
    wide: {
      key: "academy",
      title: "Внутреннее обучение",
      caption: "Курсы и программы\nразвития внутри банка",
      image: "c-lightning",
    },
    welcomePack: true,
  },
  it: {
    flex: {
      title: "Гибкое начало\nи окончание дня",
      caption: "По согласованию с руководителем —\nбез отпрашиваний",
    },
    wide: {
      key: "academy",
      title: "IT Academy\n+ конференции",
      caption: "Прокачаешься\nпо soft и hard skills",
      image: "c-lightning",
    },
    welcomePack: true,
  },
};

const KEY = "offer-package";
const IDS = new Set(BENEFIT_CATALOG.map((b) => b.id));
const SEGMENT_IDS = new Set<string>(SEGMENTS.map((s) => s.id));

function sanitize(raw: unknown): BenefitsPackage {
  const p = (raw ?? {}) as Partial<BenefitsPackage>;
  const segment =
    typeof p.segment === "string" && SEGMENT_IDS.has(p.segment)
      ? (p.segment as Segment)
      : DEFAULT_PACKAGE.segment;
  const benefits = Array.isArray(p.benefits)
    ? p.benefits.filter(
        (id): id is string => typeof id === "string" && IDS.has(id),
      )
    : DEFAULT_PACKAGE.benefits;
  return { segment, benefits };
}

function load(): BenefitsPackage {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : DEFAULT_PACKAGE;
  } catch {
    return DEFAULT_PACKAGE;
  }
}

let current: BenefitsPackage = load();
const listeners = new Set<() => void>();

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function setPackage(next: BenefitsPackage): void {
  current = sanitize(next);
  try {
    localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    /* приватный режим — пакет живёт до перезагрузки */
  }
  listeners.forEach((fn) => fn());
}

export function usePackage(): BenefitsPackage {
  return React.useSyncExternalStore(
    subscribe,
    () => current,
    () => current,
  );
}

/** Выбранные льготы в порядке каталога. */
export function selectedBenefits(pkg: BenefitsPackage): CatalogBenefit[] {
  return BENEFIT_CATALOG.filter((b) => pkg.benefits.includes(b.id));
}
