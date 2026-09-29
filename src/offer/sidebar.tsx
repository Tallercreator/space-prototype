import * as React from "react";

import { Link } from "@otp/space-ui-kit/link";
import { MessageLine24Icon } from "@otp/space-ui-kit/icons/message-line-24";
import { MobileLine24Icon } from "@otp/space-ui-kit/icons/mobile-line-24";
import { PhoneLine24Icon } from "@otp/space-ui-kit/icons/phone-line-24";
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
      {
        n: 3,
        title: "Трудоустройство",
        caption: dated
          ? `Выход ${fmtDay(DEMO.startDate)} · парковка до ${fmtDay(DEMO.parkingDue)}`
          : undefined,
        active: dated,
      },
    ],
  };
}

/** Карточка рекрутера (Figma 221-110470): имя, пояснение и контакты — телефон, почта, Telegram. */
function Contact({
  href,
  icon,
  children,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  children: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="offer-person__contact flex items-center gap-spacing-md text-base-texticons-primary no-underline"
    >
      <span className="shrink-0" aria-hidden="true">
        {icon}
      </span>
      <Typography.Body.TwoR color="inherit">{children}</Typography.Body.TwoR>
    </a>
  );
}

function PersonCard({
  name,
  note,
  phone,
  email,
  telegram,
}: {
  name: string;
  note: string;
  phone: string;
  email: string;
  telegram: string;
}) {
  return (
    <div className="grid gap-spacing-xl rounded-radius-lg bg-base-surface-tertiary-neutral-normal p-spacing-xl">
      <div className="grid gap-spacing-xs">
        <Typography.Body.TwoSB>{name}</Typography.Body.TwoSB>
        <Typography.Body.ThreeR color="secondary">
          {note}
        </Typography.Body.ThreeR>
      </div>
      <div className="grid justify-items-start gap-spacing-xl">
        <Contact
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          icon={<PhoneLine24Icon />}
        >
          {phone}
        </Contact>
        <Contact href={`mailto:${email}`} icon={<MessageLine24Icon />}>
          {email}
        </Contact>
        <Contact
          href={`https://t.me/${telegram.replace(/^@/, "")}`}
          icon={<MobileLine24Icon />}
          external
        >
          {telegram}
        </Contact>
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
            <li
              key={step.n}
              className="flex items-center gap-spacing-lg"
              aria-current={step.active ? "step" : undefined}
            >
              <span
                className={`flex size-size-sm shrink-0 items-center justify-center rounded-radius-md ${
                  step.active
                    ? "bg-base-surface-primary-lime-normal text-universal-neutral-dark"
                    : "bg-base-surface-secondary-standard-neutral-normal text-base-texticons-primary"
                }`}
              >
                <Typography.Body.ThreeM color="inherit">
                  {step.n}
                </Typography.Body.ThreeM>
              </span>
              <span className="grid gap-spacing-xxs">
                <Typography.Body.OneM>{step.title}</Typography.Body.OneM>
                {step.caption ? (
                  <Typography.Caption.OneR color="tertiary">
                    {step.caption}
                  </Typography.Caption.OneR>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="grid gap-spacing-xxxl">
        <PersonCard
          name={recruiter.name}
          note={recruiter.note}
          phone={recruiter.phone}
          email={recruiter.email}
          telegram={recruiter.telegram}
        />
        <Link
          href="#pdf-download"
          size="medium"
          color="black"
          className="justify-self-start"
          rightIcon={<UprightArrowLine16Icon aria-hidden="true" />}
          onClick={(e) => e.preventDefault()}
        >
          Скачать PDF-версию оффера
        </Link>
      </div>
    </aside>
  );
}
