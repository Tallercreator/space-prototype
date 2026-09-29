import * as React from "react";

import type { OfferKind } from "./data";

/**
 * Сценарии прототипа. А — структурированный оффер, Б — оффер как PDF.
 * Переключаются панелью сценариев или хэшем в адресе (#last, #pdf …).
 */
export type Scenario =
  | "due" // оффер активен, до дедлайна несколько дней; зарплата — один оклад, без формулы
  | "formula" // как due, но с формулой «из чего складывается» (оклад + гарант × коэффициенты)
  | "last" // последний день ответа
  | "gone" // срок истёк
  | "no" // кандидат отклонил
  | "ok" // принял — экран «оффер принят» с оценкой
  | "pdf"; // сценарий Б: PDF-оффер на всю высоту

export type View = "offer" | "accepted";

export type OfferState = {
  scenario: Scenario;
  view: View;
};

export const SCENARIOS: Array<{
  id: Scenario;
  label: string;
  group: "А" | "Б";
}> = [
  { id: "due", label: "Оффер — активен", group: "А" },
  { id: "formula", label: "Формула для оклада", group: "А" },
  { id: "last", label: "Оффер — последний день", group: "А" },
  { id: "ok", label: "Оффер принят", group: "А" },
  { id: "gone", label: "Срок истёк", group: "А" },
  { id: "no", label: "Отклонён", group: "А" },
  { id: "pdf", label: "Оффер как PDF", group: "Б" },
];

const IDS = new Set<string>(SCENARIOS.map((s) => s.id));

/** Сценарий «принят» открывается сразу экраном подтверждения. */
function initialView(scenario: Scenario): View {
  return scenario === "ok" ? "accepted" : "offer";
}

export function scenarioFromHash(): Scenario {
  const hash = window.location.hash.replace(/^#/, "");
  return IDS.has(hash) ? (hash as Scenario) : "due";
}

export function offerKind(scenario: Scenario): OfferKind {
  return scenario === "pdf" ? "pdf" : "structured";
}

export function isAccepted(scenario: Scenario): boolean {
  return scenario === "ok";
}

export function useOfferState() {
  const fromHash = (): OfferState => {
    const requested = scenarioFromHash();
    return { scenario: requested, view: initialView(requested) };
  };
  const [state, setState] = React.useState<OfferState>(fromHash);

  React.useEffect(() => {
    const onHash = () => setState(fromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0 });

  const actions = React.useMemo(
    () => ({
      setScenario(scenario: Scenario) {
        history.replaceState(
          null,
          "",
          scenario === "due" ? window.location.pathname : `#${scenario}`,
        );
        setState({ scenario, view: initialView(scenario) });
        scrollTop();
      },
      accept() {
        setState((s) => ({ ...s, scenario: "ok", view: "accepted" }));
        scrollTop();
      },
      decline() {
        setState((s) => ({ ...s, scenario: "no", view: "offer" }));
        scrollTop();
      },
    }),
    [],
  );

  return { state, actions };
}

export type OfferActions = ReturnType<typeof useOfferState>["actions"];
