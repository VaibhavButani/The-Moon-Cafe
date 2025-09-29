import React from "react";
import { Link } from "react-router-dom";
import Services from "../Components/Services";



const AboutPage = () => {
  return (
    <div className="w-full bg-[#f8f5f0]">
      {/* Hero Section */}
      <div
        className="relative bg-[url(services-bg.webp)] w-full h-[250px] md:h-[400px] bg-cover bg-center flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-nunito text-3xl md:text-4xl font-bold">Services</h1>
          <p className="mt-2 text-sm md:text-base">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            / <span className="text-gray-200">Services</span>
          </p>
        </div>
      </div>
      {/* Services Content */}
      <Services/>
    </div>
  );
};

export default AboutPage;
