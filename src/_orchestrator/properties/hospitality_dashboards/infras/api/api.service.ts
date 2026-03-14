import api from "@/middlewares/axios";

export async function GetKitchenDetails(kitchenID: string) {
  const res = await api.get(`/sharp-hospitality/kitchen/${kitchenID}/general`);
  return res.data;
}

export async function GetKitchenConfiguration(kitchenID: string) {
  const res = await api.get(
    `/sharp-hospitality/kitchen/${kitchenID}/general/configs`,
  );
  return res.data;
}

interface UpdateKitchenDetailsPayload {
  payload: any;
  kitchenID: string;
}
export async function UpdateKitchenDetails(
  payload: UpdateKitchenDetailsPayload,
) {
  const res = await api.patch(
    `/sharp-hospitality/kitchen/${payload.kitchenID}/general/update-general-details`,
    payload.payload,
  );

  return res.data;
}
