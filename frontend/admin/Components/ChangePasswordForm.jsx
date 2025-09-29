import { useState } from "react";
import axios from "axios";
import API_BASE from "../../src/config"; // ✅ import config

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("❌ No token found. Please login again.");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/api/change-password`, // ✅ now uses LAN API base
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ " + res.data.message);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Change password failed:", err);
      setMessage(
        "❌ " + (err.response?.data?.message || "Failed to change password")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-[#957d49]">Change Password</h2>

      {message && (
        <p
          className={`mb-3 text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full p-3 border rounded focus:ring-2 focus:ring-[#957d49] outline-none"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-3 border rounded focus:ring-2 focus:ring-[#957d49] outline-none"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border rounded focus:ring-2 focus:ring-[#957d49] outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#957d49] hover:bg-[#7a6539] shadow-md"
          }`}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
