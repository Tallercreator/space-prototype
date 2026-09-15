import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { Chip } from "@otp/space-ui-kit/chip";
import { IconButton } from "@otp/space-ui-kit/icon-button";
import { ChevronLeftLine24Icon } from "@otp/space-ui-kit/icons/chevron-left-line-24";
import { ChevronRightLine24Icon } from "@otp/space-ui-kit/icons/chevron-right-line-24";
import { Link } from "@otp/space-ui-kit/link";
import { Typography } from "@otp/space-ui-kit/typography";

import { DEMO, candidate, fmtDay, positions } from "./data";

const TOTAL = 2;

function Page({ n }: { n: 1 | 2 }) {
  const position = positions.pdf;
  return (
    <div className="offer-pdf__page relative rounded-radius-xs bg-base-surface-primary-block-normal" aria-label={`Страница ${n} из ${TOTAL}`}>
      <span className="offer-pdf__watermark" aria-hidden="true">
        Для {candidate.fullName} · otpspace.ru · {DEMO.today.toLocaleDateString("ru-RU")}
      </span>
      {n === 1 ? (
        <>
          <div className="offer-pdf__lime grid gap-spacing-sm bg-base-surface-primary-lime-normal p-spacing-xxxl">
            <Typography.Body.OneM>
              {candidate.firstName}, мы приглашаем тебя на позицию
              <br />
              {position.title}
            </Typography.Body.OneM>
            <Typography.Caption.OneR color="secondary">
              {position.department} · Предложение от {fmtDay(DEMO.today)} 2026
            </Typography.Caption.OneR>
          </div>
          <div className="grid gap-spacing-md p-spacing-xxxl">
            <Typography.Caption.OneR>
              <b>Ответь до {fmtDay(DEMO.deadline)}.</b> Условия зафиксированы и не изменятся, пока ты думаешь.
            </Typography.Caption.OneR>
            <Typography.Caption.OneM>Условия</Typography.Caption.OneM>
            <Lines pattern={["f", "f", "t", "s", "f", "t", "s"]} />
          </div>
        </>
      ) : (
        <div className="grid gap-spacing-md p-spacing-xxxl">
          <Typography.Caption.OneM>Льготы и привилегии</Typography.Caption.OneM>
          <Lines pattern={["f", "t", "s", "f", "t", "s"]} />
          <Typography.Caption.OneM className="pt-spacing-md">Что дальше</Typography.Caption.OneM>
          <Lines pattern={["t", "s"]} />
          <Typography.Caption.OneR className="pt-spacing-lg">
            С уважением,
            <br />
            Директор департамента по работе с персоналом
          </Typography.Caption.OneR>
        </div>
      )}
      <Typography.Caption.TwoR color="tertiary" className="offer-pdf__num">
        {n} / {TOTAL}
      </Typography.Caption.TwoR>
    </div>
  );
}

function Lines({ pattern }: { pattern: Array<"f" | "t" | "s"> }) {
  return (
    <div className="grid gap-spacing-sm" aria-hidden="true">
      {pattern.map((p, i) => (
        <span key={i} className={`offer-pdf__line offer-pdf__line--${p} rounded-radius-xxs bg-base-surface-secondary-contrast-neutral-normal`} />
      ))}
    </div>
  );
}

/** Сценарий Б: оффер как PDF — страницы отрисованы сервером в картинки; лента или слайдер. */
export function PdfView({ failed }: { failed: boolean }) {
  const [mode, setMode] = React.useState<"feed" | "slider">("feed");
  const [current, setCurrent] = React.useState(0);
  const [feedPage, setFeedPage] = React.useState(1);
  const feedRef = React.useRef<HTMLDivElement>(null);

  const onFeedScroll = () => {
    const feed = feedRef.current;
    if (!feed) return;
    const pages = Array.from(feed.querySelectorAll<HTMLElement>(".offer-pdf__page"));
    const mid = feed.scrollTop + feed.clientHeight / 2;
    let n = 1;
    pages.forEach((p, k) => {
      if (p.offsetTop - feed.offsetTop < mid) n = k + 1;
    });
    setFeedPage(n);
  };

  return (
    <section className="grid gap-spacing-xl" aria-label="Предложение о работе">
      <div className="offer-pdf overflow-hidden rounded-radius-md border border-base-border-standard-neutral-normal">
        <div className="offer-pdf__toolbar flex flex-wrap items-center justify-between gap-spacing-md border-b border-base-border-standard-neutral-normal bg-base-surface-primary-block-normal px-spacing-lg py-spacing-md">
          <Typography.Body.ThreeR color="secondary">Предложение о работе · {TOTAL} стр.</Typography.Body.ThreeR>
          {!failed ? (
            <div className="flex gap-spacing-xs" role="group" aria-label="Режим просмотра">
              <Chip size="small" selected={mode === "feed"} onClick={() => setMode("feed")}>
                Лента
              </Chip>
              <Chip size="small" selected={mode === "slider"} onClick={() => setMode("slider")}>
                Слайдер
              </Chip>
            </div>
          ) : null}
          <div className="flex gap-spacing-xl">
            <Link href="#fullscreen" size="small" color="black" onClick={(e) => e.preventDefault()}>
              На весь экран
            </Link>
            <Link href="#download" size="small" color="black" onClick={(e) => e.preventDefault()}>
              Скачать PDF
            </Link>
          </div>
        </div>
        {failed ? (
          <div className="grid justify-items-center gap-spacing-xl bg-base-surface-primary-background px-spacing-xxxl py-spacing-exxxs text-center">
            <div className="grid gap-spacing-sm">
              <Typography.Body.TwoM>Не удалось показать документ</Typography.Body.TwoM>
              <Typography.Body.ThreeR color="secondary">Открой файл в приложении для PDF — условия оффера в нём.</Typography.Body.ThreeR>
            </div>
            <Button variant="secondary" tone="neutral" size="medium">
              Открыть файл
            </Button>
          </div>
        ) : mode === "feed" ? (
          <div ref={feedRef} onScroll={onFeedScroll} className="offer-pdf__feed relative grid justify-items-center gap-spacing-lg overflow-auto bg-base-surface-primary-background p-spacing-xl">
            <Page n={1} />
            <Page n={2} />
            <span className="offer-pdf__counter sticky bottom-unit-0 rounded-radius-rounded px-spacing-lg py-spacing-xs">
              <Typography.Caption.OneR color="invert">
                Стр. {feedPage} из {TOTAL}
              </Typography.Caption.OneR>
            </span>
          </div>
        ) : (
          <div className="offer-pdf__slider relative overflow-hidden bg-base-surface-primary-background p-spacing-xl">
            <div className="offer-pdf__track flex" style={{ transform: `translateX(-${current * 100}%)` }}>
              <div className="offer-pdf__slide flex justify-center overflow-auto">
                <Page n={1} />
              </div>
              <div className="offer-pdf__slide flex justify-center overflow-auto">
                <Page n={2} />
              </div>
            </div>
            <IconButton aria-label="Предыдущая страница" size="medium" variant="secondary" tone="neutral" className="offer-pdf__nav offer-pdf__nav--prev" disabled={current === 0} onClick={() => setCurrent((c) => Math.max(0, c - 1))}>
              <ChevronLeftLine24Icon aria-hidden="true" />
            </IconButton>
            <IconButton aria-label="Следующая страница" size="medium" variant="secondary" tone="neutral" className="offer-pdf__nav offer-pdf__nav--next" disabled={current === TOTAL - 1} onClick={() => setCurrent((c) => Math.min(TOTAL - 1, c + 1))}>
              <ChevronRightLine24Icon aria-hidden="true" />
            </IconButton>
            <span className="offer-pdf__counter offer-pdf__counter--slider rounded-radius-rounded px-spacing-lg py-spacing-xs">
              <Typography.Caption.OneR color="invert">
                {current + 1} / {TOTAL}
              </Typography.Caption.OneR>
            </span>
          </div>
        )}
      </div>
      {!failed ? (
        <Typography.Body.ThreeR as="p" color="tertiary" className="m-0 text-center">
          Страницы отрисованы как изображения — текст не копируется. Нужен оригинал — «Скачать PDF».
        </Typography.Body.ThreeR>
      ) : null}
    </section>
  );
}
