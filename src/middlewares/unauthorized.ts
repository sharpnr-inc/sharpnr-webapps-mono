import api from "./axios";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    const isAuthCheck = url?.includes("verify-authentication");

    if (status === 401 && !isAuthCheck) {
      console.warn("Auth / CSRF failed");

      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  },
);
