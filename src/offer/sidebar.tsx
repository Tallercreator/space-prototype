import { Link } from "@otp/space-ui-kit/link";
import { UprightArrowLine16Icon } from "@otp/space-ui-kit/icons/upright-arrow-line-16";
import { Typography } from "@otp/space-ui-kit/typography";

import { DEMO, fmtDay, mentor, recruiter } from "./data";
import type { OfferState } from "./state";

type StepItem = { n: number; title: string; caption?: string; active: boolean };

function buildSteps(state: OfferState): { of: string; items: StepItem[] } {
  const { scenario, view } = state;
  const base: StepItem[] = [
    { n: 1, title: "Анкета кандидата", active: false },
    { n: 2, title: "Оффер", active: true },
  ];
  if (scenario === "dated") {
    return {
      of: "Шаг 4 из 4",
      items: [
        ...base.map((s) => ({ ...s, active: false })),
        { n: 3, title: "Дата выхода", caption: fmtDay(DEMO.startDate), active: false },
        { n: 4, title: "Парковка", caption: `До ${fmtDay(DEMO.parkingDue)}`, active: true },
      ],
    };
  }
  // «Оффер принят» (217-96246): шаги остаются «2 из 2»
  void view;
  return { of: "Шаг 2 из 2", items: base };
}

function PersonCard({ name, note, href }: { name: string; note: string; href?: string }) {
  return (
    <div className="grid gap-spacing-xs rounded-radius-lg bg-base-surface-tertiary-neutral-normal p-spacing-xl">
      {href ? (
        <Link
          href={href}
          size="large"
          color="black"
          className="justify-self-start font-(--ui-font-weight-semibold)"
          rightIcon={<UprightArrowLine16Icon aria-hidden="true" />}
        >
          {name}
        </Link>
      ) : (
        <Typography.Body.TwoSB>{name}</Typography.Body.TwoSB>
      )}
      <Typography.Body.ThreeR color="secondary">{note}</Typography.Body.ThreeR>
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
      <div className="grid gap-spacing-lg">
        <PersonCard name={mentor.name} note={mentor.note} />
        <PersonCard name={recruiter.name} note={recruiter.note} href={recruiter.href} />
      </div>
    </aside>
  );
}
