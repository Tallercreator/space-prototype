import * as React from "react";

import { Button } from "@otp/space-ui-kit/button";
import { CheckboxCell } from "@otp/space-ui-kit/checkbox";
import { Field, FieldError } from "@otp/space-ui-kit/field";
import { SelectDate } from "@otp/space-ui-kit/select-date";
import { Typography } from "@otp/space-ui-kit/typography";

import { DEMO, fmtDay } from "./data";
import type { OfferActions } from "./state";

/** Шаг после принятия: пожелание по периоду выхода. */
export function WhenForm({ actions }: { actions: OfferActions }) {
  const [asap, setAsap] = React.useState(false);
  const [from, setFrom] = React.useState<Date | undefined>(DEMO.wishFrom);
  const [to, setTo] = React.useState<Date | undefined>(DEMO.wishTo);
  const [errors, setErrors] = React.useState<{ from?: string; to?: string }>({});

  const tooEarly = (d: Date) => d < DEMO.minStart;

  const send = () => {
    if (asap) {
      actions.sendWish({ asap: true });
      return;
    }
    const next: { from?: string; to?: string } = {};
    if (!from || tooEarly(from)) next.from = `Не раньше ${fmtDay(DEMO.minStart)}`;
    if (!to || (from && to < from)) next.to = "Не раньше даты «С»";
    setErrors(next);
    if (next.from || next.to || !from || !to) return;
    actions.sendWish({ asap: false, from, to });
  };

  return (
    <section className="offer-when grid gap-spacing-xxxl" aria-labelledby="when-title">
      <div className="grid gap-spacing-md">
        <Typography.Title.OneM as="h2" id="when-title" className="m-0">
          Когда тебе удобно выйти?
        </Typography.Title.OneM>
        <Typography.Body.ThreeR as="p" color="secondary" className="m-0">
          Укажи ориентировочный период. Точную дату согласуем отдельно — рекрутер напишет в течение двух рабочих дней.
        </Typography.Body.ThreeR>
      </div>
      <div className="grid gap-spacing-xl">
        <div className="offer-when__fields grid gap-spacing-xl">
        <div className="rounded-radius-md border border-base-border-standard-neutral-normal px-spacing-xl py-spacing-xs">
          <CheckboxCell tone="lime" checked={asap} onCheckedChange={(value) => setAsap(Boolean(value))} description="Рекрутер предложит ближайшую возможную дату">
            Готов выйти как можно раньше
          </CheckboxCell>
        </div>
        <div className={`offer-when__range grid gap-spacing-lg ${asap ? "offer-when__range--muted" : ""}`} aria-disabled={asap}>
          <Field invalid={Boolean(errors.from)} disabled={asap}>
            <SelectDate label="С" mode="single" picker="popover" value={from} onValueChange={(d) => { setFrom(d); setErrors((e) => ({ ...e, from: undefined })); }} disabledDate={tooEarly} disabled={asap} />
            <FieldError>{errors.from}</FieldError>
          </Field>
          <Field invalid={Boolean(errors.to)} disabled={asap}>
            <SelectDate label="По" mode="single" picker="popover" value={to} onValueChange={(d) => { setTo(d); setErrors((e) => ({ ...e, to: undefined })); }} disabledDate={(d) => tooEarly(d) || (from ? d < from : false)} disabled={asap} />
            <FieldError>{errors.to}</FieldError>
          </Field>
        </div>
        <Typography.Body.ThreeR as="p" color="tertiary" className="m-0">
          Не раньше {fmtDay(DEMO.minStart)} — столько нужно на оформление. Пожелание можно изменить, пока рекрутер не подтвердил дату.
        </Typography.Body.ThreeR>
        </div>
        <div className="offer-actions__buttons grid gap-spacing-lg">
          <Button variant="secondary" tone="neutral" size="large" onClick={actions.skipWish}>
            Пропустить, обсужу с рекрутером
          </Button>
          <Button tone="neutral" size="large" onClick={send}>
            Отправить пожелание
          </Button>
        </div>
      </div>
    </section>
  );
}
