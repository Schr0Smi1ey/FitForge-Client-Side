import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import "react-tooltip/dist/react-tooltip.css";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
const NavBar = () => {
  const { user, signOutUser, Toast, setLoading, theme, toggleTheme } =
    useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenuDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  const showSignOutModal = (event) => {
    event.preventDefault();
    document.getElementById("signout-modal").showModal();
    setIsProfileOpen(false);
  };
  const hideSignOutModal = () => {
    document.getElementById("signout-modal").close();
  };
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        Toast("Logged Out Successfully", "warning");
        navigate("/");
      })
      .catch((error) => {
        Toast(error.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
    hideSignOutModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".profile-menu")) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isProfileOpen]);
  const navItems = ["Home", "Trainers", "Classes", "Community"];
  const getLinkPath = (item) => {
    if (item === "Home") return "/";
    return `/${item.toLowerCase().replace(" ", "-")}`;
  };
  const navElements = (
    <ul
      className={`flex flex-col text-center lg:flex-row items-center justify-center gap-2 sm:gap-5 font-medium text-lg`}
    >
      {navItems.map((item, index) => (
        <motion.div
          key={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <NavLink
            to={getLinkPath(item)}
            className={`dark:text-white ${
              scroll
                ? "hover:text-white dark:hover:text-primary"
                : "hover:text-primary dark:hover:text-primary"
            }  text-base font-semibold transition-colors duration-300 relative group`}
          >
            {item}
            <span
              className={`absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#802819] transition-all duration-300 group-hover:w-full`}
            ></span>
          </NavLink>
        </motion.div>
      ))}
    </ul>
  );
  const navElementsEnd = (
    <div className="flex items-center justify-center gap-5 sm:justify-left md:mb-0 relative">
      <button
        onClick={toggleTheme}
        className="relative w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
      >
        <div
          className={`absolute left-1 w-6 h-6 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
        <Sun className="absolute left-2 w-4 h-4 text-yellow-500 dark:hidden" />
        <Moon className="absolute right-2 w-4 h-4 text-gray-900 hidden dark:block" />
      </button>
      {user && (
        <div className="relative profile-menu">
          <button
            onClick={() => setIsProfileOpen((prevState) => !prevState)}
            className="btn border-2 border-primary hover:border-primary btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Profile Image"
                src={user.photoURL || "https://i.pravatar.cc/500"}
              />
            </div>
          </button>
          {isProfileOpen && (
            <ul className="absolute dark:bg-black dark:border-2 dark:border-white/40 right-4 bg-base-100 rounded-box z-10 w-fit min-w-40 mt-3 p-2 shadow-lg">
              <li className="block text-center p-2">
                <img
                  src={user.photoURL}
                  alt=""
                  className="block rounded-2xl mx-auto mb-2"
                />
                <span className="font-semibold text-base">
                  {user.displayName}
                </span>
              </li>
              <motion.div
                key={"profile"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={toggleMenuDropdown}
                className="px-2 py-1 w-fit rounded-md"
              >
                <Link
                  to="/profile"
                  className="hover:text-primary text-base font-medium transition-colors duration-300 relative group"
                >
                  Profile
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
              <motion.div
                key={"dashboard"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={toggleMenuDropdown}
                className="px-2 py-1 w-fit rounded-md"
              >
                <Link
                  to="/dashboard"
                  className="hover:text-primary text-base font-medium transition-colors duration-300 relative group"
                >
                  Dashboard
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </motion.div>
              <motion.div
                key={"logout"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={toggleMenuDropdown}
                className="px-2 py-1 w-fit rounded-md"
              >
                <button
                  onClick={showSignOutModal}
                  className="text-red-500 hover:text-red-600 mb-1 text-base font-medium transition-colors duration-300 relative group"
                >
                  Logout
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              </motion.div>
            </ul>
          )}
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 items-center ml-2">
        {!user && (
          <Link
            onClick={toggleMenuDropdown}
            to="/login"
            className="dark:bg-black px-2 mb-2 sm:mb-0 py-1 rounded-lg font-semibold text-lg"
          >
            Login
          </Link>
        )}

        {!user && (
          <Link
            onClick={toggleMenuDropdown}
            to="/signup"
            className={`${
              scroll ? "bg-white text-black" : "bg-primary text-white"
            } px-2 py-1 rounded-lg font-semibold text-lg`}
          >
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
  const mobileNavOptions = (
    <div
      className={`flex dark:bg-black dark:text-white items-center justify-center flex-wrap gap-5 px-2 py-4 ${
        scroll ? "bg-primary" : "bg-white"
      }`}
    >
      {navItems.map((item) => (
        <motion.div
          key={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <NavLink
            to={getLinkPath(item)}
            className="hover:text-primary text-lg md:text-xl"
          >
            {item}
          </NavLink>
        </motion.div>
      ))}
      <div className="w-full h-[0.5px] bg-slate-700"></div>
      <div className="flex itemsc-center justify-center flex-wrap gap-5 p-1">
        {user &&
          ["profile", "dashboard"].map((item) => (
            <NavLink
              to={getLinkPath(item)}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg md:text-xl capitalize"
            >
              {item}
            </NavLink>
          ))}
        {user && (
          <button
            onClick={showSignOutModal}
            className="text-red-700 text-lg md:text-xl capitalize"
          >
            Logout
          </button>
        )}
        {!user && (
          <Link
            onClick={toggleMenuDropdown}
            to="/login"
            className="px-2 py-1 rounded-lg text-lg md:text-xl font-semibold mr-2 capitalize"
          >
            Login
          </Link>
        )}

        {!user && (
          <Link
            onClick={toggleMenuDropdown}
            to="/signup"
            className={`bg-primary text-white px-2 py-1 rounded-lg font-semibold text-lg md:text-xl capitalize`}
          >
            Sign Up
          </Link>
        )}
      </div>
      <div className="w-full h-[0.5px] bg-slate-700"></div>
      <button
        onClick={toggleTheme}
        className="relative w-14 h-8 ml-4 mr-2 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
      >
        <div
          className={`absolute left-1 w-6 h-6 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-transform duration-300 ${
            theme === "dark" ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
        <Sun className="absolute left-2 w-4 h-4 text-yellow-500 dark:hidden" />
        <Moon className="absolute right-2 w-4 h-4 text-gray-900 hidden dark:block" />
      </button>
    </div>
  );
  return (
    <div
      className={`fixed w-full dark:bg-black py-2 dark:text-white top-0 z-50 shadow-lg ${
        scroll ? "bg-primary" : "bg-white"
      }`}
    >
      <dialog
        id="signout-modal"
        className="modal flex justify-center items-center bg-black bg-opacity-50 z-50"
      >
        <div className="modal-box w-full max-w-sm bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">
            Sign Out
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to sign out? You can always come back later!
          </p>
          <div className="modal-action justify-between flex mx-auto items-center">
            <button
              onClick={hideSignOutModal}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 hover:scale-105 font-semibold text-base rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 font-semibold text-base bg-red-500 rounded-lg hover:bg-red-600"
            >
              Sign Out
            </button>
          </div>
        </div>
      </dialog>
      <div className="container mx-auto p-1">
        <div className="flex justify-between items-center">
          <div className="justify-start">
            <Link
              to={"/"}
              className={`border-[2px] ${
                scroll ? "border-white" : "border-primary "
              } flex items-center gap-2 px-2 py-1 sm:px-4 rounded-lg`}
            >
              <span className="font-bold tracking-wider text-base sm:text-lg md:text-xl">
                Fit
                <span
                  className={`text-primary dark:text-primary ${
                    scroll ? "text-white" : ""
                  }`}
                >
                  F
                </span>
                orge
              </span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">{navElements}</div>
          <div className="hidden lg:flex">{navElementsEnd}</div>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="dark:text-white hover:text-primary transition-colors p-2"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 md:w-7 md:h-7" />
              ) : (
                <FiMenu className="w-6 h-6 md:w-7 md:h-7" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu Button */}

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-2 md:mt-4 border-t border-slate-700"
          >
            {mobileNavOptions}
            <div className="border-t mb-4 border-slate-700"></div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
