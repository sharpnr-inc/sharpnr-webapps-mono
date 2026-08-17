import { appUserActions } from "@/store/AppUserStore";
import { config } from "../configs/env";
import api from "./axios";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Auth / CSRF failed");
      appUserActions.clearUser();
      window.location.replace(config.authAppUrl);
    }
    return Promise.reject(error);
  },
);
