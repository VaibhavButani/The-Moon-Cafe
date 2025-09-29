import React, { useEffect, useState } from "react";

function LoadingPage() {
  const [fadeOut, setFadeOut] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    // Start fade-out after 2s
    // const timer1 = setTimeout(() => {
    //   setFadeOut(true);
    // }, 2000);

   // Remove loader after fade-out completes
    const timer2 = setTimeout(() => {
     setisLoading(true);
    }, 2500);

    return () => {
    //   clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isLoading]);

  return (
    <div
      className={`fixed inset-0 h-screen w-screen bg-[#352f27] flex items-center justify-center z-[9999] transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <img
        src="/logo.png"
        alt="The Moon Cafe Logo"
        className="w-40 h-40 animate-bounce drop-shadow-lg"
      />
    </div>
  );
}

export default LoadingPage;
