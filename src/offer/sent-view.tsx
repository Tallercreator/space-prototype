import { Button } from "@otp/space-ui-kit/button";
import { CheckLine24Icon } from "@otp/space-ui-kit/icons/check-line-24";
import { Typography } from "@otp/space-ui-kit/typography";

import { DEMO, fmtDay, fmtRange } from "./data";
import type { OfferActions, OfferState } from "./state";

/** Экран «что дальше» после принятия оффера и отправки пожелания по дате. */
export function SentView({ state, actions }: { state: OfferState; actions: OfferActions }) {
  const wish = state.wish;
  const text =
    wish === undefined || wish === null
      ? "Дату выхода ты обсудишь с рекрутером напрямую."
      : wish.asap
        ? "Ты готов выйти как можно раньше — рекрутер предложит ближайшую дату."
        : `Пожелание по дате выхода отправлено: ${fmtRange(wish.from, wish.to)}.`;

  const steps = [
    { n: 1, title: "Оффер принят", caption: fmtDay(DEMO.acceptedOn), state: "done" as const },
    { n: 2, title: "Рекрутер согласует дату выхода", caption: "Напишет в течение двух рабочих дней", state: "now" as const },
    { n: 3, title: "Данные для пропуска на парковку", caption: "Откроется после подтверждения даты", state: "next" as const },
    { n: 4, title: "Оформление документов", caption: "Отдельно, перед выходом", state: "next" as const },
  ];

  return (
    <section className="offer-sent grid justify-items-center gap-spacing-xxxl" aria-labelledby="sent-title">
      <div className="grid justify-items-center gap-spacing-xl pt-spacing-xxxl text-center">
        <span className="flex size-size-xxl items-center justify-center rounded-radius-rounded bg-base-surface-primary-lime-normal">
          <CheckLine24Icon aria-hidden="true" />
        </span>
        <div className="grid gap-spacing-md">
          <Typography.Title.OneM as="h2" id="sent-title" className="m-0">
            Ты принял предложение
          </Typography.Title.OneM>
          <Typography.Body.ThreeR as="p" color="secondary" className="m-0">
            {text}
          </Typography.Body.ThreeR>
        </div>
      </div>
      <ol className="offer-sent__list m-0 grid w-full list-none gap-spacing-xl rounded-radius-lg bg-base-surface-tertiary-neutral-normal p-spacing-xl">
        {steps.map((s) => (
          <li key={s.n} className="flex items-center gap-spacing-lg">
            <span
              className={`flex size-size-sm shrink-0 items-center justify-center rounded-radius-md ${
                s.state === "next" ? "bg-base-surface-secondary-contrast-neutral-normal" : "bg-base-surface-primary-lime-normal"
              }`}
            >
              <Typography.Body.ThreeM>{s.n}</Typography.Body.ThreeM>
            </span>
            <span className="grid gap-spacing-xxs">
              <Typography.Body.TwoM color={s.state === "next" ? "tertiary" : "primary"}>{s.title}</Typography.Body.TwoM>
              <Typography.Caption.OneR color="tertiary">{s.caption}</Typography.Caption.OneR>
            </span>
          </li>
        ))}
      </ol>
      <div className="offer-actions__buttons grid w-full gap-spacing-lg">
        <Button variant="secondary" tone="neutral" size="large" onClick={actions.backToOffer}>
          Вернуться к офферу
        </Button>
        <Button tone="neutral" size="large" onClick={actions.backToOffer}>
          Понятно
        </Button>
      </div>
    </section>
  );
}
