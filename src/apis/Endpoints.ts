export const AuthApiEndpoints = {
  Signup: {
    // endpoint to initiate the signup process,
    initializeOnboarding: "/signup/initiate",
    // this endpoints is used to verify the signup session to ckeck if intiatiation and otp verification is from same machine and same user, this is to prevent any kind of session hijacking or any kind of session theft, this is a security measure to ensure that the user is the same user who initiated the signup process
    signupSessionVerify: "/signup/session/verify",
    verifyOtp: "/signup/verify-otp",
    resendEmail: "/signup/resend/otp",
  },

  Auth: {
    login: "identity/web/login",
    logout: "identity/web/logout",
    ForgetPassword: "",
    VerfiyAuth: "identity/web/verify-auth",
  },

  provisioning: {},
};
