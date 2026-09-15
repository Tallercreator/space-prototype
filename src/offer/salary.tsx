import { Typography } from "@otp/space-ui-kit/typography";

import { asset, salary } from "./data";

function Part({ value, caption }: { value: string; caption: string }) {
  return (
    <span className="grid gap-spacing-xxs">
      <Typography.Body.ThreeM>{value}</Typography.Body.ThreeM>
      <Typography.Caption.TwoR color="tertiary" className="offer-salary__caption">
        {caption}
      </Typography.Caption.TwoR>
    </span>
  );
}

function Coefficient({ value, caption }: { value: string; caption: string }) {
  return (
    <span className="flex items-center gap-spacing-sm">
      <span className="offer-pill inline-flex items-center rounded-radius-rounded bg-colorfull-surface-primary-orange-normal px-spacing-sm py-spacing-xxs">
        <Typography.Caption.TwoM color="invert">{value}</Typography.Caption.TwoM>
      </span>
      <Typography.Caption.TwoR color="tertiary" className="offer-salary__caption">
        {caption}
      </Typography.Caption.TwoR>
    </span>
  );
}

function Op({ children }: { children: string }) {
  return (
    <Typography.Body.ThreeM color="secondary" aria-hidden="true">
      {children}
    </Typography.Body.ThreeM>
  );
}

/** Блок дохода: плитки суммы/бонуса/гаранта и формула «из чего складывается». */
export function Salary() {
  return (
    <section className="grid gap-spacing-xxxl" aria-label="Доход">
      <div className="offer-salary__tiles grid gap-spacing-md">
        <div className="offer-salary__main relative flex flex-col justify-center gap-spacing-xl overflow-hidden rounded-radius-md border border-base-border-standard-neutral-normal bg-base-surface-primary-block-normal p-spacing-lg">
          <Typography.Promo.SixM as="div">{salary.total}</Typography.Promo.SixM>
          <Typography.Caption.OneR as="div" color="tertiary" className="offer-salary__main-caption">
            {salary.totalCaption}
          </Typography.Caption.OneR>
          <img className="offer-salary__money" src={asset("money")} alt="" />
        </div>
        <div className="flex flex-col justify-between gap-spacing-xl rounded-radius-md bg-base-surface-secondary-standard-lime-normal p-spacing-lg">
          <Typography.Body.OneM as="div">{salary.bonus.value}</Typography.Body.OneM>
          <Typography.Caption.OneR as="div" color="tertiary">
            {salary.bonus.caption}
          </Typography.Caption.OneR>
        </div>
        <div className="flex flex-col justify-between gap-spacing-xl rounded-radius-md bg-colorfull-surface-secondary-standard-purple-normal p-spacing-lg">
          <Typography.Body.OneM as="div">{salary.newcomer.value}</Typography.Body.OneM>
          <Typography.Caption.OneR as="div" color="tertiary">
            {salary.newcomer.caption}
          </Typography.Caption.OneR>
        </div>
      </div>
      <div className="grid gap-spacing-md pl-spacing-lg">
        <Typography.Body.ThreeR as="div" color="tertiary">
          {salary.breakdownTitle}
        </Typography.Body.ThreeR>
        <div className="flex flex-wrap items-center gap-spacing-lg">
          <div className="flex flex-wrap items-center gap-spacing-md">
            {salary.parts.map((part, i) => (
              <span key={part.caption + i} className="flex items-center gap-spacing-md">
                {i > 0 ? <Op>+</Op> : null}
                <Part {...part} />
              </span>
            ))}
          </div>
          <Op>×</Op>
          <div className="flex flex-wrap items-center gap-spacing-md">
            {salary.coefficients.map((c, i) => (
              <span key={c.caption} className="flex items-center gap-spacing-md">
                {i > 0 ? <Op>+</Op> : null}
                <Coefficient {...c} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
