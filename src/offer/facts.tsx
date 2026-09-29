import * as React from "react";

import { BankLine24Icon } from "@otp/space-ui-kit/icons/bank-line-24";
import { FlashLine24Icon } from "@otp/space-ui-kit/icons/flash-line-24";
import { PlanetLine24Icon } from "@otp/space-ui-kit/icons/planet-line-24";
import { UsersLine24Icon } from "@otp/space-ui-kit/icons/users-line-24";
import { Typography } from "@otp/space-ui-kit/typography";

import { facts } from "./data";
import type { FactIcon } from "./data";
import { usePackage } from "./package";

/** В ките 0.2.0 нет кубка — контур взят из макета (trophy_line_24x24), рисуется currentColor как линейные иконки кита. */
function TrophyLine24Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 16.0054V18.5M12 16.0054C8 16 6 13.0054 6 11.0054M12 16.0054C15 16 18 13.5054 18 11.0054M12 18.5H9C7.89543 18.5 7 19.3954 7 20.5V21.5L17 21.5V20.5C17 19.3954 16.1046 18.5 15 18.5H12ZM6 11.0054C6 9.00537 6 6.50536 6 6.50536C6 5.8094 6 5.11472 6 4.50426C6 3.40004 6.89489 2.50495 7.99911 2.50446L12 2.50269L16.0009 2.50446C17.1051 2.50495 18 3.40004 18 4.50426C18 5.11472 18 5.8094 18 6.50536C18 6.50536 18 8.50537 18 11.0054M6 11.0054L5.30363 11.0054C3.91195 11.0054 2.6722 10.0491 2.5432 8.66337C2.51657 8.37738 2.5 8.09167 2.5 7.82354C2.5 6.45991 3.44289 6.00544 4.64287 6.00544H6M18 11.0054L18.6964 11.0054C20.0881 11.0054 21.3278 10.0491 21.4568 8.66337C21.4834 8.37738 21.5 8.09167 21.5 7.82354C21.5 6.45991 20.5571 6.00544 19.3571 6.00544L18 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<
  FactIcon,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  trophy: TrophyLine24Icon,
  bank: BankLine24Icon,
  planet: PlanetLine24Icon,
  flash: FlashLine24Icon,
  users: UsersLine24Icon,
};

/**
 * Регалии банка под баннером (Figma 355-123184: карточки V1 и V2).
 * Появляются каскадом слева направо, затем один раз проходит блик; при reduced-motion — статично.
 */
export function FactsRow() {
  const variant = usePackage().facts;
  const v2 = variant === "cards2";
  return (
    <ul
      className={`offer-facts offer-facts--${variant} m-0 grid list-none p-0`}
      aria-label="О банке"
    >
      {facts.map((f, i) => {
        const Icon = ICONS[f.icon];
        return (
          <li
            key={f.headline}
            className="offer-facts__item grid content-between gap-spacing-lg rounded-radius-md bg-base-surface-tertiary-neutral-normal p-spacing-lg"
            style={{ animationDelay: `${200 + i * 80}ms` }}
          >
            <span className="grid gap-spacing-lg">
              <span className="offer-facts__badge" aria-hidden="true">
                <Icon className="offer-facts__icon text-base-texticons-primary" />
              </span>
              {v2 ? (
                <span className="grid gap-spacing-xs">
                  <Typography.Body.TwoM className="whitespace-pre-line">
                    {f.headline}
                  </Typography.Body.TwoM>
                  {f.detail ? (
                    <Typography.Caption.OneR
                      color="secondary"
                      className="whitespace-pre-line"
                    >
                      {f.detail}
                    </Typography.Caption.OneR>
                  ) : null}
                </span>
              ) : (
                <Typography.Body.ThreeM className="whitespace-pre-line">
                  {f.text}
                </Typography.Body.ThreeM>
              )}
            </span>
            {f.source ? (
              v2 ? (
                <Typography.Caption.TwoR color="disabled">
                  ({f.source})
                </Typography.Caption.TwoR>
              ) : (
                <Typography.Caption.OneR color="tertiary">
                  ({f.source})
                </Typography.Caption.OneR>
              )
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
