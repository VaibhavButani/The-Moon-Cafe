export default function Dashboard({ message, contactCount, galleryCount, setSelectedFunction }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
      {/* Top Bar */}
      <div className="bg-[#352f27] text-center py-6">
        <img src="/logo.png" alt="Moon Cafe Logo" className="w-20 h-20 mx-auto object-contain mb-3" />
        <h1 className="text-3xl font-bold text-[#d7bd6a]">The Moon Café</h1>
        <p className="text-gray-300 text-sm">Admin Dashboard</p>
      </div>

      {/* Welcome Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{message}</h2>
        <p className="text-gray-600 mb-6 text-center">
          Welcome to the admin dashboard. Select a function from the left panel.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Contacts Card */}
          <div
            className="p-6 bg-[#f9f7f3] rounded-lg shadow text-center border border-gray-200 cursor-pointer hover:scale-105 transition"
            onClick={() => setSelectedFunction("contacts")}
          >
            <h3 className="text-lg font-semibold text-gray-700">📩 Total Contacts</h3>
            <p className="text-3xl font-bold text-[#957d49]">{contactCount}</p>
          </div>

          {/* Gallery Card */}
          <div
            className="p-6 bg-[#f9f7f3] rounded-lg shadow text-center border border-gray-200 cursor-pointer hover:scale-105 transition"
            onClick={() => setSelectedFunction("gallery")}
          >
            <h3 className="text-lg font-semibold text-gray-700">🖼️ Gallery Images</h3>
            <p className="text-3xl font-bold text-[#957d49]">{galleryCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}



