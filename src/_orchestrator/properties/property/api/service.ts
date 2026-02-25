import api from "@/middlewares/axios";
import type { PropertyPayload } from "../forms/AddPropertyForm";

const PropertyEndpoints = {
  AddProperty: "/orchestrator/console/property/create",
  allProperty:"/orchestrator/console/property",
  utils: {
    allDomain: "/orchestrator/console/property/utils/domains",
  },
};

export async function GetAllDomain() {
  const res = await api.get(PropertyEndpoints.utils.allDomain);
  return res.data;
}

export async function AddProperty(payload: PropertyPayload) {
  const res = await api.post(PropertyEndpoints.AddProperty, payload);
  return res.data;
}

export async function ListAllProperties(){
  const res = await api.get(PropertyEndpoints.allProperty)
  return res.data
}


export async function GetHospitalityDomainMods(domain:string){
  const res = await api.get(`/utils/${domain}`)
  return res.data
}