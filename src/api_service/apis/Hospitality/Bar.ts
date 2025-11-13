import { BAR } from "@/constants/api_endpoints";
import api from "../../axios";
import { HospitalityApiEndpoint } from "../endpoints/HospitalityEndpoints";

export const fetchBar = async () => {
  const res = await api.get(BAR.GET_BAR);
  return res;
};


export const updateBarDetails = async(data:any)=>{
  const res = await api.post(HospitalityApiEndpoint.Bar.updateBarDetails, data)
  return res
}

export const getBarConfigDetails = async()=>{
  const res = await api.get(HospitalityApiEndpoint.Bar.getBarConfigDetails)
  return res.data
}
