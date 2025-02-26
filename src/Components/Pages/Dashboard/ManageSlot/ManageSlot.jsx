import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { FaTrash } from "react-icons/fa";
import { GridLoader } from "react-spinners";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import Swal from "sweetalert2";

const ManageSlot = () => {
  const customAxios = useCustomAxios();
  const { user } = useContext(AuthContext);
  const [slotData, setSlotData] = useState(null);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["trainer"],
    queryFn: async () => {
      const res = await customAxios.get("/slot", {
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
  console.log(slotData);
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
        const res = await customAxios.delete(`/slot`, {
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
                  <td>
                    <button onClick={() => handleDelete(slot._id)}>
                      <FaTrash className="text-xl text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ManageSlot;
