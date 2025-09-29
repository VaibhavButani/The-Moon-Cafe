import axios from "axios";

// In dev → use local backend, in prod → use Vercel proxy (/api)
const API_BASE =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api"   // adjust to your local backend port
    : "/api";                       // Vercel will rewrite to Render backend

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
