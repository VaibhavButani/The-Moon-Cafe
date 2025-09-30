// src/config.js
const API_BASE =
  import.meta.env.VITE_API_BASE || "https://the-moon-cafe-backend.onrender.com/";

console.log("API Base URL:", API_BASE);

export default API_BASE;
