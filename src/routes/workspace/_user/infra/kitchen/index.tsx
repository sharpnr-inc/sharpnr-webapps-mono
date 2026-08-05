import { GetAllOrgKitchen } from "@/app/infra/Kitchen/api/api.service";
import ServicePointRootSelector from "@/app/infra/Kitchen/components/ServicePointRootSelector";
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
