// Contactpage.jsx
import { FaPhoneAlt, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE from "../../src/config";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // npm install react-hot-toast
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { X } from "lucide-react";

export default function Contact() {
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
      await axios.post(`${API_BASE}/api/contact`, formData);

      toast.custom(
        (t) => (
          <div
            className={`relative flex items-start gap-3 p-4 rounded-lg shadow-lg w-[320px] text-white transition-all ${
              t.visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
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
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f8f5f0]">
      {/* ✅ Toast only after submission */}
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

      {/* Hero */}
      <div className="relative bg-[url(G3.jpg)] w-full h-[250px] md:h-[300px] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-nunito text-3xl md:text-4xl font-bold">
            Contact Us
          </h1>
          <p className="mt-2 text-sm md:text-base">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            &gt; <span className="text-gray-200">Contact Us</span>
          </p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="text-center" data-aos="fade-down">
          <p className="font-pacifico text-lg italic text-[#523625] md:text-2xl mb-5 tracking-wide">
            --- Contact Us ---{" "}
          </p>
          <h2 className="font-nunito text-[#66422b] text-base md:text-3xl font-extrabold sm:text-4xl leading-snug m-5">
            CONTACT FOR<span className="text-[#957d49]"> ANY QUERY</span>
          </h2>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col text-[#523625] md:flex-row justify-between gap-6 md:gap-10 p-6 md:p-10 bg-white rounded-lg shadow-md" >
          <div data-aos="fade-up">
            <h3 className="text-lg font-pacifico ">--- Contact </h3>
            <div className="flex items-center gap-1 mt-2">
              <FaPhoneAlt className="text-lg" />
              <p className="text-[#957d49] font-medium">+91 98765 43210</p>
            </div>
          </div>
          <div data-aos="fade-up">
            <h3 className="text-lg font-pacifico">--- Email</h3>
            <div className="flex items-center gap-1 mt-2">
              <MdEmail className="text-lg" />
              <p className="text-[#957d49] font-medium ">moon@gmail.com</p>
            </div>
          </div>
          <div data-aos="fade-up">
            <h3 className="text-lg font-pacifico">--- Instagram</h3>
            <div className="flex items-center gap-1 mt-2">
              <FaInstagram className="text-lg" />
              <p className="text-[#957d49] font-medium">@the_moon_cafe02</p>
            </div>
          </div>
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* ✅ Form */}
          <div className="order-1 md:order-none bg-white p-6 rounded-lg shadow-md">
            <form className="space-y-4  font-nunito" onSubmit={handleSubmit}>
              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:border-[#4b3b35] focus:ring-2 focus:ring-[#4b3b35]"
                  />
                </div>
                <div>
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
              </div>

              {/* Phone */}
              <div>
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
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-3 py-2 border rounded-md focus:border-[#4b3b35] focus:ring-2 focus:ring-[#4b3b35]"
                />
              </div>

              {/* Message */}
              <div>
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
              </div>

              <button
                type="submit"
                className="w-full bg-[#4b3b35] text-white py-2 rounded-md hover:bg-[#3a2d28] transition"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="order-2 md:order-none" data-aos="zoom-in">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.7332208578446!2d72.8707985099763!3d21.235110680579357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f035606410b%3A0xfc5d05395aeb3f56!2sThe%20Moon%20Cafe!5e1!3m2!1sen!2sin!4v1758300779975!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
