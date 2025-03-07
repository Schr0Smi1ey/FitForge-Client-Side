import React, { useContext, useEffect, useState } from "react";
import useTrainers from "../../../../Hooks/useTrainers";
import { GridLoader } from "react-spinners";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
const AllTrainers = () => {
  const { trainers, isFetching } = useTrainers();
  const { user, loading } = useContext(AuthContext);
  const [trainer, setTrainer] = useState({});
  const [showModal, setShowModal] = useState(false);
  const secureAxios = useAxiosSecure();
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  if (isFetching || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#198068" size={40} />
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
        const res = await secureAxios.patch(`/handleApplication`, {
          applicationId: trainer._id,
          status: "cancelled",
          userId: trainer.userId,
          feedback: e.target.feedback.value,
          email: user.email,
        });

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
  };
  return (
    <div>
      <Helmet>
        <title>FitForge | Dashboard | All Trainers</title>
      </Helmet>
      {trainers.length === 0 ? (
        <div data-aos="fade-down" className="text-center">
          <p className="text-2xl text-red-500 font-bold text-center">
            No trainers found!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="mb-6">
            <h1
              data-aos="fade-down"
              className="text-3xl font-bold text-gray-800 text-center"
            >
              👩‍🏫 All Trainers
            </h1>
          </div>
          <table className="table">
            {/* head */}
            <thead className="bg-primary text-white text-base md:text-lg lg:text-xl">
              <tr className="text-center">
                <th data-aos="fade-down">Profile</th>
                <th data-aos="fade-down">Name</th>
                <th data-aos="fade-down">Email</th>
                <th data-aos="fade-down">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base lg:text-lg">
              {trainers.map((trainer) => (
                <tr key={trainer._id} className="text-center">
                  <td data-aos="fade-up">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={trainer.profileImage} alt="Trainer Profile" />
                      </div>
                    </div>
                  </td>
                  <td data-aos="fade-up">
                    <div className="font-bold">{trainer.fullName}</div>
                  </td>
                  <td data-aos="fade-up">{trainer.email}</td>
                  <td data-aos="fade-up">
                    <button onClick={() => handleReject(trainer)}>
                      <FaTrash className="text-xl text-red-500" />
                    </button>
                  </td>
                  <td>
                    {showModal && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
                          <h2
                            data-aos="fade-down"
                            className="text-2xl font-bold mb-4"
                          >
                            Cancel Application
                          </h2>
                          <p data-aos="fade-down" className="mb-4">
                            Provide feedback for rejecting the application of{" "}
                            <strong>{trainer.fullName}</strong>.
                          </p>
                          <form onSubmit={handleFeedbackSubmit}>
                            <textarea
                              data-aos="fade-up"
                              data-aos-delay="100"
                              name="feedback"
                              placeholder="Enter Cancellation feedback..."
                              className="w-full h-32 p-3 border rounded-md mb-4"
                              required
                            ></textarea>
                            <div className="flex justify-end gap-4">
                              <button
                                data-aos="fade-up"
                                data-aos-delay="150"
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                data-aos="fade-up"
                                data-aos-delay="200"
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
