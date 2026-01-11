import api from "./axios";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Optional: central logout / redirect
      console.warn("Auth / CSRF failed");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
