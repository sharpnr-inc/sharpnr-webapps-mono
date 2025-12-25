/**
 * API endpoint paths for authentication and authorization operations.
 *
 * The `Auth` object groups all endpoints related to user authentication,
 * including login, logout, token refresh, and password management.
 *
 * @constant {Object} Auth
 * @property {Object} Login - Endpoints for user login.
 * @property {string} Login.User - Endpoint to authenticate user credentials.
 *
 * @property {Object} Logout - Endpoints for user logout.
 * @property {string} Logout.User - Endpoint to log the current user out.
 *
 * @property {Object} Token - Endpoints for managing authentication tokens.
 * @property {string} Token.Refresh - Endpoint to refresh an expired access token.
 *
 * @property {Object} Password - Endpoints for password reset and change.
 * @property {string} Password.Forgot - Endpoint to send password reset email/OTP.
 * @property {string} Password.Reset - Endpoint to reset password with a valid token.
 * @property {string} Password.Change - Endpoint to change password for logged-in users.
 *
 * @example
 * import { Auth } from "@/api/routes";
 *
 * // Example: Login user
 * fetch(Auth.Login.User, {
 *   method: "POST",
 *   body: JSON.stringify({ email, password }),
 * });
 *
 * @exports
 */
export const Auth = {
  Login: {
    User: "/auth/login",
  },

  Logout: {
    User: "/logout",
  },

  Token: {
    Refresh: "/auth/token/refresh",
  },

  Password: {
    Forgot: "/auth/password/forgot",
    Reset: "/auth/password/reset",
    Change: "/auth/password/change",
  },
};

/**
 * API endpoint paths for user or organization signup workflows.
 *
 * The `SignUp` object defines all endpoints used during the user registration process,
 * organized by step for clarity and maintainability.
 *
 * Steps:
 * - StepOne → Register a new user account (email, phone, password)
 * - StepTwo → Verify OTP sent via email or SMS
 * - StepThree → Complete setup, typically used for profile or organization info
 *
 * @constant {Object} SignUp
 * @property {Object} StepOne - Step 1: Register user credentials.
 * @property {string} StepOne.UserRegistration - Endpoint to register a new user.
 *
 * @property {Object} StepTwo - Step 2: Verify OTP.
 * @property {string} StepTwo.VerifyOtp - Endpoint to verify OTP during signup.
 *
 * @property {Object} StepThree - Step 3: Complete setup.
 * @property {string} StepThree.Complete - Endpoint to finalize signup and activate the account.
 *
 * @example
 * import { SignUp } from "@/api/routes";
 *
 * // Step 1: Register user
 * fetch(SignUp.StepOne.UserRegistration, {
 *   method: "POST",
 *   body: JSON.stringify({ email: "user@mail.com", password: "123456" }),
 * });
 *
 * // Step 2: Verify OTP
 * fetch(SignUp.StepTwo.VerifyOtp, {
 *   method: "POST",
 *   body: JSON.stringify({ email: "user@mail.com", otp: "123456" }),
 * });
 *
 * @exports
 */
export const SignUp = {
  StepOne: {
    UserRegistration: "/auth/signup/step-one",
  },

  StepTwo: {
    VerifyOtp: "/auth/signup/verify-otp",
  },

  StepThree: {
    Complete: "/auth/signup/step-three",
  },
};


