import api from "@/middlewares/axios";
import { AuthApiEndpoints, CoreUtilityEndpoints } from "./Endpoints";

// Signup Function
export async function InitializeSignup() {
  const res = await api.post(
    AuthApiEndpoints.Signup.initializeOnboarding,
    null
  );
  return res.data;
}

export async function VerifyOtp(otp: any) {
  const res = await api.post(AuthApiEndpoints.Signup.verifyOtp, otp);
  return res.data;
}

export async function CompleteOnBoarding() {
  const res = await api.post(AuthApiEndpoints.Signup.OnBoarding);
  return res.data;
}

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
