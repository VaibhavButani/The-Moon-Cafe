import React, { useEffect } from "react";
import {
  FaUserTie,
  FaUtensils,
  FaShoppingCart,
  FaHeadset,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    id: 1,
    icon: <FaUserTie className="text-[#957d49] text-5xl mb-4" />,
    title: "Master Chefs",
    description:
      "Expert chefs creating exquisite dishes with passion, blending tradition and innovation perfectly.",
  },
  {
    id: 2,
    icon: <FaUtensils className="text-[#957d49] text-5xl mb-4" />,
    title: "Gourmet Delights",
    description:
      "Enjoy fresh, authentic flavors crafted from the finest ingredients for a memorable experience.",
  },
  {
    id: 3,
    icon: <FaShoppingCart className="text-[#957d49] text-5xl mb-4" />,
    title: "Cozy Ambiance",
    description:
      "Relax in a warm, inviting space, ideal for unforgettable dining moments with loved ones.",
  },
  {
    id: 4,
    icon: <FaHeadset className="text-[#957d49] text-5xl mb-4" />,
    title: "Exceptional Service",
    description:
      "Delight in attentive, friendly service focused on making every visit truly special and seamless.",
  },
];

function Services() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="services" className="w-full bg-[#f8f5f0] py-16 sm:py-28">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ✅ Heading Section */}
        <div
          className="text-center mb-12 max-w-2xl mx-auto"
          data-aos="fade-down"
        >
          <p className="font-pacifico text-lg italic text-[#523625] sm:text-lg md:text-2xl tracking-wide">
            --- Our Services ---
          </p>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#66422b] mt-3 leading-snug">
            We Serve <span className="text-[#957d49]">Excellence</span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
            Discover a world of fine dining, where passion meets perfection.
            Every detail is crafted to give you a truly <strong>expensive</strong> and memorable experience.
          </p>
        </div>

        {/* ✅ Services Grid */}
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-xl  shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
              data-aos="fade-up"
            >
              {service.icon}
              <h3 className="font-nunito text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
