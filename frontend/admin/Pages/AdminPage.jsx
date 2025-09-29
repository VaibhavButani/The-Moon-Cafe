import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react"; // ✅ arrow icons npm install lucide-react

import axiosInstance from "../../src/axiosInstance";
import Dashboard from "../Components/Dashboard";
import GalleryManager from "../Components/GalleryManager";
import ChangePasswordForm from "../Components/ChangePasswordForm";
import ContactList from "../Components/ContactList";

export default function AdminPage() {
  const [selectedFunction, setSelectedFunction] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [galleryCount, setGalleryCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); // 🔹 sidebar toggle

  // 🔹 Fetch admin message
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return (window.location.href = "/admin/login");

    axiosInstance
      .get("/api/admin")
      .then((res) => setMessage(res.data.message))
      .catch(() => (window.location.href = "/admin/login"));
  }, []);

  // 🔹 Fetch contacts
  useEffect(() => {
    if (selectedFunction === "contacts" || selectedFunction === "dashboard") {
      axiosInstance
        .get("/api/contact")
        .then((res) => setContacts(res.data))
        .catch(() => setContacts([]));
    }
  }, [selectedFunction]);

  // 🔹 Fetch gallery count
  useEffect(() => {
    if (selectedFunction === "gallery" || selectedFunction === "dashboard") {
      axiosInstance
        .get("/api/gallery")
        .then((res) => setGalleryCount(res.data.length))
        .catch(() => setGalleryCount(0));
    }
  }, [selectedFunction]);

  // 🔹 Delete contact
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/contact/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (error) {
      console.error("Delete failed:", error);
      return false;
    }
  };

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-[#e2dbcd] relative overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-[#957d49]">Admin Panel</h2>
        {["dashboard", "contacts", "gallery", "changePassword"].map((tab) => (
          <button
            key={tab}
            className={`mb-2 p-3 rounded-lg text-left font-medium transition ${
              selectedFunction === tab
                ? "bg-[#957d49] text-white shadow"
                : "hover:bg-[#e8e3d9] text-gray-700"
            }`}
            onClick={() => {
              setSelectedFunction(tab);
              setSidebarOpen(false); // auto-close on mobile
            }}
          >
            {tab === "dashboard" && "Dashboard"}
            {tab === "contacts" && "Contacts"}
            {tab === "gallery" && "Gallery"}
            {tab === "changePassword" && "Change Password"}
          </button>
        ))}
        <button
          className="mt-auto bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Toggle button (mobile only) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-1/2 -translate-y-1/2 left-0 bg-[#957d49] text-white p-2 rounded-r-lg shadow-md z-50"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Right Content */}
      <div className="flex-1 p-6 lg:p-10 overflow-auto">
        {selectedFunction === "dashboard" && (
          <Dashboard
            message={message}
            contactCount={contacts.length}
            galleryCount={galleryCount}
            setSelectedFunction={setSelectedFunction}
          />
        )}
        {selectedFunction === "contacts" && (
          <ContactList contacts={contacts} handleDelete={handleDelete} />
        )}
        {selectedFunction === "gallery" && <GalleryManager />}
        {selectedFunction === "changePassword" && <ChangePasswordForm />}
      </div>
    </div>
  );
}