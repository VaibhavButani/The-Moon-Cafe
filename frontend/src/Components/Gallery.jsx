import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import axios from "axios";
import API_BASE from "../config";

export default function CafeGallery() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  // swipe + animation state
  const [touchStartX, setTouchStartX] = useState(null);
  const [dragX, setDragX] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showSwipeNote, setShowSwipeNote] = useState(false);

  const timerRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  // fetch gallery
  useEffect(() => {
    axios
      .get(`${API_BASE}/api/gallery`)
      .then((res) => {
        const shuffled = [...res.data].sort(() => 0.5 - Math.random());
        setImages(shuffled.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = currentIndex !== null ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [currentIndex]);

  // keyboard navigation
  useEffect(() => {
    if (currentIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextBtnRef.current?.click();
      else if (e.key === "ArrowLeft") prevBtnRef.current?.click();
      else if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setDragX(0);
    setTransitioning(false);
    setAnimating(false);
    setShowSwipeNote(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowSwipeNote(false), 2500);
  };

  const closeLightbox = () => {
    setCurrentIndex(null);
    setDragX(0);
    setTransitioning(false);
    setAnimating(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowSwipeNote(false);
  };

  const goToIndex = (nextIndex) => {
    const n = images.length;
    return ((nextIndex % n) + n) % n;
  };

  const slideTo = (direction) => {
    if (animating || currentIndex === null) return;
    setAnimating(true);
    const width = window.innerWidth || 1000;

    if (direction === "left") {
      setTransitioning(true);
      setDragX(-width);

      setTimeout(() => {
        const next = goToIndex(currentIndex + 1);
        setTransitioning(false);
        setCurrentIndex(next);
        setDragX(width);

        setTimeout(() => {
          setTransitioning(true);
          setDragX(0);
          setTimeout(() => {
            setTransitioning(false);
            setAnimating(false);
          }, 300);
        }, 20);
      }, 300);
    } else {
      setTransitioning(true);
      setDragX(width);

      setTimeout(() => {
        const prev = goToIndex(currentIndex - 1);
        setTransitioning(false);
        setCurrentIndex(prev);
        setDragX(-width);

        setTimeout(() => {
          setTransitioning(true);
          setDragX(0);
          setTimeout(() => {
            setTransitioning(false);
            setAnimating(false);
          }, 300);
        }, 20);
      }, 300);
    }
  };

  const prevImg = (e) => {
    if (e) e.stopPropagation();
    slideTo("right");
  };

  const nextImg = (e) => {
    if (e) e.stopPropagation();
    slideTo("left");
  };

  const handleTouchStart = (e) => {
    if (animating) return;
    setTouchStartX(e.touches[0].clientX);
    setTransitioning(false);
    setDragX(0);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null || animating) return;
    const dx = e.touches[0].clientX - touchStartX;
    setDragX(dx);
  };

  const handleTouchEnd = () => {
    if (animating || touchStartX === null) {
      setTouchStartX(null);
      setDragX(0);
      return;
    }

    const threshold = 80;
    if (dragX <= -threshold) {
      slideTo("left");
    } else if (dragX >= threshold) {
      slideTo("right");
    } else {
      setTransitioning(true);
      setDragX(0);
      setTimeout(() => setTransitioning(false), 200);
    }
    setTouchStartX(null);
  };

  return (
    <div className="bg-[#e0dbd2]/60 py-20 px-4 sm:px-6 lg:px-8">
      {/* Unique Heading */}
      <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center font-gagalin text-transparent bg-clip-text bg-gradient-to-r from-[#b68d40] via-[#66422b] to-[#3e2a20] drop-shadow-lg mb-14 tracking-wide">
        Moonlit Moments
        <span className="block w-28 sm:w-40 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-[#b68d40] via-[#f5d48d] to-[#66422b]"></span>
      </h1>

      {/* Masonry Grid */}
      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 mb-12">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer break-inside-avoid group"
            onClick={() => openLightbox(idx)}
            data-aos="zoom-in"
            data-aos-delay={`${idx * 200}`}
          >
            {/* Image */}
            <img
              src={`${API_BASE}/uploads/gallery/${img.filename}`}
              alt={`Cafe ${idx + 1}`}
              className="w-full rounded-xl transform transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            />

            {/* Golden Border Glow */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#f5d48d]/80 transition duration-700"></div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-700"></div>

            {/* Hover Text */}
            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-4 transition-all duration-500">
              <p className="font-semibold tracking-wide text-lg">Golden Ambience</p>
              <span className="block w-10 h-1 mt-1 bg-[#f5d48d] rounded"></span>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center">
        <Link
          to="/cafelook"
          className="px-6 py-3 bg-gradient-to-r from-[#66422b] to-[#3e2a20] text-white rounded-full font-bold shadow-md hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Show More
        </Link>
      </div>

      {/* Lightbox */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 text-white text-4xl hover:text-[#f5d48d] transition z-60"
            onClick={closeLightbox}
          >
            <IoClose />
          </button>

          {/* Prev */}
          <button
            ref={prevBtnRef}
            className="absolute left-6 text-white text-5xl hover:text-[#f5d48d] transition hidden sm:block z-60"
            onClick={prevImg}
          >
            <IoChevronBack />
          </button>

          {/* Image */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `translateX(${dragX}px)`,
              transition: transitioning ? "transform 300ms ease" : "none",
              width: "100%",
              maxWidth: "90%",
              display: "flex",
              justifyContent: "center",
            }}
            className="z-50"
          >
            <img
              src={`${API_BASE}/uploads/gallery/${images[currentIndex].filename}`}
              alt="Full view"
              style={{ maxHeight: "90%", objectFit: "contain" }}
              className="rounded-lg shadow-2xl border-4 border-white/20"
            />
          </div>

          {/* Next */}
          <button
            ref={nextBtnRef}
            className="absolute right-6 text-white text-5xl hover:text-[#f5d48d] transition hidden sm:block z-60"
            onClick={nextImg}
          >
            <IoChevronForward />
          </button>

          {/* Swipe Note */}
          {showSwipeNote && (
            <p className="absolute bottom-6 text-sm text-gray-300 italic sm:hidden animate-pulse z-60">
              ← Swipe to explore →
            </p>
          )}
        </div>
      )}
    </div>
  );
}
