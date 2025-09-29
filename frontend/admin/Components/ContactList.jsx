import { useState } from "react";

export default function ContactList({ contacts, handleDelete }) {
  const [selectedContact, setSelectedContact] = useState(null);

  const confirmAndDelete = async (id) => {
    if (window.confirm("⚠️ Are you sure you want to delete this message?")) {
      const success = await handleDelete(id);
      if (!success) {
        alert("❌ Failed to delete. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 relative">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-4 text-[#957d49] flex items-center gap-2">
        📩 Contact Messages <span className="text-gray-600">({contacts.length})</span>
      </h2>

      {/* Empty State */}
      {contacts.length === 0 ? (
        <p className="text-gray-600 text-center py-10">No messages yet.</p>
      ) : (
        <ul className="space-y-4">
          {contacts.map((msg, index) => (
            <li
              key={msg.id}
              className="border p-4 rounded-xl shadow-md bg-[#f9f7f3] flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  {index + 1}. {msg.name}
                </p>
                <p className="text-gray-600 text-sm">
                  📞 {msg.phone || "No phone"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedContact(msg)}
                  className="bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-600 hover:scale-105 transition shadow cursor-pointer"
                >
                  View
                </button>
                <button
                  onClick={() => confirmAndDelete(msg.id)}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 hover:scale-105 transition shadow cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Popup Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className="bg-white/80 backdrop-blur-md w-[90%] max-w-lg p-6 rounded-2xl shadow-2xl relative border border-gray-200 animate-slideUp"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-3 right-3 bg-gray-200 text-[#4d3e20] text-xl font-extrabold px-3 py-1 rounded-full hover:bg-gray-300 hover:scale-110 transition shadow"
            >
              X
            </button>

            {/* Title */}
            <h3 className="text-2xl font-bold text-[#957d49] mb-6 text-center">
              Contact Details
            </h3>

            {/* Details */}
            <div className="space-y-3 text-gray-800">
              <p>
                <strong>Name:</strong> {selectedContact.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedContact.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedContact.phone}
              </p>
              <p>
                <strong>Subject:</strong> {selectedContact.subject}
              </p>
              <p>
                <strong>Message:</strong> {selectedContact.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
