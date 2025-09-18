import api from "./axios";
import { UTILITY } from "@/constants/api_endpoints";

export const fetchOrgTypeList = async () => {
  try {
    const response = await api.get(UTILITY.ORG_BUSINESS_TYPE);
    return response.data; // ✅ returning the API response
  } catch (error: any) {
    console.error("Error fetching organization types:", error);
    throw error; // rethrow for handling in the calling function
  }
};
