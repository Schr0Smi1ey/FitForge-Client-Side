import { useContext, useState } from "react";
import {
  FaUsers,
  FaWallet,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaPlusSquare,
  FaBars,
  FaTimes,
  FaUser,
  FaListAlt,
  FaClipboardCheck,
  FaCalendarCheck,
  FaDumbbell,
  FaHome,
  FaComments,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const secureAxios = useAxiosSecure();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
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

  return (
    <div className="flex min-h-screen">
      <Helmet>
        <title>FitForge | Dashboard</title>
      </Helmet>

      {/* Sidebar */}
      <div
        className={`bg-primary w-64 min-h-screen p-6 fixed md:static transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <button
          className="md:hidden text-white text-2xl mb-4"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        <ul className="text-white font-semibold pt-10 space-y-4">
          {isAdmin && (
            <div className="text-base md:text-lg lg:text-xl   space-y-4">
              <li className="w-fit">
                <NavLink
                  to="/dashboard/subscribers"
                  className="flex items-center gap-2"
                >
                  <FaUsers /> Subscribers
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  to="/dashboard/trainers"
                  className="flex items-center gap-2"
                >
                  <FaChalkboardTeacher /> Trainers
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  to="/dashboard/applications"
                  className="flex items-center gap-2"
                >
                  <FaFileAlt /> Applications
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  to="/dashboard/balance"
                  className="flex items-center gap-2"
                >
                  <FaWallet /> Balance
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
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
                  to="/dashboard/user-profile"
                  className="flex items-center gap-2"
                >
                  <FaUser /> User Profile
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  to="/dashboard/activity-log"
                  className="flex items-center gap-2"
                >
                  <FaListAlt /> Activity Log
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  to="/dashboard/become-a-trainer"
                  className="flex items-center gap-2"
                >
                  <FaClipboardCheck /> Become a Trainer
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  to="/dashboard/booked-trainers"
                  className="flex items-center gap-2"
                >
                  <FaCalendarCheck /> Booked Trainers
                </NavLink>
              </li>
            </div>
          )}

          {isTrainer && (
            <div className="text-base md:text-lg lg:text-xl space-y-4">
              <li className="w-fit">
                <NavLink
                  to="/dashboard/add-slot"
                  className="flex items-center gap-2"
                >
                  <FaPlusSquare /> Add Slot
                </NavLink>
              </li>
              <li className="w-fit">
                <NavLink
                  to="/dashboard/manage-slots"
                  className="flex items-center gap-2"
                >
                  <FaClipboardCheck /> Manage Slots
                </NavLink>
              </li>
            </div>
          )}

          {(isAdmin || isTrainer) && (
            <li className="w-fit text-base md:text-lg lg:text-xl space-y-4">
              <NavLink
                to="/dashboard/add-forum"
                className="flex items-center gap-2"
              >
                <FaComments /> Add Forum
              </NavLink>
            </li>
          )}

          {/* General Links */}
          <div className="border-t border-white my-4"></div>
          <div className="text-base md:text-lg lg:text-xl space-y-4">
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
          </div>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:ml-64">
        <button
          className="md:hidden text-primary-500 text-3xl mb-4"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>

        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <GridLoader color="#A94A4A" size={30} />
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
