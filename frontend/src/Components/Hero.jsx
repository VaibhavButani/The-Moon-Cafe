import React, { useState, useEffect } from "react";

function Hero() {
  const handleOpenAndDownload = (e) => {
    e.preventDefault();
    const fileUrl = "/menu.pdf";

    // Open in new tab
    window.open(fileUrl, "_blank", "noopener,noreferrer");

    // Trigger download
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "The-Moon-Cafe-Menu.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ----- Mobile Background Rotation -----
  const backgrounds = ["/left.gif", "/right.gif"];
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ---------------- MOBILE HERO ---------------- */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden md:hidden">
        {/* Auto-rotating Background */}
        <div className="absolute inset-0 -z-10">
          {backgrounds.map((bg, i) => (
            <img
              key={i}
              src={bg}
              alt="background"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                i === currentBg ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto px-6 animate-fadeIn">
          <img
            src="/logo.png"
            alt="The Moon Cafe"
            className="w-32 h-32 object-contain drop-shadow-lg hover:scale-110 transition-transform duration-500"
          />

          <h1 className="font-nunito mt-4 text-3xl font-bold text-white leading-snug animate-slideUp">
            Welcome to The Moon Cafe
          </h1>

          <p className="mt-3 text-base text-gray-200 px-2 animate-fadeIn delay-200">
            A cozy place under the stars — coffee, food, and conversations.
          </p>

          <button
            onClick={handleOpenAndDownload}
            className="mt-5 relative px-6 py-3 rounded-full font-semibold text-white 
                       bg-gradient-to-r from-[#453423] via-[#6b4e35] to-[#957d49] 
                       shadow-lg transition-all duration-500 
                       hover:scale-105 hover:shadow-2xl hover:from-[#d4af37] hover:to-[#957d49]"
          >
            <span className="relative z-10">Explore Menu</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#957d49] to-[#d4af37] opacity-0 hover:opacity-30 transition duration-500 blur-md"></span>
          </button>
        </div>
      </section>

      {/* ---------------- DESKTOP HERO ---------------- */}
      <section className="hidden md:flex relative w-full max-h-screen flex-col md:flex-row">
        {/* Background image */}
        <div className="fixed inset-0 -z-10">
          <img
            className="w-full h-full object-cover"
            src="/gallery-bg.png"
            alt="gallery-bg"
          />
        </div>

        {/* Left GIF */}
        <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
          <img
            src="/left.gif"
            alt="Cafe Animation Left"
            className="w-full h-full object-cover transition-transform duration-700"
          />
        </div>

        {/* Center Content */}
        <div className="relative w-full md:w-1/3 flex flex-col items-center justify-center text-center px-6 py-12 md:py-0 overflow-hidden">
          <img
            src="/midimage.webp"
            alt="Cafe Background"
            className="absolute inset-0 w-full h-full object-cover opacity-30 md:opacity-100"
          />
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Foreground */}
          <div className="relative z-10 flex flex-col items-center max-w-md mx-auto animate-fadeIn">
            <img
              src="/logo.png"
              alt="The Moon Cafe"
              className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-xl hover:scale-110 transition-transform duration-700"
            />

            <h1 className="font-nunito mt-6 text-4xl md:text-5xl font-bold text-white leading-snug animate-slideUp">
              Welcome to The Moon Cafe
            </h1>

            <p className="mt-4 text-lg text-gray-200 px-2 animate-fadeIn delay-200">
              A cozy place under the stars — coffee, food, and conversations.
            </p>

            <button
              onClick={handleOpenAndDownload}
              className="mt-6 relative px-8 py-3 rounded-full font-semibold text-white 
                         bg-gradient-to-r from-[#453423] via-[#6b4e35] to-[#957d49] 
                         shadow-lg transition-all duration-500 
                         hover:scale-110 hover:shadow-2xl"
            >
              <span className="relative z-10">Explore Menu</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r opacity-0 hover:opacity-30 transition duration-500 blur-md"></span>
            </button>
          </div>
        </div>

        {/* Right GIF */}
        <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
          <img
            src="/right.gif"
            alt="Cafe Animation Right"
            className="w-full h-full object-cover transition-transform duration-700 "
          />
          {/* hover:scale-110 hover:brightness-110 */}
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
        .animate-slideUp { animation: slideUp 1s ease forwards; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </>
  );
}

export default Hero;
