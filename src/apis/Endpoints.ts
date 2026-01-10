export const AuthApiEndpoints = {
  Signup: {
    initializeOnboarding: "/signup/initiate",
    verifyOtp: "/signup/verify-otp",
    OnBoarding: "/signup/onBoarding",
    checkToken: "signup/verify-token",
    resendEmail: "",
  },

  Auth: {
    login: "/login",
    ForgetPassword: "",
    fetchRenderer: "",
    fetchIdentity: "",
    getRenderer: "",
  },
};

export const CoreUtilityEndpoints = {
  locations: {
    country: "utils/countries",
    state: (countryCode: string) => `utils/countries/${countryCode}/states`,
    city: (countryCode: string, state: string) =>
      `utils/countries/${countryCode}/states/${state}/cities`,
  },

  sharpModules: {
    getAllSector: "/utils/org-types",
    GetModulesOfSector: (sector: string) => `/utils/get-submodules/${sector}`,
  },
};
