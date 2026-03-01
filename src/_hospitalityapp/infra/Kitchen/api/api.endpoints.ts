export const KitchenEndpoints = {
  GetKOTs: (kitchenID: string) =>
    `/sharp-hospitality/kitchen/${kitchenID}/kot/orders`,

  UpdateKOT: (kitchenID: string, kOTID: string) =>
    `/sharp-hospitality/kitchen/${kitchenID}/kot/${kOTID}/status`,

  GetAllKitchen: "/orchestrator/hospitality/all-kitchen",
};
