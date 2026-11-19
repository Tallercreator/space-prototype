import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { CheckLine24Icon } from "@otp/space-ui-kit/icons/check-line-24";
import { DocumentCrossLine24Icon } from "@otp/space-ui-kit/icons/document-cross-line-24";
import { DocumentLine24Icon } from "@otp/space-ui-kit/icons/document-line-24";
import { Link } from "@otp/space-ui-kit/link";
import { Typography } from "@otp/space-ui-kit/typography";

import { recruiter } from "./data";

/** Фразы сменяют друг друга, пока документ грузится; первая — из макета. */
const PHRASES = [
  "Загружаем для тебя идеальный оффер",
  "Сверяем цифры до копейки",
  "Расставляем запятые по местам",
  "Проверяем, что всё как договаривались",
  "Добавляем немного заботы",
  "Ставим подписи и печати",
  "Разглаживаем уголки документа",
  "Команда уже ждёт тебя",
  "Осталось совсем чуть-чуть",
  "Почти готово — всё будет ОТП",
];

/** Сколько держится одна фраза, экран ожидания и финальное «Готово». В проде длительность задаёт реальная загрузка. */
const PHRASE_MS = 1600;
const SLOW_MS = 8000;
const DONE_MS = 1100;
/** Демо долгой загрузки и ошибки начинается с последних фраз, чтобы не ждать весь цикл. */
const TAIL_START = PHRASES.length - 3;

/**
 * normal — фразы и сразу документ;
 * slow — после фраз документа всё ещё нет: просим подождать и даём связь с рекрутером;
 * error — после фраз загрузка сорвалась: объясняем и предлагаем повторить.
 */
export type PdfLoadingMode = "normal" | "slow" | "error";
type Phase = "phrases" | "slow" | "done" | "error";

function phaseAt(step: number, mode: PdfLoadingMode): Phase {
  if (step < PHRASES.length) return "phrases";
  if (mode === "error") return "error";
  if (mode === "slow" && step === PHRASES.length) return "slow";
  return "done";
}

function titleAt(step: number, mode: PdfLoadingMode): string {
  switch (phaseAt(step, mode)) {
    case "phrases":
      return PHRASES[step];
    case "slow":
      return "Чуть дольше обычного, но мы на связи";
    case "error":
      return "Не получилось загрузить оффер";
    case "done":
      return "Готово, открываем";
  }
}

const SR_TEXT: Record<Phase, string> = {
  phrases: "Загружаем оффер, это займёт несколько секунд",
  slow: "Загрузка идёт дольше обычного. Можно подождать или написать рекрутеру",
  error: "Не получилось загрузить оффер. Можно попробовать ещё раз или написать рекрутеру",
  done: "Оффер загружен",
};

function Phrase({ text, leaving }: { text: string; leaving?: boolean }) {
  return (
    <span
      className={`offer-loading__phrase ${leaving ? "offer-loading__phrase--out" : ""}`}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="offer-loading__word"
          style={{ "--i": i } as React.CSSProperties}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

function RecruiterLink() {
  return (
    <Link
      href={`https://t.me/${recruiter.telegram.replace(/^@/, "")}`}
      target="_blank"
      rel="noreferrer"
      size="medium"
      color="black"
    >
      Написать рекрутеру
    </Link>
  );
}

/**
 * Загрузка PDF-оффера: кольцо прогресса с иконкой документа и фразы,
 * которые перелистываются по словам. В конце кольцо замыкается,
 * иконка сменяется галочкой, и открывается документ.
 */
export function PdfLoading({
  mode = "normal",
  onDone,
  onRetry,
}: {
  mode?: PdfLoadingMode;
  onDone: () => void;
  onRetry: () => void;
}) {
  const start = mode === "normal" ? 0 : TAIL_START;
  const [step, setStep] = React.useState(start);
  const phase = phaseAt(step, mode);

  React.useEffect(() => {
    if (phase === "error") return;
    const id = window.setTimeout(
      () => (phase === "done" ? onDone() : setStep((s) => s + 1)),
      phase === "done" ? DONE_MS : phase === "slow" ? SLOW_MS : PHRASE_MS,
    );
    return () => window.clearTimeout(id);
  }, [step, phase, onDone]);

  return (
    <div
      className={`offer-loading offer-loading--${phase} grid justify-items-center gap-spacing-xxxl text-center`}
      style={
        {
          "--offer-loading-ms": `${PHRASES.length * PHRASE_MS}ms`,
          "--offer-loading-skip": `${-start * PHRASE_MS}ms`,
        } as React.CSSProperties
      }
    >
      {/* Скринридеру — одно спокойное сообщение на состояние, а не десять сменяющихся фраз. */}
      <span className="offer-loading__sr" role={phase === "error" ? "alert" : "status"}>
        {SR_TEXT[phase]}
      </span>

      <div className="offer-loading__badge" aria-hidden="true">
        <svg className="offer-loading__ring" viewBox="0 0 88 88">
          <circle className="offer-loading__track" cx="44" cy="44" r="40" />
          <circle
            className="offer-loading__progress"
            cx="44"
            cy="44"
            r="40"
            pathLength="100"
          />
        </svg>
        <span className="offer-loading__tile flex items-center justify-center rounded-radius-lg">
          <span className="offer-loading__icon offer-loading__icon--doc">
            <DocumentLine24Icon />
          </span>
          <span className="offer-loading__icon offer-loading__icon--check">
            <CheckLine24Icon />
          </span>
          <span className="offer-loading__icon offer-loading__icon--error">
            <DocumentCrossLine24Icon />
          </span>
        </span>
      </div>

      <div className="grid justify-items-center gap-spacing-md">
        <Typography.Title.OneM as="div" className="offer-loading__stage" aria-hidden="true">
          {step > start ? (
            <Phrase key={`out-${step}`} text={titleAt(step - 1, mode)} leaving />
          ) : null}
          <Phrase key={`in-${step}`} text={titleAt(step, mode)} />
        </Typography.Title.OneM>
        {phase === "slow" ? (
          <div key="slow" className="offer-loading__note grid justify-items-center gap-spacing-lg">
            <Typography.Body.ThreeR color="tertiary">
              Документ вот-вот откроется. Если ждать неудобно — рекрутер пришлёт его сам
            </Typography.Body.ThreeR>
            <RecruiterLink />
          </div>
        ) : phase === "error" ? (
          <div key="error" className="offer-loading__note grid justify-items-center gap-spacing-xxl">
            <Typography.Body.ThreeR color="tertiary">
              Такое бывает. Условия оффера сохранены и не изменятся — попробуй открыть его ещё раз
            </Typography.Body.ThreeR>
            <div className="grid justify-items-center gap-spacing-xl">
              <Button tone="neutral" size="large" onClick={onRetry}>
                Попробовать ещё раз
              </Button>
              <RecruiterLink />
            </div>
          </div>
        ) : (
          <Typography.Body.ThreeR color="tertiary" aria-hidden="true">
            Обычно это занимает несколько секунд
          </Typography.Body.ThreeR>
        )}
      </div>
    </div>
  );
}
