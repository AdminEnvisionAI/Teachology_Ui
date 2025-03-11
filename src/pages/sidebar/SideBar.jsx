import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa"; // Import FaTimes for close icon
import { MdMessage } from "react-icons/md";
import { BiSearch, BiCog } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/css/sidebar.css";

const routes = [
  {
    path: "/tools",
    name: "Tools",
    icon: <BiCog />,
  },
  {
    path: "/chatbot",
    name: "Chatbot",
    icon: <MdMessage />,
  },
  {
    path: "/outputhistory",
    name: "Output History",
    icon: <AiFillHeart />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebarMobile = () => {
    setSidebarOpenMobile(!sidebarOpenMobile);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsOpen(false);
    }
  };

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.2,
      },
    },
  };

  const isToolsLinkActive = () => {
    return location.pathname.startsWith("/tools");
  };

  return (
    <>
      <div className="main-container">
        {isMobile && (
          <div className="mobile-menu-toggle">
            {" "}
            {/* Container for the hamburger and close button */}
            {!sidebarOpenMobile ? (
              <FaBars
                onClick={toggleSidebarMobile}
                className="hamburger-menu"
              />
            ) : (
              <FaTimes onClick={toggleSidebarMobile} className="close-menu" />
            )}
          </div>
        )}
        <motion.div
          animate={{
            width: isMobile
              ? sidebarOpenMobile
                ? "150px"
                : "0px" // Mobile open/close width
              : isOpen
              ? "150px"
              : "35px", // Desktop hover logic
            transition: {
              duration: 0.3,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar ${sidebarOpenMobile ? "open" : ""}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="top_section">
            <div className="bars">{/*  Removed redundant FaBars  */}</div>
          </div>
          <div className="search">
            <div
              className="search_icon"
              style={{ color: "var(--default-color)" }}
            >
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                  style={{
                    backgroundColor: "var(--surface-color)",
                    color: "var(--default-color)",
                  }}
                />
              )}
            </AnimatePresence>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className={`link ${
                    route.path === "/tools" && isToolsLinkActive()
                      ? "active"
                      : ""
                  }`}
                  activeClassName="active"
                  style={{
                    color: "var(--default-color)",
                  }}
                >
                  <div
                    className="icon"
                    style={{ color: "var(--default-color)" }}
                  >
                    {route.icon}
                  </div>
                  <AnimatePresence>
                    {(!isMobile || sidebarOpenMobile) && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                        style={{ color: "var(--default-color)" }}
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
