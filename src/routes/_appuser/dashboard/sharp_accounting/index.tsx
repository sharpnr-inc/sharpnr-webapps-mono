import { AccountingWelcomePage } from "@/_accountingapp/pages/welcome/AccountingWelcomePage";
import { GetLegalEntities } from "@/_orchestrator/legal_entity/api/legalEntity.api.service";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_appuser/dashboard/sharp_accounting/")({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["PropertyContext", "Restaurant"],
      queryFn: GetLegalEntities,
    });
    return {
      legalEntities: data?.data,
    };
  },
  component: AccountingWelcomePage,
});
