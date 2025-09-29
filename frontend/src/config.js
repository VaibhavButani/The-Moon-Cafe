// src/config.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

console.log("🌍 API Base URL in use:", API_BASE);  // 👈 Debug log

export default API_BASE;
