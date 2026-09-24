import { Link } from "@otp/space-ui-kit/link";
import { MessageLine16Icon } from "@otp/space-ui-kit/icons/message-line-16";
import { PhoneLine16Icon } from "@otp/space-ui-kit/icons/phone-line-16";
import { UprightArrowLine16Icon } from "@otp/space-ui-kit/icons/upright-arrow-line-16";
import { Typography } from "@otp/space-ui-kit/typography";

import { DEMO, fmtDay, recruiter } from "./data";
import type { OfferState } from "./state";

type StepItem = { n: number; title: string; caption?: string; active: boolean };

function buildSteps(state: OfferState): { of: string; items: StepItem[] } {
  const { scenario } = state;
  // Figma 221-111789: три шага, «Трудоустройство» — следующий после оффера
  const dated = scenario === "dated";
  return {
    of: dated ? "Шаг 3 из 3" : "Шаг 2 из 3",
    items: [
      { n: 1, title: "Анкета кандидата", active: false },
      { n: 2, title: "Оффер", active: !dated },
      { n: 3, title: "Трудоустройство", caption: dated ? `Выход ${fmtDay(DEMO.startDate)} · парковка до ${fmtDay(DEMO.parkingDue)}` : undefined, active: dated },
    ],
  };
}

/** Карточка рекрутера: имя, пояснение и контакты — телефон и почта кликабельны. */
function PersonCard({ name, note, phone, email }: { name: string; note: string; phone: string; email: string }) {
  return (
    <div className="grid gap-spacing-lg rounded-radius-lg bg-base-surface-tertiary-neutral-normal p-spacing-xl">
      <div className="grid gap-spacing-xs">
        <Typography.Body.TwoSB>{name}</Typography.Body.TwoSB>
        <Typography.Body.ThreeR color="secondary">{note}</Typography.Body.ThreeR>
      </div>
      <div className="grid justify-items-start gap-spacing-md">
        <Link href={`tel:${phone.replace(/[^\d+]/g, "")}`} size="medium" color="black" leftIcon={<PhoneLine16Icon aria-hidden="true" />}>
          {phone}
        </Link>
        <Link href={`mailto:${email}`} size="medium" color="black" leftIcon={<MessageLine16Icon aria-hidden="true" />}>
          {email}
        </Link>
      </div>
    </div>
  );
}

/** Левая колонка: заголовок шага, список шагов, карточки наставника и рекрутера. */
export function Sidebar({ state }: { state: OfferState }) {
  const steps = buildSteps(state);
  return (
    <aside className="offer-sidebar flex flex-col justify-between gap-spacing-exxxs rounded-radius-lg bg-base-surface-primary-block-normal p-spacing-exxxs">
      <div className="grid gap-spacing-exxxs">
        <div className="grid gap-spacing-xs">
          <Typography.Title.OneM as="div" color="tertiary">
            Оффер
          </Typography.Title.OneM>
          <Typography.Title.OneM as="h2" className="m-0">
            {steps.of}
          </Typography.Title.OneM>
        </div>
        <ol className="m-0 grid list-none gap-spacing-xxl p-0">
          {steps.items.map((step) => (
            <li key={step.n} className="flex items-center gap-spacing-lg" aria-current={step.active ? "step" : undefined}>
              <span
                className={`flex size-size-sm shrink-0 items-center justify-center rounded-radius-md ${
                  step.active ? "bg-base-surface-primary-lime-normal" : "bg-base-surface-secondary-contrast-neutral-normal"
                }`}
              >
                <Typography.Body.ThreeM>{step.n}</Typography.Body.ThreeM>
              </span>
              <span className="grid gap-spacing-xxs">
                <Typography.Body.OneM>{step.title}</Typography.Body.OneM>
                {step.caption ? <Typography.Caption.OneR color="tertiary">{step.caption}</Typography.Caption.OneR> : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="grid gap-spacing-xl">
        <Link href="#pdf-download" size="medium" color="black" className="justify-self-start" rightIcon={<UprightArrowLine16Icon aria-hidden="true" />} onClick={(e) => e.preventDefault()}>
          Скачать PDF-версию оффера
        </Link>
        <PersonCard name={recruiter.name} note={recruiter.note} phone={recruiter.phone} email={recruiter.email} />
      </div>
    </aside>
  );
}
