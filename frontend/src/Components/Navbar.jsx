import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#352f27]/95 shadow-lg backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3">
        {/* Logo Section */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <div className="flex items-center space-x-2 group">
            <img
              src="/logo.png"
              alt="The Moon Cafe"
              className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-wide relative transition-colors duration-300">
              The Moon Cafe
              {/* <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-[#957d49] to-[#d4af37] transition-all duration-500 group-hover:w-full"></span> */}
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-white font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/menu", label: "Menu" },
            { to: "/services", label: "Services" },
            { to: "/about", label: "About Us" },
          ].map(({ to, label }) =>
            // open PDF New Tab
            label === "Menu" ? (
              // <a
              //   key={label}
              //   href="/MoonMenu.pdf"
              //   target="_blank"
              //   rel="nooperen noreferrer"
              //   className={({ isActive }) =>
              //     `relative transition duration-300 pb-1 ${
              //       isActive
              //         ? "text-[#d4af37] font-semibold"
              //         : "hover:text-[#d4af37]"
              //     }`
              //   }
              // >
              //   {label}
              // </a>
              <a
                key={label}
                href="/MoonMenu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative transition duration-300 pb-1 hover:text-[#d4af37]"
              >
                {label}
              </a>
            ) : (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `relative transition duration-300 pb-1 ${
                    isActive
                      ? "text-[#d4af37] font-semibold"
                      : "hover:text-[#d4af37]"
                  }`
                }
              >
                {label}
                {/* Hover underline effect */}
                {/* Animated Underline */}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-gradient-to-r from-[#957d49] to-[#d4af37] transition-all duration-500 ${
                    // Active link → full underline, else animate on hover
                    window.location.pathname === to
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </NavLink>
            )
          )}

          {/* Contact Button */}
          <NavLink
            to="/contact"
            className="ml-4 text-white px-6 py-2 bg-gradient-to-r from-[#957d49] to-[#d4af37] rounded-full shadow-md font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Contact Us
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#352f27]/95 text-center backdrop-blur-md shadow-lg px-6 py-6 space-y-6 animate-fadeInDown">
          {[
            { to: "/", label: "Home" },
            { to: "/menu", label: "Menu" },
            { to: "/services", label: "Services" },
            { to: "/about", label: "About Us" },
          ].map(
            (
              { to, label } // open PDF New Tab
            ) =>
              label === "Menu" ? (
                <a
                  key={label}
                  href="/MoonMenu.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white font-medium hover:text-[#d4af37] transition"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "block text-[#d4af37] font-semibold underline underline-offset-4"
                      : "block text-white font-medium hover:text-[#d4af37] transition"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </NavLink>
              )
          )}

          <NavLink
            to="/contact"
            className="block text-white py-2 bg-gradient-to-r from-[#957d49] to-[#d4af37] px-8 rounded-full shadow-md font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </NavLink>
        </div>
      )}

      {/* Custom animation */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.4s ease-in-out;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
