import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { Chip } from "@otp/space-ui-kit/chip";
import { Typography } from "@otp/space-ui-kit/typography";

import { SCENARIOS } from "./state";
import type { Scenario } from "./state";

/** Плавающий переключатель сценариев для модератора теста; скрывается параметром ?clean. */
export function ScenarioPanel({ current, onSelect }: { current: Scenario; onSelect: (s: Scenario) => void }) {
  const [open, setOpen] = React.useState(false);
  if (new URLSearchParams(window.location.search).has("clean")) return null;
  return (
    <div className="offer-scenarios fixed grid justify-items-end gap-spacing-md">
      {open ? (
        <div className="offer-scenarios__panel grid gap-spacing-lg rounded-radius-lg bg-base-surface-primary-block-normal p-spacing-xl">
          {(["А", "Б"] as const).map((group) => (
            <div key={group} className="grid gap-spacing-md">
              <Typography.Caption.OneM color="tertiary">Сценарий {group}</Typography.Caption.OneM>
              <div className="flex flex-wrap gap-spacing-sm">
                {SCENARIOS.filter((s) => s.group === group).map((s) => (
                  <Chip key={s.id} size="small" selected={s.id === current} onClick={() => onSelect(s.id)}>
                    {s.label}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <Button variant="secondary" tone="specialBlack" size="small" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Скрыть сценарии" : "Сценарии"}
      </Button>
    </div>
  );
}
