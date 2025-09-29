// AdminLogin.jsx
import { useState } from "react";
import axios from "axios";
import API_BASE from "../../src/config"; // ✅ import API base

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f8f5f0] px-4">
      {/* Card */}
      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#4b3b35] mb-2">
          Admin Login
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your credentials to access the dashboard
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 mb-4 text-center text-sm sm:text-base">
            {error}
          </p>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 px-4 py-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-[#957d49] focus:outline-none text-sm sm:text-base"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 px-4 py-3 w-full mb-6 rounded-lg focus:ring-2 focus:ring-[#957d49] focus:outline-none text-sm sm:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#4b3b35] text-white py-3 rounded-lg font-semibold hover:bg-[#3a2d28] hover:scale-105 transition transform duration-200 shadow-md text-sm sm:text-base"
        >
          Login
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={() => (window.location.href = "/")}
          className="w-full mt-3 bg-gray-200 text-[#4b3b35] py-3 rounded-lg font-medium hover:bg-gray-300 hover:scale-105 transition transform duration-200 shadow text-sm sm:text-base"
        >
          Back to Home
        </button>
      </form>
    </div>
  );
}