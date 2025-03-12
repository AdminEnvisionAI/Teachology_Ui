// App.js
import React, { useState, useEffect, createContext, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
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
import ResetPassword from "./pages/ResetPassword";
import ChatBot from "./pages/Chatbot";
import OutputHistory from "./pages/OutputHistory";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import ToolDetail from "./pages/ToolDetail"; // Import ToolDetail
import Output from "./pages/Output"; // Import the Output component
import Logout from "./pages/Logout";
import ResetEmail from "./pages/ResetEmail";
import EnterIdentifier from "./pages/EnterIdentifier"; // Import EnterIdentifier
import VerifyMobileOTP from "./pages/VerifyMobileOTP"; // Import VerifyMobileOTP
import NotFound from "./pages/Notfound"; // Import the NotFound component

// Import necessary Redux hooks (if using Redux)
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from './redux/authSlice'; // Adjust path to your authSlice

// Create Authentication Context
const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  // Use Redux state if you have it
  const user = useSelector((state) => state.auth.user); // Example: state.auth.user
  const dispatch = useDispatch();

  // Local state to manage loading during token validation
  const [loading, setLoading] = useState(true);

  // const [isLoggedIn, setIsLoggedIn] = useState(() => {
  //   const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
  //   return storedIsLoggedIn === "true" || false;
  // });
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);  // Initialize based on Redux state.  Could also check for a token

  useEffect(() => {
    // Function to validate the token from localStorage
    const validateToken = async () => {
      const token = localStorage.getItem("authToken");  // Or however you store it

      if (token) {
        try {
          // Replace with your actual API endpoint for token validation
          const response = await fetch("/api/validate-token", {  // Example endpoint
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json(); // Expecting data like { isValid: true, user: { ... } }
            if (data.isValid) {
              // Token is valid, set user data in Redux and isLoggedIn in context
              dispatch(setUser(data.user));
              setIsLoggedIn(true);
            } else {
              // Token is invalid, clear everything
              localStorage.removeItem("authToken");
              dispatch(clearUser()); // Clear Redux user
              setIsLoggedIn(false);
            }
          } else {
            // Server error during validation
            console.error("Token validation failed:", response.status);
            localStorage.removeItem("authToken");
            dispatch(clearUser());
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error("Error validating token:", error);
          localStorage.removeItem("authToken");
          dispatch(clearUser());
          setIsLoggedIn(false);
        } finally {
          setLoading(false); // Validation complete
        }
      } else {
        // No token found in localStorage
        setIsLoggedIn(false);
        setLoading(false);
      }
    };

    validateToken(); // Call the token validation function on mount
  }, [dispatch]);  // Dependency array includes dispatch

  // useEffect(() => {
  //   localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  // }, [isLoggedIn]);

  useEffect(() => {
      setIsLoggedIn(!!user); // Update isLoggedIn when user changes in Redux.
  }, [user]);

  const handleLogin = (userData) => {
    // localStorage.setItem("isLoggedIn", "true");
    // setIsLoggedIn(true);

    // Assuming your login endpoint returns user data and a token:
    localStorage.setItem("authToken", userData.token); // Store the token
    dispatch(setUser(userData.user)); // Store user data in Redux
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");  // Remove the token
    dispatch(clearUser()); // Clear Redux user data
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    onLogin: handleLogin,
    onLogout: handleLogout,
    loading, // Expose loading state
    user // Expose the user object for easier access
  };

  // Show a loading indicator while validating the token
  if (loading) {
    return <div>Loading...</div>; // Or a more sophisticated spinner
  }

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
  const { isLoggedIn, loading } = useAuth();  // Get loading state

  const location = useLocation();

  if (loading) {
      return <div>Loading...</div>; //Or a better spinner, same as AuthProvider.
  }

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
  const { isLoggedIn, onLogout, user } = true; //useAuth();
  const location = useLocation(); // Use useLocation hook

  const showFooter = location.pathname !== '/chatbot'; // Conditionally show the footer

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} onLogout={onLogout} user={user} /> {/* Pass user to Header */}
      <main className="main">  {/* Wrap all routes in the main tag*/}
        <Routes>
          <Route
            path="/chatbot"
            element={
              <RequireAuth>
                <>
                  <Home />
                  <ChatBot />
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
                </>
              </RequireAuth>
            }
          />
          <Route
            path="/output"
            element={
              <RequireAuth>
                <>
                  <Home />
                  <Output />
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
                </>
              </RequireAuth>
            }
          />

          <Route
            path="/tools" // Route for the main Tools page
            element={
              // <RequireAuth>
                <>
                  <Home />
                  <Tools />
                </>
              // </RequireAuth>
            }
          />

          {/* Authentication Routes */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-email" element={<ResetEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/verify-email-otp" element={<EnterIdentifier />} />  {/* Add EnterIdentifier Route */}
          <Route path="/verify-mobile-otp" element={<VerifyMobileOTP />} /> {/* Add VerifyMobileOTP Route */}
          {/* Public routes accessible to all (including logged out users) */}
          <Route
            path="/"
            element={1 == 1 ? <Navigate to="/home" replace /> : <Landing />}
          />
          <Route
            path="/about"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <About />}
          />
          <Route
            path="/skills"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Skills />}
          />
          <Route
            path="/resume"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Resume />}
          />
          <Route
            path="/portfolio"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Portfolio />}
          />
          <Route
            path="/services"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Services />}
          />
          <Route
            path="/faq"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Faq />}
          />
          <Route
            path="/contact"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Contact />}
          />
          <Route path="/portfolio-details/:id"
                 element={isLoggedIn ? <Navigate to="/home" replace /> : <PortfolioDetails />} />


          {/* Protected Main Content Routes */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <MainContent />
              </RequireAuth>
            }
          />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showFooter && <Footer />}  {/* Conditionally render the footer */}
       <a
          href="#"
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>
    </div>
  );
}

function MainContent() {
  return (
    <>
        <Home />
        <Tools />
    </>
  );
}

export default App;