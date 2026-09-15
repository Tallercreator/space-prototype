import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { Link } from "@otp/space-ui-kit/link";
import { UprightArrowLine16Icon } from "@otp/space-ui-kit/icons/upright-arrow-line-16";
import { Typography } from "@otp/space-ui-kit/typography";

import { DEMO, fmtDay, fmtRange, legal } from "./data";
import type { OfferActions, OfferState } from "./state";

/** Панель показывается, когда баннер прокручен: наверху страницы она не перекрывает условия. */
function useScrolledPast(threshold: number): boolean {
  const [past, setPast] = React.useState(() => window.scrollY > threshold);
  React.useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);
  return past;
}

function wishText(state: OfferState): string {
  if (state.wish === undefined) return "Дату выхода ты обсудишь с рекрутером напрямую.";
  if (state.wish === null) return "Дату выхода ты обсудишь с рекрутером напрямую.";
  if (state.wish.asap) return "Ты готов выйти как можно раньше — рекрутер предложит ближайшую дату.";
  return `Пожелание по дате выхода отправлено: ${fmtRange(state.wish.from, state.wish.to)}. Рекрутер подтвердит точную дату.`;
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
  const scrolled = useScrolledPast(240);
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
    case "ok":
      hint = wishText(state);
      buttons = (
        <>
          <Button variant="secondary" tone="neutral" size="large" onClick={actions.editWish}>
            Изменить пожелание
          </Button>
          <Button tone="neutral" size="large" disabled>
            Данные для парковки
          </Button>
        </>
      );
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
    <div className={`offer-actions grid gap-spacing-xxxl bg-base-surface-primary-block-normal ${scrolled ? "" : "offer-actions--hidden"}`}>
      <div className="grid justify-items-center gap-spacing-xxxl">
        {hint ? (
          <Typography.Body.ThreeR as="p" color="tertiary" className="m-0 text-center">
            {hint}
          </Typography.Body.ThreeR>
        ) : null}
        {buttons ? <div className="offer-actions__buttons grid w-full gap-spacing-lg">{buttons}</div> : null}
        <Link href="#pdf-download" size="large" color="black" rightIcon={<UprightArrowLine16Icon aria-hidden="true" />} onClick={(e) => e.preventDefault()}>
          Скачать PDF-версию оффера
        </Link>
      </div>
      <Typography.Body.TwoR as="p" color="disabled" className="m-0 text-center">
        {legal}
      </Typography.Body.TwoR>
    </div>
  );
}
