export default function Sidebar({ selected, setSelected, handleLogout }) {
  return (
    <div className="w-64 bg-[#f9f7f3] shadow-xl p-6 flex flex-col border-r border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-[#957d49]">Admin Panel</h2>

      {/* Dashboard */}
      <button
        className={`mb-2 p-3 rounded-lg cursor-pointer text-left font-medium transition ${
          selected === "dashboard"
            ? "bg-[#957d49] text-white shadow"
            : "hover:bg-[#e8e3d9] text-gray-700"
        }`}
        onClick={() => setSelected("dashboard")}
      >
        Dashboard
      </button>

      {/* Contacts */}
      <button
        className={`mb-2 p-3 rounded-lg cursor-pointer text-left font-medium transition ${
          selected === "contacts"
            ? "bg-[#957d49] text-white shadow"
            : "hover:bg-[#e8e3d9] text-gray-700"
        }`}
        onClick={() => setSelected("contacts")}
      >
        Contacts
      </button>

      {/* Gallery */}
      <button
        className={`mb-2 p-3 rounded-lg cursor-pointer text-left font-medium transition ${
          selected === "gallery"
            ? "bg-[#957d49] text-white shadow"
            : "hover:bg-[#e8e3d9] text-gray-700"
        }`}
        onClick={() => setSelected("gallery")}
      >
        Gallery
      </button>

      {/* Change Password */}
      <button
        className={`mb-2 p-3 rounded-lg cursor-pointer text-left font-medium transition ${
          selected === "changePassword"
            ? "bg-[#957d49] text-white shadow"
            : "hover:bg-[#e8e3d9] text-gray-700"
        }`}
        onClick={() => setSelected("changePassword")}
      >
        Change Password
      </button>

      {/* Logout */}
      <button
        className="mt-auto bg-red-500 cursor-pointer text-white p-3 rounded-lg font-medium hover:bg-red-600 transition shadow"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
