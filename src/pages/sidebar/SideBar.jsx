import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiSearch, BiCog } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
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

  const isToolsLinkActive = () => {
    return location.pathname.startsWith("/tools");
  };

  return (
    <>
      <div className="main-container">
        {isMobile && (
          <div className="mobile-menu-toggle">
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
        <div
          className={`sidebar ${sidebarOpenMobile ? "open" : ""}`}
          style={{
            width: isMobile
              ? sidebarOpenMobile
                ? "200px"
                : "0px"
              : "200px",
          }}
        >
          <div className="top_section">
            {/* Removed redundant FaBars */}
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
                >
                  <div className="icon">{route.icon}</div>
                  <div className="link_text">{route.name}</div>
                </NavLink>
              );
            })}
          </section>
        </div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;