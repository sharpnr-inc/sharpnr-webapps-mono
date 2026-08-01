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
    VerfiyAuth: "identity/web/verify-auth",
  },

  provisioning: {},
};
