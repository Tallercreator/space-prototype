import { Typography } from "@otp/space-ui-kit/typography";

import { asset, candidate, positions } from "./data";
import type { OfferKind } from "./data";

/** Баннер-приглашение: фон — экспорт из Figma без текста, поверх — лого, тост и заголовок. */
export function Banner({ kind }: { kind: OfferKind }) {
  const position = positions[kind];
  return (
    <section className="offer-banner" aria-label="Приглашение в команду">
      <img className="offer-banner__bg" src={asset("banner-bg")} alt="" />
      <img className="offer-banner__logo" src={asset("otp-logo", "svg")} alt="ОТП Банк" />
      <div className="offer-banner__toast rounded-radius-sm bg-base-surface-primary-block-normal px-spacing-md py-spacing-xs">
        <Typography.Body.ThreeM>Все будет ОТП</Typography.Body.ThreeM>
      </div>
      <div className="offer-banner__text grid gap-spacing-lg justify-items-center text-center">
        <Typography.Promo.FourM as="h1" className="offer-banner__title m-0">
          {candidate.firstName}, мы приглашаем тебя
          <br />
          на позицию {position.title}
        </Typography.Promo.FourM>
        <Typography.Body.ThreeR as="p" color="secondary" className="m-0">
          {position.department}
        </Typography.Body.ThreeR>
      </div>
    </section>
  );
}
