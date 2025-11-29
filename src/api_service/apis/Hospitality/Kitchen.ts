import api from "@/api_service/axios";
import { HospitalityApiEndpoint } from "../endpoints/HospitalityEndpoints";

export const getKitchenOrders = async () => {
  const res = await api.get(HospitalityApiEndpoint.Kitchen.fetchOrders);
  return res.data;
};
