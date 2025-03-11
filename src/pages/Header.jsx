import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    setIsNavOpen(!isNavOpen);
  };

  const closeMobileNav = () => {
    document.querySelector("body").classList.remove("mobile-nav-active");
    setIsNavOpen(false);
  };

  useEffect(() => {
    // Hide mobile nav on same-page/hash links
    const handleNavLinkClick = () => {
      if (document.querySelector(".mobile-nav-active")) {
        closeMobileNav();
      }
    };

    document.querySelectorAll("#navmenu a").forEach((navmenu) => {
      navmenu.addEventListener("click", handleNavLinkClick);
    });

    // Cleanup event listeners
    return () => {
      document.querySelectorAll("#navmenu a").forEach((navmenu) => {
        navmenu.removeEventListener("click", handleNavLinkClick);
      });
    };
  }, []);

  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
          <img
            src="/assets/logo.png"
            alt="EasyFolio Logo"
            className="logo-image"
          />
        </Link>

        <nav id="navmenu" className={`navmenu ${isNavOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                className={location.pathname === "/portfolio" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={location.pathname === "/services" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={location.pathname === "/contact" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={location.pathname === "/login" ? "active" : ""}
                onClick={closeMobileNav}
              >
                Login
              </Link>
            </li>
          </ul>
          <i
            className={`mobile-nav-toggle d-xl-none bi ${
              isNavOpen ? "bi-x" : "bi-list"
            }`}
            onClick={toggleNav}
          ></i>
        </nav>

        <div className="header-social-links">
          <a href="#" className="twitter">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="#" className="facebook">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="instagram">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" className="linkedin">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
