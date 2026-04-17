import { AccountingLegalEntityPage } from "@/app/components/AccountingLegalEntitySwitcher";
import { useAccountingStore } from "@/app/store/accounting.store";
import { GetLegalEntities } from "@/temp/api";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
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
