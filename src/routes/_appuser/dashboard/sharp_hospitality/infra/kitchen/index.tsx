import ServicePointRootSelector from "@/_hospitalityapp/infra/Kitchen/components/ServicePointRootSelector";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/infra/kitchen/",
)({
  component: ServicePointRootSelector,
  staticData: {
    breadcrumb: "Kitchen",
  },
});
