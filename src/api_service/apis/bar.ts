import { BAR } from "@/constants/api_endpoints";
import api from "../axios";

export const fetchBar = async () => {
  const res = await api.get(BAR.GET_BAR);
  return res;
};
