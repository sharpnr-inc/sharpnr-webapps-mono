import axios, { type AxiosInstance } from "axios";
// import Cookies from 'js-cookie';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 🔹 Replace with your API
  withCredentials: true, // ✅ ensures HttpOnly cookies are sent automatically
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("_sharpnr_web_app_token_"); // Or Zustand
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
