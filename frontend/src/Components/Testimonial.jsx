// TestimonialSection.jsx
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import AOS from "aos";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "aos/dist/aos.css";

const testimonials = [
  {
    text: "Discover a unique blend of flavors and ambiance at Social Blend Cafe. Inspired by the rich traditions of Turkey, we bring you a taste of authentic Turkish culture in the heart of Surat.",
    name: "Mr Shailesh Kheni",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    text: "I loved the cozy atmosphere and the authentic flavors. Definitely a must-visit cafe in Surat!",
    name: "Ms Priya Mehta",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    text: "Amazing place! The coffee is rich, and the Turkish desserts are just perfect.",
    name: "Mr Arjun Patel",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    text: "A premium experience with a royal touch. The ambiance is unmatched. I’ve visited many cafes, but this one stands out for its unique theme and Turkish authenticity.",
    name: "Mrs Neha Shah",
    image: "https://i.pravatar.cc/100?img=4",
  },
  {
    text: "Best cafe vibes ever. Friendly staff and great Turkish tea. Highly recommended! I keep coming back again and again.",
    name: "Mr Raj Malhotra",
    image: "https://i.pravatar.cc/100?img=5",
  },
];

export default function TestimonialSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="bg-[#f8f5f0] py-16 px-4 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-12 max-w-2xl mx-auto" data-aos="fade-down">
        <p className="font-pacifico text-lg italic text-[#523625] sm:text-lg md:text-2xl tracking-wide">
          --- Testimonial ---
        </p>
        <h2 className="font-nunito text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#66422b] mt-3 leading-snug">
          Our Clients<span className="text-[#957d49]"> Say!!!</span>
        </h2>
        <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg">
          Real stories from our <strong>Happy</strong> customers. Here’s what
          they have to share.
        </p>
      </div>

      {/* Swiper Slider */}
      <div data-aos="fade-up" className="max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-xl w-full min-h-[280px] sm:min-h-[300px] md:min-h-[320px] p-6 flex flex-col justify-between shadow-lg transition-all duration-700 bg-[#9c8b7c] text-white/90 hover:bg-[#5d4b3e]/90 hover:text-white">
                <div>
                  <FaQuoteLeft className="text-3xl sm:text-4xl opacity-70 mb-4" />
                  <p className="text-sm sm:text-base leading-relaxed line-clamp-6">
                    {t.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 justify-center mt-6">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover"
                  />
                  <h3 className="font-nunito font-semibold sm:font-bold text-sm sm:text-base">
                    {t.name}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ Pagination below */}
        <div className="custom-pagination mt-6 flex justify-center"></div>
      </div>

      {/* Custom dot styling */}
      <style jsx>{`
        .custom-pagination .swiper-pagination-bullet {
          background-color: #bbb;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          opacity: 0.7;
          margin: 0 6px;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background-color: #5d4b3e;
          transform: scale(1.2);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
