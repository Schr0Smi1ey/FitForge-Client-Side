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
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import { Moon, Sun } from "lucide-react";

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
  useEffect(() => {
    if (isAdmin) {
      navigate("/dashboard/subscribers");
    } else if (isTrainer) {
      navigate("/dashboard/add-slot");
    } else if (isMember) {
      navigate("/dashboard/activity-log");
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
            <div className="text-base md:text-lg lg:text-xl   space-y-4">
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/subscribers"
                  className="flex items-center gap-2"
                >
                  <FaUsers /> Subscribers
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/trainers"
                  className="flex items-center gap-2"
                >
                  <FaChalkboardTeacher /> Trainers
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/applications"
                  className="flex items-center gap-2"
                >
                  <FaFileAlt /> Applications
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/balance"
                  className="flex items-center gap-2"
                >
                  <FaWallet /> Balance
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/add-class"
                  className="flex items-center gap-2"
                >
                  <FaDumbbell /> Add Class
                </NavLink>
              </li>
            </div>
          )}

          {isMember && (
            <div className="text-base md:text-lg lg:text-xl space-y-4">
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/activity-log"
                  className="flex items-center gap-2"
                >
                  <FaListAlt /> Activity Log
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/become-a-trainer"
                  className="flex items-center gap-2"
                >
                  <FaClipboardCheck /> Become a Trainer
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/booked-trainers"
                  className="flex items-center gap-2"
                >
                  <FaCalendarCheck /> Booked Trainers
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/review"
                  className="flex items-center gap-2"
                >
                  <FaStar /> Review
                </NavLink>
              </li>
            </div>
          )}

          {isTrainer && (
            <div className="text-base md:text-lg lg:text-xl space-y-4">
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/add-slot"
                  className="flex items-center gap-2"
                >
                  <FaPlusSquare /> Add Slot
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  onClick={() => setIsOpen(false)}
                  to="/dashboard/manage-slots"
                  className="flex items-center gap-2"
                >
                  <FaClipboardCheck /> Manage Slots
                </NavLink>
              </li>
            </div>
          )}

          {(isAdmin || isTrainer) && (
            <li className="w-fit text-base md:text-lg lg:text-xl mt-3">
              <NavLink
                onClick={() => setIsOpen(false)}
                to="/dashboard/add-forum"
                className="flex items-center gap-2"
              >
                <FaComments /> Add Forum
              </NavLink>
            </li>
          )}

          {/* General Links */}
          <div className="border-t border-white my-4 mt-6"></div>
          <div className="text-base md:text-lg lg:text-xl space-y-4 mt-4">
            <li className="w-fit">
              <NavLink to="/" className="flex items-center gap-2">
                <FaHome /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/trainers" className="flex items-center gap-2">
                <FaChalkboardTeacher /> Trainers
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes" className="flex items-center gap-2">
                <FaDumbbell /> Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/community" className="flex items-center gap-2">
                <FaComments /> Community
              </NavLink>
            </li>
            <li>
              <button
                onClick={toggleTheme}
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
