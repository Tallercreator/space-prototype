import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { CheckboxCell } from "@otp/space-ui-kit/checkbox";
import {
  Popup,
  PopupActionPanel,
  PopupBody,
  PopupContent,
  PopupHeader,
} from "@otp/space-ui-kit/popup";
import { Radio, RadioGroup } from "@otp/space-ui-kit/radio";
import { Typography } from "@otp/space-ui-kit/typography";

import {
  BENEFIT_CATALOG,
  CULTURE_CARDS,
  CULTURE_PRESETS,
  DEFAULT_PACKAGE,
  SEGMENTS,
  STUDY_TITLE,
  setPackage,
  usePackage,
} from "./package";
import type { BenefitsPackage, Segment } from "./package";

/** Модалка модератора: сегмент кандидата и набор льгот. Монтируется заново на каждое открытие — черновик всегда свежий. */
export function PackagePopup({ onClose }: { onClose: () => void }) {
  const saved = usePackage();
  const [draft, setDraft] = React.useState<BenefitsPackage>(saved);

  const toggleIn = (key: "benefits" | "culture", id: string, checked: boolean) =>
    setDraft((d) => ({
      ...d,
      [key]: checked ? [...d[key], id] : d[key].filter((b) => b !== id),
    }));
  const toggle = (id: string, checked: boolean) => toggleIn("benefits", id, checked);
  /** Шаблон: сегмент задаёт набор карточек «Тебя ждёт в ОТП», дальше его можно подправить руками. */
  const applyTemplate = (segment: Segment) =>
    setDraft((d) => ({ ...d, segment, culture: CULTURE_PRESETS[segment] }));

  const apply = () => {
    setPackage(draft);
    onClose();
  };

  return (
    <Popup open onClose={onClose}>
      <PopupContent>
        <PopupHeader
          type="title"
          title="Пакет льгот"
          description="Для модератора: что кандидат увидит в блоках «Льготы и привилегии» и «Тебя ждёт в ОТП»"
          showCloseButton
          closeLabel="Закрыть"
        />
        <PopupBody className="grid gap-spacing-xxxl">
          <fieldset className="m-0 grid gap-spacing-md border-0 p-0">
            <Typography.Body.TwoSB as="legend" className="p-0">
              Шаблон по сегменту
            </Typography.Body.TwoSB>
            <Typography.Caption.OneR color="tertiary">
              Задаёт набор карточек «Тебя ждёт в ОТП»: у ГО — внутреннее обучение, у Agile и ИТ
              Agile — IT Academy и гибкий график. ИТ Agile всегда в тёмной теме.
            </Typography.Caption.OneR>
            <RadioGroup
              value={draft.segment}
              onValueChange={(value) => applyTemplate(value as Segment)}
              className="flex flex-wrap gap-spacing-xxxl"
            >
              {SEGMENTS.map((s) => (
                <label key={s.id} className="flex cursor-pointer items-center gap-spacing-sm">
                  <Radio value={s.id} tone="lime" />
                  <span className="grid">
                    <Typography.Body.ThreeM>{s.label}</Typography.Body.ThreeM>
                    <Typography.Caption.TwoR color="tertiary">{s.hint}</Typography.Caption.TwoR>
                  </span>
                </label>
              ))}
            </RadioGroup>
          </fieldset>
          <fieldset className="m-0 grid gap-spacing-md border-0 p-0">
            <Typography.Body.TwoSB as="legend" className="p-0">
              Тебя ждёт в ОТП
            </Typography.Body.TwoSB>
            <Typography.Caption.OneR color="tertiary">
              Коины, кредиты и BestBenefits есть всегда; малые карточки — по выбору
            </Typography.Caption.OneR>
            <div className="grid">
              {CULTURE_CARDS.map((c) => (
                <CheckboxCell
                  key={c.id}
                  tone="lime"
                  checked={draft.culture.includes(c.id)}
                  onCheckedChange={(checked) => toggleIn("culture", c.id, checked)}
                  description={c.caption.replace("\n", " ")}
                >
                  {c.id === "study" ? STUDY_TITLE[draft.segment] : c.title}
                </CheckboxCell>
              ))}
            </div>
          </fieldset>
          <fieldset className="m-0 grid gap-spacing-md border-0 p-0">
            <Typography.Body.TwoSB as="legend" className="p-0">
              Льготы и привилегии
            </Typography.Body.TwoSB>
            <div className="grid">
              {BENEFIT_CATALOG.map((b) => (
                <CheckboxCell
                  key={b.id}
                  tone="lime"
                  checked={draft.benefits.includes(b.id)}
                  onCheckedChange={(checked) => toggle(b.id, checked)}
                  description={b.caption}
                >
                  {b.title}
                </CheckboxCell>
              ))}
            </div>
          </fieldset>
        </PopupBody>
        <PopupActionPanel>
          <Button
            variant="secondary"
            tone="neutral"
            size="large"
            onClick={() => setDraft(DEFAULT_PACKAGE)}
          >
            Сбросить
          </Button>
          <Button tone="neutral" size="large" onClick={apply}>
            Применить
          </Button>
        </PopupActionPanel>
      </PopupContent>
    </Popup>
  );
}
