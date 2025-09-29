import { useState, useEffect } from 'react';
// import { FaCoffee  } from 'react-icons/fa';  install with: npm install react-icons

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    // Delay before scrolling
    setTimeout(() => {
      // Custom slow scroll effect
      const scrollStep = -window.scrollY / 90; // smaller divisor = slower scroll
      const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 10); // speed of steps
    },); // wait second  before starting scroll
  };

  return (
   <div className="fixed bottom-6 right-6 z-10">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="relative w-16 cursor-pointer h-16 bg-[#2f2a24] rounded-full bgoverflow-hidden shadow-lg 
          border-4 border-transparent hover:scale-110 transition-all duration-500"
        >
          {/* Outer animated ring */}
          {/* <span className="absolute inset-0 rounded-full border-4 border-amber-500 animate-ping"></span> */}

          {/* Your image inside */}
          <img
            src="/logo.png" // replace with your image path
            alt="Scroll to top"
            className="w-full h-full object-cover rounded-full relative z-10"
          />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;


