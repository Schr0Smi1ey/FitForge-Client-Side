import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import useCustomAxios from "../../../../Hooks/useCustomAxios";
import { GridLoader } from "react-spinners";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { FaEye } from "react-icons/fa";
import { convertDate } from "../../../../utils/Utilities.js";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure.jsx";
const Applications = () => {
  const customAxios = useCustomAxios();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { data: applicantData = [], isLoading } = useQuery({
    queryKey: ["applicantData"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/appliedTrainerInfo?email=${user.email}`
      );
      return res.data;
    },
  });
  const colors = {
    pending: "bg-yellow-500",
    accepted: "bg-green-500",
    cancelled: "bg-red-500",
    rejected: "bg-red-500",
  };
  const handleModal = (index) => {
    setFeedback(applicantData[0].appliedTrainer[index].feedback);
    setShowModal(!showModal);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <GridLoader color="#A94A4A" size={30} />
      </div>
    );
  }
  const applications = applicantData[0]?.appliedTrainer;
  console.log(applicantData);
  return (
    <div>
      {applicantData.error || !applicantData.length === 0 ? (
        <p>No Applications found</p>
      ) : (
        <table className="table table-zebra">
          <thead>
            <tr className="text-center">
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Apply Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((applicant, index) => (
              <tr key={applicant._id} className="text-center">
                <td>{index + 1}</td>
                <td>{applicantData[0].user.name}</td>
                <td>{applicantData[0].user.email}</td>
                <td>{convertDate(applicant.applyDate)}</td>
                <td
                  className={`${
                    colors[applicant.status]
                  } rounded-full text-white p-2 px-3 w-fit text-center flex items-center justify-center mx-auto gap-2`}
                >
                  {(applicant.status === "rejected" ||
                    applicant.status == "cancelled") && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleModal(index);
                      }}
                      className="focus:outline-none"
                    >
                      <FaEye />
                    </button>
                  )}
                  {applicant.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Rejection Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-9/12 md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Rejected Application</h2>
            <p>{feedback}</p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
