import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { Field, FieldError } from "@otp/space-ui-kit/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@otp/space-ui-kit/input-otp";
import { Popup, PopupActionPanel, PopupBody, PopupContent, PopupHeader } from "@otp/space-ui-kit/popup";
import { Typography } from "@otp/space-ui-kit/typography";

import { ACCESS_CODE, SCENARIOS } from "./state";
import type { Scenario } from "./state";

/** Ввод кода модератора для закрытых сценариев. */
export function CodePopup({ target, onSuccess, onClose }: { target: Scenario | null; onSuccess: (s: Scenario) => void; onClose: () => void }) {
  const [code, setCode] = React.useState("");
  const [invalid, setInvalid] = React.useState(false);
  const label = SCENARIOS.find((s) => s.id === target)?.label ?? "";

  React.useEffect(() => {
    setCode("");
    setInvalid(false);
  }, [target]);

  const submit = () => {
    if (!target) return;
    if (code === ACCESS_CODE) onSuccess(target);
    else setInvalid(true);
  };

  return (
    <Popup open={target !== null} onClose={onClose}>
      <PopupContent>
        <PopupHeader type="title" title="Сценарий для модератора" description={`«${label}» открывается по коду.`} showCloseButton closeLabel="Закрыть" />
        <PopupBody className="grid justify-items-center gap-spacing-lg">
          <Typography.Body.ThreeR color="secondary">Введи код из четырёх цифр</Typography.Body.ThreeR>
          <Field invalid={invalid}>
            <InputOTP
              maxLength={4}
              value={code}
              onChange={(value) => {
                setCode(value);
                setInvalid(false);
              }}
              onComplete={submit}
              autoFocus
              aria-label="Код доступа"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
            <FieldError>{invalid ? "Неверный код" : null}</FieldError>
          </Field>
        </PopupBody>
        <PopupActionPanel>
          <Button variant="secondary" tone="neutral" size="large" onClick={onClose}>
            Отмена
          </Button>
          <Button tone="neutral" size="large" onClick={submit} disabled={code.length < 4}>
            Открыть
          </Button>
        </PopupActionPanel>
      </PopupContent>
    </Popup>
  );
}
