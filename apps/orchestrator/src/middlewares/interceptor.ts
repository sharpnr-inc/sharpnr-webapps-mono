import api from "./axios";
import { config as env } from "@/configs/env";
import { getCookie } from "@/lib/utils";

const CSRF_HEADER_NAME = "X-CSRF-Token";

const SAFE_HTTP_METHODS = ["GET", "HEAD", "OPTIONS"] as const;

api.interceptors.request.use(
  (config) => {
    const method = config.method?.toUpperCase() ?? "GET";

    // Skip safe methods
    if (
      SAFE_HTTP_METHODS.includes(method as (typeof SAFE_HTTP_METHODS)[number])
    ) {
      return config;
    }

    const csrfToken = getCookie(env.csrfCookieName);

    if (!csrfToken) {
      console.warn("CSRF token cookie not found");
      return config;
    }

    config.headers = config.headers ?? {};

    // Prevent accidental overwrite
    if (!config.headers[CSRF_HEADER_NAME]) {
      config.headers[CSRF_HEADER_NAME] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
