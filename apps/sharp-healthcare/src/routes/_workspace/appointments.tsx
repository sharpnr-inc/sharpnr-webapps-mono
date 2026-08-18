import { createFileRoute } from "@tanstack/react-router";
import { EmptyState } from "../../workspace/EmptyState";

export const Route = createFileRoute("/_workspace/appointments")({
  component: () => (
    <EmptyState
      title="Appointments"
      description="Scheduling across departments and practitioners, with room and equipment availability resolved before a slot is offered."
      columns={[
        "Slot date, time and duration",
        "Patient and practitioner",
        "Department and room",
        "Equipment reserved",
        "Status — booked, arrived, seen, cancelled",
        "Follow-up linkage",
      ]}
    />
  ),
});
