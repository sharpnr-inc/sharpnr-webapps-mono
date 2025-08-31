const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite way

// Login APIs
export const LOGIN_API = {
  LOGIN: `${BASE_URL}/org/login`,
  REGISTER: `${BASE_URL}/org/register`,
  LOGOUT: `${BASE_URL}/logout`,
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
  RESET_PASSWORD: `${BASE_URL}/reset-password`,
};




/**
 * USER_API
 *
 * Contains all API endpoints related to user management.
 * This includes endpoints for:
 * - Fetching the user profile
 * - Updating profile information
 * - Changing the user password
 *
 * @constant
 * @name USER_API
 * @kind variable
 * @type {{ GET_PROFILE: string; UPDATE_PROFILE: string; CHANGE_PASSWORD: string; }}
 * @exports
 *
 * @example
 * import axios from 'axios';
 * import { USER_API } from '@/constants/api';
 * 
 * // Fetch user profile
 * const getProfile = async () => {
 *   const response = await axios.get(USER_API.GET_PROFILE);
 *   return response.data;
 * };
 * 
 * // Update user profile
 * const updateProfile = async (data: any) => {
 *   const response = await axios.post(USER_API.UPDATE_PROFILE, data);
 *   return response.data;
 * };
 * 
 * // Change password
 * const changePassword = async (oldPassword: string, newPassword: string) => {
 *   const response = await axios.post(USER_API.CHANGE_PASSWORD, { oldPassword, newPassword });
 *   return response.data;
 * };
 */
export const USER_API = {
  GET_PROFILE: `${BASE_URL}/user/profile`,
  UPDATE_PROFILE: `${BASE_URL}/user/update`,
  CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,
};

