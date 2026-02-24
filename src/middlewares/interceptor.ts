import { getCookie } from "@/utilities/cookie";
import api from "./axios";

const CSRF_COOKIE_NAME = import.meta.env.VITE_API_CSRF;

api.interceptors.request.use(
  (config) => {
    const method = config.method?.toUpperCase();

    // Only attach CSRF token for unsafe methods
    if (method && !["GET", "HEAD", "OPTIONS"].includes(method)) {
      const csrfToken = getCookie(CSRF_COOKIE_NAME);

      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
