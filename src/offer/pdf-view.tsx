import { Button } from "@otp/space-ui-kit/button";
import { Typography } from "@otp/space-ui-kit/typography";

import { asset } from "./data";

/**
 * Сценарий Б: оффер конфиденциальной позиции — PDF, отрисованный сервером в
 * картинку, показывается «уже открытым» на всю ширину контента (Figma 188-90576).
 */
export function PdfView({ failed, inner = false }: { failed: boolean; inner?: boolean }) {
  if (failed) {
    return (
      <section
        className="offer-pdf__error grid justify-items-center gap-spacing-xl rounded-radius-md bg-base-surface-primary-background px-spacing-xxxl py-spacing-exxs text-center"
        aria-label="Предложение о работе"
      >
        <div className="grid gap-spacing-sm">
          <Typography.Body.TwoM>Не удалось показать документ</Typography.Body.TwoM>
          <Typography.Body.ThreeR color="secondary">Открой файл в приложении для PDF — условия оффера в нём.</Typography.Body.ThreeR>
        </div>
        <Button variant="secondary" tone="neutral" size="medium" contrast>
          Открыть файл
        </Button>
      </section>
    );
  }
  const img = <img className="offer-pdf__page" src={asset("pdf-page")} alt="Предложение о работе — страница 1 из 1" />;
  if (inner) {
    // V2: документ в области фиксированной высоты со своим скроллом
    return (
      <section aria-label="Предложение о работе" className="offer-pdf__scroller rounded-radius-md border border-base-border-standard-neutral-normal" tabIndex={0}>
        {img}
      </section>
    );
  }
  return <section aria-label="Предложение о работе">{img}</section>;
}
