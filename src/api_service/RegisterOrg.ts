import type {
  OTPVerifyOrganizationRequestPayload,
  RegisterOrganizationRequestPayload,
} from "@/interfaces/registerOrg";
import api from "./axios";
import { AUTH } from "@/constants/api_endpoints";



export const registerOrganisation = async (
  req: RegisterOrganizationRequestPayload
) => {
  try {
    const response = await api.post(AUTH.REGISTER, req);
    return response.data;

  } catch (error) {
    console.error("Error fetching organization types:", error);
    throw error; // rethrow for handling in the calling function
  }
};



export const orgRegistrationOTPVerify = (
  req: OTPVerifyOrganizationRequestPayload
) => {
    try {
        
    } catch (error) {
        
    }
};


export const completeOrgRegistration = (req:any) =>{

}
