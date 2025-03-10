import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiSearch, BiCog } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../assets/css/sidebar.css"; // Make sure path is correct

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

  // Hover logic
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
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

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.3,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar`}
          style={{ backgroundColor: "var(--background-color)" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                  style={{ color: "var(--heading-color)" }}
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              {/* <FaBars onClick={toggle} style={{ color: "var(--default-color)" }} /> */}
            </div>
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
                  className="link"
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
                    {isOpen && (
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
