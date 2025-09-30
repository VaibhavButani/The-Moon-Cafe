// src/config.js
const API_BASE = (import.meta.env.VITE_API_BASE || "https://the-moon-cafe-backend.onrender.com")
  .replace(/\/+$/, ""); // remove trailing slash


console.log("Welcome To The Moon Cafe");

export default API_BASE;
