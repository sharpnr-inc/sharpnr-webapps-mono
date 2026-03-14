import { GetAllOrgKitchen } from "@/_hospitalityapp/infra/Kitchen/api/api.service";
import ServicePointRootSelector from "@/_hospitalityapp/infra/Kitchen/components/ServicePointRootSelector";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_appuser/dashboard/sharp_hospitality/infra/kitchen/",
)({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["Infra", "Kitchen", "All"],
      queryFn: GetAllOrgKitchen,
    });
    return {
      infras: data?.data,
    };
  },
  component: ServicePointRootSelector,
  staticData: {
    breadcrumb: "Kitchen",
  },
});
