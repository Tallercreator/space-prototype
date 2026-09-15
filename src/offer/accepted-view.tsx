import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { CheckLine16Icon } from "@otp/space-ui-kit/icons/check-line-16";
import { StarFill16Icon } from "@otp/space-ui-kit/icons/star-fill-16";
import { TextAreaGroup, TextAreaGroupControl, TextAreaGroupLabel } from "@otp/space-ui-kit/textarea";
import { Typography } from "@otp/space-ui-kit/typography";

import { asset } from "./data";

const STARS = [1, 2, 3, 4, 5];
const STAR_LABELS = ["Совсем неудобно", "Неудобно", "Нормально", "Удобно", "Очень удобно"];

/**
 * Экран после «Принять оффер» (Figma 217-96246 / 217-101827).
 * Подтверждение — по центру; оценка — отдельной карточкой ниже: вопрос,
 * шкала звёзд с подписями крайних значений, комментарий появляется после выбора
 * оценки, кнопка — в карточке справа. Всё необязательно, после отправки — «Спасибо».
 */
export function AcceptedView() {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const shown = hover || rating;

  return (
    <section className="offer-accepted grid justify-items-center gap-spacing-exxs" aria-labelledby="accepted-title">
      <div className="grid justify-items-center gap-spacing-lg text-center">
        <div className="grid justify-items-center gap-spacing-xxxl">
          <img className="offer-accepted__heart" src={asset("heart")} alt="" />
          <Typography.Heading.TwoM as="h2" id="accepted-title" className="offer-accepted__title m-0">
            Оффер принят, рекрутер свяжется
            <br />с тобой для обсуждения даты выхода!
          </Typography.Heading.TwoM>
        </div>
        <Typography.Body.TwoM as="p" color="secondary" className="m-0">
          Мы очень рады, что ты принял решение
          <br />и уже очень ждём тебя в команде
        </Typography.Body.TwoM>
      </div>

      <div className="offer-feedback grid gap-spacing-xxxl rounded-radius-lg bg-base-surface-tertiary-neutral-normal p-spacing-xxxl" aria-labelledby="feedback-title">
        {sent ? (
          <div className="flex items-center gap-spacing-lg" role="status">
            <span className="flex size-size-sm shrink-0 items-center justify-center rounded-radius-rounded bg-base-surface-primary-lime-normal">
              <CheckLine16Icon aria-hidden="true" />
            </span>
            <span className="grid gap-spacing-xxs">
              <Typography.Body.TwoSB>Спасибо, оценка отправлена</Typography.Body.TwoSB>
              <Typography.Body.ThreeR color="tertiary">Она поможет сделать оффер удобнее для следующих кандидатов</Typography.Body.ThreeR>
            </span>
          </div>
        ) : (
          <>
            <div className="grid gap-spacing-xs">
              <Typography.Body.TwoSB as="h3" id="feedback-title" className="m-0">
                Насколько удобно было принять оффер?
              </Typography.Body.TwoSB>
              <Typography.Body.ThreeR as="p" color="tertiary" className="m-0">
                Необязательно, займёт полминуты
              </Typography.Body.ThreeR>
            </div>

            <div className="grid gap-spacing-md">
              <div className="flex gap-spacing-xs" role="radiogroup" aria-label="Оценка от 1 до 5" onMouseLeave={() => setHover(0)}>
                {STARS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={`${n} из 5 — ${STAR_LABELS[n - 1]}`}
                    className={`offer-star flex cursor-pointer items-center justify-center rounded-radius-sm border-0 p-0 ${
                      n <= shown ? "bg-base-surface-primary-lime-normal text-base-texticons-primary" : "bg-base-surface-secondary-standard-lime-normal text-base-texticons-lime-bright"
                    }`}
                    onMouseEnter={() => setHover(n)}
                    onFocus={() => setHover(n)}
                    onBlur={() => setHover(0)}
                    onClick={() => setRating(n)}
                  >
                    <StarFill16Icon aria-hidden="true" />
                  </button>
                ))}
              </div>
              <div className="offer-feedback__scale flex justify-between" aria-hidden="true">
                <Typography.Caption.OneR color="tertiary">{shown ? STAR_LABELS[shown - 1] : "Совсем неудобно"}</Typography.Caption.OneR>
                {!shown ? <Typography.Caption.OneR color="tertiary">Очень удобно</Typography.Caption.OneR> : null}
              </div>
            </div>

            {rating > 0 ? (
              <div className="grid gap-spacing-xl">
                <TextAreaGroup surface="contrast" height="one-to-four">
                  <TextAreaGroupLabel>Что было удобно или мешало? Необязательно</TextAreaGroupLabel>
                  <TextAreaGroupControl value={comment} onChange={(e) => setComment(e.target.value)} maxLength={500} />
                </TextAreaGroup>
                <div className="flex justify-end">
                  <Button size="large" tone="neutral" onClick={() => setSent(true)}>
                    Отправить оценку
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
