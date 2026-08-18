import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "../../workspace/EmptyState";

export const Route = createFileRoute("/_workspace/patients")({
  component: () => (
    <EmptyState
      title="Patients"
      description="One longitudinal record per patient — demographics, history, allergies and every encounter across the practice."
      columns={[
        "Patient ID and demographics",
        "Registered practice and primary clinician",
        "Known allergies and active conditions",
        "Encounter history",
        "Linked billing account",
        "Consent and record-access flags",
      ]}
    />
  ),
});
