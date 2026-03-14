import api from "@/middlewares/axios";
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
