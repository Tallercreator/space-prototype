import * as React from "react";

import { Typography } from "@otp/space-ui-kit/typography";

import { brandColors, burst } from "./confetti";
import { asset, candidate, positions, offerRoles } from "./data";
import { usePackage } from "./package";
import { FactsRow } from "./facts";
import type { OfferKind } from "./data";

/** Баннер-приглашение: фон — экспорт из Figma без текста, поверх — лого, тост и заголовок. */
export function Banner({ kind }: { kind: OfferKind }) {
  const { segment, variedBannerColors } = usePackage();
  const bannerImage =
    variedBannerColors && (segment === "mass" || segment === "ho")
      ? asset(segment === "mass" ? "banner-blue" : "banner-purple", "png")
      : asset("banner-bg");
  const agile = segment === "agile" || segment === "it";
  const role = agile ? offerRoles.agile : offerRoles.nonAgile;
  const position = positions[kind];
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stopRef = React.useRef<() => void>(() => {});

  React.useEffect(() => () => stopRef.current(), []);

  /**
   * Клик только по баннеру, а конфетти сыплется по всему окну: канвас
   * зафиксирован на весь viewport, точка залпа — координаты клика в окне.
   */
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stopRef.current();
    stopRef.current = burst(canvas, e.clientX, e.clientY, brandColors(canvas));
  };

  return (
    <section
      className="offer-hero grid gap-spacing-md bg-base-surface-primary-block-normal p-spacing-md"
      aria-label="Приглашение в команду"
    >
      <div className="offer-banner" onClick={onClick}>
        <img className="offer-banner__bg" src={bannerImage} alt="" />
        <canvas ref={canvasRef} className="offer-confetti-layer" aria-hidden="true" />
        <img className="offer-banner__logo" src={asset("otp-logo", "svg")} alt="ОТП Банк" />
        <div className="offer-banner__toast rounded-radius-sm bg-universal-neutral-white px-spacing-md py-spacing-xs">
          <Typography.Body.ThreeM color="inherit">Все будет ОТП</Typography.Body.ThreeM>
        </div>
        <div
          className={`offer-banner__text ${agile ? "offer-banner__text--agile" : ""} grid gap-spacing-lg justify-items-center text-center`}
        >
          <Typography.Promo.FourM as="h1" color="inherit" className="offer-banner__title m-0">
            {agile ? (
              <>
                {candidate.firstName}, приглашаем тебя
                <br />
                на роль {role.invitation}
              </>
            ) : (
              <>
                {candidate.firstName}, мы приглашаем тебя
                <br />
                на роль {role.invitation}
              </>
            )}
          </Typography.Promo.FourM>
          {!agile && (
            <Typography.Body.ThreeR as="p" color="inherit" className="offer-banner__subtitle m-0">
              {position.department}
            </Typography.Body.ThreeR>
          )}
        </div>
      </div>
      <FactsRow />
    </section>
  );
}
