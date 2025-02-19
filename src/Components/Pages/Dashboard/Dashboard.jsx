import { useState } from "react";
import {
  FaUsers,
  FaWallet,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaPlusSquare,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../../Shared/Navbar/Navbar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mx-auto flex min-h-screen">
      <NavBar></NavBar>
      {/* Sidebar */}
      <div
        className={`bg-primary w-64 min-h-screen p-4 pt-14 md:pt-32 lg:pt-40 fixed md:static transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Close Button for Mobile */}
        <button
          className="md:hidden text-white text-2xl mb-4"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>

        <ul className="space-y-4 text-white font-semibold">
          <li>
            <NavLink
              to="/dashboard/adminHome"
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <FaUsers />
              <span>Subscribers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/trainers"
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <FaChalkboardTeacher />
              <span>Trainers</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/applications"
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <FaFileAlt />
              <span>Applications</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/balance"
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <FaWallet />
              <span>Balance</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-class"
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <FaUserGraduate />
              <span>Add Class</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-forum"
              className="flex items-center space-x-2 hover:text-gray-200"
            >
              <FaPlusSquare />
              <span>Add Forum</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 ml-64 md:ml-0">
        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden text-orange-500 text-3xl mb-4"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
