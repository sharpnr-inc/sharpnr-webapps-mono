import api from "@/middlewares/axios";

export async function GetKitchenDetails(kitchenID: string) {
  const res = await api.get(
    `/sharp-hospitality/kitchen/${kitchenID}/get-kitchen-details`,
  );

  return res.data;
}
