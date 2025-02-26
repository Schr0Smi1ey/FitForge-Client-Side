import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaEye, FaTrash, FaTimes } from "react-icons/fa";
import { GridLoader } from "react-spinners";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const ManageSlot = () => {
  const secureAxios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [slotData, setSlotData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookedMembers, setBookedMembers] = useState([]);
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
        <GridLoader color="#A94A4A" size={30} />
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
      {slotData.length === 0 ? (
        <div>
          <p>No Slot Found!</p>
        </div>
      ) : (
        <div>
          <table className="table table-zebra">
            <thead>
              <tr className="text-center">
                <th>Day</th>
                <th>Slot Name</th>
                <th>Duration</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {slotData.map((slot, index) => (
                <tr key={slot._id} className="text-center">
                  <td>{slot.selectedDay}</td>
                  <td>{slot.slotName}</td>
                  <td>{slot.slotTime}</td>
                  <td>{slot.selectedClass}</td>
                  <td className="flex justify-center">
                    <div className="flex gap-3 items-center">
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
              <div className="bg-white p-5 rounded-lg shadow-lg w-1/3 relative">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 text-xl text-red-500"
                >
                  <FaTimes />
                </button>
                <h2 className="text-lg font-semibold mb-4 text-center">
                  Booked Members
                </h2>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="text-center bg-gray-200">
                      <th className="border border-gray-300 p-2">Profile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookedMembers.map((member) => (
                      <tr
                        key={member.email}
                        className="text-center border border-gray-300"
                      >
                        <td className="p-2">{member.email}</td>
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
