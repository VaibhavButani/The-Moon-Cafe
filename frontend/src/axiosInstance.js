// src/axiosInstance.js
import axios from "axios";
import API_BASE from "./config";

const axiosInstance = axios.create({
  baseURL: API_BASE,
});

// 🔹 Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
