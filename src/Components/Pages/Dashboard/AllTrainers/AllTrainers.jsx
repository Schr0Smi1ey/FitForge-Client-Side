import React, { useState } from "react";
import useTrainers from "../../../../Hooks/useTrainers";
import { GridLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AllTrainers = () => {
  const { trainers, isFetching } = useTrainers();
  const [trainer, setTrainer] = useState({});
  const [showModal, setShowModal] = useState(false);
  const customAxios = useCustomAxios();
  const navigate = useNavigate();
  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  const handleReject = (trainer) => {
    setShowModal(!showModal);
    setTrainer(trainer);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32CD32",
      cancelButtonColor: "#FF4500",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await customAxios.patch(`/handleApplication`, {
          applicationId: trainer._id,
          status: "cancelled",
          userId: trainer.userId,
          feedback: e.target.feedback.value,
        });

        console.log(res);
        if (
          res.status === 200 &&
          res.data.resultAppliedTrainer.modifiedCount &&
          res.data.deleteTrainer.deletedCount &&
          res.data.resultUser.modifiedCount
        ) {
          Swal.fire({
            title: "Cancelled!",
            text: "Application is cancelled!",
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
    handleReject();
    console.log(e.target.feedback.value);
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
                    <button onClick={() => handleReject(trainer)}>
                      <FaTrash className="text-xl text-red-500" />
                    </button>
                  </td>
                  <td>
                    {showModal && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
                          <h2 className="text-2xl font-bold mb-4">
                            Cancel Application
                          </h2>
                          <p className="mb-4">
                            Provide feedback for rejecting the application of{" "}
                            <strong>{trainer.fullName}</strong>.
                          </p>
                          <form onSubmit={handleFeedbackSubmit}>
                            <textarea
                              name="feedback"
                              placeholder="Enter Cancellation feedback..."
                              className="w-full h-32 p-3 border rounded-md mb-4"
                              required
                            ></textarea>
                            <div className="flex justify-end gap-4">
                              <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                              >
                                Submit Cancellation
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
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
