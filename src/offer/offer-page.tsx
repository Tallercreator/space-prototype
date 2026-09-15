import * as React from "react";

import { Actions } from "./actions";
import { Banner } from "./banner";
import { Benefits } from "./benefits";
import { Conditions } from "./conditions";
import { Culture } from "./culture";
import { DeclinePopup, ParkingPopup } from "./decline-popup";
import { PdfView } from "./pdf-view";
import { Salary } from "./salary";
import { ScenarioPanel } from "./scenario-panel";
import { SentView } from "./sent-view";
import { Sidebar } from "./sidebar";
import { StatusMessage } from "./status";
import { WhenForm } from "./when-form";
import { offerKind, useOfferState } from "./state";

/** Страница оффера кандидата: баннер, сайдбар с шагами и контент по сценарию. */
export function OfferPage() {
  const { state, actions } = useOfferState();
  const [declineOpen, setDeclineOpen] = React.useState(false);
  const [parkingOpen, setParkingOpen] = React.useState(false);
  const kind = offerKind(state.scenario);

  let content: React.ReactNode;
  if (state.view === "when") {
    content = <WhenForm actions={actions} />;
  } else if (state.view === "sent") {
    content = <SentView state={state} actions={actions} />;
  } else {
    content = (
      <>
        <StatusMessage scenario={state.scenario} />
        <div className="grid gap-spacing-esm">
          {kind === "pdf" ? (
            <PdfView failed={state.scenario === "pdferr"} />
          ) : (
            <div className="grid gap-spacing-exxs">
              <Salary />
              <Conditions />
            </div>
          )}
          <Benefits />
          <Culture />
        </div>
        <Actions state={state} actions={actions} onDecline={() => setDeclineOpen(true)} onParking={() => setParkingOpen(true)} />
      </>
    );
  }

  return (
    <div className="offer-page min-h-screen bg-base-surface-primary-background font-primary text-base-texticons-primary">
      <div className="offer-shell mx-auto grid gap-spacing-md">
        <Banner kind={kind} />
        <div className="offer-columns grid items-start gap-spacing-md">
          <Sidebar state={state} />
          <main className="offer-content grid gap-spacing-exxxs rounded-radius-lg bg-base-surface-primary-block-normal">{content}</main>
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
      <ParkingPopup open={parkingOpen} onClose={() => setParkingOpen(false)} />
      <ScenarioPanel current={state.scenario} onSelect={actions.setScenario} />
    </div>
  );
}
