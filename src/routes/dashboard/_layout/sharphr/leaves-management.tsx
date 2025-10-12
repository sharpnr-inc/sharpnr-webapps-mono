import HRLeavesManagement from "@/ui_modules/HR/HRLeavesManagement";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_layout/sharphr/leaves-management"
)({
  component: HRLeavesManagement,
});
