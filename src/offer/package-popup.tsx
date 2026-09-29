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
  DEFAULT_PACKAGE,
  SEGMENTS,
  setPackage,
  usePackage,
} from "./package";
import type { BenefitsPackage, Segment } from "./package";

/** Модалка модератора: сегмент кандидата и набор льгот. Монтируется заново на каждое открытие — черновик всегда свежий. */
export function PackagePopup({ onClose }: { onClose: () => void }) {
  const saved = usePackage();
  const [draft, setDraft] = React.useState<BenefitsPackage>(saved);

  const toggle = (id: string, checked: boolean) =>
    setDraft((d) => ({
      ...d,
      benefits: checked
        ? [...d.benefits, id]
        : d.benefits.filter((b) => b !== id),
    }));

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
              Сегмент позиции
            </Typography.Body.TwoSB>
            <RadioGroup
              value={draft.segment}
              onValueChange={(value) =>
                setDraft((d) => ({ ...d, segment: value as Segment }))
              }
              className="flex flex-wrap gap-spacing-xxxl"
            >
              {SEGMENTS.map((s) => (
                <label
                  key={s.id}
                  className="flex cursor-pointer items-center gap-spacing-sm"
                >
                  <Radio value={s.id} tone="lime" />
                  <span className="grid">
                    <Typography.Body.ThreeM>{s.label}</Typography.Body.ThreeM>
                    <Typography.Caption.TwoR color="tertiary">
                      {s.hint}
                    </Typography.Caption.TwoR>
                  </span>
                </label>
              ))}
            </RadioGroup>
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
