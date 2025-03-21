import { useContext, useEffect, useState } from "react";
import {
  FaUsers,
  FaWallet,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaPlusSquare,
  FaBars,
  FaUser,
  FaListAlt,
  FaClipboardCheck,
  FaCalendarCheck,
  FaDumbbell,
  FaHome,
  FaComments,
  FaStar,
} from "react-icons/fa";
import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import { NavLink, Outlet, replace, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const adminMenuItems = [
  { name: "Subscribers", icon: <FaUsers /> },
  { name: "Trainers", icon: <FaChalkboardTeacher /> },
  { name: "Applications", icon: <FaFileAlt /> },
  { name: "Balance", icon: <FaWallet /> },
  { name: "Add Class", icon: <FaDumbbell /> },
];

const memberMenuItems = [
  { name: "Activity Log", icon: <FaListAlt /> },
  { name: "Become a Trainer", icon: <FaClipboardCheck /> },
  { name: "Booked Trainers", icon: <FaCalendarCheck /> },
  { name: "Review", icon: <FaStar /> },
];
const trainerMenuItems = [
  { name: "Add Slot", icon: <FaPlusSquare /> },
  { name: "Manage Slots", icon: <FaClipboardCheck /> },
];
const generalMenuItems = [
  { name: "Home", path: "/", icon: <FaHome /> },
  { name: "Trainers", path: "/trainers", icon: <FaChalkboardTeacher /> },
  { name: "Classes", path: "/classes", icon: <FaDumbbell /> },
  { name: "Community", path: "/community", icon: <FaComments /> },
];
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, theme, toggleTheme } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const secureAxios = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }

  if (user) {
    useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const res = await secureAxios.get("/user", {
          params: { email: user.email },
        });
        setIsAdmin(res.data.user.role === "admin");
        setIsTrainer(res.data.user.role === "trainer");
        setIsMember(res.data.user.role === "member");
        return res.data;
      },
    });
  }
  const getLinkPath = (item) => {
    if (item === "Become a Trainer") return "/dashboard/become-a-trainer";
    if (item === "Dashboard") return "/dashboard";
    return `/dashboard/${item.toLowerCase().replace(" ", "-")}`;
  };
  const handleToggleTheme = () => {
    toggleTheme();
    setIsOpen(false);
  };
  useEffect(() => {
    if (isAdmin) {
      navigate("/dashboard/subscribers", { replace: true });
    } else if (isTrainer) {
      navigate("/dashboard/add-slot", { replace: true });
    } else if (isMember) {
      navigate("/dashboard/activity-log", { replace: true });
    }
  }, [isAdmin, isMember, isTrainer, navigate]);

  return (
    <div className="flex min-h-screen dark:bg-black dark:text-white">
      <Helmet>
        <title>FitForge | Dashboard</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`bg-primary w-64 min-h-screen p-6 fixed lg:static transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <button
          data-aos="fade-right"
          data-aos-delay="100"
          key={isOpen}
          className="lg:hidden mt-5 md:ml-4 text-white text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <RiMenuUnfold4Fill className="flex md:w-12 md:h-12" />
        </button>

        <ul
          data-aos="fade-right"
          data-aos-delay="150"
          className="text-white font-semibold pt-5 md:ml-4"
        >
          {isAdmin && (
            <div className="text-base md:text-lg lg:text-xl space-y-4">
              <motion.div className="flex flex-col items-center w-fit space-y-2">
                {adminMenuItems.map(({ name, icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onClick={() => setIsOpen(false)}
                    className="py-2 w-full text-center rounded-md"
                  >
                    <NavLink
                      to={getLinkPath(name)}
                      className="flex items-center gap-3 w-fit hover:text-[#802819] transition-colors duration-300 relative group"
                    >
                      {icon}
                      <span className="capitalize">{name}</span>
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#802819] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {isMember && (
            <div className="text-base md:text-lg w-fit lg:text-xl space-y-4">
              <motion.div className="flex flex-col items-center space-y-2">
                {memberMenuItems.map(({ name, icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onClick={() => setIsOpen(false)}
                    className="py-2 w-full text-center rounded-md"
                  >
                    <NavLink
                      to={getLinkPath(name)}
                      className="flex items-center w-fit gap-3 hover:text-[#802819] transition-colors duration-300 relative group"
                    >
                      {icon}
                      <span className="capitalize">{name}</span>
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#802819] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {isTrainer && (
            <div className="text-base md:text-lg lg:text-xl space-y-4">
              <motion.div className="flex flex-col items-center space-y-2">
                {trainerMenuItems.map(({ name, icon }) => (
                  <motion.div
                    key={name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    onClick={() => setIsOpen(false)}
                    className="py-2 w-full text-center rounded-md"
                  >
                    <NavLink
                      to={getLinkPath(name)}
                      className="flex items-center w-fit gap-3 hover:text-[#802819] transition-colors duration-300 relative group"
                    >
                      {icon}
                      <span className="capitalize">{name}</span>
                      <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#802819] transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {(isAdmin || isTrainer) && (
            <motion.div className="flex flex-col items-center space-y-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
                onClick={() => setIsOpen(false)}
                className="py-2 w-full text-center rounded-md mt-3"
              >
                <NavLink
                  to="/dashboard/add-forum"
                  className="flex items-center w-fit gap-3 text-base md:text-lg lg:text-xl hover:text-[#802819] transition-colors duration-300 relative group"
                >
                  <FaComments />
                  <span className="capitalize">Add Forum</span>
                  <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#802819] transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </motion.div>
            </motion.div>
          )}

          {/* General Links */}
          <div className="border-t border-white my-4 mt-6"></div>
          <div className="text-base md:text-lg lg:text-xl space-y-4 mt-4">
            <motion.div className="flex flex-col items-center space-y-2">
              {generalMenuItems.map(({ name, path, icon }) => (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="py-2 w-full text-center rounded-md"
                >
                  <NavLink
                    to={path}
                    className="flex items-center gap-3 w-fit hover:text-[#802819] transition-colors duration-300 relative group"
                  >
                    {icon}
                    <span className="capitalize">{name}</span>
                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-[#802819] transition-all duration-300 group-hover:w-full"></span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
            <li>
              <button
                onClick={handleToggleTheme}
                className="relative w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
              >
                <div
                  className={`absolute left-1 w-6 h-6 bg-white dark:bg-yellow-400 rounded-full shadow-md transform transition-transform duration-300 ${
                    theme === "dark" ? "translate-x-8" : "translate-x-0"
                  }`}
                ></div>
                <Sun className="absolute left-2 w-4 h-4 text-yellow-500 dark:hidden" />
                <Moon className="absolute right-2 w-4 h-4 text-gray-900 hidden dark:block" />
              </button>
            </li>
          </div>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-4 pt-10 lg:ml-5">
        <button
          className="lg:hidden text-primary-500 text-3xl ml-5 md:ml-10 mb-4"
          onClick={() => setIsOpen(true)}
        >
          <RiMenuFold4Fill className="md:w-12 md:h-12" />
        </button>

        <div className="container mx-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <GridLoader color="#198068" size={40} />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
