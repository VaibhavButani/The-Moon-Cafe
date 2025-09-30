import { FaPhoneAlt, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE from "../../src/config";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { X } from "lucide-react";

export default function Contact({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_BASE}/api/contact`, formData);

      if (res.status === 200 || res.status === 201) {
        if (onSuccess) onSuccess(res.data); // Update parent state immediately

        toast.custom(
          (t) => (
            <div
              className={`relative flex items-start gap-3 p-4 rounded-lg shadow-lg w-[320px] text-white transition-all ${
                t.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{ background: "#4b3b35" }}
            >
              <div className="flex-1">
                <p className="font-semibold">Thank you!</p>
                <p className="text-sm">We’ll get back to you shortly.</p>
              </div>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="text-white hover:text-[#d7bd6a] transition"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-0 left-0 h-1 bg-[#d7bd6a] animate-toast-progress"></div>
            </div>
          ),
          { duration: 5000 }
        );

        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("❌ Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="order-1 md:order-none bg-white p-6 rounded-lg shadow-md">
      <Toaster position="bottom-right" />
      <style>{`
        @keyframes toast-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-toast-progress {
          animation: toast-progress 5s linear forwards;
        }
      `}</style>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full px-3 py-2 border rounded-md focus:border-[#4b3b35] focus:ring-2 focus:ring-[#4b3b35]"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full px-3 py-2 border rounded-md focus:border-[#4b3b35] focus:ring-2 focus:ring-[#4b3b35]"
          />
        </div>

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your Mobile Number"
          pattern="[0-9]{10}"
          required
          className="w-full px-3 py-2 border rounded-md focus:border-[#4b3b35] focus:ring-2 focus:ring-[#4b3b35]"
        />

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full px-3 py-2 border rounded-md focus:border-[#4b3b35] focus:ring-2 focus:ring-[#4b3b35]"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          rows="4"
          minLength={10}
          required
          className="w-full px-3 py-2 border rounded-md focus:border-[#4b3b35] focus:ring-2 focus:ring-[#4b3b35]"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-[#4b3b35] text-white py-2 rounded-md hover:bg-[#3a2d28] transition"
        >
          SEND MESSAGE
        </button>
      </form>
    </div>
  );
}
