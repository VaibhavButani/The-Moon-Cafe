import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";

const teamMembers = [
  { name: "Mr. Manoj Hirpra", role: "Founder", img: "don1.jpeg" },
  { name: "Mr. Vaibhav Butani", role: "Co-Founder", img: "kalu.jpeg" },
  { name: "Mr. Don", role: "Chef", img: "don3.jpeg" },
  { name: "Mr. Shailesh Kheni", role: "Founder", img: "don4.jpeg" },
];

export default function TeamSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative bg-[#f8f5f0] py-16 sm:py-20 px-4 sm:px-6 lg:px-12">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-12 max-w-2xl mx-auto"
          data-aos="fade-down"
        >
          <p className="font-pacifico text-lg italic text-[#523625] sm:text-lg md:text-2xl tracking-wide">
            --- Team Members ---
          </p>
          <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#66422b] mt-3 leading-snug">
            Our <span className="text-[#957d49]">Crew</span>
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
            Meet the <strong>Passionate</strong> people behind our success. Each member brings
            talent, dedication, and creativity to our team.
          </p>
        </div>

        {/* Desktop / Tablet Grid */}
        <div
          data-aos="fade-up"
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-[#523625]/70 hover:bg-[#5d4b3e] rounded-xl overflow-hidden shadow-lg transition"
            >
              <div className="w-full h-60 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-nunito mt-2 text-white text-base sm:text-lg font-semibold">
                  {member.name}
                </h3>
                <p className="text-gray-100 text-sm sm:text-base">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="block md:hidden" data-aos="fade-up">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={16}
            slidesPerView={1}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="bg-[#5d4b3e]/90 rounded-xl overflow-hidden shadow-lg transition">
                  <div className="w-full h-60 overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="mt-2 text-white text-base sm:text-lg font-semibold">
                      {member.name}
                    </h3>
                    <p className="text-white text-sm sm:text-base">
                      {member.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
