import PayslipPage from "@/app/payslips/pages/PayslipPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/payslips/")({
  component: PayslipPage,
});
