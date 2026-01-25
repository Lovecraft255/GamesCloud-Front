import axios from "axios";
import authService from "./authServices";

const API_URL = "https://gamecloud-backend.onrender.com";

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (authService.isRefreshing) {
        return new Promise((resolve, reject) => {
          authService.addToQueue(resolve, reject);
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiService(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      authService.isRefreshing = true;

      try {
        const newToken = await authService.refreshToken();
        authService.processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiService(originalRequest);
      } catch (err) {
        authService.processQueue(refreshError, null);
        await authService.logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        authService.isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export const fetchWithCredentials = (url, options = {}) =>
  fetch(url, { credentials: "include", ...options });

export default apiService;
