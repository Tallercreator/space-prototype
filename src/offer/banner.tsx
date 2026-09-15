import * as React from "react";

import { Typography } from "@otp/space-ui-kit/typography";

import { brandColors, burst } from "./confetti";
import { asset, candidate, positions } from "./data";
import type { OfferKind } from "./data";

/** Баннер-приглашение: фон — экспорт из Figma без текста, поверх — лого, тост и заголовок. */
export function Banner({ kind }: { kind: OfferKind }) {
  const position = positions[kind];
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const stopRef = React.useRef<() => void>(() => {});

  React.useEffect(() => () => stopRef.current(), []);

  /** Клик по баннеру — залп конфетти в брендовых цветах из точки клика. */
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = canvas.getBoundingClientRect();
    stopRef.current();
    stopRef.current = burst(canvas, e.clientX - rect.left, e.clientY - rect.top, brandColors(canvas));
  };

  return (
    <section className="offer-banner" aria-label="Приглашение в команду" onClick={onClick}>
      <img className="offer-banner__bg" src={asset("banner-bg")} alt="" />
      <canvas ref={canvasRef} className="offer-banner__confetti" aria-hidden="true" />
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
