import { api } from "@sharpnr/http";
import { KitchenEndpoints } from "./api.endpoints";

export async function GetKitchenKOT(kitchenID: string) {
  const res = await api.get(KitchenEndpoints.GetKOTs(kitchenID));
  return res.data;
}

export async function UpdateKOTStatus(
  KitchenID: string,
  KotID: string,
  status: string,
) {
  const res = await api.patch(KitchenEndpoints.UpdateKOT(KitchenID, KotID), {
    status,
  });

  return res.data;
}

export async function GetAllOrgKitchen() {
  const res = await api.get(KitchenEndpoints.GetAllKitchen);
  return res.data;
}

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
  payload: unknown;
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
