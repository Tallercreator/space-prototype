import { Typography } from "@otp/space-ui-kit/typography";

import { asset, benefits } from "./data";

/** «Льготы и привилегии» — пакет по позиции, сетка 2 колонки с 3D-иконками. */
export function Benefits() {
  return (
    <section className="grid gap-spacing-exxxxs" aria-labelledby="benefits-title">
      <div className="grid gap-spacing-md">
        <Typography.Title.TwoM as="h2" id="benefits-title" className="m-0">
          Льготы и привилегии
        </Typography.Title.TwoM>
        <Typography.Body.ThreeR as="p" color="tertiary" className="m-0">
          Пакет зафиксирован в оффере по твоей позиции и грейду
        </Typography.Body.ThreeR>
      </div>
      <ul className="offer-benefits m-0 grid list-none p-0">
        {benefits.map((b) => (
          <li key={b.title} className="flex items-center gap-spacing-xl">
            <span className="offer-benefits__tile flex size-size-exxs shrink-0 items-center justify-center overflow-hidden rounded-radius-lg bg-base-surface-primary-background">
              <img src={asset(b.image)} alt="" className="offer-benefits__img" />
            </span>
            <span className="grid gap-spacing-xxs">
              <Typography.Body.OneM>{b.title}</Typography.Body.OneM>
              <Typography.Body.ThreeR color="secondary">{b.caption}</Typography.Body.ThreeR>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
