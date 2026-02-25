export const KitchenEndpoints = {
  GetKOTs: (kitchenID: string) =>
    `/sharp-hospitality/kitchen/${kitchenID}/get-orders`,

  UpdateKOT: (kitchenID: string, kOTID:string) =>
    `/sharp-hospitality/kitchen/${kitchenID}/kot/${kOTID}/status`,
};
