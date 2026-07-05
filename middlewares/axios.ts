import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 🔹 Replace with your API
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


export default api;
