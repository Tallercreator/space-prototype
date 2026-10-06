import { GraphCol } from "@otp/space-ui-kit/graph-col";
import { asset } from "./data";
import type { BenefitImage } from "./package";

/** Исходные PNG и их кадрирование из GraphCol в Figma 188:41853. */
export function BenefitTile({ image }: { image: BenefitImage }) {
  return (
    <GraphCol
      size="large"
      content="logo-full"
      tone="neutral"
      variant="secondary"
      className="offer-benefits__tile size-size-exxs pointer-events-none"
      aria-hidden="true"
    >
      <span className="relative">
        <img
          src={asset(`b-v2-${image}`, "png")}
          alt=""
          className={`offer-benefits__img offer-benefits__img--${image}`}
        />
      </span>
    </GraphCol>
  );
}
