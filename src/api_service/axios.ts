import axios, { type AxiosInstance } from "axios";
// import Cookies from 'js-cookie';

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // 🔹 Replace with your API
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
