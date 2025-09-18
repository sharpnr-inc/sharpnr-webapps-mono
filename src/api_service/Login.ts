import type { LoginPayload, LoginResponse } from "@/interfaces/Auth";
import api from "./axios";
import { AUTH } from "@/constants/api_endpoints";

/**
 * Logs in an organization user using provided credentials.
 *
 * This function sends a POST request to the authentication endpoint
 * with the user's login payload. On successful login, it stores
 * the returned token in localStorage for future API requests.
 *
 * @async
 * @function
 * @name loginOrg
 * @param {LoginPayload} data - The login credentials, including email and password.
 * @returns {Promise<LoginResponse>} Resolves with the user data and token on success.
 * @throws {Error} Throws an error if the login fails.
 * 
 * @example
 * ```ts
 * try {
 *   const response = await loginOrg({ email: "user@example.com", password: "123456" });
 *   console.log(response.token);
 * } catch (err) {
 *   console.error(err.message);
 * }
 * ```
 */
export const loginOrg = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const res = await api.post<LoginResponse>(AUTH.LOGIN, data);

    // Store token in localStorage
    localStorage.setItem(
      "_sharpnr_web_app_token_",
      JSON.stringify(res.data.token)
    );

    return res.data;
  } catch (error) {
    throw new Error("Login Failed");
  }
};
