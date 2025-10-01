// src/config.js
const API_BASE = (import.meta.env.VITE_API_BASE || "https://the-moon-cafe-an6r.onrender.com").replace(/\/+$/, ""); // remove trailing slash

console.log("Welcome To The Moon Cafe:", API_BASE);

export default API_BASE;
