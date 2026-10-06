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

/** Каталог по макету «Льготы» (Figma 188-41853), порядок и тексты как там. Картинки — b-<id>.webp. */
export const BENEFIT_CATALOG: CatalogBenefit[] = [
  {
    id: "dms",
    title: "ДМС со стоматологией",
    caption: "После испытательного срока",
    icon: "pharmacy",
  },
  {
    id: "fitness-alt",
    title: "Фитнес вместо ДМС",
    caption: "Компенсация абонемента",
    icon: "heart",
  },
  {
    id: "mobile",
    title: "Мобильная связь",
    caption: "Корпоративный тариф",
    icon: "card",
  },
  {
    id: "insurance",
    title: "Страхование",
    caption: "С первого дня работы",
    icon: "shield",
  },
  // В макете подпись «Корпоративный тариф» — похоже, скопирована от мобильной связи; оставлена прежняя
  {
    id: "card",
    title: "Зарплатная карта",
    caption: "Премиальное обслуживание",
    icon: "card",
  },
  {
    id: "car",
    title: "Корпоративный автомобиль\nи личный водитель",
    caption: "Для рабочих поездок и встреч",
    icon: "car",
  },
  {
    id: "insurance-critical",
    title: "Страхование от критических заболеваний",
    caption: "Онкология и другие диагнозы",
    icon: "shield",
  },
  {
    id: "insurance-accident",
    title: "Страхование от несчастных случаев",
    caption: "С первого дня работы",
    icon: "insurance",
  },
  {
    id: "car-compensation",
    title: "Компенсация личного автомобиля",
    caption: "Топливо и обслуживание",
    icon: "coins",
  },
  {
    id: "fitness-club",
    title: "Фитнес или спортивный клуб",
    caption: "Оплата членства или занятий",
    icon: "heart",
  },
  {
    id: "checkup",
    title: "Чек-ап за счёт банка",
    caption: "Ежегодное обследование",
    icon: "checkup",
  },
  // В макете подпись «Топливо и обслуживание» — скопирована от компенсации авто; поставлена по смыслу
  {
    id: "dms-discount",
    title: "Скидка на ДМС\nдля родственников",
    caption: "Корпоративные условия покупки",
    icon: "percent",
  },
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
  it: ["sport", "study", "welcome", "style"],
};

/** Карточки с учётом шаблона: подставляет заголовок обучения по сегменту. */
export function cultureCards(pkg: BenefitsPackage): CultureCard[] {
  return CULTURE_CARDS.filter((c) => pkg.culture.includes(c.id)).map((c) => {
    if (c.id === "study")
      return {
        ...c,
        title: STUDY_TITLE[pkg.segment],
        caption: pkg.segment === "ho" ? "Прокачай свои soft и hard skills" : c.caption,
      };
    if (pkg.segment !== "it" && c.id === "sport")
      return {
        ...c,
        caption:
          "По интересам, профессиональные и спортивные — мы за здоровый образ жизни, поддержим твое хобби и твои профессиональные амбиции",
      };
    if (pkg.segment !== "it" && c.id === "style")
      return {
        ...c,
        caption: "Любим худи и удобные джинсы",
      };
    return c;
  });
}

export const DEFAULT_PACKAGE: BenefitsPackage = {
  segment: "mass",
  benefits: ["dms", "fitness-alt", "mobile", "insurance", "card"],
  culture: CULTURE_PRESETS.mass,
  facts: "cards2",
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
  return {
    segment,
    benefits: pick(p.benefits, IDS, DEFAULT_PACKAGE.benefits),
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
    facts: segment !== "it" ? "cards2" : current.facts,
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
  return BENEFIT_CATALOG.filter((b) => pkg.benefits.includes(b.id));
}
