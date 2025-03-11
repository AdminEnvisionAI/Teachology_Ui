// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import "./assets/css/main.css";
import AOS from "aos";
import GLightbox from "glightbox";

// Component Imports
import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Resume from "./pages/Resume";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import PortfolioDetails from "./pages/PortfolioDetails";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import OTPReset from "./pages/OTPReset";
import OTPEmail from "./pages/OTPEmail";
import ChatBot from "./pages/Chatbot";
import OutputHistory from "./pages/OutputHistory";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import ToolDetail from "./pages/ToolDetail"; // Import ToolDetail  (Assuming you've created this)

function Landing() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <Faq />
      <Contact />
    </>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn === "true" || false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const glightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      glightbox.destroy();
    };
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/chatbot"
            element={
              <>
                <Home />
                <ChatBot />
                <a
                  href="#"
                  id="scroll-top"
                  className="scroll-top d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-arrow-up-short"></i>
                </a>
              </>
            }
          />
          <Route
            path="/outputhistory"
            element={
              <>
                <Home />
                <OutputHistory />
                <Footer />

                <a
                  href="#"
                  id="scroll-top"
                  className="scroll-top d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-arrow-up-short"></i>
                </a>
              </>
            }
          />

          <Route
            path="/tool/:toolTitle" // Route for individual tool details
            element={
              <>
                <Home /> {/* Or any layout you want */}
                <ToolDetail /> {/* Render the ToolDetail component */}
                <Footer />
                <a
                  href="#"
                  id="scroll-top"
                  className="scroll-top d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-arrow-up-short"></i>
                </a>
              </>
            }
          />

          <Route
            path="/tools" // Route for the main Tools page
            element={
              <>
                <Home />
                <Tools />
                <Footer />
                <a
                  href="#"
                  id="scroll-top"
                  className="scroll-top d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-arrow-up-short"></i>
                </a>
              </>
            }
          />

          {/* Main content route - moved to be after /tools and /tool/:toolTitle route */}
          <Route
            path="*"
            element={
              <>
                <MainContent isLoggedIn={isLoggedIn} />
                <Footer />
                <a
                  href="#"
                  id="scroll-top"
                  className="scroll-top d-flex align-items-center justify-content-center"
                >
                  <i className="bi bi-arrow-up-short"></i>
                </a>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function MainContent({ isLoggedIn }) {
  return (
    <main className="main">
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-reset" element={<OTPReset />} />
        <Route path="/otp-email" element={<OTPEmail />} />

        {/* Home route with Tools */}
        <Route
          path="/"
          element={
            <>
              <Landing />
              <Tools />
            </>
          }
        />

        {/*Home route with Tools  */}
        <Route
          path="/home"
          element={
            <>
              <Home />
              <Tools />
            </>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio-details/:id" element={<PortfolioDetails />} />
      </Routes>
    </main>
  );
}

export default App;
