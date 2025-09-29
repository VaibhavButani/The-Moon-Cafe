import React , { useEffect }from "react";
import CountUp from "react-countup"; // npm install react-countup
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
   useEffect(() => {
      AOS.init({ duration: 1000, once: true });
    }, []);
  return (
    <>
      {/* Desktop/Tablet Layout (unchanged) */}
      <section className="hidden md:flex md:py-1 bg-[#f8f5f0] 2xl:py-26 xl:py-10 relative py-16 lg:py-2 overflow-hidden flex-row items-center">
        {/* Image Section */}
        <div className="absolute overflow-hidden">
          <img
            src="/aboutimage.png"
            alt="Cafe Interior"
            className="w-200 lg:w-160 2xl:w-186 md:w-130 md:object-cover relative right-44 lg:right-44 top-20 lg:top-20 object-cover"
          />
          <img
            data-aos="fade-up-right"
            src="/about1.png"
            alt="Cafe Interior"
            className="absolute top-26.5 right-51 w-190 h-190 lg:w-175 lg:h-155 md:w-195 md:h-130 md:top-23.5 md:right-49 rounded-full 2xl:w-180 2xl:h-180 lg:object-cover md:object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="relative z-10 text-left text-[#3d2f23] p-10 px-24 lg:px-20 2xl:px-60 md:px-10 md:ml-96 ml-150 lg:ml-115">
          <p className="font-pacifico text-lg italic text-[#523625] sm:text-lg md:text-2xl tracking-wide">
            --- About Us ---
          </p>
          <p className="font-nunito text-1xl lg:text-3xl mt-3 font-bold text-[#352f27] mb-6 leading-snug animate-slideInLeft">
            Welcome to <span className="text-[#d7bd6a]">The Moon Cafe</span>,
            <br />
            where every cup tells a story
          </p>

          <p className="mb-6 text-gray-700 md:mb-2 lg:text-[13px] xl:mb-4 xl:text-[15px] md:text-[10px]">
            Discover a unique blend of flavors and ambiance at The Moon Cafe.
            Inspired by the rich traditions of Turkey, we bring you a taste of
            authentic Turkish culture in the heart of Surat.
          </p>
          <p className="mb-6 md:mb-5 xl:mb-10 lg:mb-10 text-gray-700 xl:text-[15px] lg:text-[13px] md:text-[10px]">
            At The Moon Cafe, every dish tells a story, crafted with care and
            passion. From aromatic coffees to delectable delicacies, our menu is
            a celebration of culinary artistry and heartfelt hospitality.
            Whether you're here for a relaxing coffee break or a delightful
            dining experience, The Moon Cafe promises moments to savor, connect,
            and cherish. Come, be a part of our journey!
          </p>

          {/* Experience */}
          <div className="flex xl:mb-10 items-center gap-3 mb-8 md:mb-5">
            <span className="w-2 h-15 md:w-1 md:h-8 lg:w-1.5 lg:h-10 bg-[#3d2f23]"></span>
            <div>
              <h1 className="text-[#3d2f23] lg:text-4xl md:text-3xl font-bold">
                <CountUp start={0} end={8} duration={7} />
              </h1>
            </div>
            <div>
              <p className="text-gray-800 text-[16px] md:text-[10px] lg:text-[12px] font-semibold">
                Years of{" "}
              </p>
              <h6 className="font-extrabold md:text-[15px] lg:text-[20px] text-[#d7bd6a]">
                EXPERIENCE
              </h6>
            </div>
          </div>

          {/* Contact Button */}
         
          <Link
            to="/contact"
             className="px-6 py-3 bg-gradient-to-r from-[#66422b] to-[#3e2a20] text-white rounded-full font-bold shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
            CONTACT US
          </Link>
        </div>
      </section>

      {/* Mobile (sm) Layout */}
      <section className="block md:hidden bg-[#f8f5f0] py-12 text-center px-6 relative">
        {/* Circle Image with Decorative Border */}
        
        <p className="text-[#523625] italic text-[24px] font-pacifico mb-4 animate-fadeInUp">
          --- About Us ---
        </p>
        <div className="flex justify-center mb-8 relative">
          {/* Main Image */}
          <img
            src="/about1.avif"
            alt="Cafe Interior"
            className="w-100 h-100 rounded-3xl object-cover shadow-lg relative z-10"
          />
        </div>

        {/* Content Section */}
        <div className="text-[#3d2f23]">
          <h2 className="font-nunito text-2xl font-bold mb-4 animate-slideInLeft">
            Welcome to <span className="text-[#d7bd6a]">The Moon Cafe</span>
          </h2>

          <p className="mb-4 text-gray-700 text-sm animate-fadeIn">
            A cozy blend of flavors and ambiance inspired by Turkish traditions,
            right in the heart of Surat.
          </p>
          <p className="mb-8 text-gray-700 text-sm animate-fadeIn delay-200">
            Whether it’s a coffee break or a dining experience, The Moon Cafe is
            where stories are shared, and memories are created.
          </p>
          {/* Experience Box */}
          {/* <div className="rounded-lg py-6 px-8 inline-block mb-6"> */}

          {/* Experience + Contact Row */}
          <div className="flex justify-between items-center gap-3 mx-3 animate-fadeInUp">
            <div className="flex items-center gap-3">
              <span className="w-2 h-12 bg-[#3d2f23]"></span>
              <span className="text-[#3d2f23] text-4xl font-bold">
                <CountUp start={0} end={8} duration={5} />
              </span>
              <div className="text-left">
                <p className="text-gray-800 text-xs font-medium">Years Of</p>
                <h1 className="font-extrabold text-[#d7bd6a] text-sm">
                  Experience
                </h1>
              </div>
            </div>

            <Link
              to="/contact"
              className="bg-[#453423] text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-[#957d49] hover:scale-110 hover:shadow-lg transform transition duration-300"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
