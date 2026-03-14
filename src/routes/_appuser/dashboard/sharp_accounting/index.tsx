import { AccountingLegalEntityPage } from "@/_accountingapp/components/AccountingLegalEntitySwitcher";
import { GetLegalEntities } from "@/_orchestrator/legal_entity/api/legalEntity.api.service";
import { createFileRoute } from "@tanstack/react-router";
import { useAccountingStore } from "@/_accountingapp/store/accounting.store";

export const Route = createFileRoute("/_appuser/dashboard/sharp_accounting/")({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["PropertyContext", "Restaurant"],
      queryFn: GetLegalEntities,
    });

    const legalEntities = data?.data ?? [];

    // Inject into Zustand
    const store = useAccountingStore.getState();
    store.setLegalEntities(legalEntities);

    // optional return (if page also wants loader data)
    return {
      legalEntities,
    };
  },

  component: AccountingLegalEntityPage,
});
