import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/sharp_hr/leaves_management"
)({
  component: HRLeavesManagement,
});

function HRLeavesManagement() {
  return <div>This is Leaves management</div>;
}
