import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { Chip } from "@otp/space-ui-kit/chip";
import { IconButton } from "@otp/space-ui-kit/icon-button";
import { LightbulbLine24Icon } from "@otp/space-ui-kit/icons/lightbulb-line-24";
import { LockClosedLine16Icon } from "@otp/space-ui-kit/icons/lock-closed-line-16";
import { Typography } from "@otp/space-ui-kit/typography";

import { PackagePopup } from "./package-popup";
import { usePackage } from "./package";
import { SCENARIOS, isLocked } from "./state";
import type { Scenario } from "./state";
import type { Theme } from "./theme";

/** Плавающий переключатель сценариев для модератора теста; скрывается параметром ?clean. */
export function ScenarioPanel({
  current,
  onSelect,
  theme,
  onToggleTheme,
}: {
  current: Scenario;
  onSelect: (s: Scenario) => void;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [pkgOpen, setPkgOpen] = React.useState(false);
  const pkg = usePackage();
  if (new URLSearchParams(window.location.search).has("clean")) return null;
  return (
    <div className="offer-scenarios fixed grid justify-items-end gap-spacing-md">
      {open ? (
        <div className="offer-scenarios__panel grid gap-spacing-lg rounded-radius-lg bg-base-surface-primary-block-normal p-spacing-xl">
          {(["А", "Б"] as const).map((group) => (
            <div key={group} className="grid gap-spacing-md">
              <Typography.Caption.OneM color="tertiary">
                Сценарий {group}
              </Typography.Caption.OneM>
              <div className="flex flex-wrap gap-spacing-sm">
                {SCENARIOS.filter((s) => s.group === group).map((s) => (
                  <Chip
                    key={s.id}
                    size="small"
                    selected={s.id === current}
                    onClick={() => onSelect(s.id)}
                    icon={
                      isLocked(s.id) ? (
                        <LockClosedLine16Icon aria-label="по коду" />
                      ) : undefined
                    }
                  >
                    {s.label}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
          <div className="grid gap-spacing-md">
            <Typography.Caption.OneM color="tertiary">
              Содержимое
            </Typography.Caption.OneM>
            <div className="flex flex-wrap gap-spacing-sm">
              <Chip size="small" onClick={() => setPkgOpen(true)}>
                {`Пакет льгот · ${pkg.benefits.length}`}
              </Chip>
            </div>
          </div>
        </div>
      ) : null}
      {pkgOpen ? <PackagePopup onClose={() => setPkgOpen(false)} /> : null}
      <div className="flex items-center gap-spacing-md">
        <IconButton
          variant="secondary"
          tone="specialBlack"
          size="small"
          aria-label={
            theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"
          }
          aria-pressed={theme === "dark"}
          onClick={onToggleTheme}
        >
          <LightbulbLine24Icon aria-hidden="true" />
        </IconButton>
        <Button
          variant="secondary"
          tone="specialBlack"
          size="small"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          {open ? "Скрыть сценарии" : "Сценарии"}
        </Button>
      </div>
    </div>
  );
}
