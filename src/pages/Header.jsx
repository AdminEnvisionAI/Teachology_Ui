import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Image,
  OverlayTrigger,
  Popover,
  Button,
} from "react-bootstrap";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth); // Get authentication info from Redux
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

  const handleLogout = () => {
    navigate("/logout"); // Redirect to the logout route
  };

  const renderProfilePopover = (props) => (
    <Popover {...props} id="profile-popover">
      <Popover.Header as="h3">User Profile</Popover.Header>
      <Popover.Body>
        <div className="d-flex flex-column align-items-center">
          <Image
            src={auth.profile_image || "/assets/default-profile.png"} // Use a default image path if profile_image is null
            roundedCircle
            width={80}
            height={80}
            style={{ objectFit: "cover", marginBottom: "10px" }}
            alt="User Profile"
          />
          <p className="mb-1">
            <strong>Username:</strong> {auth.username || "Guest"}
          </p>
          <p className="mb-1">
            <strong>Email:</strong> {auth.user}
          </p>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  let navContent;

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
            {!auth.user ? (
              <>
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
              </>
            ) : null}
          </ul>
        </nav>


        {auth.user ? (
          // Profile provider replaces toggle menu when logged in
          <div className="ms-auto">
            {/* ms-auto is margin-start: auto */}
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={renderProfilePopover}
            >
              <span style={{ cursor: "pointer" }}>
                <Image
                  src={auth.profile_image || "/assets/default-profile.png"}
                  roundedCircle
                  width={30}
                  height={30}
                  style={{ objectFit: "cover", marginRight: "5px" }}
                  alt="Profile"
                />
                {auth.username || "Profile"}
              </span>
            </OverlayTrigger>
          </div>
        ) : (
          // Render the hamburger menu when not logged in
          <i
            className={`mobile-nav-toggle d-xl-none bi ${
              isNavOpen ? "bi-x" : "bi-list"
            }`}
            onClick={toggleNav}
          />
        )}
      </div>
    </header>
  );
}

export default Header;