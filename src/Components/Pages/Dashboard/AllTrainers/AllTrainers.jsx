import React from "react";
import useTrainers from "../../../../Hooks/useTrainers";
import { GridLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AllTrainers = () => {
  const { trainers, isFetching } = useTrainers();
  const customAxios = useCustomAxios();
  const navigate = useNavigate();
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }

  const handleDelete = async (trainerId, userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32CD32",
      cancelButtonColor: "#FF4500",
      confirmButtonText: "Yes, delete this!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await customAxios.delete(`/trainers`, {
          data: trainerId,
          userId,
        });

        console.log(res);
        if (
          res.data.result.deletedCount &&
          res.data.resUser.modifiedCount &&
          res.data.resAppliedTrainers.modifiedCount
        ) {
          Swal.fire({
            title: "Confirmed!",
            text: "Application is accepted.",
            icon: "success",
          });
          navigate("/dashboard/applications");
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
    <div>
      {trainers.length === 0 ? ( // Wrapped in a div
        <div>
          <p>No Trainers!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer._id} className="text-center">
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={trainer.profileImage} alt="Trainer Profile" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{trainer.fullName}</div>
                  </td>
                  <td>{trainer.email}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDelete({
                          trainerId: trainer._id,
                          userId: trainer.userId,
                        })
                      }
                    >
                      <FaTrash className="text-xl text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTrainers;
