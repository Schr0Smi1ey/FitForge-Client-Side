import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaTrash, FaTimes } from "react-icons/fa";
import { GridLoader } from "react-spinners";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
const ManageSlot = () => {
  const secureAxios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [slotData, setSlotData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookedMembers, setBookedMembers] = useState([]);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await secureAxios.get("/slot", {
        params: { email: user.email },
      });
      setSlotData(res.data);
      return res.data;
    },
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32CD32",
      cancelButtonColor: "#FF4500",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await secureAxios.delete(`/slot`, {
          params: {
            slotId: id,
            email: user.email,
          },
        });
        if (res.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Slot is deleted!",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong!",
            icon: "error",
          });
        }
      }
    });
  };

  const handleModal = (index) => {
    setBookedMembers(slotData[index].bookedMembers);
    setShowModal(true);
  };

  return (
    <>
      <Helmet>
        <title>FitForge | Dashboard | Manage Slot</title>
      </Helmet>
      {slotData.length === 0 ? (
        <p
          data-aos="fade-down"
          className="text-2xl text-red-500 font-bold text-center"
        >
          No Slot found!
        </p>
      ) : (
        <div>
          <h1
            data-aos="fade-down "
            data-aos-delay="150"
            className="text-3xl mb-6 font-bold text-gray-800 dark:text-gray-300 text-center"
          >
            🗓️ Manage Slots
          </h1>
          <table className="table">
            <thead className="bg-primary text-white text-base md:text-lg lg:text-xl">
              <tr className="text-center">
                <th data-aos="fade-up" data-aos-delay="200">
                  Day
                </th>
                <th data-aos="fade-up" data-aos-delay="200">
                  Slot Name
                </th>
                <th data-aos="fade-up" data-aos-delay="200">
                  Duration
                </th>
                <th data-aos="fade-up" data-aos-delay="200">
                  Class
                </th>
                <th data-aos="fade-up" data-aos-delay="200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-400 text-sm md:text-base lg:text-lg">
              {slotData.map((slot, index) => (
                <tr key={slot._id} className="text-center">
                  <td data-aos="fade-up" data-aos-delay="200">
                    {slot.selectedDay}
                  </td>
                  <td data-aos="fade-up" data-aos-delay="200">
                    {slot.slotName}
                  </td>
                  <td data-aos="fade-up" data-aos-delay="200">
                    {slot.slotTime}
                  </td>
                  <td data-aos="fade-up" data-aos-delay="200">
                    {slot.selectedClass}
                  </td>
                  <td className="flex justify-center">
                    <div
                      data-aos="fade-up"
                      data-aos-delay="200"
                      className="flex gap-3 items-center"
                    >
                      {slot.bookedMembers.length > 0 ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleModal(index);
                          }}
                          className="focus:outline-none"
                        >
                          <FaEye className="text-xl" />
                        </button>
                      ) : null}
                      <button onClick={() => handleDelete(slot._id)}>
                        <FaTrash className="text-xl text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white dark:bg-black dark:text-white dark:border-2 dark:border-white/10 p-5 rounded-lg shadow-lg w-1/3 relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-xl text-red-500"
                >
                  <FaTimes />
                </button>
                <h2
                  data-aos="fade-down"
                  data-aos-delay="150"
                  className="text-lg text-primary font-semibold mb-4 text-center"
                >
                  Booked Members
                </h2>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="text-center bg-primary text-white">
                      <th
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="border border-gray-300 p-2"
                      >
                        Profile
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookedMembers.map((member) => (
                      <tr
                        key={member.email}
                        className="text-center border border-gray-300"
                      >
                        <td
                          data-aos="fade-up"
                          data-aos-delay="250"
                          className="p-2"
                        >
                          {member.email}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ManageSlot;
