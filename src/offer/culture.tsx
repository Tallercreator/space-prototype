import { HeartFill16Icon } from "@otp/space-ui-kit/icons/heart-fill-16";
import { Typography } from "@otp/space-ui-kit/typography";

import { asset, culture } from "./data";
import { cultureCards, usePackage } from "./package";
import type { CultureCard, Segment } from "./package";

/** Раскладка малых карточек по числу (Figma «Бенефиты»: 2 и 3 — в ряд, 4 — 2×2, дальше по 3). */
function chunk(n: number): number[] {
  if (n <= 3) return n ? [n] : [];
  if (n === 4) return [2, 2];
  if (n === 5) return [3, 2];
  return [3, 3, ...chunk(n - 6)];
}

const DETAIL_IMAGES: Record<string, string> = {
  sport: "c-mass-sport",
  style: "c-mass-style",
  study: "c-ho-study",
  welcome: "c-ho-welcome",
};

/** Малая карточка (Figma «Карточка», Size=Vertical, 336×136): картинка 48 сверху, текст снизу. */
function SmallCard({ card, segment }: { card: CultureCard; segment: Segment }) {
  const detailImage = segment !== "it" ? DETAIL_IMAGES[card.id] : undefined;
  return (
    <li className="offer-culture__small grid content-between gap-spacing-lg rounded-radius-md bg-base-surface-tertiary-neutral-normal p-spacing-lg">
      {detailImage ? (
        <span className="offer-culture__img offer-culture__art" aria-hidden="true">
          <span className={`offer-culture__art--${card.id}`}>
            <img src={asset(detailImage, "png")} alt="" />
          </span>
        </span>
      ) : (
        <img className="offer-culture__img" src={asset(card.image)} alt="" />
      )}
      <span className="grid gap-spacing-sm">
        <Typography.Body.ThreeM className="whitespace-pre-line">
          {card.title}
        </Typography.Body.ThreeM>
        <Typography.Caption.OneR color="secondary" className="whitespace-pre-line">
          {card.caption}
        </Typography.Caption.OneR>
      </span>
    </li>
  );
}

/** «Тебя ждёт в ОТП» (Figma 325-39395): три больших карточки-иллюстрации и малые карточки из пакета. */
export function Culture() {
  const pkg = usePackage();
  const detailed = pkg.segment !== "it";
  const cards = cultureCards(pkg);
  const rows: CultureCard[][] = [];
  let i = 0;
  for (const n of chunk(cards.length)) {
    rows.push(cards.slice(i, i + n));
    i += n;
  }
  return (
    <section className="grid gap-spacing-exxxxs" aria-labelledby="culture-title">
      <div className="grid gap-spacing-md">
        <Typography.Title.TwoM
          as="h2"
          id="culture-title"
          className="m-0 flex items-center gap-spacing-md"
        >
          {culture.title}
          <HeartFill16Icon aria-hidden="true" className="offer-culture__heart" />
        </Typography.Title.TwoM>
        <Typography.Body.ThreeR as="p" color="tertiary" className="m-0">
          {culture.subtitle}
        </Typography.Body.ThreeR>
      </div>
      <div className={`grid ${detailed ? "gap-spacing-lg" : "gap-spacing-md"}`}>
        <ul className="offer-culture__row m-0 grid list-none gap-spacing-lg p-0">
          {culture.big.map((c) => (
            // Фон — экспорт карточки из Figma (градиент + иллюстрация запечены в растр), текст — живой, всегда тёмный
            <li
              key={c.key}
              className="offer-culture__big flex flex-col justify-end gap-spacing-md overflow-hidden rounded-radius-md p-spacing-lg text-universal-neutral-dark"
              style={{ backgroundImage: `url(${asset(c.image)})` }}
            >
              <Typography.Body.ThreeM color="inherit" className="whitespace-pre-line">
                {c.title}
              </Typography.Body.ThreeM>
              <Typography.Caption.OneR
                color="inherit"
                className="offer-culture__big-caption whitespace-pre-line"
              >
                {c.caption}
              </Typography.Caption.OneR>
            </li>
          ))}
        </ul>
        {rows.map((row, r) => (
          <ul
            key={r}
            className={`offer-culture__row offer-culture__row--${row.length} m-0 grid list-none ${detailed ? "gap-spacing-lg" : "gap-spacing-md"} p-0`}
          >
            {row.map((card) => (
              <SmallCard key={card.id} card={card} segment={pkg.segment} />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
