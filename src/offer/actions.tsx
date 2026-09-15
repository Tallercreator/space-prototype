import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { Link } from "@otp/space-ui-kit/link";
import { UprightArrowLine16Icon } from "@otp/space-ui-kit/icons/upright-arrow-line-16";
import { Typography } from "@otp/space-ui-kit/typography";

import { DEMO, fmtDay, legal } from "./data";
import type { OfferActions, OfferState } from "./state";

/**
 * Состояние панели (Figma «Buttons»): `scroll` — прилипла к низу окна (белая
 * подложка на всю ширину карточки, поля 24/40), `default` — стоит в потоке в
 * конце контента (без полей). Наверху страницы, пока виден баннер, панель скрыта.
 */
function usePanelState(ref: React.RefObject<HTMLDivElement | null>, threshold: number): { visible: boolean; stuck: boolean } {
  const [state, setState] = React.useState({ visible: false, stuck: false });
  React.useEffect(() => {
    const update = () => {
      const el = ref.current;
      const visible = window.scrollY > threshold;
      const stuck = el ? el.getBoundingClientRect().bottom >= window.innerHeight - 1 : false;
      setState((s) => (s.visible === visible && s.stuck === stuck ? s : { visible, stuck }));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ref, threshold]);
  return state;
}

/** Липкая панель действий под оффером: кнопки по сценарию, ссылка на PDF и юридическая строка. */
export function Actions({
  state,
  actions,
  onDecline,
  onParking,
}: {
  state: OfferState;
  actions: OfferActions;
  onDecline: () => void;
  onParking: () => void;
}) {
  const { scenario } = state;
  const ref = React.useRef<HTMLDivElement>(null);
  const { visible, stuck } = usePanelState(ref, 240);
  let hint: string | null = null;
  let buttons: React.ReactNode;

  switch (scenario) {
    case "gone":
      hint = "Срок ответа истёк. Оффер можно возобновить — напиши рекрутеру.";
      buttons = (
        <>
          <Button variant="secondary" tone="neutral" size="large" disabled>
            Отклонить
          </Button>
          <Button tone="neutral" size="large" disabled>
            Принять оффер
          </Button>
        </>
      );
      break;
    case "no":
      hint = "Ты отклонил предложение. Если передумаешь — рекрутер сможет отправить новый оффер.";
      buttons = null;
      break;
    case "dated":
      hint = `Нужно до ${fmtDay(DEMO.parkingDue)} — за 2 рабочих дня до выхода`;
      buttons = (
        <>
          <Button variant="secondary" tone="neutral" size="large" disabled>
            Оффер принят
          </Button>
          <Button tone="neutral" size="large" onClick={onParking}>
            Заполнить данные для парковки
          </Button>
        </>
      );
      break;
    default:
      buttons = (
        <>
          <Button variant="secondary" tone="neutral" size="large" onClick={onDecline}>
            Отклонить
          </Button>
          <Button tone="neutral" size="large" onClick={actions.accept}>
            Принять оффер
          </Button>
        </>
      );
  }

  return (
    <div
      ref={ref}
      className={`offer-actions grid gap-spacing-xl bg-base-surface-primary-block-normal ${stuck ? "offer-actions--stuck" : ""} ${visible ? "" : "offer-actions--hidden"}`}
    >
      {hint ? (
        <Typography.Body.ThreeR as="p" color="tertiary" className="m-0">
          {hint}
        </Typography.Body.ThreeR>
      ) : null}
      {buttons ? <div className="offer-actions__buttons grid gap-spacing-lg">{buttons}</div> : null}
      <div className="flex flex-wrap items-center justify-between gap-spacing-md">
        <Typography.Body.ThreeR as="p" color="disabled" className="m-0">
          {legal}
        </Typography.Body.ThreeR>
        <Link href="#pdf-download" size="medium" color="black" rightIcon={<UprightArrowLine16Icon aria-hidden="true" />} onClick={(e) => e.preventDefault()}>
          PDF-версия оффера
        </Link>
      </div>
    </div>
  );
}
