import api from "@/middlewares/axios";
import { AuthApiEndpoints, CoreUtilityEndpoints } from "./Endpoints";

//--------------------------------------------------------------------------------//

export interface OrgSignupPayload {
  org_name: string;
  org_email: string;
  org_password: string;
  org_mobile: string;
}

export async function InitializeSignup(payload:OrgSignupPayload) {
  const res = await api.post(
    AuthApiEndpoints.Signup.initializeOnboarding,
    payload
  );
  return res.data;
}

//--------------------------------------------------------------------------------//
export interface OtpPayload {
  otp: string
}
export async function VerifyOtp(otp: OtpPayload) {
  const res = await api.post(AuthApiEndpoints.Signup.verifyOtp, otp);
  return res.data;
}

export async function VerifySignupCookie(){
  const res = await api.get(AuthApiEndpoints.Signup.checkToken)
  return res.data
}

//--------------------------------------------------------------------------------//

export interface OrgOnBoardingPayload {
  org_sector: string;
  org_sector_modules: string[];
  org_address_line: string;
  org_city: string;
  org_state: string;
  org_country: string;
  org_pincode: string;
}

export async function CompleteOnBoarding(payload:OrgOnBoardingPayload) {
  const res = await api.post(AuthApiEndpoints.Signup.OnBoarding, payload);
  return res.data;
}

//--------------------------------------------------------------------------------//

// All Core Utility APIs
export async function fetchSharpnrSectors() {
  const res = await api.get(CoreUtilityEndpoints.sharpModules.getAllSector);
  return res.data;
}

export async function fetchTheSectorsModule(sector: string) {
  const res = await api.get(
    CoreUtilityEndpoints.sharpModules.GetModulesOfSector(sector)
  );
  return res.data;
}

export async function fetchCountryList() {
  const res = await api.get(CoreUtilityEndpoints.locations.country);
  return res.data;
}

export async function fetchStateList(countryCode: string) {
  const res = await api.get(CoreUtilityEndpoints.locations.state(countryCode));
  return res.data;
}

export async function fetchCities(countryCode: string, state: string) {
  const res = await api.get(
    CoreUtilityEndpoints.locations.city(countryCode, state)
  );
  return res.data;
}
