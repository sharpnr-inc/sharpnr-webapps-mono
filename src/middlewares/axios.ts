import axios, { type AxiosInstance } from "axios";
import { config } from "@/configs/env";

const api: AxiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
