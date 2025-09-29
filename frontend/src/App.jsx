import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import About from "./Components/About";
import Teamsection from "./Components/TeamSection";
import TestimonialSection from "./Components/Testimonial";
import CafeGallery from "./Components/Gallery";
import ScrollToTopButton from './Components/ScrollToTopButton';

import AOS from "aos";
import "aos/dist/aos.css";  // animation import

// Pages
import Aboutpage from "./Pages/Aboutpage";
import Servicespage from "./Pages/Servicespage";
import Contactpage from "./Pages/Contactpage";
import LoadingPage from "./Pages/LoadingPage";
import CafeLook from "./Pages/CafeLook";
import ScrollToTop from "./Components/ScrollToTop";
import AdminLogin from "../admin/Pages/AdminLogin";
import AdminPage from "../admin/Pages/AdminPage";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingPage />; // Show splash until finished
  }

  return (
    <>
      <ScrollToTop /> {/*Ensure window scrolls to top on every page load */}

      {/* Show Navbar only if not in admin */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <section id="home"><Hero /></section>
              <section id="services"><Services /></section>
              <section id="about"><About /></section>
              <CafeGallery />
              <Teamsection />
              <TestimonialSection />
            </>
          }
        />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/services" element={<Servicespage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/cafelook" element={<CafeLook />} />
      </Routes>

      <ScrollToTopButton />

      {/* Show Footer only if not in admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
