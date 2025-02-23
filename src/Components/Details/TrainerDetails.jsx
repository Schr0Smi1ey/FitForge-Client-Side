import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";
import useCustomAxios from "../../Hooks/useCustomAxios";

const TrainerDetails = () => {
  const { trainer } = useLoaderData();
  console.log(trainer);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const customAxios = useCustomAxios();
  const navigate = useNavigate();
  // In case trainer data is not available, show a loader
  if (!trainer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }

  const handleConfirm = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32CD32",
      cancelButtonColor: "#FF4500",
      confirmButtonText: "Yes, confirm it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await customAxios.patch(`/handleApplication`, {
          applicationId: trainer._id,
          status: "accepted",
          userId: trainer.userId,
        });
        console.log(res);
        if (
          res.status === 200 &&
          res.data.resultAppliedTrainer.modifiedCount &&
          res.data.resultUser.modifiedCount
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

  const handleReject = () => {
    setShowModal(!showModal);
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
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await customAxios.patch(`/handleApplication`, {
          applicationId: trainer._id,
          status: "rejected",
          userId: trainer.userId,
          feedback: e.target.feedback.value,
        });
        console.log(res);
        if (res.status === 200 && res.data.resultAppliedTrainer.modifiedCount) {
          Swal.fire({
            title: "Rejected!",
            text: "Application is rejected!",
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
    <div className=" bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-xl max-w-4xl w-full overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Profile Image */}
          <div className="md:w-1/3 flex items-center justify-center p-6 bg-primary">
            <img
              src={trainer.profileImage || "https://via.placeholder.com/150"}
              alt={`${trainer.fullName || "Trainer"}'s profile`}
              className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-full border-4 border-white shadow-md"
            />
          </div>

          {/* Trainer Details */}
          <div className="p-8 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800">
              {trainer.fullName || "Unknown Trainer"}
            </h1>
            <p className="text-gray-500 text-lg mb-4">
              Age: {trainer.age || "N/A"}
            </p>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Biography</h2>
              <p className="text-gray-600 mt-2">
                {trainer.biography || "No biography available."}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Experience
              </h2>
              <p className="text-gray-600 mt-2">
                {trainer.experience || "No experience listed."}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Class Duration
              </h2>
              <p className="text-gray-600 mt-2">
                {trainer.classDuration
                  ? `${trainer.classDuration} ${
                      trainer.classDuration > 1 ? "hours" : "hour"
                    }`
                  : "Not specified"}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Skills</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {trainer.skills && trainer.skills.length > 0 ? (
                  trainer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary text-white px-3 py-1 rounded-full text-sm shadow-md"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills listed.</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Availability
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>Days:</strong>{" "}
                {trainer.availableDays
                  ? trainer.availableDays.join(", ")
                  : "Not available"}{" "}
                <br />
                <strong>Time:</strong>{" "}
                {trainer.availableTime || "Not specified"}
              </p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Social Links
              </h2>
              <div className="mt-2 flex space-x-4">
                {trainer.socialLinks && trainer.socialLinks.length > 0 ? (
                  trainer.socialLinks.map((link, index) => {
                    let icon;
                    if (link.includes("facebook")) icon = <FaFacebook />;
                    else if (link.includes("twitter")) icon = <FaTwitter />;
                    else if (link.includes("instagram")) icon = <FaInstagram />;
                    else icon = <FaGlobe />;

                    return (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-2xl hover:text-gray-700 transition-colors"
                      >
                        {icon}
                      </a>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No social links available.</p>
                )}
              </div>
            </div>

            {/* Confirmation and Rejection Buttons */}
            <div className="mt-8 flex gap-4">
              <button
                onClick={handleConfirm}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Reject Application</h2>
            <p className="mb-4">
              Provide feedback for rejecting the application of{" "}
              <strong>{trainer.fullName}</strong>.
            </p>
            <form onSubmit={handleFeedbackSubmit}>
              <textarea
                name="feedback"
                placeholder="Enter rejection feedback..."
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
                  Submit Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDetails;
