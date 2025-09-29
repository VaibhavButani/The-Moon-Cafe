import React from "react";
import {
  FaPhone,
  FaInstagramSquare,
  FaFacebookSquare,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-[#2f2a24] via-[#3c342c] to-[#2f2a24] text-[#e0dbd2] pt-14 pb-6 px-6 md:px-20">
      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
        {/* Resources */}
        <div>
          <h2 className="font-pacifico italic text-2xl md:text-3xl mb-6 text-[#f5d48d]">
            Resources
          </h2>
          <ul className="space-y-3 font-medium">
            <li>
              <Link
                to="/about"
                className="hover:text-[#f5d48d] cursor-pointer transition-transform transform hover:translate-x-1"
              >
                About Us
              </Link>
            </li>
            <li>
              <a
                href="/MoonMenu.pdf"
                target="_blank"
                className="hover:text-[#f5d48d] cursor-pointer transition-transform transform hover:translate-x-1"
              >
                Menu
              </a>
            </li>
            <li>
              <Link
                to="/cafelook"
                className="hover:text-[#f5d48d] cursor-pointer transition-transform transform hover:translate-x-1"
              >
                Cafe Look
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                className="hover:text-[#f5d48d] cursor-pointer transition-transform transform hover:translate-x-1"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/123"
                className="hover:text-[#f5d48d] cursor-pointer transition-transform transform hover:translate-x-1"
              >
                Become Franchise
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl md:text-3xl font-pacifico italic mb-6 text-[#f5d48d]">
            Contact
          </h2>
          <ul className="space-y-3 font-medium">
            <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#f5d48d] transition">
              <FaPhone /> +91 98765 43210
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3 hover:text-[#f5d48d] transition">
              <IoMail /> moon@gmail.com
            </li>
          </ul>

          {/* Socials */}
          <div className="flex justify-center md:justify-start gap-6 mt-8 text-3xl">
            <FaInstagramSquare className="cursor-pointer hover:text-pink-500 hover:scale-110 transition-transform" />
            <FaFacebookSquare className="cursor-pointer hover:text-blue-600 hover:scale-110 transition-transform" />
            <FaMapMarkedAlt className="cursor-pointer hover:text-green-500 hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h2 className="text-2xl italic md:text-3xl font-pacifico mb-6 text-[#f5d48d]">
            Opening Hours
          </h2>
          <ul className="space-y-3 font-medium">
            <li>Monday - Sunday</li>
            <li>9:00 AM - 12:00 AM</li>
          </ul>
        </div>

        {/* Our Stores */}
        <div>
          <h2 className="text-2xl italic md:text-3xl mb-6 font-pacifico text-[#f5d48d]">
            Our Stores
          </h2>
          <ul>
            <li className="space-y-3 font-medium">Mota Varachha</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#f5d48d]/40 my-10"></div>

      {/* Copyright */}
      <div className="text-center text-sm md:text-base tracking-wide">
        © 2025{" "}
        <span className="font-semibold text-[#f5d48d]">The Moon Cafe</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
