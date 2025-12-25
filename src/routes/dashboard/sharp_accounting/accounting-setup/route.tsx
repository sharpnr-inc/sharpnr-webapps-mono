import { createFileRoute, redirect } from "@tanstack/react-router";
import { AccountingSetupSideBarWrapper } from "@/_accountingapp/pages/accounting-setup/SideBarWrapper";

export const Route = createFileRoute(
  "/dashboard/sharp_accounting/accounting-setup"
)({
  beforeLoad: ({ location }) => {
    // Only redirect if user is exactly on the parent route
    if (location.pathname.endsWith("/accounting-setup")) {
      throw redirect({
        to: "/dashboard/sharp_accounting/accounting-setup/books",
        replace: true,
      });
    }
  },

  component: AccountingSetupSideBarWrapper
});
