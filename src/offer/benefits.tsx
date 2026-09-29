import * as React from "react";

import { BookLine24Icon } from "@otp/space-ui-kit/icons/book-line-24";
import { CardLine24Icon } from "@otp/space-ui-kit/icons/card-line-24";
import { CarLine24Icon } from "@otp/space-ui-kit/icons/car-line-24";
import { CoinsLine24Icon } from "@otp/space-ui-kit/icons/coins-line-24";
import { HeartLine24Icon } from "@otp/space-ui-kit/icons/heart-line-24";
import { HeartPharmacyLine24Icon } from "@otp/space-ui-kit/icons/heart-pharmacy-line-24";
import { InsuranceCardLine24Icon } from "@otp/space-ui-kit/icons/insurance-card-line-24";
import { LoupeBigCheckLine24Icon } from "@otp/space-ui-kit/icons/loupe-big-check-line-24";
import { PercentLine24Icon } from "@otp/space-ui-kit/icons/percent-line-24";
import { ShieldLine24Icon } from "@otp/space-ui-kit/icons/shield-line-24";
import { UsersLine24Icon } from "@otp/space-ui-kit/icons/users-line-24";
import { Typography } from "@otp/space-ui-kit/typography";

import { asset } from "./data";
import { selectedBenefits, usePackage } from "./package";
import type { BenefitIcon, CatalogBenefit } from "./package";

const ICONS: Record<
  BenefitIcon,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  car: CarLine24Icon,
  coins: CoinsLine24Icon,
  card: CardLine24Icon,
  pharmacy: HeartPharmacyLine24Icon,
  users: UsersLine24Icon,
  checkup: LoupeBigCheckLine24Icon,
  percent: PercentLine24Icon,
  shield: ShieldLine24Icon,
  insurance: InsuranceCardLine24Icon,
  heart: HeartLine24Icon,
  book: BookLine24Icon,
};

/** Плитка 64: 3D-картинка `public/offer/b-<id>.webp`; пока её нет — линейная иконка кита как заглушка. */
function Tile({ item }: { item: CatalogBenefit }) {
  const [missing, setMissing] = React.useState(false);
  const Icon = ICONS[item.icon];
  return (
    <span className="offer-benefits__tile flex size-size-exxs shrink-0 items-center justify-center overflow-hidden rounded-radius-lg bg-base-surface-primary-background">
      {missing ? (
        <Icon aria-hidden="true" className="text-base-texticons-tertiary" />
      ) : (
        <img
          src={asset(item.image ?? `b-${item.id}`)}
          alt=""
          className="offer-benefits__img"
          onError={() => setMissing(true)}
        />
      )}
    </span>
  );
}

/** «Льготы и привилегии» — пакет по позиции из настройки модератора, сетка 2 колонки. */
export function Benefits() {
  const items = selectedBenefits(usePackage());
  if (items.length === 0) return null;
  return (
    <section
      className="grid gap-spacing-exxxxs"
      aria-labelledby="benefits-title"
    >
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
          <li key={b.id} className="flex items-center gap-spacing-xl">
            <Tile item={b} />
            <span className="grid gap-spacing-xxs">
              <Typography.Body.TwoM className="whitespace-pre-line">
                {b.title}
              </Typography.Body.TwoM>
              <Typography.Body.ThreeR color="secondary">
                {b.caption}
              </Typography.Body.ThreeR>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
