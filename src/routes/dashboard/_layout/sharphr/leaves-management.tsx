import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_layout/sharphr/leaves-management"
)({
  component: HRLeavesManagement,
});

function HRLeavesManagement() {
  return <div>This is Leaves management</div>;
}
