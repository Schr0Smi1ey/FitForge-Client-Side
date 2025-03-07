import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { FaEye } from "react-icons/fa";
import { convertDate } from "../../../../utils/Utilities.js";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure.jsx";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
const Applications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
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
        <GridLoader color="#198068" size={40} />
      </div>
    );
  }
  const applications = applicantData[0]?.appliedTrainer;
  return (
    <div>
      <Helmet>
        <title>FitForge | Dashboard | Activity Log</title>
      </Helmet>
      {applicantData.error || !applicantData.length === 0 ? (
        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="text-2xl text-red-500 font-bold text-center"
        >
          No Activity Log found!
        </p>
      ) : (
        <div>
          <h1
            data-aos="fade-down"
            data-aos-delay="150"
            className="text-3xl font-bold text-gray-800 text-center"
          >
            📝 Activity Log
          </h1>
          <table
            data-aos="fade-up"
            data-aos-delay="150"
            className="table table-zebra"
          >
            <thead>
              <tr className="text-center">
                <th data-aos="fade-up" data-aos-delay="180">
                  No.
                </th>
                <th data-aos="fade-up" data-aos-delay="180">
                  Name
                </th>
                <th data-aos="fade-up" data-aos-delay="180">
                  Email
                </th>
                <th data-aos="fade-up" data-aos-delay="180">
                  Apply Date
                </th>
                <th data-aos="fade-up" data-aos-delay="180">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((applicant, index) => (
                <tr key={applicant._id} className="text-center">
                  <td data-aos="fade-up" data-aos-delay="230">
                    {index + 1}
                  </td>
                  <td data-aos="fade-up" data-aos-delay="230">
                    {applicantData[0].user.name}
                  </td>
                  <td data-aos="fade-up" data-aos-delay="230">
                    {applicantData[0].user.email}
                  </td>
                  <td data-aos="fade-up" data-aos-delay="230">
                    {convertDate(applicant.applyDate, "ActivityLog")}
                  </td>
                  <td
                    data-aos="fade-up"
                    data-aos-delay="230"
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
        </div>
      )}
      {/* Rejection Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-9/12 md:w-1/3">
            <h2
              data-aos="fade-down"
              data-aos-delay="150"
              className="text-2xl font-bold mb-4"
            >
              Rejected Application
            </h2>
            <p data-aos="fade-up" data-aos-delay="200">
              {feedback}
            </p>
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
