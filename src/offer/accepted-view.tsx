import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { StarFill16Icon } from "@otp/space-ui-kit/icons/star-fill-16";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@otp/space-ui-kit/input-group";
import { Typography } from "@otp/space-ui-kit/typography";

import { asset } from "./data";

const STARS = [1, 2, 3, 4, 5];

/** Экран после «Принять оффер» (Figma 217-96246): подтверждение и оценка удобства. */
export function AcceptedView() {
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const shown = hover || rating;

  return (
    <section className="offer-accepted grid justify-items-center gap-spacing-emd" aria-labelledby="accepted-title">
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

      {sent ? (
        <div className="grid justify-items-center gap-spacing-xs text-center" role="status">
          <Typography.Body.TwoSB>Спасибо за оценку!</Typography.Body.TwoSB>
          <Typography.Body.ThreeR color="tertiary">Твой отзыв поможет сделать оффер удобнее</Typography.Body.ThreeR>
        </div>
      ) : (
        <div className="grid justify-items-center gap-spacing-xl">
          <Typography.Body.TwoSB as="p" className="m-0 text-center">
            Оцени, насколько тебе было удобно принять оффер
          </Typography.Body.TwoSB>
          <div className="grid justify-items-center gap-spacing-xl">
            <div className="flex gap-spacing-xs" role="radiogroup" aria-label="Оценка от 1 до 5" onMouseLeave={() => setHover(0)}>
              {STARS.map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} из 5`}
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
            <InputGroup size="large" surface="contrast" className="offer-accepted__comment">
              <InputGroupInput placeholder="Оставь свой комментарий" value={comment} onChange={(e) => setComment(e.target.value)} aria-label="Комментарий" />
              <InputGroupAddon align="inline-end">
                <Button size="small" tone="neutral" disabled={rating === 0} onClick={() => setSent(true)}>
                  Оценить
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      )}
    </section>
  );
}
