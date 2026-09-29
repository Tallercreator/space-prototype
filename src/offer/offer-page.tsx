import * as React from "react";

import { AcceptedView } from "./accepted-view";
import { Actions } from "./actions";
import { Banner } from "./banner";
import { Benefits } from "./benefits";
import { Conditions } from "./conditions";
import { Culture } from "./culture";
import { DeclinePopup } from "./decline-popup";
import { PdfView } from "./pdf-view";
import { Salary } from "./salary";
import { ScenarioPanel } from "./scenario-panel";
import { Sidebar } from "./sidebar";
import { StatusMessage } from "./status";
import { offerKind, useOfferState } from "./state";
import { useTheme } from "./theme";

/** Страница оффера кандидата: баннер, сайдбар с шагами и контент по сценарию. */
export function OfferPage() {
  const { state, actions } = useOfferState();
  const [theme, toggleTheme] = useTheme();
  const [declineOpen, setDeclineOpen] = React.useState(false);
  const kind = offerKind(state.scenario);

  let content: React.ReactNode;
  if (state.view === "accepted") {
    content = <AcceptedView />;
  } else {
    content = (
      <>
        <StatusMessage scenario={state.scenario} />
        <div className="grid gap-spacing-esm">
          {kind === "pdf" ? (
            <PdfView />
          ) : (
            <>
              <Salary
                mode={state.scenario === "formula" ? "formula" : "default"}
              />
              <Benefits />
              <Conditions />
            </>
          )}
          <Culture />
        </div>
        <Actions
          state={state}
          actions={actions}
          onDecline={() => setDeclineOpen(true)}
        />
      </>
    );
  }

  return (
    <div className="offer-page min-h-screen bg-base-surface-primary-background font-primary text-base-texticons-primary">
      <div className="offer-shell mx-auto grid gap-spacing-md">
        <Banner kind={kind} />
        <div className="offer-columns grid items-start gap-spacing-md">
          <Sidebar state={state} />
          <main
            className={`offer-content grid gap-spacing-exxxs rounded-radius-lg bg-base-surface-primary-block-normal ${state.view === "accepted" ? "offer-content--centered" : ""}`}
          >
            {content}
          </main>
        </div>
      </div>
      <DeclinePopup
        open={declineOpen}
        onClose={() => setDeclineOpen(false)}
        onConfirm={() => {
          setDeclineOpen(false);
          actions.decline();
        }}
      />
      <ScenarioPanel
        current={state.scenario}
        onSelect={actions.setScenario}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
