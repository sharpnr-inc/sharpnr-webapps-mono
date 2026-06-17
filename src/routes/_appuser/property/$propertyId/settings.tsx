import PropertySettingPage from "@/app/property/pages/PropertySettingPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/property/$propertyId/settings")(
  {
    component: PropertySettingPage,
    staticData: {
      breadcrumb: "Property Settings",
    },
  },
);
