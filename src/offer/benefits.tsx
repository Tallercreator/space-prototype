import { Typography } from "@otp/space-ui-kit/typography";
import { BenefitTile } from "./benefit-tile";
import { selectedBenefits, usePackage } from "./package";

/** «Льготы и привилегии» — пакет по позиции из настройки модератора, сетка 2 колонки. */
export function Benefits() {
  const items = selectedBenefits(usePackage());
  if (items.length === 0) return null;
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
        {items.map((b) => (
          <li key={b.id} className="flex min-w-0 items-center gap-spacing-lg">
            <BenefitTile image={b.image} />
            <span className="grid min-w-0 gap-spacing-xs">
              <Typography.Body.ThreeM className="whitespace-pre-line">
                {b.title}
              </Typography.Body.ThreeM>
              <Typography.Caption.OneR color="secondary">{b.caption}</Typography.Caption.OneR>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
