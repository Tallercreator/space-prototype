import { Typography } from "@otp/space-ui-kit/typography";

import { asset, salary, massSalary, hoSalary } from "./data";
import { usePackage } from "./package";

function Part({ value, caption, note }: { value: string; caption: string; note?: string }) {
  return (
    <span className="offer-salary__part grid gap-spacing-xxs">
      <Typography.Body.ThreeM>{value}</Typography.Body.ThreeM>
      <Typography.Caption.OneR color="tertiary" className="offer-salary__caption">
        {caption}
      </Typography.Caption.OneR>
      {note ? (
        <Typography.Caption.OneR
          color="limeBright"
          className="offer-salary__part-note whitespace-nowrap"
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
      <Typography.Caption.OneR color="tertiary" className="offer-salary__caption">
        {caption}
      </Typography.Caption.OneR>
    </span>
  );
}

function Op({ children }: { children: string }) {
  return <Typography.Body.ThreeR aria-hidden="true">{children}</Typography.Body.ThreeR>;
}

type FormulaPart = { value: string; caption: string; note?: string };

/** Формула в две серые карточки: слагаемые (или множители) слева, коэффициенты справа (Figma 289-127732). */
function Formula({
  title,
  parts,
  op,
  note,
  variant = "standard",
}: {
  title: string;
  parts: FormulaPart[];
  op: "+" | "×";
  note?: string;
  variant?: "standard" | "detailed";
}) {
  const Title = variant === "detailed" ? Typography.Caption.OneM : Typography.Caption.OneR;
  return (
    <div
      className={`offer-salary__breakdown grid ${variant === "detailed" ? "gap-spacing-lg" : "gap-spacing-md"}`}
    >
      <Title as="div" color="tertiary">
        {title}
      </Title>
      <div className="offer-salary__formula flex items-center gap-spacing-lg">
        <div className="offer-salary__group flex items-center gap-spacing-lg rounded-radius-md bg-base-surface-tertiary-neutral-normal px-spacing-md py-spacing-md">
          {parts.map((part, i) => (
            <span key={part.caption} className="flex items-center gap-spacing-lg">
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
        <Typography.Caption.OneR as="p" color="tertiary" className="offer-salary__note m-0">
          {note}
        </Typography.Caption.OneR>
      ) : null}
    </div>
  );
}

/** Режим блока дохода: по умолчанию один оклад без формулы, «formula» (#formula) — с формулой «из чего складывается». */
export type SalaryMode = "default" | "formula";

/** Блок дохода: плитки суммы/премии и формула «из чего складывается». */
export function Salary({ mode = "default" }: { mode?: SalaryMode }) {
  const { segment } = usePackage();
  const detailed = segment === "mass" || segment === "ho";
  const content = segment === "ho" ? hoSalary : segment === "mass" ? massSalary : salary;
  const bonus = content.bonusDetailed;
  const Caption = detailed ? Typography.Caption.OneM : Typography.Caption.OneR;
  return (
    <section
      className={`offer-salary grid gap-spacing-xxxl ${detailed ? `offer-salary--${segment}` : ""}`}
      aria-label="Доход"
    >
      <div className={`grid ${detailed ? "gap-spacing-lg" : "gap-spacing-md"}`}>
        <Caption as="p" color="tertiary" className="m-0">
          {content.taxNote}
        </Caption>
        <div className="offer-salary__tiles grid gap-spacing-md">
          <div className="offer-salary__main relative flex flex-col justify-center gap-spacing-xl overflow-hidden rounded-radius-md bg-base-surface-tertiary-neutral-normal p-spacing-lg">
            <Typography.Promo.SixM as="div">{salary.total}</Typography.Promo.SixM>
            <Caption
              as="div"
              color="tertiary"
              className="offer-salary__main-caption whitespace-pre-line"
            >
              {detailed || mode === "formula" ? content.totalCaption : content.plainCaption}
            </Caption>
            <img className="offer-salary__money" src={asset("money")} alt="" />
          </div>
          <div className="offer-salary__bonus flex flex-col justify-between gap-spacing-xl rounded-radius-md bg-base-surface-secondary-standard-lime-normal p-spacing-lg">
            <Typography.Title.TwoM as="div" className="whitespace-pre-line">
              {bonus.rate}
            </Typography.Title.TwoM>
            <Typography.Caption.OneR as="div" color="tertiary" className="whitespace-pre-line">
              {bonus.caption}
            </Typography.Caption.OneR>
          </div>
        </div>
      </div>
      {detailed || mode === "formula" ? (
        <Formula
          title={content.breakdownTitle}
          parts={content.parts}
          op={detailed ? "×" : "+"}
          variant={detailed ? "detailed" : "standard"}
        />
      ) : null}
      <Formula
        title={bonus.formulaTitle}
        parts={bonus.parts}
        op="×"
        note={bonus.note}
        variant={detailed ? "detailed" : "standard"}
      />
    </section>
  );
}
