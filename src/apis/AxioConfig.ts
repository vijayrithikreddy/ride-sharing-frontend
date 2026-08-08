import axios from "axios";
import { refresh } from "../service/AuthService";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }

  return config;

});

// Response Interceptor
api.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        console.log("Access Token Expired");

        const newAccessToken = await refresh();

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (err) {

        console.log("Refresh Token Expired");

        localStorage.clear();

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

      }

    }

    return Promise.reject(error);

  }

);

export default api;