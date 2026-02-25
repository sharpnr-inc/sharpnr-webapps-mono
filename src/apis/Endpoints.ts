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
    ForgetPassword: "",
    fetchRenderer: "",
    fetchIdentity: "",
    getRenderer: "",
  },
};
