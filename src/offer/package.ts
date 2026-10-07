import * as React from "react";

/**
 * «Пакет льгот» — настройка модератора: сегмент кандидата и набор льгот из каталога.
 * Хранится в localStorage, живёт поверх сценариев (сценарий меняет статус оффера, пакет — содержимое блоков).
 * Источник: таблица «Блок × Масс/ГО/ИТ» + список «Льготы и привилегии» (12 позиций).
 */
export type Segment = "mass" | "ho" | "agile" | "it";

export const SEGMENTS: Array<{ id: Segment; label: string; hint: string }> = [
  { id: "mass", label: "Масс", hint: "массовые позиции" },
  { id: "ho", label: "ГО", hint: "головной офис" },
  { id: "agile", label: "Agile", hint: "Agile-команды" },
  { id: "it", label: "ИТ Agile", hint: "ИТ-команды · тёмная тема" },
];

export type BenefitImage =
  | "dms"
  | "fitness"
  | "mobile"
  | "life"
  | "card"
  | "insurance-blue"
  | "car"
  | "insurance-silver"
  | "car-compensation"
  | "dms-family"
  | "checkup"
  | "parking";
export type InsuranceArtwork = "blue" | "silver";

export type CatalogBenefit = {
  id: string;
  title: string;
  caption: string;
  image: BenefitImage;
};

/** Полный каталог, Figma 188:41853. Два щита — оформление одной страховой льготы. */
export const BENEFIT_CATALOG: CatalogBenefit[] = [
  { id: "dms", title: "ДМС со стоматологией", caption: "После испытательного срока", image: "dms" },
  {
    id: "dms-first-month",
    title: "ДМС со стоматологией",
    caption: "В первый месяц работы",
    image: "dms",
  },
  {
    id: "fitness-alt",
    title: "Фитнес",
    caption: "Альтернатива на выбор вместо ДМС",
    image: "fitness",
  },
  {
    id: "mobile",
    title: "Корпоративная мобильная связь",
    caption: "Тариф за счёт компании",
    image: "mobile",
  },
  {
    id: "fitness-club",
    title: "Фитнес",
    caption: "Выбор из каталога провайдеров",
    image: "fitness",
  },
  { id: "insurance", title: "Страхование жизни", caption: "В первый месяц работы", image: "life" },
  {
    id: "card",
    title: "Премиальная зарплатная карта",
    caption: "Специальные условия обслуживания",
    image: "card",
  },
  {
    id: "card-standard",
    title: "Зарплатная карта",
    caption: "Специальные условия обслуживания",
    image: "card",
  },
  {
    id: "insurance-critical",
    title: "Дополнительная страховая защита",
    caption: "Онкология и другие тяжёлые заболевания",
    image: "insurance-blue",
  },
  {
    id: "car",
    title: "Корпоративный автомобиль\nс водителем",
    caption: "Для рабочих поездок",
    image: "car",
  },
  {
    id: "car-compensation",
    title: "Компенсация личного автомобиля",
    caption: "Топливо и обслуживание",
    image: "car-compensation",
  },
  {
    id: "dms-discount",
    title: "ДМС для родственников со скидкой",
    caption: "Специальные корпоративные условия",
    image: "dms-family",
  },
  {
    id: "checkup",
    title: "Ежегодный медицинский чек-ап",
    caption: "За счёт компании",
    image: "checkup",
  },
  { id: "parking", title: "Парковка", caption: "Парковочное место у офиса", image: "parking" },
];

/** Как показать регалии банка под баннером: карточки V1 или V2 (Figma 355-123184 до и после правки). */
export type FactsVariant = "cards" | "cards2";
export const FACTS_VARIANTS: Array<{ id: FactsVariant; label: string }> = [
  { id: "cards", label: "Регалии: карточки" },
  { id: "cards2", label: "Регалии: карточки V2" },
];

export type BenefitsPackage = {
  segment: Segment;
  benefits: string[];
  culture: string[];
  facts: FactsVariant;
  variedBannerColors: boolean;
  insuranceArtwork: InsuranceArtwork;
};

/** Малые карточки «Тебя ждёт в ОТП» (Figma «Карточка», Size=Vertical). */
export type CultureCard = {
  id: string;
  title: string;
  caption: string;
  image: string;
};

/** Заголовок карточки обучения зависит от шаблона: ГО — внутреннее обучение, ИТ — IT Academy. */
export const STUDY_TITLE: Record<Segment, string> = {
  mass: "Обучение для сотрудников",
  ho: "Внутреннее обучение",
  agile: "IT Academy",
  it: "IT Academy",
};

export const CULTURE_CARDS: CultureCard[] = [
  {
    id: "sport",
    title: "Сообщества ЗОЖ",
    caption: "Cycling, running и другие —\nмы за здоровый образ жизни",
    image: "c-pingpong",
  },
  {
    id: "study",
    title: STUDY_TITLE.ho,
    caption: "Прокачаешься по soft и hard skills",
    image: "c-lightning",
  },
  {
    id: "welcome",
    title: "Welcome pack",
    caption: "Стильный и полезный мерч\nв первый день",
    image: "c-bag",
  },
  {
    id: "style",
    title: "Свободный стиль",
    caption: "Вместо пиджака дадим тебе\nкомфортное и яркое худи",
    image: "c-hoodie",
  },
  {
    id: "flex",
    title: "Гибкий график",
    caption: "По согласованию с руководителем —\nбез отпрашиваний",
    image: "c-clock",
  },
];

/** Шаблоны по таблице «Блок × сегмент»: Масс — без обучения и Welcome pack; ГО и ИТ — полный набор. */
export const CULTURE_PRESETS: Record<Segment, string[]> = {
  mass: ["sport", "style"],
  ho: ["sport", "study", "welcome", "style"],
  agile: ["welcome", "study", "style", "sport", "flex"],
  it: ["welcome", "study", "style", "sport", "flex"],
};

/** Карточки с учётом шаблона: подставляет заголовок обучения по сегменту. */
export function cultureCards(pkg: BenefitsPackage): CultureCard[] {
  const order = [...CULTURE_PRESETS[pkg.segment], ...CULTURE_CARDS.map((c) => c.id)];
  return CULTURE_CARDS.filter((c) => pkg.culture.includes(c.id))
    .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
    .map((c) => {
      if (c.id === "study")
        return {
          ...c,
          title: STUDY_TITLE[pkg.segment],
          caption: "Прокачай свои soft и hard skills",
        };
      if (c.id === "sport")
        return {
          ...c,
          caption:
            "По интересам, профессиональные и спортивные — мы за здоровый образ жизни, поддержим твое хобби и твои профессиональные амбиции",
        };
      if (c.id === "style")
        return {
          ...c,
          caption: "Любим худи и удобные джинсы",
        };
      if ((pkg.segment === "agile" || pkg.segment === "it") && c.id === "flex")
        return { ...c, caption: "По согласованию с руководителем" };
      return c;
    });
}

export const DEFAULT_PACKAGE: BenefitsPackage = {
  segment: "mass",
  benefits: ["dms", "fitness-alt", "mobile", "insurance", "card", "parking"],
  culture: CULTURE_PRESETS.mass,
  facts: "cards2",
  variedBannerColors: false,
  insuranceArtwork: "blue",
};

const KEY = "offer-package";
const IDS = new Set(BENEFIT_CATALOG.map((b) => b.id));
const CULTURE_IDS = new Set(CULTURE_CARDS.map((c) => c.id));
const SEGMENT_IDS = new Set<string>(SEGMENTS.map((s) => s.id));

function sanitize(raw: unknown): BenefitsPackage {
  const p = (raw ?? {}) as Partial<BenefitsPackage>;
  const segment =
    typeof p.segment === "string" && SEGMENT_IDS.has(p.segment)
      ? (p.segment as Segment)
      : DEFAULT_PACKAGE.segment;
  const pick = (list: unknown, ids: Set<string>, fallback: string[]) =>
    Array.isArray(list)
      ? list.filter((id): id is string => typeof id === "string" && ids.has(id))
      : fallback;
  // Старый отдельный пункт со вторым щитом теперь вариант той же льготы.
  const legacySilver = Array.isArray(p.benefits) && p.benefits.includes("insurance-accident");
  const migratedBenefits = Array.isArray(p.benefits)
    ? p.benefits.map((id) => (id === "insurance-accident" ? "insurance-critical" : id))
    : p.benefits;
  return {
    segment,
    insuranceArtwork:
      p.insuranceArtwork === "silver" ||
      (p.insuranceArtwork === undefined &&
        legacySilver &&
        !p.benefits?.includes("insurance-critical"))
        ? "silver"
        : "blue",
    variedBannerColors: p.variedBannerColors === true,
    benefits: [...new Set(pick(migratedBenefits, IDS, DEFAULT_PACKAGE.benefits))],
    culture: pick(p.culture, CULTURE_IDS, CULTURE_PRESETS[segment]),
    facts: FACTS_VARIANTS.some((v) => v.id === p.facts)
      ? (p.facts as FactsVariant)
      : DEFAULT_PACKAGE.facts,
  };
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

/** Быстрое переключение шаблона; выбранные льготы остаются до следующего этапа. */
export function selectTemplate(segment: Segment): void {
  setPackage({
    ...current,
    segment,
    culture: CULTURE_PRESETS[segment],
    facts: "cards2",
  });
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
  return BENEFIT_CATALOG.filter((b) => pkg.benefits.includes(b.id)).map((b) =>
    b.id === "insurance-critical" && pkg.insuranceArtwork === "silver"
      ? { ...b, image: "insurance-silver" }
      : b,
  );
}
