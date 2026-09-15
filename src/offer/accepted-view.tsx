import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { StarFill16Icon } from "@otp/space-ui-kit/icons/star-fill-16";
import { TextAreaGroup, TextAreaGroupControl, TextAreaGroupLabel } from "@otp/space-ui-kit/textarea";
import { Typography } from "@otp/space-ui-kit/typography";

import { asset } from "./data";

const STARS = [1, 2, 3, 4, 5];
const STAR_LABELS = ["Совсем неудобно", "Неудобно", "Нормально", "Удобно", "Очень удобно"];

/**
 * Экран после «Принять оффер» (Figma 217-101766, после отправки — 221-103690):
 * подтверждение по центру, ниже карточка оценки 408px — вопрос, пояснение,
 * звёзды с подписью выбранного значения, textarea «Поделись мнением», кнопка.
 */
export function AcceptedView() {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [needRating, setNeedRating] = React.useState(false);
  const shown = hover || rating;
  const valueLabel = shown ? STAR_LABELS[shown - 1] : needRating ? "Поставь оценку — это обязательно" : "\u00a0";

  return (
    <section className="offer-accepted grid justify-items-center gap-spacing-exxxs" aria-labelledby="accepted-title">
      <div className="grid justify-items-center gap-spacing-lg text-center">
        <div className="grid justify-items-center gap-spacing-xxxl">
          <img className="offer-accepted__heart" src={asset("heart")} alt="" />
          <Typography.Heading.TwoM as="h2" id="accepted-title" className="offer-accepted__title m-0">
            Оффер принят, рекрутер свяжется
            <br />с тобой для обсуждения даты выхода!
          </Typography.Heading.TwoM>
        </div>
        <Typography.Body.TwoR as="p" color="secondary" className="m-0">
          Мы очень рады, что ты принял решение
          <br />и уже очень ждём тебя в команде
        </Typography.Body.TwoR>
      </div>

      {sent ? (
        <div className="offer-feedback offer-feedback--sent grid gap-spacing-md rounded-radius-lg bg-base-surface-tertiary-neutral-normal p-spacing-xxxl" role="status">
          <Typography.Body.OneSB>Спасибо! Оценка отправлена</Typography.Body.OneSB>
          <Typography.Body.TwoR color="tertiary">Она поможет нам сделать оффер удобнее</Typography.Body.TwoR>
        </div>
      ) : (
        <div className="offer-feedback grid gap-spacing-exxxxs rounded-radius-lg bg-base-surface-tertiary-neutral-normal p-spacing-xxxl" aria-labelledby="feedback-title">
          <div className="grid gap-spacing-md">
            <Typography.Body.OneSB as="h3" id="feedback-title" className="m-0">
              Насколько удобно было принять оффер?
            </Typography.Body.OneSB>
            <Typography.Body.TwoR as="p" color="tertiary" className="m-0">
              Твоя оценка поможет нам улучшить процесс
            </Typography.Body.TwoR>
          </div>

          <div className="grid gap-spacing-xxxl">
            <div className="grid gap-spacing-md">
              <div className="flex gap-spacing-xs" role="radiogroup" aria-label="Оценка от 1 до 5" aria-required="true" aria-invalid={needRating && !rating} aria-describedby="feedback-value" onMouseLeave={() => setHover(0)}>
                {STARS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} из 5 — ${STAR_LABELS[n - 1]}`}
                    className={`offer-star flex cursor-pointer items-center justify-center rounded-radius-sm border-0 p-0 ${
                      n <= shown ? "bg-base-surface-primary-lime-normal text-base-texticons-primary" : "bg-base-surface-secondary-contrast-lime-normal text-base-texticons-lime-bright"
                    }`}
                    onMouseEnter={() => setHover(n)}
                    onFocus={() => setHover(n)}
                    onBlur={() => setHover(0)}
                    onClick={() => {
                      setRating(n);
                      setNeedRating(false);
                    }}
                  >
                    <StarFill16Icon aria-hidden="true" />
                  </button>
                ))}
              </div>
              <Typography.Body.ThreeR color="tertiary" className="offer-feedback__value" id="feedback-value" aria-live="polite">
                {shown ? STAR_LABELS[shown - 1] : " "}
              </Typography.Body.ThreeR>
            </div>
            <TextAreaGroup surface="contrast" height="one-to-four" className="offer-feedback__comment">
              <TextAreaGroupLabel>Поделись мнением</TextAreaGroupLabel>
              <TextAreaGroupControl value={comment} onChange={(e) => setComment(e.target.value)} maxLength={500} />
            </TextAreaGroup>
          </div>

          <div className="flex">
            <Button size="large" tone="neutral" onClick={() => (rating ? setSent(true) : setNeedRating(true))}>
              Отправить оценку
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
