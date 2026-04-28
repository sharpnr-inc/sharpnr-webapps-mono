import { PayrollPage } from "@/app/pages/Payroll/PayrollPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/payroll/")({
  component: PayrollPage,
});
