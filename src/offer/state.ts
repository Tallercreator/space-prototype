import * as React from "react";

import { DEMO } from "./data";
import type { OfferKind } from "./data";

/**
 * Сценарии прототипа. А — структурированный оффер, Б — оффер как PDF.
 * Переключаются панелью сценариев или хэшем в адресе (#last, #pdf …).
 */
export type Scenario =
  | "due" // оффер активен, до дедлайна несколько дней
  | "last" // последний день ответа
  | "gone" // срок истёк
  | "no" // кандидат отклонил
  | "ok" // принял, пожелание по дате отправлено, ждём рекрутера
  | "dated" // дата выхода подтверждена — открыта парковка
  | "pdf" // сценарий Б: PDF-оффер на всю высоту
  | "pdf2" // сценарий Б, V2: PDF в области со своим скроллом
  | "pdferr"; // сценарий Б: PDF не сконвертировался

export type View = "offer" | "when" | "sent";

export type Wish = { asap: true } | { asap: false; from: Date; to: Date } | null;

export type OfferState = {
  scenario: Scenario;
  view: View;
  /** Пожелание по дате выхода; undefined — кандидат пропустил шаг. */
  wish: Wish | undefined;
};

export const SCENARIOS: Array<{ id: Scenario; label: string; group: "А" | "Б" }> = [
  { id: "due", label: "Оффер — активен", group: "А" },
  { id: "last", label: "Оффер — последний день", group: "А" },
  { id: "ok", label: "Принят → ждём дату выхода", group: "А" },
  { id: "dated", label: "Дата подтверждена → парковка", group: "А" },
  { id: "gone", label: "Срок истёк", group: "А" },
  { id: "no", label: "Отклонён", group: "А" },
  { id: "pdf", label: "Оффер как PDF", group: "Б" },
  { id: "pdf2", label: "PDF, V2 — скролл внутри", group: "Б" },
  { id: "pdferr", label: "PDF не сконвертировался", group: "Б" },
];

const IDS = new Set<string>(SCENARIOS.map((s) => s.id));

/** Стартовое пожелание для сценария «принят»: как будто кандидат уже отправил период. */
function initialWish(scenario: Scenario): Wish | undefined {
  return scenario === "ok" || scenario === "dated" ? { asap: false, from: DEMO.wishFrom, to: DEMO.wishTo } : undefined;
}

export function scenarioFromHash(): Scenario {
  const hash = window.location.hash.replace(/^#/, "");
  return IDS.has(hash) ? (hash as Scenario) : "due";
}

export function offerKind(scenario: Scenario): OfferKind {
  return scenario === "pdf" || scenario === "pdf2" || scenario === "pdferr" ? "pdf" : "structured";
}

export function isAccepted(scenario: Scenario): boolean {
  return scenario === "ok" || scenario === "dated";
}

export function useOfferState() {
  const [state, setState] = React.useState<OfferState>(() => ({
    scenario: scenarioFromHash(),
    view: "offer",
    wish: initialWish(scenarioFromHash()),
  }));

  React.useEffect(() => {
    const onHash = () => {
      const scenario = scenarioFromHash();
      setState({ scenario, view: "offer", wish: initialWish(scenario) });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0 });

  const actions = React.useMemo(
    () => ({
      setScenario(scenario: Scenario) {
        history.replaceState(null, "", scenario === "due" ? window.location.pathname : `#${scenario}`);
        setState({ scenario, view: "offer", wish: initialWish(scenario) });
        scrollTop();
      },
      accept() {
        setState((s) => ({ ...s, view: "when" }));
        scrollTop();
      },
      decline() {
        setState((s) => ({ ...s, scenario: "no", view: "offer" }));
        scrollTop();
      },
      sendWish(wish: Wish) {
        setState((s) => ({ ...s, scenario: "ok", view: "sent", wish }));
        scrollTop();
      },
      skipWish() {
        setState((s) => ({ ...s, scenario: "ok", view: "sent", wish: undefined }));
        scrollTop();
      },
      editWish() {
        setState((s) => ({ ...s, view: "when" }));
        scrollTop();
      },
      backToOffer() {
        setState((s) => ({ ...s, view: "offer" }));
        scrollTop();
      },
    }),
    [],
  );

  return { state, actions };
}

export type OfferActions = ReturnType<typeof useOfferState>["actions"];
