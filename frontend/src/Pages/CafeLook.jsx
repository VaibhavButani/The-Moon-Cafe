// CafeLook.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import axios from "axios";
import API_BASE from "../config";

export default function Gallery() {
  const [images, setImages] = useState([]); // backend images
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [direction, setDirection] = useState("next");
  const [animKey, setAnimKey] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const [dragX, setDragX] = useState(0);

  // ✅ Fetch images from backend API
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/gallery`)
      .then((res) => setImages(res.data))
      .catch((err) => {
        console.error("Error fetching gallery:", err);
        setImages([]);
      });
  }, []);

  const openLightbox = (index) => setCurrentIndex(index);
  const closeLightbox = () => setCurrentIndex(null);

  const prevImg = () => {
    setDirection("prev");
    setAnimKey((k) => k + 1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImg = () => {
    setDirection("next");
    setAnimKey((k) => k + 1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Disable background scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = currentIndex !== null ? "hidden" : "";
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  // Swipe handling
  const handleTouchStart = (e) => setDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => {
    if (dragStart !== null) setDragX(e.touches[0].clientX - dragStart);
  };
  const handleTouchEnd = () => {
    if (Math.abs(dragX) > 100) {
      if (dragX > 0) prevImg();
      else nextImg();
    }
    setDragX(0);
    setDragStart(null);
  };

  // Load more images
  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 3, images.length));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#f8f5f0] overflow-hidden">
      {/* Animations */}
      <style>
        {`
          @keyframes slideInRight {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInLeft {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slideInRight { animation: slideInRight 0.5s ease-out; }
          .animate-slideInLeft { animation: slideInLeft 0.5s ease-out; }
          .spin { animation: spin 1s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}
      </style>

      {/* Hero Section */}
      <div className="relative bg-[url(services-bg.webp)] w-full h-[250px] md:h-[400px] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-nunito text-3xl md:text-4xl font-bold">
            Cafe Look
          </h1>
          <p className="mt-2 text-sm md:text-base">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            &gt; <span className="text-gray-200">Cafe Look</span>
          </p>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl text-center mx-auto py-16 px-6 md:px-12">
        <p className="font-pacifico text-lg italic text-[#523625] sm:text-lg md:text-2xl tracking-wide">
          --- Royal Memories---{" "}
        </p>
        <h1 className="font-nunito sm:text-4xl md:text-3xl font-extrabold text-[#66422b] mt-3 leading-snug">
          A LUXURY <span className="text-[#957d49]">VISUAL EXPERIENCE</span>
        </h1>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.slice(0, visibleCount).map((img, idx) => (
            <div
              key={img._id || img.filename}
              className="relative overflow-hidden rounded-sm shadow-lg cursor-pointer group break-inside-avoid animate-fadeInUp"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={`${API_BASE}/uploads/gallery/${img.filename}`}
                alt={`Gallery ${idx + 1}`}
                className="w-full rounded-sm transform group-hover:scale-105 transition duration-700"
              />
              {/* Hover Text */}
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                <p className="font-semibold tracking-wide text-lg">
                  Golden Ambience
                </p>
                <span className="block w-10 h-1 mt-1 bg-[#f5d48d] rounded"></span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-10">
          {loading ? (
            <div className="w-10 h-10 border-4 border-[#4b3b35] border-t-transparent rounded-full spin"></div>
          ) : (
            visibleCount < images.length && (
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-[#66422b] cursor-pointer text-white rounded-full font-bold shadow-md hover:bg-[#533521] hover:scale-105 transition-transform duration-300"
              >
                Show More
              </button>
            )
          )}
        </div>
      </div>

      {/* Lightbox */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="fixed top-6 right-6 text-white text-4xl cursor-pointer hover:text-[#f5d48d] transition z-[60]"
            onClick={closeLightbox}
          >
            <IoClose />
          </button>
          <button
            className="absolute left-6 hidden md:block cursor-pointer text-white text-5xl hover:text-[#f5d48d] transition"
            onClick={(e) => {
              e.stopPropagation();
              prevImg();
            }}
          >
            <IoChevronBack />
          </button>

          <div
            key={animKey}
            className="flex justify-center items-center w-full max-w-[90vw] h-full"
            style={{
              transform: `translateX(${dragX}px)`,
              transition: dragX === 0 ? "transform 0.3s ease" : "none",
            }}
          >
            <img
              src={`${API_BASE}/uploads/gallery/${images[currentIndex].filename}`}
              alt="Full view"
              className={`max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl border-4 border-white/20 ${
                direction === "next"
                  ? "animate-slideInRight"
                  : "animate-slideInLeft"
              }`}
            />
          </div>

          <button
            className="absolute right-6 hidden md:block text-white text-5xl cursor-pointer hover:text-[#f5d48d] transition"
            onClick={(e) => {
              e.stopPropagation();
              nextImg();
            }}
          >
            <IoChevronForward />
          </button>
          <p className="absolute bottom-6 text-white/70 text-sm md:hidden animate-pulse">
            Swipe to navigate
          </p>
        </div>
      )}
    </div>
  );
}
