import * as React from "react";

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
  | "ok" // принял — экран «оффер принят» с оценкой
  | "dated" // дата выхода подтверждена — открыта парковка
  | "pdf" // сценарий Б: PDF-оффер на всю высоту
  | "pdf2" // сценарий Б, V2: PDF в области со своим скроллом
  | "pdferr"; // сценарий Б: PDF не сконвертировался

export type View = "offer" | "accepted";

export type OfferState = {
  scenario: Scenario;
  view: View;
  /** Закрытый сценарий, который запросили без кода, — страница покажет ввод кода. */
  lockedRequest: Scenario | null;
};

export const SCENARIOS: Array<{ id: Scenario; label: string; group: "А" | "Б" }> = [
  { id: "due", label: "Оффер — активен", group: "А" },
  { id: "last", label: "Оффер — последний день", group: "А" },
  { id: "ok", label: "Оффер принят", group: "А" },
  { id: "dated", label: "Дата подтверждена → парковка", group: "А" },
  { id: "gone", label: "Срок истёк", group: "А" },
  { id: "no", label: "Отклонён", group: "А" },
  { id: "pdf", label: "Оффер как PDF", group: "Б" },
  { id: "pdf2", label: "PDF, V2 — скролл внутри", group: "Б" },
  { id: "pdferr", label: "PDF не сконвертировался", group: "Б" },
];

const IDS = new Set<string>(SCENARIOS.map((s) => s.id));

/** Сценарии, закрытые кодом модератора: по прямой ссылке и из панели без кода не открываются. */
export const LOCKED = new Set<Scenario>(["dated"]);
export const ACCESS_CODE = "2210";
const UNLOCK_KEY = "offer-unlocked";

export function isUnlocked(): boolean {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

export function unlock(): void {
  try {
    sessionStorage.setItem(UNLOCK_KEY, "1");
  } catch {
    /* приватный режим — код спросим ещё раз */
  }
}

export function isLocked(scenario: Scenario): boolean {
  return LOCKED.has(scenario) && !isUnlocked();
}

/** Сценарий «принят» открывается сразу экраном подтверждения. */
function initialView(scenario: Scenario): View {
  return scenario === "ok" ? "accepted" : "offer";
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
  const fromHash = (): OfferState => {
    const requested = scenarioFromHash();
    if (isLocked(requested)) return { scenario: "due", view: "offer", lockedRequest: requested };
    return { scenario: requested, view: initialView(requested), lockedRequest: null };
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
        if (isLocked(scenario)) {
          setState((s) => ({ ...s, lockedRequest: scenario }));
          return;
        }
        history.replaceState(null, "", scenario === "due" ? window.location.pathname : `#${scenario}`);
        setState({ scenario, view: initialView(scenario), lockedRequest: null });
        scrollTop();
      },
      /** Код верный: запоминаем на сессию и открываем запрошенный сценарий. */
      unlockAndOpen(scenario: Scenario) {
        unlock();
        history.replaceState(null, "", `#${scenario}`);
        setState({ scenario, view: initialView(scenario), lockedRequest: null });
        scrollTop();
      },
      cancelLocked() {
        setState((s) => ({ ...s, lockedRequest: null }));
        if (isLocked(scenarioFromHash())) history.replaceState(null, "", window.location.pathname);
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
