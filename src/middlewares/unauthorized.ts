import api from "./axios";

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
     
      console.warn("Auth / CSRF failed");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
