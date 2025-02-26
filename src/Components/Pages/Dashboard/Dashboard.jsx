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
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import NavBar from "../../Shared/Navbar/Navbar";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { GridLoader } from "react-spinners";
import useCustomAxios from "../../../Hooks/useCustomAxios";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrainer, setIsTrainer] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const customAxios = useCustomAxios();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  if (user) {
    const { data: userData = [], isFetching } = useQuery({
      queryKey: ["user"],
      queryFn: async () => {
        const res = await customAxios.get("/user", {
          params: { email: user.email },
        });
        setUserData(res.data.user);
        setIsAdmin(res.data.user.role === "admin");
        setIsTrainer(res.data.user.role === "trainer");
        setIsMember(res.data.user.role === "member");
        return res.data;
      },
    });
  }
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

        <ul className="text-white font-semibold">
          {isAdmin && (
            <div className="space-y-4">
              <li>
                <NavLink
                  to="/dashboard/subscribers"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaUsers />
                  <span>Subscribers</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/trainers"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaChalkboardTeacher />
                  <span>Trainers</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/applications"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaFileAlt />
                  <span>Applications</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/balance"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaWallet />
                  <span>Balance</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/add-class"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaUserGraduate />
                  <span>Add Class</span>
                </NavLink>
              </li>
            </div>
          )}
          {isMember && (
            <div className="space-y-4">
              <li>
                <NavLink
                  to="/dashboard/user-profile"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaPlusSquare />
                  <span>User Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/activity-log"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaPlusSquare />
                  <span>Activity Log</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/become-a-trainer"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaPlusSquare />
                  <span>Become a Trainer</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/booked-trainers"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaPlusSquare />
                  <span>Booked Trainers</span>
                </NavLink>
              </li>
            </div>
          )}
          {isTrainer && (
            <div className="space-y-4">
              <li>
                <NavLink
                  to="/dashboard/add-slot"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaPlusSquare />
                  <span>Add Slot</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manage-slots"
                  className="flex items-center space-x-2 hover:text-gray-200 w-fit"
                >
                  <FaPlusSquare />
                  <span>Manage Slots</span>
                </NavLink>
              </li>
            </div>
          )}
          {(isAdmin || isTrainer) && (
            <li className="mt-4">
              <NavLink
                to="/dashboard/add-forum"
                className="flex items-center space-x-2 hover:text-gray-200 w-fit"
              >
                <FaPlusSquare />
                <span>Add Forum</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="flex-1 p-8 ml-64 md:ml-0">
        <button
          className="md:hidden text-orange-500 text-3xl mb-4"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>

        <div className="p-4 pt-14 md:pt-32">
          {loading ? (
            <div className="flex items-center justify-center min-h-screen">
              <GridLoader color="#A94A4A" size={30} />
            </div>
          ) : (
            <Outlet></Outlet>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
