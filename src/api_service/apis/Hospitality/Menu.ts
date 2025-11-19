import api from "@/api_service/axios"
import { HospitalityApiEndpoint } from "../endpoints/HospitalityEndpoints"

export const getAllMenuGroup = async () => {
  const res = await api.get(HospitalityApiEndpoint.Menu.getAllMenuGroup);
  return res.data; // this will contain { status_code, message, data, ... }
};

export const createCategoryInMenuGroup = async (req:any) =>{
  const res = await api.post(HospitalityApiEndpoint.Menu.createCategoryInMenuGroup, req);
  return res.data
} 


export const getMenuGroup = async(id:string)=> {
  const res= await api.get(HospitalityApiEndpoint.Menu.GetMenuGroupDetailsById(id))
  return res.data
}

export const createSubCategoryINCategory = async (req:any)=>{
  const res = await api.post(HospitalityApiEndpoint.Menu.CreateSubCategoryInCategory, req);
  return res.data
}