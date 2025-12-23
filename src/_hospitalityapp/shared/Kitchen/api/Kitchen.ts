import api from "@/middlewares/axios";
import { HospitalityApiEndpoint } from "../../../HospitalityEndpoints";

export const getKitchenOrders = async () => {
  const res = await api.get(HospitalityApiEndpoint.Kitchen.fetchOrders);
  return res.data;
};
