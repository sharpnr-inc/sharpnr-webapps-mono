// TODO --> Add Resend OTP Endpoint

export const AuthApiEndpoints = {
  Signup: {
    initializeOnboarding: "/signup/initiate",
    verifyOtp: "/signup/verify-otp",
    checkToken: "signup/verify-token",
    resendEmail: "",
  },

  Auth: {
    login: "identity/web/login",
    logout: "identity/web/logout",
    ForgetPassword: "",
    fetchIdentity: "",
  },
};

export const OrgCoreEndpoints = {
  Customer: {
    CreateCustomer: () => `orchestrator/org/customers/add`,
    Search: (searchQuery: string) =>
      `orchestrator/org/customers/search?searchQuery=${searchQuery}`,
  },
};
