import { HeartFill16Icon } from "@otp/space-ui-kit/icons/heart-fill-16";
import { Typography } from "@otp/space-ui-kit/typography";

import { asset, culture } from "./data";

function CardText({ title, caption }: { title: string; caption: string }) {
  return (
    <span className="relative grid gap-spacing-md">
      <Typography.Body.ThreeM className="whitespace-pre-line">{title}</Typography.Body.ThreeM>
      <Typography.Caption.OneR color="tertiary" className="whitespace-pre-line">
        {caption}
      </Typography.Caption.OneR>
    </span>
  );
}

/** «Тебя ждёт в ОТП» — редакционный блок про культуру, три ряда карточек-виджетов. */
export function Culture() {
  const [flex, coins, credit] = culture.big;
  return (
    <section className="grid gap-spacing-exxxxs" aria-labelledby="culture-title">
      <div className="grid gap-spacing-md">
        <Typography.Title.TwoM as="h2" id="culture-title" className="m-0 flex items-center gap-spacing-md">
          {culture.title}
          <HeartFill16Icon aria-hidden="true" className="offer-culture__heart" />
        </Typography.Title.TwoM>
        <Typography.Body.ThreeR as="p" color="tertiary" className="m-0">
          {culture.subtitle}
        </Typography.Body.ThreeR>
      </div>
      <div className="grid gap-spacing-lg">
        <div className="offer-culture__row3 grid gap-spacing-lg">
          <div className="offer-culture__card offer-culture__card--tall offer-culture__card--lime rounded-radius-md p-spacing-lg">
            <img className="offer-culture__deco offer-culture__clock-big" src={asset("c-clock")} alt="" />
            <img className="offer-culture__deco offer-culture__clock-small" src={asset("c-clock")} alt="" />
            <img className="offer-culture__deco offer-culture__star-1" src={asset("c-star")} alt="" />
            <img className="offer-culture__deco offer-culture__star-2" src={asset("c-star")} alt="" />
            <CardText {...flex} />
          </div>
          <div className="offer-culture__card offer-culture__card--tall offer-culture__card--purple rounded-radius-md p-spacing-lg">
            <img className="offer-culture__deco offer-culture__confetti" src={asset("c-confetti")} alt="" />
            <img className="offer-culture__deco offer-culture__coin" src={asset("c-coin")} alt="" />
            <CardText {...coins} />
          </div>
          <div className="offer-culture__card offer-culture__card--tall offer-culture__card--blue rounded-radius-md p-spacing-lg">
            <img className="offer-culture__deco offer-culture__cards-left" src={asset("c-cards")} alt="" />
            <img className="offer-culture__deco offer-culture__cards-right" src={asset("c-cards")} alt="" />
            <img className="offer-culture__deco offer-culture__safe" src={asset("c-safe")} alt="" />
            <CardText {...credit} />
          </div>
        </div>
        <div className="offer-culture__row2 grid gap-spacing-lg">
          {culture.wide.map((c) => (
            <div key={c.key} className="offer-culture__card offer-culture__card--wide rounded-radius-md bg-base-surface-tertiary-neutral-normal p-spacing-lg">
              <img className={`offer-culture__deco offer-culture__wide-img offer-culture__wide-img--${c.key}`} src={asset(c.image)} alt="" />
              <CardText title={c.title} caption={c.caption} />
            </div>
          ))}
        </div>
        <div className="offer-culture__row3 grid gap-spacing-lg">
          {culture.small.map((c) => (
            <div key={c.key} className="offer-culture__card offer-culture__card--small rounded-radius-md bg-base-surface-tertiary-neutral-normal p-spacing-lg">
              <img className={`offer-culture__deco offer-culture__small-img offer-culture__small-img--${c.key}`} src={asset(c.image)} alt="" />
              <CardText title={c.title} caption={c.caption} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
