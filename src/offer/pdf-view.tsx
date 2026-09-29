import { asset } from "./data";

/**
 * Сценарий Б: оффер конфиденциальной позиции — PDF, отрисованный сервером в
 * картинку, показывается «уже открытым» на всю ширину контента (Figma 188-90576).
 */
export function PdfView() {
  return (
    <section aria-label="Предложение о работе">
      <img
        className="offer-pdf__page"
        src={asset("pdf-page")}
        alt="Предложение о работе — страница 1 из 1"
      />
    </section>
  );
}
