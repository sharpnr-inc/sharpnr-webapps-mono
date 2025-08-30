const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite way

// Login APIs
export const LOGIN_API = {
  LOGIN: `${BASE_URL}/org/login`,
  REGISTER: `${BASE_URL}/org/register`,
  LOGOUT: `${BASE_URL}/logout`,
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/reset-password`,
};

// User APIs
export const USER_API = {
  GET_PROFILE: `${BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${BASE_URL}/user/update`,
  CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,
};
