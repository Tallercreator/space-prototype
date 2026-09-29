import { Typography } from "@otp/space-ui-kit/typography";

import { asset, salary } from "./data";

function Part({
  value,
  caption,
  note,
}: {
  value: string;
  caption: string;
  note?: string;
}) {
  return (
    <span className="grid gap-spacing-xxs">
      <Typography.Body.ThreeM>{value}</Typography.Body.ThreeM>
      <Typography.Caption.OneR
        color="tertiary"
        className="offer-salary__caption"
      >
        {caption}
      </Typography.Caption.OneR>
      {note ? (
        <Typography.Caption.OneR
          color="limeBright"
          className="whitespace-nowrap"
        >
          {note}
        </Typography.Caption.OneR>
      ) : null}
    </span>
  );
}

/** Коэффициент: оранжевая плашка и подпись (Figma 289-127732). */
function Coefficient({ value, caption }: { value: string; caption: string }) {
  return (
    <span className="grid justify-items-start gap-spacing-xs">
      {/* На оранжевой плашке текст всегда белый — universal-токен, не зависит от темы */}
      <span className="offer-pill inline-flex items-center rounded-radius-rounded bg-colorfull-surface-primary-orange-normal px-spacing-md py-spacing-xxs text-universal-neutral-white">
        <Typography.Body.ThreeM color="inherit">{value}</Typography.Body.ThreeM>
      </span>
      <Typography.Caption.OneR
        color="tertiary"
        className="offer-salary__caption"
      >
        {caption}
      </Typography.Caption.OneR>
    </span>
  );
}

function Op({ children }: { children: string }) {
  return (
    <Typography.Body.ThreeR aria-hidden="true">
      {children}
    </Typography.Body.ThreeR>
  );
}

type FormulaPart = { value: string; caption: string; note?: string };

/** Формула в две серые карточки: слагаемые (или множители) слева, коэффициенты справа (Figma 289-127732). */
function Formula({
  title,
  parts,
  op,
  note,
}: {
  title: string;
  parts: FormulaPart[];
  op: "+" | "×";
  note?: string;
}) {
  return (
    <div className="grid gap-spacing-md">
      <Typography.Caption.OneR as="div" color="tertiary">
        {title}
      </Typography.Caption.OneR>
      <div className="offer-salary__formula flex items-center gap-spacing-lg">
        <div className="offer-salary__group flex items-center gap-spacing-lg rounded-radius-md bg-base-surface-tertiary-neutral-normal px-spacing-md py-spacing-md">
          {parts.map((part, i) => (
            <span
              key={part.caption}
              className="flex items-center gap-spacing-lg"
            >
              {i > 0 ? <Op>{op}</Op> : null}
              <Part {...part} />
            </span>
          ))}
        </div>
        <Op>×</Op>
        <div className="offer-salary__group flex items-center gap-spacing-md rounded-radius-md bg-base-surface-tertiary-neutral-normal px-spacing-md py-spacing-md">
          {salary.coefficients.map((c, i) => (
            <span key={c.caption} className="flex items-center gap-spacing-md">
              {i > 0 ? <Op>+</Op> : null}
              <Coefficient {...c} />
            </span>
          ))}
        </div>
      </div>
      {note ? (
        <Typography.Caption.OneR
          as="p"
          color="tertiary"
          className="offer-salary__note m-0"
        >
          {note}
        </Typography.Caption.OneR>
      ) : null}
    </div>
  );
}

/** Режим блока дохода: обычный или «только оклад» (#plain) — без формулы «из чего складывается». */
export type SalaryMode = "default" | "plain";

/** Блок дохода: плитки суммы/премии и формула «из чего складывается». */
export function Salary({ mode = "default" }: { mode?: SalaryMode }) {
  const bonus = salary.bonusDetailed;
  return (
    <section className="grid gap-spacing-xxxl" aria-label="Доход">
      <div className="grid gap-spacing-md">
        <Typography.Caption.OneR as="p" color="tertiary" className="m-0">
          {salary.taxNote}
        </Typography.Caption.OneR>
        <div className="offer-salary__tiles grid gap-spacing-md">
          <div className="offer-salary__main relative flex flex-col justify-center gap-spacing-xl overflow-hidden rounded-radius-md bg-base-surface-tertiary-neutral-normal p-spacing-lg">
            <Typography.Promo.SixM as="div">
              {salary.total}
            </Typography.Promo.SixM>
            <Typography.Caption.OneR
              as="div"
              color="tertiary"
              className="offer-salary__main-caption whitespace-pre-line"
            >
              {mode === "plain" ? salary.plainCaption : salary.totalCaption}
            </Typography.Caption.OneR>
            <img className="offer-salary__money" src={asset("money")} alt="" />
          </div>
          <div className="flex flex-col justify-between gap-spacing-xl rounded-radius-md bg-base-surface-secondary-standard-lime-normal p-spacing-lg">
            <Typography.Body.OneM as="div">{bonus.amount}</Typography.Body.OneM>
            <Typography.Caption.OneR
              as="div"
              color="tertiary"
              className="whitespace-pre-line"
            >
              {bonus.caption}
            </Typography.Caption.OneR>
          </div>
        </div>
      </div>
      {mode === "plain" ? null : (
        <Formula title={salary.breakdownTitle} parts={salary.parts} op="+" />
      )}
      <Formula
        title={bonus.formulaTitle}
        parts={bonus.parts}
        op="×"
        note={bonus.note}
      />
    </section>
  );
}
