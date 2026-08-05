import { GetAllOrgKitchen } from "@/infra_workspace/Kitchen/api/api.service";
import ServicePointRootSelector from "@/infra_workspace/Kitchen/components/ServicePointRootSelector";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/_user/infra/kitchen/")({
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
