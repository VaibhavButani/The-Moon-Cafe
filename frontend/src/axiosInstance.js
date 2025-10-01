import axios from "axios";

// 🌍 Base URL
// In development → point directly to your backend (adjust port if needed)
// In production → use relative "/api" (Vercel proxy → Render backend)
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"
    : "/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically to every request
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("❌ Error attaching token:", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❗ Optional: Global response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Unauthorized — clearing token");
      localStorage.removeItem("token");
      // redirect only if you want auto-logout
      // window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
