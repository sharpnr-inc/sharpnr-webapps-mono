import api from "@/middlewares/axios";
import { KitchenEndpoints } from "./api.endpoints";

export async function GetKitchenKOT(kitchenID: string) {
  const res = await api.get(KitchenEndpoints.GetKOTs(kitchenID));
  return res.data;
}
