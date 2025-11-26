
import api from "../../axios";
import { HospitalityApiEndpoint } from "../endpoints/HospitalityEndpoints";
import type { ApiResponse } from "@/interfaces/ResponseEnvelop";

export const fetchBarLayout = async (): Promise<ApiResponse<any>> => {
  const res = await api.get(HospitalityApiEndpoint.Bar.getBarLayout);
  return res.data;
};

export const updateBarDetails = async (req: any):Promise<ApiResponse<any>> => {
  const res = await api.post<ApiResponse<any>>(
    HospitalityApiEndpoint.Bar.updateBarGenDetails,
    req
  );
  return res.data;
};

export interface BarGeneralDetailsResponse {
  bar_id: string;
  org_id: string;
  bar_display_name: string;
  bar_legal_name: string;
  opening_time: string; // ISO string
  closing_time: string; // ISO string
  is_kitchen: boolean;
  kitchen_id: string;
  is_share_legal_details_with_main_org: boolean;
  display_name: string;
  legal_name: string;

  cin_number: string; // <-- Added
  fssai_number: string; // <-- Added

  gst_number: string;
  is_multifloor: boolean;
  address_line: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export const getBarConfigDetails = async (): Promise<
  ApiResponse<BarGeneralDetailsResponse>
> => {
  const res = await api.get(HospitalityApiEndpoint.Bar.getBarConfigDetails);
  return res.data;
};
