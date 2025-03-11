// App.js
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
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

// Create Authentication Context
const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn === "true" || false;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

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

// Protected Route Component
function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to the login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
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

  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { isLoggedIn, onLogout } = useAuth();
  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <Routes>
        <Route
          path="/chatbot"
          element={
            <RequireAuth>
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
            </RequireAuth>
          }
        />
        <Route
          path="/outputhistory"
          element={
            <RequireAuth>
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
            </RequireAuth>
          }
        />

        <Route
          path="/tool/:toolTitle" // Route for individual tool details
          element={
            <RequireAuth>
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
            </RequireAuth>
          }
        />

        <Route
          path="/tools" // Route for the main Tools page
          element={
            <RequireAuth>
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
            </RequireAuth>
          }
        />

        {/* Authentication Routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-reset" element={<OTPReset />} />
        <Route path="/otp-email" element={<OTPEmail />} />
        <Route
          path="/"
          element={
            <>
              <Landing />
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

        {/* Protected Main Content Routes */}
        <Route
          path="/*"
          element={
            <RequireAuth>
              <MainContent />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

function MainContent() {
  return (
    <main className="main">
      <Routes>
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
      </Routes>
      <Footer />
      <a
        href="#"
        id="scroll-top"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </main>
  );
}

export default App;
