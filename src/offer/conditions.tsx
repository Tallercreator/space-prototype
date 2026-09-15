import { CalendarLine16Icon } from "@otp/space-ui-kit/icons/calendar-line-16";
import { ClockLine16Icon } from "@otp/space-ui-kit/icons/clock-line-16";
import { CoinStackLine16Icon } from "@otp/space-ui-kit/icons/coin-stack-line-16";
import { DocumentEmptyLine16Icon } from "@otp/space-ui-kit/icons/document-empty-line-16";
import { PinMapLine16Icon } from "@otp/space-ui-kit/icons/pin-map-line-16";
import { ShopAirplaneLine16Icon } from "@otp/space-ui-kit/icons/shop-airplane-line-16";
import { SuitcaseLine16Icon } from "@otp/space-ui-kit/icons/suitcase-line-16";
import { UserLine16Icon } from "@otp/space-ui-kit/icons/user-line-16";
import { Typography } from "@otp/space-ui-kit/typography";

import { conditions } from "./data";
import type { ConditionIcon } from "./data";

const ICONS: Record<ConditionIcon, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  pin: PinMapLine16Icon,
  suitcase: SuitcaseLine16Icon,
  clock: ClockLine16Icon,
  airplane: ShopAirplaneLine16Icon,
  coins: CoinStackLine16Icon,
  user: UserLine16Icon,
  document: DocumentEmptyLine16Icon,
  calendar: CalendarLine16Icon,
};

/** Список условий: подпись слева, значение с иконкой справа, разделители между строками. */
export function Conditions() {
  return (
    <dl className="offer-conditions m-0 grid gap-spacing-xxxl">
      {conditions.map((row, i) => {
        const Icon = row.icon ? ICONS[row.icon] : null;
        return (
          <div key={row.label} className="grid gap-spacing-xxxl">
            {i > 0 ? <hr className="offer-divider m-0 border-0 border-t border-base-border-standard-neutral-normal" aria-hidden="true" /> : null}
            <div className="offer-conditions__row flex items-start gap-spacing-md">
              <Typography.Body.ThreeR as="dt" color="disabled" className="offer-conditions__label m-0 whitespace-pre-line">
                {row.label}
              </Typography.Body.ThreeR>
              <dd className="m-0 flex min-w-0 flex-1 items-start gap-spacing-md">
                {Icon ? <Icon aria-hidden="true" className="offer-conditions__icon shrink-0 text-base-texticons-primary" /> : null}
                <Typography.Body.ThreeR>{row.value}</Typography.Body.ThreeR>
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
