import { getCookie } from "@/utilities/cookie";
import api from "./axios";

api.interceptors.request.use(
  (config) => {
    const method = (config.method || "GET").toUpperCase();

    if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
      const csrfToken = getCookie(import.meta.env.VITE_API_CSRF);

      console.log("CSRF:", csrfToken); // debug once

      if (csrfToken) {
        config.headers = config.headers ?? {};
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
