import { CheckLine16Icon } from "@otp/space-ui-kit/icons/check-line-16";
import { ClockFill12Icon } from "@otp/space-ui-kit/icons/clock-fill-12";
import { CrossLine16Icon } from "@otp/space-ui-kit/icons/cross-line-16";
import { GraphCol } from "@otp/space-ui-kit/graph-col";
import { Typography } from "@otp/space-ui-kit/typography";

import { DEMO, daysBetween, daysWord, fmtDay, fmtWeekdayDay } from "./data";
import type { Scenario } from "./state";

type Tone = "orange" | "red" | "neutral" | "lime";

function statusFor(scenario: Scenario): { tone: Tone; icon: "clock" | "check" | "cross"; title: string; text: string } {
  const left = daysBetween(DEMO.today, DEMO.deadline);
  switch (scenario) {
    case "last":
      return { tone: "red", icon: "clock", title: "Сегодня последний день для ответа", text: "До 23:59 по Москве. После этого оффер станет недоступен." };
    case "gone":
      return { tone: "neutral", icon: "clock", title: `Срок ответа истёк ${fmtDay(DEMO.deadline)}`, text: "Оффер можно возобновить — напиши рекрутеру." };
    case "no":
      return { tone: "red", icon: "cross", title: `Ты отклонил предложение ${fmtDay(DEMO.acceptedOn)}`, text: "Если передумаешь — напиши рекрутеру." };
    case "ok":
      return { tone: "lime", icon: "check", title: `Ты принял предложение ${fmtDay(DEMO.acceptedOn)}`, text: "Рекрутер согласует дату выхода и напишет в течение двух рабочих дней." };
    case "dated":
      return { tone: "lime", icon: "check", title: `Дата выхода: ${fmtWeekdayDay(DEMO.startDate)}`, text: "Рекрутер подтвердил дату из твоего пожелания. Осталось заполнить данные для парковки." };
    case "pdf":
    case "pdferr":
      return { tone: "orange", icon: "clock", title: `Ответь до ${fmtDay(DEMO.deadline)}`, text: `Осталось ${left} ${daysWord(left)}. Условия — в документе ниже, они зафиксированы и не изменятся` };
    default:
      return { tone: "orange", icon: "clock", title: `Ответь до ${fmtDay(DEMO.deadline)}`, text: `Осталось ${left} ${daysWord(left)}. Условия зафиксированы и не изменятся, пока ты думаешь` };
  }
}

/** Статус-сообщение над условиями (Figma Status Message, Style=Neutral). */
export function StatusMessage({ scenario }: { scenario: Scenario }) {
  const s = statusFor(scenario);
  const Icon = s.icon === "check" ? CheckLine16Icon : s.icon === "cross" ? CrossLine16Icon : ClockFill12Icon;
  return (
    <div
      role="status"
      className="offer-status flex items-center gap-spacing-lg rounded-radius-lg bg-base-surface-tertiary-neutral-normal px-spacing-lg"
    >
      <GraphCol size="small" content="icon" tone={s.tone} variant="secondary" contrast className="size-size-sm shrink-0">
        <Icon aria-hidden="true" />
      </GraphCol>
      <div className="grid gap-spacing-xxs">
        <Typography.Body.TwoM>{s.title}</Typography.Body.TwoM>
        <Typography.Caption.OneR color="tertiary">{s.text}</Typography.Caption.OneR>
      </div>
    </div>
  );
}
