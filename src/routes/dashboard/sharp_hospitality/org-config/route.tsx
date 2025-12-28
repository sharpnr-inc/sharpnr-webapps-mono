import { HospitalityOrchSideBarWrapper } from "@/_hospitalityapp/orchestrator/pages/HOLSidebarWrapper";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/sharp_hospitality/org-config")(
  {
     beforeLoad: ({ location }) => {
        // Only redirect if user is exactly on the parent route
        if (location.pathname.endsWith("/org-config")) {
          throw redirect({
            to: "/dashboard/sharp_hospitality/org-config/overview",
            replace: true,
          });
        }
      },
    component: HospitalityOrchSideBarWrapper,
  }
);
