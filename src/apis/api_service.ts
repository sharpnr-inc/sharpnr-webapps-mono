import api from "@/middlewares/axios";
import { AuthApiEndpoints, CoreUtilityEndpoints } from "./Endpoints";

//--------------------------------------------------------------------------------//

export interface OrgSignupPayload {
  email: string;
  password: string;
  mobile: string;
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
  address_line: string;
  city: string;
  state: string;
  country: string;
  pincode: string;

  latitude?: number;
  longitude?: number;
  accuracy_m?: number;
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

export async function LoginUser(payload:any){
  const res = await api.post(AuthApiEndpoints.Auth.login, payload)
  return res.data
}
