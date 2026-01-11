import { getCookie } from "@/utilities/cookie";
import api from "./axios";


api.interceptors.request.use(
  (config) => {
    const method = config.method?.toUpperCase();

    // Only attach CSRF token for unsafe methods
    if (method && !["GET", "HEAD", "OPTIONS"].includes(method)) {
      const csrfToken = getCookie("_dev_csrf");

      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
